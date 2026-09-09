import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { collection: 'activities', timestamps: true }
);

export default mongoose.model('Activity', activitySchema);
