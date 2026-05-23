"use client";
import { Icons } from "@/components/ui/icons";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const SQ_FEET_PER_UNIT = {
  ropani: 5476,
  aana: 342.25,
  paisa: 85.5625,
  daam: 21.390625,
  bigha: 72900,
  kattha: 3645,
  dhur: 182.25,
  sqFeet: 1,
  sqMeter: 10.763910416709722,
} as const;

type LandUnitKey = keyof typeof SQ_FEET_PER_UNIT;

type LandUnitDefinition = {
  key: LandUnitKey;
  label: string;
  shortLabel: string;
  system: "Hill System" | "Terai System" | "Standard Area";
};

const landUnits: LandUnitDefinition[] = [
  {
    key: "ropani",
    label: "Ropani",
    shortLabel: "ROP",
    system: "Hill System",
  },
  {
    key: "aana",
    label: "Aana",
    shortLabel: "AANA",
    system: "Hill System",
  },
  {
    key: "paisa",
    label: "Paisa",
    shortLabel: "PAISA",
    system: "Hill System",
  },
  {
    key: "daam",
    label: "Daam",
    shortLabel: "DAAM",
    system: "Hill System",
  },
  {
    key: "bigha",
    label: "Bigha",
    shortLabel: "BIGHA",
    system: "Terai System",
  },
  {
    key: "kattha",
    label: "Kattha",
    shortLabel: "KATTHA",
    system: "Terai System",
  },
  {
    key: "dhur",
    label: "Dhur",
    shortLabel: "DHUR",
    system: "Terai System",
  },
  {
    key: "sqFeet",
    label: "Sq.Feet",
    shortLabel: "SQ.FT",
    system: "Standard Area",
  },
  {
    key: "sqMeter",
    label: "Sq.Meter",
    shortLabel: "SQ.M",
    system: "Standard Area",
  },
];

const unitGroups = [
  {
    title: "Hill System",
    description: "Most common around Kathmandu valley and hill districts.",
  },
  {
    title: "Terai System",
    description: "Widely used across Terai parcels and registry documents.",
  },
  {
    title: "Standard Area",
    description: "Use standard measurement for plans, drawings, and reports.",
  },
] as const;

const formattedNumber = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 6,
});

function formatValue(value: number) {
  if (!Number.isFinite(value)) {
    return "";
  }

  const rounded = Math.abs(value) < 1e-9 ? 0 : Number(value.toFixed(6));
  return formattedNumber.format(rounded);
}

function formatEditableValue(value: number) {
  if (!Number.isFinite(value)) {
    return "";
  }

  const rounded = Math.abs(value) < 1e-9 ? 0 : Number(value.toFixed(6));
  return rounded.toString();
}

