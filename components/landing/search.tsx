"use client";

import { Icons } from "@/components/ui/icons";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  type Variants,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import ValuationModal from "../shared/valuationModal";

const PROPERTY_TYPE_ROUTE: Record<string, string> = {
  "Houses & Villas": "/houses",
  Apartments: "/apartments",
  "Commercial Lands": "/lands",
  "Residential Lands": "/lands",
  "Office Spaces": "/apartments",
};

const PRICE_RANGE_MAP: Record<
  string,
  { minPrice?: number; maxPrice?: number }
> = {
  "2Cr – 3Cr": { minPrice: 20000000, maxPrice: 30000000 },
  "3Cr – 5Cr": { minPrice: 30000000, maxPrice: 50000000 },
  "5Cr – 8Cr": { minPrice: 50000000, maxPrice: 80000000 },
  "8Cr – 15Cr": { minPrice: 80000000, maxPrice: 150000000 },
  "18 Crore +": { minPrice: 180000000 },
};

const FACING_TO_ENUM: Record<string, string> = {
  East: "EAST",
  North: "NORTH",
  South: "SOUTH",
  West: "WEST",
};

export default function AnimatedHeroSearch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.08]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0.3]);

  const heroTextOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, -30]);

  const searchOpacity = useTransform(smoothProgress, [0.15, 0.5], [0, 1]);
  const searchY = useTransform(smoothProgress, [0.15, 0.5], [60, 0]);
  const searchPointerEvents = useTransform(smoothProgress, (latest) =>
    latest > 0.25 ? "auto" : "none",
  );

  // --- Search Bar State ---
  const [activeDropdown, setActiveDropdown] = useState<
    "location" | "property" | "price" | "area" | null
  >(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [selections, setSelections] = useState({
    location: "",
    property: "Houses & Villas",
    price: "3Cr – 5Cr",
    area: "3–5 Aana",
  });

  const [roadAccess, setRoadAccess] = useState("13-20 ft");
  const [facing, setFacing] = useState("East");
  const [amenities, setAmenities] = useState(["Parking", "Water Supply"]);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = {
    location: [
      "Baluwatar, Ktm",
      "Bhaisepati, Ltp",
      "Sanepa, Ltp",
      "Budhanilkantha, Ktm",
      "Lakeside, Pokhara",
    ],
    property: [
      "Houses & Villas",
      "Apartments",
      "Commercial Lands",
      "Residential Lands",
      "Office Spaces",
    ],
    price: ["2Cr – 3Cr", "3Cr – 5Cr", "5Cr – 8Cr", "8Cr – 15Cr", "18 Crore +"],
    area: ["1–3 Aana", "3–5 Aana", "5–10 Aana", "10–20 Aana", "1 Ropani +"],
  };

  const toggleAmenity = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );
  };

  const dropdownVariants: Variants = {
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
    <section ref={containerRef} className="relative h-[200vh] bg-[#F8F8F5]">
      <div className="sticky top-0 h-[100svh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image Container */}
        <motion.div
          className="absolute inset-0 z-0 h-full w-full will-change-transform bg-black"
          style={
            prefersReducedMotion
              ? undefined
              : { scale: bgScale, transformOrigin: "center center" }
          }
        >
          <motion.div
            className="relative w-full h-full"
            style={{ opacity: prefersReducedMotion ? 1 : bgOpacity }}
          >
            <picture className="absolute inset-0 z-0 h-full w-full">
              <source media="(min-width: 768px)" srcSet="/HERO.jpeg" />
              <img
                src="/MobileHero.jpeg"
                alt="Yeti Homes Hero Background"
                className="object-cover w-full h-full object-top md:object-center"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80 md:to-black/60" />
          </motion.div>
        </motion.div>

        {/* --- HERO TEXT (Fades out on scroll) --- */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-12 lg:p-16 pt-[100px] md:pt-24 pb-8 md:pb-8 pointer-events-none"
          style={{
            opacity: prefersReducedMotion ? 1 : heroTextOpacity,
            y: prefersReducedMotion ? 0 : heroTextY,
          }}
        >
          <div className="hidden md:flex justify-between items-start mt-10 lg:mt-88 pointer-events-auto">
            <p className="text-white/90 text-2xl md:text-lg font-light max-w-[200px] leading-relaxed">
              Premium homes, startegic investments and unmatched service.
            </p>
            <p className="text-white/90 text-sm md:text-base font-light max-w-[200px] text-right leading-relaxed">
              Discover thoughtfully designed homes in exceptional locations.
            </p>
          </div>

          <div className="flex-1 md:hidden"></div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-4 pointer-events-auto w-full">
            <div className="w-full lg:w-1/3">
              <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight drop-shadow-lg">
                Yeti Homes Estate.
                <br />
                The most trusted name in Real Estate.
              </h1>
            </div>

            <div className="w-full lg:w-1/3 flex justify-start lg:justify-center mb-2 lg:mb-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-between gap-4 bg-white/10 backdrop-blur-md border border-white/20 text-white pl-6 pr-2 py-2 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-500 shadow-lg w-full sm:w-auto"
              >
                <span>Request a valuation</span>
                <div className="bg-white text-black p-2 md:p-3 rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-500 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="md:w-5 md:h-5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </button>
            </div>

            <div className="w-full lg:w-1/3 flex flex-row lg:flex-col items-stretch lg:items-end gap-2 sm:gap-4">
              <div className="flex-1 lg:flex-none bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-6 rounded-2xl md:rounded-3xl w-full max-w-none lg:max-w-[280px] text-white shadow-xl flex flex-col justify-center">
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 tracking-tighter">
                  5,000+
                </h3>
                <p className="text-[9px] sm:text-xs md:text-sm font-light opacity-80 uppercase tracking-widest">
                  Curated <span className="hidden sm:inline">Properties</span>
                </p>
              </div>
              <div className="flex-1 lg:flex-none bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-6 rounded-2xl md:rounded-3xl w-full max-w-none lg:max-w-[280px] text-white shadow-xl flex flex-col justify-center">
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 tracking-tighter">
                  99.9%
                </h3>
                <p className="text-[9px] sm:text-xs md:text-sm font-light opacity-80 uppercase tracking-widest">
                  Client <span className="hidden sm:inline">Satisfaction</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- SEARCH COMPONENT --- */}
        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center z-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto"
          style={{
            opacity: prefersReducedMotion ? 1 : searchOpacity,
            y: prefersReducedMotion ? 0 : searchY,
            pointerEvents: searchPointerEvents as any,
          }}
        >
          <div
            ref={searchRef}
            className={`w-full bg-white/10 backdrop-blur-3xl p-3 md:p-4 shadow-[0_30px_60px_rgb(0,0,0,0.5)] border border-white/20 flex flex-col transition-all duration-500 pointer-events-auto rounded-3xl ${isExpanded ? "xl:rounded-[2.5rem]" : "xl:rounded-full"}`}
          >
            <div className="flex flex-col xl:flex-row items-center gap-3 w-full">
              {/* FIXED: Removed overflow-x-auto. Stack inputs gracefully on mobile, inline on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row w-full gap-3">
                {/* Location (Typeable Input) */}
                <div
                  className={`relative flex-1 ${activeDropdown === "location" ? "z-50" : "z-10"}`}
                >
                  <div
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "location" ? null : "location",
                      )
                    }
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-full border transition-all cursor-text h-full ${activeDropdown === "location" ? "border-primary bg-primary/20 ring-1 ring-primary/50" : "border-white/10 hover:border-white/30 hover:bg-white/5"}`}
                  >
                    <Icons.mapPin
                      className={`${activeDropdown === "location" ? "text-primary" : "text-white/80"} shrink-0 transition-colors`}
                      size={20}
                      strokeWidth={1.5}
                    />
                    <input
                      type="text"
                      placeholder="Search by name or ID..."
                      value={selections.location}
                      onChange={(e) => {
                        setSelections((s) => ({
                          ...s,
                          location: e.target.value,
                        }));
                      }}
                      onFocus={() => setActiveDropdown("location")}
                      className="flex-1 bg-transparent text-sm font-bold text-white placeholder-white/40 outline-none w-full"
                    />
                    {selections.location && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelections((s) => ({ ...s, location: "" }));
                        }}
                        className="text-white/40 hover:text-white transition-colors shrink-0"
                      >
                        <Icons.close size={14} />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {activeDropdown === "location" && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full mt-2 left-0 w-full min-w-[240px] max-h-[250px] overflow-y-auto bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      >
                        {options.location
                          .filter((opt) =>
                            opt
                              .toLowerCase()
                              .includes(selections.location.toLowerCase()),
                          )
                          .map((opt) => (
                            <div
                              key={opt}
                              onClick={() => {
                                setSelections((s) => ({ ...s, location: opt }));
                                setActiveDropdown(null);
                              }}
                              className="px-5 py-3 hover:bg-white/10 cursor-pointer flex items-center justify-between group transition-colors text-white"
                            >
                              <span className="text-sm font-medium group-hover:text-primary">
                                {opt}
                              </span>
                              {selections.location === opt && (
                                <Icons.check
                                  size={16}
                                  className="text-primary"
                                />
                              )}
                            </div>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Property Type */}
                <div
                  className={`relative flex-1 ${activeDropdown === "property" ? "z-50" : "z-10"}`}
                >
                  <div
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "property" ? null : "property",
                      )
                    }
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-full border transition-all cursor-pointer h-full ${activeDropdown === "property" ? "border-primary bg-primary/20 ring-1 ring-primary/50" : "border-white/10 hover:border-white/30 hover:bg-white/5"}`}
                  >
                    <Icons.building
                      className={`${activeDropdown === "property" ? "text-primary" : "text-white/80"} shrink-0 transition-colors`}
                      size={20}
                      strokeWidth={1.5}
                    />
                    <div className="flex flex-col truncate flex-1 text-white">
                      <span className="text-[11px] text-white/60 font-medium leading-tight">
                        Property type
                      </span>
                      <span className="text-sm font-bold leading-snug truncate">
                        {selections.property}
                      </span>
                    </div>
                    <Icons.chevronDown
                      size={14}
                      className="text-white/40 shrink-0"
                    />
                  </div>

                  <AnimatePresence>
                    {activeDropdown === "property" && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full mt-2 left-0 w-full min-w-[220px] max-h-[250px] overflow-y-auto bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      >
                        {options.property.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              setSelections((s) => ({ ...s, property: opt }));
                              setActiveDropdown(null);
                            }}
                            className="px-5 py-3 hover:bg-white/10 cursor-pointer flex items-center justify-between group transition-colors text-white"
                          >
                            <span className="text-sm font-medium group-hover:text-primary">
                              {opt}
                            </span>
                            {selections.property === opt && (
                              <Icons.check size={16} className="text-primary" />
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Price */}
                <div
                  className={`relative flex-1 ${activeDropdown === "price" ? "z-50" : "z-10"}`}
                >
                  <div
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "price" ? null : "price",
                      )
                    }
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-full border transition-all cursor-pointer h-full ${activeDropdown === "price" ? "border-primary bg-primary/20 ring-1 ring-primary/50" : "border-white/10 hover:border-white/30 hover:bg-white/5"}`}
                  >
                    <Icons.wallet
                      className={`${activeDropdown === "price" ? "text-primary" : "text-white/80"} shrink-0 transition-colors`}
                      size={20}
                      strokeWidth={1.5}
                    />
                    <div className="flex flex-col truncate flex-1 text-white">
                      <span className="text-[11px] text-white/60 font-medium leading-tight">
                        Price (NPR)
                      </span>
                      <span className="text-sm font-bold leading-snug truncate">
                        {selections.price}
                      </span>
                    </div>
                    <Icons.chevronDown
                      size={14}
                      className="text-white/40 shrink-0"
                    />
                  </div>

                  <AnimatePresence>
                    {activeDropdown === "price" && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full mt-2 left-0 w-full min-w-[200px] max-h-[250px] overflow-y-auto bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      >
                        {options.price.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              setSelections((s) => ({ ...s, price: opt }));
                              setActiveDropdown(null);
                            }}
                            className="px-5 py-3 hover:bg-white/10 cursor-pointer flex items-center justify-between group transition-colors text-white"
                          >
                            <span className="text-sm font-medium group-hover:text-primary">
                              {opt}
                            </span>
                            {selections.price === opt && (
                              <Icons.check size={16} className="text-primary" />
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Area */}
                <div
                  className={`relative flex-1 ${activeDropdown === "area" ? "z-50" : "z-10"}`}
                >
                  <div
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "area" ? null : "area",
                      )
                    }
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-full border transition-all cursor-pointer h-full ${activeDropdown === "area" ? "border-primary bg-primary/20 ring-1 ring-primary/50" : "border-white/10 hover:border-white/30 hover:bg-white/5"}`}
                  >
                    <Icons.maximize
                      className={`${activeDropdown === "area" ? "text-primary" : "text-white/80"} shrink-0 transition-colors`}
                      size={20}
                      strokeWidth={1.5}
                    />
                    <div className="flex flex-col truncate flex-1 text-white">
                      <span className="text-[11px] text-white/60 font-medium leading-tight">
                        Area
                      </span>
                      <span className="text-sm font-bold leading-snug truncate">
                        {selections.area}
                      </span>
                    </div>
                    <Icons.chevronDown
                      size={14}
                      className="text-white/40 shrink-0"
                    />
                  </div>

                  <AnimatePresence>
                    {activeDropdown === "area" && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full mt-2 left-0 lg:-left-4 w-full min-w-[180px] max-h-[250px] overflow-y-auto bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      >
                        {options.area.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              setSelections((s) => ({ ...s, area: opt }));
                              setActiveDropdown(null);
                            }}
                            className="px-5 py-3 hover:bg-white/10 cursor-pointer flex items-center justify-between group transition-colors text-white"
                          >
                            <span className="text-sm font-medium group-hover:text-primary">
                              {opt}
                            </span>
                            {selections.area === opt && (
                              <Icons.check size={16} className="text-primary" />
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full xl:w-auto shrink-0 pt-1 xl:pt-0">
                <button
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                    setActiveDropdown(null);
                  }}
                  className={`flex-1 xl:flex-none flex items-center justify-center gap-2 px-6 py-4 xl:py-3.5 rounded-full border transition-all shrink-0 ${isExpanded ? "border-primary bg-primary text-white shadow-md" : "border-white/20 text-white hover:border-white/50 hover:bg-white/10"}`}
                >
                  <Icons.slidersHorizontal
                    className={isExpanded ? "text-white" : "text-white/80"}
                    size={18}
                    strokeWidth={2}
                  />
                  <span className="text-sm font-bold">More</span>
                </button>

                <button
                  onClick={() => {
                    // Build the route and query params from selections
                    const route =
                      PROPERTY_TYPE_ROUTE[selections.property] || "/houses";
                    const params = new URLSearchParams();

                    // Location -> search query (supports name and ID)
                    if (selections.location) {
                      params.set("q", selections.location.trim());
                    }

                    // Price
                    const priceRange = PRICE_RANGE_MAP[selections.price];
                    if (priceRange) {
                      if (priceRange.minPrice)
                        params.set("minPrice", String(priceRange.minPrice));
                      if (priceRange.maxPrice)
                        params.set("maxPrice", String(priceRange.maxPrice));
                    }

                    // Facing direction
                    if (facing && FACING_TO_ENUM[facing]) {
                      params.set("facingDirection", FACING_TO_ENUM[facing]);
                    }

                    const qs = params.toString();
                    router.push(`${route}${qs ? `?${qs}` : ""}`);
                  }}
                  className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-8 py-4 xl:py-3.5 rounded-full bg-white hover:bg-gray-200 text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] shrink-0"
                >
                  <Icons.search size={18} strokeWidth={2.5} />
                  <span className="text-sm font-bold tracking-wide">
                    Search
                  </span>
                </button>
              </div>
            </div>

            {/* Expandable "More" Panel */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 pb-4 px-4 xl:px-8 border-t border-white/10 mt-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                          Amenities
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Parking",
                            "Garden",
                            "Solar Water",
                            "Security",
                            "Backup Power",
                          ].map((item) => (
                            <button
                              key={item}
                              onClick={() => toggleAmenity(item)}
                              className={`px-3 md:px-4 py-2 rounded-xl border text-xs md:text-sm font-medium transition-colors ${amenities.includes(item) ? "border-primary bg-primary/20 text-primary" : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"}`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                          Road Access
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Below 13 ft", "13-20 ft", "20+ ft"].map((item) => (
                            <button
                              key={item}
                              onClick={() => setRoadAccess(item)}
                              className={`px-3 md:px-4 py-2 rounded-xl border text-xs md:text-sm font-medium transition-colors ${roadAccess === item ? "border-primary bg-primary text-white" : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"}`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                          Facing Direction
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["East", "North", "South", "West"].map((item) => (
                            <button
                              key={item}
                              onClick={() => setFacing(item)}
                              className={`px-3 md:px-4 py-2 rounded-xl border text-xs md:text-sm font-medium transition-colors ${facing === item ? "border-primary bg-primary text-white" : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"}`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <ValuationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
