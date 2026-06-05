import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | YetiHomes",
  description:
    "YetiHomes is Nepal's premier editorial real estate platform, connecting discerning buyers with exceptional properties through local expertise and deep-rooted trust.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F5] font-sans text-gray-900">
      <section className="relative h-[50vh] min-h-[320px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=80"
          alt="YetiHomes Office"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="mx-auto w-full max-w-[1440px]">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded mb-4">
              About Company
            </span>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Nepal&apos;s Most Trusted<br />Real Estate Platform
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-8 leading-tight">
                Our Story
              </h2>
              <div className="space-y-5 text-on-surface-variant leading-relaxed">
                <p>
                  YetiHomes was founded with a singular vision: to transform Nepal&apos;s real estate market through transparency, editorial quality, and unmatched local expertise.
                </p>
                <p>
                  We believe that finding the right property should be an inspiring journey, not a daunting task. Our team of experienced professionals brings together decades of combined experience in real estate, architecture, and market analysis to serve discerning buyers and sellers.
                </p>
                <p>
                  From the bustling streets of Kathmandu to the serene landscapes of Pokhara, we curate only the finest properties — each one vetted for quality, title clarity, and true market value.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/20">
                  <h3 className="text-4xl font-bold text-primary mb-2">5,000+</h3>
                  <p className="text-sm text-on-surface-variant font-medium">Curated Properties</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/20">
                  <h3 className="text-4xl font-bold text-primary mb-2">99.9%</h3>
                  <p className="text-sm text-on-surface-variant font-medium">Client Satisfaction</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/20">
                  <h3 className="text-4xl font-bold text-primary mb-2">10+</h3>
                  <p className="text-sm text-on-surface-variant font-medium">Years Experience</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/20">
                  <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                  <p className="text-sm text-on-surface-variant font-medium">Expert Team Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Our Mission & Values</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Every decision we make is guided by our commitment to integrity, excellence, and deep local knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                description: "Clear pricing, verified titles, and honest market intelligence. No hidden fees, no misleading listings.",
              },
              {
                title: "Local Expertise",
                description: "Deep knowledge of Nepal's real estate landscape. From title verification to neighborhood insights, we guide you at every step.",
              },
              {
                title: "Premium Curation",
                description: "Every property is hand-selected and vetted. We showcase only the finest homes, lands, and investment opportunities.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/20">
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[1440px] text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-10">
            Our team of experts is ready to help you navigate Nepal&apos;s real estate market with confidence.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
