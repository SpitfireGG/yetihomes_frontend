"use client";

import { Icons } from "@/components/ui/icons";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "../shared/sectionHeading";
import type { TeamMember } from "@/lib/api";

function TeamHero() {
  return (
    <div className="text-center mb-16 space-y-3 px-6">
      <SectionHeading
        title="Meet Our Team"
        description="

        Meet our exceptional team at Designflow! Comprising diverse talents and
        expertise, we are a dedicated group committed to delivering excellence
        in every project.
                "
      />
    </div>
  );
}

function MemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="flex flex-col items-center gap-4 shrink-0"
    >
      <Link href={member.profileHref} className="w-full">
        <motion.div
          className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[32px] bg-surface-container-high shadow-inner"
          whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
        >
          <Image
            src={member.thumbnail}
            alt={`Team member: ${member.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
      </Link>

      <div className="text-center px-1 max-w-full">
        <h3 className="font-sans font-medium text-xl text-on-surface tracking-tight truncate">
          {member.name}
        </h3>
        <p className="font-sans text-sm text-on-surface-variant mt-1 truncate">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function MeetOurTeamSection({
  members,
}: {
  members: TeamMember[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const previewMembers = members.slice(0, 4);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      const scrollAmount =
        clientWidth > 768 ? clientWidth / 2 : clientWidth * 0.8;

      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="font-sans antialiased text-on-surface bg-surface-container-low p-4 lg:p-10">
      <div className="w-full max-w-[1600px] mx-auto    overflow-hidden flex flex-col pt-16 pb-24 relative group">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant rounded-full items-center justify-center text-on-surface-variant shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:text-primary"
        >
          <Icons.chevronLeft size={24} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant rounded-full items-center justify-center text-on-surface-variant shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:text-primary"
        >
          <Icons.chevronRight size={24} strokeWidth={1.5} />
        </button>

        <TeamHero />

        <div className="w-full relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-6 lg:px-12 pb-8 -mb-8 snap-x snap-mandatory hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {previewMembers.map((member, index) => (
              <div
                key={member.id}
                className="w-[85vw] sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)] shrink-0 snap-start"
              >
                <MemberCard member={member} index={index} />
              </div>
            ))}

            <motion.div
              className="w-[85vw] sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)] shrink-0 snap-start flex items-center justify-center p-6 border-2 border-dashed border-outline-variant rounded-[32px] aspect-[4/5] cursor-pointer"
              whileHover={{ scale: 1.02, backgroundColor: "var(--surface-container-lowest)" }}
            >
              <Link
                href="/teams"
                className="flex flex-col items-center gap-4 text-center group w-full h-full justify-center"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-surface-container-high flex items-center justify-center border-4 border-white group-hover:scale-110 transition-transform shadow-sm">
                  <Icons.chevronRight
                    size={48}
                    strokeWidth={1}
                    className="text-outline group-hover:text-primary transition-colors"
                  />
                </div>
                <p className="font-sans font-medium text-lg text-on-surface-variant group-hover:text-primary transition-colors tracking-tight">
                  See more members
                </p>
              </Link>
            </motion.div>

            <div className="w-1 shrink-0"></div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `,
        }}
      />
    </section>
  );
}
