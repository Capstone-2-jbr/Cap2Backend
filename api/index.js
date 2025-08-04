const express = require("express");
const router = express.Router();

const testDbRouter = require("./test-db");
const youtubeRoutes = require("./youtube");  // <-- Import youtube router

router.use("/video-details", youtubeRoutes);
router.use("/test-db", testDbRouter);

module.exports = router;
