import "server-only";

import { unstable_cache } from "next/cache";
import {
  ApiError,
  mapTeamMember,
  type TeamMember,
  type TeamsApiResponse,
} from "@/lib/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Ensure the URL ends with /api (NestJS global prefix)
const resolvedBaseUrl = API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`;

export const TEAM_CACHE_REVALIDATE_SECONDS = 60;

async function fetchTeamsApi(): Promise<TeamsApiResponse> {
  const response = await fetch(`${resolvedBaseUrl}/teams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
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

  return payload as TeamsApiResponse;
}

const getTeamMembersCache = unstable_cache(
  async () => {
    const response = await fetchTeamsApi();
    return response.data.map(mapTeamMember);
  },
  ["team-members"],
  {
    revalidate: TEAM_CACHE_REVALIDATE_SECONDS,
    tags: ["teams"],
  },
);

export async function getCachedTeamMembers(): Promise<TeamMember[]> {
  try {
    return await getTeamMembersCache();
  } catch {
    return [];
  }
}

export async function getCachedTeamMemberById(
  id: string,
): Promise<{ member: TeamMember; index: number } | null> {
  const members = await getCachedTeamMembers();
  const index = members.findIndex((member) => member.id === id);

  if (index === -1) {
    return null;
  }

  return {
    member: members[index],
    index,
  };
}
