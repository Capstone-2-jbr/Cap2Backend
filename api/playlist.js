const express = require("express");
const axios = require("axios");
const router = express.Router();
const { authenticateJWT, requireAuth, requireAdmin } = require("../auth");
const { Playlist } = require("../database");

router.get("/", async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      // include: PlaylistItem,
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
      // include: PlaylistItem,
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    res.status.send(playlist);
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

router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, description, is_public } = req.body;

    const userId = req.user.id;

    console.log("Creating the playlist with the data:", req.body);

    const result = await db.transaction(async (transaction) => {
      const playlist = await Playlist.create(
        {
          creator_id: userId,
          title: title.trim(),
          description: description ? description.trim() : null,
          isActive: true,
        },
        { transaction }
      );

      if (
        playlistItems &&
        Array.isArray(playlistItems) &&
        playlistItems.length > 0
      ) {
        const playlistItems = plalistItems.map((item) => ({
          playlist_id: playlist.id,
          text: item.text.trim(),
          position: item.position || 1,
        }));

        await playlistItems.bulkCreate(playlistItems, { transaction });
        console.log(
          `Created ${playlistItems.length} options for playlist ${playlist.id}`
        );
      }

      return playlist;
    });

    res.status(201).json({
      message: `Playlist published successfully`,
      playlist: result,
      id: result.id,
    });
    
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({
      error: "Failed to create playlist",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
