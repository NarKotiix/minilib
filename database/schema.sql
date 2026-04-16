-- database/schema.sql
-- Schéma BDD MiniLib — PostgreSQL 18
-- Compatible PostgreSQL 12+. Exécuter avec : psql -U minilib_user -d minilib -f database/schema.sql


-- Suppression dans l'ordre inverse des dépendances (pour reset propre)
DROP TABLE IF EXISTS emprunts;
DROP TABLE IF EXISTS livres;
DROP TABLE IF EXISTS adherents;

-- Table livres
CREATE TABLE livres (
  id          SERIAL PRIMARY KEY,
  isbn        VARCHAR(13)  UNIQUE NOT NULL,
  titre       VARCHAR(255) NOT NULL,
  auteur      VARCHAR(255) NOT NULL,
  annee       INTEGER      CHECK (annee > 0 AND annee <= EXTRACT(YEAR FROM NOW())),
  genre       VARCHAR(100),
  disponible  BOOLEAN      NOT NULL DEFAULT TRUE
);

-- Table adherents
CREATE TABLE adherents (
  id              SERIAL PRIMARY KEY,
  numero_adherent VARCHAR(20)  UNIQUE NOT NULL,
  nom             VARCHAR(100) NOT NULL,
  prenom          VARCHAR(100) NOT NULL,
  email           VARCHAR(255) UNIQUE NOT NULL,
  actif           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table emprunts
CREATE TABLE emprunts (
  id                     SERIAL PRIMARY KEY,
  livre_id               INTEGER NOT NULL REFERENCES livres(id),
  adherent_id            INTEGER NOT NULL REFERENCES adherents(id),
  date_emprunt           DATE    NOT NULL DEFAULT CURRENT_DATE,
  date_retour_prevue     DATE    NOT NULL,
  date_retour_effective  DATE,   -- NULL = pas encore rendu
  CONSTRAINT chk_dates CHECK (date_retour_prevue >= date_emprunt)
);

-- Index pour accélérer les recherches fréquentes
CREATE INDEX idx_livres_titre  ON livres(titre);
CREATE INDEX idx_livres_auteur ON livres(auteur);
CREATE INDEX idx_adherents_email ON adherents(email);
CREATE INDEX idx_emprunts_actifs ON emprunts(adherent_id) WHERE date_retour_effective IS NULL;