import { useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Headphones,
  BookOpen,
  AtSign,
  Globe,
  ChevronRight,
  Library,
  Instagram,
  Youtube,
} from "lucide-react";
import {
  readLinks,
  listenLinks,
  followLinks,
  type ReadLink,
  type ListenLink,
  type FollowLink,
} from "@/data/resourceLinks";

const THUMB_GRADIENTS = [
  "from-emerald-500/50 via-teal-500/35 to-cyan-600/25",
  "from-sky-500/45 via-blue-600/30 to-indigo-600/20",
  "from-violet-500/45 via-purple-600/30 to-fuchsia-600/20",
  "from-amber-500/40 via-orange-500/30 to-rose-500/25",
  "from-teal-500/45 via-emerald-600/30 to-sky-600/20",
] as const;

function gradientAt(i: number) {
  return THUMB_GRADIENTS[i % THUMB_GRADIENTS.length];
}

function ResourceThumb({
  image,
  alt,
  gradientClass,
  Icon,
}: {
  image?: string;
  alt: string;
  gradientClass: string;
  Icon: ComponentType<{ className?: string }>;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(image) && !failed;

  if (showImg) {
    return (
      <div className="relative h-[4.25rem] w-[4.25rem] shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg shadow-black/20">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradientClass} shadow-inner ring-1 ring-white/10`}
      aria-hidden
    >
      <Icon className="h-7 w-7 text-white/90 drop-shadow-sm" />
      <span className="sr-only">{alt}</span>
    </div>
  );
}

function readLinkKey(link: ReadLink) {
  return link.kind === "internal" ? link.to : link.href;
}

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.04 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

function SectionHeader({
  Icon,
  label,
  accent,
}: {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  accent: "emerald" | "sky" | "violet";
}) {
  const iconWrap = {
    emerald: "bg-emerald-400/15 text-emerald-200 ring-emerald-400/25",
    sky: "bg-sky-500/20 text-sky-200 ring-sky-400/25",
    violet: "bg-violet-500/20 text-violet-200 ring-violet-400/25",
  }[accent];

  const line = {
    emerald: "from-emerald-400/40",
    sky: "from-sky-400/40",
    violet: "from-violet-400/40",
  }[accent];

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${iconWrap}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/90">
        {label}
      </h2>
      <div
        className={`h-px min-w-[2rem] flex-1 bg-gradient-to-r ${line} to-transparent`}
      />
    </div>
  );
}

const cardClass =
  "group glass-card flex flex-row items-center gap-3.5 rounded-2xl p-3.5 pr-3 transition-all duration-200 hover:-translate-y-0.5 hover:ring-1 hover:ring-white/10 active:scale-[0.99]";

function ReadCard({ link, index }: { link: ReadLink; index: number }) {
  const Icon = link.kind === "internal" ? BookOpen : Globe;
  const image = "image" in link ? link.image : undefined;

  const inner = (
    <>
      <ResourceThumb
        image={image}
        alt={link.title}
        gradientClass={gradientAt(index)}
        Icon={Icon}
      />
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-medium leading-snug text-foreground">
          {link.title}
        </p>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {link.description}
        </p>
        {link.kind === "external" && (
          <p className="flex items-center gap-1 pt-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300/85">
            External
            <ExternalLink className="h-3 w-3" />
          </p>
        )}
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground/50" />
    </>
  );

  if (link.kind === "internal") {
    return (
      <Link to={link.to} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      {inner}
    </a>
  );
}

function ListenCard({ link, index }: { link: ListenLink; index: number }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      <ResourceThumb
        image={link.image}
        alt={link.title}
        gradientClass={gradientAt(index + 2)}
        Icon={Headphones}
      />
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-medium leading-snug text-foreground">
          {link.title}
        </p>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {link.description}
        </p>
        <p className="flex items-center gap-1 pt-1 text-[10px] font-medium uppercase tracking-wider text-sky-300/85">
          Listen
          <ExternalLink className="h-3 w-3" />
        </p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground/50" />
    </a>
  );
}

function followPlatformIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes("instagram")) return Instagram;
  if (p.includes("youtube")) return Youtube;
  return AtSign;
}

function FollowCard({ link, index }: { link: FollowLink; index: number }) {
  const PlatformIcon = followPlatformIcon(link.platform);

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      <ResourceThumb
        image={link.image}
        alt={link.title}
        gradientClass={gradientAt(index + 4)}
        Icon={PlatformIcon}
      />
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300/90">
          {link.platform}
        </p>
        <p className="text-sm font-medium leading-snug text-foreground">
          {link.title}
        </p>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {link.description}
        </p>
        <p className="flex items-center gap-1 pt-1 text-[10px] font-medium uppercase tracking-wider text-violet-300/85">
          Profile
          <ExternalLink className="h-3 w-3" />
        </p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground/50" />
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <div className="bg-app-gradient min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto max-w-lg px-4 pb-14 pt-5">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-card/40 px-5 py-6 shadow-[0_24px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute -left-16 -top-20 h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/30 to-sky-500/25 ring-1 ring-white/15">
              <Library className="h-6 w-6 text-emerald-100" />
            </div>
            <div className="min-w-0 space-y-2">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                Resources
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Read, listen, and follow at your own pace. Links that leave
                Overcome open in a new tab; we don&apos;t control third-party
                sites.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-10">
          <section className="space-y-4">
            <SectionHeader Icon={BookOpen} label="Read" accent="emerald" />
            <motion.div
              variants={listContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-3"
            >
              {readLinks.map((link, i) => (
                <motion.div key={readLinkKey(link)} variants={listItem}>
                  <ReadCard link={link} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section className="space-y-4">
            <SectionHeader Icon={Headphones} label="Listen" accent="sky" />
            {listenLinks.length > 0 ? (
              <motion.div
                variants={listContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-3"
              >
                {listenLinks.map((link, i) => (
                  <motion.div key={link.href} variants={listItem}>
                    <ListenCard link={link} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="rounded-2xl border border-border/60 bg-card/30 px-4 py-4 text-xs text-muted-foreground backdrop-blur-sm">
                Podcast and audio picks will appear here once they&apos;re added
                to the project.
              </p>
            )}
          </section>

          <section className="space-y-4">
            <SectionHeader Icon={AtSign} label="Follow" accent="violet" />
            {followLinks.length > 0 ? (
              <motion.div
                variants={listContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-3"
              >
                {followLinks.map((link, i) => (
                  <motion.div
                    key={`${link.platform}-${link.href}`}
                    variants={listItem}
                  >
                    <FollowCard link={link} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="rounded-2xl border border-border/60 bg-card/30 px-4 py-4 text-xs text-muted-foreground backdrop-blur-sm">
                Social and creator accounts will appear here once they&apos;re
                added to the project.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
