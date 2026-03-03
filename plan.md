# WatchGuard BOM Configurator — Project Plan & Reference

> **Persistent context document.** Start every new session by attaching this file so the model has full project context without needing a codebase scan.
>
> **Last updated:** 2026-03-04

---

## 1. What This Project Is

An internal **sales configurator and quoting tool** built for **Leader Systems**, an Australian WatchGuard reseller. It is hosted on GitHub Pages and also intended to be embedded or linked from the Leader Systems partner dealershop at `partner.leadersystems.com.au`.

The tool lets a sales rep or customer:
1. Browse WatchGuard hardware products (Firebox T-Series, M-Series, Wi-Fi Access Points) in a **horizontal column comparison grid**
2. Compare product specs side-by-side
3. Configure a subscription type and licence term per product
4. Build a quote cart with multiple line items
5. Export the quote as a PDF, email it to an Account Manager, or push items directly into the Leader Systems shopping cart

**Live URL (GitHub Pages):** `https://leadermarketing.github.io/WatchGuardBOM/`

**Repo:** `https://github.com/LeaderMarketing/WatchGuardBOM.git`

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + Vite (JSX, CSS Modules) |
| Icons | Phosphor Icons (`@phosphor-icons/react`) |
| PDF generation | jsPDF + jspdf-autotable |
| Backend | Express.js (Node) — local API only, not deployed |
| Database | SQLite via `better-sqlite3` (`server/products.db`) |
| Deployment | GitHub Pages via `gh-pages` npm package |
| Dev tooling | `concurrently` (run frontend + backend together) |

---

## 3. Project Structure

```
WG_latest/
├── server/
│   ├── index.js          # Express API server (port 3001)
│   ├── db.js             # SQLite schema + init
│   ├── seed.js           # Seeds DB from WG Hardware SKUS_full.csv (uses DBP_ex_GST prices)
│   └── products.db       # SQLite DB — gitignored, must seed after clone
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Root component: ProductCatalog + QuoteCartPanel + floating cart btn
│   ├── App.module.css
│   ├── global.css
│   ├── context/
│   │   └── QuoteContext.jsx   # Global quote cart state (useReducer)
│   ├── data/
│   │   ├── cartUtils.js       # Leader Systems AddToCart API integration
│   │   ├── featureSpecs.js    # Comparison table spec data (SECTION_DEFS + PRODUCT_SPECS)
│   │   ├── productIds/        # Static SKU → ProductID maps for cart API (full NWG- prefix)
│   │   │   ├── tabletop.js
│   │   │   ├── mSeries.js
│   │   │   └── wifi.js
│   │   ├── productPrices.js   # Static price maps (updated 2026-03-03 from DBP CSV)
│   │   ├── productSkus/       # Static config → full SKU maps (full NWG- prefix)
│   │   │   ├── tabletop.js
│   │   │   ├── mSeries.js
│   │   │   └── wifi.js
│   │   └── productUrls/       # Static SKU → dealershop URL maps (full NWG- prefix)
│   │       ├── tabletop.js
│   │       ├── mSeries.js
│   │       └── wifi.js
│   └── components/
│       ├── ProductCatalog/    # ★ Main UI: horizontal comparison grid (see §6)
│       ├── ProductCard/       # (exists but not used in current main layout)
│       ├── ConfigPanel/       # (exists but not used in current main layout)
│       ├── QuoteCartPanel/    # Modal quote cart
│       ├── TopLevelNav/       # (exists, not currently rendered in App)
│       ├── ComparisonTabs/
│       ├── SecuritySuiteTable/
│       ├── SecurityBundles/
│       ├── LicenseTerms/
│       ├── WifiSubscriptions/
│       ├── RenewalsSection/
│       ├── FireCloudSection/
│       ├── MDRSection/
│       ├── NDRSection/
│       └── SummaryPanel/
├── public/
│   ├── banners/               # Category banner images
│   │   ├── Tabletop_banner.jpg
│   │   ├── Rackmount_banner.jpg
│   │   └── Access-points_banner.jpg
│   ├── configurator-integration.js  # Script injected into partner site
│   └── watchguard-auto-cart.user.js # Userscript (legacy bridge)
├── WG Hardware SKUS_full.csv       # Source of truth for all SKU/pricing data (seed source)
├── leader_dbp_prices_2026-03-03.csv # Leader DBP price export used for latest pricing update
├── vite.config.mjs
├── package.json
└── plan.md                    # ← This file
```

