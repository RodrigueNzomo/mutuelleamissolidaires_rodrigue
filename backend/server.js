// backend/server.js: Point d'entrée de l'application Node.js

// Import des modules nécessaires
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const membreRoutes = require("./routes/membreRoutes");
const cotisationRoutes = require("./routes/cotisationRoutes");
const pretRoutes = require("./routes/pretRoutes");
const aideRoutes = require("./routes/aideRoutes");
const errorHandler = require("./middleware/errorHandler");

// Chargement des variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((error) => {
    console.error("❌ Erreur de connexion à MongoDB :", error);
    process.exit(1); // Arrête le processus en cas d'échec de connexion
  });

// Middlewares de sécurité, logs et parsing
app.use(
  helmet({
    contentSecurityPolicy: false, // Désactive le CSP pour éviter les problèmes avec certaines bibliothèques front-end
  })
);
app.use(cors()); // Permet les requêtes depuis des domaines externes
app.use(morgan("dev")); // Affiche les logs des requêtes HTTP en mode développement
app.use(express.json()); // Analyse les requêtes entrantes au format JSON

// Définition des routes de l'application
app.use("/api/auth", authRoutes);
app.use("/api/membres", membreRoutes);
app.use("/api/cotisations", cotisationRoutes);
app.use("/api/prets", pretRoutes);
app.use("/api/aides", aideRoutes);

// Gestion des routes non trouvées (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Middleware de gestion des erreurs personnalisé
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
