import type { Metadata } from "next";
import ClientReviews from "@/components/shared/reviews";
import { getCachedReviews } from "@/lib/review-server-cache";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Testimonials | Yeti Homes Estate",
  description:
    "Hear from our clients. Yeti Homes Estate has helped hundreds of buyers and sellers across Nepal find their ideal property.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/testimonials",
  },
  openGraph: {
    title: "Testimonials | Yeti Homes Estate",
    description:
      "Hear from our clients. Yeti Homes Estate has helped hundreds of buyers and sellers across Nepal find their ideal property.",
    url: "https://www.yetihomesestate.com.np/testimonials",
    siteName: "Yeti Homes Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | Yeti Homes Estate",
    description: "Client testimonials for Yeti Homes Estate in Nepal.",
  },
};

const Page = async () => {
  const reviews = await getCachedReviews();

  return (
    <main className="min-h-screen bg-[#F8F8F5] font-sans text-gray-900">
      <section className="bg-surface-container-low px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[1440px]">
          <ClientReviews reviews={reviews} />
        </div>
      </section>
    </main>
  );
};

export default Page;
