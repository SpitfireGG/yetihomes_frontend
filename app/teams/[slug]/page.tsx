import { notFound } from "next/navigation";
import TeamMemberProfilePage from "@/components/team/team-member-profile-page";
import { getCachedTeamMemberById } from "@/lib/team-server-cache";

export const revalidate = 60;

export default async function TeamMemberProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getCachedTeamMemberById(slug);

  if (!result) {
    notFound();
  }

  return <TeamMemberProfilePage member={result.member} index={result.index} />;
}
