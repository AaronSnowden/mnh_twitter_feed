// api/tweets.js
import express from "express";
const app = express();

app.get("/api/tweets", async (req, res) => {
  const TWITTER_BEARER_TOKEN =
    "AAAAAAAAAAAAAAAAAAAAAH704QEAAAAA75lgyvKFUbLf31cC4OL3BgnfXek%3DO4pb10a5mgEbQSLHU8gAhXvzJR5T7FNbnVRRRua7ONGoVsmVU8";

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    const userData = await userRes.json();
    const userId = userData.data?.id;

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    const tweetRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    const tweets = await tweetRes.json();

    res.json(tweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
