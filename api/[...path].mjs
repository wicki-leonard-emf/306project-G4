import app from '../code/back/src/index.js';

// Vercel Serverless Function handler
export default function handler(req, res) {
  // The req object from Vercel should already have the correct path
  // /api/rooms -> req.url will be /api/rooms or /rooms depending on Vercel's routing

  // Ensure req.url starts with /api for the Express app
  const originalUrl = req.url || `/${req.query?.path || ''}`;
  if (!originalUrl.startsWith('/api')) {
    req.url = `/api${originalUrl.startsWith('/') ? originalUrl : `/${originalUrl}`}`;
  } else {
    req.url = originalUrl;
  }

  // Pass the request to the Express app
  return new Promise((resolve) => {
    app(req, res);
    res.on('finish', () => resolve());
  });
}
