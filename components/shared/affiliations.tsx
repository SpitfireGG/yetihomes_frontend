"use client";

import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./sectionHeading";

const partnerLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    alt: "Partner 1",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Partner 2",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
    alt: "Partner 3",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    alt: "Partner 4",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
    alt: "Partner 5",
  },
];

export default function TrustHub() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/8 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <SectionHeading title="Buy with Absolute Confidence" align="center" />
          <p className="text-on-surface-variant text-lg leading-relaxed mt-4">
            Navigating Nepal&apos;s real estate market can be complex. Every
            property on YetiHomes goes through a rigorous multi-point legal and
            physical verification process before it reaches your screen.
          </p>
        </div>

        {/* 3-Pillar Trust Grid - Localized for Nepal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-24">
          {[
            {
              icon: Icons.fileSignature,
              title: "Lal Purja & Title Cleared",
              desc: "We verify the Lal Purja, Trace Maps, and strictly check for Mohiyani (tenant) rights or Guthi complications to guarantee a 100% dispute-free transfer.",
            },
            {
              icon: Icons.map,
              title: "Verified 'Bato Ghato'",
              desc: "No more road access disputes. We cross-match the physical site road with the official Napi Naksha (cadastral map) and local ward office records.",
            },
            {
              icon: Icons.landmark,
              title: "Class 'A' Bank Approved",
              desc: "Listings are pre-vetted for valuation criteria, ensuring smooth, rapid EMI processing and Home Loan approvals with Nepal&apos;s leading commercial banks.",
            },
          ].map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-surface-container-lowest border border-outline-variant p-8 rounded-[24px] shadow-sm hover:shadow-xl hover:border-primary/25 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary-container rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                <pillar.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {pillar.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Continuous Institutional Partners Marquee */}
        <div className="py-12 border-t border-outline-variant max-w-full overflow-hidden">
          <div className="text-center mb-10">
            <h3 className="text-sm font-bold text-outline uppercase tracking-widest">
              Trusted by Top Financial Institutions & Law Firms
            </h3>
          </div>

          {/* Marquee Container */}
          <div className="relative flex overflow-x-hidden group">
            {/* 
              Fade masks for the left and right edges 
              Creates a smooth disappearing effect at the screen edges
            */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-surface-container-low to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-surface-container-low to-transparent z-10"></div>

            {/* Framer motion loop */}
            <motion.div
              className="flex whitespace-nowrap items-center gap-16 md:gap-24 px-8 min-w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 35, // Smooth, professional speed
                repeat: Infinity,
              }}
            >
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div
                  key={index}
                  className="relative w-24 h-16 md:w-32 md:h-20 flex items-center justify-center shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
