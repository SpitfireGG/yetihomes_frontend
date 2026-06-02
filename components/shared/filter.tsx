"use client";

import { Icons } from "@/components/ui/icons";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PropertyType } from "@/data/property-catalog";
import type { SearchFilters } from "@/lib/api";
import { getLandingPageData } from "@/lib/api";

const formatPrice = (lakhs: number) => {
  if (lakhs >= 100) {
    return `${(lakhs / 100).toFixed(1).replace(".0", "")}Cr`;
  }

  return `${lakhs}L`;
};

const FURNISHING_MAP: Record<string, string> = {
  "Semi-Furnished": "SEMI_FURNISHED",
  Furnished: "FULLY_FURNISHED",
  Unfurnished: "UNFURNISHED",
};

const FACING_MAP: Record<string, string> = {
  East: "EAST",
  West: "WEST",
  North: "NORTH",
  South: "SOUTH",
  "South Facing": "SOUTH",
  "East Facing": "EAST",
  "North Facing": "NORTH",
  "West Facing": "WEST",
  "North-West Facing": "NORTH_WEST",
  "North-East Facing": "NORTH_EAST",
  "South-West Facing": "SOUTH_WEST",
  "South-East Facing": "SOUTH_EAST",
};

type FilterConfig = {
  priceOptions: string[];
  priceRanges: Record<string, { min?: number; max?: number }>;
  areaLabel: string;
  areaUnits: string[];
  areaUnitMap: Record<string, string>;
  typeLabel: string;
  typeOptions: string[];
  typeSubTypeMap: Record<string, string>;
  featureLabel: string;
  featureOptions: string[];
  defaults: {
    locations: string[];
    types: string[];
    features: string[];
    areaUnit: string;
    minPrice: number;
    maxPrice: number;
  };
};

const filterConfigs: Record<PropertyType, FilterConfig> = {
  house: {
    priceOptions: [
      "Under 2 Cr",
      "2 Cr - 3.5 Cr",
      "Above 3.5 Cr",
      "Custom",
    ],
    priceRanges: {
      "Under 2 Cr": { max: 20000000 },
      "2 Cr - 3.5 Cr": { min: 20000000, max: 35000000 },
      "Above 3.5 Cr": { min: 35000000 },
    },
    areaLabel: "Built-up Area",
    areaUnits: ["sq ft"],
    areaUnitMap: { "sq ft": "SQ_FT" },
    typeLabel: "Type Of House",
    typeOptions: [
      "Bungalow",
      "Semi-Bungalow",
      "Villa",
      "Townhouse",
      "Duplex",
      "Colony House",
    ],
    typeSubTypeMap: {
      "Bungalow": "BUNGALOW",
      "Semi-Bungalow": "SEMI_BUNGALOW",
      "Villa": "VILLA",
      "Townhouse": "TOWNHOUSE",
      "Duplex": "DUPLEX",
      "Colony House": "COLONY_HOUSE",
    },
    featureLabel: "Home Features",
    featureOptions: [
      "South Facing",
      "2+ Parking",
      "Semi-Furnished",
      "Garden",
      "Corner Plot",
      "Rooftop Terrace",
    ],
    defaults: {
      locations: [],
      types: [],
      features: [],
      areaUnit: "sq ft",
      minPrice: 100,
      maxPrice: 500,
    },
  },
  land: {
    priceOptions: [
      "Under 50 Lakh/aana",
      "50 Lakh - 1 Cr/aana",
      "Above 1 Cr/aana",
      "Custom",
    ],
    priceRanges: {
      "Under 50 Lakh/aana": { max: 5000000 },
      "50 Lakh - 1 Cr/aana": { min: 5000000, max: 10000000 },
      "Above 1 Cr/aana": { min: 10000000 },
    },
    areaLabel: "Land Area",
    areaUnits: ["Aana", "Ropani", "Sq Ft"],
    areaUnitMap: { Aana: "AANA", Ropani: "ROPANI", "Sq Ft": "SQ_FT" },
    typeLabel: "Type Of Land",
    typeOptions: [
      "Residential Plot",
      "Commercial Land",
      "Agricultural Land",
      "Colony Land",
      "Guthi Land",
    ],
    typeSubTypeMap: {
      "Residential Plot": "RESIDENTIAL_PLOT",
      "Commercial Land": "COMMERCIAL_LAND",
      "Agricultural Land": "AGRICULTURAL_LAND",
      "Colony Land": "COLONY_LAND",
      "Guthi Land": "GUTHI_LAND",
    },
    featureLabel: "Land Features",
    featureOptions: [
      "East Facing",
      "North Facing",
      "13 ft Road",
      "20 ft+ Road",
      "Flat Terrain",
      "Clear Lal Purja",
    ],
    defaults: {
      locations: [],
      types: [],
      features: [],
      areaUnit: "Aana",
      minPrice: 20,
      maxPrice: 180,
    },
  },
  apartment: {
    priceOptions: [
      "Under 1 Cr",
      "1 Cr - 2 Cr",
      "Above 2 Cr",
      "Custom",
    ],
    priceRanges: {
      "Under 1 Cr": { max: 10000000 },
      "1 Cr - 2 Cr": { min: 10000000, max: 20000000 },
      "Above 2 Cr": { min: 20000000 },
    },
    areaLabel: "Built-up Area",
    areaUnits: ["sq ft"],
    areaUnitMap: { "sq ft": "SQ_FT" },
    typeLabel: "Type Of Unit",
    typeOptions: ["Apartment", "Penthouse", "Studio", "Condo", "Luxury"],
    typeSubTypeMap: {
      "Apartment": "APARTMENT",
      "Penthouse": "PENTHOUSE",
      "Studio": "STUDIO",
      "Condo": "CONDO",
      "Luxury": "LUXURY",
    },
    featureLabel: "Apartment Features",
    featureOptions: [
      "Furnished",
      "Lift Access",
      "Parking",
      "Balcony",
      "24/7 Security",
      "Clubhouse",
    ],
    defaults: {
      locations: [],
      types: [],
      features: [],
      areaUnit: "sq ft",
      minPrice: 50,
      maxPrice: 350,
    },
  },
};

