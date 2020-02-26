const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  title: String,
  marvelId: String,
  imagePath: String,
  description: String,
  type: String
});

module.exports = Favorite;
