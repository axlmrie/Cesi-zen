# Déploiement de production CesiZen

Ce dossier déploie l'image web publiée sur GHCR derrière un routeur Nginx stable.
Nginx Proxy Manager (NPM) ne cible jamais directement le conteneur applicatif :

```text
Internet -> Nginx Proxy Manager -> cesizen-router:8080
                                      |-- cesizen-web:3000 (réseau privé Compose)
                                      `-- maintenance-web:80 (conteneur externe existant)
```

Le routeur reste attaché au réseau Docker externe de NPM pendant le remplacement de
`cesizen-web`. Les scripts changent sa route par écriture atomique puis exécutent
`nginx -t` avant chaque rechargement. Aucun port du routeur ou de l'application n'est
publié sur l'hôte. Le conteneur de maintenance existe et est administré séparément.

## Fichiers

- `docker-compose.production.yml` : routeur et application GHCR uniquement ;
- `nginx/templates/production.conf` et `maintenance.conf` : routes permutées à chaud ;
- `.env.deploy` : paramètres non secrets du déploiement ;
- `.env.production` : variables sensibles injectées uniquement dans `cesizen-web` ;
- `scripts/maintenance-on.sh`, `scripts/maintenance-off.sh`, `scripts/deploy.sh` :
  points d'entrée stables du workflow vers les opérations verrouillées.

Les fichiers `.env.deploy`, `.env.production`, `.deploy.lock` et la configuration
Nginx active sont ignorés par Git.

## 1. Préparer Ubuntu

Installer Docker Engine et le plugin Docker Compose v2 depuis le dépôt officiel
Docker, puis vérifier :

```bash
docker --version
docker compose version
docker info
```

La procédure maintenue par Docker pour Ubuntu est disponible ici :
<https://docs.docker.com/engine/install/ubuntu/>.

Le compte de déploiement doit pouvoir utiliser Docker. Après son ajout éventuel au
groupe `docker`, rouvrir sa session :

```bash
sudo usermod -aG docker "$USER"
```

Attention : l'accès au groupe `docker` équivaut pratiquement à un accès root. Réserver
ce compte à l'exploitation et protéger sa clé SSH.

Installer le dossier, sans y placer de secret dans Git :

```bash
sudo install -d -o deploy -g deploy -m 0750 /opt/cesizen
sudo -u deploy git clone <URL_DU_DEPOT> /opt/cesizen/source
cd /opt/cesizen/source/deploy
chmod 0750 scripts/deploy.sh scripts/maintenance-on.sh scripts/maintenance-off.sh
chmod 0640 common.sh
```

Le script utilise aussi les utilitaires Ubuntu standards `flock`, `install`, `mktemp`,
`sed` et `stat` (paquets `util-linux`, `coreutils` et `sed`).

## 2. Préparer le réseau Nginx Proxy Manager

Identifier le réseau Docker utilisé par le conteneur NPM :

```bash
docker inspect <CONTENEUR_NPM> \
  --format '{{range $name, $_ := .NetworkSettings.Networks}}{{println $name}}{{end}}'
```

Ce réseau doit être déclaré comme réseau externe dans la configuration Compose de
NPM afin que son nom reste stable. Exemple :

```yaml
services:
  app:
    networks:
      - default
      - npm-proxy

networks:
  npm-proxy:
    external: true
    name: npm-proxy
