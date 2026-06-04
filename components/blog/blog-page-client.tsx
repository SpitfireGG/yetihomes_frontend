"use client";

import { Icons } from "@/components/ui/icons";
import { Loader } from "@/components/ui/loader";

import React, { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/landing/footer";
import SectionHeading from "@/components/shared/sectionHeading";
import type { BlogArticle } from "@/lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const BRAND_PRIMARY = "var(--primary)";
const BLOG_PAGE_SIZE = 12;

function BlogHero({ article }: { article: BlogArticle }) {
  return (
    <section className="relative flex min-h-[85vh] w-full items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-900/80 via-transparent to-transparent" />
      </div>

      <div
        className="absolute top-0 right-0 z-[1] hidden h-full w-[35%] lg:block"
        style={{
          backgroundColor: "rgb(127 20 22 / 0.12)",
          clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-8 pt-32 pb-16 lg:px-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-white uppercase">
            <Icons.trendingUp size={12} strokeWidth={2.5} />
            {article.category}
          </span>

          <h1 className="mb-6 text-3xl leading-[1.1] font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg">
            {article.excerpt}
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/30">
                <Image
                  src={article.authorImage}
                  alt={article.author}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{article.author}</p>
                <p className="text-xs text-white/50">{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-white/50">
              <span className="flex items-center gap-1.5">
                <Icons.calendar size={13} />
                {article.publishDateLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <Icons.clock size={13} />
                {article.readTime}
              </span>
            </div>
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: BRAND_PRIMARY }}
          >
            Read Full Article
            <Icons.arrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute top-16 right-8 z-[2] hidden xl:block lg:right-16">
        <motion.span
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="select-none text-[140px] leading-none font-black tracking-tight 2xl:text-[200px]"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.08)",
          }}
        >
          BLOG
        </motion.span>
      </div>
    </section>
  );
}

function EmptyBlogHero() {
  return (
    <section className="relative flex min-h-[65vh] w-full items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/HERO.jpg"
          alt="YetiHomes journal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/70 to-brand-navy-900/15" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-8 pt-32 pb-16 lg:px-16 lg:pb-24">
        <div className="max-w-2xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-white uppercase">
            <Icons.trendingUp size={12} strokeWidth={2.5} />
            YetiHomes Journal
          </span>
          <h1 className="mb-6 text-3xl leading-[1.1] font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            No blog articles have been published yet
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/75 lg:text-lg">
            The frontend is reading the live blog API. Publish articles in the
            backend and they will appear here automatically.
          </p>
        </div>
      </div>
    </section>
  );
}

