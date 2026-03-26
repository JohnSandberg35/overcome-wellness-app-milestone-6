import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
import { Button } from "@/components/ui/button";
import { useSiteBlockingGuide } from "../useSiteBlockingGuide";
import {
  BROWSER_OPTIONS,
  DEVICE_OPTIONS,
  getMethodOptionsForOs,
  getOsOptions,
} from "../content/questions";
import type { GuideAnswers, OsKind, QuestionId } from "../types";
import { WizardIntro } from "./WizardIntro";
import { QuestionStep, type QuestionOptionView } from "./QuestionStep";
import { ResultsScreen } from "./ResultsScreen";

function buildOptions(
  questionId: QuestionId,
  answers: GuideAnswers,
): QuestionOptionView[] {
  switch (questionId) {
    case "device":
      return DEVICE_OPTIONS;
    case "os":
      return answers.device ? getOsOptions(answers.device) : [];
    case "method":
      return answers.os ? getMethodOptionsForOs(answers.os as OsKind) : [];
    case "browser":
      return BROWSER_OPTIONS;
    default:
      return [];
  }
}

/**
 * Full-page guided wizard: intro → questions → recommendation.
 */
export function SiteBlockingGuidePage() {
  const {
    state,
    currentQuestionId,
    progress,
    stepIndex,
    totalSteps,
    recommendation,
    start,
    answer,
    goBack,
    restart,
    canGoBack,
  } = useSiteBlockingGuide();

  const options = useMemo(() => {
    if (!currentQuestionId) return [];
    return buildOptions(currentQuestionId, state.answers);
  }, [currentQuestionId, state.answers]);

  const currentValue =
    currentQuestionId && state.answers[currentQuestionId as keyof GuideAnswers]
      ? String(state.answers[currentQuestionId as keyof GuideAnswers])
      : undefined;

  const showProgress =
    state.phase === "question" || state.phase === "results";

  return (
    <div className="bg-app-gradient">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col px-4 pb-24 pt-6">
        <header className="mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Home
            </Link>
            {state.phase !== "intro" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="ghost" size="sm" className="text-muted-foreground">
                    Restart
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Start the guide over?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your answers on this page will be cleared. You can run the guide again
                      anytime.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={restart}>Restart</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : null}
          </div>

          {showProgress ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {state.phase === "results"
                    ? "Your plan"
                    : `Question ${stepIndex} of ${totalSteps}`}
                </span>
                <span className="tabular-nums">{progress}%</span>
              </div>
              <Progress
                value={progress}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          ) : null}
        </header>

        <AnimatePresence mode="wait">
          {state.phase === "intro" ? (
            <WizardIntro key="intro-screen" onStart={start} />
          ) : null}

          {state.phase === "question" && currentQuestionId ? (
            <QuestionStep
              key={currentQuestionId}
              questionId={currentQuestionId}
              options={options}
              value={currentValue}
              onSelect={(v) => answer(currentQuestionId, v)}
            />
          ) : null}

          {state.phase === "results" && recommendation ? (
            <ResultsScreen
              key="results-screen"
              recommendation={recommendation}
              onBack={goBack}
              onRestart={restart}
            />
          ) : null}
        </AnimatePresence>

        {state.phase === "question" ? (
          <div className="mt-8">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full"
              onClick={goBack}
              disabled={!canGoBack}
            >
              Back
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
