import { LandListingCard } from "./featured-lands-listing";
import Link from "next/link";
import SectionHeading from "../shared/sectionHeading";
import type { PropertyShowcaseListing } from "./property-showcase-types";

export function FeaturedListingsSection({
  listings = [],
  title = "Featured Lands",
  viewAllHref,
}: {
  listings?: PropertyShowcaseListing[];
  title?: string;
  viewAllHref?: string;
}) {
  if (listings.length === 0) {
    return null;
  }

  return (
    <section id="collections" className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionHeading title={title} />
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="shrink-0 text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
          >
            View All {title}
          </Link>
        )}
      </div>

      {/* Added pb-12 here as well to account for the translate-y-12 dropdown */}
      <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing, index) => {
          const isMiddleColumn = index % 3 === 1;

          return (
            <LandListingCard
              key={listing.id}
              listing={{ ...listing, offset: isMiddleColumn }}
            />
          );
        })}
      </div>
    </section>
  );
}
