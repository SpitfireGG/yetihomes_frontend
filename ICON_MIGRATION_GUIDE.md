# Yeti Homes Icon Migration Guide

## Overview

Replace scattered Lucide imports with a centralized icon registry mixing **Tabler**, **Phosphor**, and **Lucide** — each chosen where they're strongest.

## 1. Install Dependencies

```bash
npm install @tabler/icons-react @phosphor-icons/react
```

## 2. Create the Icon Registry

Create `components/ui/icons.ts`. This is the **single source of truth** for every icon in the app.

```ts
import {
  IconHome2,
  IconBuildingSkyscraper,
  IconLandmark,
  IconStairs,
  IconRulerMeasure,
  IconCompass,
  IconRoad,
  IconAirConditioning,
  IconElevator,
  IconShieldCheck,
  IconPlant2,
  IconWindow,
  IconRoof,
  IconToolsKitchen2,
  IconArmchair2,
  IconBatteryCharging,
  IconSolarPanel,
  IconBucketDroplet,
  IconFireplace,
  IconBoxModel2,
  IconWall,
  IconFenceFilled,
  IconFlame,
  IconSparkles,
  IconStarFilled,
  IconRosetteDiscountCheck,
  IconCircleCheck,
  IconKey,
  IconClock,
  IconFileEdit,
  IconArchive,
  IconUserCheck,
  IconTrendingDown,
  IconHandshake,
  IconCashBanknote,
  IconDoorOpen,
  IconCrown,
  IconBuildingEstate,
  IconBuildingApartment,
  IconLayoutGrid,
  IconBuildingCommunity,
  IconParkingCircle,
  IconArrowsHorizontal,
  IconFileCheck2,
  IconChartArea,
  IconCalendar,
  IconUsers,
  IconTrees,
} from '@tabler/icons-react';

import {
  Bed,
  Bath,
  Shower,
  Car,
  Wifi,
  Zap,
  Plug,
  Droplets,
  Droplet,
  Heart,
  Share2,
  Bookmark,
  MapPin,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Check,
  XCircle,
  AlertCircle,
  Info,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  Globe,
  ShieldCheck,
  Users,
  Briefcase,
  MessageCircleHeart,
  Send,
  Ticket,
  FileText,
  Scale,
  ClipboardList,
  LogIn,
  LogOut,
  User,
  Star,
  Quote,
  Maximize,
  Layers,
  Navigation,
  Bath as BathIcon,
  Car as CarIcon,
  Armchair,
  Compass as CompassIcon,
  Building2,
  Loader2,
  Filter,
  Grid,
  List,
  Map,
  Eye,
  EyeOff,
  Camera,
  Video,
  Link,
  ExternalLink,
  Download,
  Upload,
  Trash2,
  Edit,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  Settings,
  Bell,
  Search as SearchIcon,
  Home,
} from 'lucide-react';

import {
  SwimmingPool,
  Barbell,
  WashingMachine,
  House,
  Plant,
  PawPrint,
  CookingPot,
  Couch,
  Tractor,
  SecurityCamera,
} from '@phosphor-icons/react';

// ── Stroke width helper ──────────────────────────────────────────
// 1.5 is the sweet spot for real-estate UI.
// Tabler defaults to 1.5, Lucide to 2, Phosphor to "regular".
// We normalize everything to 1.5 via wrapper components if needed,
// or set per-icon in the registry below.

// ── Property Types ───────────────────────────────────────────────
export const PropertyTypeIcons = {
  house: IconHome2,
  apartment: IconBuildingSkyscraper,
  land: IconLandmark,
  bungalow: IconHome2,
  villa: IconBuildingEstate,
  townhouse: IconBuildingCommunity,
  duplex: IconBuildingCommunity,
  penthouse: IconCrown,
  studio: IconLayoutGrid,
  commercial: IconBuildingSkyscraper,
  office: IconBuildingSkyscraper,
  agricultural: Tractor,
  residential_plot: IconLandmark,
  commercial_plot: IconBuildingSkyscraper,
} as const;

// ── Property Details ─────────────────────────────────────────────
export const PropertyDetailIcons = {
  bedroom: Bed,
  bathroom: Bath,
  bathroom_alt: Shower,
  kitchen: IconToolsKitchen2,
  floors: IconStairs,
  total_area: IconRulerMeasure,
  built_up_area: IconChartArea,
  carpet_area: Maximize,
  plot_dimensions: IconRulerMeasure,
  build_year: IconCalendar,
  facing: IconCompass,
  road_access: IconRoad,
  parking: Car,
  frontage: IconArrowsHorizontal,
  title_status: IconFileCheck2,
  water: Droplets,
  electricity: Zap,
  balcony: IconWindow,
  lift: IconElevator,
  furnishing: IconArmchair2,
  sub_type: IconFileCheck2,
  usage_type: IconFileCheck2,
  zoning: IconFileCheck2,
  corner_plot: IconRosetteDiscountCheck,
  plot_shape: IconRulerMeasure,
} as const;

// ── Amenities ────────────────────────────────────────────────────
export const AmenityIcons = {
  pool: SwimmingPool,
  parking: Car,
  garage: IconParkingCircle,
  gym: Barbell,
  wifi: Wifi,
  air_conditioning: IconAirConditioning,
  heating: IconFireplace,
  elevator: IconElevator,
  security: IconShieldCheck,
  garden: IconPlant2,
  balcony: IconWindow,
  terrace: IconRoof,
  kitchen: IconToolsKitchen2,
  furnished: IconArmchair2,
  laundry: WashingMachine,
  pet_friendly: PawPrint,
  backup_power: IconBatteryCharging,
  solar: IconSolarPanel,
  water_tank: IconBucketDroplet,
  fireplace: IconFireplace,
  storage: IconBoxModel2,
  servant_quarters: IconUsers,
  garden_lawn: IconTrees,
  boundary_wall: IconWall,
  gated_community: IconFenceFilled,
  cooking: CookingPot,
  couch: Couch,
  plant: Plant,
  camera: SecurityCamera,
} as const;

// ── Status Badges ────────────────────────────────────────────────
export const StatusIcons = {
  featured: IconFlame,
  new: IconSparkles,
  verified: IconRosetteDiscountCheck,
  sold: IconCircleCheck,
  rented: IconKey,
  pending: IconClock,
  draft: IconFileEdit,
  archived: IconArchive,
  owner_approved: IconUserCheck,
  price_drop: IconTrendingDown,
  negotiable: IconHandshake,
  cash_only: IconCashBanknote,
  open_house: IconDoorOpen,
  exclusive: IconCrown,
  just_listed: IconSparkles,
  premium: IconCrown,
  investment: IconTrendingDown,
  heritage: IconFileCheck2,
  smart_home: IconBatteryCharging,
  corner: IconRosetteDiscountCheck,
  mountain_view: IconSparkles,
  commercial: IconBuildingSkyscraper,
  farmhouse: IconPlant2,
  affordable: IconCashBanknote,
  family_home: IconHome2,
  for_rent: IconKey,
  value_pick: IconRosetteDiscountCheck,
} as const;

// ── Navigation & UI ──────────────────────────────────────────────
export const UIIcons = {
  search: Search,
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  plus: Plus,
  minus: Minus,
  check: Check,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  mail: Mail,
  phone: Phone,
  message: MessageSquare,
  help: HelpCircle,
  globe: Globe,
  shield: ShieldCheck,
  users: Users,
  briefcase: Briefcase,
  heart: MessageCircleHeart,
  send: Send,
  ticket: Ticket,
  file: FileText,
  scale: Scale,
  clipboard: ClipboardList,
  login: LogIn,
  logout: LogOut,
  user: User,
  star: Star,
  quote: Quote,
  maximize: Maximize,
  layers: Layers,
  navigation: Navigation,
  armchair: Armchair,
  compass: CompassIcon,
  building: Building2,
  loader: Loader2,
  filter: Filter,
  grid: Grid,
  list: List,
  map: Map,
  eye: Eye,
  eyeOff: EyeOff,
  camera: Camera,
  video: Video,
  link: Link,
  externalLink: ExternalLink,
  download: Download,
  upload: Upload,
  trash: Trash2,
  edit: Edit,
  plusCircle: PlusCircle,
  minusCircle: MinusCircle,
  refresh: RefreshCw,
  settings: Settings,
  bell: Bell,
  home: Home,
  bookmark: Bookmark,
  share: Share2,
  favorite: Heart,
  mapPin: MapPin,
  zap: Zap,
  droplet: Droplet,
} as const;

// ── Unified Export ───────────────────────────────────────────────
export const Icons = {
  ...PropertyTypeIcons,
  ...PropertyDetailIcons,
  ...AmenityIcons,
  ...StatusIcons,
  ...UIIcons,
} as const;

export type IconName = keyof typeof Icons;
```

