import { Router } from 'express';
import { getRooms, getRoomById, ingestRoomReadings } from '../controllers/room.controller.js';
import { authenticateRPi } from '../middleware/validate.middleware.js';

const router = Router();

// GET /api/rooms - Liste toutes les salles
router.get('/', getRooms);

// GET /api/rooms/:id - Détails d'une salle
router.get('/:id', getRoomById);

// POST /api/rooms/:roomId/readings - Ingérer les lectures d'une salle
// Middleware: authenticateRPi (vérifie X-API-Key)
router.post('/:roomId/readings', authenticateRPi, ingestRoomReadings);

export default router;
