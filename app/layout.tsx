import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/landing/header";
import WhatsAppWidget from "@/components/shared/whatsapp-widget";

const siteUrl = "https://yetihomes.com";

export const metadata: Metadata = {
  title: {
    default: "YetiHomes | Premium Real Estate in Nepal",
    template: "%s | YetiHomes",
  },
  description:
    "Discover curated homes, apartments, and land for sale in Nepal. YetiHomes offers editorial real estate listings with expert guidance for discerning buyers.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "YetiHomes",
    title: "YetiHomes | Premium Real Estate in Nepal",
    description:
      "Discover curated homes, apartments, and land for sale in Nepal. YetiHomes offers editorial real estate listings with expert guidance for discerning buyers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YetiHomes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YetiHomes | Premium Real Estate in Nepal",
    description:
      "Discover curated homes, apartments, and land for sale in Nepal.",
  },
  icons: {
    icon: "/Yeti-Logo-01.svg",
    shortcut: "/Yeti-Logo-01.svg",
    apple: "/Yeti-Logo-01.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full font-body">
        <Navbar />
        <main>{children}</main>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
