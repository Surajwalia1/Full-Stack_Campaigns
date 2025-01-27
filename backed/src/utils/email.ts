// src/utils/email.ts
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config(); 
/**
 * Configures and creates a Nodemailer transporter for sending emails.
 * 
 * @constant
 * @type {import('nodemailer').Transporter}
 * @property {string} service - The email service provider (e.g., Gmail).
 * @property {Object} auth - Authentication details for the email service.
 * @property {string} auth.user - Email address used for authentication.
 * @property {string} auth.pass - Password or app-specific password for authentication.
 */
// Create transporter
export const emailTransporter = nodemailer.createTransport({
  service: 'Gmail', // Or use any email service provider
  auth: {
    user: process.env.EMAIL_USER ||"walia.75way@gmail.com", // Your email address
    pass: process.env.EMAIL_PASS || "cwganvczwigkepfh", // Your email password or app-specific password
  },
});

// Send email function
export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to :"surajwalia12387@gmail.com", 
      subject, // Subject line
      text, // Plain text body
      html, // HTML body (optional)
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};
