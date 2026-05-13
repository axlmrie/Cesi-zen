# CESIZen

Prototype web CESIZen pour le Bloc 2 "Developper et tester les applications informatiques".

## Couverture de la consigne

- Comptes utilisateurs : inscription, connexion, profil, changement de mot de passe, export/suppression RGPD, gestion admin.
- Informations : pages publiees, menus front-office, administration des contenus.
- Diagnostic de stress : questionnaire public, scoring, sauvegarde pour utilisateur connecte, configuration admin.
- Respiration : exercices publics configurables par l'administrateur.
- Tracker emotions : journal utilisateur et referentiel admin, hors module principal retenu pour la recette.

Une application mobile n'est pas requise par la consigne fournie : le livrable attendu est un prototype fonctionnel d'application, et ce depot le couvre sous forme d'application web.

## Installation rapide

```bash
pnpm install
cp .env.example .env
docker compose up -d
pnpm db:push
pnpm exec prisma db seed
pnpm dev
```

## Verification qualite

```bash
pnpm check
```

La commande execute :

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test:unit`

## Documentation livrable

- [Conception base de donnees](docs/conception-base-donnees.md)
- [Documentation technique](docs/documentation-technique.md)
- [Cahier de tests](docs/cahier-tests.md)
- [Procedure de validation et PV de recette](docs/procedure-validation.md)
- [Qualite de code ESLint et Prettier](docs/qualite-code.md)