## 3. Usage Pattern

**Before (scattered imports):**
```tsx
import { Home, Bed, Bath, Car } from 'lucide-react';
```

**After (registry):**
```tsx
import { Icons } from '@/components/ui/icons';

// Property type
<Icons.house size={20} />

// Details
<Icons.bedroom size={18} />
<Icons.bathroom size={18} />

// Amenities
<Icons.pool size={18} />
<Icons.gym size={18} />

// Status
<Icons.verified size={16} />
```

## 4. Stroke Width Consistency

All three libraries render differently at default sizes. Normalize to `strokeWidth={1.5}`:

```tsx
// Tabler — already 1.5 by default, explicit if needed
<Icons.house size={20} stroke={1.5} />

// Lucide — override default 2 → 1.5
<Icons.search size={20} strokeWidth={1.5} />

// Phosphor — use "regular" weight (matches 1.5 feel)
<Icons.pool size={20} weight="regular" />
```

For global consistency, create a wrapper:

```tsx
// components/ui/icon.tsx
import type { ComponentType } from 'react';

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function Icon({
  component: Component,
  size = 20,
  className,
  strokeWidth = 1.5,
}: IconProps & { component: ComponentType<any> }) {
  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      weight="regular"
      className={className}
    />
  );
}
```

## 5. Migration Steps

