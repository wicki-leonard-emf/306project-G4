import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import session from 'express-session';
import { corsOptions } from './middleware/cors.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import router from './routes/index.js';

// Charger variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware globaux
app.use(corsOptions);
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes API
app.use('/api', router);

// Health check also available at /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from frontend build (PRODUCTION ONLY)
// En développement, le frontend est servi par Vite sur http://localhost:5173
// En production Vercel, les fichiers statiques sont servis par Vercel directement
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../../front/build');
  app.use(express.static(buildPath));

  // SPA fallback: serve index.html for all non-API routes (PRODUCTION ONLY)
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Error handler (doit être en dernier)
app.use(errorHandler);

// Export pour Vercel serverless
export default app;

// Start server only in local development (not on Vercel)
if (!process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 API disponible sur http://localhost:${PORT}/api`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM reçu, fermeture du serveur...');
    server.close(() => {
      console.log('Serveur fermé');
      process.exit(0);
    });
  });
}
