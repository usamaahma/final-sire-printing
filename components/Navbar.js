"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  Phone,
  Mail,
  Box,
  Layers,
  Star,
  Layout,
  Menu,
  X,
} from "lucide-react";

const PRODUCTS = [
  {
    title: "CBD Packaging",
    desc: "Eco-friendly premium oil boxes",
    icon: <Box className="w-4 h-4" />,
  },
  {
    title: "Custom Boxes",
    desc: "Tailor-made structural designs",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    title: "Box Styles",
    desc: "Explore our folding library",
    icon: <Layout className="w-4 h-4" />,
  },
  {
    title: "Stickers",
    desc: "High-gloss custom decals",
    icon: <Star className="w-4 h-4" />,
  },
];

// Yahan apni news add karein
const TICKER_NEWS = [
  "🔥 Limited Time Offer: Get 20% Off on All Custom CBD Packaging!",
  "🚚 Free Shipping on orders over $500 - Order Now!",
  "✨ New Box Styles added to our Portfolio - Check them out!",
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isScrolled ? "text-white" : "text-black";
  const logoSrc = isScrolled
    ? "https://sireprinting.com/frontend-theme/assets/images/logo-white.png"
    : "https://sireprinting.com/img/brand/Sire-Printing.png";

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full pointer-events-none font-sans">
      {/* --- NEWS TICKER PATTI --- */}
      <div className="w-full bg-[#f4a11d] text-white overflow-hidden pointer-events-auto py-1.5 border-b border-[#f4a11d]">
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="whitespace-nowrap flex gap-10 text-[10px] font-bold uppercase tracking-widest"
        >
          {TICKER_NEWS.map((news, i) => (
            <span key={i} className="inline-block">
              {news}
            </span>
          ))}
          {/* Re-render news for seamless loop */}
          {TICKER_NEWS.map((news, i) => (
            <span key={`dup-${i}`} className="inline-block">
              {news}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.nav
        className={`pointer-events-auto w-full transition-all duration-500 ease-in-out border-b ${
          isScrolled
            ? "bg-black shadow-2xl border-transparent"
            : "bg-[#f3f3f3]/95 backdrop-blur-md border-black/5"
        }`}
      >
        {/* --- TOP BAR (Desktop Only) --- */}
        <div
          className={`hidden md:flex justify-between items-center px-10 py-2 text-[9px] tracking-[0.2em] uppercase font-bold border-b transition-colors ${
            isScrolled
              ? "text-gray-400 border-white/10"
              : "text-gray-600 border-black/5"
          }`}
        >
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5 hover:text-orange-500 cursor-pointer transition-colors">
              <Phone size={11} className="text-orange-500" /> (332) 222-4710
            </span>
            <span className="flex items-center gap-1.5 hover:text-orange-500 cursor-pointer transition-colors">
              <Mail size={11} className="text-orange-500" />{" "}
              support@sireprinting.com
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span
              className={`hover:text-orange-500 cursor-pointer transition-colors ${textColor}`}
            >
              Wholesale
            </span>
            <span
              className={`hover:text-orange-500 cursor-pointer transition-colors ${textColor}`}
            >
              Track Order
            </span>
          </div>
        </div>

        {/* --- MAIN NAVIGATION --- */}
        <div
          className={`px-6 md:px-10 flex justify-between items-center transition-all duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo - Large Size */}
          <div className="flex items-center cursor-pointer">
            <img
              src={logoSrc}
              alt="Logo"
              className={`object-contain transition-all duration-300 ${
                isScrolled ? "h-10 md:h-12" : "h-11 md:h-14"
              }`}
            />
          </div>

          {/* Desktop Menu - Attached to Bottom */}
          <div
            className={`hidden lg:flex items-end justify-center flex-1 gap-10 text-[13px] font-bold uppercase tracking-[0.1em] h-full pb-4 ${textColor}`}
          >
            <NavLink title="All Products" isScrolled={isScrolled} />

            {/* Categories Dropdown */}
            <div
              className="relative flex items-end cursor-pointer"
              onMouseEnter={() => setActiveDropdown("products")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-end gap-1 hover:text-orange-500 transition-colors uppercase">
                Categories
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${activeDropdown ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full -left-10 w-[500px] pt-2 pointer-events-auto"
                  >
                    <div className="bg-white border border-black/5 rounded-xl p-5 shadow-2xl grid grid-cols-2 gap-3">
                      {PRODUCTS.map((item) => (
                        <div
                          key={item.title}
                          className="p-3 rounded-lg hover:bg-gray-50 transition-all group flex gap-4 items-center cursor-pointer"
                        >
                          <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-black text-[11px] font-bold uppercase">
                              {item.title}
                            </div>
                            <div className="text-gray-500 text-[9px] lowercase mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink title="Portfolio" isScrolled={isScrolled} />
            <NavLink title="Styles" isScrolled={isScrolled} />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden xl:flex relative group">
              <input
                type="text"
                placeholder="Search..."
                className={`bg-white/10 border rounded-full py-2 px-5 text-[10px] w-36 focus:w-48 outline-none transition-all duration-300 ${
                  isScrolled
                    ? "text-white border-white/20 placeholder:text-gray-500"
                    : "text-black border-black/10 placeholder:text-gray-500"
                }`}
              />
              <Search
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            <button className="hidden sm:block bg-[#f4a11d] hover:bg-[#f4a11d]-500 text-white rounded-full font-black text-[10px] uppercase tracking-widest px-6 py-2.5 shadow-lg active:scale-95 transition-all">
              Get a Free Quote
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-black/5"
              }`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] pointer-events-auto"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-[120] pointer-events-auto shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <img
                  src="https://sireprinting.com/img/brand/Sire-Printing.png"
                  alt="Logo"
                  className="h-8 object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-black p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              {/* Mobile Links */}
              <div className="flex flex-col gap-6 text-[12px] font-bold uppercase tracking-widest text-black">
                <a
                  href="#"
                  className="hover:text-orange-600 transition-colors border-b border-gray-100 pb-2"
                >
                  All Products
                </a>
                <div className="flex flex-col gap-4">
                  <span className="text-gray-400 text-[10px]">Categories</span>
                  {PRODUCTS.map((p) => (
                    <a
                      key={p.title}
                      href="#"
                      className="flex items-center gap-3 hover:text-orange-600 transition-colors pl-2"
                    >
                      <span className="text-orange-500">{p.icon}</span>{" "}
                      {p.title}
                    </a>
                  ))}
                </div>
                <a
                  href="#"
                  className="hover:text-orange-600 transition-colors border-b border-gray-100 pb-2"
                >
                  Portfolio
                </a>
                <a
                  href="#"
                  className="hover:text-orange-600 transition-colors border-b border-gray-100 pb-2"
                >
                  Styles
                </a>
              </div>
              <div className="mt-auto pt-10">
                <button className="w-full bg-[#f4a11d] text-white py-4 rounded-xl font-black uppercase text-[11px] tracking-widest shadow-xl">
                  Get a Free Quote
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ title, isScrolled }) {
  return (
    <a
      href="#"
      className="relative group overflow-hidden h-5 flex flex-col justify-start"
    >
      <span
        className={`relative transition-transform duration-500 ease-out group-hover:-translate-y-full ${isScrolled ? "text-white" : "text-black"}`}
      >
        {title}
      </span>
      <span className="absolute top-full left-0 text-orange-500 transition-transform duration-500 ease-out group-hover:-translate-y-full">
        {title}
      </span>
    </a>
  );
}