> **Note:** `public/products/` local images have been **removed**. All product images are served from the Leader Systems CDN (see §7).

---

## 4. Database Schema (SQLite)

### `product_groups`
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PK | Auto |
| slug | TEXT UNIQUE | e.g. `T145`, `AP330`, `M395` |
| name | TEXT | e.g. `Firebox T145` |
| family | TEXT | `T-Series`, `M-Series`, `Access Points` |
| category | TEXT | `tabletop`, `mseries`, `wifi` |
| description | TEXT | Short marketing description |
| image_file | TEXT | Legacy — no longer used for display |

### `skus`
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PK | Auto |
| sku_code | TEXT | WatchGuard short SKU, `NWG-` prefix stripped |
| full_sku | TEXT UNIQUE | Full SKU with `NWG-` prefix (e.g. `NWG-WGA130000`) |
| name | TEXT | Full product name |
| msrp | REAL | Price in AUD (DBP ex GST) |
| delivery_method | TEXT | `Physical` or `Electronic` |
| product_group_id | INTEGER FK | Links to `product_groups` |
| url | TEXT | Deep link to product on partner dealershop |
| sku_type | TEXT | `appliance`, `subscription`, `trade_up`, `high_availability`, `activation_bundle` |
| subscription_type | TEXT | e.g. `Total Security Suite`, `Basic Security Suite`, `USP Wi-Fi` |
| term_years | INTEGER | 1, 3, or 5 (null for appliances) |

### `product_features`
| Column | Type | Notes |
|---|---|---|
| id | INTEGER PK | Auto |
| product_group_id | INTEGER FK | |
| feature_category | TEXT | e.g. `Performance`, `VPN Tunnels`, `Hardware` |
| feature_name | TEXT | e.g. `UTM (Full Scan)` |
| feature_value | TEXT | e.g. `See datasheet` |
| sort_order | INTEGER | Display ordering |

> **Note:** `products.db` is gitignored. After every fresh `git clone`, run `npm run seed` to recreate the database from `WG Hardware SKUS_full.csv`.

---

## 5. Backend API (`server/index.js`, port 3001)

| Endpoint | Description |
|---|---|
| `GET /api/categories` | Returns all 3 category tabs (`tabletop`, `mseries`, `wifi`) with their product groups and appliance SKU |
| `GET /api/products/:slug` | Full product detail: appliance, subscriptions, trade-ups, HA SKUs, activation bundles, feature groups |
| `GET /api/products/:slug/subscriptions` | Subscriptions only for a product group, grouped by `subscription_type` |

> The backend is **only used in local development**. The GitHub Pages deployment has no backend — a future version needs either a hosted API or static JSON data baked into the build.

---

## 6. Frontend Architecture

### Current Layout (`App.jsx`)

The app renders only three things:
1. **`ProductCatalog`** — the entire product browsing and add-to-cart experience
2. **`QuoteCartPanel`** — full-screen modal, opened by the floating cart button
3. **Floating cart button** — fixed right-side button showing item badge

`ConfigPanel`, `ProductCard`, `TopLevelNav` and other components still exist in `src/components/` but are **not currently rendered** in the main app layout.

---

### `ProductCatalog` — Horizontal Comparison Grid

The core UI is a **horizontally scrollable column comparison grid** (inspired by a product comparison table):

- Rows are feature/action categories; **columns are products**
- Grid template is dynamically computed: `200px repeat(N, 220px)` where N = number of products in the active category
- Supports **click-and-drag** to scroll horizontally

**Grid row structure (top to bottom):**

| Row | Description |
|---|---|
| Product header | Image (from CDN), product name (link), short description |
| Appliance price | `$X,XXX ex GST` with tooltip "Appliance only, license sold separately" |
| Hardware add-to-cart | "Add to Cart" button + SKU link |
| *(collapsible)* **Compare Specs** | Feature rows per `SECTION_DEFS[category]`, values from `PRODUCT_SPECS[slug]` |
| *(collapsible)* **Buy Subscription** | Sub-type `<select>`, term `<select>`, price display, "Add Subscription" button + SKU link |

