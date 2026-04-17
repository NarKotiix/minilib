// ─── backend/src/controllers/livresController.js ──────────────────────
// Controller pour les livres — logique métier entre les routes et les données

import * as livresModel from '../models/livresModel.js';

/**
 * Récupère tous les livres avec filtres optionnels via query params.
 * GET /api/v1/livres?genre=Informatique&disponible=true&recherche=clean
 *
 * @param {import('express').Request}  req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 */
const getLivres = async (req, res) => {
  try {
    // req.query contient les paramètres de l'URL (?genre=...&disponible=...)
    const { genre, disponible, recherche } = req.query;
    const livres = await livresModel.findAll({ 
      genre: typeof genre === 'string' ? genre : undefined, 
      disponible: typeof disponible === 'string' ? (disponible === 'true') : undefined, 
      recherche: typeof recherche === 'string' ? recherche : undefined 
    });
    res.json(livres);   // 200 OK implicite
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur lors de la récupération des livres' });
  }
};

/**
 * Récupère un livre par son id.
 * GET /api/v1/livres/:id
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
const getLivreById = async (req, res) => {
  const livre = await livresModel.findById(Number(req.params.id));
  if (!livre) {
    // 404 Not Found — ressource inexistante
    return res.status(404).json({ erreur: `Livre id:${req.params.id} non trouvé` });
  }
  res.json(livre);
};

/**
 * Crée un nouveau livre.
 * POST /api/v1/livres
 * Body JSON attendu : { isbn, titre, auteur, annee, genre }
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
const createLivre = async (req, res) => {
  const { isbn, titre, auteur, annee, genre } = req.body;

  // ── Validation des champs obligatoires ──────────────────────────────
  const champsManquants = [];
  if (!isbn) champsManquants.push('isbn');
  if (!titre) champsManquants.push('titre');
  if (!auteur) champsManquants.push('auteur');

  if (champsManquants.length > 0) {
    // 400 Bad Request — données invalides envoyées par le client
    return res.status(400).json({
      erreur: 'Champs obligatoires manquants',
      champs: champsManquants,
    });
  }

  const nouveau = await livresModel.create({ isbn, titre, auteur, annee, genre });
  // 201 Created — ressource créée avec succès
  res.status(201).json(nouveau);
};

/**
 * Met à jour un livre existant.
 * PUT /api/v1/livres/:id
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
const updateLivre = async (req, res) => {
  const misAJour = await livresModel.update(Number(req.params.id), req.body);
  if (!misAJour) {
    return res.status(404).json({ erreur: `Livre id:${req.params.id} non trouvé` });
  }
  res.json(misAJour);
};

/**
 * Supprime un livre.
 * DELETE /api/v1/livres/:id
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
const deleteLivre = async (req, res) => {
  const supprimé = await livresModel.remove(Number(req.params.id));
  if (!supprimé) {
    return res.status(404).json({ erreur: `Livre id:${req.params.id} non trouvé` });
  }
  // 204 No Content — succès sans corps de réponse
  res.status(204).send();
};

export { getLivres, getLivreById, createLivre, updateLivre, deleteLivre };