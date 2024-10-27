// backend/controllers/aideController.js
const { validationResult } = require("express-validator");
const Aide = require("../models/Aide");

exports.createAide = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const aide = new Aide(req.body);
    await aide.save();
    res.status(201).json({ message: "Aide créée avec succès", data: aide });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

exports.getAllAides = async (req, res, next) => {
  try {
    const aides = await Aide.find().populate("beneficiaire");
    res.status(200).json({ message: "Liste des aides", data: aides });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};
