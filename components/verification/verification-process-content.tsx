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
    icon: Icons.shield,
    title: "Third-Party Verification",
    description:
      "Cross-verification with independent third-party surveyors and title insurance readiness through our panel of certified property auditors.",
    status: "Audited & Certified",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function VerificationProcessContent() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F8F8F5] font-sans">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        {/* Eyebrow + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-4xl"
        >
          <span className="inline-flex rounded-full border border-primary/15 bg-primary-container px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Trust &amp; Verification
          </span>
          <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-on-surface sm:text-5xl lg:text-6xl leading-[1.1]">
            Every listing on Yeti Homes Estate is verified before it goes live.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            We do not publish a single property until the title is authenticated,
            the legal encumbrance check is cleared, and the municipal compliance
            is confirmed.
          </p>
        </motion.div>

        {/* Verification Steps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {verificationSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="group relative flex flex-col rounded-3xl border border-outline-variant/40 bg-white p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-container/60 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h2 className="font-headline text-xl font-bold text-on-surface mb-3">
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-on-surface-variant flex-1">
                  {step.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <Icons.checkCircle size={14} />
                  {step.status}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Detail Section */}
        <div className="mt-32 border-t border-outline-variant/30 pt-16">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-6 leading-tight">
                Our verification process goes beyond standard due diligence.
              </h2>
              <p className="text-base leading-relaxed text-on-surface-variant">
                Each property in our portfolio undergoes a rigorous multi-stage
                verification process that covers title authentication, legal
                encumbrance checks, municipal compliance audits, and independent
                third-party surveyor assessments. This ensures that every
                listing on our platform meets the highest standards of
                transparency and trust.
              </p>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Land Revenue Clearance",
                  items: [
                    "Up-to-date Malpot tax receipts verified against Ward Office records.",
                    "No outstanding dues on the property from any government body.",
                    "Land revenue classification confirmed (private vs. Guthi vs. public).",
                  ],
                },
                {
                  title: "Structural & Safety Audit",
                  items: [
                    "M25 to M30 grade concrete utilized for slabs and load-bearing walls.",
                    "Advanced waterproofing membranes applied to all subterranean and roof levels.",
                    "Acoustic and thermal insulation integrated into exterior dual-layer walls.",
                  ],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="font-headline text-lg font-bold text-on-surface mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-sm font-medium text-on-surface-variant leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
