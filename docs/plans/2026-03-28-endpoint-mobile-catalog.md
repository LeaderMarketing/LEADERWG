# Endpoint & Mobile Catalog Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the Endpoint & Mobile page (`/endpoint`) with WatchGuard endpoint products and Legacy Panda products in a tabbed card-grid layout.

**Architecture:** Follows the MdrNdrCatalog pattern exactly — a SKU mapping file feeds a custom hook that resolves prices via `getPriceBySku()`, rendered as product cards in a CSS Module-styled grid. Two tabs: "WatchGuard Endpoint" (9 products) and "Legacy Panda" (3 products). No backend changes.

**Tech Stack:** React 18, CSS Modules, Phosphor Icons, QuoteContext for cart, `productPrices.js` for price lookups.

---

### Task 1: Create SKU mapping file

**Files:**
- Create: `src/data/productSkus/endpoint.js`

**Step 1: Create the SKU mapping**

This file maps `product key → license tier → term → SKU code` for all 12 endpoint products. Reference `src/data/productSkus/mdrNdr.js` for the exact structure.

```js
// Endpoint & Mobile product configuration → SKU mapping
// Per-seat subscriptions with license tier pricing

export const endpointProductSkus = {
  // ─── Core Endpoint Protection ─────────────────────────
  'EPP': {
    '1-50':      { '1 Year': 'NWG-WGEPP30101', '3 Year': 'NWG-WGEPP30103' },
    '51-100':    { '1 Year': 'NWG-WGEPP30201', '3 Year': 'NWG-WGEPP30203' },
    '101-250':   { '1 Year': 'NWG-WGEPP30301', '3 Year': 'NWG-WGEPP30303' },
    '251-500':   { '1 Year': 'NWG-WGEPP30401', '3 Year': 'NWG-WGEPP30403' },
    '501-1000':  { '1 Year': 'NWG-WGEPP30501', '3 Year': 'NWG-WGEPP30503' },
    '1001-5000': { '1 Year': 'NWG-WGEPP30601', '3 Year': 'NWG-WGEPP30603' },
    '5001+':     { '1 Year': 'NWG-WGEPP30701', '3 Year': 'NWG-WGEPP30703' },
  },

  'EDR': {
    '1-50':      { '1 Year': 'NWG-WGEDR30101', '3 Year': 'NWG-WGEDR30103' },
    '51-100':    { '1 Year': 'NWG-WGEDR30201', '3 Year': 'NWG-WGEDR30203' },
    '101-250':   { '1 Year': 'NWG-WGEDR30301', '3 Year': 'NWG-WGEDR30303' },
    '251-500':   { '1 Year': 'NWG-WGEDR30401', '3 Year': 'NWG-WGEDR30403' },
    '501-1000':  { '1 Year': 'NWG-WGEDR30501', '3 Year': 'NWG-WGEDR30503' },
    '1001-5000': { '1 Year': 'NWG-WGEDR30601', '3 Year': 'NWG-WGEDR30603' },
    '5001+':     { '1 Year': 'NWG-WGEDR30701', '3 Year': 'NWG-WGEDR30703' },
  },

  'EPDR': {
    '1-50':      { '1 Year': 'NWG-WGEPDR30101', '3 Year': 'NWG-WGEPDR30103' },
    '51-100':    { '1 Year': 'NWG-WGEPDR30201', '3 Year': 'NWG-WGEPDR30203' },
    '101-250':   { '1 Year': 'NWG-WGEPDR30301', '3 Year': 'NWG-WGEPDR30303' },
    '251-500':   { '1 Year': 'NWG-WGEPDR30401', '3 Year': 'NWG-WGEPDR30403' },
    '501-1000':  { '1 Year': 'NWG-WGEPDR30501', '3 Year': 'NWG-WGEPDR30503' },
    '1001-5000': { '1 Year': 'NWG-WGEPDR30601', '3 Year': 'NWG-WGEPDR30603' },
    '5001+':     { '1 Year': 'NWG-WGEPDR30701', '3 Year': 'NWG-WGEPDR30703' },
  },

  'Advanced EPDR': {
    '1-50':      { '1 Year': 'NWG-WGAEPDR30101', '3 Year': 'NWG-WGAEPDR30103' },
    '51-100':    { '1 Year': 'NWG-WGAEPDR30201', '3 Year': 'NWG-WGAEPDR30203' },
    '101-250':   { '1 Year': 'NWG-WGAEPDR30301', '3 Year': 'NWG-WGAEPDR30303' },
    '251-500':   { '1 Year': 'NWG-WGAEPDR30401', '3 Year': 'NWG-WGAEPDR30403' },
    '501-1000':  { '1 Year': 'NWG-WGAEPDR30501', '3 Year': 'NWG-WGAEPDR30503' },
    '1001-5000': { '1 Year': 'NWG-WGAEPDR30601', '3 Year': 'NWG-WGAEPDR30603' },
    '5001+':     { '1 Year': 'NWG-WGAEPDR30701', '3 Year': 'NWG-WGAEPDR30703' },
  },

  // ─── Endpoint Add-On Modules ──────────────────────────
  'Full Encryption': {
    '1-50':      { '1 Year': 'NWG-WGENCR30101', '3 Year': 'NWG-WGENCR30103' },
    '51-100':    { '1 Year': 'NWG-WGENCR30201', '3 Year': 'NWG-WGENCR30203' },
    '101-250':   { '1 Year': 'NWG-WGENCR30301', '3 Year': 'NWG-WGENCR30303' },
    '251-500':   { '1 Year': 'NWG-WGENCR30401', '3 Year': 'NWG-WGENCR30403' },
    '501-1000':  { '1 Year': 'NWG-WGENCR30501', '3 Year': 'NWG-WGENCR30503' },
    '1001-5000': { '1 Year': 'NWG-WGENCR30601', '3 Year': 'NWG-WGENCR30603' },
    '5001+':     { '1 Year': 'NWG-WGENCR30701', '3 Year': 'NWG-WGENCR30703' },
  },

  'Patch Management': {
    '1-50':      { '1 Year': 'NWG-WGPTCH30101', '3 Year': 'NWG-WGPTCH30103' },
    '51-100':    { '1 Year': 'NWG-WGPTCH30201', '3 Year': 'NWG-WGPTCH30203' },
    '101-250':   { '1 Year': 'NWG-WGPTCH30301', '3 Year': 'NWG-WGPTCH30303' },
    '251-500':   { '1 Year': 'NWG-WGPTCH30401', '3 Year': 'NWG-WGPTCH30403' },
    '501-1000':  { '1 Year': 'NWG-WGPTCH30501', '3 Year': 'NWG-WGPTCH30503' },
    '1001-5000': { '1 Year': 'NWG-WGPTCH30601', '3 Year': 'NWG-WGPTCH30603' },
    '5001+':     { '1 Year': 'NWG-WGPTCH30701', '3 Year': 'NWG-WGPTCH30703' },
  },

  'Advanced Reporting Tool': {
    '1-50':      { '1 Year': 'NWG-WGINSG30101', '3 Year': 'NWG-WGINSG30103' },
    '51-100':    { '1 Year': 'NWG-WGINSG30201', '3 Year': 'NWG-WGINSG30203' },
    '101-250':   { '1 Year': 'NWG-WGINSG30301', '3 Year': 'NWG-WGINSG30303' },
    '251-500':   { '1 Year': 'NWG-WGINSG30401', '3 Year': 'NWG-WGINSG30403' },
    '501-1000':  { '1 Year': 'NWG-WGINSG30501', '3 Year': 'NWG-WGINSG30503' },
    '1001-5000': { '1 Year': 'NWG-WGINSG30601', '3 Year': 'NWG-WGINSG30603' },
    '5001+':     { '1 Year': 'NWG-WGINSG30701', '3 Year': 'NWG-WGINSG30703' },
  },

  // ─── DNS & Mobile Protection ──────────────────────────
  'DNSWatchGO': {
    '1-50':      { '1 Year': 'NWG-WGDNS30101', '3 Year': 'NWG-WGDNS30103' },
    '51-100':    { '1 Year': 'NWG-WGDNS30201', '3 Year': 'NWG-WGDNS30203' },
    '101-250':   { '1 Year': 'NWG-WGDNS30301', '3 Year': 'NWG-WGDNS30303' },
    '251-500':   { '1 Year': 'NWG-WGDNS30401', '3 Year': 'NWG-WGDNS30403' },
    '501-1000':  { '1 Year': 'NWG-WGDNS30501', '3 Year': 'NWG-WGDNS30503' },
    '1001-5000': { '1 Year': 'NWG-WGDNS30601', '3 Year': 'NWG-WGDNS30603' },
    '5001+':     { '1 Year': 'NWG-WGDNS30701', '3 Year': 'NWG-WGDNS30703' },
  },

  // ─── User Security Bundle ─────────────────────────────
  'Passport': {
    '1-50':      { '1 Year': 'NWG-WGPSP30101', '3 Year': 'NWG-WGPSP30103' },
    '51-100':    { '1 Year': 'NWG-WGPSP30201', '3 Year': 'NWG-WGPSP30203' },
    '101-250':   { '1 Year': 'NWG-WGPSP30301', '3 Year': 'NWG-WGPSP30303' },
    '251-500':   { '1 Year': 'NWG-WGPSP30401', '3 Year': 'NWG-WGPSP30403' },
    '501-1000':  { '1 Year': 'NWG-WGPSP30501', '3 Year': 'NWG-WGPSP30503' },
    '1001-5000': { '1 Year': 'NWG-WGPSP30601', '3 Year': 'NWG-WGPSP30603' },
    '5001+':     { '1 Year': 'NWG-WGPSP30701', '3 Year': 'NWG-WGPSP30703' },
  },

  // ─── Legacy Panda Products ────────────────────────────
  'Panda EPP+': {
    '1-10':      { '1 Year': 'NWG-WGEPL011', '3 Year': 'NWG-WGEPL013' },
    '11-25':     { '1 Year': 'NWG-WGEPL021', '3 Year': 'NWG-WGEPL023' },
    '26-50':     { '1 Year': 'NWG-WGEPL031', '3 Year': 'NWG-WGEPL033' },
    '51-100':    { '1 Year': 'NWG-WGEPL041', '3 Year': 'NWG-WGEPL043' },
    '101-250':   { '1 Year': 'NWG-WGEPL051', '3 Year': 'NWG-WGEPL053' },
    '251-500':   { '1 Year': 'NWG-WGEPL061', '3 Year': 'NWG-WGEPL063' },
    '501-1000':  { '1 Year': 'NWG-WGEPL071', '3 Year': 'NWG-WGEPL073' },
    '1001-3000': { '1 Year': 'NWG-WGEPL081', '3 Year': 'NWG-WGEPL083' },
    '3000+':     { '1 Year': 'NWG-WGEPL091', '3 Year': 'NWG-WGEPL093' },
  },

  'Panda AD360': {
    '1-50':      { '1 Year': 'NWG-WGAD3011', '3 Year': 'NWG-WGAD3013' },
    '51-100':    { '1 Year': 'NWG-WGAD3021', '3 Year': 'NWG-WGAD3023' },
  },

  'Panda Patch Management': {
    '1-10':      { '1 Year': 'NWG-WGPAT011', '3 Year': 'NWG-WGPAT013' },
    '11-25':     { '1 Year': 'NWG-WGPAT021', '3 Year': 'NWG-WGPAT023' },
    '26-50':     { '1 Year': 'NWG-WGPAT031', '3 Year': 'NWG-WGPAT033' },
    '51-100':    { '1 Year': 'NWG-WGPAT041', '3 Year': 'NWG-WGPAT043' },
    '101-250':   { '1 Year': 'NWG-WGPAT051', '3 Year': 'NWG-WGPAT053' },
    '251-500':   { '1 Year': 'NWG-WGPAT061', '3 Year': 'NWG-WGPAT063' },
    '501-1000':  { '1 Year': 'NWG-WGPAT071', '3 Year': 'NWG-WGPAT073' },
    '1001-3000': { '1 Year': 'NWG-WGPAT081', '3 Year': 'NWG-WGPAT083' },
    '3000+':     { '1 Year': 'NWG-WGPAT091', '3 Year': 'NWG-WGPAT093' },
  },
};
```

