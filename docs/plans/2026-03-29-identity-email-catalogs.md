# Identity & Access + Email Security Catalogs — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the two remaining catalog pages — Identity & Access (`/identity`) and Email Security (`/email`) — following the established EndpointCatalog / MdrNdrCatalog patterns.

**Architecture:** Each page follows the same 3-file pattern: SKU mapping (`productSkus/*.js`), custom hook (`hooks/use*Data.js`), and main component (`*Catalog.jsx` + CSS module). Both pages are simpler than Endpoint — Identity has 3 products (2 subscription + 1 hardware), Email has just 1 (Panda Email Protection).

**Tech Stack:** React 18, Vite, CSS Modules, Phosphor Icons, QuoteContext

---

## Products & SKUs

### Identity & Access (29 SKUs)

| Product | Key | Tiers | Terms | SKU Pattern | Notes |
|---------|-----|-------|-------|-------------|-------|
| WatchGuard AuthPoint | `AuthPoint` | 1-50, 51-100, 101-250, 251-500, 501-1000, 1001-5000, 5001+ | 1 Year, 3 Year | NWG-WGATH30{tier}{term} | MFA — per-user |
| AuthPoint Total Identity Security | `Total Identity Security` | same 7 tiers | 1 Year, 3 Year | NWG-WGTIS30{tier}{term} | MFA + dark web monitoring + corporate password manager |
| AuthPoint Hardware Token | `Hardware Token` | N/A (single SKU) | N/A | NWG-WG9011 | Physical token, 10-unit box, flat price $346 RRP |

**Comparison table features (AuthPoint vs Total Identity Security):**

| Feature | AuthPoint | Total Identity Security |
|---------|-----------|------------------------|
| Multi-Factor Authentication (MFA) | Y | Y |
| Single Sign-On (SSO) | Y | Y |
| Risk-Based Authentication | Y | Y |
| Push-Based Authentication | Y | Y |
| TOTP / QR Code Authentication | Y | Y |
| Hardware Token Support | Y | Y |
| Dark Web Credential Monitoring | N | Y |
| Corporate Password Manager | N | Y |
| Shared Vault & Credential Management | N | Y |

### Email Security (18 SKUs)

| Product | Key | Tiers | Terms | SKU Pattern | Notes |
|---------|-----|-------|-------|-------------|-------|
| Panda Email Protection | `Panda Email Protection` | 1-10, 11-25, 26-50, 51-100, 101-250, 251-500, 501-1000, 1001-3000, 3000+ | 1 Year, 3 Year | NWG-WGEMA0{tier}{term} | Cloud email gateway |

**Note:** WatchGuard spamBlocker is a per-appliance Firebox subscription (not per-user) — it belongs on the appliance/renewals pages, NOT on Email Security.

---

## Task 1: Identity & Access — SKU Mapping File

**Files:**
- Create: `src/data/productSkus/identity.js`

**Pattern:** Follow `src/data/productSkus/endpoint.js` exactly.

```js
export const identityProductSkus = {
  'AuthPoint': {
    '1-50':      { '1 Year': 'NWG-WGATH30101', '3 Year': 'NWG-WGATH30103' },
    '51-100':    { '1 Year': 'NWG-WGATH30201', '3 Year': 'NWG-WGATH30203' },
    '101-250':   { '1 Year': 'NWG-WGATH30301', '3 Year': 'NWG-WGATH30303' },
    '251-500':   { '1 Year': 'NWG-WGATH30401', '3 Year': 'NWG-WGATH30403' },
    '501-1000':  { '1 Year': 'NWG-WGATH30501', '3 Year': 'NWG-WGATH30503' },
    '1001-5000': { '1 Year': 'NWG-WGATH30601', '3 Year': 'NWG-WGATH30603' },
    '5001+':     { '1 Year': 'NWG-WGATH30701', '3 Year': 'NWG-WGATH30703' },
  },
  'Total Identity Security': {
    '1-50':      { '1 Year': 'NWG-WGTIS30101', '3 Year': 'NWG-WGTIS30103' },
    '51-100':    { '1 Year': 'NWG-WGTIS30201', '3 Year': 'NWG-WGTIS30203' },
    '101-250':   { '1 Year': 'NWG-WGTIS30301', '3 Year': 'NWG-WGTIS30303' },
    '251-500':   { '1 Year': 'NWG-WGTIS30401', '3 Year': 'NWG-WGTIS30403' },
    '501-1000':  { '1 Year': 'NWG-WGTIS30501', '3 Year': 'NWG-WGTIS30503' },
    '1001-5000': { '1 Year': 'NWG-WGTIS30601', '3 Year': 'NWG-WGTIS30603' },
    '5001+':     { '1 Year': 'NWG-WGTIS30701', '3 Year': 'NWG-WGTIS30703' },
  },
  'Hardware Token': {
    'single': { 'One-Time': 'NWG-WG9011' },
  },
};
```

