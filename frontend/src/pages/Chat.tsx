import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Flag, Users, UserCheck, MessageSquare } from "lucide-react";

type Message = {
  id: number;
  author: string;
  text: string;
  time: string;
  isMe: boolean;
};

const initialMessages: Message[] = [
  {
    id: 1,
    author: "James M.",
    text: "Day 30 today. Never thought I'd get here. One day at a time.",
    time: "2:14 PM",
    isMe: false,
  },
  {
    id: 2,
    author: "Sarah",
    text: "That's amazing James! Proud of you 🙌",
    time: "2:15 PM",
    isMe: false,
  },
  {
    id: 3,
    author: "David P.",
    text: "The first 30 days are the hardest. It gets easier. Keep going.",
    time: "2:17 PM",
    isMe: false,
  },
];

const tabs = [
  { id: "group", label: "Group Chat", icon: Users },
  { id: "mentor", label: "Mentor 1-on-1", icon: UserCheck },
  { id: "dm", label: "Direct Messages", icon: MessageSquare },
];

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("group");
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [showReport, setShowReport] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "You",
        text: input.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        isMe: true,
      },
    ]);
    setInput("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-lg flex-col">
      {/* Tabs */}
      <div className="flex border-b border-border bg-background">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${
              activeTab === t.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Report banner */}
      {showReport && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-sage-light p-3 text-xs text-sage-dark"
        >
          <Flag className="h-3.5 w-3.5 shrink-0" />
          <span>Thank you. Our moderators will review this content.</span>
          <button
            onClick={() => setShowReport(false)}
            className="ml-auto font-semibold hover:underline"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === "group" ? (
          <div className="flex flex-col gap-3">
            {/* Report / Moderate */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowReport(true)}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Flag className="h-3 w-3" /> Report / Moderate
              </button>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${
                  msg.isMe ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.isMe
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-foreground shadow-sm rounded-bl-md"
                  }`}
                >
                  {!msg.isMe && (
                    <p className="mb-0.5 text-xs font-semibold text-muted-foreground">
                      {msg.author}
                    </p>
                  )}
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {msg.time}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              {activeTab === "mentor"
                ? "Your mentor conversations will appear here."
                : "Your direct messages will appear here."}
            </p>
          </div>
        )}
      </div>

      {/* Input */}
      {activeTab === "group" && (
        <div className="border-t border-border bg-background p-3">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Share something supportive…"
              className="flex-1 rounded-xl bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
