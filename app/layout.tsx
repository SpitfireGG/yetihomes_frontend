import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/landing/header";
import WhatsAppWidget from "@/components/shared/whatsapp-widget";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
  fallback: ["sans-serif"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-label-family",
  display: "swap",
  fallback: ["sans-serif"],
});

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
    icon: "/Yeti-Logo-02.svg",
    shortcut: "/Yeti-Logo-02.svg",
    apple: "/Yeti-Logo-02.svg",
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
    <html
      lang="en"
      className={`${manrope.variable} ${plusJakartaSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-body">
        <Navbar />
        <main>{children}</main>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
