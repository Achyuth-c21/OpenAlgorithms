import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  context?: string;
}

export function AIChat({ context }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getToken, isSignedIn } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: `Direct mode active. Ask me anything about ${context || "this algorithm"}.` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !isSignedIn) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userMessage,
          context: context
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        throw new Error("No reply from AI");
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Trouble connecting. Try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="fixed z-[100] flex flex-col items-end"
      drag
      dragConstraints={{ top: 0, left: 0, right: window.innerWidth - 80, bottom: window.innerHeight - 80 }}
      dragElastic={0.1}
      dragMomentum={false}
      style={{ bottom: 24, right: 24 }} // Initial position
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 sm:w-96 h-[500px] neumorphic-card flex flex-col overflow-hidden border-0 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 btn-primary-slate flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span className="font-bold font-serif">AI Assistant</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div 
              className="flex-1 p-4 bg-background/50 backdrop-blur-sm overflow-y-auto" 
              ref={scrollRef}
            >
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
                    {msg.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full neumorphic-card flex items-center justify-center text-primary border-0 shrink-0">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "neumorphic-inset text-foreground rounded-tl-none border-0"
                    )}>
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground shrink-0 overflow-hidden">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start gap-3">
                    <div className="h-8 w-8 rounded-full neumorphic-card flex items-center justify-center text-primary border-0 shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="neumorphic-inset p-3 rounded-2xl rounded-tl-none border-0">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border/20 bg-background/80 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about this algorithm..."
                className="flex-1 bg-secondary/50 border-0 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim() || isLoading} className="rounded-full h-10 w-10 btn-primary-slate shadow-md shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
          isOpen ? "bg-destructive text-destructive-foreground rotate-90" : "btn-primary-slate text-white"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </motion.div>
  );
}
