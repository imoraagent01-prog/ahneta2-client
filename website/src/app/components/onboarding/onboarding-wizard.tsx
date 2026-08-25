"use client";

// Source: adapted from clients/ahneta-client/website/components/onboarding/onboarding-wizard.tsx

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Check } from "lucide-react";
import { StepType } from "./step-type";
import { StepService } from "./step-service";
import { StepDetails } from "./step-details";
import { StepSummary } from "./step-summary";
import { STEP_LABELS, initialWizardData, type WizardData } from "./types";

const TOTAL_STEPS = STEP_LABELS.length;

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initialWizardData);
  const [submitted, setSubmitted] = useState(false);

  const direction = useRef(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const update = (patch: Partial<WizardData>) => setData((d) => ({ ...d, ...patch }));

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_STEPS - 1, next));
    direction.current = clamped >= step ? 1 : -1;
    setStep(clamped);
  };

  useEffect(() => {
    if (!stageRef.current) return;
    gsap.fromTo(
      stageRef.current,
      { opacity: 0, x: 28 * direction.current },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
    );
  }, [step]);

  useEffect(() => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, {
      width: `${(step / (TOTAL_STEPS - 1)) * 100}%`,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [step]);

  useEffect(() => {
    if (!submitted || !introRef.current) return;
    gsap.fromTo(introRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  }, [submitted]);

  if (submitted) {
    return (
      <div ref={introRef} className="mx-auto max-w-xl px-4 py-24 text-center md:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-6 [font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] text-3xl font-bold text-foreground sm:text-4xl">
          Bedankt{data.contact.name ? `, ${data.contact.name.split(" ")[0]}` : ""}.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-color-001">
          Uw aanvraag is bij ons binnengekomen. Een van onze adviseurs neemt binnen één werkdag
          contact met u op om uw situatie te bespreken. Liever nu al iemand spreken? Bel ons op{" "}
          <a href="tel:+31334611447" className="text-accent underline underline-offset-2">
            +31 (0) 33 46 11 447
          </a>
          .
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent/90"
        >
          Terug naar de homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 md:px-8 md:py-20">
      <div className="mb-10">
        <div className="relative h-1.5 overflow-hidden rounded-full bg-border">
          <div ref={fillRef} className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: "0%" }} />
        </div>
        <ol className="mt-4 flex items-start justify-between gap-2">
          {STEP_LABELS.map((label, i) => (
            <li key={label} className="flex flex-1 flex-col items-center gap-1.5 text-center">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-medium transition-colors ${
                  i < step
                    ? "border-accent bg-accent text-background"
                    : i === step
                      ? "border-accent text-accent"
                      : "border-color-008 text-color-001/60"
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={`hidden text-xs font-medium sm:block ${i <= step ? "text-accent" : "text-color-001/60"}`}>
                {label}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-color-001 sm:hidden">
          Stap {step + 1} van {TOTAL_STEPS}: {STEP_LABELS[step]}
        </p>
      </div>

      <div ref={stageRef}>
        {step === 0 && (
          <StepType
            value={data.audience}
            onSelect={(audience) => {
              update({ audience, serviceSlugs: [], situation: "", bookkeeping: "" });
              goTo(1);
            }}
          />
        )}

        {step === 1 && data.audience && (
          <StepService
            audience={data.audience}
            selected={data.serviceSlugs}
            onChange={(serviceSlugs) => update({ serviceSlugs })}
            onBack={() => goTo(0)}
            onNext={() => goTo(2)}
          />
        )}

        {step === 2 && data.audience && (
          <StepDetails
            audience={data.audience}
            situation={data.situation}
            urgency={data.urgency}
            bookkeeping={data.bookkeeping}
            onChange={update}
            onBack={() => goTo(1)}
            onNext={() => goTo(3)}
          />
        )}

        {step === 3 && <StepSummary data={data} onChange={update} onBack={() => goTo(2)} onSubmitted={() => setSubmitted(true)} />}
      </div>
    </div>
  );
}