**Step 2: Verify SKUs resolve prices**

Open the browser console on the running dev server and test:
```js
import { getPriceBySku } from './data/productPrices.js';
console.log(getPriceBySku('NWG-WGEPP30101')); // should print 63
console.log(getPriceBySku('NWG-WGEPL011'));   // should print 63
```

**Step 3: Commit**

```bash
git add src/data/productSkus/endpoint.js
git commit -m "feat(endpoint): add SKU mappings for 12 endpoint & mobile products"
```

---

### Task 2: Create the useEndpointData hook

**Files:**
- Create: `src/components/EndpointCatalog/hooks/useEndpointData.js`

**Reference:** `src/components/MdrNdrCatalog/hooks/useMdrNdrData.js` — follow the same pattern exactly.

**Step 1: Create the hook**

```js
import { useState, useCallback, useMemo } from 'react';
import { endpointProductSkus } from '../../../data/productSkus/endpoint.js';
import { getPriceBySku } from '../../../data/productPrices.js';

const WG_TIERS = ['1-50', '51-100', '101-250', '251-500', '501-1000', '1001-5000', '5001+'];

export const PRODUCTS = [
  // ─── Core Endpoint Protection ───
  {
    key: 'EPP',
    label: 'WatchGuard EPP',
    group: 'watchguard',
    section: 'core',
    badge: 'Good',
    description: 'Endpoint Protection Platform — antivirus, anti-exploit, URL filtering, and device firewall for comprehensive baseline protection.',
    tiers: WG_TIERS,
  },
  {
    key: 'EDR',
    label: 'WatchGuard EDR',
    group: 'watchguard',
    section: 'core',
    badge: 'Better',
    description: 'Endpoint Detection & Response — zero-trust app service, threat hunting, and behavioral detection for advanced threat visibility.',
    tiers: WG_TIERS,
  },
  {
    key: 'EPDR',
    label: 'WatchGuard EPDR',
    group: 'watchguard',
    section: 'core',
    badge: 'Best',
    description: 'Full EPP + EDR in one agent — combines prevention, detection, and response with ThreatSync XDR integration.',
    tiers: WG_TIERS,
  },
  {
    key: 'Advanced EPDR',
    label: 'WatchGuard Advanced EPDR',
    group: 'watchguard',
    section: 'core',
    badge: 'Premium',
    description: 'EPDR plus advanced threat hunting, IOA policies, remote shell access, and priority threat intelligence.',
    tiers: WG_TIERS,
  },

  // ─── Endpoint Add-On Modules ───
  {
    key: 'Full Encryption',
    label: 'Full Encryption',
    group: 'watchguard',
    section: 'modules',
    description: 'Centrally manage BitLocker (Windows) and FileVault (macOS) encryption with recovery key escrow.',
    tiers: WG_TIERS,
  },
  {
    key: 'Patch Management',
    label: 'Patch Management',
    group: 'watchguard',
    section: 'modules',
    description: 'Discover, prioritise, and deploy OS and third-party application patches from a single console.',
    tiers: WG_TIERS,
  },
  {
    key: 'Advanced Reporting Tool',
    label: 'Advanced Reporting Tool',
    group: 'watchguard',
    section: 'modules',
    description: 'SIEM-ready advanced telemetry, custom dashboards, and automated compliance reporting.',
    tiers: WG_TIERS,
  },

  // ─── DNS & Mobile ───
  {
    key: 'DNSWatchGO',
    label: 'WatchGuard DNSWatchGO',
    group: 'watchguard',
    section: 'dns',
    description: 'DNS-level content filtering and phishing protection for users on and off the corporate network.',
    tiers: WG_TIERS,
  },

  // ─── Bundle ───
  {
    key: 'Passport',
    label: 'WatchGuard Passport',
    group: 'watchguard',
    section: 'bundle',
    description: 'All-in-one user security bundle: EPDR + AuthPoint MFA + DNSWatchGO in a single per-user license.',
    tiers: WG_TIERS,
  },

  // ─── Legacy Panda ───
  {
    key: 'Panda EPP+',
    label: 'Panda Endpoint Protection Plus',
    group: 'panda',
    section: 'panda',
    description: 'Legacy endpoint protection with centralised management, antivirus, anti-malware, and personal firewall.',
    tiers: ['1-10', '11-25', '26-50', '51-100', '101-250', '251-500', '501-1000', '1001-3000', '3000+'],
  },
  {
    key: 'Panda AD360',
    label: 'Panda Adaptive Defense 360',
    group: 'panda',
    section: 'panda',
    description: 'Legacy EPP + EDR with 100% classification of running processes and zero-trust application model.',
    tiers: ['1-50', '51-100'],
  },
  {
    key: 'Panda Patch Management',
    label: 'Panda Patch Management',
    group: 'panda',
    section: 'panda',
    description: 'Legacy patch management module for discovering vulnerabilities and deploying third-party patches.',
    tiers: ['1-10', '11-25', '26-50', '51-100', '101-250', '251-500', '501-1000', '1001-3000', '3000+'],
  },
];

function buildInitialSelections() {
  const selections = {};
  for (const product of PRODUCTS) {
    selections[product.key] = {
      tier: product.tiers[0],
      term: '1 Year',
    };
  }
  return selections;
}

export function useEndpointData() {
  const [selections, setSelections] = useState(buildInitialSelections);

  const setSelection = useCallback((productKey, field, value) => {
    setSelections((prev) => ({
      ...prev,
      [productKey]: { ...prev[productKey], [field]: value },
    }));
  }, []);

  const getAvailableTerms = useCallback((productKey, tier) => {
    return Object.keys(endpointProductSkus[productKey]?.[tier] || {});
  }, []);

  const getSkuForSelection = useCallback((productKey, tier, term) => {
    return endpointProductSkus[productKey]?.[tier]?.[term] || null;
  }, []);

  const getPriceForSelection = useCallback((productKey, tier, term) => {
    const sku = endpointProductSkus[productKey]?.[tier]?.[term];
    return sku ? getPriceBySku(sku) : null;
  }, []);

  return useMemo(() => ({
    PRODUCTS,
    selections,
    setSelection,
    getAvailableTerms,
    getSkuForSelection,
    getPriceForSelection,
  }), [selections, setSelection, getAvailableTerms, getSkuForSelection, getPriceForSelection]);
}
```

