import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { gardenStyles } from '../data/styles'
import { Container } from './Container'
import { Eyebrow, LeafSprig, SectionHeading } from './Botanical'
import { Reveal } from './Reveal'
import { Dialog } from './Dialog'
import { Button } from './Button'

export function StylesSection({ onUseStyle }) {
  const [activeId, setActiveId] = useState(null)
  const activeStyle = gardenStyles.find((style) => style.id === activeId) ?? null

  return (
    <section
      id="styles"
      aria-labelledby="styles-title"
      className="relative border-y border-line/60 bg-cream-deep py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="styles-title"
            eyebrow="01 — Garden styles"
            title="Find the language of your garden."
            description="Five ways of thinking about planting, structure and the way a garden asks to be lived in. Start with a feeling, not a plant list."
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {gardenStyles.map((style, index) => (
            <Reveal
              as="li"
              key={style.id}
              delay={index * 60}
              className={
                index < 2
                  ? 'sm:col-span-1 lg:col-span-3'
                  : index === 2
                    ? 'sm:col-span-2 lg:col-span-2'
                    : 'lg:col-span-2'
              }
            >
              <button
                type="button"
                onClick={() => setActiveId(style.id)}
                aria-haspopup="dialog"
                className={`group relative block w-full overflow-hidden rounded-[1.5rem] text-left shadow-[0_18px_45px_-32px_rgba(18,36,27,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(18,36,27,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  index < 2
                    ? 'h-[430px] sm:h-[380px] lg:h-[410px]'
                    : 'h-[430px] sm:h-[380px] lg:h-[370px]'
                }`}
              >
                <img
                  src={style.image}
                  alt={style.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.045]"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/35 to-forest-deep/10"
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-0 bg-forest-deep/10 transition duration-300 group-hover:bg-forest-deep/0"
                  aria-hidden="true"
                />

                <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-forest-deep/25 px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.18em] text-cream/90 uppercase backdrop-blur-sm">
                  <span aria-hidden="true">{style.number}</span>
                  <span className="h-2.5 w-px bg-cream/30" aria-hidden="true" />
                  Style
                </span>

                <span className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
                  <span className="min-w-0">
                    <span className="block font-display text-3xl tracking-[-0.02em] text-cream sm:text-[2rem]">
                      {style.name}
                    </span>
                    <span className="mt-1.5 block max-w-[30ch] text-sm leading-snug text-cream/75">
                      {style.tagline}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.16em] text-cream/85 uppercase">
                      Explore this style
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                  <span className="mb-0.5 flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/30 bg-cream/10 text-cream backdrop-blur-sm transition duration-300 group-hover:border-cream/60 group-hover:bg-cream group-hover:text-forest">
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:-rotate-45"
                    />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line/80 pt-6 sm:flex-row sm:items-center">
          <p className="flex items-center gap-3 text-sm text-stone">
            <LeafSprig className="h-8 w-6 text-moss" />
            Every style is adapted to your soil, light and how you want to live outside.
          </p>
          <a
            href="#plants"
            className="group inline-flex items-center gap-2 text-sm font-medium text-forest underline decoration-line underline-offset-4 transition hover:decoration-forest"
          >
            Meet the plants behind them
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </Container>

      <StyleDialog
        style={activeStyle}
        onClose={() => setActiveId(null)}
        onUseStyle={onUseStyle}
      />
    </section>
  )
}

function StyleDialog({ style, onClose, onUseStyle }) {
  return (
    <Dialog
      open={Boolean(style)}
      onClose={onClose}
      titleId="style-dialog-title"
      className="max-w-3xl"
    >
      {style ? (
        <div>
          <div className="relative">
            <img
              src={style.image}
              alt={style.imageAlt}
              className="h-52 w-full object-cover sm:h-64"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/25 to-forest-deep/5"
              aria-hidden="true"
            />
            <div className="absolute right-6 bottom-5 left-6">
              <Eyebrow tone="dark">Style {style.number}</Eyebrow>
              <h2
                id="style-dialog-title"
                className="mt-2 font-display text-3xl leading-tight tracking-[-0.02em] text-cream sm:text-4xl"
              >
                {style.name} garden
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-[0.95rem] leading-relaxed text-stone">
              {style.description}
            </p>

            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              <div>
                <h3 className="text-[0.65rem] font-semibold tracking-[0.18em] text-moss uppercase">
                  Signature plants
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {style.plants.map((plant) => (
                    <li
                      key={plant}
                      className="rounded-full border border-line bg-white/60 px-3 py-1.5 text-xs text-forest"
                    >
                      {plant}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[0.65rem] font-semibold tracking-[0.18em] text-moss uppercase">
                  Works well for
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {style.bestFor.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-forest/10 bg-sage-light/70 px-3 py-1.5 text-xs text-forest"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="text-[0.65rem] font-semibold tracking-[0.18em] text-moss uppercase">
                Suggested palette
              </h3>
              <ul className="mt-3 flex flex-wrap gap-4" aria-label="Suggested colour palette">
                {style.palette.map((colour) => (
                  <li key={colour} className="flex items-center gap-2">
                    <span
                      className="size-7 rounded-full border border-forest/10"
                      style={{ backgroundColor: colour }}
                      aria-hidden="true"
                    />
                    <span className="text-[0.68rem] tracking-wide text-stone uppercase">
                      {colour}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button
                onClick={() => {
                  onClose()
                  onUseStyle(style.name)
                }}
              >
                Design in this style
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Button>
              <p className="max-w-[30ch] text-xs leading-relaxed text-stone">
                We'll use it as a starting point — never a template.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </Dialog>
  )
}
