"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion, useMotionValue, useSpring } from "framer-motion";
import SectionHeading from "../shared/sectionHeading";

type ScrollDirection = "left" | "right";

interface LandingCarouselSectionProps<T> {
  title: string;
  items: readonly T[];
  getItemKey: (item: T) => React.Key;
  renderItem: (item: T) => ReactNode;
  trailingContent?: ReactNode;
  sectionClassName?: string;
  headerContainerClassName?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
}

interface LandingCarouselViewAllCardProps {
  label: string;
  href?: string;
  className?: string;
}

const SPRING_CONFIG = {
  damping: 25,
  stiffness: 120,
  mass: 0.5,
};

const DEFAULT_SLIDE_CLASSNAME =
  "w-[85vw] sm:w-[340px] md:w-[380px] lg:w-[400px] shrink-0 min-w-0";
const DEFAULT_VIEW_ALL_CLASSNAME = `${DEFAULT_SLIDE_CLASSNAME} flex items-center justify-center py-12 pr-6 lg:pr-12`;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function LandingCarouselSection<T>({
  title,
  items,
  getItemKey,
  renderItem,
  trailingContent,
  sectionClassName = "relative space-y-10",
  headerContainerClassName = "",
  viewportClassName = "overflow-x-hidden pb-12 cursor-grab active:cursor-grabbing",
  trackClassName = "flex gap-4 lg:gap-6 w-max",
  slideClassName = DEFAULT_SLIDE_CLASSNAME,
}: LandingCarouselSectionProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0 });
  const x = useMotionValue(0);
  const smoothX = useSpring(x, SPRING_CONFIG);

  useEffect(() => {
    const calculateBounds = () => {
      const container = containerRef.current;
      const track = trackRef.current;

      if (!container || !track) return;

      const nextLeft = Math.min(0, container.clientWidth - track.scrollWidth);
      setDragBounds({ left: nextLeft, right: 0 });
      x.set(clamp(x.get(), nextLeft, 0));
    };

    calculateBounds();
    window.addEventListener("resize", calculateBounds);

    return () => window.removeEventListener("resize", calculateBounds);
  }, [x]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      const maxScroll = dragBounds.left;
      if (maxScroll >= 0) return;

      const currentX = x.get();
      const nextX = clamp(currentX - event.deltaY * 1.2, maxScroll, 0);

      if (nextX < 0 && nextX > maxScroll) {
        event.preventDefault();
      }

      x.set(nextX);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => container.removeEventListener("wheel", handleWheel);
  }, [dragBounds, x]);

  const scroll = (direction: ScrollDirection) => {
    const currentX = x.get();
    const scrollAmount =
      window.innerWidth < 768 ? window.innerWidth * 0.85 : 420;
    const nextX =
      direction === "left" ? currentX + scrollAmount : currentX - scrollAmount;

    x.set(clamp(nextX, dragBounds.left, 0));
  };

  return (
    <section className={sectionClassName}>
      <div className={headerContainerClassName}>
        <div className="flex min-w-0 flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <SectionHeading title={title} />
          </div>

          <div className="hidden shrink-0 gap-3 md:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant text-on-surface-variant transition-colors hover:bg-primary-container hover:text-primary"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md transition-colors hover:bg-brand-800"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      <div ref={containerRef} className={viewportClassName}>
        <motion.div
          ref={trackRef}
          style={{ x: smoothX }}
          drag="x"
          dragConstraints={dragBounds}
          dragElastic={0.05}
          onDrag={(_, info) => {
            x.set(x.get() + info.delta.x);
          }}
          className={trackClassName}
        >
          {items.map((item) => (
            <div key={getItemKey(item)} className={slideClassName}>
              {renderItem(item)}
            </div>
          ))}
          {trailingContent}
        </motion.div>
      </div>
    </section>
  );
}

export function LandingCarouselViewAllCard({
  label,
  href = "#",
  className = DEFAULT_VIEW_ALL_CLASSNAME,
}: LandingCarouselViewAllCardProps) {
  return (
    <div className={className}>
      <a
        href={href}
        className="flex flex-col items-center justify-center gap-4 group"
      >
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-outline flex items-center justify-center text-outline group-hover:border-primary group-hover:text-primary group-hover:bg-primary-container transition-all duration-300">
          <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
        </div>
        <span className="font-serif font-medium text-xl text-on-surface-variant group-hover:text-primary transition-colors">
          {label}
        </span>
      </a>
    </div>
  );
}
