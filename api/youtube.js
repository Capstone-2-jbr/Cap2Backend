const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:videoId", async (req, res) => {
  console.log("YouTube API route hit for videoId:", req.params.videoId);

  const videoId = req.params.videoId;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails",
          id: videoId,
          key: apiKey,
        },
      }
    );

    if (response.data.items.length === 0) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(response.data.items[0]);
  } catch (error) {
    console.error("Error fetching video details:", error);
    res.status(500).json({ message: "Error fetching video details" });
  }
});

module.exports = router;
