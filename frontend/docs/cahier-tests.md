# Cahier de tests CESIZen

Derniere mise a jour : 20/05/2026

Ce cahier couvre les modules obligatoires comptes utilisateurs et informations, ainsi que les modules diagnostic, respiration et journal d'emotions retenus dans le prototype.

## Tests unitaires automatises

Commande :

```bash
pnpm test:unit
```

| ID    | Module       | Scenario                                                    | Resultat attendu                                                    |
| ----- | ------------ | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| UT-01 | Informations | Generer un slug depuis un titre avec espaces et ponctuation | Le slug est stable et compatible URL.                               |
| UT-02 | Diagnostic   | Classer un score inferieur a 150                            | Niveau `Faible`.                                                    |
| UT-03 | Diagnostic   | Classer un score entre 150 et 299                           | Niveau `Modere`.                                                    |
| UT-04 | Diagnostic   | Classer un score superieur ou egal a 300                    | Niveau `Eleve`.                                                     |
| UT-05 | Diagnostic   | Refuser un score negatif ou invalide                        | Une erreur explicite est levee.                                     |
| UT-06 | Comptes      | Normaliser une mise a jour de profil valide                 | Prenom, nom et nom complet sont nettoyes.                           |
| UT-07 | Comptes      | Refuser un profil incomplet ou un age inferieur a 13 ans    | Une erreur de validation est retournee.                             |
| UT-08 | Journal      | Nettoyer une note de journal vide ou renseignee             | Une note vide devient `null`, sinon elle est trimmee.               |
| UT-09 | RGPD         | Construire les donnees anonymisees de suppression de compte | Email anonymise, compte inactif, donnees personnelles neutralisees. |
| UT-10 | RGPD         | Refuser une anonymisation sans identifiant utilisateur      | Une erreur explicite est levee.                                     |

## Liste des tests unitaires ajoutes ou mis a jour

| Date       | Fichier                      | Tests concernes | Objet                                                                                                 |
| ---------- | ---------------------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| 20/05/2026 | `tests/unit/cesizen.test.ts` | UT-08           | Ajout au rapport du test deja present sur le nettoyage des notes de journal.                          |
| 20/05/2026 | `tests/unit/cesizen.test.ts` | UT-09, UT-10    | Ajout des tests unitaires couvrant l'anonymisation RGPD utilisee par la suppression de compte mobile. |

## Tests fonctionnels manuels

| ID    | Module           | Preconditions           | Etapes                                                                  | Resultat attendu                                                            |
| ----- | ---------------- | ----------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| FT-01 | Comptes          | Aucun compte connecte   | Ouvrir `/auth/inscription`, saisir les champs obligatoires, valider     | Le compte est cree et l'utilisateur arrive sur son tableau de bord.         |
| FT-02 | Comptes          | Compte existant         | Ouvrir `/auth/connexion`, saisir email/mot de passe, valider            | L'utilisateur accede a `/dashboard`.                                        |
| FT-03 | Comptes          | Utilisateur connecte    | Ouvrir `/profil`, modifier prenom/nom/age                               | Les informations sont sauvegardees et visibles apres rafraichissement.      |
| FT-04 | Comptes admin    | Administrateur connecte | Ouvrir `/admin/utilisateurs`, creer un utilisateur                      | Le nouvel utilisateur apparait dans la liste.                               |
| FT-05 | Comptes admin    | Administrateur connecte | Desactiver un utilisateur                                               | Le statut passe a inactif et ses sessions sont supprimees.                  |
| FT-06 | Informations     | Administrateur connecte | Creer une page publiee dans `/admin/informations`                       | La page apparait dans `/informations`.                                      |
| FT-07 | Informations     | Administrateur connecte | Ajouter un menu vers `/diagnostic`                                      | Le menu apparait dans la navigation publique.                               |
| FT-08 | Diagnostic       | Visiteur anonyme        | Ouvrir `/diagnostic`, cocher plusieurs evenements, afficher le resultat | Le score et le niveau de stress sont affiches sans connexion.               |
| FT-09 | Diagnostic       | Utilisateur connecte    | Realiser un diagnostic puis sauvegarder                                 | Le resultat est enregistre et visible dans l'historique du tableau de bord. |
| FT-10 | Diagnostic admin | Administrateur connecte | Modifier les points d'un evenement dans `/admin/diagnostic`             | Le questionnaire public utilise la nouvelle valeur.                         |

## Tests de non regression

| ID    | Risque couvert              | Scenario                                       | Resultat attendu                                                |
| ----- | --------------------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| NR-01 | Perte de protection admin   | Acceder a `/admin` avec un compte non admin    | Page introuvable ou redirection, aucune donnee admin visible.   |
| NR-02 | Regression compte desactive | Desactiver un compte puis tenter une connexion | Le compte ne peut plus acceder aux routes protegees.            |
| NR-03 | Regression contenus         | Publier puis depublier une page information    | La page disparait de `/informations` quand `isPublie` est faux. |
| NR-04 | Regression diagnostic       | Supprimer/desactiver un evenement              | L'evenement ne doit plus participer au questionnaire public.    |
| NR-05 | Regression navigation       | Ajouter plusieurs menus avec ordres differents | La navigation respecte `ordreAffichage`.                        |

## Donnees de test conseillees

- Un compte administrateur actif.
- Un compte utilisateur actif.
- Un compte utilisateur desactive.
- Trois pages d'information : une publiee, une brouillon, une page de resultat diagnostic.
- Au moins cinq evenements de stress actifs.
