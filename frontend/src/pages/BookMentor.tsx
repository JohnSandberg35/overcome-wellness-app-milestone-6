import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useState } from "react";

type MentorSummary = {
  id: number;
  name: string;
  role: string;
  specialty: string;
};

type LocationState = {
  mentor?: MentorSummary;
};

export default function BookMentorPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const mentor = (state as LocationState | null)?.mentor;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {mentor ? `Book time with ${mentor.name}` : "Book a mentor session"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a time for a 1-on-1 session. This is a demo flow only – we&apos;ll just capture
            the details so you can talk through them in your presentation.
          </p>
        </div>

        {mentor && (
          <div className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-light text-xs font-bold text-sage-dark">
              {mentor.name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{mentor.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {mentor.role} • {mentor.specialty}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              What would you like to focus on?
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              placeholder="Share a bit about what you’d like help with so your mentor can prepare…"
            />
          </div>

          <button
            type="submit"
            disabled={!date || !time}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
          >
            <Calendar className="h-4 w-4" />
            Confirm booking
          </button>
        </form>

        {submitted && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-sage-light p-3 text-xs text-sage-dark"
          >
            <p className="font-semibold">Booking confirmed.</p>
            <p className="mt-1">
              Your session details have been saved.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

