"use client";

import { Icons } from "@/components/ui/icons";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Housing", path: "/houses" },
  { label: "Lands", path: "/lands" },
  { label: "Apartments", path: "/apartments" },
  { label: "Blog", path: "/blog" },
  { label: "Tools", path: "/tools" },
];

export default function Navbar() {
  const [isCompanyHovered, setIsCompanyHovered] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState<
    "language" | "currency" | null
  >(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const router = useRouter();
  const [currency, setCurrency] = useState<"NPR" | "USD">("NPR");
  const [language, setLanguage] = useState<"EN" | "NE">("EN");

  // Prevent scrolling when full overlays are active
  useEffect(() => {
    if (isMobileMenuOpen || isChatOpen || isSupportOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isChatOpen, isSupportOpen, isSearchOpen]);

  const menuVariants: Variants = {
    closed: { opacity: 0, y: "-100%" },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween" as const,
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const linkStagger: Variants = {
    closed: { opacity: 0, y: 20 },
    open: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * idx + 0.2,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  const popoverVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 400, damping: 30 },
    },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 lg:px-12 py-2.5 border-b border-outline-variant bg-surface/80 backdrop-blur-md sticky top-0 z-[60] transition-all font-sans relative">
        <div className="flex items-center gap-3 cursor-pointer group z-50 relative">
          <div className="relative w-10 h-10 lg:w-11 lg:h-11 group-hover:scale-105 transition-transform duration-300">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full h-full"
            >
              <Image
                src="/Yeti-Logo-01.svg"
                alt="YetiHomes Icon"
                fill
                sizes="44px"
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        <nav
          className="hidden lg:flex items-center gap-10 text-sm font-semibold text-on-surface-variant relative h-full"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative py-2 px-1 transition-colors ${hoveredPath === item.path ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
              onMouseEnter={() => setHoveredPath(item.path)}
            >
              <span className="relative z-10">{item.label}</span>
              {hoveredPath === item.path && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-full z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}

          <div
            className="relative py-2 px-1"
            onMouseEnter={() => {
              setIsCompanyHovered(true);
              setHoveredPath("Company");
            }}
            onMouseLeave={() => setIsCompanyHovered(false)}
          >
            <button
              className={`flex items-center gap-1 transition-colors relative z-10 font-semibold ${isCompanyHovered ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              Company
              <Icons.chevronDown
                size={16}
                strokeWidth={2.5}
                className={`transition-transform duration-300 ${isCompanyHovered ? "rotate-180 text-primary" : ""}`}
              />
            </button>
            {hoveredPath === "Company" && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-full z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <div className="absolute top-full left-0 w-full h-6 bg-transparent" />

            <AnimatePresence>
              {isCompanyHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 16, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[960px] bg-surface-container-lowest rounded-3xl shadow-2xl shadow-brand-navy-900/10 border border-outline-variant overflow-hidden flex cursor-default z-50"
                >
                  <div className="flex-1 p-8 grid grid-cols-2 gap-x-8 gap-y-10">
                    <div>
                      <h3 className="text-xs font-bold tracking-widest uppercase text-outline mb-5">
                        Who We Are
                      </h3>
                      <ul className="space-y-4">
                        <li>
                          <a
                            href="/about"
                            className="flex items-start gap-3 group"
                          >
                            <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-primary-container group-hover:text-primary transition-colors">
                              <Icons.building size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                                About Company
                              </p>
                              <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                Learn about YetiHomes.
                              </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="/teams"
                            className="flex items-start gap-3 group"
                          >
                            <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-primary-container group-hover:text-primary transition-colors">
                              <Icons.users size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                                Meet Our Team
                              </p>
                              <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                The local experts guiding you.
                              </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-start gap-3 group">
                            <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-primary-container group-hover:text-primary transition-colors">
                              <Icons.briefcase size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                                Careers
                              </p>
                              <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                Join the YetiHomes family.
                              </p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold tracking-widest uppercase text-outline mb-5">
                        Trust & Security
                      </h3>
                      <ul className="space-y-4">
                        <li>
                          <a
                            href="/legal/cookies"
                            className="flex items-start gap-3 group"
                          >
                            <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-secondary-container group-hover:text-secondary transition-colors">
                              <Icons.shield size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">
                                Cookies Policy
                              </p>
                              <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                How we use cookies.
                              </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="/legal/terms-conditions"
                            className="flex items-start gap-3 group"
                          >
                            <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-secondary-container group-hover:text-secondary transition-colors">
                              <Icons.shield size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">
                                Terms and Conditions
                              </p>
                              <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                Agreement on Our Terms & Conditions
                              </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="/legal/disclaimer"
                            className="flex items-start gap-3 group"
                          >
                            <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-secondary-container group-hover:text-secondary transition-colors">
                              <Icons.shield size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">
                                Desclaimer and Advisory
                              </p>
                              <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                Desclaimer and Advisory
                              </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="/legal/privacy"
                            className="flex items-start gap-3 group"
                          >
                            <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-secondary-container group-hover:text-secondary transition-colors">
                              <Icons.shield size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">
                                Privacy Policy
                              </p>
                              <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                Your data and privacy.
                              </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="/testimonials"
                            className="flex items-start gap-3 group"
                          >
                            <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-tertiary-container group-hover:text-tertiary transition-colors">
                              <Icons.heart size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface group-hover:text-tertiary transition-colors">
                                Testimonials
                              </p>
                              <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                Read stories from our buyers.
                              </p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-[280px] bg-secondary-container/40 p-6 relative flex flex-col justify-end overflow-hidden group">
                    <Image
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80"
                      alt="Corporate"
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/70 to-transparent" />

                    <div className="relative z-10">
                      <span className="inline-block px-2.5 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded mb-3">
                        Our Mission
                      </span>
                      <h4 className="text-white font-bold text-lg leading-tight mb-2">
                        Transforming Nepal&apos;s Real Estate Market.
                      </h4>
                      <a
                        href="/blog"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent-200 hover:text-white transition-colors mt-2"
                      >
                        Read our story <Icons.arrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-4 text-on-surface-variant z-50">
          <div className="hidden sm:flex items-center gap-4">
            {/* Added Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-primary transition-colors relative group"
            >
              <Icons.search size={18} strokeWidth={2} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Search
              </span>
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="hover:text-primary transition-colors relative group"
            >
              <Icons.message size={18} strokeWidth={2} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Chat
              </span>
            </button>
            <button
              onClick={() => setIsSupportOpen(true)}
              className="hover:text-primary transition-colors relative group"
            >
              <Icons.help size={18} strokeWidth={2} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Support
              </span>
            </button>
          </div>

          <div className="w-px h-5 bg-outline-variant hidden sm:block mx-1"></div>

          <div className="hidden sm:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "language" ? null : "language",
                  )
                }
                className={`flex items-center gap-1.5 transition-colors ${activeDropdown === "language" ? "text-primary" : "hover:text-primary"}`}
              >
                <Icons.globe size={16} strokeWidth={2.5} />
                <span className="text-xs font-bold">{language}</span>
              </button>

              <AnimatePresence>
                {activeDropdown === "language" && (
                  <motion.div
                    variants={popoverVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full mt-4 right-0 w-32 bg-surface-container-lowest/90 backdrop-blur-lg border border-outline-variant rounded-xl shadow-xl overflow-hidden shadow-black/5"
                  >
                    <button
                      onClick={() => {
                        setLanguage("EN");
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-surface-container transition-colors ${language === "EN" ? "text-primary" : "text-on-surface"}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("NE");
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-surface-container transition-colors ${language === "NE" ? "text-primary" : "text-on-surface"}`}
                    >
                      Nepali
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "currency" ? null : "currency",
                  )
                }
                className={`flex items-center gap-1 transition-colors ${activeDropdown === "currency" ? "text-primary" : "hover:text-primary"}`}
              >
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-md border transition-colors ${activeDropdown === "currency" ? "bg-primary/10 border-primary/20 text-primary" : "bg-surface-container-low border-outline-variant text-on-surface"}`}
                >
                  {currency}
                </span>
              </button>

              <AnimatePresence>
                {activeDropdown === "currency" && (
                  <motion.div
                    variants={popoverVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full mt-4 right-0 w-32 bg-surface-container-lowest/90 backdrop-blur-lg border border-outline-variant rounded-xl shadow-xl overflow-hidden shadow-black/5"
                  >
                    <button
                      onClick={() => {
                        setCurrency("NPR");
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-surface-container transition-colors ${currency === "NPR" ? "text-primary" : "text-on-surface"}`}
                    >
                      NPR (रु)
                    </button>
                    <button
                      onClick={() => {
                        setCurrency("USD");
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-surface-container transition-colors ${currency === "USD" ? "text-primary" : "text-on-surface"}`}
                    >
                      USD ($)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="z-50 text-on-surface hover:text-primary transition-colors p-2 relative"
            >
              <Icons.search size={24} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="z-50 text-on-surface hover:text-primary transition-colors p-2 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icons.close size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icons.menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Unique Mobile Menu Takeover */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-md flex flex-col pt-32 px-8 pb-12 lg:hidden font-sans uppercase overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 flex-1 justify-center">
              {[...navLinks, { label: "Company", path: "#" }].map(
                (item, idx) => (
                  <motion.div
                    key={item.label}
                    custom={idx}
                    variants={linkStagger}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-2 border-b border-outline-variant/30 text-3xl font-headline font-black tracking-tight text-on-surface hover:text-primary transition-colors"
                    >
                      <span>{item.label}</span>
                      <Icons.arrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-auto pt-10"
            >
              <div className="flex flex-col gap-4 text-center">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSupportOpen(true);
                  }}
                  className="py-4 rounded-full bg-primary text-white font-bold tracking-widest text-xs uppercase shadow-md flex justify-center items-center gap-2"
                >
                  <Icons.message size={16} /> Contact Support
                </button>
                <div className="flex justify-center items-center gap-6 mt-4 opacity-70">
                  <button
                    onClick={() => setLanguage(language === "EN" ? "NE" : "EN")}
                    className="text-xs font-bold font-label tracking-widest text-on-surface transition-colors hover:text-primary"
                  >
                    {language === "EN" ? "ENGLISH" : "NEPALI"}
                  </button>
                  <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                  <button
                    onClick={() =>
                      setCurrency(currency === "NPR" ? "USD" : "NPR")
                    }
                    className="text-xs font-bold font-label tracking-widest text-on-surface transition-colors hover:text-primary"
                  >
                    {currency}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NEW: Sleek Search Overlay --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 md:pt-[12vh] cursor-zoom-out"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-3xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden cursor-default flex flex-col relative border border-outline-variant/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setIsSearchOpen(false);
                    router.push(
                      `/houses?q=${encodeURIComponent(searchQuery.trim())}`,
                    );
                  }
                }}
                className="flex items-center border-b border-outline-variant/30 px-6 py-5"
              >
                <Icons.search
                  size={24}
                  className="text-on-surface-variant mr-4 shrink-0"
                />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, property type..."
                  className="w-full bg-transparent text-on-surface text-lg focus:outline-none placeholder:text-on-surface-variant/50 font-light"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-surface-container rounded-full transition-colors ml-4 shrink-0"
                >
                  <Icons.close size={20} className="text-on-surface" />
                </button>
              </form>

              {/* Quick Links / Suggestions */}
              <div className="p-6 md:p-8 bg-surface-container-low/50">
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-outline mb-4">
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Houses in Baluwatar",
                    "Apartments in Lalitpur",
                    "Lands in Pokhara",
                    "New Projects",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setIsSearchOpen(false);
                        router.push(`/houses?q=${encodeURIComponent(term)}`);
                      }}
                      className="px-4 py-2 rounded-full border border-outline-variant text-xs font-medium text-on-surface-variant hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Chat Dialog */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
              onClick={() => setIsChatOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden cursor-default relative p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="absolute top-6 right-6 p-2 bg-surface-container-low hover:bg-outline-variant/20 rounded-full transition-colors z-10"
                >
                  <Icons.close size={20} className="text-on-surface" />
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#25D366]/20">
                    <Icons.message size={28} className="text-[#25D366]" />
                  </div>
                  <h3 className="text-2xl font-headline font-black text-on-surface mb-2">
                    Chat with us
                  </h3>
                  <p className="text-sm font-light text-on-surface-variant">
                    Choose an agent below to start a conversation via WhatsApp
                    instantly.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Marcus Aurelius",
                      role: "Sales Director",
                      phone: "+9779812345678",
                      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
                    },
                    {
                      name: "Aria Sterling",
                      role: "Property Advisor",
                      phone: "+9779823456789",
                      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                    },
                    {
                      name: "Leo Vance",
                      role: "Land Specialist",
                      phone: "+9779834567890",
                      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
                    },
                  ].map((agent, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/${agent.phone.replace("+", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant hover:border-[#25D366]/50 hover:bg-[#25D366]/5 hover:shadow-md transition-all group"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
                        <Image
                          src={`${agent.img}?auto=format&fit=crop&w=150&q=80`}
                          alt={agent.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-white rounded-full"></span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-on-surface">
                          {agent.name}
                        </h4>
                        <p className="text-xs text-on-surface-variant font-medium">
                          {agent.role}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Icons.message size={14} className="fill-current" />
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sleek Support Modal */}
      <AnimatePresence>
        {isSupportOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
              onClick={() => setIsSupportOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full max-w-4xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden cursor-default flex flex-col md:flex-row relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsSupportOpen(false)}
                  className="absolute top-6 right-6 p-2 bg-surface-container-low hover:bg-outline-variant/20 rounded-full transition-colors z-10"
                >
                  <Icons.close size={20} className="text-on-surface" />
                </button>

                {/* Info side */}
                <div className="w-full md:w-[40%] bg-surface-container-low p-10 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <Icons.help size={24} className="text-primary" />
                    </div>
                    <h3 className="text-3xl font-headline font-black text-on-surface mb-4">
                      How can we help?
                    </h3>
                    <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-8">
                      Whether you&apos;re curious about a property verification,
                      experiencing technical issues, or want to understand our
                      clear Lal Purja process—our dedicated support crew is on
                      standby.
                    </p>

                    <div className="space-y-4">
                      <a
                        href="#"
                        className="block p-4 rounded-2xl border border-outline-variant bg-surface-container-lowest hover:border-primary/30 transition-colors group"
                      >
                        <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-2">
                          <Icons.ticket size={16} /> FAQ & Guides
                        </h4>
                        <p className="text-xs text-on-surface-variant font-light mt-1">
                          Self-serve answers to common queries.
                        </p>
                      </a>
                    </div>
                  </div>

                  <div className="mt-12">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">
                      Direct Contact
                    </p>
                    <p className="text-sm font-medium text-on-surface">
                      support@yetihomes.com.np
                    </p>
                    <p className="text-sm font-medium text-on-surface">
                      +977 1 4543210
                    </p>
                  </div>
                </div>

                {/* Form side */}
                <div className="w-full md:w-[60%] p-10 flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-on-surface mb-6">
                    Send a Support Ticket
                  </h4>

                  <form
                    className="space-y-5"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant pl-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-light placeholder:text-outline"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant pl-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-light placeholder:text-outline"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant pl-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-light placeholder:text-outline"
                        placeholder="Brief description of your issue"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant pl-2">
                        Details
                      </label>
                      <textarea
                        rows={4}
                        className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-light placeholder:text-outline resize-none"
                        placeholder="Please provide everything we need to assist you better..."
                      ></textarea>
                    </div>

                    <button className="w-full py-4 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl transition-all flex justify-center items-center gap-2 mt-4">
                      <Icons.send size={16} /> Submit Ticket
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
