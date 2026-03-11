import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, ArrowLeft, Heart, Users as UsersIcon } from "lucide-react";

const goals = [
  "Feel Clean",
  "Start Better Habits",
  "Forgive Myself",
  "Rebuild Trust",
  "Find Accountability",
  "Understand My Triggers",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [partnerMode, setPartnerMode] = useState(false);
  const navigate = useNavigate();

  const toggleGoal = (g: string) =>
    setSelectedGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const steps = [
    // Step 0: Mode selection
    <motion.div
      key="mode"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">
          How can we help you?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose the path that fits your journey.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            setPartnerMode(false);
            setStep(1);
          }}
          className="flex items-center gap-4 rounded-2xl bg-card p-5 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-light">
            <Heart className="h-5 w-5 text-sage" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Personal Recovery
            </p>
            <p className="text-xs text-muted-foreground">
              I'm working on my own healing journey.
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            setPartnerMode(true);
            setStep(1);
          }}
          className="flex items-center gap-4 rounded-2xl bg-card p-5 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ocean-light">
            <UsersIcon className="h-5 w-5 text-ocean" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Partner / Spouse
            </p>
            <p className="text-xs text-muted-foreground">
              I'm healing from betrayal trauma.
            </p>
          </div>
        </button>
      </div>
    </motion.div>,

    // Step 1: Goals
    <motion.div
      key="goals"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">
          {partnerMode ? "What do you need most?" : "Set your goals"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select all that resonate with you.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {(partnerMode
          ? [
              "Process Betrayal",
              "Rebuild Trust",
              "Set Boundaries",
              "Find Support",
              "Heal Emotionally",
              "Forgive (At My Pace)",
            ]
          : goals
        ).map((g) => {
          const selected = selectedGoals.includes(g);
          return (
            <button
              key={g}
              onClick={() => toggleGoal(g)}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                selected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
              <span>{g}</span>
            </button>
          );
        })}
      </div>
    </motion.div>,

    // Step 2: Confirmation
    <motion.div
      key="done"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center gap-6 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-light">
        <Check className="h-7 w-7 text-sage" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-foreground">You're all set</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your personalized path is ready. Let's begin.
        </p>
      </div>
    </motion.div>,
  ];

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-8">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">{steps[step]}</AnimatePresence>

      {/* Nav buttons */}
      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        ) : (
          <div />
        )}

        {step < 2 ? (
          step > 0 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : null
        ) : (
          <button
            onClick={() => navigate("/curriculum")}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Start Journey <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
