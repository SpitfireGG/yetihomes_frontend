"use client";

import { Icons } from "@/components/ui/icons";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  propertyRouteSegments,
  type PropertyStatIcon,
  type PropertyType,
} from "@/data/property-catalog";
import type { SearchProperty } from "@/lib/api";
import { formatNprPrice, getPrimaryImageUrl } from "@/lib/api";
import { writePropertyDetailCache } from "@/lib/property-detail-cache";

const iconMap: Record<PropertyStatIcon, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> =
  {
    area: Icons.maximize,
    bedroom: Icons.bedDouble,
    bathroom: Icons.bathroom,
    kitchen: Icons.chefHat,
    garage: Icons.car,
    floor: Icons.layers,
    parking: Icons.car,
    furnishing: Icons.armchair,
    road: Icons.navigation,
    facing: Icons.compass,
    title: Icons.file,
    landUse: Icons.building,
    balcony: Icons.grid2X2,
    lift: Icons.building,
  };

type OverviewChip = {
  icon: PropertyStatIcon;
  value: string;
};

export default function PropertyDetailsPanel({
  property,
  detailsHref,
  propertyType,
  onClose,
}: {
  property?: SearchProperty;
  detailsHref?: string;
  propertyType: PropertyType;
  onClose?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("Overview");
  const router = useRouter();

  useEffect(() => {
    if (!property) {
      return;
    }

    writePropertyDetailCache(property);
  }, [property]);

  const warmPropertyDetail = useCallback(() => {
    if (!property) {
      return;
    }

    const resolvedHref =
      detailsHref ?? `${propertyRouteSegments[propertyType]}/${property.slug}`;

    writePropertyDetailCache(property);
    void router.prefetch(resolvedHref);
  }, [detailsHref, property, propertyType, router]);

  if (!property) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface text-center text-on-surface-variant font-medium">
        Select a property to view details
      </div>
    );
  }

  const resolvedDetailsHref =
    detailsHref ?? `${propertyRouteSegments[propertyType]}/${property.slug}`;

  const primaryImage = getPrimaryImageUrl(property.images, undefined, property, 0);
  const image2 = property.images[1]
    ? getPrimaryImageUrl([property.images[1]], undefined, property, 1)
    : primaryImage;
  const image3 = property.images[2]
    ? getPrimaryImageUrl([property.images[2]], undefined, property, 2)
    : primaryImage;
  const overviewChips: OverviewChip[] = [];

  if (property.houseDetails?.bedrooms) {
    overviewChips.push({
      icon: "bedroom",
      value: `${property.houseDetails.bedrooms} Bed`,
    });
  }

  if (property.apartmentDetails?.bedrooms) {
    overviewChips.push({
      icon: "bedroom",
      value: `${property.apartmentDetails.bedrooms} Bed`,
    });
  }

  if (property.houseDetails?.bathrooms) {
    overviewChips.push({
      icon: "bathroom",
      value: `${property.houseDetails.bathrooms} Bath`,
    });
  }

  if (property.apartmentDetails?.bathrooms) {
    overviewChips.push({
      icon: "bathroom",
      value: `${property.apartmentDetails.bathrooms} Bath`,
    });
  }

  if (property.houseDetails?.floors) {
    overviewChips.push({
      icon: "floor",
      value: `${property.houseDetails.floors} Floors`,
    });
  }

  if (property.houseDetails?.parkingSpaces || property.apartmentDetails?.hasParking) {
    overviewChips.push({
      icon: "parking",
      value: "Parking",
    });
  }

  if (property.landDetails?.roadAccessFeet) {
    overviewChips.push({
      icon: "road",
      value: `${property.landDetails.roadAccessFeet}ft Road`,
    });
  }

  if (property.areaValue) {
    overviewChips.push({
      icon: "area",
      value: `${property.areaValue} ${property.areaUnit?.replace("_", " ")}`,
    });
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto bg-surface-container-lowest px-4 py-4 text-on-surface shadow-none custom-scrollbar sm:px-6 sm:py-6 xl:w-[500px] xl:shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full border border-outline-variant/60 bg-surface-container-lowest/90 p-2 shadow-sm backdrop-blur-md xl:hidden"
        >
          <Icons.close size={20} className="text-on-surface-variant" />
        </button>
      )}

      <div className="mt-10 mb-6 flex h-40 shrink-0 gap-2.5 sm:mt-2 sm:h-52 sm:gap-3 lg:h-56">
        <div className="relative w-[65%] h-full rounded-2xl overflow-hidden shadow-sm">
<Image
  src={primaryImage}
  alt={property.title}
  fill
  sizes="(max-width: 768px) 100vw, 520px"
  className="object-cover"
/>
        </div>
        <div className="flex flex-col gap-3 w-[35%] h-full">
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-sm">
<Image
  src={image2}
  fill
  sizes="(max-width: 768px) 50vw, 260px"
  className="object-cover scale-110"
  alt={`${property.title} view 2`}
/>
          </div>
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-sm">
<Image
  src={image3}
  fill
  sizes="(max-width: 768px) 50vw, 260px"
  className="object-cover scale-125 origin-top-left"
  alt={`${property.title} view 3`}
