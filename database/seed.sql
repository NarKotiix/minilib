-- database/seed.sql
-- Données de test MiniLib
-- Exécuter après schema.sql : psql -U minilib_user -d minilib -f database/seed.sql

INSERT INTO livres (isbn, titre, auteur, annee, genre) VALUES
  ('9780132350884', 'Clean Code',              'Robert C. Martin', 2008, 'Informatique'),
  ('9780201633610', 'Design Patterns',         'Gang of Four',     1994, 'Informatique'),
  ('9782070612758', 'Le Petit Prince',         'Saint-Exupéry',    1943, 'Roman'),
  ('9782070360024', '1984',                    'George Orwell',    1949, 'Roman'),
  ('9780596517748', 'JavaScript: Good Parts',  'D. Crockford',     2008, 'Informatique');

INSERT INTO adherents (numero_adherent, nom, prenom, email) VALUES
  ('ADH-001', 'Martin',   'Alice',  'alice.martin@email.com'),
  ('ADH-002', 'Dupont',   'Bob',    'bob.dupont@email.com'),
  ('ADH-003', 'Bernard',  'Claire', 'claire.bernard@email.com');

-- Simule un emprunt en cours (Le Petit Prince emprunté par Alice)
INSERT INTO emprunts (livre_id, adherent_id, date_retour_prevue) VALUES
  (3, 1, CURRENT_DATE + INTERVAL '14 days');

-- Marquer le livre comme indisponible
UPDATE livres SET disponible = false WHERE id = 3;