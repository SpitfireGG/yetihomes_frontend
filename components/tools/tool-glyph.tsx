import { Icons } from "@/components/ui/icons";
import type { ToolKey } from "@/data/tools";

export default function ToolGlyph({
  toolKey,
  size = 18,
  className,
}: {
  toolKey: ToolKey;
  size?: number;
  className?: string;
}) {
  const Icon =
    toolKey === "land-unit-converter" ? Icons.arrowLeftRight : Icons.pieChart;

  const IconComponent = Icon;
  return <IconComponent size={size} strokeWidth={2} className={className} />;
}
