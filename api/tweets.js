// api/tweets.js
export default async function handler(req, res) {
  const { username } = req.query;
  const TWITTER_BEARER_TOKEN =
    "AAAAAAAAAAAAAAAAAAAAAH704QEAAAAA75lgyvKFUbLf31cC4OL3BgnfXek%3DO4pb10a5mgEbQSLHU8gAhXvzJR5T7FNbnVRRRua7ONGoVsmVU8";

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Step 1: Get user ID
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

    // Step 2: Get recent tweets
    const tweetRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    const tweets = await tweetRes.json();

    res.status(200).json(tweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
}
