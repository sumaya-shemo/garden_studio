export const gardenStyles = [
  {
    id: 'cottage',
    number: '01',
    name: 'Cottage',
    tagline: 'Romantic, generous, a little unruly.',
    description:
      'Dense layers of perennials, roses and self-sowers that bloom from the first hellebore to the last aster. A cottage garden is less about rules and more about abundance — every inch working a little harder.',
    image: '/images/style-cottage.webp',
    imageAlt:
      'A deep, flower-filled border at Hidcote Manor in the Cotswolds',
    palette: ['#b5654a', '#d9a7a0', '#77885b', '#f2e8d5'],
    plants: ['Gertrude Jekyll rose', "Lady's mantle", 'Salvia Caradonna', 'Foxglove'],
    bestFor: ['Family gardens', 'Pollinators', 'Loose structure'],
  },
  {
    id: 'contemporary',
    number: '02',
    name: 'Contemporary',
    tagline: 'Bold structure, quiet plants.',
    description:
      'Architectural lines and sculptural planting meet restrained materials. Repeated drifts of perennials and grasses bring movement, while a single tree or water feature holds the space.',
    image: '/images/style-contemporary.webp',
    imageAlt:
      'Sweeping perennial plantings at Lurie Garden in Chicago',
    palette: ['#2f4234', '#7a8a6c', '#c8bda8', '#3e4a4f'],
    plants: ['Molinia Skyracer', 'Echinacea', 'Calamagrostis', 'Multi-stem birch'],
    bestFor: ['New builds', 'Small courtyards', 'Low maintenance'],
  },
  {
    id: 'japanese',
    number: '03',
    name: 'Japanese-inspired',
    tagline: 'Less, but with intention.',
    description:
      'A composed sequence of borrowed views, moss, stone and water. Every element earns its place; pruning and restraint do the work that colour does elsewhere. The result is a garden that slows you down.',
    image: '/images/style-japanese.webp',
    imageAlt:
      'A weathered wooden gate opening into the Okochi Sanso garden in Kyoto',
    palette: ['#25372b', '#5c7159', '#a9b39b', '#6e6250'],
    plants: ['Japanese maple', 'Hakonechloa', 'Moss', 'Azalea'],
    bestFor: ['Calm retreats', 'Shade', 'Small spaces'],
  },
  {
    id: 'mediterranean',
    number: '04',
    name: 'Mediterranean',
    tagline: 'Sun-warmed, drought-wise.',
    description:
      'Gravel, stone and silver-leaved plants that thrive on benign neglect. Fragrant herbs, lavender and olives create a garden that feels like a holiday and asks very little of the hose.',
    image: '/images/style-mediterranean.webp',
    imageAlt:
      'Rows of lavender flowering beneath the Alps in Provence, France',
    palette: ['#8b6c4a', '#b6a98b', '#7f8d6a', '#c9b7d6'],
    plants: ['Lavender', 'Olive', 'Rosemary', 'Cistus'],
    bestFor: ['Hot exposures', 'Low water', 'Slopes'],
  },
  {
    id: 'woodland',
    number: '05',
    name: 'Woodland',
    tagline: 'Shade, texture and slow time.',
    description:
      'A green-on-green world of ferns, hostas and epimedium beneath a canopy of native trees. Paths curve out of sight, and the garden rewards a slower walk — especially in spring.',
    image: '/images/style-woodland.webp',
    imageAlt: 'A carpet of bluebells beneath spring trees in an English wood',
    palette: ['#1e3226', '#4c654b', '#8da184', '#d3ceb8'],
    plants: ['Autumn fern', 'Hosta', 'Epimedium', 'Bluebell'],
    bestFor: ['Shaded plots', 'Wildlife', 'Existing trees'],
  },
]

export const styleNames = gardenStyles.map((style) => style.name)
