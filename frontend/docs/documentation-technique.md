# Documentation technique CESIZen

## Perimetre prototype

Le prototype couvre les deux modules obligatoires du sujet, plus plusieurs modules au choix :

| Module               | Statut                                    | Routes principales                                                       |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| Comptes utilisateurs | Obligatoire, implemente                   | `/auth/inscription`, `/auth/connexion`, `/profil`, `/admin/utilisateurs` |
| Informations         | Obligatoire, implemente                   | `/informations`, `/admin/informations`                                   |
| Diagnostic           | Module au choix, implemente               | `/diagnostic`, `/admin/diagnostic`                                       |
| Respiration          | Module au choix, implemente               | `/respiration`, `/admin/respiration`                                     |
| Tracker emotions     | Module au choix, partiellement implemente | `/journal`, `/admin/emotions`                                            |
| Activites detente    | Non retenu                                | Non implemente                                                           |

Le module retenu pour le cahier de tests est le diagnostic de stress, car il couvre un usage visiteur anonyme, un usage utilisateur connecte et une configuration administrateur.

## Architecture retenue

Architecture full-stack Next.js avec App Router :

- Frontend React 19 et Tailwind CSS.
- Backend via Server Components, Server Actions et routes API Better Auth.
- Base PostgreSQL pilotee par Prisma.
- Authentification Better Auth avec adaptateur Prisma.
- Tests unitaires automatises via `node:test` execute par `tsx`.

## Comparatif des solutions envisagees

| Critere            | Next.js full-stack                                 | SPA React + API REST separee           | Microservices API + front dedie       |
| ------------------ | -------------------------------------------------- | -------------------------------------- | ------------------------------------- |
| Delai de prototype | Tres favorable : un seul projet et routage integre | Moyen : deux applications a maintenir  | Defavorable pour un projet individuel |
| Maintenabilite     | Bonne si les Server Actions restent focalisees     | Bonne separation front/back            | Complexite elevee                     |
| Performance        | SSR/RSC, chargement initial efficace               | Dependance forte aux appels API client | Variable selon orchestration          |
| Securite           | Donnees sensibles manipulees cote serveur          | API a securiser explicitement          | Surface d'attaque plus large          |
| Tests              | Unitaires simples, fonctionnels possibles          | Tests front et API separes             | Tests d'integration plus lourds       |
| Adequation Bloc 2  | Tres bonne                                         | Bonne mais plus longue                 | Surdimensionnee                       |

Choix final : Next.js full-stack, car il permet de livrer rapidement un prototype coherent avec authentification, base relationnelle, back-office et pages publiques, tout en restant maintenable pour un projet individuel.

## Guide d'installation

Prerequis :

- Node.js 20 ou plus.
- pnpm 10.
- Docker Desktop ou une base PostgreSQL accessible.

Installation :

```bash
pnpm install
cp .env.example .env
```

Configurer `DATABASE_URL` dans `.env`, puis demarrer PostgreSQL :

```bash
docker compose up -d
pnpm db:push
pnpm exec prisma db seed
```

Demarrer l'application :

```bash
pnpm dev
```

Verification qualite :

```bash
pnpm check
```

Cette commande execute le lint, le typecheck TypeScript et les tests unitaires automatises.

## Securite et qualite

- Les pages d'administration passent par `requireAdminPage` et les Server Actions admin par `requireAdminAction`.
- Les comptes desactives ne peuvent plus acceder aux routes protegees.
- Les suppressions utilisateur sont anonymisees pour limiter l'exposition des donnees personnelles.
- Les actions serveur recalculent les scores diagnostic depuis les evenements actifs lorsqu'un utilisateur sauvegarde un resultat.
- La qualite de code est controlee par ESLint, Prettier, TypeScript et des tests unitaires. Les choix de configuration sont detailles dans `docs/qualite-code.md`.
