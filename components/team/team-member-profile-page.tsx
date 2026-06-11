"use client";

import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { TeamMember } from "@/lib/api";

export default function TeamMemberProfilePage({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <main className="relative min-h-screen w-full bg-background font-sans text-foreground">
      {/* Editorial Decorative Background Number */}
      <div className="pointer-events-none absolute -right-8 -top-16 z-0 select-none overflow-hidden opacity-[0.03] lg:-top-32 lg:right-12">
        <span className="font-headline text-[280px] font-black leading-none tracking-tighter lg:text-[500px]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
        {/* Navigation Action Row */}
        <div className="mb-12 flex items-center justify-between border-b border-outline-variant pb-5">
          <Link
            href="/teams"
            className="group inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.2em] text-outline transition-colors hover:text-foreground"
          >
            <Icons.arrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Team Portfolio
          </Link>
          <span className="font-label text-xs font-bold uppercase tracking-widest text-outline">
            Profile / {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* MAIN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN: MINIMAL IMAGE FRAME */}
          <div className="flex flex-col items-center lg:col-span-5 lg:items-start">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden bg-surface-container-low lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top grayscale transition-all duration-700 ease-in-out hover:grayscale-0"
                />
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: TYPOGRAPHIC CONTENT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center lg:col-span-7"
          >
            {/* Name & Role Header */}
            <motion.div variants={fadeUp} className="mb-10">
              <span className="mb-2 block font-label text-xs font-bold uppercase tracking-[0.25em] text-outline">
                Expert Team Professional
              </span>
              <h1 className="font-headline text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl xl:text-6xl mb-4">
                {member.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 font-label text-sm font-semibold">
                <span className="font-label text-xs font-bold uppercase tracking-wider text-primary">
                  {member.role}
                </span>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <Icons.mapPin size={15} className="text-outline" />
                  <span>{member.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Minimal Content Fields (No heavy card boxes) */}
            <div className="mb-10 space-y-8">
              {/* Biography Section */}
              <motion.div variants={fadeUp}>
                <h3 className="mb-3 block font-label text-[10px] font-bold uppercase tracking-[0.25em] text-outline">
                  Professional Biography
                </h3>
                <p className="font-body text-sm font-normal leading-relaxed text-on-surface-variant sm:text-base">
                  {member.bio ||
                    `${member.name} serves a critical role driving execution workflows and offering specialized transactional counsel within our property divisions.`}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 border-t border-outline-variant pt-8">
                {/* Contact Line Section */}
                {member.phone && (
                  <motion.div
                    variants={fadeUp}
                    className="flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="mb-2 flex items-center gap-1.5 font-label text-[10px] font-bold uppercase tracking-[0.25em] text-outline">
                        <Icons.phone size={12} /> Contact Line
                      </h3>
                    </div>
                    <a
                      href={`tel:${member.phone}`}
                      className="group inline-flex items-center gap-2 font-body text-sm font-bold text-foreground transition-colors hover:text-primary"
                    >
                      {member.phone}
                      <Icons.arrowRight
                        size={14}
                        className="text-outline transition-transform group-hover:translate-x-1"
                      />
                    </a>
                  </motion.div>
                )}

                {/* Expertise Section */}
                <motion.div variants={fadeUp}>
                  <h3 className="mb-3 flex items-center gap-1.5 font-label text-[10px] font-bold uppercase tracking-[0.25em] text-outline">
                    <Icons.briefcase size={12} /> Areas of Expertise
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {(member.expertise && member.expertise.length > 0
                      ? member.expertise
                      : [
                          "Client Management",
                          "Negotiations",
                          "Property Marketing",
                        ]
                    ).map((item, i, arr) => (
                      <span
                        key={item}
                        className="font-body text-xs font-medium text-on-surface-variant"
                      >
                        {item}
                        {i < arr.length - 1 && (
                          <span className="text-outline ml-1.5">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Interface Strip */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6 border-t border-outline-variant pt-8"
            >
              <a
                href={`mailto:${member.email}`}
                className="group inline-flex items-center gap-3 font-label text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-colors hover:text-primary"
              >
                <Icons.mail size={14} />
                Send Email
                <Icons.arrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
