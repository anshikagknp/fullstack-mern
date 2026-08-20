# myFirstApp — React Learning Project

A collection of small React demos, each covering one concept, built while learning React with Vite.

## Tech Stack

- React 19
- React Router DOM
- Vite

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## How It's Organized

Each topic lives in its own numbered file inside `src/`. Only one component is active at a time in `App.jsx` — uncomment the one you want to try and comment out the rest.

| File | Topic |
|---|---|
| `01-BasicHeading.jsx` | Basic JSX / component |
| `02-FragmentDemo.jsx` | Fragments |
| `03-JsxExpressions.jsx` | JSX expressions |
| `04-InlineStyling.jsx` | Inline styling |
| `05-EventHandling.jsx` | Event handling |
| `06-ConditionalRendering.jsx` | Conditional rendering |
| `07-ListAndTernary.jsx` | Lists & ternary operators |
| `08-ProductTable.jsx` | Rendering a table from data |
| `09-ChildrenProps.jsx` | `children` prop |
| `10-ProductCards.jsx` | Reusable card components |
| `11-RoutingDemo.jsx` | React Router basics |
| `12-ShowDetails.jsx` | Route params |
| `13-UseStateCounter.jsx` | `useState` |
| `14-ProductLoader.jsx` | Fetching data |
| `15-FormHandling.jsx` | Form handling |
| `16-UseEffectDemo.jsx` | `useEffect` |
| `17-PropsDrilling.jsx` | Props drilling |
| `18-ContextDemo.jsx` | Context API |

`Contexts/AppContext.jsx` holds a shared context provider used across the app.

## Available Scripts

- `npm run dev` — start the dev server
- `npm run build` — build for production
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build locally