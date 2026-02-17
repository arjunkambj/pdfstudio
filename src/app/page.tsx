import CTASection from "@/components/landing/CTASection";

import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";

import Navbar from "@/components/landing/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