**Step 2: Commit**

```bash
git add src/components/EndpointCatalog/hooks/useEndpointData.js
git commit -m "feat(endpoint): add useEndpointData hook with product definitions"
```

---

### Task 3: Create the CSS module

**Files:**
- Create: `src/components/EndpointCatalog/EndpointCatalog.module.css`

**Reference:** Copy the structural patterns from `src/components/MdrNdrCatalog/MdrNdrCatalog.module.css`. The key classes needed are: `.catalog`, `.bannerWrap`, `.banner*`, `.tabBar`, `.tabBtn`, `.tabActive`, `.tabCount`, `.productGrid`, `.productCard`, `.cardBody`, `.cardName`, `.cardDesc`, `.fieldGroup`, `.fieldLabel`, `.selectField`, `.priceBlock`, `.price*`, `.addBtn`, `.skuLink`, `.skuCode`, `.comparisonTable`, `.sectionHeadline`.

**New/modified classes needed:**
- `.bannerFallbackEndpoint` — purple gradient: `linear-gradient(135deg, #1a1a2e 0%, #2d1640 40%, #7c3aed 100%)`
- `.coreGrid` — `grid-template-columns: repeat(4, 1fr)` for the 4 core products
- `.modulesGrid` — `grid-template-columns: repeat(3, 1fr)` for add-on modules
- `.singleCard` — `max-width: 340px` for sections with 1 product
- `.tierBadge` — small pill badge on core product cards (Good/Better/Best/Premium)
- `.tierBadgeGood`, `.tierBadgeBetter`, `.tierBadgeBest`, `.tierBadgePremium` — color variants
- `.infoCallout` — small info box linking to Legacy Panda tab
- `.sectionDivider` — section header with title

