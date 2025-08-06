const express = require("express");
const router = express.Router();

const youtubeRouter = require("./youtube");  // <-- Import youtube router
const playlistRouter = require("./playlist");
const userRouter = require("./users");

router.use("/video-details", youtubeRouter);
router.use("/playlist", playlistRouter);
router.use("/users", userRouter);

module.exports = router;