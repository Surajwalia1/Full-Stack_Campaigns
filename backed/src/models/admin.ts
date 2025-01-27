import mongoose, { Schema, Document } from 'mongoose';

// Define the Admin schema
const adminSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin'], // For now, we only support admin role
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the Admin model
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
