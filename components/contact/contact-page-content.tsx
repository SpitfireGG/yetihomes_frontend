"use client";
import { Icons } from "@/components/ui/icons";
import { Loader } from "@/components/ui/loader";
import React, { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Footer from "@/components/landing/footer";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

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
    transition: { staggerChildren: 0.12 },
  },
};

export default function ContactPageContent() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Acquisition",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
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
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`,
        );
      }
      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you! Your inquiry has been received. A portfolio director will contact you within 24 hours.",
      );
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
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body selection:bg-primary/20">
      {/* Nav */}
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
        {/* ──── LEFT: Contact Info ──── */}
        <div className="w-full lg:w-5/12 lg:h-screen lg:sticky top-0 flex flex-col justify-center px-6 lg:px-12 py-12 lg:py-24 border-r border-outline-variant/15">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-md"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-[-0.04em] text-on-surface leading-[1.08]">
                Private
                <br />
                Consultations
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-on-surface-variant text-lg font-light leading-relaxed mb-16"
            >
              Whether you are acquiring a generational asset or seeking a
              precise market valuation, our directors are available for
              confidential discussions.
            </motion.p>

            <div className="space-y-8">
              {/* Address */}
              <motion.div
                variants={fadeUp}
                className="flex items-start gap-5 group p-4 -ml-4 rounded-2xl hover:bg-surface-container-low/60 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-500">
                  <Icons.mapPin
                    size={20}
                    strokeWidth={1.5}
                    className="text-on-surface-variant group-hover:text-primary transition-colors duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-label text-[0.6rem] font-bold uppercase tracking-[0.25em] text-outline mb-2">
                    Headquarters
                  </h3>
                  <p className="text-on-surface font-medium leading-relaxed">
                    Chuchepati, Chabahil,
                    <br />
                    Kathmandu, Nepal, 44600
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                variants={fadeUp}
                className="flex items-start gap-5 group p-4 -ml-4 rounded-2xl hover:bg-surface-container-low/60 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-500">
                  <Icons.phone
                    size={20}
                    strokeWidth={1.5}
                    className="text-on-surface-variant group-hover:text-primary transition-colors duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-label text-[0.6rem] font-bold uppercase tracking-[0.25em] text-outline mb-2">
                    Direct Lines
                  </h3>
                  <div className="space-y-1">
                    {[
                      "+977 9851446901",
                      "+977 9851446902",
                      "+977 9851361431",
                    ].map((num) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/\s/g, "")}`}
                        className="block text-on-surface hover:text-primary font-medium transition-colors duration-300"
                      >
                        {num}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                variants={fadeUp}
                className="flex items-start gap-5 group p-4 -ml-4 rounded-2xl hover:bg-surface-container-low/60 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-500">
                  <Icons.mail
                    size={20}
                    strokeWidth={1.5}
                    className="text-on-surface-variant group-hover:text-primary transition-colors duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-label text-[0.6rem] font-bold uppercase tracking-[0.25em] text-outline mb-2">
                    Digital Inquiry
                  </h3>
                  <a
                    href="mailto:Estateyetihomes@gmail.com"
                    className="block text-on-surface hover:text-primary font-medium transition-colors duration-300"
                  >
                    Estateyetihomes@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div
                variants={fadeUp}
                className="flex items-start gap-5 group p-4 -ml-4 rounded-2xl hover:bg-surface-container-low/60 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-500">
                  <Icons.clock
                    size={20}
                    strokeWidth={1.5}
                    className="text-on-surface-variant group-hover:text-primary transition-colors duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-label text-[0.6rem] font-bold uppercase tracking-[0.25em] text-outline mb-2">
                    Office Hours
                  </h3>
                  <p className="text-on-surface font-medium">
                    Sun – Fri, 10:00 – 17:00 NPT
                  </p>
                  <p className="text-on-surface-variant text-sm mt-1">
                    Occasions may effect working hours.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ──── RIGHT: Form ──── */}
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
              {/* Name */}
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
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full" />
              </div>

              {/* Email + Phone */}
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
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full" />
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
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full" />
                </div>
              </div>

              {/* Interest pills */}
              <div className="pt-4">
                <p className="font-label text-[0.65rem] font-bold uppercase tracking-[0.25em] text-outline mb-6">
                  Nature of Inquiry
                </p>
                <div className="flex flex-wrap gap-3">
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
                          ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                          : "border-outline-variant/60 text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
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
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full" />
              </div>

              {/* Submit */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center justify-between w-full md:w-auto md:min-w-[260px] px-8 py-5 bg-on-surface text-background rounded-full overflow-hidden transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-on-surface/15"
                >
                  <span className="relative z-10 font-label text-[0.7rem] font-bold tracking-[0.2em] uppercase">
                    {isSubmitting ? "Transmitting..." : "Submit Inquiry"}
                  </span>
                  {isSubmitting ? (
                    <Loader size={18} />
                  ) : (
                    <span className="relative z-10 w-8 h-8 rounded-full bg-background/15 flex items-center justify-center ml-4 group-hover:bg-background/25 transition-colors duration-300">
                      <Icons.arrowRight
                        size={16}
                        strokeWidth={1.5}
                        className="group-hover:translate-x-0.5 transition-transform duration-300"
                      />
                    </span>
                  )}
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>

                {submitStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 flex items-start gap-3 p-4 rounded-2xl text-sm font-medium ${
                      submitStatus === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <Icons.checkCircle
                        size={18}
                        className="shrink-0 mt-0.5"
                      />
                    ) : (
                      <Icons.alertCircle
                        size={18}
                        className="shrink-0 mt-0.5"
                      />
                    )}
                    <span>{submitMessage}</span>
                  </motion.div>
                )}
              </div>
            </form>

            {/* Confidence strip — replaces the image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-24 pt-12 border-t border-outline-variant/20"
            >
              <div className="grid grid-cols-3 gap-6 text-center">
                {[
                  { value: "24hr", label: "Response time" },
                  { value: "100%", label: "Confidential" },
                  { value: "10+", label: "Years experience" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
                      {stat.value}
                    </p>
                    <p className="font-label text-[0.6rem] font-bold uppercase tracking-[0.2em] text-outline mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
