"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Custom Packaging Boxes",
    subTitle: "UK Businesses Actually Love",
    desc: "Premium Custom Boxes with Free UK Delivery, Low MOQ and No Hidden Costs.",
    img: "/hero-box.png",
  },
  // {
  //   id: 2,
  //   title: "Sustainable Solutions",
  //   subTitle: "Eco-Friendly Choice",
  //   desc: "Make an impact with our 100% recyclable, premium sustainable packaging options.",
  //   img: "/sire-prinitng-hero.jpg",
  // },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Agar sirf 1 slide hai toh interval na chalayein
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = slides[current];

  return (
    <section className="relative w-full min-h-[600px] flex overflow-hidden bg-[#ffa015]">
      {/* Bolt Separator */}
      <div
        className="absolute top-0 bottom-0 left-0 w-full bg-[#1a1a1a]"
        style={{ clipPath: "polygon(0 0, 60% 0, 45% 50%, 60% 100%, 0 100%)" }}
      />
      <div className="container mx-auto px-6 md:px-12 py-16 relative z-10 flex items-center h-[600px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] items-center gap-8 w-full">
          {/* Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left text-white overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="leading-[1.1] mb-6">
                  <span className="block text-5xl md:text-6xl font-black uppercase tracking-tighter text-white ">
                    {activeSlide.title}
                  </span>
                  <span className="block text-2xl md:text-4xl font-bold text-[#ffa015] mt-2">
                    {activeSlide.subTitle}
                  </span>
                </h1>

                <div className="w-20 h-1 bg-[#ffa015] mx-auto lg:mx-0 mb-6" />

                <p className="text-lg md:text-xl text-gray-300 font-medium max-w-lg mb-8 leading-relaxed">
                  {activeSlide.desc}
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button className="bg-[#ffa015] text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-[#ffa015] transition-all duration-300">
                    Get A Quote
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-[#1a1a1a] transition-all duration-300">
                    Browse Products
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[750px]"
              >
                <img
                  src={activeSlide.img}
                  alt={activeSlide.title}
                  className="w-full max-h-[700px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
