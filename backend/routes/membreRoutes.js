// backend/routes/membreRoutes.js
const express = require("express");
const { check, validationResult } = require("express-validator");
const Membre = require("../models/Membre");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Valider les champs de membre
const validateMembre = [
  check("nom", "Le nom est requis").not().isEmpty(),
  check("prenom", "Le prénom est requis").not().isEmpty(),
  check("email", "Veuillez fournir un email valide").isEmail(),
  check("telephone", "Le numéro de téléphone est requis").isLength({ min: 9 }),
  check("adresse", "L'adresse est requise").not().isEmpty(),
];

// Ajouter un membre
router.post("/", [authMiddleware, ...validateMembre], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const membre = new Membre(req.body);
    await membre.save();
    res.status(201).json(membre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur lors de la création du membre");
  }
});

// Récupérer tous les membres
router.get("/", authMiddleware, async (req, res) => {
  try {
    const membres = await Membre.find();
    res.json(membres);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("Erreur du serveur lors de la récupération des membres");
  }
});

module.exports = router;
