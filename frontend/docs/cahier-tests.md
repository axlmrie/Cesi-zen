# Cahier de tests CESIZen

Ce cahier couvre les deux modules obligatoires et le module diagnostic retenu comme module au choix.

## Tests unitaires automatises

Commande :

```bash
pnpm test:unit
```

| ID    | Module       | Scenario                                                    | Resultat attendu                          |
| ----- | ------------ | ----------------------------------------------------------- | ----------------------------------------- |
| UT-01 | Informations | Generer un slug depuis un titre avec espaces et ponctuation | Le slug est stable et compatible URL.     |
| UT-02 | Diagnostic   | Classer un score inferieur a 150                            | Niveau `Faible`.                          |
| UT-03 | Diagnostic   | Classer un score entre 150 et 299                           | Niveau `Modere`.                          |
| UT-04 | Diagnostic   | Classer un score superieur ou egal a 300                    | Niveau `Eleve`.                           |
| UT-05 | Diagnostic   | Refuser un score negatif ou invalide                        | Une erreur explicite est levee.           |
| UT-06 | Comptes      | Normaliser une mise a jour de profil valide                 | Prenom, nom et nom complet sont nettoyes. |
| UT-07 | Comptes      | Refuser un profil incomplet ou un age inferieur a 13 ans    | Une erreur de validation est retournee.   |

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
