import mongoose, { Schema, Document } from 'mongoose';

// Define the Campaign interface
interface CampaignDoc extends Document {
  message: string;
  category: string;
  scheduledTime: Date;
  repeatPattern: string;
  createdBy: mongoose.Schema.Types.ObjectId; // ObjectId for admin reference
}

// Campaign schema
const campaignSchema = new Schema<CampaignDoc>({
  message: { type: String, required: true },
  category: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
  repeatPattern: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

export const Campaign = mongoose.model<CampaignDoc>('Campaign', campaignSchema);
