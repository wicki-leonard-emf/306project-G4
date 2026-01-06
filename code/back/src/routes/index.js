import { Router } from 'express';
import roomRoutes from './room.routes.js';
import sensorRoutes from './sensor.routes.js';
import authRoutes from './auth.routes.js';
import subscriptionRoutes from './subscription.routes.js';
import userRoutes from './user.routes.js';
import alertRoutes from './alert.routes.js';

const router = Router();

// Monter les routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/sensors', sensorRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/alerts', alertRoutes);

export default router;
