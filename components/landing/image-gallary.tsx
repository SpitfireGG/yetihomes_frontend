"use client";

import { Icons } from "@/components/ui/icons";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample property images
const propertyImages = [
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80", // Original Main
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80",
];

export default function ImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex-1 p-4 flex flex-col-reverse lg:flex-row gap-4 relative min-h-[50vh] lg:min-h-[91vh]">

      {/* Thumbnails Column */}
      <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pr-2 pl-2 pt-4 pb-2 custom-scrollbar snap-x">
        {propertyImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative w-24 h-24 lg:w-full lg:h-48 shrink-0 snap-center rounded-2xl overflow-hidden transition-all duration-300 ${
              activeIndex === index
                ? "ring-4 ring-primary ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
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
              setActiveIndex((prev) => (prev + 1) % propertyImages.length)
            }
            className="flex items-center gap-2 bg-surface-container-lowest text-on-surface px-4 py-2 rounded-lg font-medium text-sm shadow-sm hover:bg-primary-container hover:text-primary transition-all whitespace-nowrap"
          >
            Next photo <Icons.chevronLeft size={16} className="rotate-180" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={propertyImages[activeIndex]}
            alt="Main Property View"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
