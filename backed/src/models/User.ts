import mongoose, { Schema, Document } from 'mongoose';

// Extend the Document type to include the static methods
interface UserDoc extends Document {
  email: string;
  password: string;
  role: string;
  category?: string; // Optional for targeting campaigns
}

// Add a static method to the User model for fetching users by category
interface UserModel extends mongoose.Model<UserDoc> {
  fetchByCategory(category: string): Promise<UserDoc[]>; // Static method type signature
}

const userSchema: Schema<UserDoc> = new Schema(
  {
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
      enum: ['admin', 'user'], // Supported roles
    },
    category: {
      type: String,
      required: false, // Optional for user targeting
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Static method for fetching users by category
userSchema.statics.fetchByCategory = async function (category: string) {
  try {
    return await this.find({ category }).select('email').exec();
  } catch (error) {
    console.error('Failed to fetch users by category:', error);
    return [];
  }
};

// Use the correct type for the model
export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
