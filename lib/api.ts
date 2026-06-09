const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export type ApiResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
  timestamp: string;
};

type ApiResponseWithMeta<T, M> = ApiResponse<T> & {
  meta?: M;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type SearchFilters = {
  q?: string;
  propertyCode?: string;
  propertyType?: "HOUSE" | "APARTMENT" | "LAND";
  listingType?: "SALE" | "RENT";
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  district?: string;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  areaUnit?: string;
  furnishing?: string;
  facingDirection?: string;
  subType?: string;
  isFeatured?: boolean;
  sortBy?: "price_asc" | "price_desc" | "newest" | "oldest";
  cursor?: string;
  limit?: number;
};

export type PropertyImage = {
  id: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
};

export type HouseDetails = {
  subType: string;
  bedrooms: number | null;
  bathrooms: number | null;
  kitchens: number | null;
  floors: number | null;
  parkingSpaces: number | null;
  furnishingStatus: string | null;
  buildYear: number | null;
  facingDirection: string | null;
  roadType: string | null;
  roadSize: number | null;
};

export type ApartmentDetails = {
  subType: string;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  floorNumber: number | null;
  totalFloors: number | null;
  hasLift: boolean;
  hasParking: boolean;
  furnishingStatus: string | null;
  facingDirection: string | null;
  roadType: string | null;
  roadSize: number | null;
};

export type LandDetails = {
  subType: string;
  roadAccessFeet: string | null;
  frontageFeet: string | null;
  facingDirection: string | null;
  plotShape: string | null;
  zoningType: string | null;
  isCornerPlot: boolean;
};

export type ServiceNearby = {
  id: string;
  serviceType: string;
  name: string;
};

export type SearchProperty = {
  id: string;
  title: string;
  slug: string;
  propertyCode: string | null;
  summary: string | null;
  description: string | null;
  propertyType: "HOUSE" | "APARTMENT" | "LAND";
  listingType: "SALE" | "RENT";
  priceAmount: string;
  currency: string;
  pricePeriod: string;
  status: string;
  isFeatured: boolean;
  badgeLabel: string | null;
  badgeTone: string | null;
  locationText: string;
  district: string | null;
  city: string | null;
  latitude: string | null;
  longitude: string | null;
  areaValue: string | null;
  areaUnit: string | null;
  titleStatus: string | null;
  waterAvailability: string | null;
  electricity: string | null;
  isVerified: boolean;
  isOwnerApproved: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  videoUrl: string | null;
  mapIframe: string | null;
  houseDetails: HouseDetails | null;
  apartmentDetails: ApartmentDetails | null;
  landDetails: LandDetails | null;
  images: PropertyImage[];
  servicesNearby?: ServiceNearby[];
};

export type SearchMeta = {
  total: number;
  nextCursor: string | null;
  hasMore: boolean;
  limit: number;
};

export type SearchResponse = {
  data: SearchProperty[];
  meta: SearchMeta;
};

export type RawBlogArticle = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  author: string;
  authorRole: string;
  authorImage: string | null;
  readTime: string;
  isFeatured: boolean;
  publishDate: string;
  updatedAt: string;
};

export type BlogsApiResponse = ApiResponse<RawBlogArticle[]>;
export type BlogBySlugApiResponse = ApiResponse<RawBlogArticle>;

export type BlogArticle = Omit<RawBlogArticle, "coverImage" | "authorImage"> & {
  coverImage: string;
  authorImage: string;
  publishDateLabel: string;
};

export type RawTeamMember = {
  id: string;
  name: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  expertise: string[];
  phone?: string;
  thumbnail: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TeamsApiResponse = ApiResponse<RawTeamMember[]>;

export type TeamMember = Omit<RawTeamMember, "thumbnail" | "image"> & {
  thumbnail: string;
  image: string;
  profileHref: string;
};

export type RawReview = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  isFeatured: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ReviewsApiResponse = ApiResponse<RawReview[]>;

export type Review = Omit<RawReview, "image"> & {
  image: string;
};

export type LandingCategoryKey =
  | "residential"
  | "commercial"
  | "semi-commercial"
  | "villa"
  | "apartments"
  | "land-plot";

export type LandingCategory = {
  key: LandingCategoryKey;
  label: string;
  count: number;
};

export type LandingCity = {
  city: string;
  count: number;
  imageUrl: string | null;
  dominantPropertyType: "HOUSE" | "APARTMENT" | "LAND" | null;
};

export type LandingPageData = {
  categories: LandingCategory[];
  cities: LandingCity[];
};

export type LandingPageApiResponse = ApiResponse<LandingPageData>;

const BLOG_COVER_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80";
const BLOG_AUTHOR_IMAGE_FALLBACK = "https://avatar.vercel.sh/yetihomes-blog";
const TEAM_IMAGE_FALLBACK = "/teams/team1.jpeg";
const REVIEW_IMAGE_FALLBACK = "https://avatar.vercel.sh/yetihomes-review";

async function apiRequest<T, M = never>(
  path: string,
  init?: RequestInit,
): Promise<ApiResponseWithMeta<T, M>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, payload);
  }

  return payload as ApiResponseWithMeta<T, M>;
}

