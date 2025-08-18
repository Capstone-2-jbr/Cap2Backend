const express = require("express");
const router = express.Router();
const Listing = require("../database/listings");

router.get("/", async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

module.exports = router;
