import { useCallback, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { StylesSection } from './components/StylesSection'
import { PlantsSection } from './components/PlantsSection'
import { ProcessSection } from './components/ProcessSection'
import { StudioSection } from './components/StudioSection'
import { RequestSection } from './components/RequestSection'
import { Footer } from './components/Footer'
import { plants } from './data/plants'

function App() {
  const [shortlist, setShortlist] = useState([])
  const [preferredStyle, setPreferredStyle] = useState(null)

  const shortlistPlants = plants.filter((plant) => shortlist.includes(plant.id))

  const toggleShortlist = useCallback((id) => {
    setShortlist((current) =>
      current.includes(id)
        ? current.filter((plantId) => plantId !== id)
        : [...current, id],
    )
  }, [])

  const removeFromShortlist = useCallback((id) => {
    setShortlist((current) => current.filter((plantId) => plantId !== id))
  }, [])

  const clearShortlist = useCallback(() => setShortlist([]), [])

  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id)
    if (!section) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    section.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [])

  const handleUseStyle = useCallback(
    (styleName) => {
      setPreferredStyle({ name: styleName })
      window.setTimeout(() => scrollToSection('design'), 140)
    },
    [scrollToSection],
  )

  const handleSendShortlist = useCallback(() => {
    scrollToSection('design')
  }, [scrollToSection])

  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-cream"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <StylesSection onUseStyle={handleUseStyle} />
        <PlantsSection
          shortlist={shortlist}
          onToggleShortlist={toggleShortlist}
          onClearShortlist={clearShortlist}
          onSendShortlist={handleSendShortlist}
        />
        <ProcessSection />
        <StudioSection />
        <RequestSection
          preferredStyle={preferredStyle}
          shortlistPlants={shortlistPlants}
          onRemoveShortlist={removeFromShortlist}
        />
      </main>

      <Footer />
    </div>
  )
}

export default App
