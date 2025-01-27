// src/routes/userRoutes.ts

import express from 'express';
import { createUser } from '../controllers/userController';
import { verifyAdminToken } from '../middleware/authMiddleware';

const router = express.Router();

// Admin can create new users
router.post('/create', verifyAdminToken, createUser);

export default router;
