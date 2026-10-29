import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BookmarkCheck,
  Check,
  Droplets,
  Flower2,
  Leaf,
  Plus,
  Ruler,
  Search,
  Sun,
  X,
} from 'lucide-react'
import { plantCategories, plants } from '../data/plants'
import { Container } from './Container'
import { SectionHeading } from './Botanical'
import { Reveal } from './Reveal'
import { Button } from './Button'
import { cx } from '../lib/cx'

export function PlantsSection({
  shortlist,
  onToggleShortlist,
  onClearShortlist,
  onSendShortlist,
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All plants')

  const filteredPlants = useMemo(() => {
    const search = query.trim().toLowerCase()

    return plants.filter((plant) => {
      const matchesCategory =
        category === 'All plants' || plant.category === category
      if (!matchesCategory) return false
      if (!search) return true

      return [
        plant.name,
        plant.botanical,
        plant.type,
        plant.light,
        plant.water,
        plant.season,
        ...plant.tags,
      ]
        .join(' ')
        .toLowerCase()
        .includes(search)
    })
  }, [query, category])

  const shortlistedPlants = plants.filter((plant) => shortlist.includes(plant.id))
  const hasFilters = query.trim().length > 0 || category !== 'All plants'

  function resetFilters() {
    setQuery('')
    setCategory('All plants')
  }

  return (
    <section
      id="plants"
      aria-labelledby="plants-title"
      className="bg-cream py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="plants-title"
            eyebrow="02 — Plant finder"
            title="Plants with a purpose."
            description="A working selection from our studio palette — chosen for resilience, wildlife and the way they hold each other up. Save the ones you love and send them with your brief."
            descriptionClassName="max-w-lg"
          />
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-white/45 p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="plant-search" className="sr-only">
                Search plants
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-stone/70"
              />
              <input
                id="plant-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, light or trait…"
                className="field-input pr-10 pl-10"
                autoComplete="off"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-stone transition hover:bg-forest/5 hover:text-forest"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              ) : null}
            </div>

            <div
              className="flex flex-wrap items-center gap-1.5"
              role="group"
              aria-label="Filter plants by type"
            >
              {plantCategories.map((item) => {
                const count =
                  item === 'All plants'
                    ? plants.length
                    : plants.filter((plant) => plant.category === item).length

                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                    className={cx(
                      'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition duration-200',
                      category === item
                        ? 'border-forest bg-forest text-cream'
                        : 'border-transparent text-stone hover:border-line hover:bg-white/70 hover:text-forest',
                    )}
                  >
                    {item}
                    <span
                      className={cx(
                        'text-[0.62rem]',
                        category === item ? 'text-cream/60' : 'text-stone/55',
                      )}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className="text-xs text-stone">
            <span className="font-semibold text-forest">
              {filteredPlants.length}
            </span>{' '}
            {filteredPlants.length === 1 ? 'plant' : 'plants'} showing
          </p>
          <div className="flex items-center gap-3">
            <p aria-live="polite" className="flex items-center gap-2 text-xs text-stone">
              <BookmarkCheck aria-hidden="true" className="size-3.5 text-clay" />
              {shortlist.length === 0
                ? 'Your shortlist is empty'
                : `${shortlist.length} ${shortlist.length === 1 ? 'plant' : 'plants'} shortlisted`}
            </p>
          </div>
        </div>

        {shortlistedPlants.length > 0 ? (
          <div className="animate-fade mt-4 flex flex-col gap-4 rounded-2xl border border-forest/15 bg-sage-light/55 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden="true">
                {shortlistedPlants.slice(0, 3).map((plant) => (
                  <img
                    key={plant.id}
                    src={plant.image}
                    alt=""
                    className="size-9 rounded-full border-2 border-cream object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-forest">
                  {shortlistedPlants.length === 1
                    ? shortlistedPlants[0].name
                    : `${shortlistedPlants.length} plants saved`}
                </p>
                <p className="text-xs text-stone">
                  We'll treat them as a starting point, not a shopping list.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={onSendShortlist}>
                Use in my brief
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Button>
              <Button size="sm" variant="quiet" onClick={onClearShortlist}>
                Clear
              </Button>
            </div>
          </div>
        ) : null}

        {filteredPlants.length > 0 ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {filteredPlants.map((plant, index) => (
              <Reveal as="li" key={plant.id} delay={Math.min(index, 5) * 45}>
                <PlantCard
                  plant={plant}
                  selected={shortlist.includes(plant.id)}
                  onToggle={() => onToggleShortlist(plant.id)}
                />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white/40 px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-sage-light text-forest">
              <Leaf aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-5 font-display text-2xl text-forest">
              Nothing in this patch — yet.
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone">
              Try a broader search, or reset the filters to see the full studio
              palette.
            </p>
            <Button variant="secondary" className="mt-6" onClick={resetFilters}>
              Reset filters
            </Button>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-stone">
          {hasFilters
            ? 'Tip: search “shade”, “summer” or “fragrant” to narrow the palette.'
            : 'A small selection from a much larger studio plant library.'}
        </p>
      </Container>
    </section>
  )
}

function PlantCard({ plant, selected, onToggle }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line/70 bg-white/55 shadow-[0_16px_40px_-34px_rgba(18,36,27,0.5)] transition duration-300 hover:-translate-y-1 hover:border-line hover:bg-white/80 hover:shadow-[0_24px_50px_-30px_rgba(18,36,27,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-sage-light">
        <img
          src={plant.image}
          alt={plant.imageAlt}
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-forest-deep/30 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute top-3 left-3 rounded-full border border-white/30 bg-cream/90 px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.12em] text-forest uppercase backdrop-blur-sm">
          {plant.type}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selected}
          aria-label={
            selected
              ? `Remove ${plant.name} from your shortlist`
              : `Add ${plant.name} to your shortlist`
          }
          title={selected ? 'Remove from shortlist' : 'Add to shortlist'}
          className={cx(
            'absolute top-2.5 right-2.5 inline-flex size-9 items-center justify-center rounded-full border shadow-sm backdrop-blur transition duration-200 hover:scale-105',
            selected
              ? 'border-forest bg-forest text-cream'
              : 'border-white/50 bg-cream/90 text-forest hover:bg-white',
          )}
        >
          {selected ? (
            <Check aria-hidden="true" className="size-4" />
          ) : (
            <Plus aria-hidden="true" className="size-4" />
          )}
        </button>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-forest-deep/55 px-2.5 py-1 text-[0.62rem] font-medium text-cream backdrop-blur-sm">
          <Ruler aria-hidden="true" className="size-3" />
          {plant.height}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.015em] text-forest">
          {plant.name}
        </h3>
        <p className="mt-0.5 text-xs text-stone italic">{plant.botanical}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone">
          {plant.note}
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line/60 pt-4 text-[0.7rem] text-moss">
          <li className="flex items-center gap-1.5">
            <Sun aria-hidden="true" className="size-3.5 text-clay" />
            {plant.light}
          </li>
          <li className="flex items-center gap-1.5">
            <Droplets aria-hidden="true" className="size-3.5 text-moss" />
            {plant.water}
          </li>
          <li className="flex items-center gap-1.5">
            <Flower2 aria-hidden="true" className="size-3.5 text-moss" />
            {plant.season}
          </li>
        </ul>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {plant.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sage-light/65 px-2.5 py-1 text-[0.62rem] font-medium text-forest/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
