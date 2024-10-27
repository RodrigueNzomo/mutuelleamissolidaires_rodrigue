// backend/models/Membre.js
const mongoose = require("mongoose");

const MembreSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    prenom: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Veuillez fournir un email valide"], // Validation du format email
    },
    adresse: {
      type: String,
      required: true,
      trim: true,
    },
    telephone: {
      type: String,
      required: true,
      minlength: [9, "Le numéro de téléphone est trop court"],
      maxlength: [15, "Le numéro de téléphone est trop long"],
    },
    cotisations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cotisation",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membre", MembreSchema);
