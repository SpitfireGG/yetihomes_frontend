"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getLandingPageData,
  type LandingCity,
  type LandingCategory,
} from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [cities, setCities] = useState<LandingCity[]>([]);
  const [categories, setCategories] = useState<LandingCategory[]>([]);

  useEffect(() => {
    getLandingPageData()
      .then((data) => {
        setCities(data.cities.slice(0, 4));
        setCategories(data.categories.slice(0, 4));
      })
      .catch((err) => console.error("Failed to load footer data", err));
  }, []);

  return (
    <footer className="relative pt-24 pb-8 font-sans overflow-hidden bg-brand-900 selection:bg-brand-300 selection:text-brand-900">
      {/* Authentic Premium Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 z-0"></div>

      {/* Subtle brand glow effects */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-brand-700/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-brand-800/40 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none z-0"></div>

      {/* Large faint watermark for aesthetic depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-bold text-white/[0.015] pointer-events-none select-none whitespace-nowrap z-0">
        YETI HOMES
      </div>

      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-between h-full">
        {/* Inner Circle Newsletter - Redesigned for a premium feel */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between bg-brand-800/40 backdrop-blur-xl border border-brand-400/20 p-8 sm:p-10 lg:p-14 rounded-[2rem] mb-20 shadow-2xl gap-8 lg:gap-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-700/10 to-transparent pointer-events-none"></div>

          <div className="max-w-xl w-full lg:w-auto relative z-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <span className="w-8 h-[1px] bg-brand-accent-300"></span>
              <span className="text-brand-accent-300 font-bold text-xs tracking-[0.2em] uppercase">
                Join The Inner Circle
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-5 leading-tight">
              Unlock Exclusive <br className="hidden md:block" /> Off-Market
              Deals
            </h3>
            <p className="text-brand-200 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Get ahead of the market. Join 10,000+ investors receiving prime
              real estate opportunities in Nepal straight to their inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-lg lg:ml-auto relative z-10">
            <form
              className="flex flex-col sm:flex-row items-stretch sm:items-center w-full gap-3 sm:gap-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-brand-900/50 border border-brand-400/30 text-white placeholder-brand-300/50 px-6 py-4 rounded-xl sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-brand-accent-500/50 focus:border-brand-accent-500 transition-all text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 hover:from-white hover:via-slate-100 hover:to-slate-200 text-brand-900 px-8 py-4 rounded-xl sm:rounded-l-none font-extrabold tracking-wide text-sm transition-all duration-300 shadow-[0_0_20px_rgba(203,213,225,0.25)] whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-brand-300/70 mt-4 text-center sm:text-right">
              We respect your privacy. No spam, just premium real estate.
            </p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 mb-20">
          <div className="xl:w-1/3 flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-4 group w-fit">
              <div className="relative w-16 h-16 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/Yeti-Logo-02.svg"
                  alt="YetiHomes Logo"
                  fill
                  sizes="64px"
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <span className="font-serif font-bold text-3xl tracking-tight text-white">
                YetihomesEstate Pvt. Ltd
              </span>
            </Link>
            <p className="text-brand-200 text-sm leading-loose max-w-sm">
              Discover extraordinary residential plots, smart value homes, and
              premium real estate across Nepal. Your seamless property journey
              starts here, guided by local expertise and deep-rooted trust.
            </p>
          </div>

          <div className="xl:w-2/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 text-sm">
            {/* Column 1 */}
            <div>
              <h4 className="text-white font-serif text-lg mb-6">Locations</h4>
              <ul className="space-y-4">
                {cities.length > 0 ? (
                  cities.map((c) => (
                    <li key={c.city}>
                      <Link
                        href={`/houses?city=${encodeURIComponent(c.city)}`}
                        className="text-brand-300 hover:text-white transition-colors"
                      >
                        {c.city}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link
                        href="#"
                        className="text-brand-300 hover:text-white transition-colors"
                      >
                        Kathmandu
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-brand-300 hover:text-white transition-colors"
                      >
                        Lalitpur
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-brand-300 hover:text-white transition-colors"
                      >
                        Bhaktapur
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-brand-300 hover:text-white transition-colors"
                      >
                        Pokhara
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-white font-serif text-lg mb-6">Properties</h4>
              <ul className="space-y-4">
                {categories.length > 0 ? (
                  categories.map((cat) => {
                    let path = "/houses";
                    if (cat.key === "apartments") path = "/apartments";
                    if (cat.key === "land-plot" || cat.key === "commercial")
                      path = "/lands";
                    return (
                      <li key={cat.key}>
                        <Link
                          href={path}
                          className="text-brand-300 hover:text-white transition-colors capitalize"
                        >
                          {cat.label}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <>
                    <li>
                      <Link
                        href="#"
                        className="text-brand-300 hover:text-white transition-colors"
                      >
                        Residential Plots
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-brand-300 hover:text-white transition-colors"
                      >
                        Commercial Land
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-brand-300 hover:text-white transition-colors"
                      >
                        Luxury Villas
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-brand-300 hover:text-white transition-colors"
                      >
                        Apartments
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-white font-serif text-lg mb-6">Services</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    Property Valuation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    Legal Assistance
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    Vastu Consultation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    Schedule Site Visit
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-white font-serif text-lg mb-6">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    About Company
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teams"
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    Meet Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testimonials"
                    className="text-brand-300 hover:text-white transition-colors"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Base Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-brand-400/20 pt-10 mb-10">
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-400 mb-5">
              Connect With Us
            </h4>
            <div className="flex items-center gap-5">
              {[faFacebookF, faInstagram, faXTwitter, faLinkedinIn].map(
                (icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-brand-400/30 flex items-center justify-center text-brand-300 hover:bg-brand-accent-500 hover:text-white hover:border-brand-accent-500 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                  </Link>
                ),
              )}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-400 mb-5">
              Visit Our Base
            </h4>
            <p className="text-sm text-brand-200 leading-relaxed font-medium">
              Chuchepati, Chabahil,
              <br />
              Kathmandu, Nepal, 44600
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-400 mb-5">
              Direct Lines
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-white font-medium hover:text-brand-accent-300 transition-colors cursor-pointer w-fit">
                +977 9851446901
              </p>
              <p className="text-sm text-white font-medium hover:text-brand-accent-300 transition-colors cursor-pointer w-fit">
                +977 9851446902
              </p>
              <p className="text-sm text-brand-300 hover:text-brand-accent-300 transition-colors cursor-pointer mt-3 w-fit">
                Estateyetihomes@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-brand-400/20 text-xs text-brand-400">
          <p>
            © {new Date().getFullYear()} YetiHomes Real Estate. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/legal/terms-conditions"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/legal/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/legal/disclaimer"
              className="hover:text-white transition-colors"
            >
              Legal Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
