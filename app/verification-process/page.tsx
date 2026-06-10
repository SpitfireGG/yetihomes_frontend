import type { Metadata } from "next";
import VerificationProcessContent from "@/components/verification/verification-process-content";

export const metadata: Metadata = {
  title: "Verification Process | Yeti Homes Estate",
  description:
    "Every listing on Yeti Homes Estate undergoes rigorous title authentication, legal encumbrance checks, municipal compliance audits, and third-party verification.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/verification-process",
  },
  openGraph: {
    title: "Verification Process | Yeti Homes Estate",
    description:
      "Every listing on Yeti Homes Estate undergoes rigorous title authentication, legal encumbrance checks, municipal compliance audits, and third-party verification.",
    url: "https://www.yetihomesestate.com.np/verification-process",
    siteName: "Yeti Homes Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verification Process | Yeti Homes Estate",
    description:
      "Yeti Homes Estate property verification process.",
  },
};

export default function VerificationProcessPage() {
  return <VerificationProcessContent />;
}
