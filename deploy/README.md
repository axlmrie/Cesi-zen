# Déploiement de production CesiZen

Ce dossier déploie l'image web publiée sur GHCR derrière un routeur Nginx stable.
Nginx Proxy Manager (NPM) ne cible jamais directement le conteneur applicatif :

```text
Internet -> Nginx Proxy Manager -> cesizen-router:8080
                                      |-- cesizen-web:3000 (réseau privé Compose)
                                      `-- maintenance-web:80 (conteneur externe existant)

cesizen-web -> glpi:80 (réseau externe support-tier, API serveur uniquement)
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
ne l'arrête jamais. `cesizen-web` rejoint le réseau privé du projet, le réseau
MariaDB externe et le réseau GLPI externe ; le routeur n'accède ni à la base ni à
GLPI.

Le réseau MariaDB partagé doit lui aussi exister avant le déploiement :

```bash
docker network inspect db-tier >/dev/null
```

Créer une fois le réseau privé d'intégration GLPI, puis le déclarer comme réseau
externe dans les Compose GLPI et CesiZen :

```bash
docker network create support-tier
```

Exemple à ajouter au Compose qui gère le conteneur `glpi` :

```yaml
services:
  glpi:
    networks:
      - default
      - support-tier

networks:
  support-tier:
    external: true
```

Le nom DNS `glpi` devient alors résolvable depuis `cesizen-web` sans publier le port
80 sur l'hôte. Vérifier les deux rattachements avant le premier déploiement :

```bash
docker network inspect support-tier \
  --format '{{range .Containers}}{{println .Name}}{{end}}'
```

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
- `DATABASE_NETWORK` doit être le réseau externe partagé avec MariaDB (`db-tier`) ;
- `GLPI_NETWORK` doit être le réseau externe partagé avec GLPI (`support-tier`) ;
- `MAINTENANCE_CONTAINER` est le nom du conteneur de maintenance existant
  (`maintenance-web` par défaut) ;
- `MAINTENANCE_PORT` est son port HTTP interne (`80` par défaut) ;
- `NGINX_IMAGE` est épinglée par défaut sur l'image stable officielle
  `nginx:1.30.4-alpine` ; un digest validé peut renforcer l'immutabilité ;
- les délais sont exprimés en secondes et doivent être des entiers positifs.

Modifier `.env.production` et remplacer tous les exemples. Le script vérifie sans les
afficher :

- une `DATABASE_URL` MariaDB au format `mysql://...` ;
- un `BETTER_AUTH_SECRET` d'au moins 32 caractères ;
- un `BETTER_AUTH_URL` public en HTTPS.

L'intégration support GLPI est facultative. Pour la désactiver, laisser toutes les
variables `GLPI_*` vides ou absentes. Pour l'activer, renseigner ensemble :

- `GLPI_API_URL`, de préférence l'URL Docker interne
  `http://glpi/apirest.php` ;
- `GLPI_APP_TOKEN` et `GLPI_USER_TOKEN`, issus d'un compte technique GLPI aux droits
  minimaux ;
- `GLPI_CATEGORY_ACCOUNT_ID`, `GLPI_CATEGORY_TECHNICAL_ID`,
  `GLPI_CATEGORY_USAGE_ID`, `GLPI_CATEGORY_PRIVACY_ID` et
  `GLPI_CATEGORY_OTHER_ID`, tous sous forme d'entiers strictement positifs ;
- `GLPI_TIMEOUT_MS`, facultatif, compris entre 100 et 60000 millisecondes.

Les jetons restent exclusivement dans `.env.production` (mode 0600) et ne sont
jamais transmis au navigateur, placés dans `.env.deploy` ou enregistrés comme sortie
du pipeline. Le script refuse une configuration GLPI partielle, des placeholders et
des identifiants de catégorie invalides ou dupliqués.

### 3.1. Préparer GLPI pour CESIZen

Cette intégration utilise l'API REST historique de GLPI (`/apirest.php`), car c'est
elle qui accepte le couple App-Token / User-Token. Dans **Configuration > Générale >
API**, activer l'API REST historique et l'authentification par jeton externe, puis :

1. créer un client API actif nommé par exemple `CESIZen`, récupérer son App-Token et,
   si une restriction IP est configurée, autoriser le sous-réseau Docker de
   `support-tier` ;
2. créer un utilisateur technique dédié `cesizen-api`, limité à l'entité qui recevra
   les demandes, puis générer sa clé d'accès distante (User-Token) ;
3. attribuer à son profil uniquement les droits **créer un ticket** et **voir ses
   propres tickets**. Ne pas lui accorder les droits de voir tous les tickets,
   d'administrer, d'affecter, de supprimer ou de purger ;
4. créer cinq catégories ITIL et reporter leurs IDs numériques dans les variables :
   `Compte et connexion`, `Problème technique`, `Utilisation de CESIZen`,
   `Données personnelles` et `Autre demande` ;
5. conserver le compte dans une entité unique. Comme les IDs sont configurés côté
   serveur, aucun droit de modification des catégories n'est nécessaire.

