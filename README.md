# ZooAPI

## Description

ZooAPI est une interface de programmation applicative (API) conçue pour faciliter la gestion à distance de multiples zoos. Avec ZooAPI, les propriétaires et les gestionnaires de zoos peuvent facilement surveiller et gérer leurs animaux, leurs enclos, et le personnel à travers une plateforme centralisée.

## Fonctionnalités

- **Gestion des Animaux**: Ajout, modification, et suppression d'informations relatives aux animaux.
- **Gestion des Enclos**: Suivi des enclos et de leur maintenance.
- **Gestion des Utilisateurs**: Administration des accès utilisateurs avec différents niveaux d'autorisation.
- **Authentification Sécurisée**: Protection de l'accès à l'API via JWT (JSON Web Tokens).

## Technologies Utilisées

- Node.js pour le serveur backend.
- Express pour la création de l'API.
- Sequelize comme ORM pour interagir avec la base de données.
- Middleware de validation pour s'assurer que les données reçues correspondent au schéma OpenAPI.

## Démarrage rapide

Pour installer et démarrer l'API :

1. Cloner le dépôt avec `git clone https://github.com/Xeaphones/zooapi.git`.
2. Installer les dépendances avec `npm install`.
3. Démarrer le serveur avec `npm start`.
4. Lancer la suite de tests unitaires avec `npm test`

## Tests

Pour lancer la suite de tests unitaires exécutez `npm test`.

## Documentation API

Consultez le fichier `zooapi.yml` pour la spécification OpenAPI complète.

Après avoir lancé le serveur, pour avoir accès au swagger [utilisez ce lien](http://localhost:3000/api/v1/documentation).

---

By Nolan & Yohan

