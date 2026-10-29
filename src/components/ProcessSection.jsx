import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { Container } from './Container'
import { LeafOutline, SectionHeading } from './Botanical'
import { Reveal } from './Reveal'
import { ButtonLink } from './Button'

const steps = [
  {
    number: '01',
    title: 'Walk & listen',
    description:
      'We begin in your garden, not a showroom: soil, light, wind, views, and how you actually want to spend time outside.',
  },
  {
    number: '02',
    title: 'Sketch & test',
    description:
      'Hand sketches, mood boards and simple studies. We test ideas against your budget and the site’s realities before anything is specified.',
  },
  {
    number: '03',
    title: 'Detail & plant',
    description:
      'A full planting plan with climate-ready species, quantities and a seasonal calendar, so the garden has a life beyond day one.',
  },
  {
    number: '04',
    title: 'Build & grow',
    description:
      'We work with trusted local growers and craftspeople, stay through installation, and return as the seasons turn to help it settle.',
  },
]

export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="texture-grain relative overflow-hidden bg-forest py-20 sm:py-24 lg:py-28"
    >
      <LeafOutline className="pointer-events-none absolute -right-16 -bottom-24 h-[28rem] w-72 rotate-[24deg] text-cream/[0.05] sm:-right-8 lg:h-[34rem] lg:w-96" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            id="process-title"
            eyebrow="03 — Our process"
            tone="dark"
            title="From first walk to first spring."
            description="A clear, collaborative path from the spark of an idea to a garden that settles in. We stay involved through the seasons that follow."
            descriptionClassName="text-cream/65"
          />
        </Reveal>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 80}>
              <div className="border-t border-cream/20 pt-6">
                <span className="font-display text-4xl leading-none text-clay-light">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-xl text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col gap-6 border-t border-cream/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <p className="flex items-center gap-2.5 text-xs text-cream/60">
              <Clock aria-hidden="true" className="size-4 text-sage" />
              Most gardens take 10–16 weeks from first walk to planting day.
            </p>
            <p className="flex items-center gap-2.5 text-xs text-cream/60">
              <MapPin aria-hidden="true" className="size-4 text-sage" />
              Portland &amp; the Pacific Northwest, with remote planting plans anywhere.
            </p>
          </div>
          <ButtonLink href="#design" variant="light" className="self-start lg:self-auto">
            Book a discovery call
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}
