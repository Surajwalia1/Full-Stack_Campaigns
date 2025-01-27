// src/controllers/userController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

/**
 * Creates a new user. Only admins can perform this action.
 *
 * @async
 * @function createUser
 * @param {Request} req - Express request object containing user details in the body.
 * @param {Response} res - Express response object to send success or error messages.
 * 
 * @property {string} req.body.email - The email of the new user.
 * @property {string} req.body.password - The password for the new user.
 * @property {string} req.body.role - The role of the new user (e.g., "admin" or "user").
 * @property {string} req.body.category - The category assigned to the user (for targeting campaigns).
 * 
 * @returns {Promise<void>} Responds with a success message and the created user details, or an error message.
 * 
 * @example
 * POST /api/users
 * Body: {
 *   "email": "user@example.com",
 *   "password": "securepassword",
 *   "role": "user",
 *   "category": "marketing"
 * }
 */

export const createUser = async (req: Request, res: Response) => {
  const { email, password, role, category } = req.body;

  // Ensure only admins can create users
  if (!req.admin || req.admin.role !== 'admin') {
    res.status(403).json({ message: 'Access denied. Only admins can create users.' });
    return;
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists.' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      category,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Failed to create user.' });
  }
};
