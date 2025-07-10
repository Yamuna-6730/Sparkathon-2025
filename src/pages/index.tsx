import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { ShoppingProvider } from "@/contexts/ShoppingContext";

export default function HomePage() {
  return (
    <ShoppingProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeroSection />
      </div>
    </ShoppingProvider>
  );
}