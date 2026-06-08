import ToolPageShell from "@/components/tools/tool-page-shell";
import LandUnitConverter from "@/components/tools/land-unit-converter";

export const metadata = {
  title: "Land Unit Converter | Yeti Homes Estate",
  description:
    "Convert Ropani, Aana, Paisa, Daam, Bigha, Kattha, Dhur, square feet, and square meter instantly.",
};

export default function LandUnitConverterPage() {
  return (
    <ToolPageShell
      eyebrow="Land Measurement Tool"
      title="Land Unit Converter"
      description="Switch between hill, Terai, and standard area systems in real time. Enter a value once and the remaining Nepali land units update automatically."
      stats={[
        {
          label: "Hill System",
          value: "4 Units",
          detail: "Ropani, Aana, Paisa, and Daam stay linked for valley and hill properties.",
        },
        {
          label: "Terai System",
          value: "3 Units",
          detail: "Bigha, Kattha, and Dhur convert directly for southern district transactions.",
        },
        {
          label: "Standard Area",
          value: "2 Units",
          detail: "Square feet and square meter remain available for drawings and formal reports.",
        },
      ]}
    >
      <LandUnitConverter />
    </ToolPageShell>
  );
}
