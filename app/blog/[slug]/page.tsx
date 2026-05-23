import { notFound } from "next/navigation";
import BlogArticlePage from "@/components/blog/blog-article-page";
import { getCachedBlogBySlug } from "@/lib/blog-server-cache";

export const revalidate = 0;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getCachedBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogArticlePage article={article} />;
}
