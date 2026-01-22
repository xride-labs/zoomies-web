import {
  Navbar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  MarketplaceSection,
  AppStoreSection,
  CommunitySection,
  CTASection,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MarketplaceSection />
      <AppStoreSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </main>
  );
}

