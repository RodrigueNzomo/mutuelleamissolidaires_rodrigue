// backend/models/Pret.js
const mongoose = require("mongoose");

const PretSchema = new mongoose.Schema(
  {
    beneficiaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membre",
      required: true,
    },
    montant: {
      type: Number,
      required: true,
      min: [0, "Le montant doit être positif"],
    },
    interet: {
      type: Number,
      required: true,
      min: [0, "L'intérêt doit être positif"],
    },
    duree: {
      type: Number,
      required: true,
      min: [1, "La durée doit être d'au moins 1 mois"],
    },
    dateDebut: {
      type: Date,
      default: Date.now,
    },
    statut: {
      type: String,
      enum: ["actif", "remboursé"],
      default: "actif",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pret", PretSchema);
