import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Analyzer from "@/components/Analyzer";
import HowItWorks from "@/components/HowItWorks";
import Dimensions from "@/components/Dimensions";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Analyzer />
      <HowItWorks />
      <Dimensions />
      <Pricing />
      <Footer />
    </main>
  );
}
