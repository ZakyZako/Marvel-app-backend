const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");

app.use(cors());

app.use(formidableMiddleware());
mongoose.connect("mongodb://localhost/marvel-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const characterRoutes = require("./routes/character");
app.use(characterRoutes);

const useRoutes = require("./routes/user");
app.use("/user", useRoutes);

const comicsRoutes = require("./routes/comic");
app.use(comicsRoutes);

const favoriteRoutes = require("./routes/favorite");
app.use(favoriteRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

app.listen(81, () => {
  console.log("Server has started");
});