```

S'il n'existe pas encore :

```bash
docker network create npm-proxy
```

Redéployer ensuite NPM avec ce réseau et utiliser exactement son nom dans
`NPM_NETWORK`. Le Compose CesiZen y connecte `cesizen-router`. À chaque bascule, le
script vérifie aussi le conteneur de maintenance existant, le démarre si nécessaire
et le connecte à ce même réseau de façon idempotente. Il ne le crée, ne le recrée et
ne l'arrête jamais. `cesizen-web` reste seul sur le réseau privé du projet.

Le conteneur externe doit déjà servir la page de maintenance sur le port configuré.
Vérifier son existence avant le premier déploiement :

```bash
docker container inspect maintenance-web >/dev/null
```

Dans l'interface NPM, créer le Proxy Host avec :

- scheme : `http` ;
- forward hostname : `cesizen-router` ;
- forward port : `8080` ;
- WebSocket Support : activé ;
- certificat TLS, Force SSL et HTTP/2 : activés selon le domaine public.

Ne configurer ni `cesizen-web:3000` ni une adresse IP de conteneur dans NPM.

## 3. Configurer les environnements

```bash
cd /opt/cesizen/source/deploy
cp .env.deploy.example .env.deploy
cp .env.production.example .env.production
chmod 0600 .env.production
chmod 0640 .env.deploy
```

Modifier `.env.deploy` :

- `CESIZEN_IMAGE` doit être une référence complète `ghcr.io/...` avec tag explicite
  ou digest ; un digest ou un tag de commit immuable est recommandé ;
- `NPM_NETWORK` doit être le réseau externe préparé ci-dessus ;
- `MAINTENANCE_CONTAINER` est le nom du conteneur de maintenance existant
  (`maintenance-web` par défaut) ;
- `MAINTENANCE_PORT` est son port HTTP interne (`80` par défaut) ;
- `NGINX_IMAGE` est épinglée par défaut sur l'image stable officielle
  `nginx:1.30.4-alpine` ; un digest validé peut renforcer l'immutabilité ;
- les délais sont exprimés en secondes et doivent être des entiers positifs.

Modifier `.env.production` et remplacer tous les exemples. Le script vérifie sans les
afficher :

- une `DATABASE_URL` PostgreSQL ;
- un `BETTER_AUTH_SECRET` d'au moins 32 caractères ;
- un `BETTER_AUTH_URL` public en HTTPS.

Définir chacune de ces trois variables une seule fois. Leurs valeurs doivent être
littérales : les substitutions Compose de type `${VARIABLE}` ne sont volontairement
pas acceptées, afin que la valeur contrôlée soit exactement celle injectée au
conteneur.

Générer le secret, par exemple, avec `openssl rand -base64 48`. Ne jamais transmettre
le contenu de `.env.production` dans les logs CI.

Pour une image GHCR privée, connecter une fois le compte de déploiement avec un token
limité à `read:packages` :

```bash
printf '%s' "$GHCR_READ_TOKEN" | docker login ghcr.io -u <COMPTE_GITHUB> --password-stdin
unset GHCR_READ_TOKEN
```

## 4. Premier déploiement

`scripts/deploy.sh` vérifie la maintenance externe, l'active, télécharge l'image,
attend le healthcheck HTTP 200 de `cesizen-web` sur `/api/health`, puis remet la route
de production :

```bash
cd /opt/cesizen/source/deploy
./scripts/deploy.sh
```

Au premier déploiement, aucune image de rollback n'existe. Si la nouvelle application
n'est pas saine, la page de maintenance reste donc active jusqu'à correction.
Le conteneur externe de maintenance reste démarré après une réussite ; seule la route
du proxy change.

Le script n'exécute volontairement aucune migration destructive. Les migrations
Prisma nécessaires doivent être sauvegardées, testées et exécutées dans une étape CI
ou d'exploitation dédiée avant la remise en production.

## 5. Déploiements CI/CD

Le premier argument de `scripts/deploy.sh` est prioritaire sur `.env.deploy`. Une
étape CI distante peut ainsi déployer un digest immuable sans réécrire de fichier :

```bash
cd /opt/cesizen/source/deploy
./scripts/deploy.sh 'ghcr.io/organisation/cesizen@sha256:<DIGEST_64_HEXA>'
```

Le workflow peut transférer le contenu versionné de `deploy/` vers le répertoire de
déploiement, mais il ne doit jamais envoyer, supprimer ni remplacer `.env.deploy` ou
`.env.production`. Avec `rsync --delete`, ajouter des règles `protect`/`exclude` pour
ces deux fichiers avant toute mise en service du job. Aucun des scripts de ce dossier
n'écrit dans ces deux fichiers.

Configurer aussi la concurrence du workflow pour sérialiser le transfert et
`scripts/deploy.sh`. Le verrou interne sérialise les scripts, mais il ne peut pas
protéger des fichiers qu'un second job remplacerait avant de lancer son propre script.

L'authentification GHCR privée est un prérequis persistant du serveur : le workflow
ne transmet pas le token à `deploy.sh`. Exécuter `docker login ghcr.io` une fois avec
le compte de déploiement et renouveler le credential selon la politique de sécurité.

Une seule opération peut s'exécuter à la fois grâce à `.deploy.lock`. En cas d'échec :

1. l'image du conteneur courant a été étiquetée localement avant le pull ;
2. la nouvelle version est remplacée automatiquement par cette image ;
3. la route de production ne revient que si l'ancien conteneur redevient `healthy` ;
4. si le rollback ou le rechargement Nginx échoue, la maintenance reste active et le
   script termine en erreur pour faire échouer le job CI.

Même après un rollback réussi, `scripts/deploy.sh` termine en erreur : la production est
rétablie, mais la livraison demandée a échoué et doit rester visible dans la CI.

## 6. Configurer GitHub

Créer un environnement GitHub nommé `production`. Une règle d'approbation peut y être
ajoutée pour imposer une validation humaine juste avant le déploiement SSH.

La variable de dépôt facultative `DOCKER_PLATFORM` définit la plateforme du serveur
(`linux/amd64` par défaut ; utiliser `linux/arm64` pour un serveur ARM64).

Déclarer ensuite les variables suivantes dans l'environnement `production` :

- `DEPLOY_SSH_HOST` : nom DNS ou adresse du serveur Ubuntu ;
- `DEPLOY_SSH_PORT` : port SSH, facultatif (`22` par défaut) ;
- `DEPLOY_SSH_USER` : compte de déploiement membre du groupe Docker ;
- `DEPLOY_PATH` : dossier qui recevra le contenu de `deploy/`, par exemple
  `/opt/cesizen/source/deploy` avec l'installation décrite plus haut.

Déclarer aussi ces secrets dans le même environnement :

- `DEPLOY_SSH_PRIVATE_KEY` : clé privée dédiée, sans phrase secrète, dont la clé
  publique est autorisée pour le compte de déploiement ;
- `DEPLOY_SSH_KNOWN_HOSTS` : ligne `known_hosts` correspondant au serveur et au port
  SSH. Récupérer cette clé depuis un poste de confiance et comparer son empreinte avec
  celle affichée directement sur le serveur avant de l'enregistrer. Le workflow refuse
  volontairement une clé hôte absente ou inconnue.

Protéger ensuite `main` (ou `master`) en exigeant les trois jobs CI. Les releases
suivent les Conventional Commits : `fix:` produit un patch, `feat:` une version
mineure, et `feat!:` ou un pied `BREAKING CHANGE:` une version majeure. Les commits
comme `docs:` ou `chore:` ne publient pas de version avec la configuration actuelle.

## 7. Opérations manuelles

Activer la maintenance :

```bash
./scripts/maintenance-on.sh
```

Réactiver la production uniquement si `cesizen-web` est sain :

```bash
./scripts/maintenance-off.sh
```

Contrôler l'état et les journaux :

```bash
docker compose --env-file .env.deploy -f docker-compose.production.yml ps
docker logs --tail 100 cesizen-router
docker logs --tail 100 cesizen-web
docker logs --tail 100 maintenance-web
```

Valider la configuration sans démarrer les services :

```bash
PRODUCTION_ENV_FILE="$PWD/.env.production" \
  docker compose --env-file .env.deploy -f docker-compose.production.yml config --quiet
bash -n common.sh scripts/*.sh
```

Avant toute mise à jour importante, conserver une sauvegarde testée de PostgreSQL et
vérifier l'espace disque disponible pour l'image cible et l'image locale de rollback.
