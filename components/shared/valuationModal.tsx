"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitInquiry } from "@/lib/api";

export default function ValuationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "house",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    try {
      await submitInquiry({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiryType: "Property Valuation",
        message: `Property Address: ${formData.address}\nProperty Type: ${formData.propertyType}\n${formData.message}`,
      });
      setStatus("success");
      setStatusMessage("Valuation request submitted! We'll contact you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", address: "", propertyType: "house", message: "" });
      setTimeout(onClose, 2000);
    } catch (err) {
      setStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
                            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                      Request a Valuation
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Enter your property details below and our team will get
                      back to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Reduced space-y from 5 to 4 to tighten the layout slightly */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-gray-900"
                      placeholder="John Doe"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  {/* 2. New Separated Email Field */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-gray-900"
                      placeholder="john@example.com"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  {/* 3. New Separated Phone Field */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-gray-900"
                      placeholder="+1 (555) 000-0000"
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Property Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-gray-900"
                      placeholder="123 Main St, City"
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-gray-900 bg-white"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          propertyType: e.target.value,
                        })
                      }
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>

                  {/* 4. New Message Field at the bottom */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Leave a Message{" "}
                      <span className="text-gray-400 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-gray-900 resize-none"
                      placeholder="Any specific details you'd like us to know?"
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  {status !== "idle" && (
                    <div className={`flex items-center gap-2 rounded-xl p-3 ${status === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                      {status === "success" ? (
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      )}
                      <span className="text-sm font-medium">{statusMessage}</span>
                    </div>
                  )}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 text-white font-medium py-3.5 rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
