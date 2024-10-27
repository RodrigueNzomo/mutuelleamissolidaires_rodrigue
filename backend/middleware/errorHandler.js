// backend/middleware/errorHandler.js: Middleware de gestion des erreurs

/**
 * Middleware pour gérer les erreurs dans l'application.
 * Capture les erreurs et les formate pour une meilleure lisibilité dans les réponses JSON.
 *
 * @param {Error} err - L'erreur interceptée.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @param {Function} next - La fonction suivante de middleware.
 */
const errorHandler = (err, req, res, next) => {
  console.error("Erreur:", err);

  // Définir un code de statut par défaut de 500 pour les erreurs serveur
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Définir la réponse en JSON avec un message d'erreur
  res.status(statusCode).json({
    message: err.message || "Une erreur est survenue sur le serveur",
    stack: process.env.NODE_ENV === "production" ? "🛑" : err.stack,
  });
};

module.exports = errorHandler;
