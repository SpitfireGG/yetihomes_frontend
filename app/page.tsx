import Image from "next/image";
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
import { getCachedReviews } from "@/lib/review-server-cache";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [teamMembers, reviews, propertyShowcases, landingPageData] =
    await Promise.all([
      getCachedTeamMembers(),
      getCachedReviews(),
      getHomePropertyShowcaseData(),
      getCachedLandingPageData(),
    ]);
  const shellClassName = "mx-auto w-full max-w-[1440px] px-6 lg:px-10";
  const hasFeaturedListings = propertyShowcases.featuredListings.length > 0;
  const hasFeaturedLandListings =
    propertyShowcases.featuredLandListings.length > 0;
  const hasTopCollections = hasFeaturedListings || hasFeaturedLandListings;
  const hasSimilarListings = propertyShowcases.similarListings.length > 0;
  const hasPropertyShowcases =
    propertyShowcases.residentialPlotListings.length > 0 ||
    propertyShowcases.valueHomeListings.length > 0;

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-gray-900 font-sans selection:bg-primary selection:text-white">
      <AnimatedHeroSearch />

      <main>
        {hasTopCollections ? (
          <section className="pb-20 pt-10 lg:pb-24 lg:pt-16">
            <div className={`${shellClassName} space-y-24 lg:space-y-28`}>
              {hasFeaturedListings ? (
                <div className="space-y-10">
                  <SectionHeading title="Featured Listings" />
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
              />
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
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/banner_yt.jpeg"
              alt="AdvLife Cityscape"
              fill
              priority
              sizes="100vw"
              /* Using object-center usually works best for strip banners so the focal point stays in the middle when cropped on mobile */
              className="object-cover object-center"
            />
          </div>

          {/* 1. Subtle Brand Tint: Keeps the image cohesive with your dark red palette without overpowering it */}
          <div className="absolute inset-0 bg-brand-900/30 mix-blend-overlay z-10 pointer-events-none"></div>

          {/* 2. Top Gradient: Scaled down to just cover the area behind the navbar (h-24 = 96px) */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-brand-900/80 via-brand-900/30 to-transparent z-20 pointer-events-none"></div>

          {/* 3. Bottom Gradient: Scaled down for a short banner, blending it smoothly into the page surface below */}

          {/* Container for any text/breadcrumbs you might want to overlay */}
          <div className="relative z-30 w-full h-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-6 sm:pb-8">
            {/* Example of how to position text in a short strip banner:
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-md">
      Page Title
    </h1> 
    */}
          </div>
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
              <TrustHub />
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
  );
}