**Commit:** `feat: add Identity & Access SKU mapping`

---

## Task 2: Identity & Access — Data Hook

**Files:**
- Create: `src/components/IdentityCatalog/hooks/useIdentityData.js`

**Pattern:** Follow `useEndpointData.js`.

```js
import { useState, useCallback, useMemo } from 'react';
import { identityProductSkus } from '../../../data/productSkus/identity.js';
import { getPriceBySku } from '../../../data/productPrices.js';

const TIERS = ['1-50', '51-100', '101-250', '251-500', '501-1000', '1001-5000', '5001+'];

export const PRODUCTS = [
  {
    key: 'AuthPoint',
    label: 'WatchGuard AuthPoint',
    group: 'identity',
    section: 'core',
    badge: 'Good',
    description: 'Cloud-based multi-factor authentication with push notifications, SSO, and risk-based access policies.',
    tiers: TIERS,
  },
  {
    key: 'Total Identity Security',
    label: 'AuthPoint Total Identity Security',
    group: 'identity',
    section: 'core',
    badge: 'Best',
    description: 'AuthPoint MFA plus dark web credential monitoring and a corporate password manager for complete identity protection.',
    tiers: TIERS,
  },
  {
    key: 'Hardware Token',
    label: 'AuthPoint Hardware Token',
    group: 'identity',
    section: 'accessories',
    description: 'OATH TOTP hardware token for users who cannot use the mobile app. Sold in 10-unit boxes.',
    tiers: ['single'],
    isHardware: true,
  },
];
```

Hook exports: `{ PRODUCTS, selections, setSelection, getAvailableTerms, getSkuForSelection, getPriceForSelection }`

**Commit:** `feat: add Identity & Access data hook`

---

## Task 3: Identity & Access — Main Component + CSS

**Files:**
- Create: `src/components/IdentityCatalog/IdentityCatalog.jsx`
- Create: `src/components/IdentityCatalog/IdentityCatalog.module.css`
- Modify: `src/App.jsx` — swap ComingSoon for IdentityCatalog on `/identity` route

**Component structure (simpler than Endpoint — no tabs needed, only 3 products):**

```
IdentityCatalog
├── IdentityBanner (gradient: blue-to-indigo theme)
│   headline: "Identity & Access Security"
│   description: about AuthPoint MFA platform
├── SectionHeader "Multi-Factor Authentication"
├── coreGrid (2-column — AuthPoint + Total Identity Security)
│   └── ProductCard × 2
├── IdentityComparisonTable (AuthPoint vs Total Identity Security)
├── SectionHeader "Hardware Accessories"
├── singleCardWrap
│   └── HardwareCard (special card — no tier/term dropdowns, just price + add to cart)
└── SKU_URLS mapping (will be empty until user provides URLs)
```

**Banner gradient:** `linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #3b82f6 100%)` (blue theme for identity)

**CSS:** Copy from EndpointCatalog.module.css, adjust:
- `.bannerFallbackIdentity` — blue gradient
- `.coreGrid` — 2-column (only 2 subscription products)
- Reuse all other classes unchanged (productCard, fieldGroup, priceBlock, addBtn, comparisonTable, etc.)

**HardwareCard** — special variant of ProductCard for the token:
- No tier/term dropdowns
- Shows "10-unit box" description
- Flat price display
- SKU: NWG-WG9011

**Comparison table:** 9 features × 2 products (AuthPoint vs Total Identity Security) — see matrix above

**App.jsx change:**
```jsx
import IdentityCatalog from './components/IdentityCatalog/IdentityCatalog.jsx';
// ...
<Route path="/identity" element={<IdentityCatalog />} />
```

**Commit:** `feat: add Identity & Access catalog page`

---

## Task 4: Email Security — SKU Mapping File

**Files:**
- Create: `src/data/productSkus/email.js`

