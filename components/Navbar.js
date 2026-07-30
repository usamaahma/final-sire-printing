"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Phone, Mail, Menu, X, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const C = {
  ticker: "#000000",
  primary: "#ffa015",
  primaryHover: "#e08800",
  accent: "#ffa015",
};

const TICKER_NEWS = [
  "⏱ Enjoy a quick turnaround time and get your orders delivered in just 7 days!",
  "🔥 Limited Time Offer: Get 20% Off on All Custom CBD Packaging!",
  "🚚 Free Shipping on orders over $500 — Order Now!",
  "✨ New Box Styles added to our Portfolio — Check them out!",
];

const GLOBAL_FLAGS = [
  { src: "/united-states.png", label: "US", href: "https://sireprinting.com/" },
  { src: "/united-kingdom.png", label: "UK", href: "/" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [navCategories, setNavCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [1, 0]);
  const height = useTransform(scrollY, [0, 50], [35, 0]);

  useEffect(() => {
    async function fetchNavbarData() {
      try {
        // Fetch Navbar Categories
        const res = await fetch("/api/navbarcategories");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setNavCategories(data.data);
        }

        // Fetch Logged-in User Data
        const userRes = await fetch("/api/auth/me");
        const userDataJson = await userRes.json();
        if (userDataJson.success) {
          setUserData(userDataJson.user);
        }
      } catch (err) {
        console.error("Failed to fetch navbar data:", err);
      }
    }
    fetchNavbarData();

    // LocalStorage cart count
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(savedCart.length);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] w-full font-sans ">
        {/* Ticker */}
        <div
          className="w-full overflow-hidden text-white"
          style={{ backgroundColor: C.ticker }}
        >
          <motion.div
            style={{ opacity, height, backgroundColor: "#000000" }}
            className="w-full overflow-hidden text-white flex items-center"
          >
            <motion.div
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="whitespace-nowrap flex gap-20 text-[11px] font-semibold"
            >
              {[...TICKER_NEWS, ...TICKER_NEWS].map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Main Header */}
        <div className="w-full bg-white border-b border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <div className="w-full px-6 md:px-10 py-4 flex items-center gap-5">
            <Link href="/" className="flex-shrink-0">
              <img
                src="../logos/sire-printing-uk-logo.svg"
                alt="Sire Printing"
                className="h-[52px] w-auto object-contain"
              />
            </Link>

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-full py-[10px] pl-5 pr-12 text-sm text-gray-700 outline-none focus:border-[#ffa015]"
              />
              <button
                aria-label="Search"
                className="absolute right-0 top-0 h-full px-5"
                style={{ color: C.accent }}
              >
                <Search size={18} />
              </button>
            </div>

            {/* Cart, User Profile & CTA */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">
              <div className="text-right leading-snug border-l pl-5 border-gray-200">
                <p className="text-[11px] text-gray-500 font-medium">
                  Speak with an Expert
                </p>
                <a
                  href="tel:3322224710"
                  className="flex items-center justify-end gap-1.5 font-bold text-[15px] mt-0.5"
                  style={{ color: C.accent }}
                >
                  <Phone size={13} /> (332) 222-4710
                </a>
              </div>

              <Link href="/getaquote">
                <button
                  className="text-white font-bold text-[12px] uppercase tracking-widest px-7 py-[11px]"
                  style={{ backgroundColor: C.primary }}
                >
                  Get a Free Quote
                </button>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Bottom Nav (Height increased to h-[54px]) */}
        <div className="hidden lg:block w-full bg-white border-b border-gray-200 overflow-x-auto">
          <div className="w-full px-6 md:px-10 flex items-center justify-between h-[54px]">
            <nav className="flex items-center h-full gap-1 overflow-x-auto no-scrollbar">
              {navCategories.map((item, index) => {
                const cat = item.category;
                if (!cat) return null;
                const label = item.customLabel || cat.title || cat.name;
                const slug = cat.slug || "";

                return (
                  <Link
                    key={item._id || index}
                    href={`/${slug}`}
                    className="px-4 h-full flex items-center text-[13px] font-medium text-gray-700 hover:text-[#ffa015] border-b-2 border-transparent hover:border-[#ffa015] transition-colors whitespace-nowrap"
                  >
                    {label}
                  </Link>
                );
              })}

              <Link
                href="/wholesale"
                className="px-4 h-full flex items-center text-[13px] font-medium text-gray-700 hover:text-[#ffa015] border-b-2 border-transparent hover:border-[#ffa015] transition-colors whitespace-nowrap"
              >
                Wholesale
              </Link>
            </nav>

            <div className="flex items-center gap-2 flex-shrink-0 pl-4">
              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative p-2 text-gray-700 hover:text-[#ffa015] transition-colors"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ffa015] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account / Name */}
              <Link
                href="/my-account"
                className="flex items-center gap-2 p-2 text-gray-700 hover:text-[#ffa015] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-bold text-xs border border-gray-200">
                  {userData?.name ? (
                    userData.name.charAt(0).toUpperCase()
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] text-gray-400 font-medium">
                    Hello,
                  </span>
                  <span className="block text-xs font-bold text-gray-800 max-w-[100px] truncate">
                    {userData?.name ? userData.name.split(" ")[0] : "Sign In"}
                  </span>
                </div>
              </Link>
              <span className="text-[12px] text-gray-600 font-medium">
                Global Operations:
              </span>
              <div className="flex items-center gap-3">
                {GLOBAL_FLAGS.map((f) => (
                  <a
                    key={f.label}
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <img
                      src={f.src}
                      alt={f.label}
                      className="w-8 h-auto cursor-pointer object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-[110] flex">
            <div
              className="fixed inset-0 bg-black/55 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <div className="relative ml-auto h-full w-[280px] bg-white z-[120] shadow-2xl flex flex-col p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <img
                  src="https://sireprinting.com/img/brand/Sire-Printing.png"
                  alt="Sire Printing"
                  className="h-8 object-contain"
                />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-3 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-800">
                <Link
                  href="/my-account"
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 flex items-center gap-2 text-gray-800 border-b pb-3"
                >
                  <User size={18} />{" "}
                  {userData?.name ? userData.name : "My Account / Sign In"}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 flex items-center gap-2 text-[#ffa015]"
                >
                  <ShoppingCart size={18} /> Cart ({cartCount})
                </Link>

                <p className="text-[10px] text-gray-400 mt-2 mb-1 normal-case tracking-wider">
                  Categories
                </p>
                {navCategories.map((item, index) => {
                  const cat = item.category;
                  if (!cat) return null;
                  const label = item.customLabel || cat.title || cat.name;
                  const slug = cat.slug || "";

                  return (
                    <Link
                      key={item._id || index}
                      href={`/${slug}`}
                      onClick={() => setIsMobileOpen(false)}
                      className="py-2 pl-2 hover:text-[#ffa015] transition-colors border-b border-gray-50 text-gray-700 font-medium normal-case text-[13px]"
                    >
                      {label}
                    </Link>
                  );
                })}
                <Link
                  href="/wholesale"
                  onClick={() => setIsMobileOpen(false)}
                  className="py-3 mt-2 border-t border-gray-100 hover:text-[#ffa015]"
                >
                  Wholesale
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-[120px] md:h-[120px] w-full pb-24" />
    </>
  );
}
