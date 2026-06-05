"use client";
import { Icons } from "@/components/ui/icons";

import React, { useState } from "react";
import { motion } from "framer-motion";

const propertyData = {
  title: "Midnight Ridge Villa",
  location: "Budhanilkantha, Kathmandu, Nepal",
  price: "NPR 3.2 Lakh",
  period: "/month",
  description:
    "Welcome to Midnight Ridge Villa 🏡 Experience a peaceful escape at Midnight Ridge Villa, a modern retreat set on a quiet hillside with stunning views of the Kathmandu valley and starry nights.",
  images: [] as string[],
  amenities: [
    { icon: Icons.doorOpen, label: "6 Rooms" },
    { icon: Icons.bedDouble, label: "4 Beds" },
    { icon: Icons.bathroom, label: "2 Baths" },
    { icon: Icons.utensilsCrossed, label: "2 Kitchens" },
    { icon: Icons.maximize, label: "2,820 sqft (8 Aana)" },
    { icon: Icons.car, label: "1 Garage" },
  ],
};

const tabs = ["Overview", "About"];

function ImageGallery() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[260px] md:h-[300px] mb-6">
      <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer bg-gradient-to-br from-primary/25 via-secondary/20 to-tertiary/25">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icons.home className="size-20 text-on-surface-variant/30" strokeWidth={1} />
        </div>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>

      <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group cursor-pointer bg-gradient-to-br from-secondary/25 via-tertiary/20 to-primary/25">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icons.bedDouble className="size-10 text-on-surface-variant/30" strokeWidth={1} />
        </div>
      </div>

      <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group cursor-pointer bg-gradient-to-br from-tertiary/25 via-primary/20 to-secondary/25">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icons.armchair className="size-10 text-on-surface-variant/30" strokeWidth={1} />
        </div>

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
          <span className="text-white text-sm font-semibold tracking-wide">
            +12 Photos
          </span>
        </div>
      </div>
    </div>
  );
}

function AmenitiesGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
      {propertyData.amenities.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-primary-container hover:border-primary/10 transition-colors duration-200"
          >
            <Icon
              size={16}
              strokeWidth={2}
              className="text-on-surface-variant"
            />
            <span className="text-xs font-semibold text-on-surface whitespace-nowrap">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function PropertyDetailsPanel() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <aside className="w-full lg:w-[480px] xl:w-[520px] bg-surface-container-lowest border-l border-outline-variant flex flex-col h-full font-sans overflow-y-auto custom-scrollbar p-6 lg:p-8">
      <ImageGallery />

      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-on-surface tracking-tight leading-tight">
            {propertyData.title}
          </h2>
          <div className="flex items-center gap-1.5 text-on-surface-variant mt-2">
            <Icons.mapPin size={16} strokeWidth={2.5} className="text-secondary" />
            <span className="text-sm font-medium">{propertyData.location}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl font-bold text-on-surface whitespace-nowrap">
            {propertyData.price}
          </div>
          <div className="text-xs font-medium text-outline mt-0.5">
            {propertyData.period}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 border-b border-outline-variant mt-6 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-3 text-sm font-semibold transition-colors duration-200 ${
              activeTab === tab
                ? "text-primary"
                : "text-outline hover:text-on-surface"
            }`}
          >
            {tab}

            {activeTab === tab && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h4 className="text-sm font-bold text-on-surface mb-2">
              Description :
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {propertyData.description}
            </p>
          </div>

          <AmenitiesGrid />

          <div className="flex items-center gap-4 mb-8">
            <button className="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-primary bg-primary-container hover:bg-brand-100 transition-colors duration-200 border border-primary/10">
              Contact Agent
            </button>
            <button className="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-brand-800 transition-colors duration-200 shadow-lg shadow-brand-700/20">
              Order Now
            </button>
          </div>

          <div className="relative w-full h-48 bg-gradient-to-br from-primary/15 via-secondary/15 to-tertiary/15 rounded-2xl overflow-hidden group cursor-pointer border border-outline-variant">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-secondary/25 rounded-full animate-ping"></div>
                <div className="relative bg-surface-container-lowest w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <Icons.mapPin
                    size={24}
                    strokeWidth={2.5}
                    className="text-secondary"
                  />
                </div>
              </div>
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface-container-lowest/95 backdrop-blur px-3 py-2 rounded-xl shadow-md border border-outline-variant flex items-center gap-3">
              <div className="w-8 h-8 rounded-md overflow-hidden shrink-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-tertiary/30 flex items-center justify-center">
                <Icons.home className="size-5 text-on-surface-variant/60" strokeWidth={1.5} />
              </div>
              <div className="pr-2">
                <p className="text-[10px] font-bold text-on-surface leading-none mb-1">
                  {propertyData.title}
                </p>
                <p className="text-[9px] text-on-surface-variant leading-none truncate w-24">
                  {propertyData.location}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </aside>
  );
}