```js
export const emailProductSkus = {
  'Panda Email Protection': {
    '1-10':      { '1 Year': 'NWG-WGEMA011', '3 Year': 'NWG-WGEMA013' },
    '11-25':     { '1 Year': 'NWG-WGEMA021', '3 Year': 'NWG-WGEMA023' },
    '26-50':     { '1 Year': 'NWG-WGEMA031', '3 Year': 'NWG-WGEMA033' },
    '51-100':    { '1 Year': 'NWG-WGEMA041', '3 Year': 'NWG-WGEMA043' },
    '101-250':   { '1 Year': 'NWG-WGEMA051', '3 Year': 'NWG-WGEMA053' },
    '251-500':   { '1 Year': 'NWG-WGEMA061', '3 Year': 'NWG-WGEMA063' },
    '501-1000':  { '1 Year': 'NWG-WGEMA071', '3 Year': 'NWG-WGEMA073' },
    '1001-3000': { '1 Year': 'NWG-WGEMA081', '3 Year': 'NWG-WGEMA083' },
    '3000+':     { '1 Year': 'NWG-WGEMA091', '3 Year': 'NWG-WGEMA093' },
  },
};
```

**Commit:** `feat: add Email Security SKU mapping`

---

## Task 5: Email Security — Data Hook

**Files:**
- Create: `src/components/EmailCatalog/hooks/useEmailData.js`

```js
import { useState, useCallback, useMemo } from 'react';
import { emailProductSkus } from '../../../data/productSkus/email.js';
import { getPriceBySku } from '../../../data/productPrices.js';

const PANDA_TIERS = ['1-10', '11-25', '26-50', '51-100', '101-250', '251-500', '501-1000', '1001-3000', '3000+'];

export const PRODUCTS = [
  {
    key: 'Panda Email Protection',
    label: 'Panda Email Protection',
    group: 'email',
    section: 'core',
    description: 'Cloud-based email gateway with multi-layer anti-spam, anti-phishing, anti-malware, and content filtering for inbound and outbound email.',
    tiers: PANDA_TIERS,
  },
];
```

Hook exports same interface as other hooks.

**Commit:** `feat: add Email Security data hook`

---

## Task 6: Email Security — Main Component + CSS

**Files:**
- Create: `src/components/EmailCatalog/EmailCatalog.jsx`
- Create: `src/components/EmailCatalog/EmailCatalog.module.css`
- Modify: `src/App.jsx` — swap ComingSoon for EmailCatalog on `/email` route

**Component structure (simplest catalog — single product, no tabs):**

```
EmailCatalog
├── EmailBanner (gradient: orange/amber theme)
│   headline: "Email Security"
│   description: about cloud email protection
├── SectionHeader "Cloud Email Protection"
├── singleCardWrap
│   └── ProductCard (Panda Email Protection)
├── Feature highlights section (simple bullet list or info card — not a comparison table since there's only 1 product)
└── SKU_URLS mapping (empty until user provides URLs)
```

**Banner gradient:** `linear-gradient(135deg, #1a1a2e 0%, #4a1a00 40%, #f59e0b 100%)` (amber/orange theme for email)

**Feature highlights** — since there's only 1 product, instead of a comparison table, show an info section with key features:
- Multi-layer anti-spam engine
- Anti-phishing with URL rewriting
- Anti-malware scanning (attachments)
- Content filtering policies
- Outbound email protection
- Quarantine management
- Supports Exchange, Microsoft 365, Google Workspace

**CSS:** Minimal — copy subset from EndpointCatalog:
- Banner styles
- Single card styles (productCard, cardBody, fieldGroup, priceBlock, addBtn)
- Feature highlights section (reuse infoCallout or create simple list)
- Responsive breakpoints

**App.jsx change:**
```jsx
import EmailCatalog from './components/EmailCatalog/EmailCatalog.jsx';
// ...
<Route path="/email" element={<EmailCatalog />} />
```

**Commit:** `feat: add Email Security catalog page`

---

## Task 7: SKU CSV Files for Partner Portal URLs

**Files:**
- Create: `docs/identity-skus.csv`
- Create: `docs/email-skus.csv`

Generate CSV files with columns: `Product,Tier,Term,SKU,URL` (URL column empty) for all SKUs on both pages. User will fill in the partner portal URLs, then we'll wire them up as `SKU_URLS` mappings (same as we did for Endpoint).

**Identity CSV:** 29 rows (14 AuthPoint + 14 Total Identity Security + 1 Hardware Token)
**Email CSV:** 18 rows (9 × 2 terms for Panda Email Protection)

**Commit:** `docs: add Identity & Email SKU CSVs for partner portal URLs`

---

## Execution Notes

- **No tabs needed** on either page — Identity has only WatchGuard products (no legacy Panda split), Email has only 1 product
- **Hardware Token card** is the only special case — needs a simpler card variant without tier/term dropdowns
- **Product images** — use same pattern: `https://www.leadersystems.com.au/Images/${sku}.jpg`
- **SKU_URLS** — start empty, user will provide URLs after seeing the CSV
- Both pages should feel lighter/simpler than Endpoint since they have fewer products
