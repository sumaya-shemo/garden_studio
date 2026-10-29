import { ArrowDown, ArrowRight, Leaf, Sparkles } from 'lucide-react'
import { Container } from './Container'
import { ButtonLink } from './Button'
import { Eyebrow, LeafOutline } from './Botanical'
import { Reveal } from './Reveal'

const stats = [
  { value: '150+', label: 'Residential gardens designed since 2008' },
  { value: '18', label: 'Years of planting, building and learning' },
  { value: '1,200', label: 'Species and cultivars in our studio library' },
]

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(169,184,160,0.32),transparent_52%)]"
    >
      <Container className="relative grid items-center gap-12 pt-12 pb-14 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="relative z-10 lg:col-span-6">
          <Reveal>
            <Eyebrow>Garden design studio · Portland, Oregon</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-6 max-w-[15ch] text-[2.9rem] leading-[1.01] tracking-[-0.035em] text-forest sm:text-[4rem] lg:text-[4.35rem] xl:text-[5rem]"
            >
              A garden should feel like it was{' '}
              <em className="font-light text-clay-deep italic">always</em> there.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-lg text-[1.02rem] leading-relaxed text-stone sm:text-lg">
              We design resilient, deeply personal outdoor spaces — from small
              city courtyards to sweeping meadow gardens. Rooted in ecology,
              made for the way you actually live.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#design" size="lg">
                Start your garden
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </ButtonLink>
              <ButtonLink href="#styles" variant="secondary" size="lg">
                Explore garden styles
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-8 flex items-center gap-2.5 text-xs text-stone">
              <Sparkles aria-hidden="true" className="size-3.5 text-clay" />
              Landscape-led, ecology-first, and built to age beautifully.
            </p>
          </Reveal>
        </div>

        <Reveal delay={180} className="relative lg:col-span-6">
          <LeafOutline className="absolute -top-10 right-4 hidden h-44 w-32 rotate-[18deg] text-forest/[0.09] sm:block lg:-top-14 lg:-right-6 lg:h-56 lg:w-40" />

          <figure className="relative overflow-hidden rounded-t-[8rem] rounded-b-[1.75rem] bg-sage-light shadow-[0_35px_80px_-45px_rgba(18,36,27,0.55)] sm:rounded-t-[11rem]">
            <img
              src="/images/hero.webp"
              alt="Layered summer planting in the Long Border at Great Dixter, England"
              width="1800"
              height="1200"
              fetchPriority="high"
              className="h-[430px] w-full object-cover sm:h-[540px] lg:h-[620px]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-forest-deep/5 to-transparent"
              aria-hidden="true"
            />
            <figcaption className="absolute right-4 bottom-4 left-4 sm:right-5 sm:bottom-5 sm:left-5">
              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-cream/95 px-4 py-3.5 shadow-lg backdrop-blur-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-light text-forest">
                  <Leaf aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-moss uppercase">
                    A garden we return to
                  </p>
                  <p className="mt-0.5 font-display text-base leading-tight text-forest">
                    The Long Border, Great Dixter
                  </p>
                </div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </Container>

      <div className="border-y border-line/80 bg-cream/60">
        <Container>
          <dl className="grid grid-cols-1 divide-y divide-line/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col-reverse gap-1 py-6 sm:px-7 sm:py-7 sm:first:pl-0 sm:last:pr-0"
              >
                <dt className="max-w-[26ch] text-xs leading-relaxed text-stone">
                  {stat.label}
                </dt>
                <dd className="font-display text-3xl leading-none text-forest sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  )
}
