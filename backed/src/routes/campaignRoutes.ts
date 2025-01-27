import { Router } from 'express';
import { createCampaign } from '../controllers/campaignController'; // Import the createCampaign controller
import { verifyAdminToken } from '../middleware/authMiddleware'; // Import the middleware for JWT verification

const router = Router();

// Route to create a new campaign (admin only)
router.post('/create', verifyAdminToken, createCampaign);

export default router;
