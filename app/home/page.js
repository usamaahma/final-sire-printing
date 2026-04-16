import Hero from "@/components/Hero";
import PerksBar from "@/components/PerksBar";
import IntroText from "@/components/IntroText";
import IndustrySection from "@/components/Industry";
import ContentSection from "@/components/ContentSection";
// import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    // <div>abc</div>
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PerksBar />
      <IntroText />
      <IndustrySection />
      <ContentSection/>
      <Testimonials />
    </div>
  );
}
