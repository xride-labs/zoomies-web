import {
  Navbar,
  HeroSection,
  EcosystemSection,
  FeaturesSection,
  InvestSection,
  MarketplaceSection,
  DownloadBanner,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <main className="landing-shell min-h-screen bg-canvas">
      <Navbar />
      <HeroSection />
      <EcosystemSection />
      <FeaturesSection />
      <InvestSection />
      <MarketplaceSection />
      <DownloadBanner />
      <Footer />
    </main>
  )
}
