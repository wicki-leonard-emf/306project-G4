import express from 'express';
const router = express.Router();
import { getMyAlerts, getAllAlerts, deleteAlert, deleteAllAlerts } from '../controllers/alert.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

// Toutes les routes nécessitent l'authentification
router.use(requireAuth);

// @route   GET /api/alerts/me
// @desc    Récupérer les alertes de l'utilisateur connecté
// @access  Private
router.get('/me', getMyAlerts);

// @route   GET /api/alerts
// @desc    Récupérer toutes les alertes (admin)
// @access  Private/Admin
router.get('/', requireRole(['ADMIN']), getAllAlerts);

// @route   DELETE /api/alerts
// @desc    Supprimer toutes les alertes
// @access  Private
router.delete('/', deleteAllAlerts);

// @route   DELETE /api/alerts/:id
// @desc    Supprimer une alerte spécifique
// @access  Private/Admin
router.delete('/:id', requireRole(['ADMIN']), deleteAlert);

export default router;
