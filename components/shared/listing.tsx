"use client";

import { Icons } from "@/components/ui/icons";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

export const houseProperties = [
  {
    id: "1",
    title: "Dream House Reality",
    slug: "dream-house-reality",
    location: "Bhaisepati, Lalitpur, Nepal",
    price: "NPR 1.5 Lakh",
    period: "/month",
    rating: "4.9",
    type: "Home",
    typeColor: "text-primary",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Atap Langit Homes",
    slug: "atap-langit-homes",
    location: "Sanepa Heights, Lalitpur",
    price: "NPR 85,000",
    period: "/month",
    rating: "4.7",
    type: "Apartment",
    typeColor: "text-tertiary",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Midnight Ridge Villa",
    slug: "midnight-ridge-villa",
    location: "Budhanilkantha, Kathmandu",
    price: "NPR 3.2 Lakh",
    period: "/month",
    rating: "4.8",
    type: "Villa",
    typeColor: "text-secondary",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Unity Urban Homes",
    slug: "unity-urban-homes",
    location: "Baluwatar, Kathmandu",
    price: "NPR 1.2 Lakh",
    period: "/month",
    rating: "4.7",
    type: "Home",
    typeColor: "text-primary",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "Lalaland Thick Villa",
    slug: "lalaland-thick-villa",
    location: "Godawari, Lalitpur",
    price: "NPR 2.5 Lakh",
    period: "/month",
    rating: "4.7",
    type: "Villa",
    typeColor: "text-secondary",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    title: "Valley View Apartments",
    slug: "valley-view-apartments",
    location: "Jhamsikhel, Lalitpur",
    price: "NPR 95,000",
    period: "/month",
    rating: "4.6",
    type: "Apartment",
    typeColor: "text-tertiary",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export default function PropListings({
  onToggleFilter,
  onSelectProperty,
}: {
  onToggleFilter?: () => void;
  onSelectProperty?: (prop: any) => void;
}) {
  return (
    <div className="flex-1 bg-surface-container-low p-6 lg:p-8 overflow-y-auto custom-scrollbar h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-on-surface tracking-tight">
          Showing 124 Properties
        </h2>
        <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
          <button
            onClick={onToggleFilter}
            className="lg:hidden flex items-center px-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-semibold hover:bg-surface-container-low transition-colors text-on-surface"
          >
            Filters
          </button>
          <span className="hidden sm:inline">Sort by:</span>
          <select className="bg-transparent border-none focus:ring-0 text-on-surface font-semibold cursor-pointer outline-none">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
      >
        {houseProperties.map((property) => (
          <div
            key={property.id}
            onClick={() => onSelectProperty?.(property)}
            className="block focus:outline-none cursor-pointer"
          >
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-navy-900/5 border border-outline-variant transition-shadow duration-300 group cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-high">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

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
                  <Icons.mapPin
                    size={14}
                    strokeWidth={2.5}
                    className="text-outline"
                  />
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

                  <div className="flex items-center gap-1">
                    <Icons.star size={14} className="text-tertiary fill-tertiary" />
                    <span className="text-sm font-bold text-on-surface">
                      {property.rating}
                    </span>
                    <span className="text-xs font-medium text-outline">/5</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
