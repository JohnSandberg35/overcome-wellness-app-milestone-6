import { ArticleLayout } from "@/components/ArticleLayout";
import { Sunrise } from "lucide-react";

export default function BuildingNewHabitsPage() {
  return (
    <ArticleLayout
      title="Building New Habits"
      subtitle="Evidence-based strategies for daily progress."
      icon={Sunrise}
      accentColor="bg-sunrise-light text-sunrise"
    >
      <div className="space-y-6 text-sm leading-relaxed">
        <p className="text-muted-foreground">
          Most people try to change their lives by aiming for a huge burst of motivation. They wait for the perfect Monday, the perfect mood, or the perfect season of life. But lasting habits usually do not begin with a dramatic overhaul. They begin with something smaller: a repeatable choice, tied to a real moment in daily life.
        </p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Start Smaller Than Your Ego Wants
          </h2>
          <p className="text-foreground">One of the hardest truths about building habits is that your brain loves the idea of transformation more than the reality of repetition. We imagine becoming disciplined overnight, then get discouraged when the real work looks ordinary. But habits stick best when they are small enough to begin without friction. That is one reason James Clear emphasizes making habits obvious, attractive, easy, and satisfying, and why BJ Fogg’s behavior model teaches that behavior happens more reliably when motivation, ability, and a prompt meet at the same moment. The lesson is simple: do not build a habit around your best day. Build it around your busiest, messiest, most average one. A five-minute walk, one page of reading, or one written sentence may feel small, but small actions are often the doorway to consistency.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Let Your Environment Do Some of the Work
          </h2>
          <p className="text-foreground">Many people think habit change is a character issue, when often it is an environment issue. Good intentions lose power when the desired behavior is hard to start, easy to forget, or surrounded by competing cues. Clear’s writing on habit stacking and cues highlights that habits are easier to build when attached to something you already do, such as stretching after brushing your teeth or journaling after making your morning drink. Research reviews on habit psychology echo that repeated behaviors in stable contexts become more automatic over time. That means you do not always need more willpower; sometimes you need a better setup. Put the book where you sit. Lay out the shoes the night before. Keep the healthy option visible. The goal is to make the next right step feel natural instead of heroic.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Focus on Becoming, Not Just Achieving
          </h2>
          <p className="text-foreground">The most powerful habits are not just tasks on a checklist. They become evidence for the kind of person you are becoming. This is part of what makes habit change feel meaningful instead of mechanical. In the Atomic Habits framework, repeated action helps reinforce identity: every time you practice, you cast a vote for the person you want to be. Public-health and behavior-change guidance from NIH sources also reflects this longer view, describing change as a process that moves through preparation, action, and maintenance rather than a single burst of effort. That is why a missed day does not mean failure, and a slow start does not mean you are bad at habits. What matters most is returning. New habits are not built by proving yourself once. They are built by coming back often enough that the new pattern begins to feel like you.</p>
        </section>
      </div>
    </ArticleLayout>
  );
}
