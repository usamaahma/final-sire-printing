"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation(); // Animation control karne ke liye hook

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews([...data.reviews, ...data.reviews]);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  // Animation shuru karne ka function
  const startAnimation = () => {
    controls.start({
      y: [0, -1200],
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      },
    });
  };

  useEffect(() => {
    if (!loading) {
      startAnimation();
    }
  }, [loading]);

  return (
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden font-sans">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side */}
          <div className="lg:w-1/2 z-10 bg-[#0a0a0a]">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-500 w-3 h-3 rounded-full animate-ping"></span>
              <span className="text-orange-500 font-black uppercase tracking-widest text-sm text-shadow-glow">
                Live Google Reviews
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Trusted by <br />
              <span className="text-orange-500">Industry Leaders</span>
            </h2>

            <p className="text-slate-400 mt-6 text-lg max-w-md italic">
              Sire Printing has maintained a stellar reputation on Google. Real
              reviews from real clients.
            </p>

            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJobCe2YFFwokRytFCw4neoUc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-8 py-4 border-2 border-orange-500 text-orange-500 font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all rounded-full text-sm"
            >
              View All on Google
            </a>
          </div>

          {/* Right Side: Vertical Carousel */}
          <div className="lg:w-1/2 w-full h-[600px] relative overflow-hidden mask-fade">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <motion.div
                className="flex flex-col gap-4"
                animate={controls} // Hook se control ho raha hai
                onMouseEnter={() => controls.stop()} // Mouse aane par stop
                onMouseLeave={() => startAnimation()} // Mouse hatne par restart
              >
                {reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="bg-[#111] border border-white/5 p-6 rounded-2xl hover:border-orange-500/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {rev.user?.thumbnail ? (
                        <img
                          src={rev.user.thumbnail}
                          alt={rev.user.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full border border-orange-500/20 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xs">
                          {rev.user?.name?.charAt(0) || "G"}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-bold truncate w-32">
                          {rev.user?.name || "Google User"}
                        </h4>
                        <div className="flex text-orange-500 text-[10px]">
                          {"★".repeat(Math.round(rev.rating || 5))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs italic leading-relaxed">
                      "
                      {rev.snippet ||
                        "Excellent service, highly professional work!"}
                      "
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Overlay for Smooth Fading */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-20"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-fade {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}