**Tabs:** Firebox Tabletop / Firebox M Series / Wi-Fi 6 Access Points

**Data flow:**
1. On mount: `GET /api/categories` → renders product columns
2. Per product: `GET /api/products/:slug` → populates subscription dropdowns
3. Spec rows: served from static `featureSpecs.js` (no API call)

---

### `featureSpecs.js` — Comparison Table Data

Located at `src/data/featureSpecs.js`. Defines all comparison table content:

```js
// Row structure per category
SECTION_DEFS = {
  tabletop: [ { title: 'PERFORMANCE', rows: [{ label: 'UTM (Full Scan)', key: 'utmFullScan' }, ...] }, ... ],
  mseries: [...],
  wifi: [...],
}

// Per-product values (keyed by product_group slug)
PRODUCT_SPECS = {
  'T145': { utmFullScan: '710 Mbps', firewallUdp: '3.9 Gbps', ... },
  'M395': { utmFullScan: '—', ... },
  'AP130': { idealFor: 'Small offices, remote workers', ... },
  ...
}

// Helper
getSpecValue(slug, key) → string  // returns '—' if not found
```

> **Most spec values are currently `'—'` (placeholders).** T-Series and some AP entries have partial real data. M-Series and most Wi-Fi specs need to be filled in from datasheets.

---

### `QuoteCartPanel`
- Full-screen modal overlay
- Line item table: thumbnail, product name, SKU, unit price, quantity stepper, subtotal, remove
- Cart summary: item count, total ex GST (AUD)
- Collapsible "Quote Options" section: customer name, customer email, notes, account manager dropdown
- Footer actions:
  - **Add All to Leader Cart** — calls `cartUtils.js` to POST to Leader Systems AddToCart API
  - **Email to AM** — opens `mailto:` with pre-filled quote details
  - **Download PDF** — generates a branded PDF via jsPDF

### `QuoteContext`
- Global state via `useReducer` + React Context
- State: `items[]`, `customerInfo { name, email }`, `notes`
- Computed: `subtotal`, `itemCount`
- Actions: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `setCustomerInfo`, `setNotes`, `loadQuote`

---

## 7. Product Images

Product images are served from the **Leader Systems partner CDN**, not stored locally.

**URL pattern:**
```
https://partner.leadersystems.com.au/Images/<full_sku>.jpg
```

Where `<full_sku>` is the full SKU code **including the `NWG-` prefix** (e.g. `NWG-WGA130000`).

Derived from `product.appliance.full_sku` (returned by `/api/products/:slug`).

> The `public/products/` folder and all local `.jpg` images have been **deleted** from the repo.

---

## 8. SKU Format — Important

All static data files (`productIds/`, `productSkus/`, `productUrls/`) now use the **full `NWG-XXXXXXX` prefix format** as keys/values. Previously these used stripped short codes (e.g. `WGA130000`). This was updated in March 2026 to match the full_sku format used by the database and CDN.

**Example (wifi.js):**
```js
// productSkus/wifi.js
'AP130': {
  'Appliance Only': 'NWG-WGA130000',   // ← full NWG- prefix
  'USP Wi-Fi': { '1 Year': 'NWG-WGA13022001', ... },
}

// productIds/wifi.js
'NWG-WGA130000': '102373',  // ← keyed by full SKU
```

---

## 9. Pricing

Prices in `productPrices.js` and in the SQLite database are **Leader DBP (Dealer Buy Price) ex GST in AUD**.

**Current pricing source:** `leader_dbp_prices_2026-03-03.csv` (Leader price export dated 2026-03-03)

**Key pricing notes:**
- T-Series products: 1-year, 3-year, and 5-year subscription terms available
- M-Series products: **1-year and 3-year only** (no 5-year terms in this price list)
- Wi-Fi APs: 1-year, 3-year, and 5-year subscription terms available
- T185 High Availability: Standard Support only (no Basic/Total Security HA SKUs)

---

## 10. Leader Systems Cart Integration

