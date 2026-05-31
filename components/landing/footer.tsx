"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
    <footer className="relative min-h-[75vh] flex flex-col justify-end pt-24 pb-8 text-brand-silver-300 font-sans overflow-hidden bg-brand-navy-900">
      <Image
        src="/dev.jpg"
        alt="YetiHomes Footer Background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/80 to-brand-navy-900/40 backdrop-blur-[2px] z-10"></div>

      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-between h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between bg-white/10 backdrop-blur-md border border-white/10 p-8 lg:p-12 rounded-[28px] mb-16 lg:mb-24 shadow-2xl">
          <div className="max-w-xl mb-8 lg:mb-0">
            <span className="text-brand-accent-200 font-bold text-xs tracking-widest uppercase mb-3 block">
              Join The Inner Circle
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4 leading-tight">
              Unlock Exclusive Off-Market Deals
            </h3>
            <p className="text-brand-silver-300 text-sm md:text-base leading-relaxed">
              Get ahead of the market. Join 10,000+ investors and homebuyers
              receiving the latest property alerts, market insights, and prime
              real estate opportunities in Nepal straight to their inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-lg lg:ml-auto">
            <form
              className="relative flex items-center w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/20 text-white placeholder-brand-silver-400 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary backdrop-blur-sm transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-2 bg-primary hover:bg-brand-800 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-md"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-brand-silver-400 mt-3 lg:text-right">
              We respect your privacy. No spam, just premium real estate.
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-12 xl:gap-20 mb-16">
          <div className="xl:w-1/3 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16">
                <Image
                  src="/Yeti-Logo-02.svg"
                  alt="YetiHomes Logo"
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                YetiHomes
              </span>
            </div>
            <p className="text-brand-silver-400 text-sm leading-relaxed max-w-sm">
              Discover extraordinary residential plots, smart value homes, and
              premium real estate across Nepal. Your seamless property journey
              starts here, guided by local expertise and trust.
            </p>
          </div>

          <div className="xl:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="text-brand-silver-400 font-medium mb-6">
                Locations
              </h4>
              <ul className="space-y-3">
                {cities.length > 0 ? (
                  cities.map((c) => (
                    <li key={c.city}>
                      <a
                        href={`/houses?city=${encodeURIComponent(c.city)}`}
                        className="hover:text-white transition-colors"
                      >
                        {c.city}
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Kathmandu
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Lalitpur
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Bhaktapur
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Pokhara
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-brand-silver-400 font-medium mb-6">
                Property Types
              </h4>
              <ul className="space-y-3">
                {categories.length > 0 ? (
                  categories.map((cat) => {
                    let path = "/houses";
                    if (cat.key === "apartments") path = "/apartments";
                    if (cat.key === "land-plot" || cat.key === "commercial")
                      path = "/lands";
                    return (
                      <li key={cat.key}>
                        <a
                          href={path}
                          className="hover:text-white transition-colors capitalize"
                        >
                          {cat.label}
                        </a>
                      </li>
                    );
                  })
                ) : (
                  <>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Residential Plots
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Commercial Land
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Luxury Villas
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Apartments
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-brand-silver-400 font-medium mb-6">
                Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Property Valuation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Legal Assistance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Vastu Consultation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Schedule Site Visit
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-brand-silver-400 font-medium mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Company
                  </a>
                </li>
                <li>
                  <a
                    href="/teams"
                    className="hover:text-white transition-colors"
                  >
                    Meet Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/cookies"
                    className="hover:text-white transition-colors"
                  >
                    Cookies Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/terms-conditions"
                    className="hover:text-white transition-colors"
                  >
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/disclaimer"
                    className="hover:text-white transition-colors"
                  >
                    Disclaimer and Advisory
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/testimonials"
                    className="hover:text-white transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Section: Contact & Base Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/10 pt-10 mb-10">
          {/* Socials */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-silver-500 mb-4">
              Connect With Us
            </h4>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-brand-silver-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-brand-silver-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-brand-silver-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-brand-silver-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-silver-500 mb-4">
              Visit Our Base
            </h4>
            <p className="text-sm text-brand-silver-300 leading-relaxed">
              Chuchepati, Chabahil,
              <br />
              Kathmandu, Nepal, 44600
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-silver-500 mb-4">
              Direct Lines
            </h4>
            <p className="text-sm text-white font-medium mb-1">
              +977 9768998508
            </p>
            <p className="text-sm text-white font-medium mb-1">
              +977 9851446901
            </p>
            <p className="text-sm text-white font-medium mb-1">
              +977 9851361431
            </p>
            <p className="text-sm text-brand-silver-400 hover:text-white transition-colors cursor-pointer">
              Estateyetihomes@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-brand-silver-500">
          <p>© 2026 YetiHomes Real Estate. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <a
              href="/legal/terms-conditions"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="/legal/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/legal/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sustainability Policy
            </a>
            <a
              href="/legal/disclaimer"
              className="hover:text-white transition-colors"
            >
              Legal Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
