"use client";

import { Icons } from "@/components/ui/icons";
import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/landing/footer";

type ToolStat = {
  label: string;
  value: string;
  detail: string;
};

export default function ToolPageShell({
  eyebrow,
  title,
  description,
  stats,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stats: ToolStat[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <section className="border-b border-outline-variant/30 bg-surface">
        <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12 lg:py-14">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icons.arrowLeft size={16} strokeWidth={2} />
            All Tools
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)] lg:items-end">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-primary/15 bg-primary-container px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {eyebrow}
              </span>
              <h1 className="mt-5 font-headline text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
                {description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-outline-variant/70 bg-surface-container-lowest px-5 py-5"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-outline">
                    {stat.label}
                  </p>
                  <p className="mt-3 font-headline text-2xl font-semibold text-on-surface">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12 lg:py-14">
          {children}
        </div>
      </section>

      <Footer />
    </div>
  );
}
