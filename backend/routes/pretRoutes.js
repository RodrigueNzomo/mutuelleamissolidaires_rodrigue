// backend/routes/pretRoutes.js
const express = require("express");
const { check, validationResult } = require("express-validator");
const Pret = require("../models/Pret");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Valider les champs de prêt
const validatePret = [
  check(
    "montant",
    "Le montant est requis et doit être un nombre positif"
  ).isNumeric(),
  check(
    "interet",
    "Le taux d'intérêt est requis et doit être un nombre"
  ).isNumeric(),
  check(
    "duree",
    "La durée est requise et doit être un nombre positif"
  ).isNumeric(),
  check("beneficiaire", "Le bénéficiaire est requis").not().isEmpty(),
];

// Ajouter un prêt
router.post("/", [authMiddleware, ...validatePret], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const pret = new Pret(req.body);
    await pret.save();
    res.status(201).json(pret);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur lors de la création du prêt");
  }
});

// Récupérer tous les prêts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const prets = await Pret.find().populate("beneficiaire");
    res.json(prets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur lors de la récupération des prêts");
  }
});

module.exports = router;
