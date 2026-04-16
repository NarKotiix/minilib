// ─── backend/src/middleware/validateLivre.js ───────────────────────
/**
 * Middleware Express qui valide le body d'une requête POST/PUT livre.
 * S'utilise comme : router.post('/', validateLivre, controller.createLivre)
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validateLivre = (req, res, next) => {
  const { isbn, titre, auteur } = req.body;
  const erreurs = [];
  if (!isbn || isbn.trim() === '') erreurs.push('isbn est requis');
  if (!titre || titre.trim() === '') erreurs.push('titre est requis');
  if (!auteur || auteur.trim() === '') erreurs.push('auteur est requis');
  if (erreurs.length > 0) {
    return res.status(400).json({ erreurs });
  }
  next();   // tout est OK, on passe au controller
};
export default validateLivre;