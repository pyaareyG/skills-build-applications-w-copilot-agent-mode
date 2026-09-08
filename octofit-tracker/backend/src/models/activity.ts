import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Activity = mongoose.model('Activity', activitySchema);