**Responsive breakpoints** (match MdrNdr pattern):
- `@media (max-width: 1200px)` — core grid 2-col, modules grid 2-col
- `@media (max-width: 768px)` — everything 1-col

**Step 1: Create the CSS file** — copy all relevant classes from MdrNdrCatalog.module.css, add the new endpoint-specific classes listed above.

**Step 2: Commit**

```bash
git add src/components/EndpointCatalog/EndpointCatalog.module.css
git commit -m "feat(endpoint): add EndpointCatalog CSS module"
```

---

### Task 4: Create the EndpointCatalog component

**Files:**
- Create: `src/components/EndpointCatalog/EndpointCatalog.jsx`

**Reference:** `src/components/MdrNdrCatalog/MdrNdrCatalog.jsx` — follow the same component structure:
1. Import styles, hook, QuoteContext, Phosphor icons, formatPrice
2. Define `ProductCard` component (same as MdrNdr but with optional `badge` prop)
3. Define `EndpointBanner` (gradient-only, no image — purple fallback gradient)
4. Define `CategoryTabs` — two tabs: "WatchGuard Endpoint" | "Legacy Panda"
5. Define `EndpointComparisonTable` — EPP vs EDR vs EPDR vs Advanced EPDR
6. Define main `EndpointCatalog` component that composes everything

