"use client";

import { Icons } from "@/components/ui/icons";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/landing/footer";
import NeighborhoodExplorer from "@/components/shared/explorer";
import type { PropertyType } from "@/data/property-catalog";
import type { SearchProperty } from "@/lib/api";
import { formatNprPrice, getPrimaryImageUrl, submitInquiry } from "@/lib/api";

const AGENTS = [
  { name: "Kritika", image: "/teams/kritikaFace.jpg", phone: "9779768998508" },
  { name: "Ngima", image: "/teams/ngimaFace.jpeg", phone: "9779851446901" },
  { name: "Suresh", image: "/teams/team1.jpeg", phone: "9779851361431" },
];

type SpecItem = {
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  label: string;
  value: string;
};

type PageContent = {
  backHref: string;
  backLabel: string;
  aboutTitle: [string, string];
  detailsTitle: [string, string];
  otherDetailsTitle: [string, string];
  quickSpecs: SpecItem[];
  detailSpecs: SpecItem[];
  otherDetails: SpecItem[];
  agentRole: string;
  agentDescription: string;
  primaryAction: string;
  secondaryAction: string;
};

const galleryFallbacks: Record<PropertyType, string[]> = {
  house: [
    "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1584738766473-61c083514bf4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  ],
  land: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
  ],
  apartment: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  ],
};

function getGalleryImages(property: SearchProperty) {
  const customImages = property.images?.map((img) => getPrimaryImageUrl([img])) || [];

  const typeMap: Record<string, PropertyType> = {
    HOUSE: "house",
    LAND: "land",
    APARTMENT: "apartment",
  };

  const propType = typeMap[property.propertyType] || "house";

  const candidates = [...customImages, ...galleryFallbacks[propType]];

  return candidates.slice(0, 5);
}

