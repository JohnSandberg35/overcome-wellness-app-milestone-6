import { motion } from "framer-motion";
import { CheckCircle2, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import type { SetupRecommendation } from "../types";

const STRENGTH_NOTE: Record<SetupRecommendation["strength"], string> = {
  strong: "Strong protection",
  moderate: "Moderate protection",
  limited: "Limited protection — consider layering",
};

type ResultsScreenProps = {
  recommendation: SetupRecommendation;
  onBack: () => void;
  onRestart: () => void;
};

/**
 * Final tailored plan: steps, notes, optional alternatives, and primary actions.
 */
export function ResultsScreen({ recommendation, onBack, onRestart }: ResultsScreenProps) {
  const navigate = useNavigate();

  const handleCompleted = () => {
    navigate("/", { replace: true });
  };

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-6 pb-8"
    >
      <div className="glass-card rounded-3xl px-5 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Your plan · {recommendation.platform}
        </p>
        <h2 className="mt-2 text-balance text-xl font-semibold text-foreground">
          {recommendation.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {recommendation.summary}
        </p>

        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted-foreground">Recommended approach</dt>
            <dd className="text-right font-medium text-foreground">
              {recommendation.recommendedMethod}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted-foreground">Difficulty</dt>
            <dd className="text-right text-foreground">{recommendation.difficultyLabel}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted-foreground">Protection level</dt>
            <dd className="text-right text-foreground">
              {STRENGTH_NOTE[recommendation.strength]}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted-foreground">Browser relevance</dt>
            <dd className="text-right text-foreground">{recommendation.browserRelevance}</dd>
          </div>
        </dl>
      </div>

      <section aria-labelledby="steps-heading" className="space-y-3">
        <div className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-emerald-300" aria-hidden />
          <h3 id="steps-heading" className="text-sm font-semibold text-foreground">
            Step-by-step
          </h3>
        </div>
        <ol className="space-y-4">
          {recommendation.steps.map((step, i) => (
            <li
              key={`${step.title}-${i}`}
              className="glass-card rounded-2xl px-4 py-4"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-200/90">
                Step {i + 1}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{step.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {recommendation.notes.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Notes</h3>
          {recommendation.notes.map((note) => (
            <Alert
              key={note}
              className="border-emerald-500/20 bg-emerald-500/5 text-foreground"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              <AlertTitle className="text-sm">Heads up</AlertTitle>
              <AlertDescription className="text-xs leading-relaxed text-muted-foreground">
                {note}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      ) : null}

      {recommendation.alternatives && recommendation.alternatives.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Alternate paths</h3>
          <div className="space-y-3">
            {recommendation.alternatives.map((alt) => (
              <div key={alt.title} className="glass-card rounded-2xl px-4 py-4">
                <p className="text-sm font-medium text-foreground">{alt.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{alt.summary}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <Separator className="bg-border/60" />

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={onBack}>
          Edit previous answers
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="secondary" className="flex-1 rounded-full">
              Start over
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Start the guide over?</AlertDialogTitle>
              <AlertDialogDescription>
                Your answers on this page will be cleared. You can run the guide again anytime.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onRestart}>Restart</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Button
        type="button"
        className="w-full rounded-full bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
        onClick={handleCompleted}
      >
        I completed this setup
      </Button>
    </motion.div>
  );
}
