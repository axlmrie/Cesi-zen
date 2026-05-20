# Qualite de code

CESIZen utilise ESLint et Prettier pour maintenir un code homogene, lisible et plus fiable.

## ESLint

La configuration se trouve dans `eslint.config.js` et utilise le format Flat Config d'ESLint 9.

Choix retenus :

- `next/core-web-vitals` : applique les regles recommandees par Next.js pour React, l'accessibilite de base et les bonnes pratiques de performance.
- `typescript-eslint recommendedTypeChecked` : active des regles basees sur le typage TypeScript pour detecter les usages dangereux, les promesses oubliees et les erreurs difficiles a voir a l'execution.
- `projectService: true` : permet a ESLint de s'appuyer sur `tsconfig.json` sans maintenir une configuration TypeScript separee.
- `eqeqeq`, `curly`, `prefer-const`, `no-implicit-coercion`, `no-throw-literal` : evitent les comportements JavaScript ambigus et rendent les intentions plus explicites.
- `consistent-type-imports` : encourage la separation des imports de types, utile pour un build plus clair et un code plus maintenable.
- `no-misused-promises` avec exception sur les attributs JSX : conserve la verification des promesses tout en restant compatible avec les handlers React.

## Prettier

La configuration se trouve dans `prettier.config.js`.

Choix retenus :

- `printWidth: 80` et `tabWidth: 2` : favorisent des fichiers lisibles sur petit ecran et en revue de code.
- `semi: true`, `singleQuote: false`, `trailingComma: "all"` : rendent le style stable et coherent avec le code existant.
- `endOfLine: "lf"` : evite les diffs parasites entre Windows, Linux et CI.
- `prettier-plugin-tailwindcss` : trie automatiquement les classes Tailwind pour limiter les incoherences visuelles et les conflits de merge.
- `tailwindFunctions: ["cn", "clsx"]` : applique aussi le tri Tailwind aux classes construites via helpers.

## Commandes

```bash
pnpm lint
pnpm format:check
pnpm format:write
pnpm check
```

`pnpm check` execute lint, verification Prettier, typecheck TypeScript et tests unitaires. C'est la commande a lancer avant une livraison.
