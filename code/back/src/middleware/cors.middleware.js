import cors from 'cors';

/**
 * Configuration CORS pour autoriser les requêtes du frontend
 * Whitelist uniquement l'URL du frontend
 */
export const corsOptions = cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
});
