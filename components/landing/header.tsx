"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  IconBuildingSkyscraper,
  IconMap,
  IconHome,
  IconUsers,
  IconBriefcase,
  IconShield,
  IconArrowRight,
  IconChevronDown,
  IconSearch,
  IconMessage,
  IconHelp,
  IconMenu2,
  IconPhone,
  IconX,
  IconSend,
  IconCircleCheck,
  IconSparkles,
  IconRocket,
  IconWorld,
  IconLayoutGrid,
  IconBolt,
  IconChevronRight,
  IconPlus,
  IconMinus,
  IconFileText,
} from "@tabler/icons-react";
import { getNewListings, SearchProperty, searchProperties, submitSupportTicket, getPrimaryImageUrl } from "@/lib/api";

const Icons = {
  building: IconBuildingSkyscraper,
  map: IconMap,
  home: IconHome,
  users: IconUsers,
  briefcase: IconBriefcase,
  shield: IconShield,
  arrowRight: IconArrowRight,
  chevronDown: IconChevronDown,
  chevronRight: IconChevronRight,
  search: IconSearch,
  message: IconMessage,
  help: IconHelp,
  globe: IconWorld,
  menu: IconMenu2,
  phone: IconPhone,
  close: IconX,
  send: IconSend,
  check: IconCircleCheck,
  sparkles: IconSparkles,
  rocket: IconRocket,
  grid: IconLayoutGrid,
  bolt: IconBolt,
  plus: IconPlus,
  minus: IconMinus,
  file: IconFileText,
};

type Leaf = { label: string; slug: string };

type Group = {
  label: string;
  slug: string;
  basePath: string;
  icon: keyof typeof Icons;
  leaves: Leaf[];
};

const PROPERTY_GROUPS: Group[] = [
  {
    label: "Houses",
    slug: "houses",
    basePath: "/houses",
    icon: "home",
    leaves: [
      { label: "Bungalow", slug: "bungalow" },
      { label: "Semi-Bungalow", slug: "semi-bungalow" },
      { label: "Villa", slug: "villa" },
      { label: "Commercial", slug: "commercial" },
      { label: "Semi-Commercial", slug: "semi-commercial" },
      { label: "Flat System House", slug: "flat-system-house" },
      { label: "Colony House", slug: "colony-house" },
    ],
  },
  {
    label: "Lands",
    slug: "lands",
    basePath: "/lands",
    icon: "map",
    leaves: [
      { label: "Commercial", slug: "commercial" },
      { label: "Residential", slug: "residential" },
      { label: "Colony Land", slug: "colony-land" },
      { label: "Investment / Agriculture", slug: "investment-agriculture" },
      { label: "Guthi Land", slug: "guthi-land" },
    ],
  },
  {
    label: "Apartments",
    slug: "apartments",
    basePath: "/apartments",
    icon: "building",
    leaves: [
      { label: "Furnished", slug: "furnished" },
      { label: "Semi-Furnished", slug: "semi-furnished" },
      { label: "Penthouse", slug: "penthouse" },
    ],
  },
];

type Intent = "buy" | "rent";

/** Build a URL that carries intent + type so listing pages can read them. */
const leafHref = (intent: Intent, group: Group, leaf: Leaf) =>
  `${group.basePath}?intent=${intent}&type=${leaf.slug}`;
const groupHref = (intent: Intent, group: Group) =>
  `${group.basePath}?intent=${intent}`;

/* ------------------------------------------------------------------ */
/*  MOBILE DRAWER HELPERS                                             */
/* ------------------------------------------------------------------ */

type MobileSectionProps = {
  icon: React.ReactNode;
  label: string;
  badge?: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  isLink?: boolean;
  isButton?: boolean;
  href?: string;
  onSelect?: () => void;
  children?: React.ReactNode;
};

