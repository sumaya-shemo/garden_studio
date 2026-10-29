import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Leaf,
  Mail,
  MapPin,
} from 'lucide-react'
import credits from '../data/credits.json'
import { Container } from './Container'
import { Logo } from './Logo'
import { LeafOutline } from './Botanical'
import { Dialog } from './Dialog'
import { cx } from '../lib/cx'

const EXPLORE_LINKS = [
  { href: '#styles', label: 'Garden styles' },
  { href: '#plants', label: 'Plant finder' },
  { href: '#process', label: 'Our process' },
  { href: '#studio', label: 'The studio' },
]

const STUDIO_LINKS = [
  { href: '#design', label: 'Start a design' },
  { href: '#design', label: 'Book a discovery call' },
  { href: 'mailto:hello@mossandmeadow.com', label: 'hello@mossandmeadow.com' },
]

const COPYRIGHT_YEAR = new Date().getFullYear()

export function Footer() {
  const [creditsOpen, setCreditsOpen] = useState(false)

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-cream">
      <LeafOutline className="pointer-events-none absolute -top-20 -right-16 h-[30rem] w-72 rotate-[18deg] text-cream/[0.04]" />

      <Container className="relative">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8 lg:py-20">
          <div className="md:col-span-4">
            <a
              href="#top"
              className="inline-block rounded-sm"
            >
              <Logo tone="light" />
              <span className="sr-only">— back to top</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              A small Portland garden design studio making resilient, generous
              places for people, plants and wildlife.
            </p>
            <div className="mt-6 space-y-2.5 text-xs">
              <a
                href="mailto:hello@mossandmeadow.com"
                className="inline-flex min-h-6 items-center gap-2.5 text-cream/60 transition hover:text-cream"
              >
                <Mail aria-hidden="true" className="size-3.5 text-sage" />
                hello@mossandmeadow.com
              </a>
              <p className="flex items-start gap-2.5 text-cream/50">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-3.5 shrink-0 text-sage"
                />
                <span>
                  2118 SE Division St
                  <br />
                  Portland, Oregon 97202
                </span>
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4 text-[0.68rem] font-medium tracking-wide">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-6 items-center gap-1 text-cream/55 transition hover:text-cream"
              >
                Instagram
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <span className="h-3 w-px bg-cream/15" aria-hidden="true" />
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-6 items-center gap-1 text-cream/55 transition hover:text-cream"
              >
                Pinterest
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <nav className="md:col-span-2" aria-labelledby="footer-explore">
            <h2
              id="footer-explore"
              className="text-[0.62rem] font-semibold tracking-[0.2em] text-sage uppercase"
            >
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-sm text-cream/60 transition hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-[0.62rem] font-semibold tracking-[0.2em] text-sage uppercase">
              Studio
            </h2>
            <ul className="mt-4 space-y-3">
              {STUDIO_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-sm text-cream/60 transition hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-5">
              <p className="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.18em] text-sage uppercase">
                <Leaf aria-hidden="true" className="size-3.5" />
                The Seasonal Edit
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">
                Four letters a year on planting, weather and gardens worth
                visiting. No noise.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/10 py-6 text-[0.68rem] text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {COPYRIGHT_YEAR} Moss &amp; Meadow Garden Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setCreditsOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex min-h-6 items-center transition hover:text-cream"
            >
              Photography credits
            </button>
            <span className="hidden h-3 w-px bg-cream/15 sm:block" aria-hidden="true" />
            <p>Made in Portland, Oregon</p>
            <span className="hidden h-3 w-px bg-cream/15 sm:block" aria-hidden="true" />
            <a
              href="#top"
              className="group inline-flex min-h-6 items-center gap-1 transition hover:text-cream"
            >
              Back to top
              <ArrowUpRight
                aria-hidden="true"
                className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </Container>

      <CreditsDialog open={creditsOpen} onClose={() => setCreditsOpen(false)} />
    </footer>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = email.trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setSubscribed(true)
    setEmail('')
  }

  if (subscribed) {
    return (
      <p
        role="status"
        className="mt-4 flex items-start gap-2 rounded-xl border border-sage/25 bg-sage/10 px-3.5 py-3 text-xs leading-relaxed text-cream/75"
      >
        <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-sage" />
        You're on the list. Look out for the spring letter.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-4">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address for The Seasonal Edit
      </label>
      <div
        className={cx(
          'flex items-center gap-1 rounded-full border bg-cream/5 p-1 transition focus-within:border-sage/60 focus-within:bg-cream/[0.08]',
          error ? 'border-clay-light/60' : 'border-cream/15',
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (error) setError('')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'newsletter-error' : undefined}
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-base text-cream placeholder:text-cream/55 focus:outline-none sm:text-xs"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-cream px-3.5 py-2 text-[0.68rem] font-semibold text-forest transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Join
          <ArrowRight aria-hidden="true" className="size-3" />
        </button>
      </div>
      {error ? (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-[0.68rem] text-clay-light"
        >
          {error}
        </p>
      ) : (
        <p className="mt-2 text-[0.62rem] text-cream/60">
          Unsubscribe anytime. We never share your address.
        </p>
      )}
    </form>
  )
}

function CreditsDialog({ open, onClose }) {
  const creditList = Object.entries(credits)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      titleId="credits-title"
      className="max-w-2xl"
    >
      <div className="p-6 sm:p-8">
        <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-moss uppercase">
          Colophon
        </p>
        <h2
          id="credits-title"
          className="mt-2 font-display text-3xl tracking-[-0.02em] text-forest"
        >
          Photography credits
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone">
          Thank you to the photographers and archives who share their work
          through Creative Commons. Images have been cropped and optimised for
          this site; licences apply to the original works.
        </p>

        <ul className="mt-6 divide-y divide-line/70 border-t border-line/70">
          {creditList.map(([key, credit]) => (
            <li key={key} className="py-3.5">
              <p className="text-sm font-medium text-forest">{credit.creator}</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-stone">
                {credit.title}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem]">
                <a
                  href={credit.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-forest underline decoration-line underline-offset-2 transition hover:decoration-forest"
                >
                  View photo
                  <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
                {credit.licenseUrl ? (
                  <a
                    href={credit.licenseUrl}
                    target="_blank"
                    rel="license noopener noreferrer"
                    className="text-stone underline decoration-line underline-offset-2 transition hover:text-forest"
                  >
                    {credit.license}
                  </a>
                ) : (
                  <span className="text-stone">{credit.license}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  )
}
