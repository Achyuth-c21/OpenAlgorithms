import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { User } from './models/User';
import { ChatMessage } from './models/ChatMessage';

dotenv.config();

// Extend Express Request to include Clerk's auth object (BUG-13 fix)
interface AuthRequest extends Request {
  auth?: { userId?: string };
}

const app = express();
const PORT = process.env.PORT || 5000;

// BUG-5 fix: restrict CORS to known origins instead of wide-open
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// BUG-12 fix: limit body size to prevent abuse
app.use(express.json({ limit: '16kb' }));

// Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

// Protected route using Clerk
app.get('/api/user-data', ClerkExpressWithAuth(), (req: AuthRequest, res: Response) => {
  const auth = req.auth;
  res.json({ message: 'Success', userId: auth?.userId });
});

// Sync User Data
app.post('/api/users/sync', ClerkExpressWithAuth(), async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.userId;
  const { email, name, imageUrl } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  // BUG-14 fix: validate email before upserting into a required field
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: "A valid email is required" });
  }

  // BUG-6 fix: basic input sanitization
  if (name && typeof name !== 'string') {
    return res.status(400).json({ error: "Invalid name" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { 
        email, 
        name: name || undefined, 
        imageUrl: imageUrl || undefined,
        lastActive: new Date()
      },
      { upsert: true, new: true }
    );
    res.json({ message: "User synced", user });
  } catch (error) {
    console.error("Sync Error:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
});

// AI Chat Route
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/api/chat', ClerkExpressWithAuth(), async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.userId;
  const { message, context } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  if (!OPENROUTER_API_KEY) return res.status(500).json({ error: "OpenRouter API Key is missing" });

  // BUG-6 fix: validate chat inputs
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: "Message is required" });
  }
  if (message.length > 4000) {
    return res.status(400).json({ error: "Message too long (max 4000 characters)" });
  }
  if (context && typeof context !== 'string') {
    return res.status(400).json({ error: "Invalid context" });
  }

  try {
    // BUG-8 fix (part 1): save the user message FIRST so it's never lost
    await ChatMessage.create({ userId, role: 'user', content: message, context });

    // BUG-10 fix: filter history by context so algorithm pages don't bleed into each other
    // BUG-9 fix: use createdAt (from timestamps: true) for consistent sorting
    const recentHistory = await ChatMessage.find({ userId, context: context || undefined })
      .sort({ createdAt: -1 })
      .limit(10);
    
    const formattedHistory = recentHistory.reverse().map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Call OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://openalgorithms.local",
        "X-Title": "Open Algorithms Assistant",
      },
      body: JSON.stringify({
        "model": "arcee-ai/trinity-large-preview:free",
        "messages": [
          {
            "role": "system",
            "content": `You are a strict, ultra-concise assistant for "Open Algorithms".
            - Current Context: ${context || "General"}.
            - RULE 1: Direct answers ONLY. No conversational filler (e.g., skip "I'd be happy to help", "Here is your answer").
            - RULE 2: If the user says "hey", just say "Hello" or "Hi". 
            - RULE 3: Keep technical explanations extremely dense and brief.`
          },
          ...formattedHistory,
        ],
      })
    });

    if (!response.ok) {
      // BUG-7 fix: don't log raw error body — it may contain the API key
      console.error(`OpenRouter error: HTTP ${response.status} ${response.statusText}`);
      throw new Error(`OpenRouter returned ${response.status}`);
    }

    const data = (await response.json()) as any;

    // BUG-4 fix: safe access with optional chaining
    const aiReply = data?.choices?.[0]?.message?.content;
    if (!aiReply) {
      console.error("OpenRouter returned an empty or malformed response");
      throw new Error("Empty response from AI");
    }

    // BUG-8 fix (part 2): save AI reply separately — user message is already persisted
    await ChatMessage.create({ userId, role: 'assistant', content: aiReply, context });
    
    res.json({ reply: aiReply });
  } catch (error: any) {
    console.error("Chat Error:", error.message || "Unknown error");
    res.status(500).json({ error: "Failed to process chat" });
  }
});

// BUG-3 fix: async startup — connect to MongoDB BEFORE accepting requests
async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is missing in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch(err => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
