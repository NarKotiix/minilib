// backend/src/middleware/asyncWrapper.js
/**
 * Enveloppe un handler Express async pour propager les erreurs.
 * @template {import('express').RequestHandler} T
 * @param {T} fn - Handler async
 * @returns {import('express').RequestHandler} Handler avec gestion d'erreur automatique
 */
const asyncWrapper = (fn) => /** @param {import('express').Request} req @param {import('express').Response} res @param {import('express').NextFunction} next */(req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncWrapper;


// backend/src/controllers/livresController.js — version async + PostgreSQL
import * as livresModel from '../models/livresModel.js';

/**
 * GET /api/v1/livres — récupère tous les livres avec filtres optionnels.
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
export const getLivres = async (/** @type {import('express').Request} */ req, /** @type {import('express').Response} */ res) => {
  const { genre, disponible, recherche } = req.query;
  const livres = await livresModel.findAll({ 
    genre: typeof genre === 'string' ? genre : undefined, 
    disponible: typeof disponible === 'string' ? (disponible === 'true') : undefined, 
    recherche: typeof recherche === 'string' ? recherche : undefined 
  });
  res.json(livres);
};

/** 
 * GET /api/v1/livres/:id 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getLivreById = async (/** @type {import('express').Request} */ req, /** @type {import('express').Response} */ res) => {
  const livre = await livresModel.findById(Number(req.params.id));
  if (!livre) return res.status(404).json({ erreur: `Livre id:${req.params.id} introuvable` });
  res.json(livre);
};

/** 
 * POST /api/v1/livres 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createLivre = async (/** @type {import('express').Request} */ req, /** @type {import('express').Response} */ res) => {
  const { isbn, titre, auteur, annee, genre } = req.body;
  const manquants = ['isbn', 'titre', 'auteur'].filter(k => !req.body[k]);
  if (manquants.length > 0)
    return res.status(400).json({ erreur: 'Champs manquants', champs: manquants });
  const nouveau = await livresModel.create({ isbn, titre, auteur, annee, genre });
  res.status(201).json(nouveau);
};

/** 
 * PUT /api/v1/livres/:id 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateLivre = async (/** @type {import('express').Request} */ req, /** @type {import('express').Response} */ res) => {
  const livre = await livresModel.update(Number(req.params.id), req.body);
  if (!livre) return res.status(404).json({ erreur: `Livre id:${req.params.id} introuvable` });
  res.json(livre);
};

/** 
 * DELETE /api/v1/livres/:id 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteLivre = async (/** @type {import('express').Request} */ req, /** @type {import('express').Response} */ res) => {
  const ok = await livresModel.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ erreur: `Livre id:${req.params.id} introuvable` });
  res.status(204).send();
};