import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/authController';

const router = express.Router();

// POST route for registering an admin
router.post('/register', registerAdmin);

// POST route for admin login
router.post('/login', loginAdmin);

export default router;
