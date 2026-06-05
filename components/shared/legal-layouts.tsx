"use client";

import { Icons } from "@/components/ui/icons";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const sidebarLinks = [
  { name: "Terms of Service", path: "/legal/terms-conditions", icon: Icons.file },
  { name: "Privacy Policy", path: "/legal/privacy", icon: Icons.shield },
  { name: "Cookie Policy", path: "/legal/cookies", icon: Icons.cookie },
  { name: "Disclaimer", path: "/legal/disclaimer", icon: Icons.alertCircle },
];

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F8F8F5] pt-24 pb-20 font-sans">
      {/* Mini Hero Section */}
      <div className="bg-brand-navy-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')] opacity-10 object-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">
              Legal & Compliance
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-white/70 font-medium text-sm">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 mt-12 flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Sticky Sidebar Navigation */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 relative">
          <div className="sticky top-32 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              Documents
            </h3>
            <nav className="flex flex-col gap-2">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-primary" : "text-gray-400"}
                    />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Document Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 bg-white rounded-[32px] p-8 md:p-12 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
        >
          {/* This div handles all the typography styling for the children so you don't 
            have to style every single <p> and <h1> tag in your documents manually.
          */}
          <div
            className="prose prose-gray max-w-none 
            prose-headings:font-headline prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
            prose-li:text-gray-600 prose-li:marker:text-primary
            prose-a:text-primary prose-a:font-semibold hover:prose-a:text-primary/80
            prose-strong:text-gray-900"
          >
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
