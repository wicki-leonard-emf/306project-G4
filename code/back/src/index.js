import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
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

// Serve static files from frontend build
// En production Vercel, les fichiers statiques sont dans /.vercel/output/static
// En développement local, ils sont dans code/front/build
const buildPath = process.env.VERCEL
  ? path.join(__dirname, '../../../static')
  : path.join(__dirname, '../../front/build');
app.use(express.static(buildPath));

// SPA fallback: serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Error handler (doit être en dernier)
app.use(errorHandler);

// Démarrage serveur
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

// Export pour Vercel serverless
export default app;
