"use client";

// Source: adapted from clients/ahneta-client/website/components/onboarding/step-type.tsx

import { Building2, Users, type LucideIcon } from "lucide-react";
import type { Audience } from "./types";

type StepTypeProps = {
  value: Audience | null;
  onSelect: (audience: Audience) => void;
};

const OPTIONS: { value: Audience; title: string; description: string; icon: LucideIcon }[] = [
  {
    value: "bedrijven",
    title: "Voor mijn bedrijf",
    description: "MKB, eenmanszaak, V.O.F. of B.V. Van ondernemersplan tot complete administratie.",
    icon: Building2,
  },
  {
    value: "particulieren",
    title: "Voor mezelf, als particulier",
    description: "Aangifte inkomstenbelasting, vermogen, schenking of erfenis.",
    icon: Users,
  },
];

export function StepType({ value, onSelect }: StepTypeProps) {
  return (
    <div>
      <h1 className="[font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] text-2xl font-bold text-foreground sm:text-3xl">
        Waar kunnen wij u mee helpen?
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-color-001">
        Zo stemmen wij onze vragen en het juiste dienstenpakket af op uw situatie.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={active}
              className={`flex flex-col items-start gap-4 rounded-2xl border p-6 text-left transition-colors cursor-pointer ${
                active ? "border-accent bg-accent/5" : "border-color-008 bg-background hover:border-accent/40"
              }`}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-accent text-background" : "bg-border text-accent"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-base font-medium text-foreground">{option.title}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-color-001">
                  {option.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
