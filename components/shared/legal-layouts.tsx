"use client";

import { Icons } from "@/components/ui/icons";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const sidebarLinks = [
  { name: "Terms of Service", path: "/legal/terms-conditions", icon: Icons.file },
  { name: "Privacy Policy", path: "/legal/privacy", icon: Icons.shield },
  { name: "Cookie Policy", path: "/legal/cookies", icon: Icons.cookie },
  { name: "Disclaimer", path: "/legal/disclaimer", icon: Icons.alertCircle },
];

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-surface-container-low border-b border-outline-variant/15">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-label text-[0.6rem] font-bold tracking-[0.25em] uppercase text-primary mb-5 block">
              Legal &amp; Compliance
            </span>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-on-surface leading-[1.08] max-w-3xl">
              {title}
            </h1>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-10 h-[2px] bg-primary/40 rounded-full" />
              <p className="font-label text-[0.6rem] font-bold tracking-[0.2em] uppercase text-on-surface-variant">
                Last updated {lastUpdated}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Sidebar */}
          <aside className="w-full lg:w-60 xl:w-72 shrink-0 relative">
            <div className="lg:sticky lg:top-28 bg-surface-container-lowest rounded-2xl border border-outline-variant/15 p-4 editorial-shadow">
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${
                        isActive
                          ? "bg-primary/8 text-primary"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-5 bg-primary rounded-r-full" />
                      )}
                      <Icon
                        size={17}
                        strokeWidth={1.5}
                        className={isActive ? "text-primary" : "text-outline"}
                      />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Document Content */}
          <motion.main
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 min-w-0"
          >
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/15 p-8 md:p-12 lg:p-16 editorial-shadow">
              <div className="prose-p:text-on-surface-variant prose-p:leading-[1.75] prose-p:text-base prose-p:mb-6 prose-headings:font-headline prose-headings:font-bold prose-headings:text-on-surface prose-headings:tracking-[-0.02em] prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:border-l-[3px] prose-h2:border-primary/40 prose-h2:pl-5 prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:border-l-[3px] prose-h3:border-primary/25 prose-h3:pl-5 prose-ul:my-6 prose-ul:space-y-3 prose-li:text-on-surface-variant prose-li:leading-relaxed prose-li:marker:text-primary/60 prose-a:text-primary prose-a:font-medium hover:prose-a:text-primary/80 prose-a:transition-colors prose-strong:text-on-surface prose-strong:font-semibold">
                {children}
              </div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
