"use client";

import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/api";

export default function CompanyTeamPageClient({
  members,
}: {
  members: TeamMember[];
}) {
  if (!members || members.length === 0) {
    return (
      <section className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-6 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground">
          Company Team
        </h2>
        <p className="mt-2 text-on-surface-variant">No team members found.</p>
      </section>
    );
  }

  return (
    <main className="min-h-screen w-full bg-background font-sans">
      {/* Header Section */}
      <header className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="mb-2 block font-label text-xs font-bold uppercase tracking-[0.3em] text-outline">
            Portfolio
          </span>
          <h1 className="font-headline text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Company
            <span className="font-light text-on-surface-variant"> Teams</span>
          </h1>
          <p className="mt-6 font-body text-sm leading-relaxed text-on-surface-variant sm:text-base lg:max-w-md">
            Meet the advisors, negotiators, and specialists driving excellence
            across Yeti Homes property services.
          </p>
        </div>
      </header>

      {/* Scrollable Team List */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-20 md:gap-32 lg:gap-40">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Minimal Image Frame */}
              <div className="w-full lg:w-1/2">
                <div className="group relative aspect-[4/5] w-full overflow-hidden bg-surface-container-low">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              </div>

              {/* Clean Text Layout */}
              <div className="flex w-full flex-col lg:w-1/2 lg:px-8">
                <span className="mb-3 font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {member.role}
                </span>

                <h2 className="mb-4 font-headline text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {member.name}
                </h2>

                <div className="mb-6 flex items-center gap-2 font-label text-sm font-semibold text-on-surface-variant">
                  <Icons.mapPin size={16} className="text-outline" />
                  <span>{member.location}</span>
                </div>

                <p className="mb-8 font-body text-sm font-normal leading-relaxed text-on-surface-variant sm:text-base">
                  {member.bio ||
                    "Dedicated member supporting Yeti Homes clients globally with expert transactional and management strategies."}
                </p>

                <Link
                  href={member.profileHref}
                  className="group inline-flex w-fit items-center gap-3 font-label text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-colors hover:text-primary"
                >
                  Explore Profile
                  <Icons.arrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
