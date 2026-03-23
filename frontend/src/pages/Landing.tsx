import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Leaf,
  Shield,
  Sunrise,
  Users,
  UserCheck,
} from "lucide-react";

const gentleTools = [
  {
    title: "Science of Recovery",
    desc: "How your brain learns new patterns.",
    icon: Leaf,
    to: "/resources/science-of-recovery",
  },
  {
    title: "New Habits",
    desc: "Tiny shifts you can actually keep.",
    icon: Sunrise,
    to: "/resources/building-new-habits",
  },
  {
    title: "Understanding Triggers",
    desc: "Notice urges without judging yourself.",
    icon: Heart,
    to: "/resources/understanding-triggers",
  },
  {
    title: "Site blocking setup",
    desc: "Choose a blocking path for your device.",
    icon: Shield,
    to: "/resources/site-blocking-setup",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function LandingPage() {
  return (
    <div className="bg-app-gradient">
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col px-4 pb-8 pt-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col gap-6"
        >
          {/* Hero */}
          <motion.section
            variants={item}
            className="glass-card relative overflow-hidden rounded-3xl px-5 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
          >
            <div className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 -bottom-16 h-44 w-44 rounded-full bg-sky-500/20 blur-3xl" />

            <div className="relative space-y-4">
              <span className="inline-flex items-center rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200/90">
                You showed up today
              </span>
              <div className="space-y-2">
                <h1 className="text-balance text-[1.8rem] font-semibold leading-tight text-foreground">
                  A calmer, cleaner tomorrow starts now.
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Overcome gently guides you through science-backed lessons,
                  real community, and mentors who&apos;ve walked this path
                  before you.
                </p>
              </div>

              <div className="space-y-2 pt-1.5">
                <Link
                  to="/onboarding"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/35 transition-all hover:bg-emerald-300 hover:shadow-emerald-400/45 active:scale-[0.98]"
                >
                  Start my plan
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <p className="text-xs text-muted-foreground">
                  3-minute check-in · you can exit anytime.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Reassurance */}
          <motion.section
            variants={item}
            className="glass-card flex items-start gap-3 rounded-2xl px-4 py-4"
          >
            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
              <Heart className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                You&apos;re safe to take your time here.
              </p>
              <p className="text-xs text-muted-foreground">
                Move at your own pace, revisit lessons whenever you need, and
                leave quickly with the quick-exit button if anything feels
                uncomfortable.
              </p>
            </div>
          </motion.section>

          {/* Continue journey */}
          <motion.section variants={item}>
            <Link
              to="/curriculum"
              className="group flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-400 px-4 py-4 text-emerald-950 shadow-[0_20px_40px_rgba(16,185,129,0.45)] transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900/10">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Continue your journey</p>
                  <p className="text-xs text-emerald-950/80">
                    Pick up right where you left off in the 5-step curriculum.
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </motion.section>

          {/* Community & mentors */}
          <motion.section
            variants={item}
            className="grid grid-cols-2 gap-3"
          >
            <Link
              to="/chat"
              className="group glass-card flex flex-col items-start gap-3 rounded-2xl px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
                <Users className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Community
                </p>
                <p className="text-xs text-muted-foreground">
                  Share wins, setbacks, and everything in between.
                </p>
              </div>
            </Link>

            <Link
              to="/mentors"
              className="group glass-card flex flex-col items-start gap-3 rounded-2xl px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                <UserCheck className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Mentors
                </p>
                <p className="text-xs text-muted-foreground">
                  Talk with people who know what it&apos;s like.
                </p>
              </div>
            </Link>
          </motion.section>

          {/* Gentle tools */}
          <motion.section variants={item} className="space-y-3 pb-2">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Gentle tools
            </p>
            <div className="flex flex-col gap-3">
              {gentleTools.map((tool) => (
                <Link
                  key={tool.title}
                  to={tool.to}
                  className="group glass-card flex flex-col gap-3 rounded-2xl px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
                    <tool.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {tool.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tool.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