export function resolveApiAssetUrl(
  assetPath: string | null | undefined,
  fallbackUrl: string = "",
): string {
  if (!assetPath) {
    return fallbackUrl;
  }

  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath.replace("localhost", "127.0.0.1");
  }

  const normalizedPath = assetPath.replace(/^\/+/, "");

  const resolvedUrl = normalizedPath.startsWith("uploads/")
    ? `${API_ORIGIN}/${normalizedPath}`
    : normalizedPath.startsWith("blogs/")
    ? `${API_ORIGIN}/uploads/${normalizedPath}`
    : `${API_ORIGIN}/uploads/${normalizedPath}`;

  return resolvedUrl.replace("localhost", "127.0.0.1");
}

export function formatBlogPublishDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function mapBlogArticle(article: RawBlogArticle): BlogArticle {
  return {
    ...article,
    authorImage: resolveApiAssetUrl(
      article.authorImage,
      BLOG_AUTHOR_IMAGE_FALLBACK,
    ),
    coverImage: resolveApiAssetUrl(
      article.coverImage,
      BLOG_COVER_IMAGE_FALLBACK,
    ),
    publishDateLabel: formatBlogPublishDate(article.publishDate),
  };
}

export function mapTeamMember(member: RawTeamMember): TeamMember {
  const thumbnail = resolveApiAssetUrl(
    member.thumbnail ?? member.image,
    TEAM_IMAGE_FALLBACK,
  );
  const image = resolveApiAssetUrl(
    member.image ?? member.thumbnail,
    TEAM_IMAGE_FALLBACK,
  );

  return {
    ...member,
    image,
    thumbnail,
    profileHref: `/teams/${member.id}`,
  };
}

export function mapReview(review: RawReview): Review {
  return {
    ...review,
    image: resolveApiAssetUrl(review.image, REVIEW_IMAGE_FALLBACK),
  };
}

export function buildQueryString(filters: SearchFilters): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }

  return params.toString();
}

