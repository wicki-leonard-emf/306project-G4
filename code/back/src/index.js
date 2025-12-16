import express from 'express';
import dotenv from 'dotenv';
import { corsOptions } from './middleware/cors.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import router from './routes/index.js';

// Charger variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware globaux
app.use(corsOptions);
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes API
app.use('/api', router);

// Error handler (doit être en dernier)
app.use(errorHandler);

// Démarrage serveur (seulement en dev, pas sur Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 API disponible sur http://localhost:${PORT}/api`);
  });
}

// Export pour Vercel serverless
export default app;
