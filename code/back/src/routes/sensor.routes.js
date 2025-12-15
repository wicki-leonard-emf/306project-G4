import { Router } from 'express';
import { createSensor, getSensors, ingestReading } from '../controllers/sensor.controller.js';
import { authenticateRPi, validateSensorReading } from '../middleware/validate.middleware.js';

const router = Router();

// GET /api/sensors - Récupérer tous les capteurs
router.get('/', getSensors);

// POST /api/sensors - Créer un nouveau capteur
router.post('/', createSensor);

// POST /api/sensors/readings - Ingérer une nouvelle lecture
// Middleware: authenticateRPi (vérifie X-API-Key) puis validateSensorReading
router.post('/readings', authenticateRPi, validateSensorReading, ingestReading);

export default router;
