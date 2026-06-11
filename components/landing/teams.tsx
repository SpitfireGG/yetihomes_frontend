"use client";

import { Icons } from "@/components/ui/icons";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../shared/sectionHeading";
import type { TeamMember } from "@/lib/api";

function TeamHero() {
  return (
    <div className="text-center mb-8 md:mb-12 space-y-3 px-6">
      <SectionHeading
        title="Meet Our Team"
        description="Meet our exceptional team at Designflow! Comprising diverse talents and expertise, we are a dedicated group committed to delivering excellence in every project."
      />
    </div>
  );
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <div className="flex flex-col items-center gap-4 shrink-0">
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
    </div>
  );
}

export default function MeetOurTeamSection({
  members,
}: {
  members: TeamMember[];
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const previewMembers = members.slice(0, 6);

  // Dynamically calculate how far the element needs to slide horizontally
  useEffect(() => {
    const calculateRange = () => {
      if (carouselRef.current) {
        const totalWidth = carouselRef.current.scrollWidth;
        const viewportWidth = carouselRef.current.clientWidth;
        // The distance to scroll is the total content width minus what's already visible
        setScrollRange(totalWidth - viewportWidth);
      }
    };

    calculateRange();
    
    window.addEventListener("resize", calculateRange);
    return () => window.removeEventListener("resize", calculateRange);
  }, [previewMembers]);

  // Track vertical scroll progress of the main container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll progress (0 to 1) to horizontal pixel translation (0 to -scrollRange)
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    // h-[250vh] controls the duration/speed of the horizontal scroll. 
    // Increase to make it scroll slower, decrease to make it scroll faster.
    <div ref={targetRef} className="relative h-[250vh] font-sans antialiased text-on-surface">
      
      {/* Sticky wrapper keeps the section locked on screen while translating horizontally */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-background">
        
        <TeamHero />

        <div className="w-full max-w-[1600px] mx-auto relative px-6 lg:px-12">
          {/* Animated horizontal strip */}
          <motion.div
            ref={carouselRef}
            style={{ x }}
            className="flex gap-6 pb-4"
          >
            {previewMembers.map((member, index) => (
              <div
                key={member.id}
                // Fixed sizing ensures smooth, predictable layout calculations
                className="w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] shrink-0"
              >
                <MemberCard member={member} index={index} />
              </div>
            ))}

            {/* "See More" Card integrated into the track */}
            <motion.div
              className="w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] shrink-0 flex items-center justify-center p-6 border-2 border-dashed border-outline-variant rounded-[32px] aspect-[4/5] cursor-pointer"
              whileHover={{
                scale: 1.02,
                backgroundColor: "var(--surface-container-lowest)",
              }}
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
                  See all teams
                </p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
