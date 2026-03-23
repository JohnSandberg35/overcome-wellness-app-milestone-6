/**
 * Pure flow helpers: next question, progress, and when to ask about browser.
 *
 * Browser step rule (MVP — adjust here as you add platforms):
 * - Always show after `method === "browser"` (need to know which app to configure).
 * - Show after `method === "third_party"` on Mac or Windows (extensions / install
 *   flows are often browser-specific).
 * - Skip for `built_in` (system tools cover all browsers).
 * - Skip for mobile `third_party` in this MVP (instructions stay app-store / device level).
 */
import type {
  GuideAnswers,
  GuidePhase,
  OsKind,
  QuestionId,
  ResolvedGuideAnswers,
} from "./types";

export const QUESTION_ORDER: QuestionId[] = ["device", "os", "method", "browser"];

export function shouldShowBrowserStep(answers: GuideAnswers): boolean {
  const { method, os } = answers;
  if (method === "browser") return true;
  if (method === "third_party" && (os === "mac" || os === "windows")) return true;
  return false;
}

/** Next question after the user answers `current`, or null when the flow should show results */
export function getNextQuestionId(
  current: QuestionId,
  answers: GuideAnswers,
): QuestionId | null {
  switch (current) {
    case "device":
      return "os";
    case "os":
      return "method";
    case "method":
      return shouldShowBrowserStep(answers) ? "browser" : null;
    case "browser":
      return null;
    default:
      return null;
  }
}

/**
 * Total questions in this journey when finished.
 * Until `method` is chosen we don't know if a browser step is needed — use **4** (max for this MVP).
 * After `method` is set, the count is exact (3 or 4).
 */
export function getTotalStepsForProgress(answers: GuideAnswers): number {
  if (answers.method) {
    return 3 + (shouldShowBrowserStep(answers) ? 1 : 0);
  }
  return 4;
}

/** 1-based index of the current question (“Question X of Y”) */
export function getCurrentStepIndex(path: QuestionId[]): number {
  if (path.length === 0) return 0;
  const last = path[path.length - 1];
  const idx = QUESTION_ORDER.indexOf(last);
  return idx >= 0 ? idx + 1 : path.length;
}

/**
 * Progress reflects **completed** questions, not the step you’re on — so the bar never hits 100%
 * until the results screen (or you’d see 100% while still answering the last question).
 *
 * - On a question: completed = path.length - 1 (everything before the current screen).
 * - On results: 100%.
 */
export function getProgressPercent(
  path: QuestionId[],
  answers: GuideAnswers,
  phase: GuidePhase,
): number {
  if (phase === "intro") return 0;
  if (phase === "results") return 100;

  const total = getTotalStepsForProgress(answers);
  if (total === 0) return 0;

  const completed = Math.max(0, path.length - 1);
  return Math.min(100, Math.round((completed / total) * 100));
}

/** Build a stable key for recommendation lookup */
export function buildRecommendationKey(answers: ResolvedGuideAnswers): string {
  return `${answers.device}|${answers.os}|${answers.method}|${answers.browser}`;
}

export function isResolved(
  answers: GuideAnswers,
): answers is ResolvedGuideAnswers {
  if (!answers.device || !answers.os || !answers.method) return false;
  if (shouldShowBrowserStep(answers)) {
    return !!answers.browser;
  }
  return true;
}

export function toResolvedAnswers(answers: GuideAnswers): ResolvedGuideAnswers | null {
  if (!answers.device || !answers.os || !answers.method) return null;
  if (shouldShowBrowserStep(answers)) {
    if (!answers.browser) return null;
    return {
      device: answers.device,
      os: answers.os,
      method: answers.method,
      browser: answers.browser,
    };
  }
  return {
    device: answers.device,
    os: answers.os,
    method: answers.method,
    browser: "na",
  };
}

/** Clear answers for a question and any that depend on it */
export function clearAnswersFrom(
  answers: GuideAnswers,
  fromQuestion: QuestionId,
): GuideAnswers {
  const next = { ...answers };
  const order: QuestionId[] = ["device", "os", "method", "browser"];
  const start = order.indexOf(fromQuestion);
  if (start < 0) return next;
  for (let i = start; i < order.length; i++) {
    const q = order[i];
    delete next[q as keyof GuideAnswers];
  }
  return next;
}

/** OS options allowed for a device kind */
export function osOptionsForDevice(device: GuideAnswers["device"]): OsKind[] {
  if (device === "mobile") return ["ios", "android"];
  if (device === "computer") return ["mac", "windows"];
  return [];
}

/** Whether an OS value is valid for the selected device */
export function isOsValidForDevice(device: GuideAnswers["device"], os: OsKind): boolean {
  return osOptionsForDevice(device).includes(os);
}

/** Infer device from OS (for validation) */
export function deviceForOs(os: OsKind): "mobile" | "computer" {
  return os === "ios" || os === "android" ? "mobile" : "computer";
}
