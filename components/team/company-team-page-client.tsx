"use client";

import { Icons } from "@/components/ui/icons";

import { useState } from "react";
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

  const activeMember = members[currentIndex] ?? null;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((previousIndex) => {
      let nextIndex = previousIndex + newDirection;

      if (nextIndex < 0) {
        nextIndex = members.length - 1;
      }

      if (nextIndex >= members.length) {
        nextIndex = 0;
      }

      return nextIndex;
    });
  };

  const slideVariants = {
    enter: (slideDirection: number) => ({
      x: slideDirection > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (slideDirection: number) => ({
      x: slideDirection < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  if (!activeMember) {
    return (
      <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-white px-8 pt-16 pb-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Company Team</h2>
        <p className="mt-4 text-gray-600">
          Team members from the live API will appear here.
        </p>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-white px-8 pt-16 pb-0 font-sans lg:px-16">
      <div className="z-20 mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between lg:flex-row">
        <div className="mb-8 w-full lg:mb-0 lg:w-1/4">
          <h2 className="text-4xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl">
            Company
            <br />
            Team
          </h2>
        </div>

        <div className="w-full px-0 lg:w-2/5 lg:px-8">
          <p className="max-w-lg text-lg leading-relaxed font-medium text-gray-600 lg:text-xl">
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
              className="text-[180px] leading-none font-black tracking-tighter lg:text-[240px]"
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

      <div className="relative z-20 mx-auto mt-20 flex w-full max-w-[1600px] flex-1 items-end pb-12 lg:mt-0">
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

        <div className="absolute right-4 bottom-12 z-40 flex items-center gap-3 sm:right-0">
          <button
            onClick={() => paginate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white transition-colors hover:bg-gray-50"
            style={{ borderColor: BRAND_PRIMARY, color: BRAND_PRIMARY }}
          >
            <Icons.arrowLeft size={20} strokeWidth={2} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: BRAND_PRIMARY, color: "white" }}
          >
            <Icons.arrowRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div
        className="absolute right-0 bottom-0 z-0 h-[60vh] w-full lg:h-[80vh] lg:w-[45%]"
        style={{
          backgroundColor: BRAND_SUPPORT,
          clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      <div className="pointer-events-none absolute right-0 bottom-0 z-10 h-[50vh] w-[100vw] overflow-hidden lg:right-[10%] lg:h-[70vh] lg:w-[600px]">
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
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-top grayscale opacity-90 mix-blend-luminosity"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent lg:hidden" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
