# MiniLib

> Application de gestion de bibliothèque

![React](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue) ![Docker](https://img.shields.io/badge/Docker-Compose-blue)

**Stack technique :** React · Node.js/Express · PostgreSQL · Docker  
**Architecture :** MVC · API REST  
**Type :** Projet solo - Fil rouge 4 semaines

---

## Description

MiniLib est une application web complète développée pour la bibliothèque municipale de Villemont. Elle permet de centraliser la gestion des livres, des adhérents et des emprunts via une interface web accessible depuis n'importe quel navigateur.

### Fonctionnalités principales

- **Catalogue de livres** : consulter, ajouter, modifier, supprimer et rechercher des livres
- **Gestion des adhérents** : gérer les membres de la bibliothèque
- **Gestion des emprunts** : enregistrer les emprunts et les retours
- **Suivi des retards** : identifier les livres en retard
- **Disponibilité en temps réel** : savoir quels livres sont disponibles

---

## Architecture technique

L'application suit une architecture 3-tiers avec séparation claire des responsabilités :

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  PRÉSENTATION   │      │     MÉTIER      │      │    DONNÉES      │      │      INFRA      │
├─────────────────┤      ├─────────────────┤      ├─────────────────┤      ├─────────────────┤
│   React 18      │ HTTP │ Node.js/Express │ SQL  │  PostgreSQL 15  │      │     Docker      │
│   localhost:3000│─────▶│  localhost:5000 │─────▶│  localhost:5432 │      │ docker-compose  │
└─────────────────┘      └─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## Structure du projet

```
minilib/
├── frontend/              # Application React
│   ├── src/
│   │   ├── components/    # Composants réutilisables (BookCard, Modal...)
│   │   ├── pages/         # Pages de l'app (Books, Members, Loans...)
│   │   ├── services/      # Appels API (api.js, bookService.js...)
│   │   └── App.jsx
│   └── package.json
│
├── backend/               # API Node.js / Express
│   ├── src/
│   │   ├── controllers/   # Logique de traitement des requêtes
│   │   ├── routes/        # Définition des endpoints REST
│   │   ├── models/        # Accès base de données (requêtes SQL)
│   │   ├── middleware/    # Validation, gestion erreurs, auth
│   │   └── app.js         # Point d'entrée Express
│   └── package.json
│
├── database/
│   ├── schema.sql         # Création des tables
│   └── seed.sql           # Données de test
│
├── docker-compose.yml     # Orchestration des 3 services
├── .env.example           # Template des variables d'environnement
├── .gitignore
└── README.md
```

---

## API REST - Endpoints

### Livres

| Méthode | Route             | Description            |
| ------- | ----------------- | ---------------------- |
| GET     | `/api/livres`     | Lister tous les livres |
| GET     | `/api/livres/:id` | Détail d'un livre      |
| POST    | `/api/livres`     | Ajouter un livre       |
| PUT     | `/api/livres/:id` | Modifier un livre      |
| DELETE  | `/api/livres/:id` | Supprimer un livre     |

### Adhérents

| Méthode | Route                | Description               |
| ------- | -------------------- | ------------------------- |
| GET     | `/api/adherents`     | Lister tous les adhérents |
| POST    | `/api/adherents`     | Créer un adhérent         |
| PUT     | `/api/adherents/:id` | Modifier un adhérent      |

### Emprunts

| Méthode | Route                      | Description                   |
| ------- | -------------------------- | ----------------------------- |
| GET     | `/api/emprunts`            | Lister les emprunts en cours  |
| POST    | `/api/emprunts`            | Enregistrer un emprunt        |
| PUT     | `/api/emprunts/:id/retour` | Enregistrer un retour         |
| GET     | `/api/emprunts/retards`    | Lister les emprunts en retard |

---

## Modèle de données

### Table `livres`

| Colonne    | Type         | Contraintes       |
| ---------- | ------------ | ----------------- |
| id         | SERIAL       | PRIMARY KEY       |
| isbn       | VARCHAR(13)  | UNIQUE NOT NULL   |
| titre      | VARCHAR(255) | NOT NULL          |
| auteur     | VARCHAR(255) | NOT NULL          |
| annee      | INTEGER      | CHECK (annee > 0) |
| genre      | VARCHAR(100) |                   |
| disponible | BOOLEAN      | DEFAULT TRUE      |

### Table `adherents`

| Colonne | Type         | Contraintes     |
| ------- | ------------ | --------------- |
| id      | SERIAL       | PRIMARY KEY     |
| numero  | VARCHAR(20)  | UNIQUE NOT NULL |
| nom     | VARCHAR(100) | NOT NULL        |
| prenom  | VARCHAR(100) | NOT NULL        |
| email   | VARCHAR(255) | UNIQUE NOT NULL |
| actif   | BOOLEAN      | DEFAULT TRUE    |

### Table `emprunts`

| Colonne               | Type    | Contraintes                   |
| --------------------- | ------- | ----------------------------- |
| id                    | SERIAL  | PRIMARY KEY                   |
| livre_id              | INTEGER | FK → livres(id) NOT NULL      |
| adherent_id           | INTEGER | FK → adherents(id) NOT NULL   |
| date_emprunt          | DATE    | NOT NULL DEFAULT CURRENT_DATE |
| date_retour_prevue    | DATE    | NOT NULL                      |
| date_retour_effective | DATE    | NULL                          |

### Règles métier

- Un adhérent ne peut pas avoir plus de **3 emprunts actifs** simultanément
- Un livre déjà emprunté ne peut pas être emprunté à nouveau (`disponible = FALSE`)
- La durée d'emprunt est fixée à **14 jours**
- Un emprunt est en retard si `date_retour_prevue < aujourd'hui` ET `date_retour_effective IS NULL`
- Quand un retour est enregistré, `disponible` repasse à `TRUE` automatiquement

---

## Installation et lancement

### Prérequis

- Node.js >= 18
- Docker et Docker Compose
- Git

### 1. Cloner le dépôt

```bash
git clone https://github.com/[votre-username]/minilib.git
cd minilib
```

### 2. Configuration des variables d'environnement

Créer un fichier `.env` à la racine à partir du template `.env.example` :

```bash
cp .env.example .env
```

Renseigner les variables nécessaires (base de données, ports, etc.)

### 3. Lancer l'application avec Docker

```bash
docker-compose up
```

L'application sera accessible aux adresses suivantes :

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000
- **PostgreSQL** : localhost:5432

### 4. Lancement en mode développement (sans Docker)

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

#### Base de données

Initialiser la base de données avec le schéma :

```bash
psql -U postgres -d minilib < database/schema.sql
psql -U postgres -d minilib < database/seed.sql
```

---

## Planning des sprints

| Sprint   | Semaine | Objectif                                                     |
| -------- | ------- | ------------------------------------------------------------ |
| Sprint 0 | S1      | Dépôt Git configuré, structure projet initialisée            |
| Sprint 1 | S2      | API REST complète pour les livres + BDD PostgreSQL connectée |
| Sprint 2 | S3      | Front React connecté à l'API + gestion adhérents             |
| Sprint 3 | S4      | Emprunts, retours, retards + Docker + soutenance             |

---

## Conventions de développement

### Commits

Respecter la convention [Conventional Commits](https://www.conventionalcommits.org/fr) :

```
type(scope): description

Exemples :
feat(api): add GET /api/livres endpoint
fix(front): correct book search filter
docs(readme): update installation instructions
```

### Branches

- Ne jamais travailler directement sur `main`
- Créer une branche par fonctionnalité : `feature/nom-fonctionnalite`
- Merger via pull request après validation

### Ce qui ne doit JAMAIS être commité

- `node_modules/`
- `.env`
- Fichiers de configuration IDE personnels
- Clés API ou mots de passe

---

## Ressources

- [Documentation React](https://react.dev)
- [Documentation Express](https://expressjs.com/fr)
- [Documentation PostgreSQL](https://www.postgresql.org/docs)
- [Documentation Docker Compose](https://docs.docker.com/compose)
- [Conventional Commits](https://www.conventionalcommits.org/fr)
- [HTTP Status Codes](https://httpstatuses.com)

---
