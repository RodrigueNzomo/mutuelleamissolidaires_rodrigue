// backend/config/jwt.js: Configuration des paramètres JWT

// Export des paramètres JWT pour utilisation dans les fonctions d'authentification
module.exports = {
  /**
   * Clé secrète pour signer les tokens JWT.
   * Il est recommandé de la stocker dans une variable d'environnement pour plus de sécurité.
   */
  secret: process.env.JWT_SECRET || "votre_secret_jwt_par_défaut",

  /**
   * Durée de validité des tokens JWT.
   * '1h' signifie que le token expirera après 1 heure.
   * Il est possible de personnaliser ce paramètre selon les besoins (ex: '2d', '10h', etc.).
   */
  expiresIn: process.env.JWT_EXPIRES_IN || "1h",
};
