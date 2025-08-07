const express = require("express");
const axios = require("axios");
const router = express.Router();
const { User, UserSetting, Playlist, PlaylistItem, Listing, ListingMedia } = require("../database");

router.get("/", async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password_hash"] },
      include: [
        {
          model: Playlist,
          as: "playlists",
          include: [{ model: PlaylistItem, as: "items" }],
        },
        {
          model: Listing,
          as: "listings",
          include: [{ model: ListingMedia, as: "media" }],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching Users: ", error);
    res.status(500).send("Error fetching Users: ");
  }
});

module.exports = router;

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password_hash"] },
      include: [
        { model: UserSetting, as: "settings" },
        {
          model: Playlist,
          as: "playlists",
          include: [{ model: PlaylistItem, as: "items" }],
        },
        {
          model: Listing,
          as: "listings",
          include: [{ model: ListingMedia, as: "media" }],
        },
      ],
    });
    res.json(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching User by ID: ", error);
    res.status(500).send("Error fetching User by ID");
  }
});
