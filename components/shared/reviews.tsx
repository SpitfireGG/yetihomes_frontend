"use client";

import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import SectionHeading from "./sectionHeading";
import type { Review } from "@/lib/api";

const FEATURED_REVIEW_INDEX = 1;
const FEATURED_REVIEW_CARD_MIN_HEIGHT_CLASS = "min-h-[24.5rem]";
const REVIEW_TEXT_CLAMP_CLASS = "line-clamp-5";
const REVIEW_CARD_STYLE_VARIANTS = [
  {
    minHeightClass: "min-h-[21.5rem]",
    offsetClass: "lg:translate-y-0",
  },
  {
    minHeightClass: "min-h-[22.25rem]",
    offsetClass: "lg:-translate-y-1",
  },
  {
    minHeightClass: "min-h-[21.75rem]",
    offsetClass: "lg:translate-y-1.5",
  },
  {
    minHeightClass: "min-h-[22.5rem]",
    offsetClass: "lg:-translate-y-0.5",
  },
] as const;

export default function ClientReviews({ reviews }: { reviews: Review[] }) {
  // Determine the featured index based on the original array length
  const featuredCardIndex = Math.min(
    FEATURED_REVIEW_INDEX,
    Math.max(reviews.length - 1, 0),
  );

  // Duplicate the array to create a seamless infinite looping effect
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="relative overflow-hidden py-4">
      {/* Injecting custom keyframes here so you don't have to modify tailwind.config.ts. 
        Adjust the '40s' duration to make it scroll faster or slower.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 lg:mb-16 px-4">
          <SectionHeading
            title="Don't just take our words"
            description="Discover why thousands of investors and families trust Yeti Homes Estate to navigate Nepal's complex real estate market."
            align="center"
          />
        </div>
      </div>

      {/* Carousel Track Container */}
      <div className="relative flex w-full overflow-hidden">
        {/* Gradient fades on the edges for a smoother look */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 md:w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 md:w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-infinite-scroll items-stretch gap-6 px-3">
          {duplicatedReviews.map((review, index) => {
            // Map the index back to the original array to maintain styling consistency
            const originalIndex = index % reviews.length;
            const previewText = review.text;
            const isGradientCard = originalIndex === featuredCardIndex;
            const styleVariant =
              REVIEW_CARD_STYLE_VARIANTS[
                originalIndex % REVIEW_CARD_STYLE_VARIANTS.length
              ];

            return (
              <div
                // Use a combination of ID and index to ensure unique keys in the duplicated array
                key={`${review.id}-${index}`}
                className="w-[320px] md:w-[380px] flex-shrink-0"
              >
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[32px] p-8 transition-transform duration-300 hover:-translate-y-2 ${
                    isGradientCard
                      ? `${FEATURED_REVIEW_CARD_MIN_HEIGHT_CLASS} lg:-translate-y-1.5 bg-gradient-to-br from-primary via-secondary to-brand-accent-500 text-white shadow-xl shadow-brand-navy-900/15 border-none`
                      : `${styleVariant.minHeightClass} border border-white/80 bg-surface-container-lowest/80 text-on-surface shadow-lg shadow-brand-navy-900/8 hover:bg-surface-container-lowest`
                  }`}
                >
                  <Icons.quote
                    size={80}
                    className={`absolute -top-4 -right-4 rotate-12 opacity-10 ${
                      isGradientCard ? "text-white" : "text-on-surface"
                    }`}
                  />

                  <div className="mb-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Icons.star
                        key={i}
                        size={18}
                        className={
                          i < review.rating
                            ? isGradientCard
                              ? "fill-white text-white"
                              : "fill-tertiary text-tertiary"
                            : isGradientCard
                              ? "text-white/30"
                              : "text-outline"
                        }
                      />
                    ))}
                  </div>

                  <p
                    className={`mb-8 break-words text-lg font-medium leading-relaxed ${REVIEW_TEXT_CLAMP_CLASS} ${
                      isGradientCard
                        ? "text-white/95"
                        : "text-on-surface-variant"
                    }`}
                  >
                    &ldquo;{previewText}&rdquo;
                  </p>

                  <div className="mt-auto flex items-center gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white/20 shadow-sm">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold tracking-tight">
                        {review.name}
                      </h4>
                      <p
                        className={`text-xs font-medium ${
                          isGradientCard
                            ? "text-white/80"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
