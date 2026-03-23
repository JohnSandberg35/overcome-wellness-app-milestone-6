import { useEffect, useId, useRef } from "react";
import type { QuestionId } from "../types";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { QuestionBadge } from "../types";
import { QUESTION_DEFS } from "../content/questions";

const BADGE_COPY: Record<QuestionBadge, string> = {
  best: "Best option",
  moderate: "Balanced",
  limited: "Limited option",
  stronger: "Stronger protection",
};

export type QuestionOptionView = {
  value: string;
  label: string;
  description?: string;
  badge?: QuestionBadge;
};

type QuestionStepProps = {
  questionId: QuestionId;
  options: QuestionOptionView[];
  value: string | undefined;
  onSelect: (value: string) => void;
};

/**
 * Single decision step: accessible radio cards driven by `content/questions.ts`.
 */
export function QuestionStep({ questionId, options, value, onSelect }: QuestionStepProps) {
  const def = QUESTION_DEFS[questionId];
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [questionId]);

  return (
    <motion.div
      key={questionId}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-5"
    >
      <div>
        <h2
          id={headingId}
          ref={headingRef}
          tabIndex={-1}
          className="text-balance text-center text-xl font-bold text-foreground outline-none"
          aria-live="polite"
        >
          {def.prompt}
        </h2>
        {def.hint ? (
          <p className="mt-2 text-center text-sm text-muted-foreground">{def.hint}</p>
        ) : null}
      </div>

      <RadioGroup
        className="flex flex-col gap-3"
        value={value}
        onValueChange={onSelect}
        aria-labelledby={headingId}
        aria-label={def.ariaLabel}
      >
        {options.map((opt) => (
          <div key={opt.value}>
            <Label
              htmlFor={`${questionId}-${opt.value}`}
              className={cn(
                "flex cursor-pointer flex-col gap-2 rounded-2xl border border-transparent bg-card/80 p-4 text-left shadow-sm transition-all",
                "hover:border-emerald-500/30 hover:shadow-md",
                value === opt.value && "border-emerald-400/50 bg-emerald-400/10 ring-1 ring-emerald-400/30",
              )}
            >
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  id={`${questionId}-${opt.value}`}
                  value={opt.value}
                  className="mt-1"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                    {opt.badge ? (
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-medium uppercase tracking-wide"
                      >
                        {BADGE_COPY[opt.badge]}
                      </Badge>
                    ) : null}
                  </div>
                  {opt.description ? (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {opt.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
}
