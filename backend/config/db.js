// backend/config/db.js: Configuration de la connexion à MongoDB

// Import du module mongoose
const mongoose = require("mongoose");

/**
 * Fonction de connexion à la base de données MongoDB.
 */
const connectDB = async () => {
  try {
    // Connexion à MongoDB en utilisant les paramètres définis dans les variables d'environnement
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Utilise le nouvel analyseur d'URL
      useUnifiedTopology: true, // Utilise le nouveau moteur de gestion des connexions
    });
    console.log("✅ Connexion à MongoDB réussie");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error);
    process.exit(1); // Arrête le processus en cas d'échec de connexion
  }
};

// Export de la fonction de connexion pour l'utiliser dans le serveur
module.exports = connectDB;
