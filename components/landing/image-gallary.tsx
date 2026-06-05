"use client";

import { Icons } from "@/components/ui/icons";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const propertyGradients = [
  "from-primary/30 via-secondary/20 to-tertiary/30",
  "from-secondary/30 via-tertiary/20 to-primary/30",
  "from-tertiary/30 via-primary/20 to-secondary/30",
  "from-primary/25 via-tertiary/25 to-secondary/25",
];

export default function ImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex-1 p-4 flex flex-col-reverse lg:flex-row gap-4 relative min-h-[50vh] lg:min-h-[91vh]">

      {/* Thumbnails Column */}
      <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pr-2 pl-2 pt-4 pb-2 custom-scrollbar snap-x">
        {propertyGradients.map((gradient, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative w-24 h-24 lg:w-full lg:h-48 shrink-0 snap-center rounded-2xl overflow-hidden transition-all duration-300 bg-gradient-to-br ${gradient} ${
              activeIndex === index
                ? "ring-4 ring-primary ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Icons.home className="size-8 text-on-surface-variant/40" strokeWidth={1} />
            </div>
          </button>
        ))}
      </div>

      {/* Main Hero Image with smooth transition */}
      <div className="w-full lg:w-3/4 h-[40vh] lg:h-auto rounded-2xl overflow-hidden relative bg-surface-container-high shrink-0">
        {/* Floating Top Buttons */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex bg-surface-container-lowest/85 backdrop-blur-md rounded-full p-1 shadow-sm w-max">
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-medium text-sm shadow-sm">
            <Icons.home size={16} /> Photos
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-full font-medium text-sm text-on-surface-variant hover:text-primary transition-colors">
            <Icons.box size={16} /> 3D view
          </button>
        </div>

        {/* Floating Bottom Buttons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4 w-max">
          <button className="bg-surface-container-lowest/85 text-on-surface backdrop-blur-md hover:bg-primary-container hover:text-primary px-4 py-2 rounded-lg font-medium text-sm shadow-sm transition-all whitespace-nowrap">
            Show all photos
          </button>
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % propertyGradients.length)
            }
            className="flex items-center gap-2 bg-surface-container-lowest text-on-surface px-4 py-2 rounded-lg font-medium text-sm shadow-sm hover:bg-primary-container hover:text-primary transition-all whitespace-nowrap"
          >
            Next photo <Icons.chevronLeft size={16} className="rotate-180" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-br ${propertyGradients[activeIndex]}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Icons.home className="size-24 text-on-surface-variant/30" strokeWidth={0.8} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
