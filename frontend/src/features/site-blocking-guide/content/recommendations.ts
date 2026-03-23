/**
 * Tailored setup recommendations — edit copy here, not in components.
 * Keys are built with `buildRecommendationKey` (device|os|method|browser).
 */
import { buildRecommendationKey } from "../flow";
import type {
  BrowserChoice,
  PlatformLabel,
  ResolvedGuideAnswers,
  SetupRecommendation,
} from "../types";

function platformLabel(os: ResolvedGuideAnswers["os"]): PlatformLabel {
  switch (os) {
    case "ios":
      return "iPhone / iOS";
    case "android":
      return "Android";
    case "mac":
      return "Mac";
    case "windows":
      return "Windows";
    default:
      return "Windows";
  }
}

const DEFAULT: SetupRecommendation = {
  title: "Your personalized blocking plan",
  summary:
    "Use the steps below on your device. This app does not change your settings for you — you stay in control.",
  recommendedMethod: "Mixed approaches",
  strength: "moderate",
  difficultyLabel: "Varies",
  platform: "Windows",
  browserRelevance: "Pick one browser to lock down first, then expand.",
  steps: [
    {
      title: "Pick one place to start",
      detail:
        "Choose either system settings, a single browser, or a dedicated tool — trying all at once can get overwhelming.",
    },
    {
      title: "Write down your “why”",
      detail:
        "A short note in your phone about why you want protection makes it easier to finish setup when it feels tedious.",
    },
    {
      title: "Ask for help if you need it",
      detail:
        "A trusted friend or partner can hold a Screen Time passcode or check in after you install a tool.",
    },
  ],
  notes: [
    "If anything feels confusing, step away and come back — partial setup still counts.",
  ],
};

