import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Search,
  ShieldCheck,
  Flame,
  RotateCcw,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Awareness",
    description:
      "Understand what is happening in your brain. Learn how dopamine loops form, why cravings feel so powerful, and what actually drives compulsive behavior — no shame, just science.",
    icon: Brain,
    iconBg: "bg-ocean-light",
    iconColor: "text-ocean",
    detail:
      "Your brain's reward system was built for survival — food, connection, achievement. Pornography delivers a dopamine spike far beyond what natural rewards provide, and over time your brain adapts by lowering its baseline sensitivity. That's why everyday life can start to feel flat. Understanding this mechanism is the first step because it reframes the problem: this isn't about being weak, it's about how your nervous system responded to an unusually powerful stimulus.",
    tips: [
      "Watch a short video or read an article on how dopamine and neuroplasticity work — even 10 minutes of understanding changes how you talk to yourself about urges.",
      "Start noticing when you feel a craving without acting on it. Just labeling it (\"that's a dopamine spike\") creates distance between you and the urge.",
      "Talk to one person you trust about what you're learning. Saying it out loud makes the science feel real and reduces shame.",
    ],
    links: [
      { label: "Your Brain on Porn — overview of the neuroscience", url: "https://www.yourbrainonporn.com/miscellaneous-resources/start-here-evolution-has-not-prepared-your-brain-for-todays-porn/" },
      { label: "TED Talk — The Great Porn Experiment", url: "https://www.youtube.com/watch?v=wSF82AwSDiU" },
    ],
  },
  {
    number: 2,
    title: "Identify Triggers",
    description:
      "Map your personal patterns. Pinpoint the specific situations, emotions, and environments that lead to urges so you can see them coming before they take over.",
    icon: Search,
    iconBg: "bg-sunrise-light",
    iconColor: "text-sunrise",
    detail:
      "Triggers fall into a few predictable categories: emotional states (stress, loneliness, boredom, anxiety), physical states (tiredness, hunger), environments (being alone at night, certain rooms), and digital cues (social media, specific apps). Most people have 2-3 dominant triggers that account for the majority of their relapses. Once you can name them, you stop being blindsided.",
    tips: [
      "Keep a simple trigger journal for one week — when an urge hits, write down what you were doing, feeling, and where you were. Patterns will emerge fast.",
      "Rank your triggers by strength. Focus your energy on the top two instead of trying to fight everything at once.",
      "Pay attention to the 'chain' before the urge. Usually there are 3-4 small decisions (picking up the phone, opening a browser, going to a private room) that lead up to it — the earlier in the chain you intervene, the easier it is.",
    ],
    links: [
      { label: "SAMHSA — Understanding triggers in recovery", url: "https://www.samhsa.gov/find-help/national-helpline" },
      { label: "Psychology Today — How to identify emotional triggers", url: "https://www.psychologytoday.com/us/basics/trigger" },
    ],
  },
  {
    number: 3,
    title: "Build Barriers",
    description:
      "Make the behavior harder to access. Set up practical friction — device filters, environment changes, accountability tools — that slow down the autopilot response.",
    icon: ShieldCheck,
    iconBg: "bg-sage-light",
    iconColor: "text-sage",
    detail:
      "Willpower is a limited resource — it runs out, especially when you're tired or stressed. Barriers work because they don't rely on willpower. They add friction between the urge and the behavior, giving your rational brain time to catch up. Even small barriers (moving your phone to another room at night, using a content filter, keeping your door open) can break the autopilot chain that leads to relapse.",
    tips: [
      "Install a content filter on your devices and have someone else set the password. Tools like Covenant Eyes, Bark, or built-in screen time controls all work.",
      "Change your environment for your top trigger scenario. If late nights alone are the problem, adjust your sleep routine or move your devices out of the bedroom.",
      "Set up an accountability check-in — even a weekly text to a friend asking \"how's your week going?\" adds a layer of social awareness that makes the behavior less automatic.",
    ],
    links: [
      { label: "Covenant Eyes — accountability and filtering software", url: "https://www.covenanteyes.com/" },
      { label: "Fight the New Drug — practical barrier strategies", url: "https://fightthenewdrug.org/how-to-fight-for-yourself/" },
    ],
  },
  {
    number: 4,
    title: "Streak Tracking",
    description:
      "Build momentum and make progress visible. Track your clean days, celebrate milestones, and use the data to see how far you've actually come.",
    icon: Flame,
    iconBg: "bg-lavender-light",
    iconColor: "text-lavender",
    detail:
      "Tracking works because it makes invisible progress visible. When you can see that you went 14 days clean versus your previous best of 5, that evidence builds genuine self-belief. The goal isn't perfection — it's trend. If your streaks are getting longer and your relapses are getting shorter, you are winning even if it doesn't feel like it yet.",
    tips: [
      "Use a simple counter app or even a paper calendar. Mark each clean day. The physical act of marking progress reinforces the habit.",
      "Set milestone rewards for yourself — not as bribes, but as acknowledgment. Day 7, day 14, day 30 all deserve recognition.",
      "If you break a streak, write down what happened and what you'll adjust, then reset without beating yourself up. Data, not drama.",
    ],
    links: [
      { label: "Fortify — recovery tracking and education app", url: "https://www.joinfortify.com/" },
      { label: "Atomic Habits — how tracking drives behavior change", url: "https://jamesclear.com/habit-tracker" },
    ],
  },
  {
    number: 5,
    title: "Reflect & Reset",
    description:
      "Evaluate what is working every 30 days. Review your triggers, adjust your barriers, and set new goals so your recovery keeps evolving with you.",
    icon: RotateCcw,
    iconBg: "bg-ocean-light",
    iconColor: "text-ocean",
    detail:
      "Recovery isn't a straight line — it's a series of adjustments. Every 30 days, take stock: Which triggers are still strong? Which barriers are working? What new situations came up that you weren't ready for? This isn't about grading yourself. It's about treating recovery like a project you're continuously improving, not a test you can pass or fail.",
    tips: [
      "Schedule a recurring 30-minute review on your calendar. Ask yourself three questions: What worked? What didn't? What will I change?",
      "Update your trigger list — some triggers fade as your brain rewires, and new ones may appear as your life circumstances change.",
      "If you've been struggling, consider adding a new tool rather than trying harder with the same ones. A therapist, a support group, or even a new barrier can shift things.",
    ],
    links: [
      { label: "Recovery Dharma — free peer support communities", url: "https://recoverydharma.org/" },
      { label: "BetterHelp — online therapy for addiction recovery", url: "https://www.betterhelp.com/" },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function RewireStepsPage() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggle = (num: number) =>
    setOpenStep((prev) => (prev === num ? null : num));

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-6 sm:pt-8 md:max-w-2xl lg:max-w-3xl">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        <motion.div variants={item} className="text-center">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
            The Rewire Program
          </h1>
          <p className="mt-2 text-xs text-muted-foreground text-balance sm:text-sm md:text-base">
            Five steps to understand, interrupt, and rebuild your patterns.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {steps.map((s) => {
            const isOpen = openStep === s.number;
            return (
              <motion.div key={s.number} variants={item}>
                <Card
                  className={`cursor-pointer transition-shadow ${isOpen ? "shadow-md" : "hover:shadow-md"}`}
                  onClick={() => toggle(s.number)}
                >
                  <CardContent className="pt-4 sm:pt-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${s.iconBg}`}
                      >
                        <s.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${s.iconColor}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                            Step {s.number}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm font-semibold text-foreground md:text-base">
                          {s.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {s.description}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 shrink-0"
                      >
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 border-t border-border pt-4 sm:mt-5 sm:pt-5">
                            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                              {s.detail}
                            </p>

                            <h4 className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-wider text-foreground sm:mt-5 sm:text-xs">
                              Practical tips
                            </h4>
                            <ul className="flex flex-col gap-2 sm:gap-3">
                              {s.tips.map((tip, i) => (
                                <li
                                  key={i}
                                  className="flex gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                                >
                                  <span className="mt-0.5 shrink-0 text-primary">
                                    {i + 1}.
                                  </span>
                                  {tip}
                                </li>
                              ))}
                            </ul>

                            <h4 className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-wider text-foreground sm:mt-5 sm:text-xs">
                              Helpful resources
                            </h4>
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                              {s.links.map((link, i) => (
                                <a
                                  key={i}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline sm:text-sm"
                                >
                                  <ExternalLink className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                                  {link.label}
                                </a>
                              ))}
                            </div>

                            <div className="mt-5 flex justify-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenStep(null);
                                }}
                                className="text-xs text-muted-foreground"
                              >
                                Collapse
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
