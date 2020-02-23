const express = require("express");
const router = express.Router();
const marvelClient = require("../Client/marvel");
const Favorite = require("../Models/Favorite");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/favorites", isAuthenticated, async (req, res) => {
  const favoriteUser = await Favorite.find().populate();

  const newFavoriteUser = new Favorite({
    title: req.fields.title,
    marvelId: req.fields.marvelId,
    imagePath: req.fields.imagePath,
    description: req.fields.description,
    type: req.fields.type
  });

  await newFavoriteUser.save();
  res.json({
    message: `${req.fields.title} a bien ajouter dans la database`,
    id: newFavoriteUser.id
  });
});

router.get("/favorites", (req, res) => {});

module.exports = router;
