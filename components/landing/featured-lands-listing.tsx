import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { HeartIcon, RulerIcon } from "./icons";
import type {
  PropertyShowcaseListing,
  PropertyShowcaseStatKind,
} from "./property-showcase-types";

const statIcons: Record<
  PropertyShowcaseStatKind,
  ComponentType<{ className?: string }>
> = {
  bed: RulerIcon,
  bath: RulerIcon,
  area: RulerIcon,
  road: Icons.navigation,
  facing: Icons.compass,
};

export function LandListingCard({
  listing,
}: {
  listing: PropertyShowcaseListing;
}) {
  return (
    <article
      className={`group flex flex-col ${
        listing.offset ? "lg:translate-y-12" : ""
      }`}
    >
      <div className="relative mb-4 aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-[20px]">
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
          className="absolute bottom-4 right-4 z-20 inline-flex size-12 items-center justify-center rounded-full bg-white/18 text-white backdrop-blur-md transition-all hover:bg-white hover:text-on-surface"
        >
          <HeartIcon className="size-5" />
        </button>

        <Link href={listing.href} className="absolute inset-0 z-10">
          <span className="sr-only">View full details for {listing.title}</span>
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-headline text-2xl font-bold tracking-[-0.04em] text-on-surface">
              {listing.title}
            </h3>
            <p className="mt-1 text-base text-on-surface-variant/85">
              {listing.location}
            </p>
          </div>
          <span className="font-label text-xl font-medium text-on-surface-variant">
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
