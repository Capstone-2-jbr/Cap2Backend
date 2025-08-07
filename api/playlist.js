const express = require("express");
const axios = require("axios");
const router = express.Router();
const { authenticateJWT, requireAuth, requireAdmin } = require("../auth");
const { Playlist, PlaylistItem, PlaylistSave } = require("../database");

router.get("/", async (_req, res) => {
  try {
    const playlists = await Playlist.findAll({
      include: [{ model: PlaylistItem, as: "items" }],
    });
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

router.post("/", async (req, res, next) => {
  try {
    const { items, ...pl } = req.body;
    const created = await Playlist.create(
      { ...pl, items },
      { include: [{ model: PlaylistItem, as: "items" }] }
    );
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: [{ model: PlaylistItem, as: "items" }],
    });
    if (!playlist) return res.sendStatus(404);
    const { items, ...rest } = req.body;
    await playlist.update(rest);
    if (items) {
      await PlaylistItem.destroy({
        where: { playlist_id: playlist.playlist_id },
      });
      await PlaylistItem.bulkCreate(
        items.map((it) => ({ ...it, playlist_id: playlist.playlist_id }))
      );
    }
    const fresh = await Playlist.findByPk(req.params.id, {
      include: [{ model: PlaylistItem, as: "items" }],
    });
    res.json(fresh);
  } catch (e) {
    next(e);
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
