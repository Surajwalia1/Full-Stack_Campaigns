import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Middleware to verify a JWT token and ensure the user has an admin role.
 * 
 * @function verifyAdminToken
 * @param {Request} req - Express request object, expecting a Bearer token in the Authorization header.
 * @param {Response} res - Express response object used to send error messages for invalid or missing tokens.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * 
 * @returns {void} Sends a 401 or 403 response if authentication or authorization fails, or proceeds to the next middleware.
 * 
 * @example
 * app.use('/admin', verifyAdminToken, adminRoutes);
 */

// Middleware to verify JWT and check role
export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header

  if (!token) {
     res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };

    // Attach the decoded token to req.admin
    req.admin = decoded; // Save the decoded info to req.admin (including id and role)

    // Check if the role is admin
    if (decoded.role !== 'admin') {
       res.status(403).json({ message: 'Access denied. Not an admin.' });
       return;
    }

    next();
  } catch (error) {
     res.status(401).json({ message: 'Invalid token.' });
     return;
  }
};
