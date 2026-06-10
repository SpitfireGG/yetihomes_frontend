import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact Us | Yeti Homes Estate",
  description:
    "Contact Yeti Homes Estate for premium real estate in Nepal. Schedule a private consultation for property acquisition, valuation, or investment opportunities.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/contact",
  },
  openGraph: {
    title: "Contact Us | Yeti Homes Estate",
    description:
      "Contact Yeti Homes Estate for premium real estate in Nepal. Schedule a private consultation for property acquisition, valuation, or investment opportunities.",
    url: "https://www.yetihomesestate.com.np/contact",
    siteName: "Yeti Homes Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Yeti Homes Estate",
    description:
      "Contact Yeti Homes Estate for premium real estate in Nepal.",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
