import { ArticleLayout } from "@/components/ArticleLayout";
import { Leaf } from "lucide-react";

export default function ScienceOfRecoveryPage() {
  return (
    <ArticleLayout
      title="The Science of Recovery"
      subtitle="How neuroplasticity supports lasting change."
      icon={Leaf}
      accentColor="bg-sage-light text-sage-dark"
    >
      <div className="space-y-6 text-sm leading-relaxed">
        <p className="text-muted-foreground">
          Recovery is not simply a matter of willpower. Modern addiction science describes recovery as a process of change in which people improve their health and wellness, live more self-directed lives, and work toward their full potential.
        </p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            The Brain Can Change
          </h2>
          <p className="text-foreground">One reason recovery is possible is neuroplasticity, the brain’s ability to change through experience. In addiction, repeated substance use can strengthen learned drug-related behaviors and weaken healthier forms of responding, but neuroscience literature also shows that this process is not necessarily permanent. Reviews in major journals describe addiction as involving changes in brain circuitry linked to learning, motivation, and habit, while also noting evidence that brain functioning can improve during abstinence and recovery. That means recovery is not just about stopping a behavior; it is about helping the brain build and reinforce new patterns over time.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Recovery Works Best With Evidence-Based Support
          </h2>
          <p className="text-foreground">Science also shows that recovery is strengthened by structured, evidence-based support. NIDA reports that substance use disorders are treatable and that behavioral therapies such as cognitive behavioral therapy can help people recognize triggers, manage stressful thoughts and emotions, and build healthier responses when cues and cravings appear. For some disorders, medications are also an important part of treatment. For example, NIDA notes that opioid use disorder can be treated with FDA-approved medications such as methadone, buprenorphine, and naltrexone, which help reduce cravings and support stability. Together, these findings show that recovery is most effective when people have practical tools, not just good intentions.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Recovery Is Bigger Than Symptom Reduction
          </h2>
          <p className="text-foreground">Highly credible public-health sources describe recovery as broader than simply avoiding relapse. SAMHSA defines recovery as an ongoing process supported by health, home, purpose, and community, and emphasizes that recovery can include clinical care, peer support, family support, faith-based pathways, and self-care. In other words, the science of recovery points toward whole-person healing. As people gain stability, strengthen relationships, rebuild routines, and develop meaning and connection, recovery becomes more sustainable because it is supported by everyday life rather than by crisis management alone.</p>
        </section>

      </div>
    </ArticleLayout>
  );
}
