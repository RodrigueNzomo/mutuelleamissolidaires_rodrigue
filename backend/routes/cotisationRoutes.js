// backend/routes/cotisationRoutes.js
const express = require("express");
const { check, validationResult } = require("express-validator");
const Cotisation = require("../models/Cotisation");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Valider les champs de cotisation
const validateCotisation = [
  check("montant", "Le montant est requis et doit être un nombre").isNumeric(),
  check("membre", "Le membre est requis").not().isEmpty(),
];

// Ajouter une cotisation
router.post("/", [authMiddleware, ...validateCotisation], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const cotisation = new Cotisation(req.body);
    await cotisation.save();
    res.status(201).json(cotisation);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("Erreur du serveur lors de la création de la cotisation");
  }
});

// Récupérer toutes les cotisations
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cotisations = await Cotisation.find().populate("membre");
    res.json(cotisations);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("Erreur du serveur lors de la récupération des cotisations");
  }
});

module.exports = router;
