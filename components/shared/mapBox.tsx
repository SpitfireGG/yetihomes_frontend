"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapBoxProps {
  center: [number, number];
  points: {
    name: string;
    lat: number;
    lng: number;
    rating: number;
    dist: string;
  }[];
  color: string;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom(), { animate: true });
  return null;
}

export default function MapBox({ center, points, color }: MapBoxProps) {
  // Fix for default marker icons missing in Next.js
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  const createCustomIcon = (colorClass: string) => {
    return L.divIcon({
      className: "custom-div-icon",
      html: `<div class="w-10 h-10 ${colorClass} rounded-full flex items-center justify-center shadow-xl border-4 border-white transform transition-transform hover:scale-110">
              <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
             </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-full z-0"
    >
      <ChangeView center={center} />

      {/* Sleek, minimalistic base map */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {/* Center Property Marker (Dark Navy) */}
      <Marker position={center} icon={createCustomIcon("bg-brand-navy-900")}>
        <Popup className="font-sans font-bold">
          Target Property <br />{" "}
          <span className="font-normal text-xs text-gray-500">Jhamsikhel</span>
        </Popup>
      </Marker>

      {/* Dynamic POI Markers */}
      {points.map((pt, idx) => (
        <Marker
          key={`${pt.name}-${idx}`}
          position={[pt.lat, pt.lng]}
          icon={createCustomIcon(color)}
        >
          <Popup className="font-sans">
            <strong className="text-gray-900">{pt.name}</strong>
            <br />
            <span className="text-xs text-gray-500">
              ⭐ {pt.rating} • {pt.dist}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
