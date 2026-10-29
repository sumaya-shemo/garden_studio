# Moss & Meadow

A responsive website for a fictional Portland, Oregon garden design studio. Visitors can explore five garden styles, search a shortlistable plant library, read about the studio's process, and send a design brief.

Built with **React 19**, **Vite 8**, and **Tailwind CSS v4**.

## Quick start

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm run build`   | Create a production build in `dist/`     |
| `npm run preview` | Serve the production build locally       |
| `npm run lint`    | Run Oxlint over the project              |

## Features

- **Editorial landing page** with a hand-set type pairing, botanical palette, and locally hosted photography.
- **Garden style explorer** — five styles presented as accessible dialog cards with planting notes and a "use this style" handoff into the design brief.
- **Plant finder** — search by name or botanical name, filter by category, and build a shortlist that carries into the enquiry form.
- **Design brief form** — client-side validation with an error summary, focus management, a simulated sending state, and a confirmation view with a reference number.
- **Process and studio sections** with scroll-reveal motion that respects `prefers-reduced-motion`.
- **Sticky header** with scroll-spy navigation and a full mobile menu.
- **Newsletter signup** with validation and an inline status message.
- **Photography credits dialog** listing every image, creator, and license.

## Demo behaviour

This is a front-end demo with **no backend**. The design brief and newsletter forms validate and simulate a short delay, but no data is transmitted or stored. The generated reference number is for presentation only.

To connect them to a real service, replace the simulated timeout in `src/components/RequestSection.jsx` (`handleSubmit`) and the newsletter handler in `src/components/Footer.jsx` with a `fetch` call to your endpoint, then surface the server response in the existing status states.

## Project structure

```text
garden-studio/
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ images/                  # 16 optimized WebP photographs
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx            # Sticky navigation + mobile menu
│  │  ├─ Hero.jsx
│  │  ├─ StylesSection.jsx     # Style cards + detail dialog
│  │  ├─ PlantsSection.jsx     # Search, filters, shortlist + plant cards
│  │  ├─ ProcessSection.jsx
│  │  ├─ StudioSection.jsx
│  │  ├─ RequestSection.jsx    # Design brief form + success state
│  │  ├─ Footer.jsx            # Newsletter + photography credits
│  │  ├─ Dialog.jsx            # Reusable accessible modal
│  │  └─ ...                   # Button, Container, Reveal, Botanical, Logo
│  ├─ data/
│  │  ├─ styles.js             # Garden style content
│  │  ├─ plants.js             # Plant library
│  │  └─ credits.json          # Per-image attribution
│  ├─ hooks/useActiveSection.js
│  ├─ lib/cx.js
│  ├─ App.jsx                  # Shortlist + preferred-style state
│  ├─ index.css                # Tailwind theme, base styles, motion
│  └─ main.jsx
├─ index.html
├─ vite.config.js
└─ package.json
```

## Accessibility

- Skip link, semantic landmarks, and a logical heading order.
- Dialogs trap focus, close on Escape, lock background scrolling, and restore focus to the trigger.
- Form fields have visible labels, hints, and associated error messages; failed submissions move focus to an error summary.
- Shortlist changes and result counts are announced with polite live regions.
- Visible focus rings, keyboard-operable controls, and reduced-motion fallbacks.

## Photography and licensing

All 16 photographs are hosted locally in `public/images/` and were sourced from Wikimedia Commons. They are used under **CC0**, **CC BY 2.0**, **CC BY 3.0**, **CC BY-SA 2.0**, **CC BY-SA 3.0**, or **CC BY-SA 4.0** as recorded per image in [`src/data/credits.json`](src/data/credits.json). The same attribution is available in the site footer under **Photography credits**.

If you reuse or redistribute the photographs, preserve the creator, source, and license details and comply with each license — in particular, the share-alike terms of the CC BY-SA images.

Other assets:

- **Fraunces** and **Inter** fonts, served locally through Fontsource, under the SIL Open Font License 1.1.
- **Lucide** icons via `lucide-react`, under the ISC License.

## Deployment

`npm run build` outputs a static site to `dist/`. Deploy it to any static host at a domain root. Image paths are absolute (`/images/...`), so deploying under a subdirectory requires setting `base` in `vite.config.js` and updating those paths accordingly.
