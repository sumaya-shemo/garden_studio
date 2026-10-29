import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  X,
} from 'lucide-react'
import { styleNames } from '../data/styles'
import { Container } from './Container'
import { Eyebrow, LeafOutline } from './Botanical'
import { Button } from './Button'
import { Reveal } from './Reveal'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const EMPTY_VALUES = {
  name: '',
  email: '',
  location: '',
  style: '',
  scale: '',
  budget: '',
  message: '',
  consent: false,
}

const SCALE_OPTIONS = [
  'Balcony or courtyard',
  'Small garden (under 100 m²)',
  'Medium garden (100–500 m²)',
  'Large garden or acreage',
]

const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000–$15,000',
  '$15,000–$30,000',
  '$30,000+',
  'Not sure yet',
]

export function RequestSection({
  preferredStyle,
  shortlistPlants,
  onRemoveShortlist,
}) {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [showSummary, setShowSummary] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [appliedStyle, setAppliedStyle] = useState(preferredStyle)
  const formRef = useRef(null)
  const summaryRef = useRef(null)
  const successRef = useRef(null)

  // Bring a style chosen in the explorer into the form during render, so the
  // field updates immediately without an extra effect-driven paint.
  if (preferredStyle !== appliedStyle) {
    setAppliedStyle(preferredStyle)
    if (preferredStyle) {
      setValues((current) => ({ ...current, style: preferredStyle.name }))
    }
  }

  useEffect(() => {
    if (showSummary) {
      summaryRef.current?.focus()
    }
  }, [showSummary])

  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus()
    }
  }, [status])

  function validate(current) {
    const nextErrors = {}

    if (current.name.trim().length < 2) {
      nextErrors.name = 'Please tell us your name.'
    }
    if (!EMAIL_PATTERN.test(current.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (current.message.trim().length < 20) {
      nextErrors.message = 'Please share a little more — at least 20 characters.'
    }
    if (!current.consent) {
      nextErrors.consent = 'Please confirm we can contact you about this enquiry.'
    }

    return nextErrors
  }

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
    setShowSummary(false)
  }

  function handleChange(event) {
    const { name, type, value, checked } = event.target
    updateField(name, type === 'checkbox' ? checked : value)
  }

  function focusField(field) {
    formRef.current?.querySelector(`[name="${field}"]`)?.focus()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'sending') return

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setShowSummary(true)
      return
    }

    setShowSummary(false)
    setStatus('sending')

    // Front-end demo: simulate a request without sending data anywhere.
    await new Promise((resolve) => window.setTimeout(resolve, 900))

    const reference = `MM-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`

    setSubmitted({
      ...values,
      reference,
      shortlist: shortlistPlants.map((plant) => plant.name),
    })
    setStatus('success')
  }

  function resetForm() {
    setValues(EMPTY_VALUES)
    setErrors({})
    setShowSummary(false)
    setSubmitted(null)
    setStatus('idle')
    window.setTimeout(() => document.getElementById('name')?.focus(), 60)
  }

  function describedBy(field, hintId) {
    return (
      [errors[field] ? `${field}-error` : null, hintId].filter(Boolean).join(' ') ||
      undefined
    )
  }

  const errorEntries = Object.entries(errors)

  return (
    <section
      id="design"
      aria-labelledby="design-title"
      className="texture-grain relative overflow-hidden bg-forest-deep py-20 sm:py-24 lg:py-28"
    >
      <LeafOutline className="pointer-events-none absolute -top-16 -left-20 h-[26rem] w-64 -rotate-[28deg] text-cream/[0.04] lg:h-[34rem] lg:w-80" />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-sage/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow tone="dark">05 — Start a project</Eyebrow>
              <h2
                id="design-title"
                className="mt-5 max-w-[13ch] text-[2.4rem] leading-[1.03] tracking-[-0.03em] text-cream sm:text-5xl"
              >
                Tell us about your{' '}
                <em className="font-light text-clay-light italic">patch of earth</em>.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/65">
                Share a little about your space and what you're dreaming of.
                We'll reply within two working days with next steps — no
                obligation, no hard sell.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <ol className="mt-8 space-y-4">
                {[
                  'A reply within two working days.',
                  'A 30-minute call about your site, budget and hopes.',
                  'A written proposal with scope, timeline and fee.',
                ].map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-cream/20 text-[0.62rem] font-semibold text-sage">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-cream/60">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 rounded-2xl border border-cream/15 bg-cream/[0.04] p-5">
                <p className="flex items-center gap-2.5 text-xs font-medium text-cream">
                  <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
                  Booking April–June 2027
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">
                  We take on a small number of gardens each season so every
                  project gets proper attention.
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-col gap-3 text-sm">
                <a
                  href="mailto:hello@mossandmeadow.com"
                  className="group inline-flex items-center gap-3 text-cream/70 transition hover:text-cream"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4 text-sage transition group-hover:text-cream"
                  />
                  hello@mossandmeadow.com
                </a>
                <a
                  href="tel:+15035550142"
                  className="group inline-flex items-center gap-3 text-cream/70 transition hover:text-cream"
                >
                  <Phone
                    aria-hidden="true"
                    className="size-4 text-sage transition group-hover:text-cream"
                  />
                  (503) 555-0142
                </a>
                <p className="flex items-start gap-3 text-cream/55">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-sage"
                  />
                  <span>
                    2118 SE Division St, Portland, OR
                    <br />
                    Studio visits by appointment
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="rounded-[2rem] bg-cream p-5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.65)] sm:p-8 lg:p-9">
              {status === 'success' && submitted ? (
                <div ref={successRef} tabIndex={-1} className="focus:outline-none">
                  <span className="flex size-12 items-center justify-center rounded-full bg-sage-light text-forest">
                    <CheckCircle2 aria-hidden="true" className="size-6" />
                  </span>
                  <p className="mt-5 text-[0.65rem] font-semibold tracking-[0.18em] text-clay-deep uppercase">
                    Brief received
                  </p>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-forest sm:text-4xl">
                    Thank you, {submitted.name.trim().split(/\s+/)[0]}.
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">
                    Your garden brief is with us. We'll reply to{' '}
                    <span className="font-medium text-forest">
                      {submitted.email}
                    </span>{' '}
                    within two working days.
                  </p>

                  <dl className="mt-6 grid gap-4 rounded-2xl border border-line/80 bg-white/60 p-5 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-[0.62rem] font-semibold tracking-[0.14em] text-stone uppercase">
                        Reference
                      </dt>
                      <dd className="mt-1 font-medium text-forest">
                        {submitted.reference}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.62rem] font-semibold tracking-[0.14em] text-stone uppercase">
                        Style
                      </dt>
                      <dd className="mt-1 text-forest">
                        {submitted.style || 'Still exploring'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.62rem] font-semibold tracking-[0.14em] text-stone uppercase">
                        Scale
                      </dt>
                      <dd className="mt-1 text-forest">
                        {submitted.scale || 'To be discussed'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.62rem] font-semibold tracking-[0.14em] text-stone uppercase">
                        Shortlist
                      </dt>
                      <dd className="mt-1 text-forest">
                        {submitted.shortlist.length > 0
                          ? submitted.shortlist.join(', ')
                          : 'None yet'}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button onClick={resetForm}>Send another brief</Button>
                    <a
                      href="#plants"
                      className="text-sm font-medium text-forest underline decoration-line underline-offset-4 transition hover:decoration-forest"
                    >
                      Back to the plant finder
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-moss uppercase">
                        Design brief
                      </p>
                      <h3 className="mt-2 font-display text-2xl text-forest sm:text-[1.7rem]">
                        A few details to begin.
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-3 py-1.5 text-[0.65rem] text-stone">
                      <Clock aria-hidden="true" className="size-3.5 text-clay" />
                      Takes about 3 minutes
                    </span>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-7"
                  >
                    {showSummary && errorEntries.length > 0 ? (
                      <div
                        ref={summaryRef}
                        tabIndex={-1}
                        role="alert"
                        className="mb-6 rounded-xl border border-clay-deep/25 bg-clay/[0.06] p-4 focus:outline-none"
                      >
                        <h4 className="text-sm font-semibold text-clay-deep">
                          A few things need your attention
                        </h4>
                        <ul className="mt-2 space-y-1.5">
                          {errorEntries.map(([field, message]) => (
                            <li key={field}>
                              <button
                                type="button"
                                onClick={() => focusField(field)}
                                className="text-left text-xs text-clay-deep underline decoration-clay-deep/40 underline-offset-2 hover:decoration-clay-deep"
                              >
                                {message}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Full name"
                        htmlFor="name"
                        error={errors.name}
                        required
                      >
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={describedBy('name')}
                          className="field-input"
                          placeholder="Ava Morgan"
                          required
                        />
                      </Field>

                      <Field
                        label="Email"
                        htmlFor="email"
                        error={errors.email}
                        required
                      >
                        <input
                          id="email"
                          name="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={describedBy('email')}
                          className="field-input"
                          placeholder="you@example.com"
                          required
                        />
                      </Field>

                      <Field
                        label="Garden location"
                        htmlFor="location"
                        hint="Neighbourhood, city or postcode."
                      >
                        <input
                          id="location"
                          name="location"
                          type="text"
                          autoComplete="address-level2"
                          value={values.location}
                          onChange={handleChange}
                          aria-describedby={describedBy('location', 'location-hint')}
                          className="field-input"
                          placeholder="Sellwood, Portland"
                        />
                      </Field>

                      <Field label="Garden style" htmlFor="style">
                        <Select
                          id="style"
                          name="style"
                          value={values.style}
                          onChange={handleChange}
                        >
                          <option value="">Not sure yet — help me find it</option>
                          {styleNames.map((style) => (
                            <option key={style} value={style}>
                              {style}
                            </option>
                          ))}
                        </Select>
                      </Field>

                      <Field label="Project scale" htmlFor="scale">
                        <Select
                          id="scale"
                          name="scale"
                          value={values.scale}
                          onChange={handleChange}
                        >
                          <option value="">Select a scale</option>
                          {SCALE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      </Field>

                      <Field label="Budget range" htmlFor="budget">
                        <Select
                          id="budget"
                          name="budget"
                          value={values.budget}
                          onChange={handleChange}
                        >
                          <option value="">Select a range</option>
                          {BUDGET_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      </Field>
                    </div>

                    {shortlistPlants.length > 0 ? (
                      <div className="mt-5 rounded-xl border border-sage/70 bg-sage-light/45 p-3.5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-moss uppercase">
                              From your shortlist
                            </p>
                            <p className="mt-1 text-xs text-stone">
                              We'll treat these as inspiration, not a shopping list.
                            </p>
                          </div>
                          <span className="rounded-full bg-cream/80 px-2 py-0.5 text-[0.62rem] font-semibold text-forest">
                            {shortlistPlants.length}
                          </span>
                        </div>
                        <ul className="mt-2.5 flex flex-wrap gap-1.5">
                          {shortlistPlants.map((plant) => (
                            <li key={plant.id}>
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/10 bg-cream/80 py-1 pr-1 pl-2.5 text-[0.68rem] text-forest">
                                {plant.name}
                                <button
                                  type="button"
                                  onClick={() => onRemoveShortlist(plant.id)}
                                  aria-label={`Remove ${plant.name} from your shortlist`}
                                  className="inline-flex size-4 items-center justify-center rounded-full text-stone transition hover:bg-forest/10 hover:text-forest"
                                >
                                  <X aria-hidden="true" className="size-3" />
                                </button>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="mt-5">
                      <Field
                        label="What would you like from your garden?"
                        htmlFor="message"
                        error={errors.message}
                        required
                      >
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          value={values.message}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={describedBy(
                            'message',
                            'message-hint',
                          )}
                          className="field-input resize-y"
                          placeholder="A shady place to read, room for the dog, more bees, less lawn…"
                          required
                        />
                        <span id="message-hint" className="sr-only">
                          Tell us how you want to use the garden and anything
                          that matters to you.
                        </span>
                      </Field>
                    </div>

                    <div className="mt-5">
                      <label
                        htmlFor="consent"
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-line/80 bg-white/45 p-3.5 transition hover:border-line"
                      >
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          checked={values.consent}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={describedBy('consent')}
                          className="mt-0.5 size-4 shrink-0 rounded border-line accent-forest"
                          required
                        />
                        <span className="text-xs leading-relaxed text-stone">
                          I'm happy for Moss &amp; Meadow to contact me about
                          this enquiry. We never share your details.
                          <span className="ml-1 text-clay" aria-hidden="true">
                            *
                          </span>
                        </span>
                      </label>
                      {errors.consent ? (
                        <p
                          id="consent-error"
                          className="mt-1.5 text-xs font-medium text-clay-deep"
                        >
                          {errors.consent}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={status === 'sending'}
                        className="w-full sm:w-auto"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2
                              aria-hidden="true"
                              className="size-4 animate-spin"
                            />
                            Sending your brief…
                          </>
                        ) : (
                          <>
                            Send my garden brief
                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                          </>
                        )}
                      </Button>
                      <p className="text-[0.68rem] leading-relaxed text-stone">
                        <span className="text-clay" aria-hidden="true">
                          *
                        </span>{' '}
                        Required. We reply within two working days.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Field({ label, htmlFor, error, hint, required, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline gap-1.5 text-[0.68rem] font-semibold tracking-[0.12em] text-forest uppercase"
      >
        {label}
        {required ? (
          <span className="text-clay" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-[0.62rem] font-normal tracking-normal text-stone/70 normal-case">
            optional
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-[0.68rem] text-stone">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs font-medium text-clay-deep">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function Select({ id, name, value, onChange, children }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="field-input appearance-none pr-10"
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-stone"
      />
    </div>
  )
}
