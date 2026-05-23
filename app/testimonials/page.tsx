import ClientReviews from "@/components/shared/reviews";
import { getCachedReviews } from "@/lib/review-server-cache";

export const revalidate = 60;

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
