const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/sign_up", async (req, res) => {
  const user = await User.findOne({ email: req.fields.email });
  if (user) {
    res.json({ message: "This email already has an account" });
  } else {
    if (req.fields.email && req.fields.username && req.fields.password) {
      const token = uid2(64);
      const salt = uid2(64);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);

      const newUser = new User({
        email: req.fields.email,
        username: req.fields.username,
        token: token,
        salt: salt,
        hash: hash
      });
      await newUser.save();
      res.json({
        _id: newUser._id,
        token: newUser.token,
        email: newUser.email
      });
    } else {
      res.json({ message: "Missing parameter" });
    }
  }
});

router.post("/log_in", async (req, res) => {
  const user = await User.findOne({ email: req.fields.email });
  if (user) {
    if (
      SHA256(req.fields.password + user.salt).toString(encBase64) === user.hash
    ) {
      // le mot de passe saisi lors du login est le bon
      res.json({
        _id: user._id,
        token: user.token,
        email: user.email
      });
    } else {
      res.json({ error: "Unthaurized" });
    }
  } else {
    res.json({ message: "User not found" });
  }
});

router.post("/test", isAuthenticated, async (req, res) => {
  console.log(req.user);
  res.json({ message: "Test route" });
});
module.exports = router;
