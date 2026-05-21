# SWAPI Explorer

A data browser built on top of the [Star Wars API (SWAPI)](https://swapi.dev), using Next.js, React Query, Axios, and Ant Design.

---

## Setup

Requires Node.js v18 or above.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── api/
│   ├── client.ts           
│   ├── people.ts
│   ├── planets.ts
│   └── starships.ts
├── components/
│   ├── DetailDrawer.tsx
│   ├── ErrorDisplay.tsx
│   ├── ErrorDisplay.module.css
│   ├── PeopleTab.tsx
│   ├── PlanetsTab.tsx
│   ├── StarshipsTab.tsx
│   ├── TabContent.tsx
│   └── TabContent.module.css
├── hooks/
│   ├── useDebounce.ts
│   ├── usePeople.ts
│   ├── usePlanets.ts
│   ├── useStarships.ts
│   └── useSwApiCollection.ts
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.module.css
│   └── index.tsx
├── types/
│   ├── api.ts
│   └── swapi.ts
├── utils/
│   └── format.ts
└── styles/
    └── globals.css
```

`index.tsx` owns routing, layout, and all three hook calls — data flows down to tab components as props. `components/` is flat; CSS modules sit next to the component they style. `utils/` holds `formatValue`, shared across all tabs.

---

## Features

### Tabs

Three tabs, each with a searchable, paginated table:

| Tab | Endpoint |
|---|---|
| Planets | `/planets/` |
| People | `/people/` |
| Starships | `/starships/` |

All three hooks run on mount. React Query deduplicates concurrent requests and caches results, so switching tabs shows data instantly with no loading state.

### Search

Debounced search input on each tab, filtering by name. The debounce hook is hand-rolled in `src/hooks/useDebounce.ts` — no third-party debounce library used. Search resets on tab switch (`destroyInactiveTabPane` unmounts inactive tabs).

### Pagination

All records are fetched upfront (~80 total across three endpoints) and filtered and sliced client-side. React Query caches after the first load. Page and search state live in the URL, so refresh and back/forward navigate correctly without extra state management.

### Error Handling

Axios errors are caught by a response interceptor and normalised into a typed `ApiError` shape (`src/types/api.ts`). `ErrorDisplay.tsx` renders the error code, message, and failed endpoint.

### Detail Drawer ✦

Clicking any table row opens an Ant Design `Drawer` showing the full record as a description list.

### Loading Skeletons ✦

Ant Design `Skeleton` replaces table content while data loads. No spinners.

### URL State ✦

Active tab and current page are reflected in the URL query string:

```
/?tab=starships&page=3
```

Refresh and browser back/forward restore position correctly.

---

## Axios Client

`src/api/client.ts` exports a single Axios instance — the only place Axios is imported directly.

- **Request interceptor** — intended to attach `X-App-Version: 1.0.0`; header is commented out because `swapi.info` rejects CORS preflights on custom headers. The interceptor remains in place to show the intent.
- **Response interceptor** — normalises errors into `ApiError` before they reach hooks or components.

---

## Theming

Colors are defined as a `const` in `_app.tsx` and injected as CSS variables via a `<style>` tag. Both Ant Design tokens and CSS modules reference `var(--color-yellow)` — one place to change a color across the whole app.
