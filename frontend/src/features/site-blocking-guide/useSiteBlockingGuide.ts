import { useCallback, useMemo, useReducer } from "react";
import {
  clearAnswersFrom,
  getCurrentStepIndex,
  getNextQuestionId,
  getProgressPercent,
  getTotalStepsForProgress,
  isOsValidForDevice,
  shouldShowBrowserStep,
  toResolvedAnswers,
} from "./flow";
import type { GuideAnswers, GuideState, QuestionId } from "./types";
import { resolveRecommendation } from "./content/recommendations";

const initialState: GuideState = {
  phase: "intro",
  path: [],
  answers: {},
};

type Action =
  | { type: "START" }
  | { type: "ANSWER"; questionId: QuestionId; value: string }
  | { type: "BACK" }
  | { type: "RESTART" };

function guideReducer(state: GuideState, action: Action): GuideState {
  switch (action.type) {
    case "START":
      return { phase: "question", path: ["device"], answers: {} };

    case "ANSWER": {
      const { questionId, value } = action;
      const current = state.path[state.path.length - 1];
      if (state.phase !== "question" || questionId !== current) {
        return state;
      }

      const answers: GuideAnswers = {
        ...state.answers,
        [questionId]: value as GuideAnswers[keyof GuideAnswers],
      };

      // If OS doesn't match device, ignore (shouldn't happen via UI)
      if (questionId === "os" && answers.device && answers.os) {
        if (!isOsValidForDevice(answers.device, answers.os)) {
          return state;
        }
      }

      const next = getNextQuestionId(current, answers);
      if (next) {
        return { ...state, answers, path: [...state.path, next] };
      }
      return { ...state, answers, phase: "results" };
    }

    case "BACK": {
      if (state.phase === "results") {
        return { ...state, phase: "question" };
      }
      if (state.phase === "intro") {
        return state;
      }
      if (state.path.length <= 1) {
        return initialState;
      }
      const popped = state.path[state.path.length - 1];
      const newPath = state.path.slice(0, -1);
      const answers = clearAnswersFrom(state.answers, popped);
      return { ...state, path: newPath, answers };
    }

    case "RESTART":
      return initialState;

    default:
      return state;
  }
}

export function useSiteBlockingGuide() {
  const [state, dispatch] = useReducer(guideReducer, initialState);

  const start = useCallback(() => dispatch({ type: "START" }), []);
  const answer = useCallback((questionId: QuestionId, value: string) => {
    dispatch({ type: "ANSWER", questionId, value });
  }, []);
  const goBack = useCallback(() => dispatch({ type: "BACK" }), []);
  const restart = useCallback(() => dispatch({ type: "RESTART" }), []);

  const currentQuestionId = useMemo(() => {
    if (state.phase !== "question" || state.path.length === 0) return null;
    return state.path[state.path.length - 1];
  }, [state.phase, state.path]);

  const progress = useMemo(
    () => getProgressPercent(state.path, state.answers, state.phase),
    [state.path, state.answers, state.phase],
  );

  const stepIndex = useMemo(
    () => getCurrentStepIndex(state.path),
    [state.path],
  );

  const totalSteps = useMemo(
    () => getTotalStepsForProgress(state.answers),
    [state.answers],
  );

  const recommendation = useMemo(() => {
    const resolved = toResolvedAnswers(state.answers);
    if (!resolved || state.phase !== "results") return null;
    return resolveRecommendation(resolved);
  }, [state.answers, state.phase]);

  const canGoBack =
    state.phase === "results" ||
    (state.phase === "question" && state.path.length > 0);

  return {
    state,
    currentQuestionId,
    progress,
    stepIndex,
    totalSteps,
    recommendation,
    shouldShowBrowser: shouldShowBrowserStep(state.answers),
    start,
    answer,
    goBack,
    restart,
    canGoBack,
  };
}
