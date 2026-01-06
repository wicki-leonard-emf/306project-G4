const express = require('express');
const router = express.Router();
const { getMyAlerts, getAllAlerts, deleteAlert, deleteAllAlerts } = require('../controllers/alert.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

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

module.exports = router;
