import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/landing/header";
import WhatsAppWidget from "@/components/shared/whatsapp-widget";

export const metadata: Metadata = {
  title: "YetiHomes | Editorial Real Estate",
  description:
    "A luxury real estate landing page built with Next.js and Tailwind, focused on curated architectural homes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-body">
        <Navbar />
        <main>{children}</main>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
