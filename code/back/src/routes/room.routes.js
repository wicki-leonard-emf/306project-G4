import { Router } from 'express';
import { getRooms, getRoomById, createRoom, ingestRoomReadings, updateRoom, getRoomHistory, updateRoomThresholds, deleteRoom } from '../controllers/room.controller.js';
import { authenticateRPi } from '../middleware/validate.middleware.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/rooms - Liste toutes les salles
router.get('/', getRooms);

// POST /api/rooms - Crée une nouvelle salle avec ses capteurs
router.post('/', createRoom);

// GET /api/rooms/:id - Détails d'une salle
router.get('/:id', getRoomById);

// GET /api/rooms/:roomId/history - Historique des données d'une salle
router.get('/:roomId/history', getRoomHistory);

// PUT /api/rooms/:id - Mise à jour d'une salle (nom et/ou description)
// Middleware: requireAuth + requireRole (ADMIN uniquement)
router.put('/:id', requireAuth, requireRole(['ADMIN']), updateRoom);

// DELETE /api/rooms/:id - Suppression d'une salle
// Middleware: requireAuth + requireRole (ADMIN uniquement)
router.delete('/:id', requireAuth, requireRole(['ADMIN']), deleteRoom);

// PATCH /api/rooms/:id/thresholds - Mise à jour des seuils d'alerte
// Middleware: requireAuth + requireRole (ADMIN uniquement)
router.patch('/:id/thresholds', requireAuth, requireRole(['ADMIN']), updateRoomThresholds);

// POST /api/rooms/:roomId/readings - Ingérer les lectures d'une salle
// Middleware: authenticateRPi (vérifie X-API-Key)
router.post('/:roomId/readings', authenticateRPi, ingestRoomReadings);

export default router;
