const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const {
  User,
  UserSetting,
  Playlist,
  PlaylistItem,
  Listing,
  ListingMedia,
} = require("../database");

const { authenticateJWT } = require("../auth");

// --- Existing user routes ---
// GET all users
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
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// GET user by ID (with related data)
router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId))
      return res.status(400).json({ error: "Invalid user ID" });

    const user = await User.findByPk(userId, {
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

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Error fetching user by ID" });
  }
});

// PATCH update user by ID (existing route)
router.patch("/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId))
      return res.status(400).json({ error: "Invalid user ID" });

    const user = await User.findByPk(userId, {
      include: [{ model: UserSetting, as: "settings" }],
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { settings, password, ...rest } = req.body;
    await user.update({
      ...rest,
      ...(password && { password_hash: bcrypt.hashSync(password, 10) }),
    });

    if (settings) {
      if (user.settings) await user.settings.update(settings);
      else await UserSetting.create({ ...settings, user_id: userId });
    }

    const plainUser = user.get({ plain: true });
    delete plainUser.password_hash;
    res.json(plainUser);
  } catch (error) {
    next(error);
  }
});

// --- NEW ---
// GET logged-in user profile
router.get("/profile/:userId", authenticateJWT, async (req, res) => {
  console.log("req.user:", req.user);

  const { userId } = req.params;
  try {
    const user = await User.findByPk(req.user.id, {
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

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE logged-in user profile
router.put("/profile", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: UserSetting, as: "settings" }],
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { settings, password, ...rest } = req.body;
    await user.update({
      ...rest,
      ...(password && { password_hash: bcrypt.hashSync(password, 10) }),
    });

    if (settings) {
      if (user.settings) await user.settings.update(settings);
      else await UserSetting.create({ ...settings, user_id: req.user.id });
    }

    const plainUser = user.get({ plain: true });
    delete plainUser.password_hash;

    res.json(plainUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
