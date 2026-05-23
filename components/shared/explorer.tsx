"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./mapBox"), { ssr: false });

const PROPERTY_CENTER: [number, number] = [27.671, 85.312];

export default function NeighborhoodExplorer() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 leading-tight">
            Map Location
          </h2>
        </div>

        {/* Full-width Map extending to max-7xl */}
        <div className="w-full relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden  z-10">
          <DynamicMap
            center={PROPERTY_CENTER}
            points={[]}
            color="bg-primary"
          />
        </div>
      </div>
    </section>
  );
}