function DualRangeSlider({
  min,
  max,
  step,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: {
  min: number;
  max: number;
  step: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (type: "min" | "max", event: React.PointerEvent) => {
    event.preventDefault();
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const rect = track.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (moveEvent.clientX - rect.left) / rect.width),
      );
      const nextValue =
        Math.round((min + percent * (max - min)) / step) * step;

      if (type === "min") {
        onMinChange(Math.min(nextValue, maxValue - step));
        return;
      }

      onMaxChange(Math.max(nextValue, minValue + step));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.style.userSelect = "auto";
    };

    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div
      className="relative h-2 bg-surface-container-high rounded-full mt-10 mb-4"
      ref={trackRef}
    >
      <div
        className="absolute h-full bg-primary rounded-full pointer-events-none"
        style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-20"
        style={{ left: `${minPercent}%` }}
        onPointerDown={(event) => handlePointerDown("min", event)}
      >
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-surface-container-lowest border border-outline-variant shadow-sm px-2.5 py-1 rounded-lg text-[11px] font-bold text-on-surface whitespace-nowrap select-none pointer-events-none">
          {formatPrice(minValue)}
        </div>
        <div className="w-5 h-5 bg-surface-container-lowest border-[3px] border-primary rounded-full shadow-md" />
      </div>

      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-20"
        style={{ left: `${maxPercent}%` }}
        onPointerDown={(event) => handlePointerDown("max", event)}
      >
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-surface-container-lowest border border-outline-variant shadow-sm px-2.5 py-1 rounded-lg text-[11px] font-bold text-on-surface whitespace-nowrap select-none pointer-events-none">
          {formatPrice(maxValue)}
        </div>
        <div className="w-5 h-5 bg-surface-container-lowest border-[3px] border-primary rounded-full shadow-md" />
      </div>
    </div>
  );
}

