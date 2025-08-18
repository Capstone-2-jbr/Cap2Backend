const express = require("express");
const router = express.Router();
const { authenticateJWT, requireAuth, requireAdmin } = require("../auth");
const { Playlist, PlaylistItem } = require("../database");

// Get all playlists with their items
router.get("/", async (_req, res) => {
  try {
    const playlists = await Playlist.findAll({
      include: [{ model: PlaylistItem, as: "items" }],
    });
    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Error fetching playlists" });
  }
});

// Get a single playlist by ID with items
router.get("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: [{ model: PlaylistItem, as: "items" }],
    });
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error fetching playlist by ID:", error);
    res.status(500).json({ error: "Error fetching playlist by ID" });
  }
});

// Create a new playlist with items
router.post("/", authenticateJWT, async (req, res, next) => {
    try {
      console.log("Authenticated user:", req.user);
  
      // Make sure you actually find the user based on JWT
      // (Adjust field name if JWT contains `id` instead of `email`)
      const userId = req.user?.id || 1; // Temporary fallback to 1 for testing
  
      const { items, name } = req.body;
  
      if (!name || !Array.isArray(items)) {
        return res.status(400).json({ error: "Playlist name and items array are required" });
      }
  
      console.log("Incoming playlist:", { name, userId, items });
  
      // Create playlist with items
      const created = await Playlist.create(
        {
          name,
          user_id: userId,
          items, // Must match association alias in model
        },
        {
          include: [{ model: PlaylistItem, as: "items" }],
        }
      );
  
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating playlist:", error);
      next(error);
    }
  });
  

// Update a playlist and its items by ID
router.patch("/:id", async (req, res, next) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: [{ model: PlaylistItem, as: "items" }],
    });
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    const { items, ...playlistData } = req.body;
    await playlist.update(playlistData);

    if (items) {
      // Remove old items
      await PlaylistItem.destroy({ where: { playlist_id: playlist.playlist_id } });
      // Bulk create new items linked to the playlist
      await PlaylistItem.bulkCreate(
        items.map((item) => ({ ...item, playlist_id: playlist.playlist_id }))
      );
    }

    const updatedPlaylist = await Playlist.findByPk(req.params.id, {
      include: [{ model: PlaylistItem, as: "items" }],
    });

    res.json(updatedPlaylist);
  } catch (error) {
    next(error);
  }
});

// Delete a playlist by ID
router.delete("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    await playlist.destroy();
    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ error: "Failed to delete playlist" });
  }
});

module.exports = router;
