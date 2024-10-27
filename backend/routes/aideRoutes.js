// backend/routes/aideRoutes.js
const express = require("express");
const { check, validationResult } = require("express-validator");
const Aide = require("../models/Aide");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Ajouter une aide
router.post(
  "/",
  [
    authMiddleware,
    check(
      "montant",
      "Le montant est requis et doit être un nombre"
    ).isNumeric(),
    check("typeAide", "Le type d'aide est requis").not().isEmpty(),
    check("beneficiaire", "Le bénéficiaire est requis").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const aide = new Aide(req.body);
      await aide.save();
      res.status(201).json(aide);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur du serveur lors de la création de l'aide");
    }
  }
);

// Récupérer toutes les aides
router.get("/", authMiddleware, async (req, res) => {
  try {
    const aides = await Aide.find().populate("beneficiaire");
    res.json(aides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur lors de la récupération des aides");
  }
});

module.exports = router;
