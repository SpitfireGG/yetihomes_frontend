import type { Metadata } from "next";
import CompanyTeamPageClient from "@/components/team/company-team-page-client";
import { getCachedTeamMembers } from "@/lib/team-server-cache";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Team | YetiHomes",
  description:
    "Meet the YetiHomes team — experienced real estate professionals dedicated to helping you find the perfect property in Nepal.",
};

export default async function CompanyTeam() {
  const teamMembers = await getCachedTeamMembers();

  return <CompanyTeamPageClient members={teamMembers} />;
}
