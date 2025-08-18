const express = require("express");
const router = express.Router();

const {authenticateJWT, requireAuth} = require("../auth");

const youtubeRouter = require("./youtube");  // <-- Import youtube router
const playlistRouter = require("./playlist");
const userRouter = require("./users");
const cartRouter = require("./cart");
const listingsRouter = require("./listings");
const listingImage = require("./listingMedia");

router.use("/video-details", youtubeRouter);
router.use("/playlist", playlistRouter);
router.use("/users", userRouter);
router.use("/listings", listingsRouter);
router.use("/listingMedia", listingImage);
router.use("/cart",authenticateJWT, requireAuth, cartRouter);

module.exports = router;