export default function CustomFilter({
  propertyType,
  onClose,
  onFilterChange,
  onReset,
}: {
  propertyType: PropertyType;
  onClose?: () => void;
  onFilterChange?: (filters: Partial<SearchFilters>) => void;
  onReset?: () => void;
}) {
  const config = filterConfigs[propertyType];

  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    config.defaults.locations,
  );
  const [priceRange, setPriceRange] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    config.defaults.types,
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    config.defaults.features,
  );
  const [selectedAreaUnit, setSelectedAreaUnit] = useState<string>(
    config.defaults.areaUnit,
  );
  const [minArea, setMinArea] = useState<string>("");
  const [maxArea, setMaxArea] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(config.defaults.minPrice);
  const [maxPrice, setMaxPrice] = useState<number>(config.defaults.maxPrice);

  // Dynamic locations from API
  const [apiLocations, setApiLocations] = useState<{ label: string; city: string }[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(true);

  useEffect(() => {
    setLocationsLoading(true);
    getLandingPageData()
      .then((data) => {
        const mapped = data.cities.map((c) => ({
          label: c.city,
          city: c.city,
        }));
        setApiLocations(mapped);
      })
      .catch(() => setApiLocations([]))
      .finally(() => setLocationsLoading(false));
  }, []);

  // Emit filter changes to parent
  const emitFilters = useCallback(() => {
    if (!onFilterChange) return;

    const filters: Partial<SearchFilters> = {
      city: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minArea: undefined,
      maxArea: undefined,
      areaUnit: undefined,
      furnishing: undefined,
      facingDirection: undefined,
      subType: undefined,
    };

    // Location — use city from selected locations
    if (selectedLocations.length > 0) {
      const location = apiLocations.find(
        (l) => l.label === selectedLocations[0],
      );
      if (location) {
        filters.city = location.city;
      }
    }

    // Price range
    if (priceRange && priceRange !== "Custom") {
      const range = config.priceRanges[priceRange];
      if (range) {
        if (range.min !== undefined) filters.minPrice = range.min;
        if (range.max !== undefined) filters.maxPrice = range.max;
      }
    } else if (priceRange === "Custom") {
      // Use the slider values — they're in lakhs, convert to actual amounts
      filters.minPrice = minPrice * 100000;
      filters.maxPrice = maxPrice * 100000;
    }

    // Area
    if (minArea) filters.minArea = parseFloat(minArea);
    if (maxArea) filters.maxArea = parseFloat(maxArea);
    
    if (minArea || maxArea) {
      const mappedUnit = config.areaUnitMap[selectedAreaUnit];
      if (mappedUnit) filters.areaUnit = mappedUnit;
    }

    // Type filter — map selected types to subTypes
    if (selectedTypes.length > 0) {
      const subType = config.typeSubTypeMap[selectedTypes[0]];
      if (subType) {
        filters.subType = subType;
      }
    }

    // Feature-based filters (map to API params)
    for (const feature of selectedFeatures) {
      if (FURNISHING_MAP[feature]) {
        filters.furnishing = FURNISHING_MAP[feature];
      }
      if (FACING_MAP[feature]) {
        filters.facingDirection = FACING_MAP[feature];
      }
    }

    onFilterChange(filters);
  }, [
    selectedLocations,
    priceRange,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    selectedAreaUnit,
    selectedTypes,
    selectedFeatures,
    config,
    onFilterChange,
  ]);

  // Debounce filter emission
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      emitFilters();
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [emitFilters]);

  const toggleValue = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value],
    );
  };

  const clearAll = () => {
    setSelectedLocations([]);
    setPriceRange("");
    setSelectedTypes([]);
    setSelectedFeatures([]);
    setSelectedAreaUnit(config.defaults.areaUnit);
    setMinArea("");
    setMaxArea("");
    setMinPrice(config.defaults.minPrice);
    setMaxPrice(config.defaults.maxPrice);
    onReset?.();
  };

  return (
    <aside className="flex h-full w-full flex-col overflow-y-auto bg-surface-container-lowest font-body custom-scrollbar lg:border-r lg:border-outline-variant">
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest/90 p-5 pb-4 backdrop-blur-sm sm:p-6 sm:pb-4">
        <h2 className="font-headline text-xl font-semibold tracking-tight text-on-surface">
          Custom Filter
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={clearAll}
            className="text-sm font-semibold text-primary hover:text-brand-800 transition-colors"
          >
            Clear all
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-on-surface hover:bg-surface-container-high p-2 rounded-full transition-colors flex items-center justify-center"
            >
              <Icons.close size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-8 p-5 sm:p-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-full px-4 py-2.5">
            <div className="flex items-center gap-2.5 text-on-surface-variant">
              <Icons.mapPin size={18} strokeWidth={2} className="text-outline" />
              <span className="text-sm font-semibold">Location</span>
            </div>
            {selectedLocations.length > 0 && (
              <button onClick={() => setSelectedLocations([])} className="text-outline hover:text-on-surface transition-colors">
                <Icons.close size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>

          <div className="space-y-3 px-1">
            {locationsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-[6px] bg-surface-container-high animate-pulse" />
                    <div className="h-4 w-28 rounded bg-surface-container-high animate-pulse" />
                  </div>
                ))}
              </div>
            ) : apiLocations.length > 0 ? (
              apiLocations.map((location) => (
                <label
                  key={location.label}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={(event) => {
                    event.preventDefault();
                    toggleValue(location.label, setSelectedLocations);
                  }}
                >
                  <div
                    className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all ${
                      selectedLocations.includes(location.label)
                        ? "bg-primary border-primary"
                        : "bg-surface-container-lowest border-outline group-hover:border-primary/40"
                    }`}
                  >
                    {selectedLocations.includes(location.label) && (
                      <Icons.check size={14} strokeWidth={3} className="text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors select-none">
                    {location.label}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-xs text-on-surface-variant">No locations available</p>
            )}
          </div>
        </section>

        <hr className="border-outline-variant" />

        <section className="space-y-4">
          <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-full px-4 py-2.5">
            <div className="flex items-center gap-2.5 text-on-surface-variant">
              <Icons.banknote size={18} strokeWidth={2} className="text-outline" />
              <span className="text-sm font-semibold">Price Range</span>
            </div>
            {priceRange && (
              <button onClick={() => setPriceRange("")} className="text-outline hover:text-on-surface transition-colors">
                <Icons.close size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>

          <div className="space-y-3 px-1">
            {config.priceOptions.map((range) => (
              <label
                key={range}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={(event) => {
                  event.preventDefault();
                  setPriceRange(range);
                }}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    priceRange === range
                      ? "border-primary"
                      : "border-outline group-hover:border-primary/40"
                  }`}
                >
                  {priceRange === range && (
                    <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                  )}
                </div>
                <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors select-none">
                  {range}
                </span>
              </label>
            ))}
          </div>

          <AnimatePresence>
            {priceRange === "Custom" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden px-2"
              >
                <DualRangeSlider
                  min={0}
                  max={1000}
                  step={5}
                  minValue={minPrice}
                  maxValue={maxPrice}
                  onMinChange={setMinPrice}
                  onMaxChange={setMaxPrice}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <hr className="border-outline-variant" />

        <section className="space-y-4">
          <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-full px-4 py-2.5">
            <div className="flex items-center gap-2.5 text-on-surface-variant">
              <Icons.layoutGrid size={18} strokeWidth={2} className="text-outline" />
              <span className="text-sm font-semibold">{config.areaLabel}</span>
            </div>
            {(minArea || maxArea) && (
              <button onClick={() => { setMinArea(""); setMaxArea(""); }} className="text-outline hover:text-on-surface transition-colors">
                <Icons.close size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {config.areaUnits.length > 1 && (
            <div className="flex flex-wrap gap-2.5 px-1">
              {config.areaUnits.map((unit) => (
                <button
                  key={unit}
                  onClick={() => setSelectedAreaUnit(unit)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    selectedAreaUnit === unit
                      ? "bg-primary text-white shadow-md border-primary"
                      : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:border-primary/30 hover:bg-surface-container-low"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 px-1">
            <div className="relative flex-1">
              <input
                type="number"
                value={minArea}
                onChange={(event) => setMinArea(event.target.value)}
                placeholder="Min"
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2.5 pl-4 pr-14 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-outline pointer-events-none">
                {selectedAreaUnit}
              </span>
            </div>
            <div className="relative flex-1">
              <input
                type="number"
                value={maxArea}
                onChange={(event) => setMaxArea(event.target.value)}
                placeholder="Max"
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2.5 pl-4 pr-14 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-outline pointer-events-none">
                {selectedAreaUnit}
              </span>
            </div>
          </div>
        </section>

        <hr className="border-outline-variant" />

        <section className="space-y-4">
          <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-full px-4 py-2.5">
            <div className="flex items-center gap-2.5 text-on-surface-variant">
              <Icons.home size={18} strokeWidth={2} className="text-outline" />
              <span className="text-sm font-semibold">{config.typeLabel}</span>
            </div>
            {selectedTypes.length > 0 && (
              <button onClick={() => setSelectedTypes([])} className="text-outline hover:text-on-surface transition-colors">
                <Icons.close size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>

          <div className="space-y-3 px-1">
            {config.typeOptions.map((typeOption) => (
              <label
                key={typeOption}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={(event) => {
                  event.preventDefault();
                  toggleValue(typeOption, setSelectedTypes);
                }}
              >
                <div
                  className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all ${
                    selectedTypes.includes(typeOption)
                      ? "bg-primary border-primary"
                      : "bg-surface-container-lowest border-outline group-hover:border-primary/40"
                  }`}
                >
                  {selectedTypes.includes(typeOption) && (
                    <Icons.check size={14} strokeWidth={3} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors select-none">
                  {typeOption}
                </span>
              </label>
            ))}
          </div>
        </section>

        <hr className="border-outline-variant" />

        <section className="space-y-4 pb-8">
          <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-full px-4 py-2.5">
            <div className="flex items-center gap-2.5 text-on-surface-variant">
              <Icons.layers size={18} strokeWidth={2} className="text-outline" />
              <span className="text-sm font-semibold">{config.featureLabel}</span>
            </div>
            {selectedFeatures.length > 0 && (
              <button onClick={() => setSelectedFeatures([])} className="text-outline hover:text-on-surface transition-colors">
                <Icons.close size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5 px-1">
            {config.featureOptions.map((feature) => (
              <button
                key={feature}
                onClick={() =>
                  toggleValue(feature, setSelectedFeatures)
                }
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedFeatures.includes(feature)
                    ? "bg-primary text-white shadow-md border-primary"
                    : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:border-primary/30 hover:bg-surface-container-low"
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
