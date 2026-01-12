import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

// Get all users (admin only)
router.get('/', requireAuth, requireRole(['ADMIN']), getAllUsers);

// Create user (admin only)
router.post('/', requireAuth, requireRole(['ADMIN']), createUser);

// Get user by ID (admin only)
router.get('/:id', requireAuth, requireRole(['ADMIN']), getUserById);

// Update user (admin only)
router.put('/:id', requireAuth, requireRole(['ADMIN']), updateUser);

// Delete user (admin only)
router.delete('/:id', requireAuth, requireRole(['ADMIN']), deleteUser);

export default router;
