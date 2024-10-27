// backend/models/Cotisation.js
const mongoose = require("mongoose");

const CotisationSchema = new mongoose.Schema(
  {
    membre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membre",
      required: true,
    },
    montant: {
      type: Number,
      required: true,
      min: [0, "Le montant doit être positif"], // Validation pour éviter les montants négatifs
    },
    date: {
      type: Date,
      default: Date.now,
    },
    statut: {
      type: String,
      enum: ["payé", "en retard"],
      default: "payé",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cotisation", CotisationSchema);
