import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import YouShouldKnow from "@/components/YouShouldKnow";
import TradersSection from "@/components/TradersSection";
import WhyChoose from "@/components/WhyChoose";
import WhatYouCanCopy from "@/components/WhatYouCanCopy";
import FAQSection from "@/components/FAQSection";
import TrustSection from "@/components/TrustSection";
import ReadyToInvest from "@/components/ReadyToInvest";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <YouShouldKnow />
      <TradersSection />
      <WhyChoose />
      <WhatYouCanCopy />
      <FAQSection />
      <TrustSection />
      <ReadyToInvest />
      <Footer />
    </main>
  );
}
