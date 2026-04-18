import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String },
  imageUrl: { type: String },
  lastActive: { type: Date, default: Date.now },
}, { timestamps: true }); // provides createdAt and updatedAt automatically

export const User = mongoose.model('User', UserSchema);
