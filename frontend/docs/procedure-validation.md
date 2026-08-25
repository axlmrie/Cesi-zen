# Procedure de validation et PV de recette

## Objectif

La recette valide que la livraison CESIZen correspond aux exigences du Bloc 2 : prototype fonctionnel, modules comptes et informations, module diagnostic, documentation technique et tests.

## Roles

| Role              | Responsabilite                                                          |
| ----------------- | ----------------------------------------------------------------------- |
| Recetteur         | Execute les scenarios du cahier de tests et constate les resultats.     |
| Developpeur       | Prepare l'environnement, corrige les anomalies et documente les ecarts. |
| Pilote/validateur | Prononce l'acceptation, l'acceptation avec reserves ou le refus.        |

## Deroulement

1. Installer l'application avec le guide de `docs/documentation-technique.md`.
2. Initialiser la base et les donnees de test.
3. Dans `frontend`, executer `pnpm check`.
4. Dans `appli`, executer `pnpm check`.
5. Jouer les tests fonctionnels du cahier de tests.
6. Noter chaque resultat : conforme, conforme avec reserve, non conforme.
7. Prioriser les anomalies bloquantes avant livraison.
8. Signer le PV de recette.

## Criteres d'acceptation

- Le controle `pnpm check` du frontend passe.
- Les tests Jest, le typecheck et le lint de l'application mobile passent.
- Les comptes utilisateur/admin peuvent etre crees, modifies, desactives et anonymises.
- Les pages et menus d'information sont administrables et visibles cote public.
- Le diagnostic fonctionne pour un visiteur anonyme et peut etre sauvegarde par un utilisateur connecte.
- Les acces admin sont refuses aux comptes non admin.
- Les documents MLD, comparatif technique, guide d'installation et cahier de tests sont presents.

## Modele de PV de recette

| Champ           | Valeur                             |
| --------------- | ---------------------------------- |
| Projet          | CESIZen                            |
| Version testee  |                                    |
| Date de recette |                                    |
| Environnement   | Local / Preproduction / Production |
| Recetteur       |                                    |
| Developpeur     |                                    |

### Synthese

| Resultat                     | Nombre |
| ---------------------------- | ------ |
| Tests conformes              |        |
| Tests conformes avec reserve |        |
| Tests non conformes          |        |
| Anomalies bloquantes         |        |

### Decision

Decision retenue :

- [ ] Acceptation sans reserve
- [ ] Acceptation avec reserves
- [ ] Refus de recette

Commentaires :

```text

```

Signatures :

| Nom | Role        | Signature |
| --- | ----------- | --------- |
|     | Recetteur   |           |
|     | Developpeur |           |
|     | Validateur  |           |
