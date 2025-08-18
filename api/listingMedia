const express = require("express");
const router = express.Router();
const Listing = require("../database/listings");
const ListingMedia = require("../database/listing_media");
console.log("ListingMedia is:", ListingMedia);

router.get("/", async (req, res) => {
  try {
    const listingurl= await ListingMedia.findAll({
      include:[{model: Listing}]
    });
    res.json(listingurl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch listing media" });
  }
});

module.exports = router;
