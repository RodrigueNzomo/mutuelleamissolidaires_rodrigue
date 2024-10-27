// backend/controllers/pretController.js
const { validationResult } = require("express-validator");
const Pret = require("../models/Pret");

exports.ajouterPret = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pret = new Pret(req.body);
    await pret.save();
    res.status(201).json({ message: "Prêt ajouté avec succès", data: pret });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.getPrets = async (req, res, next) => {
  try {
    const prets = await Pret.find().populate("beneficiaire");
    res.status(200).json({ message: "Liste des prêts", data: prets });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
