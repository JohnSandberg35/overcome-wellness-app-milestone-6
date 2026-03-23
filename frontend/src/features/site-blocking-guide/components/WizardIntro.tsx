import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

type WizardIntroProps = {
  onStart: () => void;
};

/**
 * Explains that Overcome does not change device settings — the user does, on-device.
 */
export function WizardIntro({ onStart }: WizardIntroProps) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-6"
    >
      <div className="glass-card rounded-3xl px-5 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
          <Shield className="h-6 w-6" aria-hidden />
        </div>
        <h2 className="text-balance text-xl font-semibold text-foreground">
          Site blocking setup guide
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Answer a few questions and we&apos;ll suggest a setup path for{" "}
          <span className="text-foreground">your</span> phone or computer. This
          app never blocks websites for you — you&apos;ll apply settings directly
          on your device where you stay in control.
        </p>
        <ul className="mt-4 list-inside list-disc space-y-1.5 text-xs text-muted-foreground">
          <li>Takes about 2–4 minutes</li>
          <li>You can go back or restart anytime</li>
          <li>Nothing is saved to an account in this version</li>
        </ul>
      </div>

      <Button
        type="button"
        className="h-12 w-full rounded-full bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
        onClick={onStart}
      >
        Start the guide
      </Button>
    </motion.div>
  );
}
