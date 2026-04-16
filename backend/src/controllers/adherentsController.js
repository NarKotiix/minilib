// backend/src/controllers/adherentsController.js
import * as adherentsModel from '../models/adherentsModel.js';

/** GET /api/v1/adherents */
export const getAdherents = async (req, res) => {
  const adherents = await adherentsModel.findAll();
  res.json(adherents);
};

/** GET /api/v1/adherents/:id */
export const getAdherentById = async (req, res) => {
  const adherent = await adherentsModel.findById(req.params.id);
  if (!adherent)
    return res.status(404).json({ erreur: `Adhérent id:${req.params.id} introuvable` });
  res.json(adherent);
};

/** POST /api/v1/adherents */
export const createAdherent = async (req, res) => {
  const { nom, prenom, email } = req.body;
  const manquants = ['nom', 'prenom', 'email'].filter(k => !req.body[k]);
  if (manquants.length > 0)
    return res.status(400).json({ erreur: 'Champs manquants', champs: manquants });
  const nouveau = await adherentsModel.create({ nom, prenom, email });
  res.status(201).json(nouveau);
};

/** DELETE /api/v1/adherents/:id — soft delete */
export const desactiverAdherent = async (req, res) => {
  const adherent = await adherentsModel.desactiver(req.params.id);
  if (!adherent)
    return res.status(404).json({ erreur: `Adhérent id:${req.params.id} introuvable` });
  res.json(adherent);
};


// backend/src/routes/adherents.js
import express from 'express';
import asyncWrapper from '../middleware/asyncWrapper.js';
import * as controller from '../controllers/adherentsController.js';

const router = express.Router();

router.get('/', asyncWrapper(controller.getAdherents));
router.get('/:id', asyncWrapper(controller.getAdherentById));
router.post('/', asyncWrapper(controller.createAdherent));
router.delete('/:id', asyncWrapper(controller.desactiverAdherent));

export default router;