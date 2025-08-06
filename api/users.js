const express = require("express");
const axios = require("axios");
const router = express.Router();
const { authenticateJWT, requireAuth, requireAdmin } = require("../auth");
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
