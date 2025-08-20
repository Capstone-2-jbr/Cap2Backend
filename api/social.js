const express = require("express");
const router = express.Router();
const { authenticateJWT, requireAuth, requireAdmin } = require("../auth");
const { Playlist, PlaylistItem, Post, PostShare, PostLike } = require("../database");

module.exports = router;
