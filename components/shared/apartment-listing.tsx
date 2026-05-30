"use client";

import { Icons } from "@/components/ui/icons";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const apartmentProperties = [
  {
    id: "a1",
    slug: "luxury-central-penthouse",
    title: "Luxury Central Penthouse",
    location: "Patan Dhoka, Lalitpur",
    price: "NPR 3.5 Cr",
    period: "Total",
    rating: "4.9",
    type: "Penthouse",
    typeColor: "text-primary",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    floor: "12th Floor",
    rooms: "4 Beds",
  },
  {
    id: "a2",
    slug: "himalaya-view-residences",
    title: "Himalaya View Residences",
    location: "Baluwatar, Kathmandu",
    price: "NPR 1.8 Cr",
    period: "Total",
    rating: "4.7",
    type: "Apartment",
    typeColor: "text-secondary",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    floor: "8th Floor",
    rooms: "3 Beds",
  },
  {
    id: "a3",
    slug: "studio-zen-sanepa",
    title: "Studio Zen Sanepa",
    location: "Sanepa, Lalitpur",
    price: "NPR 85 Lakh",
    period: "Total",
    rating: "4.8",
    type: "Studio",
    typeColor: "text-tertiary",
    image: "https://images.unsplash.com/photo-1502672260266-1c1e52b154ce?auto=format&fit=crop&w=800&q=80",
    floor: "3rd Floor",
    rooms: "1 Bed",
  },
  {
    id: "a4",
    slug: "skyline-condo-jhamsikhel",
    title: "Skyline Condo Jhamsikhel",
    location: "Jhamsikhel, Lalitpur",
    price: "NPR 2.2 Cr",
    period: "Total",
    rating: "4.6",
    type: "Condo",
    typeColor: "text-primary",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    floor: "5th Floor",
    rooms: "3 Beds",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as any, stiffness: 300, damping: 24 },
  },
};

export default function ApartmentListings({ onToggleFilter, onSelectProperty }: { onToggleFilter?: () => void; onSelectProperty?: (prop: any) => void }) {
  return (
    <div className="flex-1 bg-surface-container-low p-6 lg:p-8 overflow-y-auto custom-scrollbar h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-on-surface tracking-tight">
          Showing 4 Exclusive Apartments
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
        {apartmentProperties.map((property) => (
          <div key={property.id} onClick={() => onSelectProperty?.(property)} className="block focus:outline-none cursor-pointer">
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
                  sizes="(max-width: 768px) 100vw, 50vw"
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
                  <Icons.mapPin size={14} strokeWidth={2.5} className="text-outline" />
                  <span className="text-xs font-medium truncate">
                    {property.location}
                  </span>
                </div>

                <div className="mt-auto"></div>

                <div className="flex items-center gap-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4 border-b border-outline-variant/30 pb-4">
                  <span>{property.floor}</span>
                  <span className="w-1 h-1 bg-outline rounded-full"></span>
                  <span>{property.rooms}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-lg text-on-surface">
                      {property.price}
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
