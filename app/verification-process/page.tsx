"use client";

import { Icons } from "@/components/ui/icons";

import React from "react";
import { motion, type Variants } from "framer-motion";

const verificationSteps = [
  {
    icon: Icons.fileSignature,
    title: "Title Authentication",
    description:
      "Original Lal Purja (Title Deed) has been cross-referenced and physically authenticated with the local Malpot Karyalaya archives to ensure absolute ownership clarity.",
    status: "Verified Clear",
  },
  {
    icon: Icons.scale,
    title: "Legal & Encumbrance",
    description:
      "Thoroughly audited by our legal retainers to ensure zero outstanding bank liens, hidden familial disputes, or Guthi land restrictions.",
    status: "Zero Liabilities",
  },
  {
    icon: Icons.landmark,
    title: "Municipal Compliance",
    description:
      "Full Ward Office tax clearance secured. The physical structure has been audited against the approved Naksha Pass (Building Blueprint) with zero deviations.",
    status: "Fully Compliant",
  },
  {
    icon: Icons.activity,
    title: "Seismic & Structural",
    description:
      "Independent engineering audit confirms adherence to updated Nepal Building Codes (NBC) for enhanced earthquake resilience and foundational integrity.",
    status: "Grade-A Resilient",
  },
  {
    icon: Icons.droplets,
    title: "Utility Infrastructure",
    description:
      "Comprehensive checks on three-phase NEA power lines, deep boring water tables, filtration systems, and municipal drainage connectivity.",
    status: "Infrastructure Secured",
  },
  {
    icon: Icons.shield,
    title: "Market Valuation",
    description:
      "Asking price is algorithmically and manually validated against recent local registry transactions in the valley to ensure fair, uninflated market value.",
    status: "Market Aligned",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function VerificationProcess() {
  return (
    <section className="w-full bg-background font-body">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 border-t border-outline-variant/30">
        {/* Part 1: The Verification Grid */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32">
          {/* Left Column: The "Seal" and Intro */}
          <div className="w-full lg:w-1/3 shrink-0 flex flex-col items-start">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-8 border border-primary/20">
              <Icons.fileSearch
                size={20}
                strokeWidth={1.5}
                className="text-primary"
              />
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-[-0.04em] text-on-surface mb-6">
              Rigorous Due Diligence
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
              We operate on absolute transparency. We do not simply list
              properties; we curate secure, intergenerational assets.
            </p>
            <p className="text-on-surface-variant font-medium leading-relaxed mb-10">
              Every estate within our private portfolio undergoes a strict,
              uncompromising six-point legal, structural, and financial
              authentication protocol before it is ever presented to our
              clientele.
            </p>

            <button className="group flex items-center gap-4 py-4 px-6 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface hover:border-primary transition-all duration-500 font-label text-[0.65rem] font-bold tracking-[0.2em] uppercase shadow-sm hover:shadow-md">
              <Icons.download
                size={16}
                strokeWidth={1.5}
                className="text-primary group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              Download Legal Dossier
            </button>
          </div>

          {/* Right Column: The Sleek Expanded Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14"
          >
            {verificationSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-col group"
              >
                <div className="flex items-center gap-4 mb-5">
                  <step.icon
                    size={24}
                    strokeWidth={1.2}
                    className="text-outline group-hover:text-primary transition-colors duration-500"
                  />
                  <div className="h-[1px] flex-1 bg-outline-variant/50 group-hover:bg-primary/30 transition-colors duration-500" />
                </div>

                <h3 className="font-headline text-xl font-bold text-on-surface tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed font-light mb-6 flex-1">
                  {step.description}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <span className="font-label text-[0.65rem] font-bold uppercase tracking-[0.22em] text-emerald-600">
                    {step.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Part 2: Asset Pedigree & Engineering (Verbose Expansion) */}
        <div className="w-full bg-surface-container-low rounded-[32px] border border-outline-variant/40 p-10 lg:p-16 overflow-hidden relative">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 text-outline-variant/20 rotate-12 pointer-events-none">
            <Icons.shield size={400} strokeWidth={0.2} />
          </div>

          <div className="relative z-10 flex flex-col xl:flex-row gap-16">
            <div className="flex-1">
              <h3 className="font-label text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary mb-4">
                Asset Pedigree
              </h3>
              <h4 className="font-headline text-3xl md:text-4xl font-bold tracking-[-0.04em] text-on-surface mb-6">
                Investment Security & Yield Analysis
              </h4>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-light">
                Acquiring prime real estate requires more than aesthetic
                appreciation; it demands rigorous financial foresight. Our
                analytics team has evaluated this estate&apos;s trajectory within the
                current market landscape.
              </p>
              <div className="space-y-6 mt-8">
                <div className="flex gap-4">
                  <Icons.trendingUp
                    size={24}
                    strokeWidth={1.5}
                    className="text-primary shrink-0"
                  />
                  <div>
                    <h5 className="font-bold text-on-surface mb-2">
                      Capital Appreciation
                    </h5>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Historical land value in this specific neighborhood has
                      shown a consistent 8-12% YoY appreciation over the last
                      decade, insulating capital against inflation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icons.anchor
                    size={24}
                    strokeWidth={1.5}
                    className="text-primary shrink-0"
                  />
                  <div>
                    <h5 className="font-bold text-on-surface mb-2">
                      Liquidity & Demand
                    </h5>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Positioned in a high-demand, low-inventory diplomatic
                      zone, the asset maintains high liquidity potential,
                      ensuring viable exit strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[1px] bg-outline-variant/50 hidden xl:block" />
            <hr className="border-outline-variant/50 xl:hidden" />

            <div className="flex-1">
              <h3 className="font-label text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary mb-4">
                Structural Integrity
              </h3>
              <h4 className="font-headline text-3xl md:text-4xl font-bold tracking-[-0.04em] text-on-surface mb-6">
                Engineering & Seismology
              </h4>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-light">
                Built to transcend generations. The structural skeleton of this
                property was designed anticipating the unique geological demands
                of the valley, utilizing commercial-grade engineering
                principles.
              </p>
              <ul className="space-y-4 mt-8">
                {[
                  "Deep-pile foundation bypassing topsoil vulnerabilities.",
                  "Fe500 grade TMT rebars used symmetrically throughout the core pillars.",
                  "M25 to M30 grade concrete utilized for slabs and load-bearing walls.",
                  "Advanced waterproofing membranes applied to all subterranean and roof levels.",
                  "Acoustic and thermal insulation integrated into exterior dual-layer walls.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm font-medium text-on-surface-variant leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
