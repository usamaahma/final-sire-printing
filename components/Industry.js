"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categoryData = [
  {
    id: "cbd",
    name: "CBD Packaging",
    subCategories: [
      {
        id: 101,
        name: "CBD Display Packaging",
        img: "/sire-prinitng-hero.jpg",
        tag: "New",
      },
      {
        id: 102,
        name: "CBD Pre Roll Packaging",
        img: "/sire-prinitng-hero.jpg",
        tag: "Hot",
      },
    ],
  },
  {
    id: "vape",
    name: "Vape Packaging",
    subCategories: [
      {
        id: 201,
        name: "E-Cigarette Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Trending",
      },
      {
        id: 202,
        name: "Vape Juice Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Retail",
      },
    ],
  },
  {
    id: "cosmetic",
    name: "Cosmetic Boxes",
    subCategories: [
      {
        id: 301,
        name: "Lipstick Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Beauty",
      },
    ],
  },
];

export default function IndustrySection() {
  const [activeCategory, setActiveCategory] = useState(categoryData[0].id);

  const toggleCategory = (id) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  return (
    <div className="bg-white py-10 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        {/* Title Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
            Custom <span className="text-[#f4a11d]">Packaging</span> Boxes
          </h2>
          <div className="w-20 h-2 bg-[#f4a11d] mt-4 rounded-full"></div>
        </div>

        {/* Layout Wrapper */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          {/* CATEGORIES SECTION */}
          <div className="w-full lg:w-1/4 xl:w-1/5 flex flex-col gap-3">
            {categoryData.map((cat) => (
              <div key={cat.id} className="flex flex-col gap-3">
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex items-center justify-between px-6 py-5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 border-2 ${
                    activeCategory === cat.id
                      ? "bg-black border-black text-white shadow-xl"
                      : "bg-white border-gray-100 text-black hover:border-[#f4a11d]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform duration-300 ${activeCategory === cat.id ? "rotate-0 text-[#f4a11d]" : "-rotate-90 opacity-30"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* MOBILE VIEW Accordion */}
                <div className="lg:hidden">
                  <AnimatePresence>
                    {activeCategory === cat.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-6 pb-8 pt-2 px-2">
                          {cat.subCategories.map((sub) => (
                            <SubCategoryCard key={sub.id} sub={sub} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW Right Grid */}
          <div className="hidden lg:block flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {categoryData
                  .find((c) => c.id === activeCategory)
                  ?.subCategories.map((sub) => (
                    <SubCategoryCard key={sub.id} sub={sub} />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubCategoryCard({ sub }) {
  return (
    <div className="group bg-white rounded-[2.5rem] p-6 shadow-lg shadow-gray-100/50 border border-gray-100 flex flex-col h-full hover:bg-[#f4a11d] hover:border-[#f4a11d] transition-all duration-500 cursor-pointer">
      {/* Image Container */}
      <div className="aspect-square bg-gray-50 rounded-[2rem] overflow-hidden mb-6 relative border border-gray-50 group-hover:bg-white/20 transition-colors duration-500">
        <img
          src={sub.img}
          alt={sub.name}
          className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
        />
        {sub.tag && (
          <span className="absolute top-4 left-4 bg-[#f4a11d] text-white group-hover:bg-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter transition-colors">
            {sub.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 text-center">
        <h3 className="text-lg font-black text-black uppercase leading-tight mb-6 px-2 tracking-tight group-hover:text-white transition-colors">
          {sub.name}
        </h3>

        <button className="mt-auto w-full py-4 bg-[#f4a11d] group-hover:bg-white text-white group-hover:text-[#f4a11d] rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#f4a11d]/20 group-hover:shadow-none transition-all duration-300 active:scale-95">
          Get Quote
        </button>
      </div>
    </div>
  );
}
