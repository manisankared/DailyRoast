import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/trending', async (req, res) => {
  try {
    const response = await fetch('https://www.reddit.com/r/all/hot.json?limit=1');
    const data = await response.json();
    const post = data?.data?.children?.[0]?.data;
    res.json({
      title: post?.title ?? 'No trending post found',
      subreddit: post?.subreddit ?? 'unknown',
      ups: post?.ups ?? 0,
      url: `https://reddit.com${post?.permalink ?? ''}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trending post' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
