# Consolidate All SKUs Into Database

> **For Claude:** This plan restructures data architecture. Read this plan fully before starting.
> Every step must be verified before moving to the next.

**Goal:** Move all 1,262 SKUs (with URLs and pricing) into `product-catalog.csv` → SQLite database → API/static-JSON pipeline. Eliminate all hardcoded `SKU_URLS` maps and standalone `productSkus/*.js` files. Single source of truth for structure, pricing, AND URLs.

**Current state (the mess):**

| Data | Where it lives today | SKU count |
|------|---------------------|-----------|
| Appliance products (T/M/WiFi) | `product-catalog.csv` → SQLite DB → API | 339 |
| Appliance renewals | `fireboxAppliances.js` + `skuUrls.js` (hardcoded) | 508 |
| Virtual (FireboxV) | `fireboxV.js` + `VirtualCatalog.jsx` SKU_URLS | 116 |
| Cloud (Firebox Cloud) | `fireboxCloud.js` + `CloudCatalog.jsx` SKU_URLS | 108 |
| MDR/NDR | `mdrNdr.js` + `MdrNdrCatalog.jsx` SKU_URLS | 66 |
| Endpoint & Mobile | `endpoint.js` + `EndpointCatalog.jsx` SKU_URLS | 166 |
| Identity & Access | `identity.js` + `IdentityCatalog.jsx` SKU_URLS | 28 |
| Email Security | `email.js` + `EmailCatalog.jsx` SKU_URLS | 18 |
| **Unique total** | scattered across ~20 files | **~1,262** |

URLs are stored in 3 different places: `product-catalog.csv` (339), `docs/*-skus.csv` (215), and hardcoded JSX `SKU_URLS` maps (~502+507).

**Target state:**

```
product-catalog.csv (ALL ~1,262 SKUs with URLs)
        ↓
   seed.js → SQLite DB
        ↓
   Express API + static-JSON export
        ↓
   ALL catalog components read from API/static-JSON
```

---

## Architecture Decisions

### Schema changes needed

The existing `product_groups` table needs new categories. Currently:
- `tabletop`, `mseries`, `wifi` → maps to appliance product families

New categories to add:
- `virtual` — FireboxV products
- `cloud` — Firebox Cloud products
- `mdr_ndr` — MDR & NDR products
- `endpoint` — Endpoint & Mobile products (WatchGuard + Panda tiers)
- `identity` — AuthPoint & Total Identity Security
- `email` — Panda Email Protection
- `renewals` — Firebox appliance subscription renewals

The `skus` table schema does NOT need changes — it already has `sku_code`, `full_sku`, `name`, `msrp`, `delivery_method`, `url`, `sku_type`, `subscription_type`, `term_years`.

### New `sku_type` values needed

Current: `appliance`, `subscription`, `trade_up`, `high_availability`, `activation_bundle`

New: `per_user_subscription` — for tiered per-user products (Endpoint, Identity, Email, MDR/NDR) where pricing varies by user tier + term. These don't have an "appliance" — the product IS the subscription.

### product-catalog.csv format extension

Current columns: `SKU,Name,DBP_ex_GST,Method of Delivery,Product Family,Product Group,url in dealershop`

The format works as-is. Per-user subscription products will use:
- `Product Family` = e.g., "Endpoint & Mobile", "Identity & Access", "Email Security", "MDR & NDR", "Virtual", "Cloud"
- `Product Group` = e.g., "WatchGuard EPDR", "AuthPoint", "Panda Email Protection", "FireboxV-Small"
- `Method of Delivery` = "Electronic" for all subscriptions
- `Name` = includes tier + term info, e.g., "WatchGuard EPDR 1-50 users - 1 Year"

### API changes

The `/api/categories` endpoint currently returns only 3 hardcoded categories (`tabletop`, `mseries`, `wifi`). It needs to be **dynamic** — return all categories found in the database.

