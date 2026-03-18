# WatchGuard Product Comparison (React + Vite)

This project is a React + Vite WatchGuard catalogue and quote tool. It presents WatchGuard hardware and subscription options that are available through Leader, links SKU pages back to the Leader partner site, and lets users build a quote cart for PDF export or emailing.

## Local development

```bash
npm install
npm run dev
```

The frontend runs on Vite and the backend runs on Express with a local SQLite database. `npm run dev` starts both.

## Pricing source

There is a single pricing source in the repo:

- The newest root-level file matching `leader_dbp_prices_YYYY-MM-DD.csv`

That CSV is used in two places:

- The backend seed process loads it and writes current SKU prices into `server/products.db`
- The frontend helper in `src/data/productPrices.js` reads the same CSV for shared price formatting and legacy lookup helpers

Price update workflow:

1. Add the new Leader DBP export to the repo root using the same filename pattern.
2. Restart the dev server, or run `node server/seed.js` manually.
3. The backend will reseed automatically if the CSV is newer than the database.

The live catalog UI prices come from the backend API, not from hardcoded frontend price tables.

## Compare specs source

There is now a single compare-spec source for both the frontend UI and the backend API/database seed:

- Canonical source: `src/data/featureSpecs.shared.cjs`
- Frontend wrapper: `src/data/featureSpecs.js`

When compare-spec content changes:

1. Edit `src/data/featureSpecs.shared.cjs`.
2. Restart the backend or run `npm run seed` to regenerate `product_features`.
3. Reload the app.

The compare table UI and the `/api/products/:slug` spec payload now derive from the same definitions and values, so specs are no longer maintained in two places.

## Publish updates (GitHub Pages)

This repo is deployed to GitHub Pages at https://leadermarketing.github.io/WatchGuard/.

Publishing is intentionally simple:

1. Make your code/data changes.
2. Commit and push to the `main` branch.
3. GitHub Actions automatically builds and deploys to `gh-pages`.

Typical update flow:

```bash
git pull
npm ci
npm run dev

git add -A
git commit -m "Update configurator"
git push
```

Then:

- Open GitHub → Actions tab and wait for the “Deploy to GitHub Pages” workflow to finish.
- Hard refresh the site (Ctrl+F5) if your browser caches old assets.

### Optional: build locally (sanity check)

```bash
npm run build
npm run preview
```