export async function searchProperties(
  filters: SearchFilters,
  signal?: AbortSignal,
): Promise<SearchResponse> {
  const queryString = buildQueryString(filters);
  const response = await apiRequest<SearchProperty[], SearchMeta>(
    `/properties/search${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
      signal,
    },
  );

  return {
    data: response.data,
    meta: response.meta ?? {
      hasMore: false,
      limit: filters.limit ?? response.data.length,
      nextCursor: null,
      total: response.data.length,
    },
  };
}

export function formatNprPrice(
  amount: string | number | undefined | null,
): string {
  if (amount === undefined || amount === null || amount === "") {
    return "Price on Request";
  }

  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return "Price on Request";
  }

  if (num >= 10_000_000) {
    const crore = num / 10_000_000;
    return `NPR ${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(2)} Cr`;
  }

  if (num >= 100_000) {
    const lakh = num / 100_000;
    return `NPR ${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)} Lakh`;
  }

  return `NPR ${num.toLocaleString("en-IN")}`;
}

/* ------------------------------------------------------------------ */
/*  Image helpers                                                     */
/* ------------------------------------------------------------------ */

export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url.replace("localhost", "127.0.0.1");
  }

  const normalized = url.replace(/^\/+/, "");

  if (normalized.startsWith("uploads/") || normalized.startsWith("blogs/")) {
    return `${API_ORIGIN}/${normalized}`.replace("localhost", "127.0.0.1");
  }

  return `${API_ORIGIN}/uploads/${normalized}`.replace("localhost", "127.0.0.1");
}

export function getPrimaryImageUrl(images: PropertyImage[]): string {
  const primary = images.find((img) => img.isPrimary) || images[0];
  return primary ? resolveImageUrl(primary.url) : "";
}

export async function getPropertyBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<SearchProperty | null> {
  try {
    const response = await apiRequest<SearchProperty | null>(
      `/properties/search/${slug}`,
      {
        method: "GET",
        signal,
      },
    );

    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export type RawFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FaqsApiResponse = ApiResponse<RawFaq[]>;

export async function getFaqs(signal?: AbortSignal): Promise<RawFaq[]> {
  const response = await apiRequest<RawFaq[]>(`/faqs`, {
    method: "GET",
    signal,
  });
  return response.data;
}

export type RawCompanyInfo = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  mission: string | null;
  vision: string | null;
  values: string[] | null;
  establishedYear: number | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CompanyInfoApiResponse = ApiResponse<RawCompanyInfo[]>;

export async function getCompanyInfo(
  signal?: AbortSignal,
): Promise<RawCompanyInfo[]> {
  const response = await apiRequest<RawCompanyInfo[]>(`/company/about-us`, {
    method: "GET",
    signal,
  });
  return response.data;
}

export type NewsletterDto = {
  email: string;
  firstName?: string;
  lastName?: string;
};

export type NewsletterApiResponse = ApiResponse<{
  email: string;
  subscribedAt: string;
}>;

export async function subscribeToNewsletter(
  data: NewsletterDto,
): Promise<{ id: string; email: string; subscribedAt: string }> {
  const response = await apiRequest<{
    id: string;
    email: string;
    subscribedAt: string;
  }>(`/company/newsletters`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data;
}

export type InquiryDto = {
  fullName: string;
  email: string;
  phone?: string;
  propertyId?: string;
  propertySlug?: string;
  inquiryType: string;
  message: string;
};

export type InquiryApiResponse = ApiResponse<{
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  inquiryType: string;
  message: string;
  status: string;
  createdAt: string;
}>;

export async function submitInquiry(
  data: InquiryDto,
): Promise<InquiryApiResponse["data"]> {
  const response = await apiRequest<InquiryApiResponse["data"]>(`/inquiries`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data;
}

export type SupportTicketDto = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  category: string;
  message: string;
};

export type SupportTicketApiResponse = ApiResponse<{
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string;
}>;

export async function submitSupportTicket(
  data: SupportTicketDto,
): Promise<SupportTicketApiResponse["data"]> {
  const response = await apiRequest<SupportTicketApiResponse["data"]>(
    `/contact/ticket`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  return response.data;
}

export type LegalDocumentType = "PRIVACY_POLICY" | "COOKIE_POLICY" | "TERMS_AND_CONDITIONS";

export type RawLegalDocument = {
  id: string;
  title: string;
  description: string;
  type: LegalDocumentType;
  content: string;
  version: string;
  effectiveDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LegalDocumentsApiResponse = ApiResponse<RawLegalDocument[]>;

export async function getLegalDocuments(
  signal?: AbortSignal,
): Promise<RawLegalDocument[]> {
  const response = await apiRequest<RawLegalDocument[]>(
    `/company/legal-documents`,
    {
      method: "GET",
      signal,
    },
  );
  return response.data;
}

export type PropertyViewStats = {
  totalViews: number;
  uniqueViews: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  lastViewedAt: string | null;
};

export async function getPropertyViewStats(
  propertyType: string,
  propertyId: string,
  signal?: AbortSignal,
): Promise<PropertyViewStats> {
  const response = await apiRequest<PropertyViewStats>(
    `/analytics/views/${propertyType}/${propertyId}`,
    { method: "GET", signal },
  );
  return response.data;
}

export async function getBlogs(
  signal?: AbortSignal,
): Promise<RawBlogArticle[]> {
  const response = await apiRequest<RawBlogArticle[]>(`/blogs`, {
    method: "GET",
    signal,
  });
  return response.data;
}

export async function getBlogBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<RawBlogArticle | null> {
  try {
    const response = await apiRequest<RawBlogArticle>(
      `/blogs/${slug}`,
      { method: "GET", signal },
    );
    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getReviews(
  signal?: AbortSignal,
): Promise<RawReview[]> {
  const response = await apiRequest<RawReview[]>(`/reviews`, {
    method: "GET",
    signal,
  });
  return response.data;
}

export async function getTeams(
  signal?: AbortSignal,
): Promise<RawTeamMember[]> {
  const response = await apiRequest<RawTeamMember[]>(`/teams`, {
    method: "GET",
    signal,
  });
  return response.data;
}

export async function getLandingPageData(
  signal?: AbortSignal,
): Promise<LandingPageData> {
  const response = await apiRequest<LandingPageData>(
    `/properties/search/landing`,
    { method: "GET", signal },
  );
  return response.data;
}

export async function getNewListings(): Promise<SearchProperty[]> {
  try {
    const response = await apiRequest<SearchProperty[]>(
      `/properties/search/new-listings`,
      { method: "GET" },
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (error instanceof ApiError) {
      console.warn(
        `[api] getNewListings failed (${error.status}): ${error.message}`,
      );
    } else {
      console.warn("[api] getNewListings failed:", error);
    }
    return [];
  }
}
