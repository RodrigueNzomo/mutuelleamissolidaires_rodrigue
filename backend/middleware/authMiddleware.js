// backend/middleware/authMiddleware.js: Middleware de protection des routes

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware pour protéger les routes nécessitant une authentification.
 * Vérifie la présence et la validité du token JWT dans les en-têtes de requête.
 * Si le token est valide, l'utilisateur correspondant est ajouté à l'objet `req` pour un usage ultérieur.
 */
const protect = async (req, res, next) => {
  let token;

  // Vérification de la présence de l'en-tête d'autorisation et extraction du token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extraction du token après "Bearer"
      token = req.headers.authorization.split(" ")[1];

      // Vérification et décryptage du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupération de l'utilisateur à partir de l'ID contenu dans le token
      req.user = await User.findById(decoded.id).select("-password");

      // Passage à la prochaine middleware si tout est valide
      next();
    } catch (error) {
      console.error("Erreur de validation du token JWT:", error);
      res.status(401).json({ message: "Non autorisé, token invalide" });
    }
  } else {
    // Si aucun token n'est présent dans les en-têtes
    res.status(401).json({ message: "Non autorisé, pas de token fourni" });
  }
};

module.exports = { protect };
