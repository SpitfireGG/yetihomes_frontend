import { ListingCard } from "./listing-card";
import SectionHeading from "../shared/sectionHeading";
import type { PropertyShowcaseListing } from "./property-showcase-types";

export function FeaturedApartmentsSection({
  listings = [],
}: {
  listings?: PropertyShowcaseListing[];
}) {
  if (listings.length === 0) {
    return null;
  }

  return (
    <section id="apartments" className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionHeading title="Featured Apartments" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 xl:grid-cols-4">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={{ ...listing, offset: false }}
          />
        ))}
      </div>
    </section>
  );
}