const MobileSection = ({
  icon,
  label,
  badge,
  open,
  onToggle,
  isLink,
  isButton,
  href,
  onSelect,
  children,
}: MobileSectionProps) => {
  const baseRow =
    "flex items-center gap-3.5 w-full px-4 py-3.5 rounded-2xl text-left text-on-surface hover:bg-surface-container transition-colors group";
  const labelEl = (
    <span className="flex items-center gap-3.5 flex-1 min-w-0">
      <span className="w-9 h-9 rounded-xl bg-primary-container/60 text-primary grid place-items-center shrink-0 group-hover:scale-105 transition-transform">
        {icon}
      </span>
      <span className="text-[15px] font-bold tracking-tight truncate">
        {label}
      </span>
      {badge}
    </span>
  );

  if (isLink && href) {
    return (
      <Link href={href} onClick={onSelect} className={baseRow}>
        {labelEl}
        <Icons.chevronRight
          size={16}
          strokeWidth={2.2}
          className="text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all"
        />
      </Link>
    );
  }

  if (isButton) {
    return (
      <button onClick={onToggle} className={baseRow} type="button">
        {labelEl}
        <Icons.chevronRight
          size={16}
          strokeWidth={2.2}
          className="text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all"
        />
      </button>
    );
  }

  return (
    <div className="px-1">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={baseRow}
        type="button"
      >
        {labelEl}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="text-outline group-hover:text-primary transition-colors"
        >
          <Icons.plus size={16} strokeWidth={2.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && children && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-1 pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PropertyAccordionBody = ({
  intent,
  onSelect,
}: {
  intent: Intent;
  onSelect: () => void;
}) => (
  <div className="px-2 pb-2 pt-1 space-y-3">
    {PROPERTY_GROUPS.map((group) => {
      const GroupIcon = Icons[group.icon];
      return (
        <div key={group.slug}>
          <Link
            href={groupHref(intent, group)}
            onClick={onSelect}
            className="flex items-center gap-2 px-3 py-2 text-[11px] font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
          >
            <GroupIcon size={14} strokeWidth={2.2} />
            {group.label}
          </Link>
          <ul className="ml-3 border-l border-outline-variant/50 pl-3 space-y-0.5">
            {group.leaves.map((leaf) => (
              <li key={leaf.slug}>
                <Link
                  href={leafHref(intent, group, leaf)}
                  onClick={onSelect}
                  className="flex items-center justify-between py-2 px-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors group"
                >
                  <span>{leaf.label}</span>
                  <Icons.chevronRight
                    size={13}
                    className="text-outline opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */

export type RecentListing = {
  id: string;
  title: string;
  location: string;
  price: string;
  href: string;
  postedAgo: string;
  image?: string;
};

const FALLBACK_LISTINGS: RecentListing[] = [
  {
    id: "1",
    title: "Modern Bungalow",
    location: "Baluwatar, KTM",
    price: "रु 4.2 Cr",
    href: "/houses/1",
    postedAgo: "2h ago",
  },
  {
    id: "2",
    title: "Riverside Land Plot",
    location: "Pokhara",
    price: "रु 90 L",
    href: "/lands/2",
    postedAgo: "5h ago",
  },
  {
    id: "3",
    title: "Penthouse Apartment",
    location: "Lalitpur",
    price: "रु 2.8 Cr",
    href: "/apartments/3",
    postedAgo: "1d ago",
  },
  {
    id: "4",
    title: "Colony House",
    location: "Bhaktapur",
    price: "रु 3.1 Cr",
    href: "/houses/4",
    postedAgo: "2d ago",
  },
];

/* ------------------------------------------------------------------ */

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "Tools", path: "/tools" },
];

type MegaKey = "new" | "buy" | "rent" | "company" | null;

function getTimeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Navbar({
  recentListings = FALLBACK_LISTINGS,
}: {
  recentListings?: RecentListing[];
}) {
  const [listings, setListings] = useState<RecentListing[]>(recentListings);

  useEffect(() => {
    getNewListings()
      .then((data: SearchProperty[]) => {
        const mapped: RecentListing[] = data.map((p) => ({
          id: p.id,
          title: p.title,
          location: [p.city, p.district].filter(Boolean).join(", "),
          price: `${p.currency === "USD" ? "$" : "रु"} ${Number(p.priceAmount).toLocaleString()}`,
          href: `/${p.propertyType.toLowerCase()}s/${p.slug}`,
          postedAgo: getTimeAgo(p.createdAt),
          image: getPrimaryImageUrl(p.images || []),
        }));
        setListings(mapped);
      })
      .catch(() => {});
  }, []);

  const [activeMega, setActiveMega] = useState<MegaKey>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProperty[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Support ticket state
  const [supportForm, setSupportForm] = useState({ name: "", email: "", phone: "", subject: "", category: "GENERAL", message: "" });
  const [isSupportSubmitting, setIsSupportSubmitting] = useState(false);
  const [supportSuccess, setSupportSuccess] = useState(false);
  const router = useRouter();

  // Close-delay timer so the mega-menu doesn't snap shut when the cursor
  // crosses the small gap between trigger and panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = useCallback((key: MegaKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(key);
  }, []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMega(null), 120);
  }, []);

  // Lock scroll for full-screen overlays.
  useEffect(() => {
    const lock =
      isMobileMenuOpen || isChatOpen || isSupportOpen || isSearchOpen || isInvestmentModalOpen;
    document.body.style.overflow = lock ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isChatOpen, isSupportOpen, isSearchOpen, isInvestmentModalOpen]);

  // Esc closes whatever mega-menu is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pathname = usePathname();

  // Auto-close the mobile drawer when the route changes.
  // Using a `useRef` keyed to pathname lets us detect a real change
  // without synchronously calling setState in an effect body.
  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsMobileMenuOpen(false);
      setMobileAccordion(null);
    }
  }, [pathname]);

  // Esc also closes the mobile drawer, full-screen overlays and popovers.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      if (isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
      if (isChatOpen) setIsChatOpen(false);
      if (isSupportOpen) {
        setIsSupportOpen(false);
        setSupportSuccess(false);
      }
      if (isInvestmentModalOpen) setIsInvestmentModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen, isSearchOpen, isChatOpen, isSupportOpen, isInvestmentModalOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  }, []);

  const menuVariants: Variants = {
    closed: { opacity: 0, y: "-100%" },
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  };
  const linkStagger: Variants = {
    closed: { opacity: 0, y: 20 },
    open: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * idx + 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };
  const megaVariants: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 16,
      scale: 1,
      transition: { type: "spring", stiffness: 380, damping: 30 },
    },
    exit: { opacity: 0, y: 8, scale: 0.99, transition: { duration: 0.18 } },
  };

  /* ---- a reusable underline used under every top-level item ---- */
  const Underline = () => (
    <motion.div
      layoutId="navUnderline"
      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-t-full z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );

  /* ---- the Buy / Rent mega-menu body (shared, intent-driven) ---- */
  const ShopMega = ({ intent }: { intent: Intent }) => (
    <motion.div
      variants={megaVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={() => openMega(intent)}
      onMouseLeave={scheduleClose}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[920px] bg-surface-container-lowest rounded-3xl shadow-2xl shadow-black/10 border border-outline-variant overflow-hidden cursor-default z-50"
    >
      <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-outline-variant/60">
        <h3 className="text-xs font-bold tracking-widest uppercase text-outline">
          {intent === "buy" ? "Properties to Buy" : "Properties to Rent"}
        </h3>
        <Link
          href={`/houses?intent=${intent}`}
          className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
          onClick={() => setActiveMega(null)}
        >
          Browse all <Icons.arrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-x-6 p-8">
        {PROPERTY_GROUPS.map((group) => {
          const GroupIcon = Icons[group.icon];
          return (
            <div key={group.slug}>
              <Link
                href={groupHref(intent, group)}
                onClick={() => setActiveMega(null)}
                className="flex items-center gap-2.5 mb-4 group"
              >
                <span className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-primary-container group-hover:text-primary transition-colors">
                  {GroupIcon ? <GroupIcon size={18} strokeWidth={2} /> : null}
                </span>
                <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  {group.label}
                </span>
              </Link>
              <ul className="space-y-1 border-l border-outline-variant/60 pl-3 ml-3.5">
                {group.leaves.map((leaf) => (
                  <li key={leaf.slug}>
                    <Link
                      href={leafHref(intent, group, leaf)}
                      onClick={() => setActiveMega(null)}
                      className="block py-1.5 text-[13px] font-medium text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all"
                    >
                      {leaf.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <>
      <header className="flex items-center justify-between px-6 lg:px-12 py-2.5 border-b border-outline-variant bg-surface/80 backdrop-blur-md sticky top-0 z-[60] transition-all font-sans">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group z-50 relative shrink-0">
          <div className="relative w-11 h-11 group-hover:scale-105 transition-transform duration-300">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block w-full h-full"
            >
              <Image
                src="/Yeti-Logo-01.svg"
                alt="Yeti Homes Estate"
                fill
                sizes="44px"
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-9 text-sm font-semibold text-on-surface-variant relative h-full"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {/* Home */}
          <Link
            href="/"
            className={`relative py-2 px-1 transition-colors ${hoveredPath === "/" ? "text-on-surface" : "hover:text-on-surface"}`}
            onMouseEnter={() => {
              setHoveredPath("/");
              scheduleClose();
            }}
          >
            <span className="relative z-10">Home</span>
            {hoveredPath === "/" && <Underline />}
          </Link>

          {/* New Listings */}
          <div
            className="relative py-2 px-1"
            onMouseEnter={() => {
              openMega("new");
              setHoveredPath("new");
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 font-semibold relative z-10 transition-colors ${activeMega === "new" ? "text-on-surface" : "hover:text-on-surface"}`}
            >
              New Listings
              <span className="ml-1 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </button>
            {hoveredPath === "new" && <Underline />}
            <AnimatePresence>
              {activeMega === "new" && (
                <motion.div
                  variants={megaVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onMouseEnter={() => openMega("new")}
                  onMouseLeave={scheduleClose}
                  className="absolute top-full left-0 w-[420px] bg-surface-container-lowest rounded-3xl shadow-2xl shadow-black/10 border border-outline-variant overflow-hidden cursor-default z-50"
                >
                  <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-outline-variant/60">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-outline">
                      Fresh in the last 7 days
                    </h3>
                    <Link
                      href="/houses?sort=newest"
                      onClick={() => setActiveMega(null)}
                      className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      See all <Icons.arrowRight size={13} />
                    </Link>
                  </div>
                  <ul className="p-3">
                    <AnimatePresence initial={false} mode="popLayout">
                      {listings.slice(0, 4).map((l) => (
                        <motion.li
                          key={l.id}
                          layout
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 34,
                          }}
                        >
                          <Link
                            href={l.href}
                            onClick={() => setActiveMega(null)}
                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-surface-container-low transition-colors group"
                          >
                            <div className="w-14 h-14 rounded-xl bg-surface-container-low overflow-hidden shrink-0 relative">
                              {l.image ? (
                                <Image
                                  src={l.image}
                                  alt={l.title}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              ) : (
                                <span className="absolute inset-0 grid place-items-center text-on-surface-variant/40">
                                  <Icons.building size={20} />
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                                {l.title}
                              </p>
                              <p className="text-[11px] text-on-surface-variant truncate">
                                {l.location}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-bold text-primary">
                                  {l.price}
                                </span>
                                <span className="text-[10px] text-outline">
                                  · {l.postedAgo}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Buy */}
          <div
            className="relative py-2 px-1"
            onMouseEnter={() => {
              openMega("buy");
              setHoveredPath("buy");
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 font-semibold relative z-10 transition-colors ${activeMega === "buy" ? "text-on-surface" : "hover:text-on-surface"}`}
            >
              Buy
              <Icons.chevronDown
                size={16}
                strokeWidth={2.5}
                className={`transition-transform duration-300 ${activeMega === "buy" ? "rotate-180 text-primary" : ""}`}
              />
            </button>
            {hoveredPath === "buy" && <Underline />}
            <AnimatePresence>
              {activeMega === "buy" && <ShopMega intent="buy" />}
            </AnimatePresence>
          </div>

          {/* Rent */}
          <div
            className="relative py-2 px-1"
            onMouseEnter={() => {
              openMega("rent");
              setHoveredPath("rent");
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 font-semibold relative z-10 transition-colors ${activeMega === "rent" ? "text-on-surface" : "hover:text-on-surface"}`}
            >
              Rent
              <Icons.chevronDown
                size={16}
                strokeWidth={2.5}
                className={`transition-transform duration-300 ${activeMega === "rent" ? "rotate-180 text-primary" : ""}`}
              />
            </button>
            {hoveredPath === "rent" && <Underline />}
            <AnimatePresence>
              {activeMega === "rent" && <ShopMega intent="rent" />}
            </AnimatePresence>
          </div>

          {/* Investment */}
          <button
            onClick={() => setIsInvestmentModalOpen(true)}
            className={`relative py-2 px-1 transition-colors ${hoveredPath === "investment" ? "text-on-surface" : "hover:text-on-surface"}`}
            onMouseEnter={() => {
              setHoveredPath("investment");
              scheduleClose();
            }}
          >
            <span className="relative z-10">Investment</span>
            {hoveredPath === "investment" && <Underline />}
          </button>

          {/* Article */}
          <Link
            href="/blog"
            className={`relative py-2 px-1 transition-colors ${hoveredPath === "article" ? "text-on-surface" : "hover:text-on-surface"}`}
            onMouseEnter={() => {
              setHoveredPath("article");
              scheduleClose();
            }}
          >
            <span className="relative z-10">Article</span>
            {hoveredPath === "article" && <Underline />}
          </Link>

          {/* Company */}
          <div
            className="relative py-2 px-1"
            onMouseEnter={() => {
              openMega("company");
              setHoveredPath("company");
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 font-semibold relative z-10 transition-colors ${activeMega === "company" ? "text-on-surface" : "hover:text-on-surface"}`}
            >
              Company
              <Icons.chevronDown
                size={16}
                strokeWidth={2.5}
                className={`transition-transform duration-300 ${activeMega === "company" ? "rotate-180 text-primary" : ""}`}
              />
            </button>
            {hoveredPath === "company" && <Underline />}
            <AnimatePresence>
              {activeMega === "company" && (
                <motion.div
                  variants={megaVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onMouseEnter={() => openMega("company")}
                  onMouseLeave={scheduleClose}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[960px] bg-surface-container-lowest rounded-3xl shadow-2xl shadow-black/10 border border-outline-variant overflow-hidden flex cursor-default z-50"
                >
                  <div className="flex-1 p-8 grid grid-cols-2 gap-x-8 gap-y-10">
                    <div>
                      <h3 className="text-xs font-bold tracking-widest uppercase text-outline mb-5">
                        Who We Are
                      </h3>
                      <ul className="space-y-4">
                        {[
                          {
                            href: "/about",
                            icon: "building" as const,
                            t: "About Company",
                            d: "Learn about Yeti Homes Estate.",
                          },
                          {
                            href: "/teams",
                            icon: "users" as const,
                            t: "Meet Our Team",
                            d: "The local experts guiding you.",
                          },
                          {
                            href: "/careers",
                            icon: "briefcase" as const,
                            t: "Careers",
                            d: "Join the Yeti Homes Estate family.",
                          },
                        ].map((it) => {
                          const I = Icons[it.icon];
                          return (
                            <li key={it.href}>
                              <Link
                                href={it.href}
                                onClick={() => setActiveMega(null)}
                                className="flex items-start gap-3 group"
                              >
                                <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-primary-container group-hover:text-primary transition-colors">
                                  {I ? <I size={18} strokeWidth={2} /> : null}
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                                    {it.t}
                                  </p>
                                  <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                    {it.d}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold tracking-widest uppercase text-outline mb-5">
                        Trust &amp; Security
                      </h3>
                      <ul className="space-y-4">
                        {[
                          {
                            href: "/legal/cookies",
                            t: "Cookies Policy",
                            d: "How we use cookies.",
                          },
                          {
                            href: "/legal/terms-conditions",
                            t: "Terms & Conditions",
                            d: "Agreement on our terms.",
                          },
                          {
                            href: "/legal/disclaimer",
                            t: "Disclaimer & Advisory",
                            d: "Disclaimer and advisory.",
                          },
                          {
                            href: "/legal/privacy",
                            t: "Privacy Policy",
                            d: "Your data and privacy.",
                          },
                          {
                            href: "/testimonials",
                            t: "Testimonials",
                            d: "Read stories from our buyers.",
                          },
                        ].map((it) => (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              onClick={() => setActiveMega(null)}
                              className="flex items-start gap-3 group"
                            >
                              <div className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:bg-secondary-container group-hover:text-secondary transition-colors">
                                <Icons.shield size={18} strokeWidth={2} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">
                                  {it.t}
                                </p>
                                <p className="text-[11px] font-medium text-on-surface-variant mt-0.5 leading-snug">
                                  {it.d}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    <div className="relative z-10">
                      <span className="inline-block px-2.5 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded mb-3">
                        Our Mission
                      </span>
                      <h4 className="text-white font-bold text-lg leading-tight mb-2">
                        Transforming Nepal&apos;s Real Estate Market.
                      </h4>
                      <Link
                        href="/blog"
                        onClick={() => setActiveMega(null)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors mt-2"
                      >
                        Read our story <Icons.arrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right side: utilities */}
        <div className="flex items-center gap-4 text-on-surface-variant z-50">
          <div className="hidden sm:flex items-center gap-4">
            {[
              {
                icon: "search" as const,
                label: "Search",
                onClick: () => setIsSearchOpen(true),
              },
              {
                icon: "message" as const,
                label: "Chat",
                onClick: () => setIsChatOpen(true),
              },
              {
                icon: "help" as const,
                label: "Support",
                onClick: () => setIsSupportOpen(true),
              },
            ].map((b) => {
              const I = Icons[b.icon];
              return (
                <button
                  key={b.label}
                  onClick={b.onClick}
                  className="hover:text-primary transition-colors relative group"
                >
                  {I ? <I size={18} strokeWidth={2} /> : null}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {b.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-px h-5 bg-outline-variant hidden sm:block mx-1" />

          {/* Language / currency */}
          <div className="hidden sm:flex items-center gap-3">
            <Icons.globe size={16} strokeWidth={1.5} className="text-outline" />
            <span className="text-xs font-bold text-on-surface-variant">EN</span>
            <span className="text-xs text-outline">|</span>
            <span className="text-xs font-bold text-on-surface-variant">NPR</span>
          </div>

          {/* Mobile triggers */}
          <div className="flex items-center gap-0.5 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="z-50 text-on-surface hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low"
            >
              <Icons.search size={20} strokeWidth={2.2} />
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              aria-label="Chat with us"
              className="z-50 text-on-surface hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low"
            >
              <Icons.message size={20} strokeWidth={2.2} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="z-50 relative text-on-surface hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low w-10 h-10 flex items-center justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icons.close size={20} strokeWidth={2.2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icons.menu size={22} strokeWidth={2.2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MOBILE DRAWER                                                */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              key="mobile-backdrop"
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[65] bg-black/55 backdrop-blur-sm lg:hidden cursor-default"
            />

            {/* Drawer */}
            <motion.aside
              key="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 z-[68] w-full sm:max-w-md bg-surface-container-lowest shadow-2xl shadow-black/25 flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-outline-variant/50">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2.5"
                >
                  <div className="relative w-9 h-9">
                    <Image
                      src="/Yeti-Logo-01.svg"
                      alt="Yeti Homes Estate"
                      fill
                      sizes="36px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-headline text-sm font-extrabold tracking-[0.28em] text-on-surface">
                    YETI HOMES
                  </span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="w-9 h-9 grid place-items-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                >
                  <Icons.close size={20} strokeWidth={2.2} />
                </button>
              </div>

              {/* Quick utility row */}
              <div className="grid grid-cols-3 gap-2 px-5 pt-5">
                {[
                  {
                    icon: "search" as const,
                    label: "Search",
                    onClick: () => {
                      closeMobileMenu();
                      setIsSearchOpen(true);
                    },
                  },
                  {
                    icon: "message" as const,
                    label: "WhatsApp",
                    onClick: () => {
                      closeMobileMenu();
                      setIsChatOpen(true);
                    },
                  },
                  {
                    icon: "help" as const,
                    label: "Support",
                    onClick: () => {
                      closeMobileMenu();
                      setIsSupportOpen(true);
                    },
                  },
                ].map((b) => {
                  const I = Icons[b.icon];
                  return (
                    <button
                      key={b.label}
                      onClick={b.onClick}
                      className="group flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 hover:border-primary/30 hover:bg-primary-container/40 transition-colors"
                    >
                      <span className="text-on-surface-variant group-hover:text-primary transition-colors">
                        {I ? <I size={18} strokeWidth={2} /> : null}
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-on-surface-variant group-hover:text-primary transition-colors">
                        {b.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Nav scroll area */}
              <nav
                aria-label="Mobile primary"
                className="flex-1 overflow-y-auto px-3 py-5 overscroll-contain"
              >
                <MobileSection
                  icon={<Icons.home size={20} strokeWidth={2} />}
                  label="Home"
                  badge={null}
                  open={mobileAccordion === "home"}
                  onToggle={() =>
                    setMobileAccordion(mobileAccordion === "home" ? null : "home")
                  }
                  isLink
                  href="/"
                  onSelect={closeMobileMenu}
                />

                {/* New Listings */}
                <MobileSection
                  icon={<Icons.sparkles size={20} strokeWidth={2} />}
                  label="New Listings"
                  badge={
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {listings.length} new
                    </span>
                  }
                  open={mobileAccordion === "new"}
                  onToggle={() =>
                    setMobileAccordion(mobileAccordion === "new" ? null : "new")
                  }
                >
                  <div className="px-2 pb-3 pt-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-outline px-3 pb-2">
                      Fresh in the last 7 days
                    </p>
                    {listings.length === 0 ? (
                      <p className="px-3 py-4 text-sm text-on-surface-variant">
                        No new listings yet.
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {listings.slice(0, 5).map((l) => (
                          <li key={l.id}>
                            <Link
                              href={l.href}
                              onClick={closeMobileMenu}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container transition-colors group"
                            >
                              <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden relative shrink-0">
                                {l.image ? (
                                  <Image
                                    src={l.image}
                                    alt={l.title}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <span className="absolute inset-0 grid place-items-center text-on-surface-variant/40">
                                    <Icons.building size={16} />
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                                  {l.title}
                                </p>
                                <p className="text-[11px] text-on-surface-variant truncate">
                                  {l.location}
                                </p>
                              </div>
                              <span className="text-xs font-bold text-primary shrink-0">
                                {l.price}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href="/houses?sort=newest"
                      onClick={closeMobileMenu}
                      className="mt-2 mx-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold tracking-widest uppercase text-primary hover:bg-primary-container/40 rounded-xl transition-colors"
                    >
                      See all <Icons.arrowRight size={13} strokeWidth={2.5} />
                    </Link>
                  </div>
                </MobileSection>

                {/* Buy */}
                <MobileSection
                  icon={<Icons.building size={20} strokeWidth={2} />}
                  label="Buy"
                  badge={
                    <span className="ml-auto text-[10px] font-bold tracking-widest uppercase text-outline">
                      Properties to Buy
                    </span>
                  }
                  open={mobileAccordion === "buy"}
                  onToggle={() =>
                    setMobileAccordion(mobileAccordion === "buy" ? null : "buy")
                  }
                >
                  <PropertyAccordionBody intent="buy" onSelect={closeMobileMenu} />
                  <Link
                    href="/houses?intent=buy"
                    onClick={closeMobileMenu}
                    className="mt-1 mx-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold tracking-widest uppercase text-primary hover:bg-primary-container/40 rounded-xl transition-colors"
                  >
                    Browse all <Icons.arrowRight size={13} strokeWidth={2.5} />
                  </Link>
                </MobileSection>

                {/* Rent */}
                <MobileSection
                  icon={<Icons.bolt size={20} strokeWidth={2} />}
                  label="Rent"
                  badge={
                    <span className="ml-auto text-[10px] font-bold tracking-widest uppercase text-outline">
                      Properties to Rent
                    </span>
                  }
                  open={mobileAccordion === "rent"}
                  onToggle={() =>
                    setMobileAccordion(mobileAccordion === "rent" ? null : "rent")
                  }
                >
                  <PropertyAccordionBody intent="rent" onSelect={closeMobileMenu} />
                  <Link
                    href="/houses?intent=rent"
                    onClick={closeMobileMenu}
                    className="mt-1 mx-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold tracking-widest uppercase text-primary hover:bg-primary-container/40 rounded-xl transition-colors"
                  >
                    Browse all <Icons.arrowRight size={13} strokeWidth={2.5} />
                  </Link>
                </MobileSection>

                {/* Investment */}
                <MobileSection
                  icon={<Icons.rocket size={20} strokeWidth={2} />}
                  label="Investment"
                  badge={
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-tertiary">
                      Coming soon
                    </span>
                  }
                  open={false}
                  onToggle={() => {
                    closeMobileMenu();
                    setIsInvestmentModalOpen(true);
                  }}
                  isButton
                />

                {/* Company */}
                <MobileSection
                  icon={<Icons.users size={20} strokeWidth={2} />}
                  label="Company"
                  badge={null}
                  open={mobileAccordion === "company"}
                  onToggle={() =>
                    setMobileAccordion(mobileAccordion === "company" ? null : "company")
                  }
                >
                  <div className="px-2 pb-3 pt-1 space-y-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-outline px-3 pb-1">
                      Who We Are
                    </p>
                    {[
                      { href: "/about", icon: "building" as const, label: "About Company" },
                      { href: "/teams", icon: "users" as const, label: "Meet Our Team" },
                      { href: "/careers", icon: "briefcase" as const, label: "Careers" },
                    ].map((it) => {
                      const I = Icons[it.icon];
                      return (
                        <Link
                          key={it.href}
                          href={it.href}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container transition-colors group"
                        >
                          <span className="w-8 h-8 rounded-lg bg-primary-container/50 grid place-items-center text-primary">
                            {I ? <I size={15} strokeWidth={2} /> : null}
                          </span>
                          <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                            {it.label}
                          </span>
                          <Icons.chevronRight
                            size={14}
                            className="ml-auto text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                          />
                        </Link>
                      );
                    })}
                    <p className="text-[10px] font-bold tracking-widest uppercase text-outline px-3 pt-3 pb-1">
                      Trust & Security
                    </p>
                    {[
                      { href: "/legal/cookies", label: "Cookies Policy" },
                      { href: "/legal/terms-conditions", label: "Terms & Conditions" },
                      { href: "/legal/disclaimer", label: "Disclaimer & Advisory" },
                      { href: "/legal/privacy", label: "Privacy Policy" },
                      { href: "/testimonials", label: "Testimonials" },
                    ].map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-secondary-container/60 grid place-items-center text-secondary">
                          <Icons.shield size={15} strokeWidth={2} />
                        </span>
                        <span className="text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors">
                          {it.label}
                        </span>
                        <Icons.chevronRight
                          size={14}
                          className="ml-auto text-outline group-hover:text-secondary group-hover:translate-x-0.5 transition-all"
                        />
                      </Link>
                    ))}
                  </div>
                </MobileSection>

                <div className="h-px bg-outline-variant/40 my-3 mx-3" />

                {/* Article */}
                <MobileSection
                  icon={<Icons.file size={20} strokeWidth={2} />}
                  label="Article"
                  badge={null}
                  open={false}
                  onToggle={() => {}}
                  isLink
                  href="/blog"
                  onSelect={closeMobileMenu}
                />

                {/* Tools */}
                <MobileSection
                  icon={<Icons.grid size={20} strokeWidth={2} />}
                  label="Tools"
                  badge={null}
                  open={false}
                  onToggle={() => {}}
                  isLink
                  href="/tools"
                  onSelect={closeMobileMenu}
                />
              </nav>

              {/* Drawer footer: language, currency, contact CTAs */}
              <div className="border-t border-outline-variant/50 bg-surface-container-low/60 backdrop-blur-sm">
                <div className="px-5 pt-4 pb-2 flex items-center justify-center gap-3">
                  <Icons.globe size={16} strokeWidth={1.5} className="text-outline" />
                  <span className="text-xs font-bold text-on-surface-variant">EN</span>
                  <span className="text-xs text-outline">|</span>
                  <span className="text-xs font-bold text-on-surface-variant">NPR</span>
                </div>

                <div className="px-5 pb-5 pt-2 grid grid-cols-2 gap-2">
                  <a
                    href="tel:+9779768998508"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-outline-variant/60 text-on-surface text-xs font-bold tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
                  >
                    <Icons.phone size={15} strokeWidth={2.2} />
                    Call
                  </a>
                  <a
                    href="https://wa.me/9779768998508?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20properties."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#20BD5A] transition-colors"
                  >
                    <Icons.message size={15} strokeWidth={2.2} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex flex-col"
          >
            <div className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/10">
              <h3 className="text-white text-lg font-semibold tracking-wide">Search Properties</h3>
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); setSearchResults([]); }} className="text-white/60 hover:text-white transition-colors">
                <Icons.close size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8">
              <div className="max-w-2xl mx-auto">
                <div className="relative mb-8">
                  <Icons.search size={20} strokeWidth={2} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search by name, ID, or location..."
                    value={searchQuery}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchQuery(val);
                      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
                      if (val.trim().length < 2) { setSearchResults([]); return; }
                      setIsSearching(true);
                      searchTimerRef.current = setTimeout(async () => {
                        try {
                          const trimmed = val.trim();
                          const filters: Parameters<typeof searchProperties>[0] = trimmed.match(/^[A-Z]{2,4}-\d+$/)
                            ? { propertyCode: trimmed, limit: 10 }
                            : { q: trimmed, limit: 10 };
                          const res = await searchProperties(filters);
                          setSearchResults(res.data);
                        } catch { setSearchResults([]); }
                        finally { setIsSearching(false); }
                      }, 400);
                    }}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-2xl pl-14 pr-5 py-4 text-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                {isSearching && <p className="text-white/50 text-sm text-center">Searching...</p>}
                {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
                  <p className="text-white/50 text-sm text-center">No properties found matching &quot;{searchQuery}&quot;</p>
                )}
                <div className="space-y-3">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      href={`/${p.propertyType.toLowerCase()}s/${p.slug}`}
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(""); setSearchResults([]); }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-white/10 overflow-hidden shrink-0 relative">
                        {p.images?.[0]?.url ? (
                          <Image src={p.images[0].url} alt={p.title} fill sizes="56px" className="object-cover" />
                        ) : (
                          <span className="absolute inset-0 grid place-items-center text-white/30"><Icons.building size={20} /></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold truncate group-hover:text-primary transition-colors">{p.title}</p>
                        <p className="text-white/50 text-xs truncate">{p.locationText || p.city}</p>
                        {p.propertyCode && <p className="text-white/40 text-[11px] mt-0.5">ID: {p.propertyCode}</p>}
                      </div>
                      <span className="text-white/60 text-sm font-semibold shrink-0">रु {Number(p.priceAmount).toLocaleString()}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Overlay (WhatsApp) */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsChatOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-surface-container-lowest rounded-[2rem] p-10 max-w-md w-full editorial-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsChatOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
                <Icons.close size={24} />
              </button>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-3 text-on-surface">Chat with Us</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Connect with our property experts on WhatsApp for instant assistance.
                </p>
              </div>
              <a
                href="https://wa.me/9779768998508?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-[#25D366] text-white py-4 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-[#20BD5A] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Open WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Ticket Overlay */}
      <AnimatePresence>
        {isSupportOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { setIsSupportOpen(false); setSupportSuccess(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-surface-container-lowest rounded-[2rem] p-8 max-w-md w-full editorial-shadow max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => { setIsSupportOpen(false); setSupportSuccess(false); }} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
                <Icons.close size={24} />
              </button>

              {supportSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icons.check size={40} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight text-black">Ticket Submitted!</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    Our support team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Icons.help size={28} strokeWidth={1.5} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight mb-2 text-on-surface">Support Ticket</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Fill out the form below and our team will assist you.
                    </p>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSupportSubmitting(true);
                      try {
                        await submitSupportTicket(supportForm);
                        setSupportSuccess(true);
                      } catch (err) {
                        console.error(err);
                        alert("Failed to submit ticket. Please try again.");
                      } finally {
                        setIsSupportSubmitting(false);
                      }
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Name</label>
                      <input required type="text" value={supportForm.name} onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-black transition-colors bg-gray-50/50 text-sm" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Email</label>
                      <input required type="email" value={supportForm.email} onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-black transition-colors bg-gray-50/50 text-sm" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Phone (Optional)</label>
                      <input type="tel" value={supportForm.phone} onChange={(e) => setSupportForm({ ...supportForm, phone: e.target.value })} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-black transition-colors bg-gray-50/50 text-sm" placeholder="Your phone number" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Category</label>
                      <select value={supportForm.category} onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-black transition-colors bg-gray-50/50 text-sm">
                        <option value="GENERAL">General Inquiry</option>
                        <option value="PROPERTY">Property Question</option>
                        <option value="BOOKING">Booking Issue</option>
                        <option value="TECHNICAL">Technical Support</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Subject</label>
                      <input required type="text" value={supportForm.subject} onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-black transition-colors bg-gray-50/50 text-sm" placeholder="Brief description" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Message</label>
                      <textarea required value={supportForm.message} onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-black transition-colors bg-gray-50/50 text-sm min-h-[80px] resize-y" placeholder="Describe your issue..." />
                    </div>
                    <button disabled={isSupportSubmitting} type="submit" className="w-full bg-black text-white font-bold tracking-widest uppercase text-[11px] rounded-xl py-3.5 mt-2 hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                      <Icons.send size={14} strokeWidth={2} />
                      {isSupportSubmitting ? "Submitting..." : "Submit Ticket"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Investment Modal */}
      <AnimatePresence>
        {isInvestmentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsInvestmentModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-surface-container-lowest rounded-[2rem] p-10 max-w-md w-full editorial-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsInvestmentModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              >
                <Icons.chevronDown size={24} className="rotate-90" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icons.building size={28} strokeWidth={1.5} className="text-primary" />
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-3 text-on-surface">
                  Exciting Projects Coming Soon
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  We have some amazing investment projects in the pipeline. Stay tuned for exclusive opportunities that could transform your portfolio.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/9779768998508?text=Hi%2C%20I%27m%20interested%20in%20your%20upcoming%20investment%20projects."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl bg-[#25D366] text-white py-4 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-[#20BD5A] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Connect on WhatsApp
                </a>
                <a
                  href="tel:+9779768998508"
                  className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest py-4 text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:border-black transition-colors flex items-center justify-center gap-3"
                >
                  <Icons.phone size={16} strokeWidth={2} />
                  Call Us Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
