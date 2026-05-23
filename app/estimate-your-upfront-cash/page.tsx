import ToolPageShell from "@/components/tools/tool-page-shell";
import UpfrontCashCalculator from "@/components/tools/upfront-cash-calculator";

export const metadata = {
  title: "Estimate Your Upfront Cash | YetiHomes",
  description:
    "Calculate token deposit, registration reference, and advisory fees before you move ahead with a Nepal property deal.",
};

export default function EstimateYourUpfrontCashPage() {
  return (
    <ToolPageShell
      eyebrow="Acquisition Calculator"
      title="Estimate Your Upfront Cash"
      description="Pressure-test your upfront property commitment before negotiations start. Adjust the property price, earnest percentage, advisory fees, and settlement speed in one place."
      stats={[
        {
          label: "Earnest Range",
          value: "5% - 25%",
          detail: "Adjust token deposit expectations for different negotiation styles.",
        },
        {
          label: "Registration Guide",
          value: "5%",
          detail: "Uses a planning reference for stamp duty and registration exposure.",
        },
        {
          label: "Settlement Modes",
          value: "4",
          detail: "Compare standard and express closing timelines without leaving the page.",
        },
      ]}
    >
      <UpfrontCashCalculator />
    </ToolPageShell>
  );
}
