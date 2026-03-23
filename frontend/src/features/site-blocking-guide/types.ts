/**
 * Site Blocking Setup Guide — shared types.
 * Edit copy in `content/`; extend unions here when adding platforms or options.
 */

/** Device category from the first question */
export type DeviceKind = "mobile" | "computer";

/** OS / platform (second question, options depend on device) */
export type OsKind = "ios" | "android" | "mac" | "windows";

/**
 * Blocking approach the user prefers.
 * - built_in: Screen Time, Digital Wellbeing, OS parental controls, etc.
 * - browser: browser settings or extensions only
 * - third_party: dedicated blocker / accountability / parental-control apps
 */
export type BlockingMethod = "built_in" | "browser" | "third_party";

/** Browser focus when that step is shown */
export type BrowserChoice = "safari" | "chrome" | "edge" | "firefox" | "other";

/** Ordered question ids in the decision tree */
export type QuestionId = "device" | "os" | "method" | "browser";

export type QuestionBadge = "best" | "moderate" | "limited" | "stronger";

export type GuidePhase = "intro" | "question" | "results";

/** One selectable option in a question step */
export type QuestionOption<T extends string = string> = {
  value: T;
  label: string;
  description?: string;
  badge?: QuestionBadge;
};

export type QuestionDefinition = {
  id: QuestionId;
  /** Shown as the main heading for the step */
  prompt: string;
  /** Accessible name for the radio group */
  ariaLabel: string;
  /** Helper line under the title */
  hint?: string;
};

/**
 * Answers collected through the wizard.
 * `browser` is only set when `shouldShowBrowserStep` is true for the path.
 */
export type GuideAnswers = {
  device?: DeviceKind;
  os?: OsKind;
  method?: BlockingMethod;
  browser?: BrowserChoice;
};

/** Complete answers required to resolve a recommendation */
export type ResolvedGuideAnswers = {
  device: DeviceKind;
  os: OsKind;
  method: BlockingMethod;
  /** Use `"na"` when the browser step was skipped */
  browser: BrowserChoice | "na";
};

export type StrengthLevel = "strong" | "moderate" | "limited";

export type SetupStep = {
  title: string;
  detail: string;
};

/** Platform-facing label for the results screen */
export type PlatformLabel = "iPhone / iOS" | "Android" | "Mac" | "Windows";

export type SetupRecommendation = {
  title: string;
  summary: string;
  recommendedMethod: string;
  strength: StrengthLevel;
  difficultyLabel: string;
  platform: PlatformLabel;
  browserRelevance: string;
  steps: SetupStep[];
  notes: string[];
  alternatives?: { title: string; summary: string }[];
};

export type GuideState = {
  phase: GuidePhase;
  /**
   * Stack of question ids representing the path. The last entry is the
   * question currently shown (when phase === "question").
   */
  path: QuestionId[];
  answers: GuideAnswers;
};