function CategoryFilter({
  active,
  categories,
  onChange,
}: {
  active: string;
  categories: string[];
  onChange: (category: string) => void;
}) {
  return (
    <div className="mb-14 flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = active === category;

        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`relative rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
              isActive
                ? "text-white shadow-md"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            }`}
            style={isActive ? { backgroundColor: BRAND_PRIMARY } : undefined}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

const ArticleCard = React.memo(function ArticleCard({
  article,
  index,
  variant = "default",
}: {
  article: BlogArticle;
  index: number;
  variant?: "large" | "default";
}) {
  const isLarge = variant === "large";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`group flex cursor-pointer flex-col ${
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div
        className={`relative mb-5 overflow-hidden rounded-[28px] ${
          isLarge ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes={
            isLarge
              ? "(min-width: 1280px) 60vw, 100vw"
              : "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex rounded-full bg-surface-container-lowest/85 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-on-surface uppercase backdrop-blur-md">
            {article.category}
          </span>
        </div>
        <Link
          href={`/blog/${article.slug}`}
          className="absolute top-0 left-0 z-20 h-full w-full"
        >
          <span className="sr-only">Read article</span>
        </Link>
        <div className="absolute right-4 bottom-4 z-30 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={`/blog/${article.slug}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg"
            style={{ backgroundColor: BRAND_PRIMARY }}
          >
            <Icons.arrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-1">
        <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.15em] text-on-surface-variant uppercase">
          <span className="flex items-center gap-1.5">
            <Icons.calendar size={12} />
            {article.publishDateLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <Icons.clock size={12} />
            {article.readTime}
          </span>
        </div>

        <h3
          className={`leading-snug font-bold tracking-tight text-on-surface transition-colors duration-300 group-hover:text-primary ${
            isLarge ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
          }`}
        >
          {article.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
          {article.excerpt}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-outline-variant">
            <Image
              src={article.authorImage}
              alt={article.author}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">
              {article.author}
            </p>
            <p className="text-[10px] text-on-surface-variant">
              {article.authorRole}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setStatus("idle");

    try {
      const response = await fetch(`${API_BASE_URL}/company/newsletters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative my-20 lg:my-28"
    >
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-secondary via-brand-navy-800 to-brand-navy-900 p-10 lg:p-16">
        <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="max-w-lg">
            <span className="mb-4 block text-xs font-bold tracking-[0.25em] text-brand-accent-200 uppercase">
              Stay Informed
            </span>
            <h3 className="mb-4 text-3xl leading-tight font-bold text-white lg:text-4xl">
              Get the Latest Real Estate
              <br />
              Insights Delivered Weekly
            </h3>
            <p className="text-sm leading-relaxed text-brand-navy-200">
              Join 12,000+ property enthusiasts receiving curated market
              reports, investment opportunities, and expert analysis every
              Thursday.
            </p>
          </div>

          <div className="w-full max-w-md flex-1 lg:w-auto">
            <form
              className="relative flex w-full items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={isLoading}
                className="w-full rounded-xl border border-white/15 bg-white/8 px-6 py-4 text-white placeholder-brand-silver-400 transition-all backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/40 focus:outline-none disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-70"
              >
                {isLoading ? <Loader size={16} /> : "Subscribe"}
              </button>
            </form>
            {message && (
              <p className={`mt-3 text-xs ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
            <p className="mt-3 text-right text-xs text-brand-navy-300">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function TrendingSidebar({ articles }: { articles: BlogArticle[] }) {
  const trending = articles.slice(0, 4);

  return (
    <div className="sticky top-28 rounded-[28px] border border-outline-variant/50 bg-surface-container-lowest p-8 editorial-shadow">
      <div className="mb-8 flex items-center gap-2">
        <Icons.trendingUp size={18} className="text-primary" strokeWidth={2.5} />
        <h4 className="text-lg font-bold text-on-surface">Trending Now</h4>
      </div>

      <div className="flex flex-col gap-6">
        {trending.map((article, index) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="group flex gap-4"
          >
            <span
              className="mt-1 shrink-0 text-3xl leading-none font-black tracking-tight"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px var(--outline-variant)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase">
                {article.category}
              </span>
              <h5 className="line-clamp-2 text-sm leading-snug font-bold text-on-surface transition-colors group-hover:text-primary">
                {article.title}
              </h5>
              <span className="flex items-center gap-1 text-[10px] text-outline">
                <Icons.clock size={10} />
                {article.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function BlogPageClient({
  articles,
}: {
  articles: BlogArticle[];
}) {
  const featuredArticle = articles.find((article) => article.isFeatured) ?? articles[0] ?? null;
  const remainingArticles = useMemo(
    () =>
      featuredArticle
        ? articles.filter((article) => article.id !== featuredArticle.id)
        : [],
    [articles, featuredArticle],
  );
  const categories = useMemo(
    () => ["All", ...new Set(remainingArticles.map((article) => article.category))],
    [remainingArticles],
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles =
    activeCategory === "All"
      ? remainingArticles
      : remainingArticles.filter(
          (article) => article.category === activeCategory,
        );

  const [blogPage, setBlogPage] = useState(1);
  const totalBlogPages = Math.max(1, Math.ceil(filteredArticles.length / BLOG_PAGE_SIZE));
  const paginatedArticles = useMemo(
    () => filteredArticles.slice(0, blogPage * BLOG_PAGE_SIZE),
    [filteredArticles, blogPage],
  );
  const hasMoreBlog = paginatedArticles.length < filteredArticles.length;

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setBlogPage(1);
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background font-sans text-on-surface">
      {featuredArticle ? (
        <BlogHero article={featuredArticle} />
      ) : (
        <EmptyBlogHero />
      )}

      <section className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              title="Latest Articles"
              description="Expert insights, market analysis, and practical guides for navigating Nepal's real estate landscape."
              badge="YetiHomes Journal"
            />
          </div>

          {remainingArticles.length > 0 ? (
            <CategoryFilter
              active={activeCategory}
              categories={categories}
              onChange={handleCategoryChange}
            />
          ) : null}

          <div className="flex flex-col gap-12 xl:flex-row">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredArticles.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                        <ArticleCard
                          article={paginatedArticles[0]}
                          variant="large"
                          index={0}
                        />
                        {paginatedArticles.slice(1).map((article, index) => (
                          <ArticleCard
                            key={article.id}
                            article={article}
                            variant="default"
                            index={index + 1}
                          />
                        ))}
                      </div>

                      {hasMoreBlog && (
                        <div className="mt-12 flex justify-center">
                          <button
                            onClick={() => setBlogPage((p) => p + 1)}
                            className="inline-flex items-center gap-2 rounded-full border-2 border-outline-variant bg-surface-container-lowest px-8 py-3 font-headline text-sm font-semibold tracking-wide text-on-surface transition-all hover:border-primary hover:text-primary hover:shadow-md"
                          >
                            <Icons.chevronDown size={16} />
                            Load More Articles ({paginatedArticles.length} of {filteredArticles.length})
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container">
                        <Icons.trendingUp size={32} className="text-outline" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-on-surface">
                        {articles.length > 0
                          ? "No articles found"
                          : "No articles published yet"}
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        {articles.length > 0
                          ? "We don't have articles in this category yet. Check back soon."
                          : "The live blogs API returned an empty collection."}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {articles.length > 0 ? (
              <div className="hidden w-full shrink-0 xl:block xl:w-[340px]">
                <TrendingSidebar articles={articles} />
              </div>
            ) : null}
          </div>

          <BlogNewsletter />
        </div>
      </section>

      <Footer />
    </div>
  );
}
