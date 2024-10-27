// backend/controllers/userController.js
const User = require("../models/User");

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur récupéré", data: user });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ message: "Liste des utilisateurs", data: users });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};
