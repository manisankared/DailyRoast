import express from 'express';
import {
  InitResponse,
  IncrementResponse,
  DecrementResponse,
} from '../shared/types/api';
import {
  redis,
  reddit,
  createServer,
  context,
  getServerPort,
} from '@devvit/web/server';
import { createPost } from './core/post';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const router = express.Router();

/**
 * Helper: Initialize count key if missing
 */
const ensureCountInitialized = async () => {
  const count = await redis.get('count');
  if (count === null) {
    await redis.set('count', '0');
  }
};

/**
 * Fetch trending Reddit post with retry fallback
 */
router.get('/api/trending', async (_req, res): Promise<void> => {
  try {
    const url = 'https://www.reddit.com/r/all/hot.json?limit=1';

    // Use AllOrigins proxy to avoid CORS issues
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      throw new Error(`Proxy failed with status ${response.status}`);
    }

    const dataWrapped = await response.json();
    const data = JSON.parse(dataWrapped.contents);

    const post = data?.data?.children?.[0]?.data;

    if (!post) {
      throw new Error('No post data available');
    }

    res.json({
      title: post.title ?? 'No trending post found',
      subreddit: post.subreddit ?? 'unknown',
      ups: post.ups ?? 0,
      url: `https://reddit.com${post.permalink ?? ''}`,
    });
  } catch (error) {
    console.error('Error fetching trending post:', error);

    // Fallback static prompt
    res.json({
      title: "Can't load trending post right now. Here's a classic roast: 'You're proof that even evolution takes a break sometimes.'",
      subreddit: 'fallback',
      ups: 0,
      url: '#',
    });
  }
});

/**
 * Init API
 */
router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    const { postId, subredditName } = context;

    if (!postId || !subredditName) {
      console.error('Missing postId or subredditName in context');
      res.status(400).json({
        status: 'error',
        message: 'postId or subredditName missing from context',
      });
      return;
    }

    try {
      await ensureCountInitialized();

      const [count, username] = await Promise.all([
        redis.get('count'),
        reddit.getCurrentUsername(),
      ]);

      res.json({
        type: 'init',
        postId,
        count: count ? parseInt(count) : 0,
        username: username ?? 'anonymous',
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      const message =
        error instanceof Error
          ? `Initialization failed: ${error.message}`
          : 'Unknown error during initialization';
      res.status(400).json({ status: 'error', message });
    }
  }
);

/**
 * Increment API
 */
router.post<{ postId: string }, IncrementResponse | { status: string; message: string }, unknown>(
  '/api/increment',
  async (_req, res): Promise<void> => {
    const { postId } = context;

    if (!postId) {
      res.status(400).json({ status: 'error', message: 'postId is required' });
      return;
    }

    await ensureCountInitialized();

    const count = await redis.incrBy('count', 1);
    res.json({ count, postId, type: 'increment' });
  }
);

/**
 * Decrement API
 */
router.post<{ postId: string }, DecrementResponse | { status: string; message: string }, unknown>(
  '/api/decrement',
  async (_req, res): Promise<void> => {
    const { postId } = context;

    if (!postId) {
      res.status(400).json({ status: 'error', message: 'postId is required' });
      return;
    }

    await ensureCountInitialized();

    const count = await redis.incrBy('count', -1);
    res.json({ count, postId, type: 'decrement' });
  }
);

/**
 * Internal: On App Install
 */
router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  const { subredditName } = context;

  if (!subredditName) {
    console.error('Missing subredditName in context during app install');
    res.status(400).json({
      status: 'error',
      message: 'subredditName is required but missing from context',
    });
    return;
  }

  try {
    const post = await createPost();
    res.json({
      status: 'success',
      message: `Post created in subreddit ${subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post:`, error);
    res.status(400).json({ status: 'error', message: 'Failed to create post' });
  }
});

/**
 * Internal: Menu Post Create
 */
router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  const { subredditName } = context;

  if (!subredditName) {
    console.error('Missing subredditName in context during menu post create');
    res.status(400).json({
      status: 'error',
      message: 'subredditName is required but missing from context',
    });
    return;
  }

  try {
    const post = await createPost();
    res.json({
      navigateTo: `https://reddit.com/r/${subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post:`, error);
    res.status(400).json({ status: 'error', message: 'Failed to create post' });
  }
});

// Apply router and start server
app.use(router);

const port = getServerPort();
const server = createServer(app);

server.on('error', (err) => console.error(`Server error: ${err.stack}`));
server.listen(port, () => console.log(`Server listening on port ${port}`));
