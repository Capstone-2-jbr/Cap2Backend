const express = require("express");
const axios = require("axios");
const router = express.Router();
const { User } = require("../database");

router.get("/", async (_req, res) => {
  try {
    const playlists = await User.findAll();
    res.status(200).send(playlists);
  } catch (error) {
    console.error("Error fetching Users: ", error);
    res.status(500).send("Error fetching Users: ");
  }
});

module.exports = router;

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching User by ID: ", error);
    res.status(500).send("Error fetching User by ID");
  }
});
