import BlogPageClient from "@/components/blog/blog-page-client";
import { getCachedBlogs } from "@/lib/blog-server-cache";

export const revalidate = 0;

export default async function BlogPage() {
  const articles = await getCachedBlogs();

  return <BlogPageClient articles={articles} />;
}
