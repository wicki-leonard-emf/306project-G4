import { Router } from 'express';
import roomRoutes from './room.routes.js';
import sensorRoutes from './sensor.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

// Monter les routes
router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/sensors', sensorRoutes);

export default router;
