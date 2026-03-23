/**
 * All wizard prompts and option labels live here for easy editing.
 */
import type {
  BlockingMethod,
  BrowserChoice,
  DeviceKind,
  OsKind,
  QuestionDefinition,
  QuestionId,
  QuestionOption,
} from "../types";

export type MethodOptionConfig = {
  value: BlockingMethod;
  label: string;
  description?: string;
  badge?: import("../types").QuestionBadge;
};

export const QUESTION_DEFS: Record<QuestionId, QuestionDefinition> = {
  device: {
    id: "device",
    prompt: "What kind of device are you setting up?",
    ariaLabel: "Device type",
    hint: "We’ll tailor steps to your screen size and operating system.",
  },
  os: {
    id: "os",
    prompt: "Which system is it?",
    ariaLabel: "Operating system",
    hint: "Pick the one that matches the device you use most for browsing.",
  },
  method: {
    id: "method",
    prompt: "How would you like to block or limit sites?",
    ariaLabel: "Blocking approach",
    hint: "You can change this later — this is just your starting path.",
  },
  browser: {
    id: "browser",
    prompt: "Which browser do you want to focus on first?",
    ariaLabel: "Browser",
    hint: "You can repeat these steps for another browser afterward.",
  },
};

export const DEVICE_OPTIONS: QuestionOption<DeviceKind>[] = [
  {
    value: "mobile",
    label: "Phone or tablet",
    description: "iPhone, iPad, or Android device.",
  },
  {
    value: "computer",
    label: "Computer",
    description: "Mac or Windows laptop / desktop.",
  },
];

export function getOsOptions(device: DeviceKind): QuestionOption<OsKind>[] {
  if (device === "mobile") {
    return [
      { value: "ios", label: "iPhone / iPad (iOS)", description: "Apple mobile devices." },
      { value: "android", label: "Android", description: "Phones and tablets running Android." },
    ];
  }
  return [
    { value: "mac", label: "Mac", description: "macOS desktop or laptop." },
    { value: "windows", label: "Windows", description: "Windows 10 or 11 PC." },
  ];
}

/** Method choices and ordering follow platform guidance in the product brief */
export function getMethodOptionsForOs(os: OsKind): MethodOptionConfig[] {
  switch (os) {
    case "ios":
      return [
        {
          value: "built_in",
          label: "Screen Time & content restrictions",
          description: "Apple’s built-in tools — best first step on iPhone.",
          badge: "best",
        },
        {
          value: "browser",
          label: "Browser-only settings",
          description: "Limited on iOS; Safari profiles are narrower than system blocking.",
          badge: "limited",
        },
        {
          value: "third_party",
          label: "Third‑party / accountability apps",
          description: "Extra layers when you want accountability beyond Screen Time.",
          badge: "stronger",
        },
      ];
    case "android":
      return [
        {
          value: "third_party",
          label: "Third‑party blocker or parental controls",
          description: "Often the most flexible option on Android.",
          badge: "best",
        },
        {
          value: "built_in",
          label: "Built‑in wellbeing / digital balance",
          description: "Useful, but site lists are often more limited than dedicated apps.",
          badge: "limited",
        },
        {
          value: "browser",
          label: "Browser settings or a focused browser",
          description: "Helps for one browser; other apps may still need separate rules.",
          badge: "limited",
        },
      ];
    case "mac":
      return [
        {
          value: "built_in",
          label: "System Screen Time / parental controls",
          description: "Covers Safari and many apps at the OS level.",
          badge: "best",
        },
        {
          value: "browser",
          label: "Browser extension or browser settings",
          description: "Strong inside Chrome/Edge/Firefox; may not cover all apps.",
          badge: "moderate",
        },
        {
          value: "third_party",
          label: "Third‑party filtering / accountability software",
          description: "Strongest when you need cross-browser or advanced rules.",
          badge: "stronger",
        },
      ];
    case "windows":
      return [
        {
          value: "built_in",
          label: "Microsoft Family Safety / Windows parental controls",
          description: "Good baseline for accounts you can manage on the device.",
          badge: "best",
        },
        {
          value: "browser",
          label: "Browser extension or strict browser profile",
          description: "Fast to set up for one browser at a time.",
          badge: "moderate",
        },
        {
          value: "third_party",
          label: "Third‑party filter / DNS / accountability tool",
          description: "Broader coverage across browsers and sometimes the whole PC.",
          badge: "stronger",
        },
      ];
    default:
      return [];
  }
}

export const BROWSER_OPTIONS: QuestionOption<BrowserChoice>[] = [
  { value: "safari", label: "Safari", description: "Apple’s default browser on Mac and iOS." },
  { value: "chrome", label: "Google Chrome", description: "Popular on all platforms." },
  { value: "edge", label: "Microsoft Edge", description: "Built into Windows; also on Mac." },
  { value: "firefox", label: "Firefox", description: "Open-source browser with extension support." },
  { value: "other", label: "Other / not sure", description: "We’ll keep guidance general." },
];
