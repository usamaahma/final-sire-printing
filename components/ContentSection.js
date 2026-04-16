import React from 'react';

export default function ContentSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block bg-orange-100 text-brand-orange font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
              Premium Quality Since 2010
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
              The Best <span className="text-brand-orange">Custom Packaging</span> <br /> 
              Solution In USA
            </h2>

            <div className="w-20 h-2 bg-brand-orange rounded-full"></div>

            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p>
                At <strong>Sire Printing</strong>, we believe that your product's first impression is its packaging. 
                Whether you are a startup or an established brand, our custom-printed boxes are designed to 
                elevate your market presence.
              </p>
              <p>
                We specialize in <strong>Wholesale Custom Boxes</strong> with high-quality printing, 
                durable materials, and eco-friendly options. From CBD packaging to luxury rigid boxes, 
                our team ensures every detail reflects your brand's excellence.
              </p>
            </div>

            {/* Feature List (Quick Wins) */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                "No Minimum Order",
                "Free 3D Mockup",
                "Wholesale Prices",
                "Fastest Turnaround"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-800 text-sm uppercase">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image with Decorative Elements */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
              <img 
                src="https://oxopackaging.com/assets/images/custom-kraft-brown-takeout-boxes.webp" 
                alt="Sire Printing Workshop" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Background Decorative Boxes (Design Feel) */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-orange/10 rounded-3xl -z-10 rotate-12"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-slate-100 rounded-3xl -z-10 -rotate-6 border border-slate-200"></div>
            
            {/* Stats Badge */}
            <div className="absolute bottom-10 -right-5 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl z-20">
              <div className="text-3xl font-black text-brand-orange">100%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Customer Satisfaction</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}