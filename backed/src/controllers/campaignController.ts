import { Request, Response } from 'express';
import { Campaign } from '../models/Campaign'; // Import the Campaign model
import { User } from '../models/User'; // Import the User model
import { scheduleCampaign } from '../utils/scheduler';


/**
 * Creates and schedules a marketing campaign.
 *
 * @async
 * @function createCampaign
 * @param {Request} req - Express request object containing the campaign details in the body.
 * @param {Response} res - Express response object to send success or error messages.
 * 
 * @property {string} req.body.message - The message for the campaign.
 * @property {string} req.body.category - The target category for the campaign.
 * @property {string} req.body.scheduledTime - The time to schedule the campaign.
 * @property {string} req.body.repeatPattern - Optional repeat pattern for the campaign.
 * 
 * @returns {Promise<void>} Responds with the created campaign details or an error message.
 * 
 * @example
 * POST /api/campaigns
 * Body: {
 *   "message": "This is a test campaign",
 *   "category": "marketing",
 *   "scheduledTime": "2025-02-01T12:00:00Z",
 *   "repeatPattern": "daily"
 * }
 */

export const createCampaign = async (req: Request, res: Response) => {
  const { message, category, scheduledTime, repeatPattern } = req.body;

  // Ensure admin is authenticated
  if (!req.admin) {
    res.status(403).json({ message: 'Access denied. Admin not authenticated.' });
    return;
  }

  try {
    // Create a new campaign
    const newCampaign = new Campaign({
      message,
      category,
      scheduledTime,
      repeatPattern,
      createdBy: req.admin.id,
    });

    await newCampaign.save();

    // Fetch target users by category
    const targetUsers = await User.fetchByCategory(category);

    // Check if any users are found for this category
    if (targetUsers.length > 0) {
      // Pass the target emails to the scheduler
      await scheduleCampaign(newCampaign._id as string, targetUsers.map((user: { email: any; }) => user.email));
    } else {
      console.warn('No users found for the specified category.');
    }

    res.status(201).json({
      message: 'Campaign created and scheduled successfully.',
      campaign: newCampaign,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Failed to create campaign.' });
  }
};
