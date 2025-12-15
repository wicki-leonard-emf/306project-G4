import { Router } from 'express';
import { ingestReading } from '../controllers/sensor.controller.js';
import { authenticateRPi, validateSensorReading } from '../middleware/validate.middleware.js';

const router = Router();

// POST /api/sensors/readings - Ingérer une nouvelle lecture
// Middleware: authenticateRPi (vérifie X-API-Key) puis validateSensorReading
router.post('/readings', authenticateRPi, validateSensorReading, ingestReading);

export default router;