**Main component structure:**

```jsx
export default function EndpointCatalog() {
  const [activeTab, setActiveTab] = useState('watchguard');
  const data = useEndpointData();
  const { dispatch } = useQuote();

  const handleAdd = (item) => dispatch({ type: 'ADD_ITEM', payload: item });

  const wgProducts = PRODUCTS.filter(p => p.group === 'watchguard');
  const pandaProducts = PRODUCTS.filter(p => p.group === 'panda');

  return (
    <div className={styles.catalog}>
      <EndpointBanner />
      <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={{ watchguard: wgProducts.length, panda: pandaProducts.length }} />

      {activeTab === 'watchguard' && (
        <>
          <InfoCallout onSwitch={() => setActiveTab('panda')} />

          <section>
            <h2>Core Endpoint Protection</h2>
            <div className={styles.coreGrid}>
              {wgProducts.filter(p => p.section === 'core').map(p => <ProductCard key={p.key} product={p} data={data} onAdd={handleAdd} />)}
            </div>
          </section>

          <section>
            <h2>Endpoint Add-On Modules</h2>
            <div className={styles.modulesGrid}>
              {wgProducts.filter(p => p.section === 'modules').map(p => <ProductCard ... />)}
            </div>
          </section>

          <section>
            <h2>DNS & Mobile Protection</h2>
            <div className={styles.singleCard}>
              <ProductCard ... />
            </div>
          </section>

          <section>
            <h2>User Security Bundle</h2>
            <div className={styles.singleCard}>
              <ProductCard ... />
            </div>
          </section>

          <EndpointComparisonTable />
        </>
      )}

      {activeTab === 'panda' && (
        <div className={styles.productGrid}>
          {pandaProducts.map(p => <ProductCard ... />)}
        </div>
      )}
    </div>
  );
}
```

