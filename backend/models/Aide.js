// backend/models/Aide.js
const mongoose = require("mongoose");

const AideSchema = new mongoose.Schema(
  {
    beneficiaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membre",
      required: true,
    },
    typeAide: {
      type: String,
      required: true,
      enum: ["urgence", "soutien", "autre"], // Types d'aides possibles
    },
    montant: {
      type: Number,
      required: true,
      min: [0, "Le montant doit être supérieur à 0"], // Validation du montant
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aide", AideSchema);