/>
          </div>
        </div>
      </div>

      <div className="mb-6 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 sm:pr-4">
          <h2 className="mb-2 font-headline text-xl font-semibold leading-tight tracking-tight text-on-surface sm:text-2xl">
            {property.title}
          </h2>
          <div className="flex items-center text-sm font-medium text-on-surface-variant">
            <Icons.mapPin
              size={16}
              className="mr-1.5 shrink-0 text-primary"
              fill="currentColor"
            />
            <span className="truncate">{property.locationText}</span>
          </div>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <div className="flex items-baseline gap-1 font-headline text-xl font-semibold tracking-tight text-on-surface sm:justify-end sm:text-2xl">
            <span>{formatNprPrice(property.priceAmount)}</span>
          </div>
          <div className="mt-0.5 text-[13px] font-medium tracking-wide text-on-surface-variant">
            {property.pricePeriod === "MONTHLY" ? "/mo" : property.pricePeriod === "YEARLY" ? "/yr" : "Total"}
          </div>
        </div>
      </div>

      <div className="relative mb-6 flex shrink-0 border-b border-outline-variant/60">
        {["Overview", "About"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 pb-3 text-[15px] font-semibold transition-colors ${
              activeTab === tab
                ? "text-on-surface"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="detailsTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "Overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col h-full"
            >
              <div className="mb-6 shrink-0">
                <h3 className="mb-3 text-[15px] font-semibold text-on-surface">
                  Description :
                </h3>
                <p className="text-sm font-medium leading-relaxed text-on-surface-variant line-clamp-4">
                  {property.summary || "No description provided."}
                </p>
              </div>

              <div className="mb-8 flex shrink-0 flex-wrap gap-2.5">
                {overviewChips.map((item) => {
                    const Icon = iconMap[item.icon as PropertyStatIcon];
                    if (!Icon) return null;

                    return (
                      <div
                        key={`${item.icon}-${item.value}`}
                        className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-3.5 py-2.5 text-[13px] font-semibold text-on-surface-variant sm:px-4"
                      >
                        <Icon
                          size={16}
                          className="shrink-0 text-outline"
                          strokeWidth={2.5}
                        />
                        <span>{item.value}</span>
                      </div>
                    );
                  })}
              </div>

              <div className="mb-8 flex shrink-0 flex-col gap-3 sm:flex-row sm:gap-4">
                <button className="flex-1 rounded-[24px] border border-primary/10 bg-primary/10 py-4 text-[15px] font-semibold text-primary transition-colors hover:bg-primary/20">
                  Contact Agent
                </button>
                <Link
                  href={resolvedDetailsHref}
                  prefetch
                  onMouseEnter={warmPropertyDetail}
                  onFocus={warmPropertyDetail}
                  onClick={warmPropertyDetail}
                  className="flex-1 rounded-[24px] bg-primary py-4 text-center text-[15px] font-semibold text-on-primary shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
                >
                  View Full Details
                </Link>
              </div>

              <div className="relative mt-auto mb-4 flex aspect-[4/3] w-full shrink-0 flex-col items-center justify-center overflow-hidden rounded-[24px] bg-surface-container-low shadow-inner">
                <svg
                  className="absolute inset-0 h-full w-full text-outline-variant"
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 50L150 100L250 20L400 60V300H0V50Z" fill="white" />
                  <path
                    d="M10 200L120 180H200L250 150L300 180H400"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <path d="M150 100V180" stroke="currentColor" strokeWidth="8" />
                  <path d="M250 20V150" stroke="currentColor" strokeWidth="8" />
                  <rect x="50" y="80" width="40" height="30" fill="#DAE6ED" />
                  <rect x="280" y="220" width="60" height="40" fill="#DAE6ED" />
                  <rect x="180" y="240" width="30" height="30" fill="#DAE6ED" />
                  <rect x="30" y="250" width="40" height="20" fill="#E8F1D2" />
                  <rect x="220" y="100" width="60" height="30" fill="#E8F1D2" />
                  <rect x="300" y="100" width="80" height="50" fill="#E8F1D2" />
                  <path
                    d="M0 250Q150 300 250 240T400 280"
                    stroke="#D1EAFE"
                    strokeWidth="20"
                    fill="none"
                  />
                </svg>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-20 flex w-[240px] items-center gap-3 rounded-xl bg-surface-container-lowest/95 p-2.5 shadow-xl backdrop-blur-md sm:w-[280px] -translate-y-4"
                >
                  <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 shadow-sm">
                    <Image
                      src={primaryImage}
                      fill
                      className="object-cover"
                      alt="Thumb"
                    />
                  </div>
                  <div className="min-w-0 pr-1 flex-1">
                    <h4 className="truncate text-[11px] font-semibold text-on-surface">
                      {property.title}
                    </h4>
                    <p className="mt-0.5 truncate text-[9px] font-medium text-on-surface-variant">
                      {property.locationText}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-[20%] right-[15%]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <div className="w-6 h-6 bg-[#16A34A] rounded-full border-[3px] border-white shadow-md" />
                </motion.div>

                <motion.div
                  className="absolute bottom-[20%] left-[10%]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <div className="w-6 h-6 bg-[#FBBF24] rounded-full border-[3px] border-white shadow-md" />
                </motion.div>

                <motion.div
                  className="absolute bottom-[10%] right-[15%]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  <div className="w-6 h-6 bg-primary rounded-full border-[3px] border-white shadow-md" />
                </motion.div>

                <motion.div
                  className="absolute top-[40%] left-[30%]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 rounded-full scale-150 animate-pulse" />
                    <div className="relative w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-sm">
                      <div className="w-5 h-5 bg-primary rounded-full shadow-lg shadow-primary/50 border-2 border-white" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "About" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="py-2 text-sm font-medium leading-relaxed text-on-surface-variant"
            >
              {property.summary || "More details coming soon."}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
