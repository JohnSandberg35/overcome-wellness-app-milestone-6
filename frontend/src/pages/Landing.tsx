import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  BookOpen,
  ArrowRight,
  Heart,
  Leaf,
  Sunrise,
} from "lucide-react";

const resources = [
  {
    title: "The Science of Recovery",
    desc: "How neuroplasticity supports lasting change.",
    icon: Leaf,
    color: "bg-sage-light text-sage-dark",
  },
  {
    title: "Building New Habits",
    desc: "Evidence-based strategies for daily progress.",
    icon: Sunrise,
    color: "bg-sunrise-light text-sunrise",
  },
  {
    title: "Understanding Triggers",
    desc: "Learn to identify and manage urges safely.",
    icon: Heart,
    color: "bg-lavender-light text-lavender",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8"
      >
        {/* Hero */}
        <motion.div variants={item} className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground text-balance">
            Every step forward matters. You're not alone on this journey.
          </p>
        </motion.div>

        {/* Primary CTAs */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          <Link
            to="/chat"
            className="flex flex-col items-center gap-3 rounded-2xl bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-light">
              <Users className="h-5 w-5 text-ocean" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              Community
            </span>
            <span className="text-xs text-muted-foreground">
              Connect & share
            </span>
          </Link>

          <Link
            to="/mentors"
            className="flex flex-col items-center gap-3 rounded-2xl bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-light">
              <UserCheck className="h-5 w-5 text-sage" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              Mentors
            </span>
            <span className="text-xs text-muted-foreground">
              Get guidance
            </span>
          </Link>
        </motion.div>

        {/* Continue Learning */}
        <motion.div variants={item}>
          <Link
            to="/curriculum"
            className="flex items-center justify-between rounded-2xl bg-primary p-5 text-primary-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">Continue Learning</p>
                <p className="text-xs opacity-80">Module 3 · Step 2 of 5</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Resources */}
        <motion.div variants={item}>
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Resources
          </h2>
          <div className="flex flex-col gap-2.5">
            {resources.map((r) => (
              <div
                key={r.title}
                className="flex items-center gap-3.5 rounded-xl bg-card p-4 shadow-sm transition-all hover:shadow-md cursor-pointer"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${r.color}`}
                >
                  <r.icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {r.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
