# Endpoint & Mobile Catalog — Design

## Overview

New page at `/endpoint` replacing the "Coming Soon" placeholder. Displays WatchGuard endpoint security, mobile protection, and DNS filtering products as per-seat/per-user license subscriptions with tiered pricing from the WGdata CSV.

## Products (12 total)

### WatchGuard Endpoint tab (9 products)

**Core Endpoint Protection** (4 cards — 7 license tiers, 1yr/3yr):
- WatchGuard EPP (Endpoint Protection Platform) — badge: "Good"
- WatchGuard EDR (Endpoint Detection & Response) — badge: "Better"
- WatchGuard EPDR (EPP + EDR combined) — badge: "Best"
- WatchGuard Advanced EPDR — badge: "Premium"

**Endpoint Add-On Modules** (3 cards — 7 license tiers, 1yr/3yr):
- Full Encryption
- Patch Management
- Advanced Reporting Tool

**DNS & Mobile Protection** (1 card — 7 license tiers, 1yr/3yr):
- WatchGuard DNSWatchGO

**User Security Bundle** (1 card — 7 license tiers, 1yr/3yr):
- WatchGuard Passport (EPDR + AuthPoint + DNSWatchGO)

### Legacy Panda tab (3 products)

All use 9 license tiers (1-10, 11-25, 26-50, 51-100, 101-250, 251-500, 501-1000, 1001-3000, 3000+), 1yr/3yr:
- Panda Endpoint Protection Plus
- Panda Adaptive Defense 360
- Panda Patch Management

## Files

### New files
| File | Purpose |
|------|---------|
| `src/components/EndpointCatalog/EndpointCatalog.jsx` | Main page component |
| `src/components/EndpointCatalog/EndpointCatalog.module.css` | Page styles |
| `src/components/EndpointCatalog/hooks/useEndpointData.js` | Selection state + price lookups |
| `src/data/productSkus/endpoint.js` | SKU mappings for all 12 products |

### Modified files
| File | Change |
|------|--------|
| `src/App.jsx` | Import EndpointCatalog, replace ComingSoon at `/endpoint` |

## Page Layout

### Banner
- Full-width gradient hero: `#1a1a2e` -> `#2d1640` -> `#7c3aed` (purple, distinct from MDR red)
- Headline: "Endpoint & Mobile Security"
- Subtitle describing the product family

### Tab bar
- "WatchGuard Endpoint" (default active) | "Legacy Panda"
- Same tab styling as MdrNdr catalog

### WatchGuard Endpoint tab content
1. Info callout: "Looking for Panda AD360 or EPP+? See the Legacy Panda tab."
2. Section: Core Endpoint Protection — 4-column card grid with tier badges
3. Section: Endpoint Add-On Modules — 3-column card grid
4. Section: DNS & Mobile Protection — single card, left-aligned
5. Section: User Security Bundle — single card, left-aligned
6. Comparison table: EPP vs EDR vs EPDR vs Advanced EPDR (check/X feature matrix)

### Legacy Panda tab content
- 3-column card grid with the 3 Panda products

### Card anatomy (each product)
- Product name + short description
- Tier badge (Good/Better/Best/Premium) on core products only
- License tier dropdown
- Term dropdown (1 Year / 3 Year)
- Price display (per user, from WGdata CSV RRP)
- SKU code display
- Add to Cart button

## Data Flow

```
src/data/WGdata_*.csv
        |
        v
src/data/productPrices.js (getPriceBySku)
        |
        v
src/data/productSkus/endpoint.js (SKU mappings)
        |
        v
hooks/useEndpointData.js (selection state, price resolution)
        |
        v
EndpointCatalog.jsx (renders cards, handles add-to-cart via QuoteContext)
```

Same pattern as MdrNdrCatalog. No backend changes needed.

## Comparison Table Features

| Feature | EPP | EDR | EPDR | Adv EPDR |
|---------|-----|-----|------|----------|
| Anti-malware / Antivirus | Y | - | Y | Y |
| Anti-exploit / Anti-phishing | Y | - | Y | Y |
| URL filtering | Y | - | Y | Y |
| Device firewall | Y | - | Y | Y |
| EDR / Threat hunting | - | Y | Y | Y |
| Zero-Trust Application Service | - | Y | Y | Y |
| Threat Sync (XDR) | - | Y | Y | Y |
| IOA scripts / Advanced policies | - | - | - | Y |
| Remote shell access | - | - | - | Y |
| Indicators of Attack (IOA) | - | - | - | Y |

## Styling approach

- Own CSS module (`EndpointCatalog.module.css`)
- Follows MdrNdrCatalog patterns: card grid, tab bar, section headers, banner
- Same color system: `#e81410` for CTAs, `#1a1a2e` for dark headers
- Purple gradient banner to differentiate from other tabs
- Responsive: 4-col -> 2-col -> 1-col on smaller screens
