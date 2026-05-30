import Image from "next/image";
import Link from "next/link";

import type {
  PropertyShowcaseListing,
  PropertyShowcaseStatKind,
} from "./property-showcase-types";

import { IconBath, IconBed, IconHeart, IconRulerMeasure, IconSofa, IconLayersSelected, IconCar } from "@tabler/icons-react";

const statIcons: Record<PropertyShowcaseStatKind, typeof IconBed> = {
  bed: IconBed,
  bath: IconBath,
  area: IconRulerMeasure,
  road: IconRulerMeasure,
  facing: IconRulerMeasure,
  parking: IconCar,
  floor: IconLayersSelected,
  furnishing: IconSofa,
};

export function ListingCard({ listing }: { listing: PropertyShowcaseListing }) {
  return (
    <article
      className={`group flex flex-col ${
        listing.offset ? "lg:translate-y-12" : ""
      }`}
    >
      <div className="relative mb-6 aspect-[4/3] sm:aspect-[3/5] lg:aspect-[4/5] overflow-hidden rounded-[28px]">
        <Image
          src={listing.image}
          alt={listing.imageAlt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {listing.eyebrow ? (
          <div className="absolute left-4 top-4">
            <span
              className={`inline-flex rounded-full px-3 py-1 font-label text-[0.62rem] font-bold uppercase tracking-[0.22em] ${
                listing.eyebrow.tone === "warm"
                  ? "bg-tertiary text-white"
                  : listing.eyebrow.tone === "cool"
                    ? "bg-secondary text-white"
                    : "bg-surface-container-lowest/85 text-on-surface backdrop-blur-md"
              }`}
            >
              {listing.eyebrow.label}
            </span>
          </div>
        ) : null}

        <button
          type="button"
          aria-label={`Save ${listing.title}`}
          className="absolute bottom-4 right-4 inline-flex size-12 items-center justify-center rounded-full bg-white/18 text-white backdrop-blur-md transition-all hover:bg-white hover:text-on-surface z-20"
        >
          <IconHeart className="size-5" />
        </button>

        <Link href={listing.href} className="absolute inset-0 z-10">
          <span className="sr-only">View full details for {listing.title}</span>
        </Link>
      </div>

      <div className="space-y-2 px-1 min-w-0 w-full">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <h3 className=" line-clamp truncate text-xl font-bold tracking-tight text-on-surface">
              {listing.title}
            </h3>
            <p className="truncate text-sm text-on-surface-variant">
              {listing.location}
            </p>
          </div>
          <span className="whitespace-nowrap text-lg text-on-surface shrink-0 pl-2">
            {listing.price}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 pt-2 text-outline">
          {listing.stats.map((stat) => {
            const Icon = statIcons[stat.kind];

            return (
              <span
                key={`${listing.title}-${stat.kind}`}
                className="inline-flex items-center gap-2 font-label text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
              >
                <Icon className="size-4" />
                {stat.value} {stat.label}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}