Le navigateur ne contacte jamais GLPI : `cesizen-web` ouvre une session API courte,
crée ou lit les tickets, puis la ferme. Une table MariaDB associe chaque numéro GLPI à
l'utilisateur CESIZen propriétaire ; aucune route n'accepte un numéro arbitraire du
navigateur. Le compte technique partagé ne doit donc jamais être utilisé manuellement
pour créer des tickets qui seraient présentés comme appartenant à un utilisateur.

L'intégration actuelle affiche l'état d'avancement mais pas les suivis/commentaires
GLPI. Aucun droit sur les suivis n'est donc requis. Si cette fonction est ajoutée plus
tard, n'autoriser que la lecture des suivis publics et filtrer systématiquement ceux
marqués privés.

Ne pas utiliser l'URL publique `http://glpi-zen.duckdns.org` pour les jetons : HTTP ne
les chiffre pas. Utiliser `http://glpi/apirest.php` sur `support-tier`, ou une URL
publique HTTPS correctement certifiée si le réseau interne n'est pas disponible.

L'URL MariaDB suit le format `mysql://USER:PASSWORD@HOST:3306/DATABASE`. Encoder
en pourcentage les caractères réservés du nom d'utilisateur et du mot de passe
(`@` devient `%40`, par exemple) ; ne pas entourer une valeur réelle de chevrons.

Pour le déploiement automatisé des migrations, l'utilisateur MariaDB de `DATABASE_URL`
doit également disposer des droits DDL strictement nécessaires aux migrations validées
(`CREATE`, `ALTER`, `DROP`, etc.). `prisma migrate deploy` ne requiert pas de shadow
database en production. Vérifier ces droits avant l'activation sans afficher l'URL
dans les journaux.

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
applique les migrations, remplace l'application, attend une réponse HTTP 200 de
`cesizen-web` sur `/api/health`, puis remet la route de production :

```bash
cd /opt/cesizen/deploy
./scripts/deploy.sh \
  'ghcr.io/organisation/cesizen@sha256:<DIGEST_64_HEXA>'
```

Au premier déploiement, aucune image de rollback n'existe. Si la nouvelle application
n'est pas saine, la page de maintenance reste donc active jusqu'à correction.
Le conteneur externe de maintenance reste démarré après une réussite ; seule la route
du proxy change.

### 4.1. Migrations Prisma et baseline initiale

Le déploiement exécute les migrations présentes dans l'image cible avant de remplacer
`cesizen-web`. L'image runtime contient la version verrouillée de la CLI Prisma, le
schéma et tout le dossier `/app/prisma/migrations`. Depuis `/app`, le script exécute :

```bash
prisma migrate deploy
```

Elle s'exécute dans un conteneur Compose ponctuel construit à partir de la même
référence GHCR immuable que l'application. Compose lui injecte `.env.production` et le
connecte à `cesizen-backend`. Aucune migration n'est exécutée par le runner lui-même
et la base n'est jamais exposée à GitHub. Un lien local dans `node_modules/.bin`
expose directement la CLI déjà installée dans l'image, sans télécharger de paquet au
moment du déploiement. `npm` et `npx` sont retirés de l'image finale afin de réduire sa
surface d'attaque. Prisma découvre alors `/app/prisma/schema.prisma` et son historique
automatiquement.

Le conteneur `cesizen-web` rejoint les réseaux Docker externes définis par
`DATABASE_NETWORK` (`db-tier` par défaut) et `GLPI_NETWORK` (`support-tier` par
défaut). Le conteneur MariaDB partagé doit rejoindre le premier et le conteneur GLPI
le second. `DATABASE_URL` utilise le nom DNS Docker de MariaDB, par exemple
`mariadb-shared`, et `GLPI_API_URL` utilise celui de GLPI. Aucune adresse IP de
conteneur ne doit être enregistrée et il n'est pas nécessaire de publier les ports
3306 ou 80 sur l'hôte. L'utilisateur de `DATABASE_URL` doit posséder les droits DDL
sur la seule base CESIZen pour permettre les migrations Prisma.

L'ordre appliqué est le suivant :

1. valider l'environnement, acquérir `.deploy.lock` et conserver l'image applicative
   précédente pour un éventuel rollback ;
2. activer la maintenance, puis télécharger l'image cible ;
3. exécuter `prisma migrate deploy` avec **l'image cible**, avant de remplacer
   `cesizen-web` ;
4. seulement après une migration réussie, recréer l'application, attendre une réponse
   HTTP 200 sur `/api/health`, puis remettre la route de production.

Un rollback automatique restaure uniquement l'image applicative : il ne doit jamais
tenter d'annuler automatiquement une migration SQL déjà réussie. Prisma ne génère pas
automatiquement de migration descendante pour ce cas. Chaque migration de production
doit donc rester compatible avec l'ancienne version de l'application selon une
stratégie _expand/contract_ : ajouter d'abord les nouvelles structures, migrer les
données et le code, puis supprimer les anciennes structures dans une release
ultérieure. Tester aussi la restauration d'une sauvegarde MariaDB avant toute
migration importante.

