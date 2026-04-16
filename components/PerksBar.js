"use client";
import React from "react";

const perks = [
  { title: "Free Graphics Support", icon: "🎨" },
  { title: "Eco-Friendly Packaging", icon: "🌱" },
  { title: "Environmental Friendly Ink", icon: "💧" },
  { title: "Short Run Custom Boxes", icon: "📦" },
  { title: "Custom Size & Style", icon: "📐" },
  { title: "Competitive Price", icon: "💰" },
  { title: "Fast Turnaround Time", icon: "⚡" },
  { title: "Free Delivery In USA", icon: "🚚" },
];

export default function PerksBar() {
  // Seamless loop ke liye array ko double kiya
  const doubledPerks = [...perks, ...perks];

  return (
    <section className=" - py-6 overflow-hidden">
      <div className="container mx-auto relative">
        {/* Marquee Container */}
        <div className="flex animate-marquee">
          {doubledPerks.map((perk, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center min-w-[160px] md:min-w-[220px] px-4 group cursor-pointer"
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-3 group-hover:scale-110 group-hover:shadow-md group-hover:border-orange-200 transition-all duration-300">
                <span className="text-2xl">{perk.icon}</span>
              </div>

              {/* Text */}
              <p className="text-[10px] font-black uppercase text-gray-800 leading-tight tracking-tighter whitespace-nowrap">
                {perk.title}
              </p>
            </div>
          ))}
        </div>

        {/* Side Gradients (Optional: for smooth fade effect at edges) */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F2F2F2] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F2F2F2] to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
}
