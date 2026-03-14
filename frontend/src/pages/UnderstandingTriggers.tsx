import { ArticleLayout } from "@/components/ArticleLayout";
import { Heart } from "lucide-react";

export default function UnderstandingTriggersPage() {
  return (
    <ArticleLayout
      title="Understanding Triggers"
      subtitle="Learn to identify and manage urges safely."
      icon={Heart}
      accentColor="bg-lavender-light text-lavender"
    >
      <div className="space-y-6 text-sm leading-relaxed">
        <p className="text-muted-foreground">
          Triggers are not just random moments of weakness. They are learned associations. Over time, the brain starts linking certain places, emotions, people, memories, and routines with relief, reward, or escape. Understanding that can reduce shame. It does not mean you are broken. It means your brain learned a pattern, and recovery is the process of teaching it something new.
        </p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Why Triggers Feel So Strong
          </h2>
          <p className="text-foreground">One reason triggers feel intense is that they do not only live in your thoughts. They involve attention, emotion, memory, reward, and self-control all at once. In addiction research, this is often described as cue reactivity: when the brain reacts to a reminder of past use with heightened attention, emotion, and craving. In plain language, the brain is not just noticing the cue. It is preparing for the old behavior. That is why a trigger can feel surprisingly physical. Your body may get restless, your thoughts may speed up, and your mind may start bargaining before you have fully realized what is happening. The experience can feel immediate, but underneath it is a learned brain-and-body response that has been strengthened through repetition.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Triggers Are Bigger Than Places and Objects
          </h2>
          <p className="text-foreground">Many people first think of triggers as obvious external things: a certain app, a neighborhood, a song, a person, or a time of day. Those matter, but internal triggers are often just as powerful. Stress, shame, boredom, anger, exhaustion, loneliness, and even success can become risk states if the brain has learned to pair them with using or acting out. This is part of what makes triggers feel so complex. Sometimes the real trigger is not the object in front of you, but the emotional state underneath it. Research on relapse vulnerability has consistently found that stress plays a major role in craving and return to use, and treatment literature emphasizes helping people recognize both triggers and coping strategies because motivation and risk can change from moment to moment.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            The Goal Is Not to Avoid Every Trigger
          </h2>
          <p className="text-foreground">Recovery does not usually mean building a life so controlled that nothing difficult ever touches you. The deeper goal is learning how to notice triggers earlier, understand what they are doing, and respond differently before the old pattern takes over. That may involve changing environments for a season, but it also involves building new responses: pausing, reaching out, naming the emotion, moving your body, stepping away from the cue, or using a recovery routine before the craving gets louder. Over time, treatment and repeated practice can weaken the old connection and strengthen a new one. The trigger may still show up, but it does not have to run the story anymore. That is one of the most hopeful parts of recovery science: learned patterns can be changed, and support, structure, and repetition matter.</p>
        </section>
      </div>
    </ArticleLayout>
  );
}