New endpoint needed: `GET /api/products/by-category/:category` — returns all product groups + their SKUs for a category. This is how the per-user subscription pages will fetch data (they don't need feature specs, just products with tiers/terms/prices/URLs).

### Frontend changes

Each catalog component (`VirtualCatalog`, `CloudCatalog`, `MdrNdrCatalog`, `EndpointCatalog`, `IdentityCatalog`, `EmailCatalog`) needs to:
1. Remove hardcoded `SKU_URLS` map
2. Remove `productSkus/*.js` imports for price lookups
3. Fetch product data (including URLs and prices) from API/static-JSON
4. Use a shared `useCatalogData(category)` hook pattern

The `ApplianceRenewals` component similarly removes `skuUrls.js` and `fireboxAppliances.js`.

---

## Implementation Tasks

### Task 1: Extend product-catalog.csv with ALL per-user subscription SKUs

**Files to modify:**
- `server/data/product-catalog.csv` — add ~923 new rows

**What to do:**

Generate CSV rows for each product from existing data sources. The data already exists in the `docs/*-skus.csv` files and `src/data/productSkus/*.js` files — it just needs to be converted to `product-catalog.csv` format.

**Source mapping:**

| Page | Source for SKUs + structure | Source for URLs |
|------|---------------------------|-----------------|
| Virtual | `src/data/productSkus/fireboxV.js` | `src/components/VirtualCatalog/VirtualCatalog.jsx` SKU_URLS |
| Cloud | `src/data/productSkus/fireboxCloud.js` | `src/components/CloudCatalog/CloudCatalog.jsx` SKU_URLS |
| MDR/NDR | `src/data/productSkus/mdrNdr.js` | `src/components/MdrNdrCatalog/MdrNdrCatalog.jsx` SKU_URLS |
| Endpoint | `src/data/productSkus/endpoint.js` | `docs/endpoint-skus.csv` (col 5) OR `EndpointCatalog.jsx` SKU_URLS |
| Identity | `src/data/productSkus/identity.js` | `docs/identity-skus.csv` (col 5) OR `IdentityCatalog.jsx` SKU_URLS |
| Email | `src/data/productSkus/email.js` | `docs/email-skus.csv` (col 5) OR `EmailCatalog.jsx` SKU_URLS |
| Renewals | `src/data/productSkus/fireboxAppliances.js` | `src/components/ApplianceRenewals/skuUrls.js` |

**Write a Node.js script** (`scripts/generate-full-catalog.cjs`) that:
1. Reads each `productSkus/*.js` file and each JSX `SKU_URLS` map
2. Cross-references with `WGdata_*.csv` for names/DBP
3. Outputs properly formatted CSV rows
4. Appends to `product-catalog.csv`

**CSV format for per-user products:**
```
NWG-WGEPP30101,"WatchGuard EPP 1-50 users - 1 Year",$45.00,Electronic,Endpoint & Mobile,WatchGuard EPP,https://partner...
```

**Verify:** `wc -l server/data/product-catalog.csv` should be ~1,262 + 1 header = ~1,263 lines.

---

### Task 2: Update seed.js to handle new product families and categories

**Files to modify:**
- `server/seed.js`

**What to do:**

1. **Update `familyToCategory()`** to map new product families:
```js
function familyToCategory(family) {
  const map = {
    'Access Points':      'wifi',
    'M-Series':           'mseries',
    'T-Series':           'tabletop',
    'Virtual':            'virtual',
    'Cloud':              'cloud',
    'MDR & NDR':          'mdr_ndr',
    'Endpoint & Mobile':  'endpoint',
    'Identity & Access':  'identity',
    'Email Security':     'email',
    'Renewals':           'renewals',
  };
  return map[family] || 'other';
}
```

2. **Update `classifySku()`** to handle per-user subscription patterns:
```js
// Add before existing checks:
if (lower.includes('users') && lower.match(/\d+-\d+ users|\d+\+ users/)) {
  return { type: 'per_user_subscription', subType: null };
}
```

3. **Update `groupToDisplayName()`** for new families.

4. **Add DESCRIPTIONS** for new product groups (FireboxV sizes, Endpoint products, etc.).

5. **Update `extractTerm()`** — it already handles "1-year" and "3-year" patterns, should work.

**Verify:** Run `node server/seed.js` and confirm output shows ~1,262 SKUs seeded.

---

### Task 3: Update API endpoints to serve all categories dynamically

**Files to modify:**
- `server/index.js`

**What to do:**

1. **Make `/api/categories` dynamic** — don't hardcode `tabletop`/`mseries`/`wifi`. Build categories from what's in the DB:

```js
app.get('/api/categories', (_req, res) => {
  const groups = db.prepare(`
    SELECT id, slug, name, family, category, description, image_file
    FROM product_groups ORDER BY family, name
  `).all();

  const categories = {};
  for (const g of groups) {
    if (!categories[g.category]) {
      categories[g.category] = { label: g.family, products: [] };
    }
    const appliance = db.prepare(`
      SELECT sku_code, full_sku, name, msrp, url
      FROM skus WHERE product_group_id = ? AND sku_type IN ('appliance', 'per_user_subscription')
      LIMIT 1
    `).get(g.id);
    categories[g.category].products.push({ ...g, appliance: appliance || null });
  }
  res.json(categories);
});
```

2. **Add new endpoint** `GET /api/categories/:category` — returns a single category with all its product groups and ALL their SKUs (not just appliance). This is what the new catalog pages will use:

```js
app.get('/api/categories/:category', (req, res) => {
  const groups = db.prepare(`
    SELECT id, slug, name, family, category, description, image_file
    FROM product_groups WHERE category = ? ORDER BY name
  `).all(req.params.category);

  if (!groups.length) return res.status(404).json({ error: 'Category not found' });

  const result = groups.map(g => {
    const skus = db.prepare(`
      SELECT sku_code, full_sku, name, msrp, delivery_method, url,
             sku_type, subscription_type, term_years
      FROM skus WHERE product_group_id = ? ORDER BY name
    `).all(g.id);
    return { ...g, skus };
  });

  res.json({ label: groups[0].family, products: result });
});
```

3. The existing `/api/products/:slug` endpoint already works generically — no changes needed.

**Verify:** Start the server, hit `GET /api/categories/endpoint` and confirm it returns all Endpoint products with their SKUs, prices, and URLs.

---

### Task 4: Update static-data export for GitHub Pages

**Files to modify:**
- `scripts/export-static-data.cjs`

**What to do:**

1. **Make `exportCategories()` dynamic** — same pattern as Task 3, don't hardcode category keys.

2. **Export per-category JSON files** — for each category, export `public/static-data/category-{name}.json` containing all product groups with full SKU data. This is what the frontend fetches on GitHub Pages.

```js
function exportCategory(categoryName) {
  const groups = db.prepare(`
    SELECT id, slug, name, family, category, description, image_file
    FROM product_groups WHERE category = ? ORDER BY name
  `).all(categoryName);

  const result = groups.map(g => {
    const skus = db.prepare(`
      SELECT sku_code, full_sku, name, msrp, delivery_method, url,
             sku_type, subscription_type, term_years
      FROM skus WHERE product_group_id = ? ORDER BY name
    `).all(g.id);
    return { ...g, skus };
  });

  const data = { label: groups[0]?.family || categoryName, products: result };
  fs.writeFileSync(
    path.join(OUT_DIR, `category-${categoryName}.json`),
    JSON.stringify(data, null, 2),
  );
  console.log(`  ✓ category-${categoryName}.json`);
}
```

3. Export all categories found in the DB.

**Verify:** Run `npm run export-data`, check that `public/static-data/category-endpoint.json` etc. all exist with correct data.

---

### Task 5: Create shared `useCatalogApi` hook

**Files to create:**
- `src/hooks/useCatalogApi.js`

**What to do:**

Create a generic hook that fetches category data from the API with static-JSON fallback (same pattern as `useProductData` in `ProductCatalog`):

```js
import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3001/api';
const STATIC_BASE = `${import.meta.env.BASE_URL}static-data`;

async function fetchWithFallback(apiPath, staticPath) {
  try {
    const res = await fetch(`${API_BASE}${apiPath}`);
    if (res.ok) return res.json();
  } catch { /* fall through to static */ }
  const res = await fetch(staticPath);
  if (!res.ok) throw new Error(`Failed to load ${staticPath}`);
  return res.json();
}

export function useCatalogApi(category) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWithFallback(
      `/categories/${category}`,
      `${STATIC_BASE}/category-${category}.json`
    )
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [category]);

  return { data, loading, error };
}
```

This returns `{ data: { label, products: [{ slug, name, ..., skus: [...] }] }, loading, error }`.

---

### Task 6: Refactor each catalog component to use API data

This is the biggest task. Each of the 6 catalog components + ApplianceRenewals needs to:

1. **Remove** the hardcoded `SKU_URLS` map (100-500 lines of URL constants)
2. **Remove** imports from `productSkus/*.js` and `productPrices.js`
3. **Remove** the custom `use*Data.js` hook (or simplify it to work with API data)
4. **Add** `useCatalogApi(category)` to fetch product data
5. **Derive** tier/term/sku/price/url from the API-provided SKU list instead of doing local lookups

**Order of refactoring (easiest first):**

#### 6a: EmailCatalog (simplest — 1 product, 18 SKUs)

**Files to modify:**
- `src/components/EmailCatalog/EmailCatalog.jsx` — remove `SKU_URLS`, use API data
- `src/components/EmailCatalog/hooks/useEmailData.js` — rewrite to transform API data

**Remove:**
- The entire `SKU_URLS` object (18 entries)
- `getSkuUrl()` function
- Import of `useEmailData` (replace with `useCatalogApi`)
- Import of `formatPrice` from `productPrices.js`

**The API response already contains `url` and `msrp` per SKU**, so the component just needs to:
- Parse the SKU list to extract available tiers and terms
- Look up the matching SKU for the current tier+term selection
- Use `sku.url` directly instead of `getSkuUrl(sku)`
- Use `sku.msrp` directly instead of `getPriceForSelection()`

**The hook transformation logic:**
```js
// From API: product.skus = [{ full_sku, name, msrp, url, term_years, ... }, ...]
// Parse "1-50 users" from name to get tier
// Parse term_years to get term
// Build lookup: { tier → { term → { sku, price, url } } }
```

#### 6b: IdentityCatalog (2 products, 28 SKUs)

Same pattern as 6a. **Files:**
- `src/components/IdentityCatalog/IdentityCatalog.jsx`
- `src/components/IdentityCatalog/hooks/useIdentityData.js`

#### 6c: MdrNdrCatalog (4 products, 66 SKUs)

Same pattern. **Files:**
- `src/components/MdrNdrCatalog/MdrNdrCatalog.jsx`
- `src/components/MdrNdrCatalog/hooks/useMdrNdrData.js`

#### 6d: EndpointCatalog (12 products, 166 SKUs)

Same pattern but larger. Has tabs (WatchGuard vs Panda). **Files:**
- `src/components/EndpointCatalog/EndpointCatalog.jsx`
- `src/components/EndpointCatalog/hooks/useEndpointData.js`

#### 6e: VirtualCatalog (116 SKUs)

Different pattern — these are appliance-style products (FireboxV sizes with subscription tiers), not per-user. The existing `VirtualCatalog` already has a different card layout. **Files:**
- `src/components/VirtualCatalog/VirtualCatalog.jsx`

#### 6f: CloudCatalog (108 SKUs)

Same as Virtual. **Files:**
- `src/components/CloudCatalog/CloudCatalog.jsx`

#### 6g: ApplianceRenewals (508 SKUs)

**Files:**
- `src/components/ApplianceRenewals/ApplianceRenewals.jsx`
- `src/components/ApplianceRenewals/skuUrls.js` — DELETE
- `src/components/ApplianceRenewals/useApplianceRenewals.js`

---

### Task 7: Clean up deprecated files

**Files to DELETE after all components are refactored:**
- `src/data/productSkus/endpoint.js`
- `src/data/productSkus/identity.js`
- `src/data/productSkus/email.js`
- `src/data/productSkus/mdrNdr.js`
- `src/data/productSkus/fireboxV.js`
- `src/data/productSkus/fireboxCloud.js`
- `src/data/productSkus/fireboxAppliances.js`
- `src/components/ApplianceRenewals/skuUrls.js`
- `src/data/mdr_ndr_skus.csv` (stale CSV in src/data)

**Files to KEEP (still used by Security Appliances tab via `productSkus.js`):**
- `src/data/productSkus/tabletop.js`
- `src/data/productSkus/mSeries.js`
- `src/data/productSkus/wifi.js`
- `src/data/productSkus.js` (entry point importing above 3)
- `src/data/productPrices.js` (still used by Security Appliances tab for browser-side price lookups)

> **Future consideration:** The Security Appliances tab (`ProductCatalog`) already reads from the DB/API. The remaining `tabletop.js`, `mSeries.js`, `wifi.js`, and `productPrices.js` files are used by the Virtual and Cloud tabs. Once those tabs read from the API too (Task 6e/6f), these files can also be removed. But that's optional for this phase.

**Actually — correction:** After Task 6e and 6f, Virtual and Cloud WILL read from the API, so `fireboxV.js` and `fireboxCloud.js` are already in the delete list. But `productSkus.js` also imports `fireboxVProductSkus` — that import needs to be removed from `productSkus.js`.

**Update `src/data/productSkus.js`:** Remove the `fireboxV` import since Virtual tab will now use API data. Keep `tabletop`, `mSeries`, `wifi` imports (used by `productPrices.js` → `getProductPrice()`).

---

### Task 8: Update README.md

**File to modify:**
- `README.md`

**What to update:**
1. Update the "Two files, two responsibilities" section — now `product-catalog.csv` contains ALL SKUs (not just appliances), including URLs
2. Update the data flow diagram — all tabs now flow through the DB/API pipeline
3. Update the seed output example — should show ~1,262 SKUs
4. Update the "Application Tabs" table — all tabs are now "Live"
5. Update the Project Structure tree — reflect deleted files

---

### Task 9: Verify end-to-end

**Run these checks:**

1. `node server/seed.js` — should report ~1,262 SKUs seeded
2. `npm run dev` — start frontend + backend
3. Visit each tab and verify:
   - All SKUs render with correct prices
   - All SKU codes are clickable links to partner portal
   - Dropdowns (tier, term) work correctly
   - Add-to-cart works
   - No console errors
4. `npm run export-data` — exports all static JSON
5. `npm run build && npm run preview` — verify GitHub Pages fallback works
6. Spot-check a few SKUs across pages to confirm price and URL match the source CSV

---

## Risk & Rollback

- **No schema migration needed** — `seed.js` drops and recreates tables each run
- **Rollback:** Revert `product-catalog.csv` to old version, re-seed, and restore deleted JS files from git
- **Testing pricing accuracy:** After seeding, run a spot-check script that compares DB prices against WGdata CSV for 10 random SKUs per category

---

## Execution Order

| Order | Task | Effort | Risk |
|-------|------|--------|------|
| 1 | Task 1: Extend product-catalog.csv | Medium | Low — additive |
| 2 | Task 2: Update seed.js | Small | Low — additive |
| 3 | Task 3: Update API endpoints | Small | Low — additive, existing endpoints unchanged |
| 4 | Task 4: Update static-data export | Small | Low |
| 5 | Task 5: Create shared hook | Small | Low |
| 6 | Task 6a-6g: Refactor components | Large | Medium — test each page after refactoring |
| 7 | Task 7: Clean up files | Small | Low — only after all pages verified |
| 8 | Task 8: Update README | Small | None |
| 9 | Task 9: E2E verification | Medium | None |

Tasks 1-5 are additive (no breaking changes). Task 6 is where things break and need testing. Task 7 is cleanup only after verification.