When the user clicks **"Add All to Leader Cart"**, the app calls the Leader Systems in-house AddToCart API:

- **API endpoint:** `WSLD.asmx/AddToCart` (relative, same-origin on partner site)
- **Auth:** Uses `C.UserCode` (a global JS variable set by the partner site when logged in)
- **Parameters:** `DealerCode`, `ProductID`, `Qty`
- **Product ID mapping:** stored in `src/data/productIds/` (static maps, all IDs still blank except AP130)

This only works when the app is served from `partner.leadersystems.com.au` (same origin). On localhost, calls fail with CORS errors — this is expected.

### `configurator-integration.js`
A script injected into the partner site's global template. Provides:
1. **Auto-search** — reads a `localStorage` flag (`watchguard_configurator_sku`) to auto-populate the site's search bar
2. **Add-to-Cart bridge** — reads a `#wg-add=<productId>:<qty>,...` URL hash on the shopping cart page and calls the AddToCart API for each item. Also listens for `window.postMessage` from the configurator (iframe mode)

---

## 11. Account Managers

Currently hardcoded as placeholder dummies in `QuoteCartPanel.jsx`:

```js
const accountManagers = [
  { id: 1, name: 'John Smith',     email: 'john.smith@example.com' },
  { id: 2, name: 'Sarah Johnson',  email: 'sarah.johnson@example.com' },
  ...
];
```

**TODO:** Replace with real Leader Systems account manager names and emails.

---

## 12. Data Source

All SKU and pricing data comes from:

```
WG Hardware SKUS_full.csv
```

CSV columns: `SKU`, `Name`, `MSRP`, `Method of Delivery`, `Product Family`, `Product Group`, `url in dealershop`

The seed script (`server/seed.js`) parses this CSV and populates the SQLite database. Prices are read from the `MSRP` column (which should be set to DBP ex GST values before seeding). To re-seed after CSV changes:

```bash
node server/seed.js
```

The `sku_code` field in the DB has the `NWG-` prefix stripped. The `full_sku` field keeps the full original SKU.

---

## 13. Local Development

```bash
# 1. Clone
git clone https://github.com/LeaderMarketing/WatchGuardBOM.git
cd WatchGuardBOM

# 2. Install dependencies
npm install

# 3. Seed the database (required after every fresh clone)
npm run seed

# 4. Start both frontend + backend
npm run dev
```

- Frontend: http://localhost:5173/WatchGuardBOM/
- Backend API: http://localhost:3001

---

## 14. Deployment (GitHub Pages)

```bash
git add -A
git commit -m "Your change description"
git push
```

GitHub Actions automatically builds and deploys to the `gh-pages` branch. The Vite base path is `/WatchGuardBOM/` (set in `vite.config.mjs`).

To manually build and deploy:
```bash
npm run deploy
```

---

## 15. Known Issues / TODOs

- [ ] **Spec data mostly placeholder** — `featureSpecs.js` has `'—'` for most M-Series and many Wi-Fi specs. Real throughput, port, and hardware specs need to be filled in from official datasheets.
- [ ] **ProductID mapping incomplete** — `src/data/productIds/` has real IDs only for AP130 (some). All other productIds are empty strings `''`. Required for the Leader Cart "Add All" feature to work.
- [ ] **Account managers** in `QuoteCartPanel.jsx` are placeholder dummies — replace with real Leader Systems staff
- [ ] **Deployed version has no backend** — the GitHub Pages build fetches from `localhost:3001` which won't work for end users. A future version needs either a hosted API or static JSON data baked into the build.
- [ ] **Trade-up, High Availability, Activation Bundle SKUs** — seeded into DB and returned by API but not yet surfaced in the comparison grid UI
- [ ] **Legacy components not connected** — `ProductCard`, `ConfigPanel`, `TopLevelNav`, `WifiSubscriptions`, `ComparisonTabs`, etc. exist in `src/components/` but are not rendered. Consider removing unused ones or integrating them.
- [ ] **Tabletop static data** — `productIds/tabletop.js`, `productSkus/tabletop.js`, `productUrls/tabletop.js` may still need review/alignment with the new SKU naming convention (tabletop was already using NWG- format but T45 series was added to CSV; verify alignment).