function getPageContent(property: SearchProperty, agentName: string): PageContent {
  switch (property.propertyType) {
    case "HOUSE":
      return {
        backHref: "/houses",
        backLabel: "Back to Houses",
        aboutTitle: ["About", "This Home"],
        detailsTitle: ["Property", "Details"],
        otherDetailsTitle: ["Other", "Details"],
        quickSpecs: [
          ...(property.areaValue
            ? [
              {
                icon: Icons.maximize,
                label: "Built-up Area",
                value: `${property.areaValue} ${property.areaUnit?.replace("_", " ")}`,
              },
            ]
            : []),
          ...(property.houseDetails?.bedrooms
            ? [
              {
                icon: Icons.bedDouble,
                label: "Bedrooms",
                value: `${property.houseDetails.bedrooms} Beds`,
              },
            ]
            : []),
          ...(property.houseDetails?.bathrooms
            ? [
              {
                icon: Icons.bathroom,
                label: "Bathrooms",
                value: `${property.houseDetails.bathrooms} Baths`,
              },
            ]
            : []),
        ],
        detailSpecs: [
          {
            icon: Icons.maximize,
            label: "Area",
            value: property.areaValue ? `${property.areaValue} ${property.areaUnit?.replace("_", " ") || ""}` : "N/A",
          },
          {
            icon: Icons.layers,
            label: "Floors",
            value: String(property.houseDetails?.floors || "N/A"),
          },
          {
            icon: Icons.bedDouble,
            label: "Bedrooms",
            value: `${property.houseDetails?.bedrooms || 0} Beds`,
          },
          {
            icon: Icons.bathroom,
            label: "Bathrooms",
            value: `${property.houseDetails?.bathrooms || 0} Baths`,
          },
          {
            icon: Icons.chefHat,
            label: "Kitchens",
            value: `${property.houseDetails?.kitchens || 0} Kitchens`,
          },
          {
            icon: Icons.car,
            label: "Parking",
            value: String(property.houseDetails?.parkingSpaces || "N/A"),
          },
          {
            icon: Icons.armchair,
            label: "Furnishing",
            value:
              property.houseDetails?.furnishingStatus?.replace("_", " ") ||
              "N/A",
          },
          {
            icon: Icons.calendar,
            label: "Build Year",
            value: String(property.houseDetails?.buildYear || "N/A"),
          },
          {
            icon: Icons.droplet,
            label: "Water",
            value: property.waterAvailability || "N/A",
          },
          {
            icon: Icons.zap,
            label: "Electricity",
            value: property.electricity || "N/A",
          },
        ],
        otherDetails: [
          { icon: Icons.building, label: "Type", value: property.houseDetails?.subType?.replace("_", " ") || "House" },
          { icon: Icons.file, label: "Title Status", value: property.titleStatus?.replace("_", " ") || "N/A" },
        ],
        agentRole: "Residential Advisory Team",
        agentDescription:
          `Hi, I'm ${agentName} from YetiHomes Estate. We help buyers validate floor planning, neighborhood fit, and visit timing before moving forward with a home purchase.`,
        primaryAction: "Schedule Tour",
        secondaryAction: "Request Details",
      };

    case "LAND":
      return {
        backHref: "/lands",
        backLabel: "Back to Lands",
        aboutTitle: ["About", "This Land"],
        detailsTitle: ["Property", "Details"],
        otherDetailsTitle: ["Dossier", "Intelligence"],
        quickSpecs: [
          ...(property.areaValue
            ? [
              {
                icon: Icons.maximize,
                label: "Land Area",
                value: `${property.areaValue} ${property.areaUnit?.replace("_", " ")}`,
              },
            ]
            : []),
          ...(property.landDetails?.roadAccessFeet
            ? [
              {
                icon: Icons.navigation,
                label: "Access",
                value: `${property.landDetails.roadAccessFeet}ft Road`,
              },
            ]
            : []),
          ...(property.landDetails?.facingDirection
            ? [
              {
                icon: Icons.compass,
                label: "Facing",
                value: property.landDetails.facingDirection.replace("_", " "),
              },
            ]
            : []),
        ],
        detailSpecs: [
          {
            icon: Icons.maximize,
            label: "Land Area",
            value: property.areaValue ? `${property.areaValue} ${property.areaUnit?.replace("_", " ") || ""}` : "N/A",
          },
          {
            icon: Icons.navigation,
            label: "Road Access",
            value: `${property.landDetails?.roadAccessFeet || "N/A"}ft Road`,
          },
          {
            icon: Icons.compass,
            label: "Facing",
            value:
              property.landDetails?.facingDirection?.replace("_", " ") || "N/A",
          },
          {
            icon: Icons.file,
            label: "Title",
            value: property.titleStatus?.replace("_", " ") || "N/A",
          },
          {
            icon: Icons.droplet,
            label: "Water",
            value: property.waterAvailability || "N/A",
          },
          {
            icon: Icons.zap,
            label: "Electricity",
            value: property.electricity || "N/A",
          },
        ],
        otherDetails: [
          { icon: Icons.building, label: "Land Use", value: property.landDetails?.subType?.replace("_", " ") || "Land" },
          { icon: Icons.file, label: "Title Status", value: property.titleStatus?.replace("_", " ") || "N/A" },
          { icon: Icons.navigation, label: "Corner Plot", value: property.landDetails?.isCornerPlot ? "Yes" : "No" },
        ],
        agentRole: "Land Advisory Team",
        agentDescription:
          `Hi, I'm ${agentName} from YetiHomes Estate. We facilitate the acquisition of land parcels and help buyers review site access, owner paperwork, and utility readiness before due diligence.`,
        primaryAction: "Schedule Tour",
        secondaryAction: "Request Details",
      };

    case "APARTMENT":
      return {
        backHref: "/apartments",
        backLabel: "Back to Apartments",
        aboutTitle: ["About", "This Apartment"],
        detailsTitle: ["Property", "Details"],
        otherDetailsTitle: ["Other", "Details"],
        quickSpecs: [
          ...(property.areaValue
            ? [
              {
                icon: Icons.maximize,
                label: "Built-up Area",
                value: `${property.areaValue} ${property.areaUnit?.replace("_", " ")}`,
              },
            ]
            : []),
          ...(property.apartmentDetails?.floorNumber
            ? [
              {
                icon: Icons.layers,
                label: "Floor",
                value: String(property.apartmentDetails.floorNumber),
              },
            ]
            : []),
          ...(property.apartmentDetails?.bedrooms
            ? [
              {
                icon: Icons.bedDouble,
                label: "Bedrooms",
                value: `${property.apartmentDetails.bedrooms} Beds`,
              },
            ]
            : []),
        ],
        detailSpecs: [
          {
            icon: Icons.maximize,
            label: "Built-up Area",
            value: property.areaValue ? `${property.areaValue} ${property.areaUnit?.replace("_", " ") || ""}` : "N/A",
          },
          {
            icon: Icons.layers,
            label: "Floor / Total",
            value: `${property.apartmentDetails?.floorNumber || "?"} of ${property.apartmentDetails?.totalFloors || "?"}`,
          },
          {
            icon: Icons.bedDouble,
            label: "Bedrooms",
            value: `${property.apartmentDetails?.bedrooms || 0} Beds`,
          },
          {
            icon: Icons.bathroom,
            label: "Bathrooms",
            value: `${property.apartmentDetails?.bathrooms || 0} Baths`,
          },
          {
            icon: Icons.grid2X2,
            label: "Balconies",
            value: String(property.apartmentDetails?.balconies || 0),
          },
          {
            icon: Icons.armchair,
            label: "Furnishing",
            value:
              property.apartmentDetails?.furnishingStatus?.replace("_", " ") ||
              "N/A",
          },
          {
            icon: Icons.building,
            label: "Lift",
            value: property.apartmentDetails?.hasLift ? "Yes" : "No",
          },
          {
            icon: Icons.car,
            label: "Parking",
            value: property.apartmentDetails?.hasParking ? "Yes" : "No",
          },
        ],
        otherDetails: [
          {
            icon: Icons.building,
            label: "Unit Type",
            value:
              property.apartmentDetails?.subType?.replace("_", " ") ||
              "Apartment",
          },
        ],
        agentRole: "Apartment Sales Team",
        agentDescription:
          `Hi, I'm ${agentName} from YetiHomes Estate. We help buyers review floor plans, maintenance expectations, and possession details before booking a private apartment tour.`,
        primaryAction: "Schedule Tour",
        secondaryAction: "Request Details",
      };

    default:
      return {
        // Fallback
        backHref: "/",
        backLabel: "Back",
        aboutTitle: ["About", "This Property"],
        detailsTitle: ["Property", "Details"],
        otherDetailsTitle: ["Other", "Details"],
        quickSpecs: [],
        detailSpecs: [],
        otherDetails: [],
        agentRole: "YetiHomes Team",
        agentDescription: `Hi, I'm ${agentName} from YetiHomes Estate. We can help you with this property.`,
        primaryAction: "Contact",
        secondaryAction: "Details",
      };
  }
}

