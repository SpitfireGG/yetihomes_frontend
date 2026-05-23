"use client";

import { useState } from "react";
import ValuationModal from "../shared/valuationModal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full h-[65svh] md:h-[100svh] min-h-[450px] md:min-h-[800px] overflow-hidden flex flex-col justify-between p-6 md:p-12 lg:p-16">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-black">
        <picture className="absolute inset-0">
          <source media="(min-width: 768px)" srcSet="/MobileHero.jpg" />
          <img
            src="/MobileHero.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 md:to-black/50" />
      </div>

      {/* Top Floating Text */}
      <div className="relative z-10 hidden md:flex justify-between items-start mt-20 lg:mt-24">
        <p className="text-white/90 text-md md:text-base font-light max-w-[400px] leading-relaxed">
          Redefining high-altitude luxury and exceptional living.
        </p>
        <p className="text-white/90 text-sm md:text-base font-light max-w-[250px] text-right leading-relaxed">
          The most trusted name in property — Yeti Homes Estate.
        </p>
      </div>

      <div className="md:hidden flex-1" />

      {/* Bottom Content Area */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-4 w-full">
        {/* Bottom Left: Tagline */}
        <div className="w-full lg:w-1/3">
          <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight drop-shadow-md">
            Closer to the peaks,
            <br />
            closer to home.
          </h1>
        </div>

        {/* Bottom Center: CTA Button */}
        <div className="w-full lg:w-1/3 flex justify-start lg:justify-center mb-2 lg:mb-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center justify-between gap-4 bg-white/10 backdrop-blur-md border border-white/20 text-white pl-6 pr-2 py-2 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-500 shadow-lg w-full sm:w-auto"
          >
            <span>Request a Valuation</span>
            <div className="bg-white text-black p-2 md:p-3 rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-500 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-5 md:h-5"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </button>
        </div>

        {/* Bottom Right: Stat Cards */}
        <div className="w-full lg:w-1/3 flex flex-row lg:flex-col items-stretch lg:items-end gap-3 lg:gap-4">
          <div className="flex-1 lg:flex-none bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl md:rounded-3xl w-full max-w-none lg:max-w-[280px] text-white shadow-xl hover:bg-white/20 transition-colors flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-1 tracking-tighter">
              5,000+
            </h3>
            <p className="text-[9px] md:text-sm font-light opacity-80 uppercase tracking-widest">
              Curated <span className="hidden sm:inline">Properties</span>
            </p>
          </div>
          <div className="flex-1 lg:flex-none bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl md:rounded-3xl w-full max-w-none lg:max-w-[280px] text-white shadow-xl hover:bg-white/20 transition-colors flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-1 tracking-tighter">
              98%
            </h3>
            <p className="text-[9px] md:text-sm font-light opacity-80 uppercase tracking-widest">
              Client <span className="hidden sm:inline">Satisfaction</span>
            </p>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <ValuationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
