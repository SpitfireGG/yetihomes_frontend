"use client";

import { Icons } from "@/components/ui/icons";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { TeamMember } from "@/lib/api";

const BRAND_PRIMARY = "var(--primary)";
const BRAND_SUPPORT = "var(--secondary)";

export default function TeamMemberProfilePage({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white font-sans">
      <div className="pointer-events-none absolute top-10 right-10 z-0 overflow-hidden lg:top-[-40px] lg:right-[10%]">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[250px] leading-none font-black tracking-tighter lg:text-[400px]"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px #f3f4f6",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-16 px-6 pt-10 pb-20 lg:flex-row lg:gap-24 lg:px-16 lg:pt-16">
        <div className="relative flex w-full justify-center lg:w-5/12 lg:justify-start">
          <Link
            href="/teams"
            className="absolute top-0 left-0 z-30 flex items-center gap-2 text-sm font-semibold tracking-widest text-gray-500 uppercase transition-colors hover:text-gray-900 lg:-left-4"
          >
            <Icons.arrowLeft size={16} /> Back to Team
          </Link>

          <div className="relative mt-16 h-[500px] w-full max-w-md lg:mt-24 lg:h-[650px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-10 -left-6 inset-0 z-0 lg:top-20 lg:-left-12"
              style={{
                backgroundColor: BRAND_SUPPORT,
                clipPath: "polygon(0 0, 100% 15%, 100% 100%, 0% 85%)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative z-10 h-full w-full shadow-2xl"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top grayscale mix-blend-luminosity"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 flex w-full flex-col justify-center lg:mt-0 lg:w-7/12"
        >
          <motion.div variants={fadeUp} className="mb-10">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 lg:text-6xl">
              {member.name}
            </h1>
            <div className="flex flex-col gap-2">
              <p
                className="text-xl font-bold lg:text-2xl"
                style={{ color: BRAND_SUPPORT }}
              >
                {member.role}
              </p>
              <div className="flex items-center gap-2 font-medium text-gray-500">
                <Icons.mapPin size={18} strokeWidth={2.5} />
                <span>{member.location}</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-12">
            <h3 className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">
              Biography
            </h3>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
              {member.bio}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mb-12 grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 md:grid-cols-2"
          >
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-widest text-gray-400 uppercase">
                <Icons.briefcase size={16} /> Areas of Expertise
              </h3>
              <ul className="space-y-3">
                {member.expertise.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 font-medium text-gray-700"
                  >
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: BRAND_PRIMARY }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>


          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-brand-800"
            >
              <Icons.mail size={18} /> Contact {member.name.split(" ")[0]}
            </a>
            <a
              href="#"
              className="inline-flex h-14 w-14 items-center justify-center border-2 border-outline-variant text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            >
              <Icons.leafyGreen size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
