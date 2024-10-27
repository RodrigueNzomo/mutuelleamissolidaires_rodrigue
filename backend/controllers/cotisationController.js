// backend/controllers/cotisationController.js
const { validationResult } = require("express-validator");
const Cotisation = require("../models/Cotisation");

exports.ajouterCotisation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const nouvelleCotisation = await Cotisation.create(req.body);
    res.status(201).json({
      message: "Cotisation ajoutée avec succès",
      data: nouvelleCotisation,
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.getCotisations = async (req, res, next) => {
  try {
    const cotisations = await Cotisation.find();
    res
      .status(200)
      .json({ message: "Liste des cotisations", data: cotisations });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
