"use client";

import { Icons } from "@/components/ui/icons";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./sectionHeading";
import Link from "next/link";

// --- Formatter for Nepali Currency (Lakhs/Crores) ---
const formatNPR = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function DealSealer() {
  // --- State Management ---
  const [propertyPrice, setPropertyPrice] = useState<number>(25000000); // 2.5 Cr default
  const [earnestPct, setEarnestPct] = useState<number>(10);
  const [feesPct, setFeesPct] = useState<number>(3);
  const [timeline, setTimeline] = useState<string>("Express (10 Days)");

  // --- Constants (Nepal Context) ---
  const REGISTRATION_RATE = 0.05; // Approx 5% for registration & stamp duty

  // --- Calculations ---
  const earnestAmount = propertyPrice * (earnestPct / 100);
  const feesAmount = propertyPrice * (feesPct / 100);
  const registrationAmount = propertyPrice * REGISTRATION_RATE;

  const totalAdvance = earnestAmount + feesAmount + registrationAmount;

  // --- Donut Chart Percentages ---
  const chartData = useMemo(() => {
    const pEarnest = (earnestAmount / totalAdvance) * 100;
    const pReg = (registrationAmount / totalAdvance) * 100;
    const pFees = (feesAmount / totalAdvance) * 100;

    return {
      earnest: pEarnest,
      reg: pEarnest + pReg,
      fees: pEarnest + pReg + pFees,
    };
  }, [earnestAmount, registrationAmount, feesAmount, totalAdvance]);

  return (
    <section className="py-24 px-5 bg-surface-container-low font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionHeading
            title="Estimate Your Upfront Cash"
            description="Calculate the exact advance payment required to seal your property deal."
            align="center"
          />
        </div>

        {/* Main Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-surface-container-lowest rounded-[32px] shadow-xl shadow-brand-navy-900/8 border border-outline-variant p-6 lg:p-10 flex flex-col lg:flex-row gap-10 lg:gap-16"
        >
          {/* LEFT COLUMN: Controls */}
          <div className="flex-1 space-y-10 flex flex-col justify-center">
            {/* Property Price Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="font-medium text-on-surface-variant text-sm">
                  Property Price
                </label>
                <span className="text-2xl font-bold text-on-surface tracking-tight">
                  {formatNPR(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min="5000000"
                max="100000000"
                step="500000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Earnest Money Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="font-medium text-on-surface-variant text-sm">
                  Earnest Money (Token Deposit)
                </label>
                <div className="text-right">
                  <span className="text-xl font-bold text-on-surface">
                    {earnestPct}%
                  </span>
                  <p className="text-xs text-outline mt-0.5">
                    {formatNPR(earnestAmount)}
                  </p>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={earnestPct}
                onChange={(e) => setEarnestPct(Number(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Legal & Agency Fees Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="font-medium text-on-surface-variant text-sm">
                  Approx. Agency & Legal Fees
                </label>
                <div className="text-right">
                  <span className="text-xl font-bold text-on-surface">
                    {feesPct}%
                  </span>
                  <p className="text-xs text-outline mt-0.5">
                    {formatNPR(feesAmount)}
                  </p>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={feesPct}
                onChange={(e) => setFeesPct(Number(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Settlement Timeline Buttons */}
            <div className="pt-2">
              <label className="font-medium text-on-surface-variant text-sm block mb-4">
                Target Settlement Timeline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["60 Days", "30 Days", "15 Days", "Express (10 Days)"].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => setTimeline(opt)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                        timeline === opt
                          ? "bg-primary text-white border-primary shadow-md shadow-brand-700/15"
                          : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary/30 hover:bg-primary-container"
                      }`}
                    >
                      {opt}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Results Card */}
          <div className="flex-1 bg-surface-container-low rounded-[24px] border border-outline-variant p-6 lg:p-8 flex flex-col">
            <div className="text-center mb-8 lg:mb-10">
              <span className="text-outline text-[10px] lg:text-xs font-bold tracking-widest uppercase mb-2 block">
                Total Advance Required
              </span>
              <motion.div
                key={totalAdvance}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl lg:text-5xl font-bold text-on-surface tracking-tight"
              >
                {formatNPR(totalAdvance)}
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-10 lg:gap-8 flex-1">
              {/* Dynamic CSS Donut Chart */}
              <div className="relative w-48 h-48 shrink-0">
                <div
                  className="w-full h-full rounded-full shadow-inner transition-all duration-500 ease-out"
                  style={{
                    background: `conic-gradient(
                      var(--primary) 0% ${chartData.earnest}%, 
                      var(--secondary) ${chartData.earnest}% ${chartData.reg}%, 
                      var(--tertiary) ${chartData.reg}% 100%
                    )`,
                  }}
                ></div>
                <div className="absolute inset-0 m-auto w-32 h-32 bg-surface-container-low rounded-full flex items-center justify-center shadow-sm">
                  <Icons.pieChart
                    className="text-outline"
                    size={32}
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col justify-center space-y-5 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm text-on-surface-variant">
                      Token Deposit
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-on-surface">
                    {formatNPR(earnestAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="text-sm text-on-surface-variant">
                      Registration (5%)
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-on-surface">
                    {formatNPR(registrationAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                    <span className="text-sm text-on-surface-variant">
                      Agency & Legal
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-on-surface">
                    {formatNPR(feesAmount)}
                  </span>
                </div>

                <div className="pt-5 mt-2 border-t border-outline-variant flex items-center justify-between">
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
        </motion.div>

        {/* Link to Tools Page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/tools"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-outline-variant bg-surface-container-lowest text-sm font-bold text-on-surface hover:text-primary hover:border-primary/30 hover:shadow-md transition-all duration-300"
          >
            Explore more real estate tools
            <Icons.arrowRight
              size={16}
              className="text-on-surface-variant group-hover:text-primary transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
