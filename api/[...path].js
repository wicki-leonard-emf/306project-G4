import app from '../code/back/src/index.js';

// Vercel serverless function handler
export default (req, res) => {
  return app(req, res);
};
