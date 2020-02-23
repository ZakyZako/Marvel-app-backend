const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  title: String,
  marvelId: String,
  imagePath: String,
  description: String,
  type: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Favorite;
