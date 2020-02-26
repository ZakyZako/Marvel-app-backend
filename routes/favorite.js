const express = require("express");
const router = express.Router();
const marvelClient = require("../Client/marvel");
const Favorite = require("../Models/Favorite");
const isAuthenticated = require("../middleware/isAuthenticated");
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/favorites", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.fields.id);
  console.log(user);

  const newFavoriteUser = new Favorite({
    title: req.fields.title,
    marvelId: req.fields.marvelId,
    imagePath: req.fields.imagePath,
    description: req.fields.description,
    type: req.fields.type
  });

  await newFavoriteUser.save();

  user.favorites.push(newFavoriteUser._id);

  await user.save();

  res.json({
    message: `${req.fields.title} a bien ajouter dans la database`,
    id: newFavoriteUser.id
  });
});

router.get("/favorites", async (req, res) => {
  const user = await User.findOne({
    token: req.headers.authorization.replace("Bearer ", "")
  }).populate("favorites");

  console.log("favorite", user.favoritess);
  res.json(user.favorites);

  //renvoyer tout les infos au front
});

module.exports = router;
