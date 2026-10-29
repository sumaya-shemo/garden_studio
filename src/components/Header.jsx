import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { Container } from './Container'
import { Logo } from './Logo'
import { ButtonLink } from './Button'

const NAV_LINKS = [
  { id: 'styles', label: 'Garden styles' },
  { id: 'plants', label: 'Plant finder' },
  { id: 'process', label: 'Our process' },
  { id: 'studio', label: 'Studio' },
]

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef(null)
  const menuRef = useRef(null)
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const focusTimer = window.setTimeout(() => {
      menuRef.current?.querySelector('a')?.focus({ preventScroll: true })
    }, 60)

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    const closeOnDesktop = window.matchMedia('(min-width: 768px)')
    const handleBreakpoint = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    closeOnDesktop.addEventListener('change', handleBreakpoint)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      closeOnDesktop.removeEventListener('change', handleBreakpoint)
    }
  }, [menuOpen])

  return (
    <>
      <aside aria-label="Studio announcement" className="bg-forest text-cream">
        <Container className="flex h-9 items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-[0.66rem] font-medium tracking-[0.08em] uppercase sm:text-[0.7rem]">
            <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
            <span>Spring 2027 design books are open</span>
            <span className="hidden text-cream/60 sm:inline">· Portland, Oregon</span>
          </p>
          <a
            href="#design"
            className="group hidden items-center gap-1.5 text-[0.68rem] font-medium tracking-wide text-cream/80 transition hover:text-cream sm:inline-flex"
          >
            Book a discovery call
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Container>
      </aside>

      <header
        data-scrolled={scrolled}
        className="sticky top-0 z-50 border-b border-transparent bg-cream/85 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 data-[scrolled=true]:border-line/70 data-[scrolled=true]:bg-cream/95 data-[scrolled=true]:shadow-[0_12px_40px_-28px_rgba(18,36,27,0.35)]"
      >
        <Container className="flex h-20 items-center justify-between gap-6">
          <a
            href="#top"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <Logo />
            <span className="sr-only">— back to top</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-active={activeSection === link.id}
                aria-current={activeSection === link.id ? 'location' : undefined}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <ButtonLink href="#design" size="md">
              Start a design
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </ButtonLink>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-full border border-forest/15 text-forest transition hover:bg-forest/5 md:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </Container>

        {menuOpen ? (
          <div
            id="mobile-menu"
            ref={menuRef}
            className="animate-menu absolute inset-x-0 top-full max-h-[calc(100dvh-7.25rem)] overflow-y-auto border-t border-line/80 bg-cream shadow-[0_30px_60px_-30px_rgba(18,36,27,0.4)] md:hidden"
          >
            <Container className="flex flex-col py-6">
              <nav aria-label="Mobile" className="flex flex-col">
                {NAV_LINKS.map((link, index) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between border-b border-line/70 py-5 transition-colors hover:text-clay-deep"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-stone/70">
                        0{index + 1}
                      </span>
                      <span className="font-display text-3xl tracking-[-0.02em]">
                        {link.label}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-5 text-stone transition-transform duration-300 group-hover:translate-x-1 group-hover:text-clay-deep"
                    />
                  </a>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-4">
                <ButtonLink
                  href="#design"
                  size="lg"
                  onClick={() => setMenuOpen(false)}
                  className="w-full"
                >
                  Start your garden
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>
                <p className="text-center text-xs text-stone">
                  Or write to{' '}
                  <a
                    href="mailto:hello@mossandmeadow.com"
                    className="font-medium text-forest underline decoration-line underline-offset-4 hover:decoration-forest"
                  >
                    hello@mossandmeadow.com
                  </a>
                </p>
              </div>
            </Container>
          </div>
        ) : null}
      </header>
    </>
  )
}
