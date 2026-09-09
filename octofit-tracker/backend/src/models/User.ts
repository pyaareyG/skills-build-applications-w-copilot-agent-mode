import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    team: { type: String }
  },
  { collection: 'users', timestamps: true }
);

export default mongoose.model('User', userSchema);
