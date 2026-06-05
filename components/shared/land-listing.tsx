"use client";

import { Icons } from "@/components/ui/icons";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const landProperties = [
  {
    id: "l1",
    slug: "sunny-hills-residential-plot",
    title: "Sunny Hills Residential Plot",
    location: "Bhaisepati, Lalitpur",
    price: "NPR 65 Lakh",
    period: "/aana",
    area: "4.5",
    unit: "Aana",
    type: "Residential Plot",
    typeColor: "text-primary",
    image: "",
  },
  {
    id: "l2",
    slug: "highway-frontage-hub",
    title: "Highway Frontage Hub",
    location: "Satdobato, Lalitpur",
    price: "NPR 1.2 Cr",
    period: "/aana",
    area: "8.0",
    unit: "Aana",
    type: "Commercial Land",
    typeColor: "text-secondary",
    image: "",
  },
  {
    id: "l3",
    slug: "scenic-valley-view-estate",
    title: "Scenic Valley View Estate",
    location: "Budhanilkantha, Kathmandu",
    price: "NPR 45 Lakh",
    period: "/aana",
    area: "6.0",
    unit: "Aana",
    type: "Premium Plot",
    typeColor: "text-tertiary",
    image: "",
  },
  {
    id: "l4",
    slug: "peaceful-corner-lot",
    title: "Peaceful Corner Lot",
    location: "Imadol, Lalitpur",
    price: "NPR 55 Lakh",
    period: "/aana",
    area: "3.5",
    unit: "Aana",
    type: "Residential Plot",
    typeColor: "text-primary",
    image: "",
  },
  {
    id: "l5",
    slug: "godawari-farmhouse-land",
    title: "Godawari Farmhouse Land",
    location: "Godawari, Lalitpur",
    price: "NPR 20 Lakh",
    period: "/aana",
    area: "1.0",
    unit: "Ropani",
    type: "Agricultural",
    typeColor: "text-tertiary",
    image: "",
  },
  {
    id: "l6",
    slug: "prime-business-square",
    title: "Prime Business Square",
    location: "Baluwatar, Kathmandu",
    price: "NPR 1.8 Cr",
    period: "/aana",
    area: "5.0",
    unit: "Aana",
    type: "Commercial Land",
    typeColor: "text-secondary",
    image: "",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as any, stiffness: 300, damping: 24 },
  },
};

export default function LandListings({
  onPropertySelect,
  selectedPropertyId,
}: {
  onPropertySelect?: (prop: any) => void;
  selectedPropertyId?: string;
}) {
  return (
    <div className="flex-1 bg-surface-container-low p-6 lg:p-8 overflow-y-auto custom-scrollbar h-full relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-on-surface tracking-tight">
          Showing 86 Land Plots
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 relative"
      >
        {landProperties.map((property) => (
          <motion.div
            key={property.id}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onPropertySelect && onPropertySelect(property)}
            className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border-2 relative ${
              selectedPropertyId === property.id
                ? "border-primary shadow-md shadow-brand-700/15"
                : "border-outline-variant"
            }`}
          >
            {/* NO LINK OVERLAY, onClick is at the parent level */}

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-tertiary/20 via-primary/15 to-secondary/20">
              {property.image ? (
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icons.maximize className="size-16 text-on-surface-variant/30" strokeWidth={1} />
                </div>
              )}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/20">
                <span
                  className={`text-xs font-bold tracking-wide ${property.typeColor}`}
                >
                  {property.type}
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-bold text-lg text-on-surface leading-tight truncate group-hover:text-primary transition-colors">
                  {property.title}
                </h3>
                <button className="shrink-0 w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200">
                  <Icons.bookmark size={16} strokeWidth={2.5} />
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant mb-5">
                <Icons.mapPin size={14} strokeWidth={2.5} className="text-outline" />
                <span className="text-xs font-medium truncate">
                  {property.location}
                </span>
              </div>
              <div className="mt-auto"></div>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/50">
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-lg text-on-surface">
                    {property.price}
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    {property.period}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant">
                  <Icons.maximize size={14} className="text-secondary" />
                  <span className="text-sm font-bold text-on-surface">
                    {property.area}
                  </span>
                  <span className="text-xs font-medium text-outline">
                    {property.unit}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
