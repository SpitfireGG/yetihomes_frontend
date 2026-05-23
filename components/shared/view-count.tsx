"use client";
import { Icons } from "@/components/ui/icons";

import { useEffect, useState } from "react";
import { getPropertyViewStats, type PropertyViewStats } from "@/lib/api";

interface ViewCountProps {
  propertyType: string;
  propertyId: string;
  showLabel?: boolean;
  className?: string;
}

export default function ViewCount({
  propertyType,
  propertyId,
  showLabel = false,
  className = "",
}: ViewCountProps) {
  const [stats, setStats] = useState<PropertyViewStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      try {
        const data = await getPropertyViewStats(propertyType, propertyId);
        if (!cancelled) setStats(data);
      } catch {
        // Silently fail - view count is not critical
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchStats();
    return () => { cancelled = true; };
  }, [propertyType, propertyId]);

  if (loading || !stats) {
    return (
      <div className={`flex items-center gap-1.5 text-gray-400 ${className}`}>
        <Icons.eye size={14} strokeWidth={1.5} />
        <span className="text-xs">--</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 text-gray-500 ${className}`}>
      <Icons.eye size={14} strokeWidth={1.5} />
      <span className="text-xs font-medium">
        {showLabel
          ? `Viewed ${stats.totalViews.toLocaleString()} time${stats.totalViews === 1 ? "" : "s"}`
          : stats.totalViews.toLocaleString()}
      </span>
    </div>
  );
}
