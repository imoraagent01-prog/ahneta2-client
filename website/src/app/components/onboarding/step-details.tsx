"use client";

// Source: adapted from clients/ahneta-client/website/components/onboarding/step-details.tsx

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  BOOKKEEPING_OPTIONS,
  SITUATION_OPTIONS,
  URGENCY_OPTIONS,
  type Audience,
  type WizardOption,
} from "./types";

type StepDetailsProps = {
  audience: Audience;
  situation: string;
  urgency: string;
  bookkeeping: string;
  onChange: (patch: { situation?: string; urgency?: string; bookkeeping?: string }) => void;
  onBack: () => void;
  onNext: () => void;
};

function OptionRow({
  options,
  value,
  onSelect,
}: {
  options: WizardOption[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-2.5">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            aria-pressed={active}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors cursor-pointer ${
              active
                ? "border-accent bg-accent/5 text-foreground"
                : "border-color-008 text-color-001 hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function StepDetails({
  audience,
  situation,
  urgency,
  bookkeeping,
  onChange,
  onBack,
  onNext,
}: StepDetailsProps) {
  const canNext = Boolean(situation) && Boolean(urgency) && (audience === "particulieren" || Boolean(bookkeeping));

  return (
    <div>
      <h1 className="[font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] text-2xl font-bold text-foreground sm:text-3xl">
        Nog {audience === "bedrijven" ? "drie" : "twee"} korte vragen
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-color-001">
        Zo kunnen wij ons alvast voorbereiden op het gesprek.
      </p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Wat is uw situatie?</p>
          <OptionRow options={SITUATION_OPTIONS[audience]} value={situation} onSelect={(v) => onChange({ situation: v })} />
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Hoe snel heeft u hulp nodig?</p>
          <OptionRow options={URGENCY_OPTIONS} value={urgency} onSelect={(v) => onChange({ urgency: v })} />
        </div>

        {audience === "bedrijven" && (
          <div>
            <p className="mb-3 text-sm font-medium text-foreground">Hoe is uw boekhouding nu geregeld?</p>
            <OptionRow options={BOOKKEEPING_OPTIONS} value={bookkeeping} onSelect={(v) => onChange({ bookkeeping: v })} />
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-color-001 transition-colors hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          Volgende
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
