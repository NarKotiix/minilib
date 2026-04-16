// ─── backend/src/models/livresData.js ──────────────────────────────────
// Données de test en mémoire — remplacées par PostgreSQL jeudi
// Structure identique à ce que retournera la BDD

/**
 * @typedef {Object} Livre
 * @property {number}  id          - Identifiant unique
 * @property {string}  isbn        - Code ISBN-13
 * @property {string}  titre       - Titre du livre
 * @property {string}  auteur      - Nom de l'auteur
 * @property {number}  annee       - Année de publication
 * @property {string}  genre       - Genre littéraire
 * @property {boolean} disponible  - true si non emprunté
 */

/** @type {Livre[]} */
let livres = [
  {
    id: 1, isbn: '9780132350884', titre: 'Clean Code',
    auteur: 'Robert C. Martin', annee: 2008, genre: 'Informatique', disponible: true
  },
  {
    id: 2, isbn: '9780201633610', titre: 'Design Patterns',
    auteur: 'Gang of Four', annee: 1994, genre: 'Informatique', disponible: true
  },
  {
    id: 3, isbn: '9782070612758', titre: 'Le Petit Prince',
    auteur: 'Antoine de Saint-Exupéry', annee: 1943, genre: 'Roman', disponible: false
  },
  {
    id: 4, isbn: '9782070360024', titre: '1984',
    auteur: 'George Orwell', annee: 1949, genre: 'Roman', disponible: true
  },
  {
    id: 5, isbn: '9780201485677', titre: 'The Pragmatic Programmer',
    auteur: 'Andrew Hunt', annee: 1999, genre: 'Informatique', disponible: true
  },
];

// Compteur pour générer des ids uniques
let nextId = livres.length + 1;

/**
 * Retourne tous les livres, avec filtrage optionnel.
 *
 * @param {Object}  [filtres={}]         - Critères de filtrage
 * @param {string}  [filtres.genre]       - Filtrer par genre
 * @param {boolean} [filtres.disponible]  - Filtrer par disponibilité
 * @param {string}  [filtres.recherche]   - Recherche dans titre ou auteur
 * @returns {Livre[]} Tableau de livres filtré
 */
const findAll = (filtres = {}) => {
  const { genre, disponible, recherche } = filtres;
  return livres.filter(livre => {
    if (genre !== undefined && livre.genre !== genre) return false;
    if (disponible !== undefined && livre.disponible !== (disponible === 'true')) return false;
    if (recherche) {
      const t = recherche.toLowerCase();
      if (!livre.titre.toLowerCase().includes(t) &&
        !livre.auteur.toLowerCase().includes(t)) return false;
    }
    return true;
  });
};

/**
 * Trouve un livre par son identifiant.
 *
 * @param {number} id - L'identifiant recherché
 * @returns {Livre|undefined} Le livre ou undefined
 */
const findById = (id) => livres.find(l => l.id === Number(id));

/**
 * Crée un nouveau livre et l'ajoute en mémoire.
 *
 * @param {Omit<Livre, 'id'|'disponible'>} data - Données du livre sans id ni statut
 * @returns {Livre} Le livre créé avec son id et disponible = true
 */
const create = (data) => {
  const nouveau = {
    id: nextId++,
    ...data,
    disponible: true,   // un nouveau livre est disponible par défaut
  };
  livres.push(nouveau);
  return nouveau;
};

/**
 * Met à jour un livre existant.
 *
 * @param {number} id            - L'id du livre à modifier
 * @param {Partial<Livre>} data  - Les champs à modifier (partiels)
 * @returns {Livre|null} Le livre mis à jour, ou null si non trouvé
 */
const update = (id, data) => {
  const idx = livres.findIndex(l => l.id === Number(id));
  if (idx === -1) return null;
  // Spread : on garde les données existantes et on écrase avec les nouvelles
  livres[idx] = { ...livres[idx], ...data };
  return livres[idx];
};

/**
 * Supprime un livre par son identifiant.
 *
 * @param {number} id - L'id du livre à supprimer
 * @returns {boolean} true si supprimé, false si non trouvé
 */
const remove = (id) => {
  const avant = livres.length;
  livres = livres.filter(l => l.id !== Number(id));
  return livres.length < avant;   // true si un élément a été retiré
};

// Export de toutes les fonctions — pattern CommonJS
export { findAll, findById, create, update, remove };