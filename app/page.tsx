import Image from "next/image";
import Link from "next/link";
import PropertyShowcases from "@/components/landing/cheap-listings";
import { FeaturedListingsSection } from "@/components/landing/featured-listings-section";
import Footer from "@/components/landing/footer";
import { ListingCard } from "@/components/landing/listing-card";
import PropertyLanding from "@/components/landing/property-landing";
import AnimatedHeroSearch from "@/components/landing/search";
import SimilarListings from "@/components/landing/similar-listings";
import MeetOurTeamSection from "@/components/landing/teams";
import TrustHub from "@/components/shared/affiliations";
import ClientReviews from "@/components/shared/reviews";
import SectionHeading from "@/components/shared/sectionHeading";
import { getHomePropertyShowcaseData } from "@/lib/home-property-showcases";
import { getCachedLandingPageData } from "@/lib/landing-server-cache";
import { getCachedTeamMembers } from "@/lib/team-server-cache";
import { getCachedAffiliations } from "@/lib/affiliation-server-cache";
import { getCachedReviews } from "@/lib/review-server-cache";

export const revalidate = 60;

export default async function Home() {
  const [teamMembers, reviews, propertyShowcases, landingPageData, affiliations] =
    await Promise.all([
      getCachedTeamMembers(),
      getCachedReviews(),
      getHomePropertyShowcaseData(),
      getCachedLandingPageData(),
      getCachedAffiliations(),
    ]);
  const shellClassName = "mx-auto w-full max-w-[1440px] px-6 lg:px-10";
  const hasFeaturedListings = propertyShowcases.featuredListings.length > 0;
  const hasFeaturedLandListings =
    propertyShowcases.featuredLandListings.length > 0;
  const hasApartmentListings = propertyShowcases.apartmentListings.length > 0;
  const hasTopCollections =
    hasFeaturedListings || hasFeaturedLandListings || hasApartmentListings;
  const hasSimilarListings = propertyShowcases.similarListings.length > 0;
  const hasPropertyShowcases =
    propertyShowcases.residentialPlotListings.length > 0 ||
    propertyShowcases.valueHomeListings.length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.yetihomesestate.com.np/#organization",
                name: "Yeti Homes Estate Pvt. Ltd",
                url: "https://www.yetihomesestate.com.np",
                logo: "https://www.yetihomesestate.com.np/Yeti-Logo-02.svg",
                description:
                  "Premium real estate in Nepal — houses, apartments, and land for sale. Expert guidance for discerning buyers.",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Chuchepati, Chabahil",
                  addressLocality: "Kathmandu",
                  addressCountry: "NP",
                  postalCode: "44600",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+977-9851446901",
                  contactType: "sales",
                },
                sameAs: [
                  "https://facebook.com/yetihomes",
                  "https://instagram.com/yetihomes",
                  "https://x.com/yetihomes",
                  "https://linkedin.com/company/yetihomes",
                  "https://www.youtube.com/@YetiHomesEstate",
                ],
              },
              {
                "@type": "WebSite",
                "@id": "https://www.yetihomesestate.com.np/#website",
                url: "https://www.yetihomesestate.com.np",
                name: "Yeti Homes Estate",
                description:
                  "Premium Real Estate in Nepal — Houses, Apartments & Land for Sale",
                publisher: {
                  "@id": "https://www.yetihomesestate.com.np/#organization",
                },
              },
              {
                "@type": "RealEstateAgent",
                "@id": "https://www.yetihomesestate.com.np/#realestateagent",
                name: "Yeti Homes Estate",
                url: "https://www.yetihomesestate.com.np",
                image: "https://www.yetihomesestate.com.np/Yeti-Logo-02.svg",
                areaServed: "NP",
                priceRange: "₹₹₹₹₹",
              },
            ],
          }),
        }}
      />
      <div className="min-h-screen bg-[#F8F8F5] text-gray-900 font-sans selection:bg-primary selection:text-white">
        <AnimatedHeroSearch />

        <main>
          {hasTopCollections ? (
            <section className="pb-20 pt-10 lg:pb-24 lg:pt-16">
              <div className={`${shellClassName} space-y-24 lg:space-y-28`}>
                {hasFeaturedListings ? (
                  <div className="space-y-10">
                    <div className="flex items-end justify-between">
                      <SectionHeading title="Featured Houses" />
                      <Link
                        href="/houses"
                        className="shrink-0 text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
                      >
                        View All Houses
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-10 pb-16 md:grid-cols-2 xl:grid-cols-3">
                      {propertyShowcases.featuredListings.map(
                        (listing, index) => (
                          <ListingCard
                            key={listing.id}
                            listing={{
                              ...listing,
                              offset: index % 3 === 1,
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                ) : null}

                <FeaturedListingsSection
                  listings={propertyShowcases.featuredLandListings}
                  title="Featured Lands"
                  viewAllHref="/lands"
                />

                {hasApartmentListings ? (
                  <div className="space-y-10">
                    <div className="flex items-end justify-between">
                      <SectionHeading title="Apartments" />
                      <Link
                        href="/apartments"
                        className="shrink-0 text-sm font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
                      >
                        View All Apartments
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-10 pb-16 md:grid-cols-2 xl:grid-cols-3">
                      {propertyShowcases.apartmentListings.map(
                        (listing, index) => (
                          <ListingCard
                            key={listing.id}
                            listing={{
                              ...listing,
                              offset: index % 3 === 1,
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {hasSimilarListings ? (
            <section className="border-t border-outline-variant/50 bg-surface-container-lowest py-20 lg:py-24">
              <div className={shellClassName}>
                <SimilarListings listings={propertyShowcases.similarListings} />
              </div>
            </section>
          ) : null}

          <section className="relative w-full h-[160px] sm:h-[200px] md:h-[264px] -mt-24 overflow-hidden bg-brand-900">
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src="/banner_yt.jpeg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-brand-900/30 mix-blend-overlay z-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-brand-900/80 via-brand-900/30 to-transparent z-20 pointer-events-none"></div>
          </section>

          {hasPropertyShowcases ? (
            <section className="border-t border-outline-variant/50 bg-surface-container-low py-20 lg:py-24">
              <div className={shellClassName}>
                <PropertyShowcases
                  residentialPlotListings={
                    propertyShowcases.residentialPlotListings
                  }
                  valueHomeListings={propertyShowcases.valueHomeListings}
                />
              </div>
            </section>
          ) : null}

          <section className="py-20 lg:py-24">
            <div className={shellClassName}>
              <PropertyLanding
                categories={landingPageData?.categories}
                cities={landingPageData?.cities}
              />
            </div>
          </section>

          <section className="border-t border-outline-variant/50 bg-surface-container-low py-24 lg:py-28">
            <div className="space-y-20 lg:space-y-24">
              <div className={shellClassName}>
                <TrustHub affiliations={affiliations} />
              </div>
              <div className={shellClassName}>
                <MeetOurTeamSection members={teamMembers} />
              </div>
            </div>
          </section>

          <section className="border-t border-outline-variant/50 bg-surface-container-low py-24 lg:py-28">
            <div className={shellClassName}>
              <ClientReviews reviews={reviews} />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
