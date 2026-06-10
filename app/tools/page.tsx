import type { Metadata } from "next";
import ToolsPageContent from "@/components/tools/tools-page-content";

export const metadata: Metadata = {
  title: "Property Tools | Yeti Homes Estate",
  description:
    "Practical real estate calculators for Nepali property decisions. Estimate upfront cash costs and convert land units across hill, Terai, and metric systems.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/tools",
  },
  openGraph: {
    title: "Property Tools | Yeti Homes Estate",
    description:
      "Practical real estate calculators for Nepali property decisions. Estimate upfront cash costs and convert land units.",
    url: "https://www.yetihomesestate.com.np/tools",
    siteName: "Yeti Homes Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Tools | Yeti Homes Estate",
    description:
      "Practical real estate calculators for Nepali property decisions.",
  },
};

export default function ToolsPage() {
  return <ToolsPageContent />;
}
