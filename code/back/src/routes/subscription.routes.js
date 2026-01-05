import { Router } from 'express';
import {
  subscribeToRoom,
  unsubscribeFromRoom,
  getMySubscriptions,
  getRoomSubscribers
} from '../controllers/subscription.controller.js';
// import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/subscriptions/me - Récupère les abonnements de l'utilisateur
router.get('/me', getMySubscriptions);

// POST /api/subscriptions/rooms/:roomId - S'abonner à une salle
router.post('/rooms/:roomId', subscribeToRoom);

// DELETE /api/subscriptions/rooms/:roomId - Se désabonner d'une salle
router.delete('/rooms/:roomId', unsubscribeFromRoom);

// GET /api/subscriptions/rooms/:roomId/subscribers - Liste des abonnés (admin)
router.get('/rooms/:roomId/subscribers', getRoomSubscribers);

export default router;
