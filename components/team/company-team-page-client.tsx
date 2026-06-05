"use client";

import { Icons } from "@/components/ui/icons";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { TeamMember } from "@/lib/api";

const BRAND_PRIMARY = "var(--primary)";
const BRAND_SUPPORT = "var(--secondary)";

export default function CompanyTeamPageClient({
  members,
}: {
  members: TeamMember[];
}) {
  const [currentIndex, setCurrentIndex] = useState(
    members.length > 2 ? 2 : 0,
  );
  const [direction, setDirection] = useState(0);
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const activeMember = members[currentIndex] ?? null;

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((previousIndex) => {
        let nextIndex = previousIndex + newDirection;
        if (nextIndex < 0) nextIndex = members.length - 1;
        if (nextIndex >= members.length) nextIndex = 0;
        return nextIndex;
      });
    },
    [members.length],
  );

  const goToIndex = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  // Keep the active thumbnail centered in the strip when navigating.
  useEffect(() => {
    const el = thumbStripRef.current?.querySelector<HTMLButtonElement>(
      `[data-thumb-index="${currentIndex}"]`,
    );
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentIndex]);

  // Keyboard navigation for the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  // Lightweight touch swipe for mobile.
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      paginate(dx < 0 ? 1 : -1);
    }
    touchStart.current = null;
  };

  const slideVariants = {
    enter: (slideDirection: number) => ({
      x: slideDirection > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (slideDirection: number) => ({
      x: slideDirection < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  if (!activeMember) {
    return (
      <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-white px-6 pt-16 pb-16 text-center sm:px-8">
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">Company Team</h2>
        <p className="mt-4 text-gray-600">
          Team members from the live API will appear here.
        </p>
      </section>
    );
  }

  return (
    <section
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-white px-6 pt-12 pb-0 font-sans sm:px-8 sm:pt-16 lg:px-16"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top header: heading + description + (desktop) huge number */}
      <div className="z-20 mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between gap-6 lg:flex-row lg:gap-8">
        <div className="w-full lg:mb-0 lg:w-1/4">
          <h2 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Company
            <br />
            Team
          </h2>
        </div>

        <div className="w-full px-0 lg:w-2/5 lg:px-8">
          <p className="max-w-lg text-base leading-relaxed font-medium text-gray-600 sm:text-lg lg:text-xl">
            Meet the advisors, negotiators, and client specialists behind Yeti
            Homes. This page is now driven by the live team API and shared with
            the landing page through one cached server source.
          </p>
        </div>

        <div className="hidden w-full justify-end md:flex lg:w-1/4">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeMember.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-[120px] leading-none font-black tracking-tighter sm:text-[160px] md:text-[200px] lg:text-[240px]"
              style={{
                color: "transparent",
                WebkitTextStroke: "3px #e5e7eb",
                marginTop: "-40px",
              }}
            >
              {String(currentIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile-only stacked hero: image → info */}
      <div className="relative z-20 mt-10 lg:hidden">
        <div className="relative w-full overflow-hidden">
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/11]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeMember.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeMember.image}
                  alt={activeMember.name}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-top grayscale opacity-90 mix-blend-luminosity"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>

        <div className="mt-6 min-h-[120px] border-l-2 border-gray-200 pl-5 sm:pl-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                {activeMember.name}
              </h2>
              <p className="mt-1 font-medium text-gray-500">
                {activeMember.role}
                <br />
                {activeMember.location}
              </p>
              <Link
                href={activeMember.profileHref}
                className="mt-6 inline-flex items-center text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
                style={{ color: BRAND_PRIMARY }}
              >
                Read More
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop lower section: thumbs + info side by side, image on the right */}
      <div className="relative z-20 mx-auto mt-12 hidden w-full max-w-[1600px] flex-1 items-end pb-12 lg:mt-0 lg:flex">
        <div className="z-30 mb-4 flex gap-2 lg:gap-4">
          {members.map((member, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={member.id}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`relative h-24 w-20 -skew-x-[15deg] overflow-hidden transition-all duration-300 lg:h-36 lg:w-28 ${
                  isActive
                    ? "scale-105 border-l-4 border-r-4 shadow-lg"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  borderColor: isActive ? BRAND_PRIMARY : "transparent",
                }}
              >
                <Image
                  src={member.thumbnail}
                  alt={member.name}
                  fill
                  sizes="112px"
                  className={`scale-[1.35] skew-x-[15deg] object-cover transition-all duration-500 ${
                    isActive ? "grayscale-0" : "grayscale"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="ml-8 mb-10 min-h-[120px] border-l-2 border-gray-200 pl-6 lg:ml-24 lg:pl-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black tracking-tight text-gray-900 lg:text-3xl">
                {activeMember.name}
              </h2>
              <p className="mt-1 font-medium text-gray-500">
                {activeMember.role}
                <br />
                {activeMember.location}
              </p>
              <Link
                href={activeMember.profileHref}
                className="mt-6 inline-flex items-center text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
                style={{ color: BRAND_PRIMARY }}
              >
                Read More
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile thumbnail strip with arrows flanking (kept on mobile only) */}
      <div className="relative z-30 mt-6 mb-24 flex items-center gap-2 lg:hidden">
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous team member"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors hover:bg-gray-50"
          style={{ borderColor: BRAND_PRIMARY, color: BRAND_PRIMARY }}
        >
          <Icons.arrowLeft size={18} strokeWidth={2.5} />
        </button>
        <div
          ref={thumbStripRef}
          className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex items-stretch gap-2 px-1 py-1">
            {members.map((member, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={member.id}
                  data-thumb-index={index}
                  onClick={() => goToIndex(index)}
                  aria-label={`View ${member.name}`}
                  aria-current={isActive ? "true" : "false"}
                  className={`relative shrink-0 snap-center -skew-x-[15deg] overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "h-16 w-12 ring-2 ring-primary"
                      : "h-12 w-10 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={member.thumbnail}
                    alt={member.name}
                    fill
                    sizes="48px"
                    className={`scale-[1.35] skew-x-[15deg] object-cover transition-all duration-500 ${
                      isActive ? "grayscale-0" : "grayscale"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => paginate(1)}
          aria-label="Next team member"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: BRAND_PRIMARY }}
        >
          <Icons.arrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Desktop nav buttons — placed on the right side of the page,
          but moved up to a band that no longer overlaps the bottom-right
          WhatsApp widget (which lives at fixed bottom-6 right-6). */}
      <div className="pointer-events-none absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous team member"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white transition-colors hover:bg-gray-50"
            style={{ borderColor: BRAND_PRIMARY, color: BRAND_PRIMARY }}
          >
            <Icons.arrowLeft size={20} strokeWidth={2} />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next team member"
            className="flex h-12 w-12 items-center justify-center rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: BRAND_PRIMARY, color: "white" }}
          >
            <Icons.arrowRight size={20} strokeWidth={2} />
          </button>
        </div>
        <span className="pointer-events-auto rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-[0.28em] uppercase text-gray-500 backdrop-blur-md">
          {String(currentIndex + 1).padStart(2, "0")} / {String(members.length).padStart(2, "0")}
        </span>
      </div>

      {/* Desktop decorative secondary shape behind the active image */}
      <div
        className="absolute right-0 bottom-0 z-0 hidden h-[80vh] w-[45%] lg:block"
        style={{
          backgroundColor: BRAND_SUPPORT,
          clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* Active member image — desktop only (mobile has its own above) */}
      <div className="pointer-events-none absolute right-0 bottom-0 z-10 hidden h-[70vh] w-[600px] overflow-hidden lg:right-[10%] lg:block">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeMember.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="absolute inset-0"
          >
            <Image
              src={activeMember.image}
              alt={activeMember.name}
              fill
              priority
              sizes="600px"
              className="object-cover object-top grayscale opacity-90 mix-blend-luminosity"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