**Comparison table features** (EPP vs EDR vs EPDR vs Advanced EPDR):

| Feature | EPP | EDR | EPDR | Adv EPDR |
|---------|-----|-----|------|----------|
| Anti-malware / Antivirus | check | x | check | check |
| Anti-exploit Protection | check | x | check | check |
| URL Filtering | check | x | check | check |
| Device Firewall | check | x | check | check |
| EDR / Threat Hunting | x | check | check | check |
| Zero-Trust App Service | x | check | check | check |
| ThreatSync (XDR) | x | check | check | check |
| Risk Monitoring & Vulnerability Assessment | x | check | check | check |
| IOA Scripts / Advanced Policies | x | x | x | check |
| Remote Shell Access | x | x | x | check |
| Indicators of Attack (Custom IOA) | x | x | x | check |
| Attack Surface Reduction | x | x | x | check |

**Step 1: Create the component file** with all sub-components.

**Step 2: Commit**

```bash
git add src/components/EndpointCatalog/EndpointCatalog.jsx
git commit -m "feat(endpoint): add EndpointCatalog component with tabbed product grid"
```

---

### Task 5: Wire up the route in App.jsx

**Files:**
- Modify: `src/App.jsx:9,39`

**Step 1: Add import and replace route**

Add at top with other imports:
```js
import EndpointCatalog from './components/EndpointCatalog/EndpointCatalog.jsx';
```

Replace line 39:
```jsx
// BEFORE:
<Route path="/endpoint" element={<ComingSoon title="Endpoint & Mobile" />} />

// AFTER:
<Route path="/endpoint" element={<EndpointCatalog />} />
```

**Step 2: Verify the page loads**

Run `npm run dev:frontend` and navigate to `http://localhost:5173/WatchGuard/endpoint`. Confirm:
- Banner renders with purple gradient
- Both tabs work
- Product cards show with correct prices from CSV
- Tier/term dropdowns update prices
- Add to cart works (items appear in quote cart)
- Legacy Panda tab shows 3 products with correct tier structures

**Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat(endpoint): wire EndpointCatalog route in App.jsx"
```

---

### Task 6: Visual QA and responsive testing

**Step 1: Test all product prices**

Spot-check a few SKUs against the CSV to confirm prices are correct:
- EPP 1-50 / 1yr → should be $63
- Advanced EPDR 1-50 / 3yr → should be $327
- DNSWatchGO 501-1000 / 1yr → should be $36
- Passport 1-50 / 1yr → should be $159
- Panda EPP+ 1-10 / 1yr → should be $63
- Panda AD360 1-50 / 3yr → should be $261

**Step 2: Test responsive layouts**

- Desktop (1400px+): core grid 4-col, modules 3-col
- Tablet (1200px): core grid 2-col, modules 2-col
- Mobile (768px): everything 1-col

**Step 3: Test comparison table**

- Verify check/X icons display correctly for all rows
- Verify table is horizontally scrollable on mobile

**Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix(endpoint): visual polish and responsive fixes"
```
