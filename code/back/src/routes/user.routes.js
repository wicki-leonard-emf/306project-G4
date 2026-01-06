import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/user.controller.js';

const router = Router();

// Get all users
router.get('/', getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

export default router;