### Step 1: Create the registry
Create `components/ui/icons.ts` with the code above.

### Step 2: Find all Lucide imports
```bash
grep -r "from 'lucide-react'" components/ lib/ app/
```

### Step 3: Replace imports per file
For each file, replace:
```tsx
// Before
import { Home, Bed, Bath, Car, MapPin } from 'lucide-react';

// After
import { Icons } from '@/components/ui/icons';
```

### Step 4: Replace icon usage
```tsx
// Before
<Home size={20} />
<Bed size={18} />
<Bath size={18} />

// After
<Icons.home size={20} />
<Icons.bedroom size={18} />
<Icons.bathroom size={18} />
```

### Step 5: Remove Lucide from package.json (optional)
```bash
npm uninstall lucide-react
```

## 6. Icon Mapping Reference

### Property Types
| Concept | Icon | Library |
|---|---|---|
| House | `IconHome2` | Tabler |
| Apartment | `IconBuildingSkyscraper` | Tabler |
| Land | `IconLandmark` | Tabler |
| Villa | `IconBuildingEstate` | Tabler |
| Penthouse | `IconCrown` | Tabler |
| Studio | `IconLayoutGrid` | Tabler |
| Townhouse | `IconBuildingCommunity` | Tabler |
| Agricultural | `Tractor` | Phosphor |

### Property Details
| Detail | Icon | Library |
|---|---|---|
| Bedroom | `Bed` | Lucide |
| Bathroom | `Bath` | Lucide |
| Kitchen | `IconToolsKitchen2` | Tabler |
| Floors | `IconStairs` | Tabler |
| Area | `IconRulerMeasure` | Tabler |
| Facing | `IconCompass` | Tabler |
| Road | `IconRoad` | Tabler |
| Parking | `Car` | Lucide |
| Lift | `IconElevator` | Tabler |
| Water | `Droplets` | Lucide |
| Electricity | `Zap` | Lucide |

### Amenities
| Amenity | Icon | Library |
|---|---|---|
| Pool | `SwimmingPool` | Phosphor |
| Gym | `Barbell` | Phosphor |
| WiFi | `Wifi` | Lucide |
| AC | `IconAirConditioning` | Tabler |
| Garden | `IconPlant2` | Tabler |
| Laundry | `WashingMachine` | Phosphor |
| Solar | `IconSolarPanel` | Tabler |
| Security | `IconShieldCheck` | Tabler |

### Status Badges
| Status | Icon | Library |
|---|---|---|
| Featured | `IconFlame` | Tabler |
| New | `IconSparkles` | Tabler |
| Verified | `IconRosetteDiscountCheck` | Tabler |
| Sold | `IconCircleCheck` | Tabler |
| Rented | `IconKey` | Tabler |
| Exclusive | `IconCrown` | Tabler |

## 7. Nepal-Specific Items

No culture-specific icons exist for AANA, ROPANI, or Lal Purja. Use generic icons and let labels do the cultural work:

| Item | Icon | Why |
|---|---|---|
| Aana / Ropani | `IconRulerMeasure` | Universal area measurement |
| Lal Purja | `IconFileCheck2` | Document verification |
| Clear title | `IconRosetteDiscountCheck` | Verified status |

## 8. Browse Libraries

- **Tabler**: https://tabler.io/icons
- **Phosphor**: https://phosphoricons.com (use "Regular" weight)
- **Lucide**: https://lucide.dev/icons
