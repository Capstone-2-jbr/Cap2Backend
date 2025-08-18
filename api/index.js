const express = require("express");
const router = express.Router();

const youtubeRouter = require("./youtube");  // <-- Import youtube router
const playlistRouter = require("./playlists");
const userRouter = require("./users");
const { authenticateJWT } = require("../auth");

router.use("/video-details", youtubeRouter);
router.use("/playlists", playlistRouter);
router.use("/users", authenticateJWT, userRouter);

module.exports = router;