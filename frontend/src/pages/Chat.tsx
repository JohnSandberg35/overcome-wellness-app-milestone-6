import { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Flag, Users, UserCheck, MessageSquare, ChevronLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

type Message = {
  id: number;
  author: string;
  text: string;
  time: string;
  isMe: boolean;
};

type ChatMentor = {
  id: number;
  name: string;
  role?: string;
};

type ChatUser = {
  id: number;
  name: string;
};

type Member = {
  id: string;
  name: string;
  role: "mentor" | "user";
  subtitle?: string;
};

type Thread = {
  id: string;
  type: "group" | "mentor" | "dm";
  title: string;
  mentorId?: number;
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

const API_URL =
  import.meta.env.VITE_API_URL || "https://hopeful-magic-production-ba0b.up.railway.app";

async function fetchMentors(): Promise<ChatMentor[]> {
  const res = await fetch(`${API_URL}/api/mentors`);
  if (!res.ok) throw new Error("Failed to fetch mentors");
  const data = (await res.json()) as Array<{
    id: number;
    name: string;
    role?: string;
  }>;
  return data.map((m) => ({ id: m.id, name: m.name, role: m.role }));
}

const demoUsers: ChatUser[] = [
  { id: 201, name: "Sarah" },
  { id: 202, name: "David P." },
  { id: 203, name: "James M." },
  { id: 204, name: "Eli" },
];

type GroupChat = {
  id: string;
  title: string;
  mentor: ChatMentor;
  members: ChatUser[];
};

const groupTemplates = [
  { slug: "30-day-momentum", title: "30-Day Momentum", members: [demoUsers[0], demoUsers[2], demoUsers[3]] },
  { slug: "after-work-triggers", title: "After-Work Triggers", members: [demoUsers[1], demoUsers[0]] },
  { slug: "new-start-week-1", title: "New Start (Week 1)", members: [demoUsers[2], demoUsers[3]] },
];

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export default function ChatPage() {
  const location = useLocation();
  const state = location.state as { tab?: string; mentor?: ChatMentor } | null;
  const { user } = useAuth();

  const { data: mentorData } = useQuery({
    queryKey: ["mentors"],
    queryFn: fetchMentors,
  });

  const storageKey = useMemo(() => {
    if (!user) return null;
    const suffix = user.id || user.email;
    return `chat_state_v1:${suffix}`;
  }, [user]);

  const [activeTab, setActiveTab] = useState<string>(() => {
    const requested = state?.tab;
    return requested === "group" || requested === "dm" || requested === "mentor" ? requested : "mentor";
  });

  const mentors: ChatMentor[] = useMemo(() => {
    const fromApi = mentorData ?? [];
    const requestedMentor = state?.mentor;
    if (!requestedMentor) return fromApi;
    const exists = fromApi.some((m) => m.id === requestedMentor.id);
    return exists ? fromApi : [requestedMentor, ...fromApi];
  }, [mentorData, state?.mentor]);

  const groups: GroupChat[] = useMemo(() => {
    if (mentors.length === 0) return [];
    return groupTemplates.map((tpl, idx) => {
      const mentor = mentors[idx % mentors.length];
      return {
        id: `group:${mentor.id}:${tpl.slug}`,
        title: tpl.title,
        mentor,
        members: tpl.members,
      };
    });
  }, [mentors]);

  const threads: Thread[] = useMemo(() => {
    const groupThreads: Thread[] = groups.map((g) => ({
      id: g.id,
      type: "group" as const,
      title: g.title,
      mentorId: g.mentor.id,
    }));

    const mentorThreads = mentors.map((m) => ({
      id: `mentor:${m.id}`,
      type: "mentor" as const,
      title: m.name,
      mentorId: m.id,
    }));

    const dmThreads: Thread[] = [
      { id: "dm:sarah", type: "dm", title: "Sarah" },
      { id: "dm:david", type: "dm", title: "David P." },
    ];

    return [...groupThreads, ...mentorThreads, ...dmThreads];
  }, [groups, mentors]);

  const defaultThreadId = useMemo(() => {
    if (state?.mentor?.id) return `mentor:${state.mentor.id}`;
    const firstMentor = threads.find((t) => t.type === "mentor");
    return firstMentor?.id ?? groups[0]?.id ?? "dm:sarah";
  }, [state?.mentor?.id, threads]);

  const [selectedThreadId, setSelectedThreadId] = useState<string>(defaultThreadId);

  const [threadMessages, setThreadMessages] = useState<Record<string, Message[]>>(() => ({
    "dm:sarah": [
      { id: 41, author: "Sarah", text: "You got this. Text me if you’re spiraling.", time: "3:18 PM", isMe: false },
      { id: 42, author: "You", text: "Thanks. I’m going to the gym now.", time: "3:20 PM", isMe: true },
    ],
    "dm:david": [
      { id: 51, author: "David P.", text: "Day 10 is a big deal. Keep stacking wins.", time: "Sun", isMe: false },
    ],
  }));

  // Seed initial mentor + group threads using *real* mentors from the API (only if missing).
  useEffect(() => {
    if (mentors.length === 0) return;
    if (groups.length === 0) return;

    setThreadMessages((prev) => {
      const next: Record<string, Message[]> = { ...prev };

      // Mentor threads
      mentors.slice(0, 3).forEach((m, idx) => {
        const id = `mentor:${m.id}`;
        if (next[id]) return;
        const openers = [
          "Hi — what’s your goal for this week?",
          "Checking in — how are cravings today?",
          "Proud of your progress. Want to set a small habit goal?",
        ];
        next[id] = [
          { id: Date.now() + idx, author: m.name, text: openers[idx] ?? "How can I support you today?", time: "Today", isMe: false },
        ];
      });

      // Group threads
      groups.slice(0, 3).forEach((g, idx) => {
        if (next[g.id]) return;
        const openers = [
          "Welcome everyone. What’s one win from today?",
          "After work is a common trigger. What’s your plan at 5pm?",
          "Week 1: keep it simple. Sleep, water, and one supportive text.",
        ];
        next[g.id] = [
          { id: Date.now() + 100 + idx, author: g.mentor.name, text: openers[idx] ?? "Welcome to the group.", time: "Today", isMe: false },
        ];
      });

      return next;
    });
  }, [groups, mentors]);

  // Load persisted chat history (per logged-in user).
  useEffect(() => {
    if (!storageKey) return;
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { threadMessages?: Record<string, Message[]> } | null;
      if (!parsed?.threadMessages) return;
      setThreadMessages((prev) => {
        // Keep any new demo threads we ship by default, but prefer user history for existing ids.
        return { ...prev, ...parsed.threadMessages };
      });
    } catch {
      // Ignore corrupted state.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Persist chat history whenever it changes (per logged-in user).
  useEffect(() => {
    if (!storageKey) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ threadMessages }));
    } catch {
      // Ignore quota / storage errors.
    }
  }, [storageKey, threadMessages]);

  const [input, setInput] = useState("");
  const [showReport, setShowReport] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showThreadList, setShowThreadList] = useState(true);

  useEffect(() => {
    const requested = state?.tab;
    if (requested === "mentor" || requested === "group" || requested === "dm") {
      setActiveTab(requested);
    } else {
      setActiveTab("mentor");
    }

    if (state?.mentor?.id) {
      const id = `mentor:${state.mentor.id}`;
      setSelectedThreadId(id);
      setShowThreadList(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  const activeThread = useMemo(() => threads.find((t) => t.id === selectedThreadId) ?? null, [threads, selectedThreadId]);

  const activeKey = selectedThreadId;
  const messages = threadMessages[activeKey] ?? [];

  const groupMembers: Member[] = useMemo(() => {
    if (activeTab !== "group") return [];
    const group = groups.find((g) => g.id === selectedThreadId);
    if (!group) return [];
    const mentorMember: Member = {
      id: `mentor:${group.mentor.id}`,
      name: group.mentor.name,
      role: "mentor",
      subtitle: group.mentor.role,
    };
    const userMembers: Member[] = group.members.map((u) => ({
      id: `user:${u.id}`,
      name: u.name,
      role: "user",
      subtitle: "User",
    }));
    return [mentorMember, ...userMembers];
  }, [activeTab, groups, selectedThreadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openDmWith = (member: Member) => {
    // Mentors should open in Mentor 1-on-1, not Direct Messages.
    if (member.role === "mentor") {
      const mentorId = member.id.split(":")[1];
      if (mentorId) {
        setActiveTab("mentor");
        setSelectedThreadId(`mentor:${mentorId}`);
        setShowThreadList(false);
        return;
      }
    }

    const slug =
      member.role === "mentor"
        ? `mentor-${member.id.split(":")[1] ?? member.name.toLowerCase().replace(/\s+/g, "-")}`
        : `user-${member.id.split(":")[1] ?? member.name.toLowerCase().replace(/\s+/g, "-")}`;

    const dmId = `dm:${slug}`;

    setThreadMessages((prev) => {
      if (prev[dmId]) return prev;
      return {
        ...prev,
        [dmId]: [],
      };
    });

    setActiveTab("dm");
    setSelectedThreadId(dmId);
    setShowThreadList(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      author: "You",
      text: input.trim(),
      time: formatTime(),
      isMe: true,
    };

    setThreadMessages((prev) => ({
      ...prev,
      [activeKey]: [...(prev[activeKey] ?? []), newMsg],
    }));
    setInput("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-lg flex-col">
      {/* Tabs */}
      <div className="flex border-b border-border bg-background">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              const first = threads.find((thread) => thread.type === t.id);
              if (first) setSelectedThreadId(first.id);
              setShowThreadList(true);
            }}
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
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          {!showThreadList && (
            <div className="border-b border-border bg-background px-4 py-2">
              <button
                type="button"
                onClick={() => setShowThreadList(true)}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            </div>
          )}

          {/* Thread list + conversation */}
          <div className="flex flex-1 overflow-hidden">
            {showThreadList && (
              <div className="w-full border-r border-border bg-card/30">
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {activeTab === "group"
                      ? "Group Chats"
                      : activeTab === "mentor"
                        ? "Mentor Conversations"
                        : "Direct Messages"}
                  </p>
                </div>
                <div className="flex flex-col gap-1 px-2 pb-3">
                  {threads
                    .filter((t) => t.type === activeTab)
                    .map((t) => {
                      const last = (threadMessages[t.id] ?? []).at(-1);
                      const active = t.id === selectedThreadId;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setSelectedThreadId(t.id);
                            setShowThreadList(false);
                          }}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                            active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              active ? "bg-white/15 text-primary-foreground" : "bg-sage-light text-sage-dark"
                            }`}
                          >
                            {initials(t.title)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`truncate text-sm font-semibold ${active ? "text-primary-foreground" : "text-foreground"}`}>
                              {t.title}
                            </p>
                            <p className={`truncate text-xs ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                {last ? `${last.isMe ? "You: " : ""}${last.text}` : "No messages yet"}
                            </p>
                          </div>
                          <div className={`text-[10px] ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            {last?.time ?? ""}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {!showThreadList && (
              <div className="flex flex-1 flex-col">
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <div className="flex flex-col gap-3">
                    {/* Group member list with DM buttons */}
                    {activeTab === "group" && groupMembers.length > 0 && (
                      <div className="rounded-2xl bg-card p-3 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Members
                        </p>
                        <div className="mt-2 flex flex-col gap-2">
                          {groupMembers.map((m) => (
                            <div key={m.id} className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-light text-xs font-bold text-sage-dark">
                                {initials(m.name)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-foreground">{m.name}</p>
                                <div className="mt-0.5 flex items-center gap-2">
                                  <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                      m.role === "mentor"
                                        ? "bg-ocean-light text-ocean"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                                  >
                                    {m.role === "mentor" ? "Mentor" : "User"}
                                  </span>
                                  {m.subtitle && (
                                    <span className="truncate text-xs text-muted-foreground">{m.subtitle}</span>
                                  )}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => openDmWith(m)}
                                className="rounded-xl bg-muted px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted-foreground/10"
                              >
                                Direct Message
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Report / Moderate button for group chats */}
                    {activeTab === "group" && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => setShowReport(true)}
                          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Flag className="h-3 w-3" /> Report / Moderate
                        </button>
                      </div>
                    )}

                    {messages.length === 0 ? (
                      <div className="flex h-full items-center justify-center py-10">
                        <p className="text-sm text-muted-foreground">
                          Start a new chat with{" "}
                          <span className="font-semibold text-foreground">
                            {activeThread?.title ?? "this person"}
                          </span>
                          .
                        </p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col gap-1 ${msg.isMe ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
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
                          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                        </div>
                      ))
                    )}
                    <div ref={bottomRef} />
                  </div>
                </div>

                <div className="border-t border-border bg-background p-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder={`Message ${activeThread?.title ?? "…"}`}
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input */}
      {/* (Input is now inside the conversation view for all tabs) */}
    </div>
  );
}
