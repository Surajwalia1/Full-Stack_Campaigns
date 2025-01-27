import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin';
import { config } from 'dotenv';


config();

/**
 * Registers a new admin.
 * 
 * @async
 * @function registerAdmin
 * @param {Request} req - Express request object containing `email` and `password` in the body.
 * @param {Response} res - Express response object to send success or error messages.
 * 
 * @returns {Promise<void>} Responds with a success message or an error message.
 * 
 * @example
 * POST /api/admin/register
 * Body: { "email": "admin@example.com", "password": "securepassword" }
 */

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Admin Registration
export const registerAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
       res.status(400).json({ message: 'Admin already exists.' });
       return;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      role: 'admin',
    });

    // Save admin to DB
    await newAdmin.save();

    // Respond with success
     res.status(201).json({ message: 'Admin registered successfully.' });
     return;
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: 'Server error.' });
     return;
  }
};

// Admin Login
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });
     if (!admin) {
       res.status(404).json({ message: 'Admin not found.' });
       return;
     }

     // Compare password
     const isPasswordCorrect = await bcrypt.compare(password, admin.password as string);
     if (!isPasswordCorrect) {
       res.status(400).json({ message: 'Invalid credentials.' });
     }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      JWT_SECRET,
      { expiresIn: '1h' } 
    );

    // Respond with token
     res.status(200).json({
      message: 'Login successful.',
      token,
    });
    return;
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: 'Server error.' });
     return;
  }
};
