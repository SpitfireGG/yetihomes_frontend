"use client";

import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import Footer from "@/components/landing/footer";
import ToolGlyph from "@/components/tools/tool-glyph";
import { toolCatalog } from "@/data/tools";
import { useEffect } from "react";

export default function ToolsPage() {
  useEffect(() => {
    document.title = "Property Tools | YetiHomes";
  }, []);
  const toolStats = [
    {
      label: "Live Tools",
      value: toolCatalog.length,
      description: "Dedicated tools with real-time calculations and route-based access.",
      icon: "Wrench",
    },
    {
      label: "Coverage",
      value: "Hill + Terai",
      description: "Supports traditional Nepali land units and standard area measurements.",
      icon: "MapPin",
    },
    {
      label: "Workflow",
      value: "Instant",
      description: "Every value updates in place so you can compare scenarios quickly.",
      icon: "Zap",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <section className="border-b border-outline-variant/30 bg-surface">
        <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12 lg:py-14">
          <span className="inline-flex rounded-full border border-primary/15 bg-primary-container px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Property Tools
          </span>

          <div className="mt-8 space-y-12">
            <div className="max-w-3xl">
              <h1 className="font-headline text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
                Practical calculators for Nepali real estate decisions.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
                Use YetiHomes tools to estimate cash exposure before a deal and
                translate land measurements across hill, Terai, and metric
                systems without leaving the site.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-16 gap-y-12">
              {toolStats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="flex flex-col relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-outline-variant hover:before:bg-primary transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                      {stat.label}
                    </p>
                  </div>
                  <p className="font-headline text-3xl font-semibold text-on-surface">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-12 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {toolCatalog.map((tool) => (
              <Link
                key={tool.key}
                href={tool.href}
                className="group flex h-full flex-col rounded-[28px] border border-outline-variant bg-surface-container-lowest p-8 shadow-xl shadow-brand-navy-900/8 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/25"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl border border-outline-variant/70 bg-surface px-3 py-3 text-on-surface-variant transition-colors group-hover:border-primary/20 group-hover:bg-primary-container group-hover:text-primary">
                    <ToolGlyph toolKey={tool.key} size={22} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-outline">
                    Tool Route
                  </span>
                </div>

                <h2 className="mt-8 font-headline text-3xl font-semibold tracking-tight text-on-surface">
                  {tool.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-on-surface-variant sm:text-base">
                  {tool.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {tool.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-outline-variant bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-10">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-on-surface transition-colors group-hover:text-primary">
                    Open tool
                    <Icons.arrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
