"use client";

import { Icons } from "@/components/ui/icons";
import { Loader } from "@/components/ui/loader";

import { useState } from "react";
import Image from "next/image";
import { newsletterContent } from "@/data/landing-content";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function NewsletterSection() {
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
    <section id="digest" className="px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="overflow-hidden rounded-[32px] bg-surface-container-low">
          <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
              <span className="block font-label text-xs font-bold uppercase tracking-[0.24em] text-primary">
                {newsletterContent.eyebrow}
              </span>
              <h2 className="mt-4 max-w-2xl font-headline text-4xl font-bold leading-tight tracking-[-0.06em] text-on-surface sm:text-5xl">
                {newsletterContent.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-on-surface-variant">
                {newsletterContent.description}
              </p>

              <form onSubmit={handleSubmit} className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    disabled={isLoading}
                    className="min-w-0 w-full rounded-full border border-outline-variant/20 bg-surface-container-lowest px-6 py-4 text-sm font-semibold text-on-surface outline-none transition-colors placeholder:text-outline-variant focus:border-primary/50 disabled:opacity-50"
                  />
                  {status === "success" && (
                    <Icons.checkCircle size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                  {status === "error" && (
                    <Icons.alertCircle size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full bg-primary px-8 py-4 font-headline text-sm font-bold tracking-[0.18em] uppercase text-on-primary transition-colors hover:bg-on-surface disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? <Loader size={18} /> : null}
                  Join
                </button>
              </form>
              {message && (
                <p className={`mt-3 text-sm font-medium ${status === "success" ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}
            </div>

            <div className="relative min-h-[360px] lg:min-h-full">
              <Image
                src={newsletterContent.image}
                alt={newsletterContent.imageAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
