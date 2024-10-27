// backend/routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const validateUserId = [check("id", "ID utilisateur invalide").isMongoId()];

// Récupérer les détails d'un utilisateur
router.get("/:id", [authMiddleware, ...validateUserId], async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("Erreur du serveur lors de la récupération de l'utilisateur");
  }
});

// Récupérer tous les utilisateurs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("Erreur du serveur lors de la récupération des utilisateurs");
  }
});

module.exports = router;
