"use client";
import { Icons } from "@/components/ui/icons";
import { Loader } from "@/components/ui/loader";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalFormData {
  name: string;
  email: string;
  phone: string;
  budget: string;
  location: string;
  requirement: string;
}

interface RequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const initialData: ModalFormData = {
  name: "",
  email: "",
  phone: "",
  budget: "",
  location: "",
  requirement: "",
};

export function RequirementModal({ isOpen, onClose }: RequirementModalProps) {
  const [formData, setFormData] = useState<ModalFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
          message:
            `${formData.requirement}\n\nBudget: ${formData.budget}\nLocation: ${formData.location}`.trim(),
          inquiryType: "Custom Requirement",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setStatus("success");
      setMessage("Thank you! We'll contact you within 24 hours.");
      setFormData(initialData);
      setTimeout(onClose, 2000);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-16px)] sm:w-full max-w-lg -translate-x-1/2 -translate-y-1/2 sm:p-4"
          >
            <div className="relative max-h-[90dvh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-surface-container-lowest p-5 sm:p-6 md:p-8 shadow-2xl">
              <button
                onClick={onClose}
                className="absolute right-3 top-3 sm:right-4 sm:top-4 flex size-8 sm:size-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <Icons.close size={18} />
              </button>

              <div className="mb-5 sm:mb-6 md:mb-8">
                <h2 className="mb-1.5 font-headline text-xl sm:text-2xl font-bold text-on-surface">
                  Tell Us Your Requirement
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant">
                  Our experts will find your perfect property.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition-colors focus:border-primary"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition-colors focus:border-primary"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition-colors focus:border-primary"
                      placeholder="+977 98XXXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition-colors focus:border-primary"
                    >
                      <option value="">Select budget</option>
                      <option value="Under 50 Lakhs">Under 50 Lakhs</option>
                      <option value="50 Lakhs - 1 Crore">
                        50 Lakhs - 1 Crore
                      </option>
                      <option value="1 - 2 Crore">1 - 2 Crore</option>
                      <option value="2 - 5 Crore">2 - 5 Crore</option>
                      <option value="5 Crore+">5 Crore+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition-colors focus:border-primary"
                    placeholder="e.g., Kathmandu, Lalitpur"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Describe Your Requirement *
                  </label>
                  <textarea
                    name="requirement"
                    required
                    rows={3}
                    value={formData.requirement}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-outline-variant bg-surface-container-low px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface outline-none transition-colors focus:border-primary"
                    placeholder="Describe the property you're looking for..."
                  />
                </div>

                {status !== "idle" && (
                  <div
                    className={`flex items-center gap-2 rounded-xl p-3 sm:p-4 ${
                      status === "success"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {status === "success" ? (
                      <Icons.checkCircle size={16} />
                    ) : (
                      <Icons.alertCircle size={16} />
                    )}
                    <span className="text-xs sm:text-sm font-medium">
                      {message}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 sm:py-4 text-sm sm:text-base text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={16} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Requirement
                      <Icons.arrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useRequirementModal() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}
