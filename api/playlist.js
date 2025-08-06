const express = require("express");
const axios = require("axios");
const router = express.Router();
const { authenticateJWT, requireAuth, requireAdmin } = require("../auth");
const { Playlist, PlaylistItem, PlaylistSave } = require("../database");

router.get("/", async (_req, res) => {
  try {
    const playlists = await Playlist.findAll();
    res.status(200).send(playlists);
  } catch (error) {
    console.error("Error fetching playlists: ", error);
    res.status(500).send("Error fetching playlists");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: [{ model: PlaylistItem, as: "items" }],
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    res.status(200).send(playlist);
  } catch (error) {
    console.error("Error fetching playlist by ID: ", error);
    res.status(500).send("Error fetching playlist by ID");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    await playlist.destroy();
    res.status(200).json({});
  } catch (error) {
    console.error("Error deleting a playlist: ", error);
    res.status(500).json({ error: "Failed to delete the playlist" });
  }
});

module.exports = router;
