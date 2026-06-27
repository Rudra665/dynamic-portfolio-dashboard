# Portfolio Dashboard — Frontend

Next.js + TypeScript + Tailwind CSS dashboard that displays live portfolio
data, polling the backend every 15 seconds for updated CMP, Present Value,
and Gain/Loss.

---

## Prerequisites

- Node.js 18+
- npm
- The backend running on `http://localhost:3001` (see backend README)

---

## 1. Install dependencies

```bash
cd dynamic-portfolio-dashboard
npm install
```

## 2. Configure environment variables

Create `.env.local` in the project root:

```
API_BASE_URL=http://localhost:3001
```

> Must be prefixed with `NEXT_PUBLIC_` to be accessible in client-side code —
> without it, the dashboard won't be able to reach the backend from the browser.

## 3. Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. The backend must already be
running on port 3001, or the dashboard will show a fetch error on load.

---

## Usage

- The dashboard fetches `/api/refresh` (warms the backend cache) followed by
  `/api/portfolio` (reads the aggregated result) on page load, then repeats
  this every 15 seconds automatically.
- Click **Refresh** in the header to trigger an immediate update outside the
  normal 15s cycle.
- Click any column header in the table to sort by that column; click again
  to reverse direction, a third click clears sorting.
- Click a sector header row to collapse/expand that sector's holdings.
- Use the search box to filter stocks by name or exchange code.
- Click any stock row to open a detail panel with a live CMP chart and full
  stock-level figures (P/E, EPS, Gain/Loss, etc.).

> **Note:** the CMP chart builds its history client-side, starting empty on
> every page load — it is not historical/intraday data from an external
> source. Outside NSE/BSE trading hours (Mon–Fri, 9:15 AM–3:30 PM IST), CMP
> won't change between refreshes, so the chart will show a flat line — this
> is expected market behavior, not a bug.

---

## Folder Structure

```
dynamic-portfolio-dashboard/
├── app/
│   ├── page.tsx                 # Home — assembles the full dashboard page
│   ├── layout.tsx               # RootLayout — Next.js App Router root layout
│   ├── globals.css              # Tailwind v4 @theme tokens (colors, fonts)
│   └── api/
│       └── api.ts               # refreshPrices() / getPortfolio() — backend API client
│
├── components/
│   ├── SummaryCards.tsx          # Total Investment / Present Value / Gain-Loss / Top Performer
│   ├── SectorAllocation.tsx      # Sector breakdown panel with color-coded bars
│   ├── PortfolioTable.tsx        # Main table — sorting, sector grouping/collapse
│   ├── PortfolioRow.tsx          # PortfolioFlashRow — single row, flash-on-change CMP cell
│   ├── GainLossCell.tsx          # Reusable green/red Gain-Loss formatter
│   ├── NumericCell.tsx           # Reusable ₹-formatted numeric cell
│   └── StockDetailModal.tsx      # StockDetailPanel — slide-over detail view + live chart
│
├── customHooks/
│   ├── usePortfolio.ts           # Polling logic — refresh cycle, price history accumulation
│   └── useFlashOnChange.ts       # Detects value changes for the row-flash animation
│
├── lib/
│   ├── types.ts                  # PortfolioRow, SectorSummary, PortfolioResponse
│   ├── sortRows.ts                # Column sort comparator
│   ├── groupBySector.ts           # Groups flat rows into sector buckets with subtotals
│   └── sectorColors.ts            # Single source of truth for sector → color mapping
│
├── .env.local
├── tailwind.config.ts
├── postcss.config.js
└── package.json
```

---

## Key Design Notes

- **`usePortfolio` owns all polling state** — the 15s `setInterval`, cleanup
  on unmount, and accumulated price history for the live chart all live in
  one hook so the rest of the component tree just consumes plain data.
- **Sector color is threaded from a single map** (`lib/sectorColors.ts`) —
  the allocation panel, table sector headers, and detail panel chart line
  all pull from the same function, so the same sector always reads as the
  same color everywhere in the UI.
- **`PortfolioFlashRow` is a separate component, not inline JSX** — this is
  required, not stylistic: React hooks (like `useFlashOnChange`) can only be
  called inside a component, not inside a `.map()` loop over raw `<td>`
  elements.
