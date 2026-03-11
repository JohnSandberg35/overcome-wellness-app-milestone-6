import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Play,
  BookOpen,
  StickyNote,
  Flame,
  Trophy,
  Star,
  CheckCircle2,
} from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Understanding Yourself",
    progress: 100,
    steps: [
      { title: "What is Addiction?", type: "video", done: true },
      { title: "Your Brain on Habits", type: "reading", done: true },
      { title: "Personal Reflection", type: "notes", done: true },
    ],
  },
  {
    id: 2,
    title: "Identifying Triggers",
    progress: 66,
    steps: [
      { title: "Common Trigger Patterns", type: "video", done: true },
      { title: "Building Awareness", type: "reading", done: true },
      { title: "My Trigger Map", type: "notes", done: false },
    ],
  },
  {
    id: 3,
    title: "Building Resilience",
    progress: 33,
    steps: [
      { title: "Coping Mechanisms", type: "video", done: true },
      { title: "Healthy Alternatives", type: "reading", done: false },
      { title: "Action Plan", type: "notes", done: false },
    ],
  },
  {
    id: 4,
    title: "Restoring Relationships",
    progress: 0,
    steps: [
      { title: "Trust & Vulnerability", type: "video", done: false },
      { title: "Communication Skills", type: "reading", done: false },
      { title: "Letter Exercise", type: "notes", done: false },
    ],
  },
];

const typeIcon: Record<string, typeof Play> = {
  video: Play,
  reading: BookOpen,
  notes: StickyNote,
};

export default function CurriculumPage() {
  const [expanded, setExpanded] = useState<number | null>(2);
  const streak = 12;

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Your Curriculum</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Progress at your own pace.
          </p>
        </div>

        {/* Streak / Milestones */}
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sunrise-light">
            <Flame className="h-6 w-6 text-sunrise" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              {streak}-day streak!
            </p>
            <p className="text-xs text-muted-foreground">
              Keep going — consistency is key.
            </p>
          </div>
          <div className="flex gap-1">
            {[7, 14, 30].map((milestone) => (
              <div
                key={milestone}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  streak >= milestone
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                title={`${milestone}-day milestone`}
              >
                {streak >= milestone ? (
                  <Trophy className="h-3.5 w-3.5" />
                ) : (
                  milestone
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestones bar */}
        <div className="flex items-center gap-2">
          {modules.map((m, i) => (
            <div key={m.id} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  m.progress === 100
                    ? "bg-primary text-primary-foreground"
                    : m.progress > 0
                    ? "border-2 border-primary text-primary"
                    : "border-2 border-muted text-muted-foreground"
                }`}
              >
                {m.progress === 100 ? (
                  <Star className="h-3.5 w-3.5" />
                ) : (
                  i + 1
                )}
              </div>
              {i < modules.length - 1 && (
                <div className="absolute" />
              )}
            </div>
          ))}
        </div>

        {/* Modules */}
        <div className="flex flex-col gap-3">
          {modules.map((m) => {
            const isOpen = expanded === m.id;
            return (
              <div
                key={m.id}
                className="overflow-hidden rounded-2xl bg-card shadow-sm"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : m.id)}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50"
                >
                  {/* Progress circle */}
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                    <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        className="stroke-muted"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        className="stroke-primary"
                        strokeWidth="3"
                        strokeDasharray={`${m.progress} ${100 - m.progress}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-foreground">
                      {m.progress}%
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {m.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {m.steps.filter((s) => s.done).length}/{m.steps.length}{" "}
                      complete
                    </p>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1.5 px-4 pb-4">
                        {m.steps.map((s, i) => {
                          const Icon = typeIcon[s.type] || BookOpen;
                          return (
                            <button
                              key={i}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                                s.done
                                  ? "bg-sage-light/50 text-sage-dark"
                                  : "bg-muted/50 text-foreground hover:bg-muted"
                              }`}
                            >
                              {s.done ? (
                                <CheckCircle2 className="h-4 w-4 text-sage shrink-0" />
                              ) : (
                                <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                              )}
                              <span className="flex-1">{s.title}</span>
                              <span className="text-xs capitalize text-muted-foreground">
                                {s.type}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
