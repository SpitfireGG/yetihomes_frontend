"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faRulerCombined,
  faHeart,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  LandingCarouselSection,
} from "./landing-carousel-section";
import type {
  PropertyShowcaseEyebrowTone,
  PropertyShowcaseListing,
  PropertyShowcaseStatKind,
} from "./property-showcase-types";

const statIcons: Record<PropertyShowcaseStatKind, typeof faBed> = {
  bed: faBed,
  bath: faBath,
  area: faRulerCombined,
  road: faRulerCombined,
  facing: faRulerCombined,
};

function getBadgeClasses(tone: PropertyShowcaseEyebrowTone) {
  if (tone === "warm") {
    return "bg-primary text-white";
  }

  if (tone === "cool") {
    return "bg-secondary text-white";
  }

  return "bg-surface-container-lowest/90 text-on-surface backdrop-blur-md";
}

function ListingCard({ listing }: { listing: PropertyShowcaseListing }) {
  const [activeImg, setActiveImg] = useState(0);

  const nextImage = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveImg((prev) => (prev === listing.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1));
  };

  return (
    <article className="group flex h-full w-full cursor-pointer flex-col">
      <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[24px] bg-surface-container-high shadow-sm">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeImg * 100}%)` }}
        >
          {listing.images.map((image, index) => (
            <div
              key={`${listing.id}-image-${index}`}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={image}
                alt={`${listing.title} view ${index + 1}`}
                fill
                sizes="(max-width: 768px) 85vw, (max-width: 1024px) 380px, 400px"
                className="pointer-events-none object-cover"
              />
            </div>
          ))}
        </div>

        {listing.eyebrow ? (
          <div className="absolute left-4 top-4 z-20">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] shadow-sm ${getBadgeClasses(listing.eyebrow.tone)}`}
            >
              {listing.eyebrow.label}
            </span>
          </div>
        ) : null}

        <button
          type="button"
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-primary"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <FontAwesomeIcon icon={faHeart} className="text-sm" />
        </button>

        {listing.images.length > 1 ? (
          <div className="absolute inset-0 z-20 flex items-center justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={prevImage}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-on-surface shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs -ml-0.5" />
            </button>
            <button
              onClick={nextImage}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-on-surface shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-xs -mr-0.5"
              />
            </button>
          </div>
        ) : null}

        {listing.images.length > 1 ? (
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5">
            {listing.images.map((_, index) => (
              <div
                key={`${listing.id}-dot-${index}`}
                className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${
                  activeImg === index ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        ) : null}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

        <Link href={listing.href} className="absolute inset-0 z-10">
          <span className="sr-only">View full details for {listing.title}</span>
        </Link>
      </div>

      <div className="w-full min-w-0 space-y-2 px-1">
        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 pr-2 text-xl font-bold leading-snug tracking-tight text-on-surface">
              {listing.title}
            </h3>
            <p className="truncate text-sm text-on-surface-variant">
              {listing.location}
            </p>
          </div>
          <span className="shrink-0 whitespace-nowrap pl-2 text-lg text-on-surface">
            {listing.price}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 pt-2 text-on-surface-variant">
          {listing.stats.map((stat) => {
            const Icon = statIcons[stat.kind];

            return (
              <span
                key={`${listing.id}-${stat.kind}`}
                className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-widest"
              >
                <FontAwesomeIcon icon={Icon} className="text-outline" />
                {stat.value} {stat.label}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function SimilarListings({
  listings,
}: {
  listings: PropertyShowcaseListing[];
}) {
  if (listings.length === 0) {
    return null;
  }

  return (
    <LandingCarouselSection
      title="More Properties you might love"
      items={listings}
      getItemKey={(listing) => listing.id}
      renderItem={(listing) => <ListingCard listing={listing} />}
    />
  );
}