/** Primary lookup table — add new keys as you expand the flow */
const BY_KEY: Record<string, SetupRecommendation> = {
  // ——— iPhone / iOS ———
  "mobile|ios|built_in|na": {
    title: "iPhone: Screen Time & content restrictions",
    summary:
      "Apple’s built-in Screen Time is the strongest default on iPhone for limiting adult content and specific sites.",
    recommendedMethod: "Screen Time → Content & Privacy Restrictions",
    strength: "strong",
    difficultyLabel: "Moderate (passcode helps)",
    platform: "iPhone / iOS",
    browserRelevance:
      "Applies across Safari and many apps when configured with web content limits.",
    steps: [
      {
        title: "Open Screen Time",
        detail:
          "Settings → Screen Time. If it’s off, turn it on. Consider using a Screen Time passcode someone else holds if you want extra friction.",
      },
      {
        title: "Turn on Content & Privacy Restrictions",
        detail:
          "Screen Time → Content & Privacy Restrictions → Turn On. Choose a passcode separate from your device passcode if you use accountability.",
      },
      {
        title: "Limit adult web content",
        detail:
          "Content Restrictions → Web Content → Limit Adult Websites (or “Allowed Websites Only” for the strictest list). Add specific sites under “Never Allow” if needed.",
      },
      {
        title: "Check app limits (optional)",
        detail:
          "Use App Limits or Downtime for browsers or apps you want to cap — helpful if certain apps are part of the pattern.",
      },
    ],
    notes: [
      "Best option on iPhone for broad protection without installing another app.",
      "Passcodes work best when someone you trust stores them — self-only passcodes are easier to override in a tough moment.",
    ],
    alternatives: [
      {
        title: "If you need more accountability",
        summary:
          "Pair Screen Time with a trusted ally or a separate accountability app — look for tools that focus on transparency, not shame.",
      },
    ],
  },

  "mobile|ios|browser|safari": {
    title: "iPhone: Safari-focused limits",
    summary:
      "Safari settings help a little, but on iOS, Screen Time usually protects more broadly than browser tweaks alone.",
    recommendedMethod: "Safari settings + Screen Time (recommended)",
    strength: "limited",
    difficultyLabel: "Easy in Safari; stronger with Screen Time",
    platform: "iPhone / iOS",
    browserRelevance: "These steps focus on Safari.",
    steps: [
      {
        title: "Start with Screen Time for web",
        detail:
          "Settings → Screen Time → Content & Privacy Restrictions → Content Restrictions → Web Content. This affects Safari more reliably than per-site settings alone.",
      },
      {
        title: "Block pop-ups and cross-site tracking (supporting layer)",
        detail:
          "Settings → Safari → enable Block Pop-ups and adjust Privacy & Security options. Helpful, but not a full block list.",
      },
      {
        title: "Consider a stricter list",
        detail:
          "If you need maximum restriction, use “Allowed Websites Only” under Web Content — it’s rigid but clear.",
      },
    ],
    notes: [
      "Limited option: browser-only changes are easier to work around than system Screen Time rules.",
      "Stronger protection: add Screen Time website limits or third-party accountability if Safari-only isn’t enough.",
    ],
  },

  "mobile|ios|browser|chrome": {
    title: "iPhone: Chrome habits + system limits",
    summary:
      "Chrome on iOS uses Apple’s WebKit — pair in-app habits with Screen Time for adult content and app limits.",
    recommendedMethod: "Chrome settings + Screen Time web limits",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "iPhone / iOS",
    browserRelevance: "Chrome on iOS is still subject to system-level web content rules.",
    steps: [
      {
        title: "Use Screen Time for web content",
        detail:
          "Settings → Screen Time → Content & Privacy Restrictions → Web Content. This influences what Chrome can load for restricted categories.",
      },
      {
        title: "Inside Chrome",
        detail:
          "Open Chrome → More (…) → Settings → Privacy and Security. Turn on Safe Browsing and review site settings — supportive, not a full substitute for Screen Time.",
      },
      {
        title: "Combine with App Limits",
        detail:
          "Screen Time → App Limits → add Chrome with a daily cap if endless scrolling is part of the risk pattern.",
      },
    ],
    notes: [
      "For strongest protection on iPhone, Screen Time remains the backbone; Chrome settings are a supporting layer.",
    ],
  },

  "mobile|ios|browser|edge": {
    title: "iPhone: Microsoft Edge + system limits",
    summary:
      "Treat Edge like other iOS browsers: combine in-app safety options with Screen Time’s web and app controls.",
    recommendedMethod: "Edge settings + Screen Time",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "iPhone / iOS",
    browserRelevance: "Edge on iOS follows the same system web restrictions as other browsers.",
    steps: [
      {
        title: "Set Screen Time web rules first",
        detail:
          "Settings → Screen Time → Content & Privacy Restrictions → Web Content → choose Limit Adult Websites or stricter.",
      },
      {
        title: "Edge privacy settings",
        detail:
          "Edge → … → Settings → Privacy and Security. Enable tracking prevention and review site permissions.",
      },
      {
        title: "Optional: limit Edge by time",
        detail: "Screen Time → App Limits → Edge if you need a daily ceiling.",
      },
    ],
    notes: ["Edge-specific toggles help, but OS-level limits do the heavy lifting on iPhone."],
  },

  "mobile|ios|browser|firefox": {
    title: "iPhone: Firefox Focus or Firefox + Screen Time",
    summary:
      "Use Firefox’s privacy tools alongside Screen Time — Firefox alone cannot fully replace system restrictions on iOS.",
    recommendedMethod: "Firefox / Focus + Screen Time",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "iPhone / iOS",
    browserRelevance: "Consider Firefox Focus for a simpler, privacy-oriented browsing mode.",
    steps: [
      {
        title: "Enable Screen Time web limits",
        detail:
          "Settings → Screen Time → Content & Privacy Restrictions → Web Content. Set the level that matches your recovery needs.",
      },
      {
        title: "Firefox Focus (optional separate app)",
        detail:
          "Firefox Focus deletes history easily and blocks many trackers — helpful as a support tool, not the only layer.",
      },
      {
        title: "App limit both browsers if you switch",
        detail:
          "If you bounce between Safari, Chrome, and Firefox, add App Limits for each so there isn’t an easy gap.",
      },
    ],
    notes: ["Rotating browsers to bypass limits is common — close the gap with Screen Time and app limits."],
  },

  "mobile|ios|browser|other": {
    title: "iPhone: Any browser + Screen Time",
    summary:
      "On iOS, system Screen Time rules matter more than which browser you pick — start there, then tune the browser you use most.",
    recommendedMethod: "Screen Time first, then browser habits",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "iPhone / iOS",
    browserRelevance: "Applies to any iOS browser.",
    steps: [
      {
        title: "Set web content in Screen Time",
        detail:
          "Settings → Screen Time → Content & Privacy Restrictions → Web Content → pick the strictness you can sustain.",
      },
      {
        title: "Identify your main browser",
        detail:
          "Whatever you open most (Safari, Chrome, etc.) gets an App Limit if time-based spirals are part of the pattern.",
      },
      {
        title: "Remove easy shortcuts",
        detail:
          "Delete bookmarks or home-screen shortcuts to risky pages after your limits are on — reduce one-tap access.",
      },
    ],
    notes: ["Stronger protection still pairs well with accountability from a trusted person."],
  },

  "mobile|ios|third_party|na": {
    title: "iPhone: Third‑party accountability & blockers",
    summary:
      "Third‑party apps can add reporting, schedules, or device-wide rules — vet carefully and prefer reputable tools.",
    recommendedMethod: "Accountability / filtering apps (App Store)",
    strength: "strong",
    difficultyLabel: "Varies by app",
    platform: "iPhone / iOS",
    browserRelevance:
      "Many tools cover all browsers; some are VPN-style profiles requiring careful install.",
    steps: [
      {
        title: "Keep Screen Time on as a base",
        detail:
          "Even with another app, leave Screen Time adult content limits enabled so there isn’t an obvious gap.",
      },
      {
        title: "Choose a transparent tool",
        detail:
          "Prefer apps with clear privacy policies and optional ally features instead of opaque “black box” blockers.",
      },
      {
        title: "Install with intention",
        detail:
          "Follow the app’s setup wizard slowly. If it needs a VPN or profile, read why — revoke if anything feels off.",
      },
      {
        title: "Pair with human support",
        detail:
          "If the app offers partner codes or check-ins, use them — friction plus connection beats friction alone.",
      },
    ],
    notes: [
      "Stronger protection when paired with Screen Time — avoid stacking so many tools that you can’t tell what broke.",
    ],
  },

  // ——— Android ———
  "mobile|android|built_in|na": {
    title: "Android: Digital Wellbeing & parental-style controls",
    summary:
      "Built-in wellbeing tools help with time and some content, but granular site blocking varies by manufacturer — expect a limited option.",
    recommendedMethod: "Digital Wellbeing + site controls (if available)",
    strength: "limited",
    difficultyLabel: "Easy to moderate",
    platform: "Android",
    browserRelevance: "Chrome’s SafeSearch and family features may help partially — check your Android version.",
    steps: [
      {
        title: "Open Digital Wellbeing",
        detail:
          "Settings → Digital Wellbeing & parental controls (names vary). Review Dashboard timers for browsers.",
      },
      {
        title: "Tune Chrome / default browser",
        detail:
          "Chrome → Settings → Privacy and Security → enable Safe Browsing and review site settings.",
      },
      {
        title: "If site lists are missing",
        detail:
          "Note what you can’t block here — that gap is why many people add a dedicated blocker app next.",
      },
    ],
    notes: [
      "Limited option for hard site blocks compared to dedicated apps — plan a next step if urges bypass timers.",
    ],
    alternatives: [
      {
        title: "Stronger protection",
        summary:
          "Consider a reputable parental-control or accountability app from the Play Store with clear reviews and transparent permissions.",
      },
    ],
  },

  "mobile|android|third_party|na": {
    title: "Android: Third‑party blocker or parental controls",
    summary:
      "Dedicated apps often provide installable profiles, schedules, and site lists that built-in tools lack on many Android devices.",
    recommendedMethod: "Third‑party filtering / accountability app",
    strength: "strong",
    difficultyLabel: "Moderate (depends on app)",
    platform: "Android",
    browserRelevance:
      "Pick whether coverage is VPN-based, accessibility-based, or browser-only before you install.",
    steps: [
      {
        title: "Pick one reputable tool",
        detail:
          "Search the Play Store for parental control or accountability apps with strong reviews and clear data practices.",
      },
      {
        title: "Understand permissions",
        detail:
          "Read what Accessibility, VPN, or Device Admin means for that app — only proceed if it feels transparent.",
      },
      {
        title: "Configure site categories",
        detail:
          "Start with adult content categories and custom deny lists. Add your personal trigger sites if the app allows lists.",
      },
      {
        title: "Add an ally if available",
        detail:
          "Many apps support partner emails or PINs — use them to reduce impulse overrides.",
      },
    ],
    notes: [
      "Best option for many Android users who need reliable URL-level blocking across browsers.",
    ],
  },

  "mobile|android|browser|chrome": {
    title: "Android: Chrome-first setup",
    summary:
      "Lock down Chrome, then add a system or third-party layer so other browsers aren’t a loophole.",
    recommendedMethod: "Chrome + broader protection",
    strength: "moderate",
    difficultyLabel: "Easy for Chrome; add layers for full coverage",
    platform: "Android",
    browserRelevance: "Chrome is the default on many Android phones.",
    steps: [
      {
        title: "Chrome Safe Browsing",
        detail:
          "Chrome → ⋮ → Settings → Privacy and security → enable Safe Browsing and review site settings.",
      },
      {
        title: "Use Family Link (if applicable)",
        detail:
          "If you manage the device with Google Family Link, adjust filters there for a younger account — adults may need different tools.",
      },
      {
        title: "Close the multi-browser gap",
        detail:
          "If you install Firefox or Edge too, repeat key settings or use an app that covers all browsers.",
      },
    ],
    notes: [
      "Browser-only is a limited option on Android if other browsers remain unconfigured.",
    ],
  },

  "mobile|android|browser|safari": {
    title: "Android: Browser focus",
    summary:
      "Safari isn’t on Android — you likely meant another browser. Treat this as “default browser” setup.",
    recommendedMethod: "Default browser + system / third-party coverage",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Android",
    browserRelevance: "Pick Chrome, Firefox, Edge, or Samsung Internet as your primary.",
    steps: [
      {
        title: "Choose your real browser",
        detail:
          "Open the browser you use most and enable Safe Browsing or equivalent in its privacy settings.",
      },
      {
        title: "Set it as default",
        detail:
          "Settings → Apps → Default apps → Browser app — reduces accidental drift to an unconfigured browser.",
      },
      {
        title: "Add non-browser protection",
        detail:
          "Because Android site blocking varies, pair browser tweaks with Digital Wellbeing timers or a blocker app.",
      },
    ],
    notes: ["Safari is iOS/mac only — your path still works; just swap Safari for your Android browser."],
  },

  "mobile|android|browser|edge": {
    title: "Android: Microsoft Edge habits",
    summary:
      "Harden Edge, then ensure Chrome or other browsers aren’t an open bypass.",
    recommendedMethod: "Edge privacy settings + extra layer",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Android",
    browserRelevance: "Edge includes tracking prevention tiers — use Strict if you can live with occasional site breaks.",
    steps: [
      {
        title: "Edge tracking prevention",
        detail: "Edge → … → Settings → Privacy and security → set Tracking prevention to Strict.",
      },
      {
        title: "Block ads / invasive trackers",
        detail: "Toggle additional blocking options if shown — reduces clickbait funnels.",
      },
      {
        title: "Mirror limits on Chrome",
        detail:
          "If you still have Chrome installed, apply Safe Browsing and timers so Edge isn’t the only locked door.",
      },
    ],
    notes: ["Stronger protection: add a dedicated blocker if you still find workarounds."],
  },

  "mobile|android|browser|firefox": {
    title: "Android: Firefox + add-ons (where supported)",
    summary:
      "Firefox allows extensions on Android in many builds — useful, but still add a whole-device plan.",
    recommendedMethod: "Firefox + system / third-party backup",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Android",
    browserRelevance: "Check Mozilla’s docs for your Firefox version’s extension support.",
    steps: [
      {
        title: "Update Firefox",
        detail: "Play Store → ensure Firefox is current so extension support matches docs.",
      },
      {
        title: "Add a reputable content filter extension",
        detail:
          "Only install extensions from Mozilla’s recommended lists — read permissions carefully.",
      },
      {
        title: "Cover other browsers",
        detail:
          "Extensions don’t protect Chrome — duplicate minimal protections or use an app-wide tool.",
      },
    ],
    notes: ["Limited option if you only fix Firefox while Chrome stays wide open."],
  },

  "mobile|android|browser|other": {
    title: "Android: General browser tightening",
    summary:
      "Turn on every safety toggle in your main browser, then add a device-wide layer.",
    recommendedMethod: "Browser safety toggles + Digital Wellbeing / blocker",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Android",
    browserRelevance: "Applies broadly.",
    steps: [
      {
        title: "Find Privacy / Security in your browser",
        detail:
          "Look for Safe Browsing, Do Not Track, and site permissions — tighten anything related to adult content.",
      },
      {
        title: "Set the browser as default",
        detail: "Settings → Default apps — fewer surprise launches elsewhere.",
      },
      {
        title: "Add accountability",
        detail:
          "Pair technical blocks with a human check-in — tech alone rarely beats strong urges at 2 a.m.",
      },
    ],
    notes: [],
  },

  // ——— Mac ———
  "computer|mac|built_in|na": {
    title: "Mac: Screen Time & system controls",
    summary:
      "macOS Screen Time can limit adult websites across Safari and managed accounts — a strong baseline before extensions.",
    recommendedMethod: "Screen Time website restrictions",
    strength: "strong",
    difficultyLabel: "Moderate",
    platform: "Mac",
    browserRelevance: "Safari follows Screen Time web limits closely; other browsers may need their own rules.",
    steps: [
      {
        title: "Open Screen Time",
        detail:
          "System Settings → Screen Time → Content & Privacy → Content Restrictions → Web Content.",
      },
      {
        title: "Choose restriction level",
        detail:
          "Limit Adult Websites or use Allowed Websites Only for maximum clarity. Add specific URLs under “Restrict” lists.",
      },
      {
        title: "Use a passcode intentionally",
        detail:
          "If you want friction, let a trusted person set the Screen Time passcode.",
      },
      {
        title: "Check alternative browsers",
        detail:
          "If you use Chrome or Firefox for adult content historically, repeat limits inside those browsers or remove them.",
      },
    ],
    notes: [
      "Best option for many Mac users who want OS-level rules without installing new software first.",
    ],
  },

  "computer|mac|browser|safari": {
    title: "Mac: Safari + Screen Time",
    summary:
      "Combine Safari’s site settings with Screen Time so limits aren’t only inside the browser menu.",
    recommendedMethod: "Screen Time + Safari privacy settings",
    strength: "strong",
    difficultyLabel: "Moderate",
    platform: "Mac",
    browserRelevance: "Safari",
    steps: [
      {
        title: "Screen Time web content",
        detail: "System Settings → Screen Time → Content & Privacy → Web Content → set your tier.",
      },
      {
        title: "Safari privacy",
        detail:
          "Safari → Settings → Websites → review Camera/Microphone/Location permissions; remove risky auto-play allowances.",
      },
      {
        title: "Pop-ups and extensions",
        detail:
          "Safari → Settings → Websites → Pop-up Windows → Block. Only install Safari extensions from trusted developers.",
      },
    ],
    notes: ["Stronger protection: keep Screen Time passcodes out of easy reach."],
  },

  "computer|mac|browser|chrome": {
    title: "Mac: Chrome extensions & profiles",
    summary:
      "Use a dedicated profile plus an extension for filtering — remember Safari and other browsers still need rules.",
    recommendedMethod: "Chrome profile + reputable extension",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Mac",
    browserRelevance: "Google Chrome",
    steps: [
      {
        title: "Create a recovery-focused profile",
        detail:
          "Chrome → Profile → Add → name it clearly. Sign out of personal Google if syncing risky data is a concern.",
      },
      {
        title: "Install a content filter extension",
        detail:
          "Chrome Web Store → choose a well-reviewed filter or accountability extension — read permissions.",
      },
      {
        title: "Lock other browsers",
        detail:
          "If Safari is a bypass, apply Screen Time limits or remove Safari from the Dock temporarily.",
      },
    ],
    notes: [
      "Moderate strength inside Chrome — pair with Screen Time for system-wide coverage.",
    ],
  },

  "computer|mac|browser|edge": {
    title: "Mac: Microsoft Edge",
    summary:
      "Edge offers tracking prevention and extension support similar to Chrome — configure both Edge and your other installed browsers.",
    recommendedMethod: "Edge tracking prevention + extensions",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Mac",
    browserRelevance: "Microsoft Edge",
    steps: [
      {
        title: "Strict tracking prevention",
        detail: "Edge → Settings → Privacy → Tracking prevention → Strict.",
      },
      {
        title: "Extensions",
        detail:
          "Edge Add-ons → install a filter you trust — verify publisher and reviews.",
      },
      {
        title: "Screen Time backup",
        detail:
          "System Settings → Screen Time → add website limits that apply even if you forget Edge is open.",
      },
    ],
    notes: [],
  },

  "computer|mac|browser|firefox": {
    title: "Mac: Firefox containers & extensions",
    summary:
      "Firefox Multi-Account Containers plus filter extensions help separate “safe” browsing from risky patterns.",
    recommendedMethod: "Firefox + extension + Screen Time",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Mac",
    browserRelevance: "Mozilla Firefox",
    steps: [
      {
        title: "Update Firefox",
        detail: "About Firefox → check for updates before installing extensions.",
      },
      {
        title: "Add a filter extension",
        detail:
          "addons.mozilla.org → pick a reputable content filter — read permissions closely.",
      },
      {
        title: "Containers (optional)",
        detail:
          "Use Containers to keep recovery browsing separate — reduces accidental suggestions bleeding across contexts.",
      },
    ],
    notes: ["Pair with Screen Time URL limits so Firefox isn’t the only guarded surface."],
  },

  "computer|mac|browser|other": {
    title: "Mac: Any browser + system guardrails",
    summary:
      "No matter the browser, add Screen Time website rules and shrink install set to browsers you actually secure.",
    recommendedMethod: "Screen Time + per-browser tightening",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Mac",
    browserRelevance: "General",
    steps: [
      {
        title: "Screen Time first",
        detail:
          "System Settings → Screen Time → Web Content — set adult site limits broadly.",
      },
      {
        title: "Secure each installed browser",
        detail:
          "Repeat Safe Browsing / extension installs for every browser on the dock — one weak browser is a loophole.",
      },
      {
        title: "Reduce install bloat",
        detail:
          "Uninstall browsers you don’t need for work/school so the attack surface shrinks.",
      },
    ],
    notes: [],
  },

  "computer|mac|third_party|safari": {
    title: "Mac: Third‑party tool (Safari focus)",
    summary:
      "Many filters integrate with Safari or use system profiles — read install prompts carefully.",
    recommendedMethod: "Third‑party filter with Safari in mind",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Mac",
    browserRelevance: "Safari",
    steps: [
      {
        title: "Pick a transparent vendor",
        detail:
          "Prefer tools that explain VPN or proxy usage and offer uninstall instructions.",
      },
      {
        title: "Install deliberately",
        detail:
          "If the tool adds a configuration profile, download only from the vendor’s official site.",
      },
      {
        title: "Test Safari",
        detail:
          "After install, verify adult sites trigger blocks — then test Chrome/Firefox if they remain installed.",
      },
    ],
    notes: ["Stronger protection when combined with Screen Time passcodes you don’t memorize alone."],
  },

  "computer|mac|third_party|chrome": {
    title: "Mac: Third‑party tool (Chrome focus)",
    summary:
      "Extension-based filters help inside Chrome — still close gaps in Safari and other browsers.",
    recommendedMethod: "Filter software + Chrome extension",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Mac",
    browserRelevance: "Chrome",
    steps: [
      {
        title: "Install system or proxy layer if offered",
        detail:
          "Some tools bundle both — choose the minimum you need to avoid performance issues.",
      },
      {
        title: "Chrome extension path",
        detail:
          "Pin the extension, then remove other Chrome profiles that bypass it.",
      },
      {
        title: "Mirror or remove Safari",
        detail:
          "Either configure the same vendor’s Safari support or apply Screen Time to Safari URLs.",
      },
    ],
    notes: [],
  },

  "computer|mac|third_party|edge": {
    title: "Mac: Third‑party tool (Edge focus)",
    summary:
      "Treat Edge like Chrome — extensions help, but whole-device tools cover more ground.",
    recommendedMethod: "Third‑party suite + Edge extension",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Mac",
    browserRelevance: "Edge",
    steps: [
      {
        title: "Install vendor software from official sources",
        detail: "Avoid third-party download mirrors.",
      },
      {
        title: "Edge add-on",
        detail:
          "Microsoft Edge Add-ons → install the companion filter if the vendor provides one.",
      },
      {
        title: "Audit other browsers",
        detail:
          "Especially Safari and Chrome — don’t leave an unfiltered default.",
      },
    ],
    notes: [],
  },

  "computer|mac|third_party|firefox": {
    title: "Mac: Third‑party tool (Firefox focus)",
    summary:
      "Firefox extensions are powerful — pair with a system-level filter so other apps aren’t a bypass.",
    recommendedMethod: "Third‑party + Firefox extension",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Mac",
    browserRelevance: "Firefox",
    steps: [
      {
        title: "Install the vendor’s Firefox add-on",
        detail:
          "From Mozilla’s signed add-ons site when possible — verify the publisher ID.",
      },
      {
        title: "Disable other profiles",
        detail:
          "Remove extra Firefox profiles that could load without the extension.",
      },
      {
        title: "System backup",
        detail:
          "Add Screen Time or a DNS filter so protection isn’t only inside Firefox.",
      },
    ],
    notes: [],
  },

  "computer|mac|third_party|other": {
    title: "Mac: Third‑party tool (general)",
    summary:
      "Follow the vendor’s Mac instructions and then verify every browser on your machine.",
    recommendedMethod: "Third‑party filtering / accountability suite",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Mac",
    browserRelevance: "All browsers — verify each.",
    steps: [
      {
        title: "Official installer only",
        detail:
          "Download from the company’s domain; avoid repackaged bundles.",
      },
      {
        title: "Complete the onboarding checklist",
        detail:
          "Many tools skip steps unless you finish the wizard — schedule time to finish in one sitting.",
      },
      {
        title: "Walk every browser",
        detail:
          "Safari, Chrome, Edge, Firefox — test a known-safe adult-content filter page the vendor provides.",
      },
    ],
    notes: [],
  },

  // ——— Windows ———
  "computer|windows|built_in|na": {
    title: "Windows: Family Safety & system accounts",
    summary:
      "Microsoft Family Safety filters work well for child accounts — adults may need different tools but can still borrow pieces of the stack.",
    recommendedMethod: "Family Safety content filters + Edge protections",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Windows",
    browserRelevance: "Edge integrates tightly with Microsoft accounts.",
    steps: [
      {
        title: "Review your account type",
        detail:
          "Family Safety is easiest when an organizer manages the device — adults may combine DNS filters instead.",
      },
      {
        title: "Edge Kids Mode or strict tracking prevention",
        detail:
          "Edge → Settings → Privacy → Strict tracking prevention; explore Kids Mode if applicable.",
      },
      {
        title: "Hosts file / DNS (advanced)",
        detail:
          "Some users add DNS filtering at the router — only change hosts or DNS if you know how to undo it.",
      },
    ],
    notes: [
      "Limited option for adults using a single personal Microsoft account without family features — consider DNS or a third-party filter.",
    ],
    alternatives: [
      {
        title: "Stronger protection",
        summary:
          "Pair with a reputable DNS filter (NextDNS-style) or a dedicated accountability app for Windows.",
      },
    ],
  },

  "computer|windows|browser|chrome": {
    title: "Windows: Chrome profiles & extensions",
    summary:
      "Create a recovery Chrome profile, add a filter extension, and remove other install paths (Edge, other browsers) or secure them too.",
    recommendedMethod: "Chrome extension + Safe Browsing",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Windows",
    browserRelevance: "Chrome",
    steps: [
      {
        title: "New Chrome profile",
        detail:
          "Profile menu → Add → label it clearly. Turn off sync of risky data if needed.",
      },
      {
        title: "Chrome Web Store filter",
        detail:
          "Install a reviewed content blocker — read permissions and pin it to the toolbar.",
      },
      {
        title: "Secure Edge too",
        detail:
          "Windows will keep Edge — apply strict tracking prevention or remove Edge shortcuts if policy allows.",
      },
    ],
    notes: [
      "Moderate strength inside Chrome — strongest when combined with DNS or accountability software.",
    ],
  },

  "computer|windows|browser|edge": {
    title: "Windows: Edge strict mode",
    summary:
      "Edge is built-in — harden it first, then make sure Chrome/Firefox aren’t unfiltered alternates.",
    recommendedMethod: "Edge tracking prevention + extensions",
    strength: "moderate",
    difficultyLabel: "Easy to moderate",
    platform: "Windows",
    browserRelevance: "Edge",
    steps: [
      {
        title: "Strict tracking prevention",
        detail: "Edge → Settings → Privacy, search, and services → Strict.",
      },
      {
        title: "Edge extensions",
        detail:
          "Microsoft Edge Add-ons → add a filter extension from a known publisher.",
      },
      {
        title: "Other browsers",
        detail:
          "Install the same class of extension in Chrome/Firefox or uninstall extras.",
      },
    ],
    notes: [],
  },

  "computer|windows|browser|firefox": {
    title: "Windows: Firefox extensions",
    summary:
      "Firefox on Windows supports a rich extension ecosystem — still add DNS or accountability if you multi-browser.",
    recommendedMethod: "Firefox add-ons + backup layer",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Windows",
    browserRelevance: "Firefox",
    steps: [
      {
        title: "Install a filter add-on",
        detail:
          "addons.mozilla.org → choose signed extensions with clear privacy policies.",
      },
      {
        title: "Disable unused profiles",
        detail:
          "about:profiles → remove test profiles that bypass extensions.",
      },
      {
        title: "DNS or system tool",
        detail:
          "Consider router-level DNS filtering so Edge/Chrome can’t bypass Firefox-only rules.",
      },
    ],
    notes: [],
  },

  "computer|windows|browser|safari": {
    title: "Windows: Safari isn’t available",
    summary:
      "Safari for Windows is deprecated — treat this as “pick another browser” and apply Windows-wide protection.",
    recommendedMethod: "Edge or Chrome + DNS / Family settings",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Windows",
    browserRelevance: "Use Edge or Chrome on Windows instead of Safari.",
    steps: [
      {
        title: "Choose Edge or Chrome",
        detail:
          "Pick one primary browser and walk through its safety and extension settings.",
      },
      {
        title: "Add DNS filtering",
        detail:
          "Router or Windows DNS settings can block categories network-wide — follow a trusted guide.",
      },
      {
        title: "Remove ambiguity",
        detail:
          "Delete extra browsers you don’t truly need so every path is covered.",
      },
    ],
    notes: ["Safari isn’t supported on modern Windows — your plan still works with Edge/Chrome."],
  },

  "computer|windows|browser|other": {
    title: "Windows: General browser hardening",
    summary:
      "Turn on every safety feature in your main browser, then add DNS or a third-party filter for gaps.",
    recommendedMethod: "Browser toggles + DNS / filter app",
    strength: "moderate",
    difficultyLabel: "Moderate",
    platform: "Windows",
    browserRelevance: "Varies",
    steps: [
      {
        title: "Safe Browsing equivalents",
        detail:
          "In each browser’s privacy settings, enable phishing/unsafe site protections.",
      },
      {
        title: "Default browser",
        detail:
          "Settings → Apps → Default apps — reduce accidental launches of an unsecured browser.",
      },
      {
        title: "Accountability",
        detail:
          "Tell someone you trust that you’re doing this — social friction helps when tech friction fails.",
      },
    ],
    notes: [],
  },

  "computer|windows|third_party|chrome": {
    title: "Windows: Third‑party suite (Chrome focus)",
    summary:
      "Install vendor software from official sites, then add the Chrome extension component if offered.",
    recommendedMethod: "Windows filter + Chrome extension",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Windows",
    browserRelevance: "Chrome",
    steps: [
      {
        title: "Download from the vendor",
        detail:
          "Verify HTTPS and the publisher name on the installer.",
      },
      {
        title: "Chrome extension",
        detail:
          "Chrome Web Store → install the official companion — avoid copycats.",
      },
      {
        title: "Test both Edge and Chrome",
        detail:
          "Make sure bypasses aren’t as simple as opening another icon.",
      },
    ],
    notes: [],
  },

  "computer|windows|third_party|edge": {
    title: "Windows: Third‑party suite (Edge focus)",
    summary:
      "Many tools integrate with Edge first — still verify Chrome if it’s installed.",
    recommendedMethod: "Third‑party + Edge add-on",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Windows",
    browserRelevance: "Edge",
    steps: [
      {
        title: "Official installer",
        detail:
          "Run as administrator only if the vendor requests — otherwise prefer standard install.",
      },
      {
        title: "Edge add-on",
        detail:
          "Edge Add-ons → install the signed extension from the same vendor.",
      },
      {
        title: "Chrome audit",
        detail:
          "If Chrome exists, install the same vendor’s Chrome extension or remove Chrome.",
      },
    ],
    notes: [],
  },

  "computer|windows|third_party|firefox": {
    title: "Windows: Third‑party suite (Firefox focus)",
    summary:
      "Pair Mozilla-signed add-ons with the Windows service component if the vendor splits them.",
    recommendedMethod: "Service + Firefox add-on",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Windows",
    browserRelevance: "Firefox",
    steps: [
      {
        title: "Service install",
        detail:
          "Follow the vendor’s Windows service instructions — reboot if required.",
      },
      {
        title: "Firefox add-on",
        detail:
          "Install only from addons.mozilla.org with matching publisher name.",
      },
      {
        title: "System check",
        detail:
          "After reboot, verify the filter still loads — Windows updates sometimes disable helpers.",
      },
    ],
    notes: [],
  },

  "computer|windows|third_party|safari": {
    title: "Windows: Third‑party (Safari note)",
    summary:
      "Safari isn’t on Windows — use this plan as general third‑party + Edge/Chrome guidance.",
    recommendedMethod: "Third‑party Windows filter",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Windows",
    browserRelevance: "Prefer Edge or Chrome on Windows.",
    steps: [
      {
        title: "Install the Windows client",
        detail:
          "Follow the vendor checklist — enable startup items if recommended.",
      },
      {
        title: "Configure browsers",
        detail:
          "Add extensions to Edge and Chrome even if you mostly use one — closes loopholes.",
      },
      {
        title: "Re-test after Windows updates",
        detail:
          "Re-verify filters monthly — updates can reset network adapters or DNS settings.",
      },
    ],
    notes: ["Safari isn’t available on Windows — browser focus should be Edge or Chrome."],
  },

  "computer|windows|third_party|other": {
    title: "Windows: Third‑party filter / accountability",
    summary:
      "Windows offers many reputable DNS and app-level tools — prioritize transparency and uninstall paths.",
    recommendedMethod: "Third‑party filtering / accountability software",
    strength: "strong",
    difficultyLabel: "Varies",
    platform: "Windows",
    browserRelevance: "Verify each installed browser after setup.",
    steps: [
      {
        title: "Choose transparent software",
        detail:
          "Prefer vendors that document what their VPN or proxy does and how to remove it.",
      },
      {
        title: "Complete setup in one session",
        detail:
          "Half-installed filters create a false sense of safety — block time on your calendar.",
      },
      {
        title: "Test every browser",
        detail:
          "Edge, Chrome, Firefox — adult test pages from the vendor should fail to load.",
      },
    ],
    notes: [],
  },
};

function cloneRec(rec: SetupRecommendation): SetupRecommendation {
  return {
    ...rec,
    steps: rec.steps.map((s) => ({ ...s })),
    notes: [...rec.notes],
    alternatives: rec.alternatives?.map((a) => ({ ...a })),
  };
}

export function resolveRecommendation(answers: ResolvedGuideAnswers): SetupRecommendation {
  const key = buildRecommendationKey(answers);
  const direct = BY_KEY[key];
  if (direct) {
    return cloneRec({ ...direct, platform: platformLabel(answers.os) });
  }

  // Fallback: same path but browser → "other" template family
  if (answers.browser !== "other" && answers.browser !== "na") {
    const otherKey = buildRecommendationKey({
      ...answers,
      browser: "other" as BrowserChoice,
    });
    const other = BY_KEY[otherKey];
    if (other) {
      return cloneRec({ ...other, platform: platformLabel(answers.os) });
    }
  }

  // OS + method fallback (drop browser nuance)
  const naKey = buildRecommendationKey({ ...answers, browser: "na" });
  const na = BY_KEY[naKey];
  if (na) {
    return cloneRec({ ...na, platform: platformLabel(answers.os) });
  }

  return cloneRec({ ...DEFAULT, platform: platformLabel(answers.os) });
}
