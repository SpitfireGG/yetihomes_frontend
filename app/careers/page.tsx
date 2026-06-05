import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | YetiHomes",
  description:
    "Join the YetiHomes team. Explore career opportunities in real estate, technology, and client services in Nepal.",
};

const openings = [
  {
    title: "Senior Real Estate Agent",
    location: "Kathmandu",
    type: "Full-Time",
    department: "Sales",
  },
  {
    title: "Property Valuation Specialist",
    location: "Kathmandu",
    type: "Full-Time",
    department: "Operations",
  },
  {
    title: "Digital Marketing Manager",
    location: "Remote / Kathmandu",
    type: "Full-Time",
    department: "Marketing",
  },
  {
    title: "Client Relations Executive",
    location: "Kathmandu",
    type: "Full-Time",
    department: "Client Services",
  },
  {
    title: "Frontend Developer (Next.js)",
    location: "Remote / Kathmandu",
    type: "Full-Time",
    department: "Technology",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F5] font-sans text-gray-900">
      <section className="relative h-[40vh] min-h-[280px] overflow-hidden bg-gradient-to-br from-primary via-brand-800 to-secondary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="mx-auto w-full max-w-[1440px]">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded mb-4">
              Careers
            </span>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Join Our Team
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">Shape the Future of Real Estate in Nepal</h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              At YetiHomes, we&apos;re building the most trusted real estate platform in Nepal. We&apos;re looking for passionate individuals who share our commitment to excellence, integrity, and innovation.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold mb-8">Open Positions</h3>
            {openings.map((job) => (
              <div
                key={job.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <h4 className="text-xl font-bold mb-2">{job.title}</h4>
                  <div className="flex flex-wrap gap-3 text-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      {job.department}
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors shrink-0"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-surface-container-low rounded-3xl p-12 text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">Don&apos;t See the Right Role?</h3>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
              We&apos;re always looking for talented individuals. Send us your resume and we&apos;ll keep you in mind for future opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-primary/90 transition-colors"
            >
              Send Your Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
