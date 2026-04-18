import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true },
  context: { type: String }, // e.g., the algorithm name
}, { timestamps: true }); // provides createdAt and updatedAt automatically

// BUG-11 fix: index uses createdAt (from timestamps) instead of redundant manual timestamp
// BUG-10 fix: compound index includes context for filtered queries
ChatMessageSchema.index({ userId: 1, context: 1, createdAt: -1 });

export const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
