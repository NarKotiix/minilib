// backend/src/controllers/adherentsController.js
import * as adherentsModel from '../models/adherentsModel.js';

/** 
 * GET /api/v1/adherents 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAdherents = async (req, res) => {
  const adherents = await adherentsModel.findAll();
  res.json(adherents);
};

/** 
 * GET /api/v1/adherents/:id 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAdherentById = async (req, res) => {
  const adherent = await adherentsModel.findById(Number(req.params.id));
  if (!adherent)
    return res.status(404).json({ erreur: `Adhérent id:${req.params.id} introuvable` });
  res.json(adherent);
};

/** 
 * POST /api/v1/adherents 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createAdherent = async (req, res) => {
  const { nom, prenom, email } = req.body;
  const manquants = ['nom', 'prenom', 'email'].filter(k => !req.body[k]);
  if (manquants.length > 0)
    return res.status(400).json({ erreur: 'Champs manquants', champs: manquants });
  const nouveau = await adherentsModel.create({ nom, prenom, email });
  res.status(201).json(nouveau);
};

/** 
 * DELETE /api/v1/adherents/:id — soft delete 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const desactiverAdherent = async (req, res) => {
  const adherent = await adherentsModel.desactiver(Number(req.params.id));
  if (!adherent)
    return res.status(404).json({ erreur: `Adhérent id:${req.params.id} introuvable` });
  res.json(adherent);
};