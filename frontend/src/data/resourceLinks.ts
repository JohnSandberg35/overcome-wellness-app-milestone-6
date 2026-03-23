/**
 * Curated resources for the Resources hub (`/resources`).
 * Edit the arrays below — the UI updates automatically.
 *
 * Read — in-app routes (`kind: "internal"` + `to`) or full URLs (`kind: "external"` + `href`).
 * Listen — podcast show pages (Apple, Spotify, or official site).
 * Follow — social profiles; keep `platform` accurate for trust.
 *
 * Optional `image` — HTTPS URL to square-ish artwork (podcast cover, logo).
 * If omitted, the UI uses a gradient tile with an icon or initial.
 */

export type ReadLink =
  | {
      kind: "internal";
      title: string;
      description: string;
      to: string;
      image?: string;
    }
  | {
      kind: "external";
      title: string;
      description: string;
      href: string;
      image?: string;
    };

export type ListenLink = {
  title: string;
  description: string;
  href: string;
  image?: string;
};

export type FollowLink = {
  title: string;
  description: string;
  platform: string;
  href: string;
  image?: string;
};

export const readLinks: ReadLink[] = [
  {
    kind: "internal",
    title: "Science of Recovery",
    description:
      "How your brain builds new neural pathways and learns to want different things.",
    to: "/resources/science-of-recovery",
  },
  {
    kind: "internal",
    title: "Building New Habits",
    description:
      "Small, repeatable shifts that stack into lasting change over time.",
    to: "/resources/building-new-habits",
  },
  {
    kind: "internal",
    title: "Understanding Triggers",
    description:
      "Learn to notice urges before they become decisions, without judging yourself.",
    to: "/resources/understanding-triggers",
  },
  {
    kind: "external",
    title: "Fight the New Drug – Get the Facts",
    description:
      "Non-religious, science-based nonprofit covering how porn affects the brain, relationships, and society.",
    href: "https://fightthenewdrug.org/get-the-facts/",
  },
  {
    kind: "external",
    title: "Your Brain on Porn",
    description:
      "Research library and recovery guides explaining the neuroscience of compulsive porn use.",
    href: "https://www.yourbrainonporn.com",
  },
  {
    kind: "external",
    title: "Fortify – Recovery Program",
    description:
      "Evidence-based, self-paced program with assessments, challenges, and peer community for quitting porn.",
    href: "https://www.joinfortify.com",
  },
  {
    kind: "external",
    title: "Sex Addicts Anonymous (SAA)",
    description:
      "12-step fellowship with in-person and online meetings for compulsive sexual behavior, including porn.",
    href: "https://saa-recovery.org",
  },
];

export const listenLinks: ListenLink[] = [
  {
    title: "Porn Free Radio",
    description:
      "Practical, no-fluff advice from Matt Dobschuetz on building a repeatable system that actually sticks.",
    href: "https://podcasts.apple.com/us/podcast/porn-free-radio/id872329779",
  },
  {
    title: "Unhooked: Breaking Porn Addiction",
    description:
      "Rooted in neuroscience and mindfulness, with experts and people in recovery on what lasting freedom looks like.",
    href: "https://podcasts.apple.com/us/podcast/unhooked-breaking-porn-addiction-podcast/id1648984850",
  },
  {
    title: "Consider Before Consuming (Fight the New Drug)",
    description:
      "Conversations with researchers, clinicians, and survivors about porn's real-world effects on people and relationships.",
    href: "https://fightthenewdrug.org/consider-before-consuming-podcast/",
  },
  {
    title: "The Porn Reboot Podcast",
    description:
      "Weekly coaching from J.K. Emezi aimed at men who want to break the cycle and rebuild their lives.",
    href: "https://open.spotify.com/show/4OLvJxcjkRM9C6jgpKbjJU",
  },
];

export const followLinks: FollowLink[] = [
  {
    title: "@fightthenewdrug",
    platform: "Instagram",
    description:
      "Science-backed, shame-free posts on how porn affects the brain and relationships — from a 501(c)(3) nonprofit.",
    href: "https://www.instagram.com/fightthenewdrug/",
  },
  {
    title: "Fight the New Drug",
    platform: "YouTube",
    description:
      "Documentaries, expert interviews, and personal stories on the research behind porn's harms and how people recover.",
    href: "https://www.youtube.com/@FightTheNewDrug",
  },
  {
    title: "@joinfortify",
    platform: "Instagram",
    description:
      "Recovery tips, community wins, and mindset content from the team behind the Fortify program.",
    href: "https://www.instagram.com/joinfortify/",
  },
  {
    title: "Reboot Nation",
    platform: "YouTube",
    description:
      "Community-driven channel with reboot stories, Q&As, and education on the science of quitting porn.",
    href: "https://www.youtube.com/@RebootNation",
  },
];
