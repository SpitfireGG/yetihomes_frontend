"use client";

import { Icons } from "@/components/ui/icons";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Footer from "@/components/landing/footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Acquisition",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(`${API_BASE_URL}/contact/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.interest,
          message: formState.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      setSubmitStatus("success");
      setSubmitMessage("Thank you! Your inquiry has been received. A portfolio director will contact you within 24 hours.");
      setFormState({
        name: "",
        email: "",
        phone: "",
        interest: "Acquisition",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
      setSubmitMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body selection:bg-primary/20">
      <nav className="fixed w-full px-6 lg:px-12 py-5 flex items-center justify-between z-40 bg-background/80 backdrop-blur-xl border-b border-outline-variant/20">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-transparent group-hover:border-outline-variant/40 group-hover:bg-surface-container-low transition-all duration-500 text-on-surface-variant group-hover:text-primary">
            <Icons.arrowLeft
              size={18}
              strokeWidth={1.5}
              className="group-hover:-translate-x-0.5 transition-transform duration-300"
            />
          </div>
          <span className="font-label text-[0.65rem] font-bold tracking-[0.25em] uppercase text-on-surface-variant group-hover:text-primary transition-colors duration-300">
            Return to Home
          </span>
        </Link>
      </nav>

      <main className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row pt-28 lg:pt-0">
        <div className="w-full lg:w-5/12 lg:h-screen lg:sticky top-0 flex flex-col justify-center px-6 lg:px-12 py-12 lg:py-24 border-r border-outline-variant/30">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-md"
          >
            <motion.h1
              variants={fadeUp}
              className="font-headline text-5xl md:text-6xl font-bold tracking-[-0.04em] text-on-surface mb-6 leading-[1.1]"
            >
              Private <br /> Consultations
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-on-surface-variant text-lg font-light leading-relaxed mb-16"
            >
              Whether you are acquiring a generational asset or seeking a
              precise market valuation, our directors are available for
              confidential discussions.
            </motion.p>

            <div className="space-y-10">
              <motion.div
                variants={fadeUp}
                className="flex items-start gap-5 group"
              >
                <Icons.mapPin
                  size={24}
                  strokeWidth={1}
                  className="text-outline mt-1 group-hover:text-primary transition-colors duration-500"
                />
                <div>
                  <h3 className="font-label text-[0.65rem] font-bold uppercase tracking-[0.25em] text-outline mb-3">
                    Headquarters
                  </h3>
                  <p className="font-headline text-xl text-on-surface font-medium leading-relaxed">
                    Baluwatar Residency Road,
                    <br />
                    Kathmandu 44600,
                    <br />
                    Nepal
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-start gap-5 group"
              >
                <Icons.phone
                  size={24}
                  strokeWidth={1}
                  className="text-outline mt-1 group-hover:text-primary transition-colors duration-500"
                />
                <div>
                  <h3 className="font-label text-[0.65rem] font-bold uppercase tracking-[0.25em] text-outline mb-3">
                    Direct Lines
                  </h3>
                  <a
                    href="tel:+9779812345678"
                    className="block font-headline text-xl text-on-surface hover:text-primary font-medium mb-1 transition-colors"
                  >
                    +977 98123 45678
                  </a>
                  <a
                    href="tel:+977014123456"
                    className="block font-headline text-xl text-on-surface hover:text-primary font-medium transition-colors"
                  >
                    +977 01 412 3456
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-start gap-5 group"
              >
                <Icons.mail
                  size={24}
                  strokeWidth={1}
                  className="text-outline mt-1 group-hover:text-primary transition-colors duration-500"
                />
                <div>
                  <h3 className="font-label text-[0.65rem] font-bold uppercase tracking-[0.25em] text-outline mb-3">
                    Digital Inquiry
                  </h3>
                  <a
                    href="mailto:concierge@yetihomes.com"
                    className="block font-headline text-xl text-on-surface hover:text-primary font-medium transition-colors"
                  >
                    concierge@yetihomes.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-7/12 px-6 lg:px-24 py-12 lg:py-32 bg-surface-container-lowest">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto"
          >
            <div className="mb-16">
              <h2 className="font-headline text-3xl font-bold tracking-[-0.04em] text-on-surface mb-4">
                Initiate Dialogue
              </h2>
              <p className="text-on-surface-variant font-light text-base">
                Please provide your details below. A dedicated portfolio
                director will contact you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Minimalist Input Field */}
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="block w-full bg-transparent border-0 border-b border-outline-variant/50 py-4 text-on-surface text-lg font-medium focus:ring-0 focus:border-primary transition-colors peer placeholder-transparent"
                  placeholder="Full Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-4 text-outline text-lg font-light transition-all peer-focus:-top-6 peer-focus:text-[0.65rem] peer-focus:font-label peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:text-primary peer-valid:-top-6 peer-valid:text-[0.65rem] peer-valid:font-label peer-valid:font-bold peer-valid:tracking-[0.2em] peer-valid:uppercase"
                >
                  Full Legal Name
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="block w-full bg-transparent border-0 border-b border-outline-variant/50 py-4 text-on-surface text-lg font-medium focus:ring-0 focus:border-primary transition-colors peer placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-4 text-outline text-lg font-light transition-all peer-focus:-top-6 peer-focus:text-[0.65rem] peer-focus:font-label peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:text-primary peer-valid:-top-6 peer-valid:text-[0.65rem] peer-valid:font-label peer-valid:font-bold peer-valid:tracking-[0.2em] peer-valid:uppercase"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState({ ...formState, phone: e.target.value })
                    }
                    className="block w-full bg-transparent border-0 border-b border-outline-variant/50 py-4 text-on-surface text-lg font-medium focus:ring-0 focus:border-primary transition-colors peer placeholder-transparent"
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 top-4 text-outline text-lg font-light transition-all peer-focus:-top-6 peer-focus:text-[0.65rem] peer-focus:font-label peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:text-primary peer-valid:-top-6 peer-valid:text-[0.65rem] peer-valid:font-label peer-valid:font-bold peer-valid:tracking-[0.2em] peer-valid:uppercase"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Minimalist Select/Radio area */}
              <div className="pt-4">
                <p className="font-label text-[0.65rem] font-bold uppercase tracking-[0.25em] text-outline mb-6">
                  Nature of Inquiry
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    "Acquisition",
                    "Property Valuation",
                    "Legal & Title",
                    "Other",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setFormState({ ...formState, interest: option })
                      }
                      className={`px-6 py-3 rounded-full border transition-all duration-300 font-label text-[0.65rem] font-bold uppercase tracking-[0.15em] ${
                        formState.interest === option
                          ? "border-primary bg-primary text-white"
                          : "border-outline-variant text-on-surface hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative group pt-4">
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="block w-full bg-transparent border-0 border-b border-outline-variant/50 py-4 text-on-surface text-lg font-medium focus:ring-0 focus:border-primary transition-colors peer placeholder-transparent resize-none"
                  placeholder="Message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-4 text-outline text-lg font-light transition-all peer-focus:-top-6 peer-focus:text-[0.65rem] peer-focus:font-label peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:text-primary peer-valid:-top-6 peer-valid:text-[0.65rem] peer-valid:font-label peer-valid:font-bold peer-valid:tracking-[0.2em] peer-valid:uppercase"
                >
                  Confidential Message
                </label>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-between w-full md:w-auto md:min-w-[240px] px-8 py-5 bg-brand-navy-900 text-white rounded-full hover:bg-brand-navy-800 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="font-label text-[0.7rem] font-bold tracking-[0.2em] uppercase">
                    {isSubmitting ? "Transmitting..." : "Submit Inquiry"}
                  </span>
                  {isSubmitting ? (
                    <Icons.loader size={18} className="animate-spin" />
                  ) : (
                    <Icons.arrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </button>
                {submitStatus !== "idle" && (
                  <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${submitStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                    {submitStatus === "success" ? (
                      <Icons.checkCircle size={18} />
                    ) : (
                      <Icons.alertCircle size={18} />
                    )}
                    {submitMessage}
                  </div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Cinematic Office Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="mt-32 relative aspect-[16/9] w-full rounded-[32px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-[2s] editorial-shadow"
          >
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
              alt="Headquarters Office"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full">
              <Icons.clock size={16} className="text-primary" strokeWidth={2} />
              <span className="font-label text-[0.65rem] font-bold uppercase tracking-[0.15em] text-on-surface">
                Mon - Fri, 09:00 - 18:00 NPT
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
