import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import AppShowcase from './components/AppShowcase'
import Waitlist from './components/Waitlist'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Features />
      <AppShowcase />
      <Waitlist />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App
