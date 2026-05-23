"use client";

import { Icons } from "@/components/ui/icons";

import React from "react";
import { motion } from "framer-motion";

export default function PropertyListingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-serif font-bold rounded-sm">
            A
          </div>
          <span className="font-bold text-lg tracking-tight">AdvLife</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500 hover:text-gray-900">
          <a
            href="#"
            className="flex items-center gap-2 text-black border-b-2 border-black pb-1"
          >
            <Icons.home size={18} /> Housing
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <Icons.car size={18} /> Car rent
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <Icons.car size={18} /> Taxi
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <Icons.ticket size={18} /> Ticket
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <Icons.palmTree size={18} /> Leisure
          </a>
        </nav>

        <div className="flex items-center gap-5 text-gray-500">
          <Icons.message
            size={20}
            className="hover:text-black cursor-pointer"
          />
          <Icons.help size={20} className="hover:text-black cursor-pointer" />
          <div className="flex items-center gap-1 hover:text-black cursor-pointer">
            <Icons.globe size={20} />
            <span className="text-sm">A</span>
          </div>
          <div className="flex items-center gap-1 hover:text-black cursor-pointer">
            <span className="text-sm font-medium">$</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer ml-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row h-[calc(100vh-73px)]">
        {/* Left Section: Image Gallery */}
        <div className="flex-1 p-4 flex gap-4 relative">
          {/* Floating Top Buttons */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex bg-white/80 backdrop-blur-md rounded-full p-1 shadow-sm">
            <button className="flex items-center gap-2 bg-white px-6 py-2 rounded-full font-medium text-sm shadow-sm">
              <Icons.home size={16} /> Photos
            </button>
            <button className="flex items-center gap-2 px-6 py-2 rounded-full font-medium text-sm text-gray-600 hover:text-black transition-colors">
              <Icons.box size={16} /> 3D view
            </button>
          </div>

          {/* Floating Bottom Buttons */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
            <button className="bg-white/80 backdrop-blur-md hover:bg-white px-4 py-2 rounded-lg font-medium text-sm shadow-sm transition-all">
              Show all photos
            </button>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg font-medium text-sm shadow-sm hover:bg-gray-50 transition-all">
              Next photo <Icons.chevronLeft size={16} className="rotate-180" />
            </button>
          </div>

          {/* Thumbnails Column */}
          <div className="w-1/4 flex flex-col gap-4">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80"
              alt="Thumbnail 1"
              className="w-full h-1/3 object-cover rounded-2xl"
            />
            <img
              src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=500&q=80"
              alt="Thumbnail 2"
              className="w-full h-1/3 object-cover rounded-2xl"
            />
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80"
              alt="Thumbnail 3"
              className="w-full h-1/3 object-cover rounded-2xl"
            />
          </div>

          {/* Main Hero Image */}
          <div className="w-3/4">
            <img
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80"
              alt="Main Villa Pool"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Right Section: Details Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full lg:w-[450px] bg-[#f7f4fc] p-6 flex flex-col overflow-y-auto"
        >
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center gap-1 text-gray-500 hover:text-black font-medium text-sm transition-colors">
              <Icons.chevronLeft size={18} /> Back
            </button>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors">
                <Icons.box size={16} /> Compare
              </button>
              <button className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <Icons.favorite size={18} />
              </button>
              <button className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <Icons.share size={18} />
              </button>
            </div>
          </div>

          {/* Title Area */}
          <h1 className="text-4xl font-serif font-medium leading-tight mb-6">
            Villa in Baneshwor
            <br />
            Ubud
          </h1>

          <div className="flex gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl flex-1 shadow-sm text-sm font-medium text-gray-700">
              <span className="truncate">
                Canggu Villa 1BR Private Pool Abimanyu
              </span>
              <Icons.lock size={14} className="text-gray-400 shrink-0" />
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm text-sm font-medium text-gray-700">
              <Icons.star size={16} className="text-gray-800 fill-gray-800" />
              4.8 <span className="text-gray-400 font-normal">(76)</span>
              <Icons.eye size={16} className="text-gray-400 ml-2" />
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50/50">
              <h3 className="font-semibold mb-3">Bathroom</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Icons.wind size={14} /> Hair dryer
                </li>
                <li className="flex items-center gap-2">
                  <Icons.droplet size={14} /> Shampoo
                </li>
                <li className="flex items-center gap-2">
                  <Icons.thermometer size={14} /> Hot water
                </li>
                <li className="flex items-center gap-2">
                  <Icons.droplet size={14} /> Shower gel
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50/50">
              <h3 className="font-semibold mb-3">Bedroom</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Icons.box size={14} /> Essentials
                </li>
                <li className="flex items-center gap-2">
                  <Icons.shirt size={14} /> Hangers
                </li>
                <li className="flex items-center gap-2">
                  <Icons.briefcase size={14} /> Safe
                </li>
                <li className="flex items-center gap-2">
                  <Icons.box size={14} /> Clothing storage
                </li>
              </ul>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          </div>

          {/* Host Info */}
          <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Host"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold flex items-center gap-1">
                    Grün <Icons.shield size={14} className="text-blue-500" />
                  </h4>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <Icons.messageCircle size={18} />
                </button>
                <button className="p-2 border border-gray-100 rounded-lg bg-gray-900 text-white hover:bg-black transition-colors">
                  <Icons.phone size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-3 border-b border-gray-100 pb-3">
              <span className="flex items-center gap-1">
                <Icons.star size={12} className="fill-gray-400" /> Superhost
              </span>
              <span className="flex items-center gap-1">
                <Icons.message size={12} /> 340 reviews
              </span>
              <span className="flex items-center gap-1">
                <Icons.globe size={12} /> English, Deutsch
              </span>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <Icons.messageCircle size={14} /> 100% response / Replies within an hour
            </div>
          </div>

          {/* Map Preview */}
          <div className="relative h-48 rounded-2xl overflow-hidden mb-24 bg-gray-200">
            {/* Placeholder for actual map component */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
              className="w-full h-full object-cover opacity-60 mix-blend-multiply"
              alt="Map area"
            />
            <div className="absolute inset-0 bg-purple-500/10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm mb-1">
                <Icons.mapPin size={20} className="text-indigo-600" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-white/80 rounded shadow-sm backdrop-blur-sm">
                Balikpapan
              </span>
            </div>
          </div>

          {/* Sticky Bottom Booking Bar */}
          <div className="fixed lg:absolute bottom-0 left-0 right-0 p-6 bg-[#f7f4fc] border-t border-purple-100/50">
            <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">$526</span>
                  <span className="text-gray-500 text-sm">night</span>
                  <Icons.chevronLeft
                    size={16}
                    className="-rotate-90 text-gray-400 cursor-pointer"
                  />
                </div>
                <div className="text-sm text-gray-400">
                  23-25 March • 1 guest
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 border border-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <Icons.car size={16} />
                  <Icons.chevronLeft size={14} className="-rotate-90 text-gray-400" />
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-md shadow-indigo-200">
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
