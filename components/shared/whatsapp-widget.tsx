"use client";

import { Icons } from "@/components/ui/icons";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Custom WhatsApp SVG for authentic branding
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.459-1.656-1.756-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent scroll propagation when scrolling inside the widget
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Authentic Agent Data
  const agents = [
    {
      name: "Yasub Sunuwar",
      role: "Managing Director",
      phone: "9779851446902",
      img: "/teams/yasub.png",
      status: "online",
      message: "Hello! How can I help you find your dream home?",
    },
    {
      name: "Kritika Karmacharya",
      role: "Property Advisor",
      phone: "9779851446901",
      img: "/teams/kritikaFace.jpg",
      status: "online",
      message: "Hi there! Are you looking to buy sell or rent properties?",
    },
    {
      name: "Ngima Sherpa",
      role: "Founder & CEO",
      phone: "9779",
      img: "/teams/ngimaFace.jpeg",
      status: "online",
      message: "Hi there! Are you looking to buy sell or rent properties?",
    },
  ];

  const handleWhatsAppClick = (phone: string) => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent("Hello! I'm interested in learning more about Yeti Homes properties.")}`;
    window.open(url, "_blank");
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end"
    >
      {/* --- Widget Panel --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mb-4 w-[calc(100vw-32px)] sm:w-[380px] bg-white rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#128C7E] to-[#25D366] p-6 text-white relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <Icons.close size={16} className="text-white" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <WhatsAppIcon className="w-6 h-6 text-white" />
                <h3 className="font-bold text-lg leading-none">
                  Chat with Yeti Homes
                </h3>
              </div>
              <p className="text-white/80 text-xs font-medium">
                We typically reply within minutes.
              </p>
            </div>

            {/* Chat Area / Agents List */}
            <div className="bg-[#F0F2F5] p-5 flex flex-col gap-4 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
              {/* Timestamp */}
              <div className="flex justify-center">
                <span className="bg-white/80 px-3 py-1 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-widest shadow-sm">
                  Today
                </span>
              </div>

              {/* Agent Cards */}
              {agents.map((agent, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="text-[11px] font-bold text-gray-500 ml-14">
                    {agent.name} • {agent.role}
                  </div>

                  <div
                    onClick={() => handleWhatsAppClick(agent.phone)}
                    className="flex items-end gap-2 group cursor-pointer"
                  >
                    {/* Avatar */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm group-hover:ring-2 group-hover:ring-[#25D366] transition-all">
                      <Image
                        src={agent.img}
                        alt={agent.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-white rounded-full"></div>
                    </div>

                    {/* Chat Bubble */}
                    <div className="bg-white p-3.5 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 group-hover:shadow-md transition-all relative max-w-[85%]">
                      <p className="text-sm text-gray-800 font-medium leading-snug">
                        {agent.message}
                      </p>

                      {/* Click indicator */}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-medium">
                          Just now
                        </span>
                        <div className="flex items-center gap-1 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                          <span className="text-xs font-bold">Reply</span>
                          <Icons.message size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-gray-100 text-center">
              <p className="text-[10px] font-medium text-gray-400">
                Powered by{" "}
                <span className="font-bold text-gray-800">Yeti Homes Team</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.5)] transition-shadow duration-300"
      >
        {/* Subtle Ping Animation to draw attention */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.close size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <WhatsAppIcon className="w-6 h-6 md:w-9 md:h-9 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-gray-900 text-xs font-bold rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none whitespace-nowrap">
            Need help? Chat with us
            {/* Tooltip Triangle */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white rotate-45"></div>
          </div>
        )}
      </motion.button>
    </div>
  );
}
