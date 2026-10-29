import { ArrowUpRight, Check, Quote } from 'lucide-react'
import { Container } from './Container'
import { SectionHeading } from './Botanical'
import { Reveal } from './Reveal'

const promises = [
  {
    title: 'A garden you can maintain',
    description: 'Planting that gets better with the time you actually have.',
  },
  {
    title: 'A plan rooted in ecology',
    description: 'Right plant, right place — more habitat and far fewer inputs.',
  },
  {
    title: 'One team, sketch to soil',
    description: 'Design, growing and installation under one small roof.',
  },
]

export function StudioSection() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-title"
      className="relative overflow-hidden bg-cream py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative h-full min-h-[420px] sm:min-h-[520px] lg:min-h-full">
              <div
                className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-[2rem] border border-forest/15 sm:block"
                aria-hidden="true"
              />
              <figure className="relative h-full overflow-hidden rounded-[2rem] bg-sage-light">
                <img
                  src="/images/about.webp"
                  alt="A small glasshouse with grapevines escaping through the open roof"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep/65 via-forest-deep/5 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute right-5 bottom-5 left-5 flex items-center gap-3 text-cream">
                  <span className="h-px w-8 bg-cream/50" aria-hidden="true" />
                  <span className="text-[0.65rem] font-medium tracking-[0.14em] uppercase">
                    Our nursery, late May
                  </span>
                </figcaption>
              </figure>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:py-4">
            <Reveal delay={80}>
              <SectionHeading
                id="studio-title"
                eyebrow="04 — The studio"
                title={
                  <>
                    Rooted here. Designed for{' '}
                    <em className="font-light text-clay-deep italic">
                      how you live
                    </em>
                    .
                  </>
                }
                className="lg:flex-col lg:items-start lg:gap-5"
                titleClassName="max-w-[15ch]"
              />
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-6 max-w-xl space-y-4 text-[0.97rem] leading-relaxed text-stone">
                <p>
                  Moss &amp; Meadow is a small Portland studio of designers,
                  growers and one very opinionated border collie. We believe good
                  gardens are made in conversation — with the land, with the
                  weather, and with the people who will live in them.
                </p>
                <p>
                  Since 2008 we've made more than 150 gardens across the Pacific
                  Northwest, from twenty-square-metre balconies to five-acre
                  meadows. Every one starts with the same question:{' '}
                  <span className="font-medium text-forest">
                    what does this place want to be?
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {promises.map((promise) => (
                  <li key={promise.title}>
                    <span className="flex size-7 items-center justify-center rounded-full bg-sage-light text-forest">
                      <Check aria-hidden="true" className="size-3.5" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-forest">
                      {promise.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone">
                      {promise.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <blockquote className="relative mt-9 rounded-2xl border border-line/80 bg-cream-deep/60 p-5 sm:p-6">
                <Quote
                  aria-hidden="true"
                  className="absolute top-5 right-5 size-7 text-sage"
                />
                <p className="max-w-lg pr-8 font-display text-lg leading-relaxed text-forest italic sm:text-xl">
                  “Elise turned our bare backyard into somewhere we actually
                  live. Two summers on, the garden feels older than the house —
                  in the best way.”
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <span
                    className="flex size-9 items-center justify-center rounded-full bg-forest text-[0.62rem] font-semibold tracking-wide text-cream"
                    aria-hidden="true"
                  >
                    MR
                  </span>
                  <div>
                    <cite className="text-xs font-semibold not-italic text-forest">
                      Maya R.
                    </cite>
                    <p className="text-[0.68rem] text-stone">
                      Sellwood courtyard · planted 2024
                    </p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={300}>
              <a
                href="#design"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest underline decoration-line underline-offset-4 transition hover:decoration-forest"
              >
                Work with the studio
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
