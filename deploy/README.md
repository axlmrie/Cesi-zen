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

Installer Docker Engine, le plugin Docker Compose v2 et `rsync`, puis vérifier :

```bash
sudo apt-get update
sudo apt-get install -y rsync
docker --version
docker compose version
docker info
rsync --version
```

La procédure maintenue par Docker pour Ubuntu est disponible ici :
<https://docs.docker.com/engine/install/ubuntu/>.

Enregistrer sur ce serveur un runner GitHub Actions auto-hébergé dédié à la production,
puis lui ajouter le label personnalisé `prod`. Installer le runner en dehors du
répertoire de déploiement persistant.

Le compte de service du runner doit pouvoir utiliser Docker. Après son ajout éventuel
au groupe `docker`, redémarrer le service du runner :

```bash
sudo usermod -aG docker <COMPTE_RUNNER>
```

Attention : l'accès au groupe `docker` équivaut pratiquement à un accès root. Ce
runner doit être réservé aux déploiements issus d'une branche protégée ; ne jamais y
exécuter les jobs de Pull Requests non approuvées.

Préparer le répertoire persistant, qui ne doit pas être placé dans le dossier `_work`
nettoyé par GitHub Actions :

```bash
RUNNER_USER=github-runner
DEPLOY_SOURCE=/chemin/vers/Cesi-zen/deploy

sudo install -d -o "$RUNNER_USER" -g "$RUNNER_USER" -m 0750 /opt/cesizen/deploy
sudo -u "$RUNNER_USER" install -m 0640 \
  "$DEPLOY_SOURCE/.env.deploy.example" /opt/cesizen/deploy/.env.deploy
sudo -u "$RUNNER_USER" install -m 0600 \
  "$DEPLOY_SOURCE/.env.production.example" /opt/cesizen/deploy/.env.production
```

Configurer ensuite ces deux fichiers comme décrit plus bas. Le job refuse de démarrer
s'ils sont absents. Les scripts utilisent aussi `flock`, `install`, `mktemp`,
`realpath`, `sed` et `stat`, fournis par les paquets Ubuntu standards.

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
cd /opt/cesizen/deploy
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

L'authentification GHCR du pipeline est temporaire et décrite dans la section 5.
Aucun jeton de registre ne doit être enregistré durablement dans ce dossier.

## 4. Premier déploiement

`scripts/deploy.sh` vérifie la maintenance externe, l'active, télécharge l'image,
attend le healthcheck HTTP 200 de `cesizen-web` sur `/api/health`, puis remet la route
de production :

```bash
cd /opt/cesizen/deploy
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

Le job de déploiement s'exécute directement sur le runner portant les labels
`self-hosted` et `prod`. Il ne nécessite ni SSH, ni SCP, ni secret de connexion au
serveur.

Le premier argument de `scripts/deploy.sh` est prioritaire sur `.env.deploy`. Le
workflow lui transmet la référence GHCR immuable produite par le build :

```bash
cd /opt/cesizen/deploy
./scripts/deploy.sh 'ghcr.io/organisation/cesizen@sha256:<DIGEST_64_HEXA>'
```

Le checkout GitHub reste dans le workspace éphémère du runner. Le workflow synchronise
ensuite `deploy/` vers `DEPLOY_PATH` avec `rsync`. Les règles
`protect` et `exclude` empêchent explicitement toute suppression ou modification de :

- `.env.deploy` ;
- `.env.production` ;
- `.deploy.lock` ;
- `nginx/runtime/*.conf`.

Les deux fichiers d'environnement doivent donc être créés une fois par
l'administrateur dans `DEPLOY_PATH`. Ils restent sur le serveur entre les jobs et ne
sont jamais copiés dans le workspace GitHub Actions.

Le job reçoit un `GITHUB_TOKEN` limité à `packages: read`. La connexion à GHCR
utilise un `DOCKER_CONFIG` temporaire supprimé à la fin du job ; aucune authentification
Docker persistante et aucun PAT ne sont nécessaires sur le serveur.

La concurrence GitHub `cesizen-production` sérialise les jobs, et `.deploy.lock`
sérialise les scripts d'exploitation. Éviter néanmoins une synchronisation manuelle
du répertoire pendant qu'un job est en cours, car le verrou applicatif n'est acquis
qu'au démarrage du script.

Une seule opération peut s'exécuter à la fois grâce à `.deploy.lock`. En cas d'échec :

1. l'image du conteneur courant a été étiquetée localement avant le pull ;
2. la nouvelle version est remplacée automatiquement par cette image ;
3. la route de production ne revient que si l'ancien conteneur redevient `healthy` ;
4. si le rollback ou le rechargement Nginx échoue, la maintenance reste active et le
   script termine en erreur pour faire échouer le job CI.

Même après un rollback réussi, `scripts/deploy.sh` termine en erreur : la production
est rétablie, mais la livraison demandée a échoué et doit rester visible dans la CI.

## 6. Configurer GitHub

Créer un environnement GitHub nommé `production`, limité à `main` ou `master`,
avec une règle d'approbation humaine avant déploiement.

Enregistrer le runner auto-hébergé au niveau approprié et lui attribuer le label
`prod`. Le job exige simultanément les labels `self-hosted` et `prod`.

Variables disponibles :

- variable de dépôt `DOCKER_PLATFORM`, facultative : plateforme de l'image
  (`linux/amd64` par défaut, `linux/arm64` pour un serveur ARM64) ;
- variable de l'environnement `production` `DEPLOY_PATH`, facultative :
  répertoire persistant, `/opt/cesizen/deploy` par défaut.

Aucune variable ni aucun secret SSH ne sont nécessaires. Pour une image GHCR privée,
accorder au dépôt Actions un accès en lecture au package ; le workflow utilise son
`GITHUB_TOKEN` avec les seules permissions `contents: read` et `packages: read`
dans le job de production.

Protéger `main` ou `master` en exigeant les jobs CI et les revues. Un runner
auto-hébergé exécute les scripts présents dans le commit avec l'accès Docker du compte
de service : limiter strictement les personnes pouvant modifier le workflow ou
approuver l'environnement, dédier ce runner à la production et maintenir son système
à jour.

Les releases suivent les Conventional Commits : `fix:` produit un patch, `feat:`
une version mineure, et `feat!:` ou un pied `BREAKING CHANGE:` une version majeure.
Les commits comme `docs:` ou `chore:` ne publient pas de version avec la
configuration actuelle.

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