export default function LandUnitConverter() {
  const [activeUnit, setActiveUnit] = useState<LandUnitKey>("ropani");
  const [activeInput, setActiveInput] = useState("1");

  const parsedValue = Number(activeInput);
  const hasValidValue =
    activeInput.trim() !== "" && Number.isFinite(parsedValue) && parsedValue >= 0;

  const derivedValues = useMemo(() => {
    if (!hasValidValue) {
      return null;
    }

    const totalSqFeet = parsedValue * SQ_FEET_PER_UNIT[activeUnit];

    return landUnits.reduce(
      (accumulator, unit) => {
        accumulator[unit.key] = totalSqFeet / SQ_FEET_PER_UNIT[unit.key];
        return accumulator;
      },
      {} as Record<LandUnitKey, number>,
    );
  }, [activeUnit, hasValidValue, parsedValue]);

  const totalSqFeet = derivedValues?.sqFeet ?? 0;
  const totalSqMeter = derivedValues?.sqMeter ?? 0;

  const handleInputChange = (unit: LandUnitKey, value: string) => {
    const sanitized = value.replace(/,/g, "").replace(/[^\d.]/g, "");

    if ((sanitized.match(/\./g) ?? []).length > 1) {
      return;
    }

    setActiveUnit(unit);
    setActiveInput(sanitized);
  };

  const setPreset = (unit: LandUnitKey, value: string) => {
    setActiveUnit(unit);
    setActiveInput(value);
  };

  const handleInputFocus = (unit: LandUnitKey) => {
    if (!derivedValues) {
      setActiveUnit(unit);
      return;
    }

    setActiveUnit(unit);
    setActiveInput(formatEditableValue(derivedValues[unit]));
  };

  const displayValue = (unit: LandUnitKey) => {
    if (unit === activeUnit) {
      return activeInput;
    }

    if (!derivedValues) {
      return "";
    }

    return formatValue(derivedValues[unit]);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="overflow-hidden rounded-[32px] border border-outline-variant bg-surface-container-lowest shadow-xl shadow-brand-navy-900/8"
      >
        <div className="flex flex-col gap-5 border-b border-outline-variant/70 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-outline">
              Live Conversion Base
            </p>
            <h2 className="mt-2 font-headline text-2xl font-semibold tracking-tight text-on-surface">
              {landUnits.find((unit) => unit.key === activeUnit)?.label}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
              Edit any single field and every other Nepali land unit updates at
              the same time.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPreset("ropani", "1")}
              className="rounded-full border border-outline-variant bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-on-surface transition-colors hover:border-primary/25 hover:text-primary"
            >
              1 Ropani
            </button>
            <button
              type="button"
              onClick={() => setPreset("kattha", "1")}
              className="rounded-full border border-outline-variant bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-on-surface transition-colors hover:border-primary/25 hover:text-primary"
            >
              1 Kattha
            </button>
            <button
              type="button"
              onClick={() => setPreset("sqFeet", "1000")}
              className="rounded-full border border-outline-variant bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-on-surface transition-colors hover:border-primary/25 hover:text-primary"
            >
              1000 Sq.Feet
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3">
          {unitGroups.map((group, index) => (
            <section
              key={group.title}
              className={`px-6 py-6 lg:px-8 ${index < unitGroups.length - 1 ? "border-b border-outline-variant/70 lg:border-b-0 lg:border-r" : ""}`}
            >
              <div className="border-b border-outline-variant/50 pb-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-outline">
                  {group.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {group.description}
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {landUnits
                  .filter((unit) => unit.system === group.title)
                  .map((unit) => (
                    <label key={unit.key} className="block">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-on-surface">
                          {unit.label}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-outline">
                          {unit.shortLabel}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={displayValue(unit.key)}
                          onFocus={() => handleInputFocus(unit.key)}
                          onChange={(event) =>
                            handleInputChange(unit.key, event.target.value)
                          }
                          className={`h-14 w-full rounded-2xl border bg-surface px-4 pr-20 text-base font-semibold text-on-surface outline-none transition-colors ${
                            activeUnit === unit.key
                              ? "border-primary/35 shadow-[0_0_0_3px_rgba(127,20,22,0.08)]"
                              : "border-outline-variant focus:border-primary/35"
                          }`}
                        />
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[11px] font-bold uppercase tracking-[0.16em] text-outline">
                          {unit.shortLabel}
                        </span>
                      </div>
                    </label>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-outline-variant/70 bg-surface-container-low px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3 text-sm text-on-surface-variant">
            <Icons.arrowLeftRight size={16} strokeWidth={2} className="text-primary" />
            <span>
              Hill ratio: 1 Ropani = 16 Aana = 64 Paisa = 256 Daam
            </span>
          </div>
          <div className="flex flex-col gap-2 text-sm text-on-surface-variant sm:flex-row sm:items-center sm:gap-6">
            <span>Terai ratio: 1 Bigha = 20 Kattha = 400 Dhur</span>
            <span>
              Total: {formatValue(totalSqFeet)} Sq.Feet / {formatValue(totalSqMeter)} Sq.Meter
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
