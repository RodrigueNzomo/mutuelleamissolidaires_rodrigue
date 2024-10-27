// backend/controllers/membreController.js
const { validationResult } = require("express-validator");
const Membre = require("../models/Membre");

exports.ajouterMembre = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newMembre = await Membre.create(req.body);
    res
      .status(201)
      .json({ message: "Membre ajouté avec succès", data: newMembre });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.getMembres = async (req, res, next) => {
  try {
    const membres = await Membre.find();
    res.status(200).json({ message: "Liste des membres", data: membres });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
