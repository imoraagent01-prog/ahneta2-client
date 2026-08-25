import { OnboardingWizard } from "../components/onboarding/onboarding-wizard";

export const metadata = {
  title: "Start uw traject | Ahneta Advies",
  alternates: {
    canonical: "/start",
  },
  openGraph: {
    title: "Start uw traject | Ahneta Advies",
    url: "/start",
  },
  twitter: {
    title: "Start uw traject | Ahneta Advies",
  },
};

export default function StartPage() {
  return (
    <main className="block grow shrink-0">
      <OnboardingWizard />
    </main>
  );
}
