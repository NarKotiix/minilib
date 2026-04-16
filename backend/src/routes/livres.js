// ─── backend/src/routes/livres.js ──────────────────────────────────────
// Routeur Express pour les livres
// Toutes ces routes sont préfixées par /api/v1/livres dans app.js

import express from 'express';
import asyncWrapper from '../middleware/asyncWrapper.js';
import * as controller from '../controllers/livresController.js';
const router = express.Router();

// GET /api/v1/livres           → liste tous les livres (+ filtres query params)
router.get('/', asyncWrapper(controller.getLivres));

// GET /api/v1/livres/:id       → détail d'un livre
router.get('/:id', asyncWrapper(controller.getLivreById));

// POST /api/v1/livres          → créer un nouveau livre
router.post('/', asyncWrapper(controller.createLivre));

// GET /api/v1/livres/recherche?q=clean
router.get('/recherche', asyncWrapper(async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ erreur: 'Paramètre q requis' });
  const resultats = await livresModel.findAll({ recherche: q });
  res.json({ query: q, total: resultats.length, resultats });
}));

// PUT /api/v1/livres/:id       → modifier un livre
router.put('/:id', asyncWrapper(controller.updateLivre));

// DELETE /api/v1/livres/:id    → supprimer un livre
router.delete('/:id', asyncWrapper(controller.deleteLivre));

export default router;