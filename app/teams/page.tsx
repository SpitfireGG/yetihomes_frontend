import type { Metadata } from "next";
import CompanyTeamPageClient from "@/components/team/company-team-page-client";
import { getCachedTeamMembers } from "@/lib/team-server-cache";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Team | Yeti Homes Estate",
  description:
    "Meet the Yeti Homes Estate team — experienced real estate professionals dedicated to helping you find the perfect property in Nepal.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/teams",
  },
  openGraph: {
    title: "Our Team | Yeti Homes Estate",
    description:
      "Meet the Yeti Homes Estate team — experienced real estate professionals dedicated to helping you find the perfect property in Nepal.",
    url: "https://www.yetihomesestate.com.np/teams",
    siteName: "Yeti Homes Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | Yeti Homes Estate",
    description:
      "Meet the Yeti Homes Estate team in Nepal.",
  },
};

export default async function CompanyTeam() {
  const teamMembers = await getCachedTeamMembers();

  return <CompanyTeamPageClient members={teamMembers} />;
}
