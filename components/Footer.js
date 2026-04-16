import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 mt-auto font-sans">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Brand & About */}
        <div className="space-y-6">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-white italic">Sire</span>
            <span className="text-2xl font-light text-gray-400 italic border-l border-orange-500 pl-2">
              Printing
            </span>
          </div>
          <div className="relative group">
            <input
              type="email"
              placeholder="Subscribe our newsletter"
              className="w-full bg-white text-black py-3 px-4 pr-12 focus:outline-none"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white">
              ✈️
            </button>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Subscribe our newsletter and stay updated with our new products,
            policies and terms.
          </p>
        </div>

        {/* Column 2: Contact Info */}
        <div>
          <h4 className="text-orange-500 font-bold uppercase text-sm mb-6 tracking-wider">
            Get In Touch
          </h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <span>📞</span> (332) 222-4710
            </li>
            <li className="flex items-start gap-3">
              <span>✉️</span> support@sireprinting.com
            </li>
            <li className="flex items-start gap-3">
              <span>📍</span> 626 92nd Street Brooklyn NY 11220
            </li>
            <li className="flex items-start gap-3 text-orange-400">
              <span>🚚</span> 100% Free Shipping all across USA
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="text-orange-500 font-bold uppercase text-sm mb-6 tracking-wider">
            Hot Selling Categories
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-orange-400 cursor-pointer">
              Kraft Paper Boxes
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Custom Retail Packaging
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Cardboard Boxes
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Christmas Boxes
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Custom Display Boxes
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Woven Labels
            </li>
          </ul>
        </div>

        {/* Column 4: Useful Links */}
        <div>
          <h4 className="text-orange-500 font-bold uppercase text-sm mb-6 tracking-wider">
            Useful Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-orange-400 cursor-pointer">About Us</li>
            <li className="hover:text-orange-400 cursor-pointer">Contact Us</li>
            <li className="hover:text-orange-400 cursor-pointer">Portfolio</li>
            <li className="hover:text-orange-400 cursor-pointer">Blogs</li>
            <li className="hover:text-orange-400 cursor-pointer">Sitemap</li>
            <li className="hover:text-orange-400 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Terms And Conditions
            </li>
          </ul>
        </div>
      </div>

      {/* --- COPYRIGHT & BOTTOM BAR --- */}
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
        <p>Copyright © 2011 - 2026 Sire Printing | The Custom Websites</p>
      </div>
    </footer>
  );
}
