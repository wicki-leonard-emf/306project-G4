/**
 * Middleware pour authentifier les requêtes du Raspberry Pi
 * Vérifie le header X-API-Key contre RPI_API_KEY dans .env
 */
export const authenticateRPi = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.RPI_API_KEY) {
    return res.status(401).json({
      error: 'Clé API invalide ou manquante',
      code: 'UNAUTHORIZED'
    });
  }

  next();
};

/**
 * Middleware pour valider les données de lecture de capteur
 * Vérifie que serialNumber et value sont présents et valides
 */
export const validateSensorReading = (req, res, next) => {
  const { serialNumber, value } = req.body;

  // Vérifier présence des champs
  if (!serialNumber || typeof serialNumber !== 'string') {
    return res.status(400).json({
      error: 'serialNumber requis (string)',
      code: 'VALIDATION_ERROR'
    });
  }

  if (value === undefined || typeof value !== 'number' || isNaN(value)) {
    return res.status(400).json({
      error: 'value requis (number)',
      code: 'VALIDATION_ERROR'
    });
  }

  next();
};