Si une migration ou la nouvelle application échoue, le script tente de restaurer
l'image applicative précédente et ne réactive la production que si son endpoint HTTP
répond. Cette restauration **n'annule aucune modification de la base**. En l'absence
d'une ancienne image saine, la maintenance reste active et le job échoue. Comme
`/api/health` teste désormais la connexion par une requête minimale, le script ne
réexpose pas une ancienne version incapable d'utiliser la base. Ce contrôle ne prouve
toutefois pas la compatibilité de l'ensemble du schéma : les migrations
_expand/contract_ restent indispensables.

Après un échec de migration, ne pas effacer ou modifier directement la table
`_prisma_migrations`. Diagnostiquer l'état de la base, corriger ou terminer le SQL si
nécessaire, puis utiliser explicitement `prisma migrate resolve --rolled-back ...` ou
`--applied ...` selon la procédure de récupération validée.

#### Baseline unique d'une base existante

Le dépôt contient une migration initiale `frontend/prisma/migrations/0_init`. Toute
base de production existante qui possède déjà ces tables doit être baselinée **avant
le premier déploiement automatisé**. Sinon Prisma tentera d'appliquer `0_init` et
échouera sur les objets existants. Cette opération reste manuelle et ne doit jamais
être automatisée dans `deploy.sh` :

1. sauvegarder MariaDB et tester la restauration sur une copie isolée ;
2. vérifier que `prisma/schema.prisma` décrit exactement la base existante, de
   préférence en comparant avec une copie de production ;
3. relire et faire valider le SQL versionné dans
   `prisma/migrations/0_init/migration.sql` ;
4. sur **chaque base existante seulement**, depuis `frontend/` et avec la bonne
   `DATABASE_URL`, marquer cette baseline comme déjà appliquée sans exécuter son SQL :

   ```bash
   pnpm exec prisma migrate resolve \
     --applied 0_init \
     --schema prisma/schema.prisma
   pnpm exec prisma migrate status --schema prisma/schema.prisma
   ```

5. conserver la sortie de `migrate status` et tester ensuite un déploiement sur une
   copie de production.

Une nouvelle base vide appliquera normalement `0_init` via `migrate deploy`. Ne jamais
exécuter manuellement `0_init/migration.sql` sur une base existante déjà baselinée, et
ne jamais modifier une migration déjà appliquée : créer une nouvelle migration avec
`prisma migrate dev --name <description>` depuis une base de développement.

Le job `deploy` dispose déjà de `packages: read` et n'a besoin d'aucune permission
GitHub supplémentaire : les identifiants de base restent dans `.env.production` sur
le serveur. Sa limite actuelle de 20 minutes inclut la migration et devra être ajustée
si sa durée maximale testée l'exige ; `DEPLOY_HEALTH_TIMEOUT` ne couvre que le
démarrage de l'application.

La CI exécute `prisma validate`, vérifie la présence de `0_init`, puis applique tout
l'historique sur un service MariaDB 11.4 vierge. Elle contrôle ensuite
`prisma migrate status`, compare le schéma obtenu au modèle Prisma et relance
`migrate deploy` pour vérifier qu'aucune migration ne reste en attente. Un test
d'intégration écrit et relit aussi les champs longs Better Auth, utilise une
transaction sérialisable et vérifie les suppressions en cascade. Les scénarios de
`deploy/tests/` sont également exécutés et le build de l'image confirme que la CLI
verrouillée est résoluble hors ligne.

Références Prisma officielles :

- [baseliner une base existante](https://docs.prisma.io/docs/orm/v6/prisma-migrate/workflows/baselining) ;
- [déployer les migrations en production](https://docs.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate) ;
- [commande `migrate deploy`](https://www.prisma.io/docs/cli/migrate/deploy) ;
- [stratégie de migration de données _expand/contract_](https://docs.prisma.io/docs/guides/database/data-migration).

## 5. Déploiements CI/CD

Le job de déploiement s'exécute directement sur le runner portant les labels
`self-hosted` et `prod`. Il ne nécessite ni SSH, ni SCP, ni secret de connexion au
serveur.

`scripts/deploy.sh` exige comme unique argument un digest GHCR immuable en minuscules ;
un tag mutable ou l'absence d'argument est refusé avant toute modification. Le workflow
lui transmet la référence produite par le build :

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

Après un déploiement réussi, le script exécute `docker image prune --all --force`.
Cette commande est globale au daemon Docker : elle supprime toutes les images qui ne
sont référencées par aucun conteneur, y compris celles d'autres projets, et pas
uniquement les anciennes images CesiZen. Elle ne supprime ni conteneur ni volume, mais
peut imposer de nouveaux téléchargements et élimine l'ancien cache de rollback local.
Réserver ce comportement à un hôte Docker dédié ; sur un serveur partagé, remplacer
ce nettoyage par une politique explicitement limitée aux images CesiZen avant la mise
en service.

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

Avant toute mise à jour importante, conserver une sauvegarde testée de MariaDB et
vérifier l'espace disque disponible pour l'image cible et l'image locale de rollback.
