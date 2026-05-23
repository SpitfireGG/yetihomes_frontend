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

export const dynamic = 'force-dynamic';

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

        <section className="h-36 overflow-hidden bg-surface-container-lowest md:h-64 -mt-24 lg:h-80">
          <div className="relative h-full w-full">
            <Image
              src="/banner4.jpg"
              alt="AdvLife Cityscape"
              fill
              sizes="100vw"
              className="absolute bottom-0 left-0 h-full w-full object-cover object-bottom"
            />
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
          <div className="space-y-24 lg:space-y-28">
            <div className={shellClassName}>
              <TrustHub />
            </div>
            <div className={shellClassName}>
              <MeetOurTeamSection members={teamMembers} />
            </div>
          </div>
        </section>

        <section className="border-t border-outline-variant/50 relative overflow-hidden py-24 lg:py-28">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div
              className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-accent-300/35 mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse"
              style={{ animationDuration: "8s" }}
            ></div>
            <div
              className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand-navy-300/30 mix-blend-multiply filter blur-[150px] opacity-60 animate-pulse"
              style={{ animationDuration: "12s" }}
            ></div>
            <div
              className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-brand-300/25 mix-blend-multiply filter blur-[120px] opacity-50 animate-pulse"
              style={{ animationDuration: "10s" }}
            ></div>
          </div>
          <div className={shellClassName}>
            <ClientReviews reviews={reviews} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
