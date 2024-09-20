const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/reddit/recent/:subreddit", async (req, res) => {
  const subreddit = req.params.subreddit;
  try {
    const response = await axios.get(
      `https://www.reddit.com/r/${subreddit}/top.json?limit=10`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Reddit API error:", error);
    res.status(500).json({ error: "Failed to fetch data from Reddit" });
  }
});

app.get("/api/reddit/topalltime/:subreddit", async (req, res) => {
  const subreddit = req.params.subreddit;
  try {
    const response = await axios.get(
      `https://www.reddit.com/r/${subreddit}/top.json?t=all&limit=10`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Reddit API error:", error);
    res.status(500).json({ error: "Failed to fetch data from Reddit" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
