"use client";

import { Icons } from "@/components/ui/icons";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const tabs = ["Overview", "About"];

export default function PropertyDetailsPanel({
  property,
  onClose,
}: {
  property: any;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  if (!property) return null;

  // Safe fallback for images
  const img1 = property.images?.[0] || property.image;
  const img2 = property.images?.[1] || property.image;
  const img3 = property.images?.[2] || property.image;

  return (
    <aside className="w-[480px] xl:w-[520px] bg-surface-container-lowest h-full font-sans overflow-y-auto custom-scrollbar p-6 lg:p-8 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 bg-brand-navy-900/55 hover:bg-secondary text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
      >
        <Icons.close size={16} strokeWidth={2.5} />
      </button>

      <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[260px] md:h-[300px] mb-6">
        <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
          <Image
            src={img1}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={img2}
            alt="View 2"
            fill
            sizes="(max-width: 768px) 50vw, 260px"
            className="object-cover scale-110"
          />
        </div>
        <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={img3}
            alt="View 3"
            fill
            sizes="(max-width: 768px) 50vw, 260px"
            className="object-cover scale-125"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors cursor-pointer">
            <span className="text-white text-sm font-semibold tracking-wide">
              +12 Photos
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1 pr-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
            {property.title}
          </h2>
          <div className="flex items-center gap-1.5 text-gray-500 mt-2">
            <Icons.mapPin size={16} strokeWidth={2.5} className="text-secondary" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl font-bold text-gray-900 whitespace-nowrap">
            {property.price}
          </div>
          <div className="text-xs font-medium text-gray-400 mt-0.5">
            {property.period}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 border-b border-gray-100 mt-6 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-3 text-sm font-semibold transition-colors duration-200 ${activeTab === tab ? "text-primary" : "text-outline hover:text-on-surface"}`}
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
            <h4 className="text-sm font-bold text-gray-900 mb-2">
              Description :
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium {property.area} {property.unit}{" "}
              {property.type?.toLowerCase()} located in the highly sought-after
              area of {property.location}. Perfect for immediate investment or
              development. 100% legally cleared Lal Purja available.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50">
              <Icons.maximize size={16} strokeWidth={2} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">
                {property.area} {property.unit}
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50">
              <Icons.file size={16} strokeWidth={2} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">
                Clear Lal Purja
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50">
              <Icons.checkCircle2
                size={16}
                strokeWidth={2}
                className="text-gray-500"
              />
              <span className="text-xs font-semibold text-gray-700">
                East Facing
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <button className="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-primary bg-primary-container hover:bg-brand-100 transition-colors border border-primary/10">
              Contact Agent
            </button>
            <button className="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-brand-800 transition-colors shadow-lg shadow-brand-700/20">
              Schedule Visit
            </button>
          </div>
        </motion.div>
      )}
    </aside>
  );
}
