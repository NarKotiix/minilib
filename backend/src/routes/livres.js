// ─── backend/src/routes/livres.js ──────────────────────────────────────
// Routeur Express pour les livres
// Toutes ces routes sont préfixées par /api/v1/livres dans app.js

import express from 'express';
const router = express.Router();
import * as controller from '../controllers/livresController.js';

// GET /api/v1/livres           → liste tous les livres (+ filtres query params)
router.get('/', controller.getLivres);

// GET /api/v1/livres/:id       → détail d'un livre
router.get('/:id', controller.getLivreById);

// POST /api/v1/livres          → créer un nouveau livre
router.post('/', controller.createLivre);

// PUT /api/v1/livres/:id       → modifier un livre
router.put('/:id', controller.updateLivre);

// DELETE /api/v1/livres/:id    → supprimer un livre
router.delete('/:id', controller.deleteLivre);

export default router;