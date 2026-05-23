export type ToolKey = "estimate-your-upfront-cash" | "land-unit-converter";

export type ToolDefinition = {
  key: ToolKey;
  title: string;
  description: string;
  href: string;
  highlights: string[];
};

export const toolCatalog: ToolDefinition[] = [
  {
    key: "estimate-your-upfront-cash",
    title: "Estimate Your Upfront Cash",
    description:
      "Model token deposit, registration reference, and advisory fees before you commit to a property deal.",
    href: "/estimate-your-upfront-cash",
    highlights: [
      "Earnest money (Baina)",
      "Registration guide",
      "Settlement timeline",
    ],
  },
  {
    key: "land-unit-converter",
    title: "Land Unit Converter",
    description:
      "Convert hill, Terai, and metric land units instantly with synchronized live values across every field.",
    href: "/land-unit-converter",
    highlights: [
      "Ropani to Kattha",
      "Sq.Feet to Sq.Meter",
      "Live two-way input",
    ],
  },
];
