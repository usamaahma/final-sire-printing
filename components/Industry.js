"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Teeno headings ka data (full image cards ke liye image full honi chahye ya solid background)
const sections = [
  {
    title: "Custom Packaging By Industry",
    data: [
      {
        id: 1,
        name: "CBD Packaging",
        img: "/sire-prinitng-hero.jpg",
        tag: "Organic",
      },
      {
        id: 2,
        name: "Cosmetic Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Beauty",
      },
      {
        id: 3,
        name: "Vape Packaging",
        img: "/sire-prinitng-hero.jpg",
        tag: "Trend",
      },
      {
        id: 4,
        name: "Food Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Fresh",
      },
      {
        id: 5,
        name: "Retail Packaging",
        img: "/sire-prinitng-hero.jpg",
        tag: "Standard",
      },
    ],
  },
  {
    title: "Custom Box Styles",
    data: [
      {
        id: 6,
        name: "Mailer Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "E-comm",
      },
      {
        id: 7,
        name: "Tuck Top Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Retail",
      },
      {
        id: 8,
        name: "Sleeve Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Luxury",
      },
      {
        id: 9,
        name: "Pillow Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Gift",
      },
      {
        id: 10,
        name: "Gable Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Events",
      },
    ],
  },
  {
    title: "Hot Selling Products",
    data: [
      {
        id: 11,
        name: "Hanging Display",
        img: "/sire-prinitng-hero.jpg",
        tag: "Best Seller",
      },
      {
        id: 12,
        name: "Display Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Hot",
      },
      {
        id: 13,
        name: "Gift Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Popular",
      },
      {
        id: 14,
        name: "Candle Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "New",
      },
      {
        id: 15,
        name: "Soap Boxes",
        img: "/sire-prinitng-hero.jpg",
        tag: "Classic",
      },
    ],
  },
];

export default function IndustrySection() {
  return (
    <div className="bg-white space-y-20 py-16 overflow-hidden">
      {sections.map((section, idx) => (
        <div key={idx} className="container mx-auto px-4 md:px-10">
          <InnerCarousel section={section} />
        </div>
      ))}
    </div>
  );
}

function InnerCarousel({ section }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ab cards chote hain, to desktop par 4 aur mobile par 2 dikhayenge
  const cardsToShow = {
    mobile: 2,
    desktop: 4,
  };

  const gap = 16; // 4px gap (16px in Tailwind is gap-4)
  const maxIndex = Math.ceil(section.data.length - cardsToShow.desktop);

  const next = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(maxIndex); // Loop to end
    }
  };

  return (
    <>
      {/* Header with Arrows - Smaller Text */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col items-center justify-center mb-10 w-full">
          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter text-center">
            {section.title.split(" ").slice(0, -1).join(" ")}
            <span className="text-brand-orange ml-2">
              {section.title.split(" ").pop()}
            </span>
          </h2>

          {/* Bottom Center Border/Divider */}
          <div className="w-20 h-1.5 bg-brand-orange mt-3 rounded-full"></div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-slate-200 text-slate-400 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all active:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-slate-200 text-slate-400 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all active:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Window */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${currentIndex * (100 / cardsToShow.desktop)}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          {section.data.map((item) => (
            <motion.div
              key={item.id}
              // Cards Sizes Compact:
              // Mobile: calc(50% - gap)
              // Desktop: calc(25% - gap)
              className="min-w-[calc(50%-8px)] md:min-w-[calc(25%-12px)] aspect-[3/4] relative group rounded-2xl overflow-hidden shadow-md cursor-pointer border border-gray-100 bg-white"
            >
              {/* Full Image Background - Absolute */}
              <img
                src={item.img}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 z-10"
              />

              {/* Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 group-hover:from-slate-950/90 transition-colors"></div>

              {/* Card Content - Over image */}
              <div className="absolute inset-x-0 bottom-0 p-4 z-30 flex flex-col justify-end h-full">
                {/* Tag */}
                <span className="self-start bg-brand-orange text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                  {item.tag}
                </span>

                {/* Title - Compact */}
                <h3 className="text-lg md:text-xl font-black text-white leading-tight uppercase tracking-tight mb-2">
                  {item.name}
                </h3>

                {/* Request Quote Button (Full Width on Hover) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="mt-2 w-full bg-white text-slate-950 py-2 rounded-lg text-center font-bold text-xs uppercase tracking-widest transition-all group-hover:block"
                >
                  Get Quote
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
