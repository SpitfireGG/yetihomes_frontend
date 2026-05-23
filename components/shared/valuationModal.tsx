"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ValuationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // 1. Updated state to include separate email, phone, and message fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "house",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission (e.g., API call)
    console.log("Valuation requested:", formData);
    onClose();
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
              // Added max-h-[90vh] and overflow-y-auto to prevent the taller form from clipping on small screens
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
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

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white font-medium py-3.5 rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg active:scale-[0.98]"
                    >
                      Submit Request
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
