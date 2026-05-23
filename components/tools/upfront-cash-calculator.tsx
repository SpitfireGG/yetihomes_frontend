"use client";
import { Icons } from "@/components/ui/icons";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const propertyPriceLimits = {
  min: 5000000,
  max: 100000000,
  step: 500000,
} as const;

const earnestLimits = {
  min: 5,
  max: 25,
  step: 1,
} as const;

const feeLimits = {
  min: 1,
  max: 10,
  step: 0.5,
} as const;

const formatNPR = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(value);
};

function clampValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function UpfrontCashCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(25000000);
  const [earnestPct, setEarnestPct] = useState(10);
  const [feesPct, setFeesPct] = useState(3);
  const [timeline, setTimeline] = useState("Express (10 Days)");

  const registrationRate = 0.05;
  const earnestAmount = propertyPrice * (earnestPct / 100);
  const feesAmount = propertyPrice * (feesPct / 100);
  const registrationAmount = propertyPrice * registrationRate;
  const totalAdvance = earnestAmount + feesAmount + registrationAmount;

  const chartData = useMemo(() => {
    const earnestShare = (earnestAmount / totalAdvance) * 100;
    const registrationShare = (registrationAmount / totalAdvance) * 100;
    const feeShare = (feesAmount / totalAdvance) * 100;

    return {
      earnest: earnestShare,
      registration: earnestShare + registrationShare,
      fees: earnestShare + registrationShare + feeShare,
    };
  }, [earnestAmount, feesAmount, registrationAmount, totalAdvance]);

  const updatePropertyPrice = (value: number) => {
    if (!Number.isFinite(value)) {
      return;
    }

    setPropertyPrice(
      clampValue(value, propertyPriceLimits.min, propertyPriceLimits.max),
    );
  };

  const updateEarnestPct = (value: number) => {
    if (!Number.isFinite(value)) {
      return;
    }

    setEarnestPct(clampValue(value, earnestLimits.min, earnestLimits.max));
  };

  const updateFeesPct = (value: number) => {
    if (!Number.isFinite(value)) {
      return;
    }

    setFeesPct(clampValue(value, feeLimits.min, feeLimits.max));
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-[32px] border border-outline-variant bg-surface-container-lowest p-6 shadow-xl shadow-brand-navy-900/8 lg:p-10"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:gap-16">
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <label className="text-sm font-medium text-on-surface-variant">
                    Property Price
                  </label>
                  <p className="mt-1 text-xs text-outline">
                    Use the slider or type the exact purchase value.
                  </p>
                </div>

                <div className="w-full sm:w-[240px]">
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-xs font-bold uppercase tracking-[0.14em] text-outline">
                      NPR
                    </span>
                    <input
                      type="number"
                      min={propertyPriceLimits.min}
                      max={propertyPriceLimits.max}
                      step={propertyPriceLimits.step}
                      value={propertyPrice}
                      onChange={(event) =>
                        updatePropertyPrice(Number(event.target.value))
                      }
                      className="h-12 w-full rounded-2xl border border-outline-variant bg-surface px-4 pl-14 text-right text-base font-semibold text-on-surface outline-none transition-colors focus:border-primary/35"
                    />
                  </div>
                  <p className="mt-2 text-right text-lg font-bold tracking-tight text-on-surface">
                    {formatNPR(propertyPrice)}
                  </p>
                </div>
              </div>
              <input
                type="range"
                min={propertyPriceLimits.min}
                max={propertyPriceLimits.max}
                step={propertyPriceLimits.step}
                value={propertyPrice}
                onChange={(event) =>
                  updatePropertyPrice(Number(event.target.value))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-high accent-primary"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <label className="text-sm font-medium text-on-surface-variant">
                    Earnest Money (Baina)
                  </label>
                  <p className="mt-1 text-xs text-outline">
                    Set the token deposit as a percentage of the property value.
                  </p>
                </div>

                <div className="w-full sm:w-[180px]">
                  <div className="relative">
                    <input
                      type="number"
                      min={earnestLimits.min}
                      max={earnestLimits.max}
                      step={earnestLimits.step}
                      value={earnestPct}
                      onChange={(event) =>
                        updateEarnestPct(Number(event.target.value))
                      }
                      className="h-12 w-full rounded-2xl border border-outline-variant bg-surface px-4 pr-12 text-right text-base font-semibold text-on-surface outline-none transition-colors focus:border-primary/35"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-bold uppercase tracking-[0.14em] text-outline">
                      %
                    </span>
                  </div>
                  <p className="mt-2 text-right text-xs text-outline">
                    {formatNPR(earnestAmount)}
                  </p>
                </div>
              </div>
              <input
                type="range"
                min={earnestLimits.min}
                max={earnestLimits.max}
                step={earnestLimits.step}
                value={earnestPct}
                onChange={(event) =>
                  updateEarnestPct(Number(event.target.value))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-high accent-primary"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <label className="text-sm font-medium text-on-surface-variant">
                    Agency and Legal Fees
                  </label>
                  <p className="mt-1 text-xs text-outline">
                    Adjust advisory cost assumptions before you compare offers.
                  </p>
                </div>

                <div className="w-full sm:w-[180px]">
                  <div className="relative">
                    <input
                      type="number"
                      min={feeLimits.min}
                      max={feeLimits.max}
                      step={feeLimits.step}
                      value={feesPct}
                      onChange={(event) =>
                        updateFeesPct(Number(event.target.value))
                      }
                      className="h-12 w-full rounded-2xl border border-outline-variant bg-surface px-4 pr-12 text-right text-base font-semibold text-on-surface outline-none transition-colors focus:border-primary/35"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-bold uppercase tracking-[0.14em] text-outline">
                      %
                    </span>
                  </div>
                  <p className="mt-2 text-right text-xs text-outline">
                    {formatNPR(feesAmount)}
                  </p>
                </div>
              </div>
              <input
                type="range"
                min={feeLimits.min}
                max={feeLimits.max}
                step={feeLimits.step}
                value={feesPct}
                onChange={(event) =>
                  updateFeesPct(Number(event.target.value))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-high accent-primary"
              />
            </div>

            <div className="pt-2">
              <label className="mb-4 block text-sm font-medium text-on-surface-variant">
                Target Settlement Timeline
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["60 Days", "30 Days", "15 Days", "Express (10 Days)"].map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTimeline(option)}
                      className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition-all duration-200 ${
                        timeline === option
                          ? "border-primary bg-primary text-white shadow-md shadow-brand-700/15"
                          : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary/30 hover:bg-primary-container"
                      }`}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-[24px] border border-outline-variant bg-surface-container-low p-6 lg:p-8">
            <div className="mb-8 text-center lg:mb-10">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-outline lg:text-xs">
                Total Advance Required
              </span>
              <motion.div
                key={totalAdvance}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-bold tracking-tight text-on-surface lg:text-5xl"
              >
                {formatNPR(totalAdvance)}
              </motion.div>
            </div>

            <div className="flex flex-1 flex-col items-center gap-10 sm:flex-row lg:gap-8">
              <div className="relative h-48 w-48 shrink-0">
                <div
                  className="h-full w-full rounded-full shadow-inner transition-all duration-500 ease-out"
                  style={{
                    background: `conic-gradient(
                      var(--primary) 0% ${chartData.earnest}%,
                      var(--secondary) ${chartData.earnest}% ${chartData.registration}%,
                      var(--tertiary) ${chartData.registration}% 100%
                    )`,
                  }}
                />
                <div className="absolute inset-0 m-auto flex h-32 w-32 items-center justify-center rounded-full bg-surface-container-low shadow-sm">
                  <Icons.pieChart
                    size={32}
                    strokeWidth={1.5}
                    className="text-outline"
                  />
                </div>
              </div>

              <div className="w-full space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-sm text-on-surface-variant">
                      Token Deposit
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-on-surface">
                    {formatNPR(earnestAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-secondary" />
                    <span className="text-sm text-on-surface-variant">
                      Registration (5%)
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-on-surface">
                    {formatNPR(registrationAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-tertiary" />
                    <span className="text-sm text-on-surface-variant">
                      Agency and Legal
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-on-surface">
                    {formatNPR(feesAmount)}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4 border-t border-outline-variant pt-5">
                  <span className="text-sm font-medium text-on-surface-variant">
                    Property Total
                  </span>
                  <span className="text-sm font-bold text-on-surface">
                    {formatNPR(propertyPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-5 flex flex-col gap-3 border-t border-outline-variant/70 pt-5 text-sm text-on-surface-variant lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-3xl leading-relaxed">
          This tool uses a 5% registration reference and adjustable advisory
          fees for early planning. Final obligations can vary by deal structure,
          municipality, and legal scope.
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-outline">
          Timeline: {timeline}
        </p>
      </div>
    </div>
  );
}
