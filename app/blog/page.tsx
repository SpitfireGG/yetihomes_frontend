import type { Metadata } from "next";
import BlogPageClient from "@/components/blog/blog-page-client";
import { getCachedBlogs } from "@/lib/blog-server-cache";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blog | YetiHomes",
  description:
    "Read insights, market trends, and guides on Nepal's real estate market. YetiHomes editorial blog covers architecture, investment, and property news.",
};

export default async function BlogPage() {
  const articles = await getCachedBlogs();

  return <BlogPageClient articles={articles} />;
}
