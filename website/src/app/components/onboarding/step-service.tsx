"use client";

// Source: adapted from clients/ahneta-client/website/components/onboarding/step-service.tsx

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SERVICES, type Audience } from "./types";

type StepServiceProps = {
  audience: Audience;
  selected: string[];
  onChange: (slugs: string[]) => void;
  onBack: () => void;
  onNext: () => void;
};

export function StepService({ audience, selected, onChange, onBack, onNext }: StepServiceProps) {
  const options = SERVICES.filter((service) => service.category === audience);

  const toggle = (slug: string) => {
    onChange(selected.includes(slug) ? selected.filter((s) => s !== slug) : [...selected, slug]);
  };

  return (
    <div>
      <h1 className="[font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] text-2xl font-bold text-foreground sm:text-3xl">
        Waar heeft u hulp bij nodig?
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-color-001">
        Kies één of meerdere onderwerpen. Twijfelt u? Kies gerust wat het dichtst bij uw vraag komt.
      </p>

      <ul className="mt-8 grid gap-3">
        {options.map((service) => {
          const active = selected.includes(service.slug);
          return (
            <li key={service.slug}>
              <button
                type="button"
                onClick={() => toggle(service.slug)}
                aria-pressed={active}
                className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-5 text-left transition-colors cursor-pointer ${
                  active ? "border-accent bg-accent/5" : "border-color-008 bg-background hover:border-accent/40"
                }`}
              >
                <span>
                  <span className="block text-sm font-medium text-foreground">{service.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-color-001">
                    {service.summary}
                  </span>
                </span>
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    active ? "border-accent bg-accent text-background" : "border-color-008 text-transparent"
                  }`}
                >
                  <Check className="h-4 w-4" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

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
          disabled={selected.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          Volgende
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
