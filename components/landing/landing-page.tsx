import { FeaturedListingsSection } from "./featured-listings-section";
import Footer from "./footer";
import HeroSection from "./hero-section";
import { NewsletterSection } from "./newsletter-section";
import { TopNav } from "./top-nav";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <TopNav />
      <main id="insights">
        <HeroSection />
        <FeaturedListingsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
