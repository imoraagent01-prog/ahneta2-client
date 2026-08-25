"use client";

// Source: adapted from clients/ahneta-client/website/components/onboarding/step-summary.tsx.
// This site has no backend (static export, no /api routes), so submission is simulated
// locally instead of POSTing to a lead-capture API.

import { useState, type FormEvent } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import {
  BOOKKEEPING_OPTIONS,
  SERVICES,
  SITUATION_OPTIONS,
  URGENCY_OPTIONS,
  type WizardData,
  type WizardOption,
} from "./types";

type StepSummaryProps = {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
  onBack: () => void;
  onSubmitted: () => void;
};

function findLabel(options: WizardOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? "";
}

export function StepSummary({ data, onChange, onBack, onSubmitted }: StepSummaryProps) {
  const [submitting, setSubmitting] = useState(false);

  const selectedServices = SERVICES.filter((s) => data.serviceSlugs.includes(s.slug));
  const audienceLabel = data.audience === "bedrijven" ? "Bedrijf / onderneming" : "Particulier";
  const situationLabel = data.audience ? findLabel(SITUATION_OPTIONS[data.audience], data.situation) : "";
  const urgencyLabel = findLabel(URGENCY_OPTIONS, data.urgency);

  const canSubmit = data.contact.name.trim().length > 0 && data.contact.email.trim().length > 0;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    onSubmitted();
  }

  return (
    <div>
      <h1 className="[font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] text-2xl font-bold text-foreground sm:text-3xl">
        Bijna klaar
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-color-001">
        Laat uw gegevens achter, dan nemen wij binnen één werkdag contact met u op.
      </p>

      <div className="mt-8 rounded-2xl border border-color-008 bg-border/40 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-color-001">Uw aanvraag in het kort</p>
        <dl className="mt-3 grid gap-2 text-sm text-foreground">
          <div className="flex flex-wrap gap-x-2">
            <dt className="shrink-0 font-medium">Type klant:</dt>
            <dd className="text-color-001">{audienceLabel}</dd>
          </div>
          {selectedServices.length > 0 && (
            <div className="flex flex-wrap gap-x-2">
              <dt className="shrink-0 font-medium">Diensten:</dt>
              <dd className="text-color-001">{selectedServices.map((s) => s.title).join(", ")}</dd>
            </div>
          )}
          {situationLabel && (
            <div className="flex flex-wrap gap-x-2">
              <dt className="shrink-0 font-medium">Situatie:</dt>
              <dd className="text-color-001">{situationLabel}</dd>
            </div>
          )}
          {urgencyLabel && (
            <div className="flex flex-wrap gap-x-2">
              <dt className="shrink-0 font-medium">Urgentie:</dt>
              <dd className="text-color-001">{urgencyLabel}</dd>
            </div>
          )}
        </dl>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-3.5">
        {data.audience === "bedrijven" && (
          <input
            value={data.contact.company}
            onChange={(e) => onChange({ contact: { ...data.contact, company: e.target.value } })}
            placeholder="Bedrijfsnaam (optioneel)"
            className="rounded-xl border border-color-008 bg-background px-4 py-3 text-sm text-foreground placeholder:text-color-001/70 transition-colors focus:border-accent focus:outline-none"
          />
        )}
        <input
          required
          value={data.contact.name}
          onChange={(e) => onChange({ contact: { ...data.contact, name: e.target.value } })}
          placeholder="Uw naam"
          className="rounded-xl border border-color-008 bg-background px-4 py-3 text-sm text-foreground placeholder:text-color-001/70 transition-colors focus:border-accent focus:outline-none"
        />
        <input
          required
          type="email"
          value={data.contact.email}
          onChange={(e) => onChange({ contact: { ...data.contact, email: e.target.value } })}
          placeholder="E-mailadres"
          className="rounded-xl border border-color-008 bg-background px-4 py-3 text-sm text-foreground placeholder:text-color-001/70 transition-colors focus:border-accent focus:outline-none"
        />
        <input
          type="tel"
          value={data.contact.phone}
          onChange={(e) => onChange({ contact: { ...data.contact, phone: e.target.value } })}
          placeholder="Telefoonnummer (optioneel)"
          className="rounded-xl border border-color-008 bg-background px-4 py-3 text-sm text-foreground placeholder:text-color-001/70 transition-colors focus:border-accent focus:outline-none"
        />

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-color-001 transition-colors hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </button>
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            {submitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {submitting ? "Versturen…" : "Verstuur aanvraag"}
          </button>
        </div>
      </form>
    </div>
  );
}
