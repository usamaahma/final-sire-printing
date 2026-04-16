import React from 'react';

export default function IntroText() {
  return (
    <section className="mt-12 py-2 md:py-2 bg-white">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        
        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
          Get Custom Packaging Boxes <br className="hidden md:block" /> 
          That Help Your <span className="text-[#F4A11D]">Products Sell</span>
        </h2>

        {/* Orange Small Divider */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="w-20 h-1.5 bg-[#F4A11D]"></div>
        </div>

        {/* Description Paragraph */}
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
          Finding the right custom packaging boxes in USA that reflect your brand's identity is essential for success. 
          Sire Printing makes the process effortless and professional. Our packaging experts design and produce 
          custom boxes with logo in USA that highlight your brand's style while ensuring durability and functionality.
        </p>

        {/* Optional: Small Sub-text or secondary pitch */}
        <p className="mt-6 text-sm md:text-base text-slate-400 italic">
          High-quality materials • Fast Turnaround • Free Shipping across USA
        </p>
      </div>
    </section>
  );
}