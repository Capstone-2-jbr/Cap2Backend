const express = require("express");
const router = express.Router();

const testDbRouter = require("./test-db");
const youtubeRouter = require("./youtube");  // <-- Import youtube router
const playlistRouter = require("./playlist");
const userRouter = require("./users");

router.use("/video-details", youtubeRouter);
router.use("/test-db", testDbRouter);
router.use("/playlist", playlistRouter);
router.use("/users", userRouter);

module.exports = router;