function SectionTitle({ lines }: { lines: [string, string] }) {
  return (
    <h2 className="text-xl font-medium text-black">
      {lines[0]}
      <br />
      {lines[1]}
    </h2>
  );
}

export default function PropertySlugTemplate({
  property,
}: {
  property: SearchProperty;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasLiked, setHasLiked] = useState(false);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const galleryImages = getGalleryImages(property);
  const assignedAgent = AGENTS[(property.id.charCodeAt(0) || 0) % AGENTS.length];
  const content = getPageContent(property, assignedAgent.name);

  // Generate deterministic view count
  const viewCount = 100 + ((property.id.charCodeAt(property.id.length - 1) || 0) * 7);

  return (
    <main className="min-h-screen bg-white font-sans text-[#111111] pb-24">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 flex items-center justify-between">
        <Link
          href={content.backHref}
          className="flex items-center gap-3 text-[11px] font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-[0.2em]"
        >
          <Icons.arrowLeft size={16} strokeWidth={1.5} /> {content.backLabel}
        </Link>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {property.isVerified && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[12px] uppercase font-bold tracking-widest rounded-full flex items-center gap-1">
                <Icons.check size={14} strokeWidth={3} /> Verified
              </span>
            )}
            {property.isOwnerApproved && (
              <span className="text-blue-600 text-[11px] uppercase font-bold tracking-widest flex items-center gap-1.5 mt-0.5">
                <div className="bg-blue-600 text-white rounded-sm w-4 h-4 flex items-center justify-center">
                  <Icons.check size={12} strokeWidth={4} />
                </div>
                Owner Approved
              </span>
            )}
            {property.badgeLabel && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] uppercase font-bold tracking-widest rounded-full">
                {property.badgeLabel}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight text-black mb-4 leading-[1.1]">
            {property.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-gray-500 text-lg">
              <Icons.mapPin size={18} strokeWidth={1.5} />
              <span className="font-medium">{property.locationText}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-[15px] font-medium border-l border-gray-200 pl-6">
              <Icons.eye size={18} strokeWidth={1.5} />
              <span>{viewCount} people viewed this property</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-colors text-gray-700 hover:text-black">
            <Icons.share size={16} strokeWidth={1.5} />
          </button>
          <a
            href="tel:+9779812345678"
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-colors text-gray-700 hover:text-black"
          >
            <Icons.phone size={16} strokeWidth={1.5} />
          </a>
          <button
            onClick={() => setHasLiked((previous) => !previous)}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${hasLiked
              ? "bg-black text-white border-black"
              : "border-gray-200 hover:border-black text-gray-700 hover:text-black"
              }`}
          >
            <Icons.favorite
              size={16}
              strokeWidth={1.5}
              className={hasLiked ? "fill-white" : ""}
            />
          </button>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mb-8">
        <div
          className="relative w-full h-[50vh] lg:h-[70vh] cursor-zoom-in group overflow-hidden bg-gray-100"
          onClick={() => setSelectedImage(galleryImages[0])}
        >
          <Image
            src={galleryImages[0]}
            alt={`${property.title} hero view`}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-10 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-black">
              {formatNprPrice(property.priceAmount)}
            </h2>
            {property.propertyType === "LAND" && (
              <span className="text-sm text-gray-500 font-medium tracking-wider mt-1 block">
                PER ANA
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-8 md:gap-16">
            {content.quickSpecs.map((spec) => (
              <div key={spec.label} className="flex items-start gap-4">
                <spec.icon
                  size={24}
                  strokeWidth={1.2}
                  className="text-gray-400 mt-0.5"
                />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
                    {spec.label}
                  </span>
                  <span className="text-xl font-medium text-black">
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col xl:flex-row gap-16 xl:gap-24">
        <div className="flex-1 min-w-0">
          <div className="mb-20 flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/4 shrink-0">
              <SectionTitle lines={content.aboutTitle} />
            </div>
            <div className="w-full md:w-3/4 prose prose-lg text-gray-600 font-medium leading-relaxed">
              <p className="mb-6">{property.summary}</p>
              <p>{property.description || "Further details have not been provided for this listing."}</p>
            </div>
          </div>

          <div className="mb-24 flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-1/4 shrink-0">
              <SectionTitle lines={content.detailsTitle} />
            </div>
            <div className="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
              {content.detailSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col gap-4 group items-start"
                >
                  <spec.icon
                    size={28}
                    strokeWidth={1.2}
                    className="text-gray-400 group-hover:text-black transition-colors duration-300"
                  />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      {spec.label}
                    </p>
                    <p className="font-medium text-xl tracking-tight text-black">
                      {spec.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full xl:w-[380px] xl:self-start shrink-0">
          <div className="sticky top-32 h-fit rounded-[32px] border border-outline-variant/40 bg-surface-container-lowest p-8 lg:p-10 flex flex-col items-center editorial-shadow">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-6 relative border-4 border-surface shadow-sm bg-gray-100">
              <Image
                src={assignedAgent.image}
                alt={`${assignedAgent.name} from YetiHomes Estate`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <h4 className="text-2xl font-medium tracking-tight text-black mb-1">
              {assignedAgent.name} <span className="text-sm text-gray-500 block text-center mt-1">YetiHomes Estate</span>
            </h4>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-8 mt-2">
              {content.agentRole}
            </p>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed text-center font-light">
              {content.agentDescription}
            </p>

            <div className="flex flex-col gap-4 w-full">
              <a
                href={`https://wa.me/${assignedAgent.phone}?text=${encodeURIComponent(`Hello ${assignedAgent.name}, I would like to schedule a tour for ${property.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl border border-outline-variant/40 bg-black py-4 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
              >
                <Icons.calendar size={14} strokeWidth={2} />
                {content.primaryAction}
              </a>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest py-4 text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:border-black transition-colors flex items-center justify-center gap-3"
              >
                <Icons.mail size={14} strokeWidth={2} />
                {content.secondaryAction}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/30 w-full text-center flex flex-col gap-3">
              <a href="tel:+9779768998508" className="inline-flex items-center justify-center gap-2 text-gray-800 hover:text-black transition-colors text-sm font-bold tracking-wider">
                <Icons.phoneCall size={16} strokeWidth={2} />
                +977 9768998508
              </a>
              <a href="tel:+9779851446901" className="inline-flex items-center justify-center gap-2 text-gray-800 hover:text-black transition-colors text-sm font-bold tracking-wider">
                <Icons.phoneCall size={16} strokeWidth={2} />
                +977 9851446901
              </a>
              <a href="tel:+9779851361431" className="inline-flex items-center justify-center gap-2 text-gray-800 hover:text-black transition-colors text-sm font-bold tracking-wider">
                <Icons.phoneCall size={16} strokeWidth={2} />
                +977 9851361431
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mt-24 mb-24 flex flex-col gap-4">
        {galleryImages[1] && (
          <div
            className="relative w-full h-[40vh] lg:h-[50vh] cursor-zoom-in group overflow-hidden bg-gray-100"
            onClick={() => setSelectedImage(galleryImages[1])}
          >
            <Image
              src={galleryImages[1]}
              alt={`${property.title} gallery image 2`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[50vh] lg:h-[60vh]">
          {galleryImages[2] && (
            <div
              className="relative w-full h-full cursor-zoom-in group overflow-hidden bg-gray-100"
              onClick={() => setSelectedImage(galleryImages[2])}
            >
              <Image
                src={galleryImages[2]}
                alt={`${property.title} gallery image 3`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          )}

          <div className="grid grid-rows-2 gap-4 h-full">
            {galleryImages[3] && (
              <div
                className="relative w-full h-full cursor-zoom-in group overflow-hidden bg-gray-100"
                onClick={() => setSelectedImage(galleryImages[3])}
              >
                <Image
                  src={galleryImages[3]}
                  alt={`${property.title} gallery image 4`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
            )}
            {galleryImages[4] && (
              <div
                className="relative w-full h-full cursor-zoom-in group overflow-hidden bg-gray-100"
                onClick={() => setSelectedImage(galleryImages[4])}
              >
                <Image
                  src={galleryImages[4]}
                  alt={`${property.title} gallery image 5`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                  <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">
                    View All Photos
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mb-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-gray-200 pt-16">
          <div className="w-full md:w-1/4 shrink-0">
            <SectionTitle lines={content.otherDetailsTitle} />
          </div>

          {/* Upgraded Authentic Other Details Section */}
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {content.otherDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex flex-col relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gray-200 hover:before:bg-black transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <detail.icon
                    size={18}
                    strokeWidth={1.5}
                    className="text-gray-400 group-hover:text-black transition-colors"
                  />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    {detail.label}
                  </p>
                </div>
                <p className="font-medium text-lg text-black mt-1">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-200 pt-16 mt-24">
        <NeighborhoodExplorer />
      </div>

      {/* Lightbox fixed to close on outside click */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white p-3 hover:opacity-70 transition-opacity z-50"
              onClick={() => setSelectedImage(null)}
            >
              <Icons.close size={32} strokeWidth={1} />
            </button>
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full h-full max-w-[90vw] max-h-[90vh] cursor-zoom-out"
            >
              <Image
                src={selectedImage}
                alt={`${property.title} expanded view`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Details Modal */}
      <AnimatePresence>
        {isRequestModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full relative editorial-shadow"
            >
              <button
                onClick={() => {
                  setIsRequestModalOpen(false);
                  setTimeout(() => setShowSuccess(false), 300);
                }}
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              >
                <Icons.close size={24} />
              </button>

              {showSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icons.check size={40} strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight text-black">Request Sent!</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    You will receive a call from our representative shortly to discuss your requirement.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-medium tracking-tight mb-2 text-black">Request Details</h3>
                  <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                    Leave your details and we will get back to you with more information about this property.
                  </p>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      try {
                        await submitInquiry({
                          ...inquiryForm,
                          inquiryType: "Property Details Request",
                          propertyId: property.id,
                          propertySlug: property.slug,
                        });
                        setShowSuccess(true);
                      } catch (error) {
                        console.error(error);
                        alert("Failed to send request. Please try again.");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Name</label>
                      <input
                        required
                        type="text"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl p-3.5 focus:outline-none focus:border-black transition-colors bg-gray-50/50"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Email</label>
                      <input
                        required
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl p-3.5 focus:outline-none focus:border-black transition-colors bg-gray-50/50"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Phone</label>
                      <input
                        required
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl p-3.5 focus:outline-none focus:border-black transition-colors bg-gray-50/50"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Message (Optional)</label>
                      <textarea
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl p-3.5 focus:outline-none focus:border-black transition-colors bg-gray-50/50 min-h-[100px] resize-y"
                        placeholder="Any specific questions?"
                      />
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-black text-white font-bold tracking-widest uppercase text-[11px] rounded-xl py-4 mt-2 hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                      {isSubmitting ? "Sending..." : "Submit Request"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
