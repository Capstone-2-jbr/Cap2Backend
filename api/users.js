const express = require("express");
const axios = require("axios");
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

router.patch("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: UserSetting, as: "settings" }],
    });
    if (!user) return res.sendStatus(404);
    const { settings, password, ...rest } = req.body;
    await user.update({
      ...rest,
      ...(password && { password_hash: bcrypt.hashSync(password, 10) }),
    });
    if (settings)
      if (user.settings) await user.settings.update(settings);
      else await UserSetting.create({ ...settings, user_id: user.user_id });
    const plain = user.get({ plain: true });
    delete plain.password_hash;
    res.json(plain);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
