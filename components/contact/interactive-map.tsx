"use client";

import { Icons } from "@/components/ui/icons";

import React from "react";
import { motion } from "framer-motion";

export default function InteractiveMap() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12  mb-12 relative font-sans">
      <div className="mb-12 text-center">
        <h3 className="text-3xl md:text-4xl font-headline font-black text-on-surface mb-3 tracking-tight">
          Find Us Locally
        </h3>
        <p className="font-light text-on-surface-variant max-w-xl mx-auto text-lg">
          Visit our headquarters or explore the properties around the prominent
          zones of Kathmandu Valley.
        </p>
      </div>

      <div className="relative w-full h-[500px] md:h-[600px] bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-2xl shadow-brand-navy-900/5 border border-outline-variant/60 group">
        {/* Google Maps iFrame */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113032.64621396347!2d85.25511874254096!3d27.708316982635957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1703666601429!5m2!1sen!2snp"
          className="absolute inset-0 w-full h-full border-0 transition-all duration-700 ease-in-out z-0"
          style={{
            WebkitFilter:
              "grayscale(100%) contrast(1.1) opacity(0.85) sepia(20%) hue-rotate(330deg)",
            filter:
              "grayscale(100%) contrast(1.1) opacity(0.85) sepia(20%) hue-rotate(330deg)",
          }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Overlay to catch interactions and style it nicely */}
        <div className="absolute inset-0 pointer-events-none group-hover:bg-transparent bg-background/5 transition-colors duration-500 z-10"></div>

        {/* Floating Interactive Card via Framer Motion */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            bounce: 0.4,
          }}
          className="absolute bottom-6 left-6 right-6 md:right-auto md:bottom-12 md:left-12 bg-surface-container-lowest/95 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl shadow-black/10 border border-outline-variant/40 max-w-[380px] pointer-events-auto z-20"
        >
          <div className="flex items-center gap-5 mb-5">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-ping opacity-50"></div>
              <Icons.mapPin size={26} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-extrabold text-on-surface text-xl">
                YetiHomes Base
              </h4>
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">
                Heart of Kathmandu
              </p>
            </div>
          </div>

          <p className="text-sm font-medium text-on-surface-variant leading-relaxed mb-8">
            Our main operations center is located gracefully in the vibrant
            center of the capital, bringing the best property opportunities
            directly to you.
          </p>

          <button className="w-full py-4 rounded-full bg-primary text-white text-[13px] font-bold uppercase tracking-widest hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <Icons.navigation size={16} strokeWidth={2.5} /> Get Directions
          </button>
        </motion.div>
      </div>
    </section>
  );
}
