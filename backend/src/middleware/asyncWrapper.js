// backend/src/middleware/asyncWrapper.js
/**
 * Enveloppe un handler Express async pour propager les erreurs.
 * @param {Function} fn - Handler async
 * @returns {Function} Handler avec gestion d'erreur automatique
 */
const asyncWrapper = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncWrapper;


// backend/src/controllers/livresController.js — version async + PostgreSQL
import * as livresModel from '../models/livresModel.js';

/**
 * GET /api/v1/livres — récupère tous les livres avec filtres optionnels.
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
export const getLivres = async (req, res) => {
  const { genre, disponible, recherche } = req.query;
  const livres = await livresModel.findAll({ genre, disponible, recherche });
  res.json(livres);
};

/** GET /api/v1/livres/:id */
export const getLivreById = async (req, res) => {
  const livre = await livresModel.findById(req.params.id);
  if (!livre) return res.status(404).json({ erreur: `Livre id:${req.params.id} introuvable` });
  res.json(livre);
};

/** POST /api/v1/livres */
export const createLivre = async (req, res) => {
  const { isbn, titre, auteur, annee, genre } = req.body;
  const manquants = ['isbn', 'titre', 'auteur'].filter(k => !req.body[k]);
  if (manquants.length > 0)
    return res.status(400).json({ erreur: 'Champs manquants', champs: manquants });
  const nouveau = await livresModel.create({ isbn, titre, auteur, annee, genre });
  res.status(201).json(nouveau);
};

/** PUT /api/v1/livres/:id */
export const updateLivre = async (req, res) => {
  const livre = await livresModel.update(req.params.id, req.body);
  if (!livre) return res.status(404).json({ erreur: `Livre id:${req.params.id} introuvable` });
  res.json(livre);
};

/** DELETE /api/v1/livres/:id */
export const deleteLivre = async (req, res) => {
  const ok = await livresModel.remove(req.params.id);
  if (!ok) return res.status(404).json({ erreur: `Livre id:${req.params.id} introuvable` });
  res.status(204).send();
};