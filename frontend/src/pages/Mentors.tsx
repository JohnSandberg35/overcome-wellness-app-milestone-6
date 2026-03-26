import { motion } from "framer-motion";
import { MessageCircle, Calendar, Shield, Star, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://hopeful-magic-production-ba0b.up.railway.app";

interface Mentor {
  id: number;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  rating: number;
  professional: boolean;
}

async function fetchMentors(): Promise<Mentor[]> {
  const res = await fetch(`${API_URL}/api/mentors`);
  if (!res.ok) throw new Error("Failed to fetch mentors");
  return res.json();
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function MentorsPage() {
  const { data: mentors, isLoading, isError } = useQuery({
    queryKey: ["mentors"],
    queryFn: fetchMentors,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg px-4 pb-24 pt-8">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <p className="text-sm text-muted-foreground">Loading mentors...</p>
      </div>
    );
  }

  if (isError || !mentors) {
    return (
      <div className="mx-auto max-w-lg px-4 pb-24 pt-8">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <p className="text-sm text-destructive">Failed to load mentors. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-8">
      <Link
        to="/"
        className="mb-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Home
      </Link>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        <motion.div variants={item}>
          <h1 className="text-xl font-bold text-foreground">
            Professional Help & Mentors
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Connect with qualified professionals or experienced peers.
          </p>
        </motion.div>

        {/* Professional section */}
        <motion.div variants={item}>
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Shield className="h-3.5 w-3.5" /> Licensed Professionals
          </h2>
          <div className="flex flex-col gap-2.5">
            {mentors
              .filter((m) => m.professional)
              .map((m) => (
                <MentorCard key={m.id} mentor={m} />
              ))}
          </div>
        </motion.div>

        {/* Peer section */}
        <motion.div variants={item}>
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Peer Mentors
          </h2>
          <div className="flex flex-col gap-2.5">
            {mentors
              .filter((m) => !m.professional)
              .map((m) => (
                <MentorCard key={m.id} mentor={m} />
              ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MentorCard({ mentor }: { mentor: Mentor }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-light text-sm font-bold text-sage-dark">
          {mentor.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{mentor.name}</p>
          <p className="text-xs text-muted-foreground">{mentor.role}</p>
          <span className="mt-1 inline-block rounded-full bg-ocean-light px-2 py-0.5 text-xs font-medium text-ocean">
            {mentor.specialty}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-sunrise text-sunrise" />
          {mentor.rating}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {mentor.bio}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => navigate("/chat", { state: { tab: "mentor", mentor } })}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Message
        </button>
        {mentor.professional && (
          <button
            type="button"
            onClick={() =>
              navigate("/book", {
                state: {
                  mentor: {
                    id: mentor.id,
                    name: mentor.name,
                    role: mentor.role,
                    specialty: mentor.specialty,
                  },
                },
              })
            }
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-muted py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-muted-foreground/10"
          >
            <Calendar className="h-3.5 w-3.5" /> Book
          </button>
        )}
      </div>
    </div>
  );
}
