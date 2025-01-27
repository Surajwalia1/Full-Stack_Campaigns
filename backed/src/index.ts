declare global {
  namespace Express {
    interface Request {
      admin?: { id: string; role: string };
    }
  }
}

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import authRoutes from './routes/authRoutes';
import campaignRoutes from './routes/campaignRoutes'; // Import campaign routes
import userRoutes from './routes/userRoutes';
import { rateLimiter } from './middleware/rateLimiter';
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");




dotenv.config();



const app = express();

/**
 * Sets up Swagger API documentation.
 * 
 * @name SwaggerDocs
 * @path {GET} /api-docs
 */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Enable CORS
app.use(cors());

// Apply rate limiter globally
app.use(rateLimiter);

// Middleware to parse incoming requests
app.use(express.json());

// Use authentication and campaign routes

/**
 * Authentication routes.
 * 
 * @name AuthRoutes
 * @path /api/auth
 * @type {Router}
 */
app.use('/api/auth', authRoutes);

/**
 * Campaign routes for managing campaigns.
 * 
 * @name CampaignRoutes
 * @path /api/campaigns
 * @type {Router}
 */
app.use('/api/campaigns', campaignRoutes); 

/**
 * User routes for managing user accounts.
 * 
 * @name UserRoutes
 * @path /api/users
 * @type {Router}
 */
app.use('/api/users', userRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  });
