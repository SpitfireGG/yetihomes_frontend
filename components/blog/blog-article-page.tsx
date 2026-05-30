"use client";

import { Icons } from "@/components/ui/icons";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Footer from "@/components/landing/footer";
import type { BlogArticle } from "@/lib/api";

function parseArticleContent(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export default function BlogArticlePage({
  article,
}: {
  article: BlogArticle;
}) {
  const contentBlocks = parseArticleContent(article.content);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background font-sans text-on-surface">
      <section className="relative flex h-[70vh] w-full items-end lg:h-[80vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent lg:via-background/60" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 lg:px-12 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              <Icons.arrowLeft size={16} />
              Back to blog
            </Link>

            <span className="mb-6 inline-block rounded-full border border-primary/10 bg-primary-container px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-primary uppercase shadow-sm">
              {article.category}
            </span>

            <h1 className="mb-8 text-4xl leading-[1.1] font-bold tracking-tight text-on-surface md:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 border-l-2 border-primary/30 pl-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full shadow-sm">
                  <Image
                    src={article.authorImage}
                    alt={article.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">
                    {article.author}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {article.authorRole}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <Icons.calendar size={14} />
                  {article.publishDateLabel}
                </span>
                <span className="flex items-center gap-1.5 line-clamp-1">
                  <Icons.clock size={14} />
                  {article.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-6 py-12 lg:flex-row lg:px-12 lg:py-20">
        <div className="hidden w-full shrink-0 lg:flex lg:w-[60px] lg:flex-col lg:items-center">
          <div className="sticky top-32 flex flex-col items-center gap-6 rounded-full border border-outline-variant/30 bg-surface-container-low p-4 shadow-sm">
            <button className="text-outline transition-colors hover:text-primary">
              <FontAwesomeIcon icon={faFacebookF} className="h-5 w-5" />
            </button>
            <button className="text-outline transition-colors hover:text-primary">
              <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
            </button>
            <button className="text-outline transition-colors hover:text-primary">
              <FontAwesomeIcon icon={faLinkedinIn} className="h-5 w-5" />
            </button>
            <div className="my-2 h-[1px] w-8 bg-outline-variant/50" />
            <button className="text-outline transition-colors hover:text-primary">
              <Icons.link size={20} />
            </button>
          </div>
        </div>

        <article className="max-w-3xl flex-1 text-base leading-[1.8] text-on-surface-variant lg:text-lg">
          <p className="mb-10 text-xl leading-relaxed font-medium text-on-surface lg:text-2xl">
            {article.excerpt}
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-on-surface prose-p:text-on-surface-variant prose-a:text-primary hover:prose-a:text-brand-800 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface-container-low prose-blockquote:p-6 prose-blockquote:font-medium prose-blockquote:text-on-surface prose-blockquote:italic">
            {contentBlocks.map((block, index) => {
              if (block.startsWith("### ")) {
                return (
                  <h3 key={index} className="mt-12 mb-6 text-2xl">
                    {block.replace("### ", "")}
                  </h3>
                );
              }

              if (block.startsWith("## ")) {
                return (
                  <h2 key={index} className="mt-14 mb-6 text-3xl">
                    {block.replace("## ", "")}
                  </h2>
                );
              }

              if (block.startsWith("> ")) {
                return (
                  <blockquote
                    key={index}
                    className="my-10 rounded-r-2xl border-primary shadow-sm"
                  >
                    {block.replace("> ", "")}
                  </blockquote>
                );
              }

              return (
                <p key={index} className="mb-6 whitespace-pre-line">
                  {block}
                </p>
              );
            })}
          </div>

          <div className="mt-20 flex flex-col items-center gap-6 rounded-[28px] border border-outline-variant/30 bg-surface-container-lowest p-8 text-center editorial-shadow md:flex-row md:items-start md:text-left">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-outline-variant shadow-sm">
              <Image
                src={article.authorImage}
                alt={article.author}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                Written By
              </p>
              <h4 className="mb-2 text-xl font-bold text-on-surface">
                {article.author}
              </h4>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {article.authorRole} at YetiHomes. Bridging the gap between
                market data and real-world real estate opportunities for buyers
                and sellers across Nepal.
              </p>
            </div>
          </div>
        </article>
      </section>

      <Footer />
    </div>
  );
}
