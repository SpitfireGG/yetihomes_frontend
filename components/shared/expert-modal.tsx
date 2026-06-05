"use client";
import { Icons } from "@/components/ui/icons";
import { Loader } from "@/components/ui/loader";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Expert {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
}

interface ExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  experts?: Expert[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const defaultExperts: Expert[] = [
  {
    id: "1",
    name: "Sonam Dorji",
    role: "Director of Residential Sales",
    phone: "+977 98512 34567",
    email: "sonam@yetihomes.com",
    image: "",
  },
  {
    id: "2",
    name: "Tashi Sherpa",
    role: "Senior Luxury Property Specialist",
    phone: "+977 98512 34568",
    email: "tashi@yetihomes.com",
    image: "",
  },
  {
    id: "3",
    name: "Karma Wangchuk",
    role: "Commercial & Investment Advisor",
    phone: "+977 98512 34569",
    email: "karma@yetihomes.com",
    image: "",
  },
];

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  expertId: string;
}

const initialData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  expertId: "",
};

export function ExpertModal({
  isOpen,
  onClose,
  experts = defaultExperts,
}: ExpertModalProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          inquiryType: "Talk to Expert",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setStatus("success");
      setMessage("Thank you! An expert will contact you shortly.");
      setFormData(initialData);
      setShowThanks(true);
      setTimeout(() => {
        onClose();
        setShowThanks(false);
      }, 2500);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectedExpert = experts.find((e) => e.id === formData.expertId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-brand-navy-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-2xl">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <Icons.close size={20} />
              </button>

              {!showThanks ? (
                <div className="flex flex-col lg:flex-row">
                  <div className="w-full bg-gradient-to-br from-primary via-secondary to-brand-accent-500 p-8 text-white lg:w-5/12">
                    <h3 className="mb-2 font-headline text-xl font-bold">
                      Our Experts
                    </h3>
                    <p className="mb-6 text-sm text-white/80">
                      Select an expert or submit your details and we&apos;ll connect you
                      with the right person.
                    </p>
                    <div className="space-y-3">
                      {experts.map((expert) => (
                        <button
                          key={expert.id}
                          onClick={() =>
                            setFormData({ ...formData, expertId: expert.id })
                          }
                          className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
                            formData.expertId === expert.id
                              ? "bg-white/20"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold uppercase">
                            {expert.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{expert.name}</p>
                            <p className="truncate text-xs text-white/70">
                              {expert.role}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="w-full p-8 lg:w-7/12">
                    {selectedExpert ? (
                      <div className="mb-6 rounded-2xl bg-green-500/10 p-6">
                        <div className="mb-4 flex items-center gap-4">
                          <div className="flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-lg font-bold uppercase text-primary">
                            {selectedExpert.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div>
                            <h4 className="font-bold text-on-surface">
                              {selectedExpert.name}
                            </h4>
                            <p className="text-sm text-on-surface-variant">
                              {selectedExpert.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={`tel:${selectedExpert.phone}`}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                          >
                            <Icons.phone size={16} />
                            Call Now
                          </a>
                          <a
                            href={`mailto:${selectedExpert.email}`}
                            className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container"
                          >
                            <Icons.mail size={16} />
                            Email
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 rounded-2xl bg-surface-container p-6 text-center">
                        <p className="text-on-surface-variant">
                          Select an expert from the left or submit your details below.
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
                          placeholder="+977 98XXXX XXXX"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          rows={2}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full resize-none rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
                          placeholder="Tell us what you need help with..."
                        />
                      </div>

                      {status !== "idle" && (
                        <div
                          className={`flex items-center gap-2 rounded-xl p-4 ${
                            status === "success"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-red-500/10 text-red-600"
                          }`}
                        >
                          {status === "success" ? (
                            <Icons.checkCircle size={18} />
                          ) : (
                            <Icons.alertCircle size={18} />
                          )}
                          <span className="text-sm font-medium">{message}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-primary-on-primary transition-colors hover:bg-primary/90 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader size={18} />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Request Callback
                            <Icons.arrowRight size={18} />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-100"
                  >
                    <Icons.checkCircle size={40} className="text-green-600" />
                  </motion.div>
                  <h3 className="mb-2 font-headline text-2xl font-bold text-on-surface">
                    Request Received!
                  </h3>
                  <p className="text-on-surface-variant">
                    We&apos;ll connect you with an expert shortly.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useExpertModal() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}
