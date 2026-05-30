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
  const featuredCardIndex = Math.min(
    FEATURED_REVIEW_INDEX,
    Math.max(reviews.length - 1, 0),
  );

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <SectionHeading
            title="Don't just take our words"
            description="Discover why thousands of investors and families trust YetiHomes to navigate Nepal's complex real estate market."
            align="center"
          />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, index) => {
            const previewText = review.text;
            const isGradientCard = index === featuredCardIndex;
            const styleVariant =
              REVIEW_CARD_STYLE_VARIANTS[
                index % REVIEW_CARD_STYLE_VARIANTS.length
              ];

            return (
              <div
                key={review.id}
                className="break-inside-avoid animate-fade-in [animation-delay:var(--delay)] [animation-fill-mode:backwards]"
                style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[32px] p-8 transition-transform duration-300 hover:-translate-y-1 ${
                    isGradientCard
                      ? `${FEATURED_REVIEW_CARD_MIN_HEIGHT_CLASS} lg:-translate-y-1.5 bg-gradient-to-br from-primary via-secondary to-brand-accent-500 text-white shadow-xl shadow-brand-navy-900/15 border-none`
                      : `${styleVariant.minHeightClass} ${styleVariant.offsetClass} border border-white/80 bg-surface-container-lowest/80 text-on-surface shadow-lg shadow-brand-navy-900/8 hover:bg-surface-container-lowest`
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
                        sizes="96px"
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
