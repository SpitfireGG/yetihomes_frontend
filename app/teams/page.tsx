import CompanyTeamPageClient from "@/components/team/company-team-page-client";
import { getCachedTeamMembers } from "@/lib/team-server-cache";

export const revalidate = 60;

export default async function CompanyTeam() {
  const teamMembers = await getCachedTeamMembers();

  return <CompanyTeamPageClient members={teamMembers} />;
}
