/**
 * export-static-data.cjs
 * ──────────────────────
 * Reads the seeded SQLite database and exports all API responses
 * as static JSON files into public/static-data/.
 * These files are used as a fallback when the Express backend is unavailable
 * (e.g. on GitHub Pages).
 *
 * Run: node scripts/export-static-data.cjs
 */

const fs = require('fs');
const path = require('path');
const { initDb, DB_PATH } = require('../server/db');
const { seedIfNeeded } = require('../server/seed');
const { SECTION_DEFS } = require('../src/data/featureSpecs.shared.cjs');

const OUT_DIR = path.join(__dirname, '..', 'public', 'static-data');

// Ensure DB is up to date
seedIfNeeded();
const db = initDb();

// Create output directory
fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Category labels (must match server/index.js) ─────────
const CATEGORY_LABELS = {
  tabletop: 'Firebox Tabletop (T-Series)',
  mseries:  'Firebox Rackmount (M-Series)',
  wifi:     'Wi-Fi 6 Access Points',
  virtual:  'FireboxV Virtual Appliances',
  cloud:    'Firebox Cloud',
  mdr_ndr:  'MDR & NDR',
  endpoint: 'Endpoint & Mobile',
  identity: 'Identity & Access',
  email:    'Email Security',
  renewals: 'Appliance Renewals',
};

// ── Export /api/categories ────────────────────────────────
function exportCategories() {
  const groups = db.prepare(`
    SELECT id, slug, name, family, category, description, image_file
    FROM product_groups
    ORDER BY family, name
  `).all();

  const categories = {};

  for (const g of groups) {
    if (!categories[g.category]) {
      categories[g.category] = {
        label: CATEGORY_LABELS[g.category] || g.family,
        products: [],
      };
    }

    const representative = db.prepare(`
      SELECT sku_code, full_sku, name, msrp, url
      FROM skus
      WHERE product_group_id = ? AND sku_type IN ('appliance', 'per_user_subscription')
      ORDER BY sku_type, name
      LIMIT 1
    `).get(g.id);

    categories[g.category].products.push({ ...g, appliance: representative || null });
  }

  fs.writeFileSync(
    path.join(OUT_DIR, 'categories.json'),
    JSON.stringify(categories, null, 2),
  );
  console.log('  ✓ categories.json');
  return categories;
}

// ── Export /api/categories/:category ──────────────────────
function exportCategory(categoryName) {
  const groups = db.prepare(`
    SELECT id, slug, name, family, category, description, image_file
    FROM product_groups WHERE category = ? ORDER BY name
  `).all(categoryName);

  if (!groups.length) return;

  const result = groups.map(g => {
    const skus = db.prepare(`
      SELECT sku_code, full_sku, name, msrp, delivery_method, url,
             sku_type, subscription_type, term_years
      FROM skus WHERE product_group_id = ? ORDER BY name
    `).all(g.id);
    return { ...g, skus };
  });

  const data = { label: CATEGORY_LABELS[categoryName] || groups[0].family, products: result };
  fs.writeFileSync(
    path.join(OUT_DIR, `category-${categoryName}.json`),
    JSON.stringify(data, null, 2),
  );
  console.log(`  ✓ category-${categoryName}.json`);
}

// ── Export /api/products/:slug ────────────────────────────
function exportProduct(slug) {
  const group = db.prepare(`
    SELECT id, slug, name, family, category, description, image_file
    FROM product_groups WHERE slug = ?
  `).get(slug);

  if (!group) return null;

  const allSkus = db.prepare(`
    SELECT id, sku_code, full_sku, name, msrp, delivery_method, url, sku_type, subscription_type, term_years
    FROM skus WHERE product_group_id = ?
    ORDER BY sku_type, subscription_type, term_years
  `).all(group.id);

  const features = db.prepare(`
    SELECT feature_category, feature_name, feature_value, sort_order
    FROM product_features WHERE product_group_id = ?
    ORDER BY id
  `).all(group.id);

  const featureGroups = {};
  for (const f of features) {
    if (!featureGroups[f.feature_category]) featureGroups[f.feature_category] = [];
    featureGroups[f.feature_category].push({ name: f.feature_name, value: f.feature_value });
  }

  const appliance     = allSkus.find(s => s.sku_type === 'appliance') || null;
  const subscriptions = allSkus.filter(s => s.sku_type === 'subscription');
  const tradeUps      = allSkus.filter(s => s.sku_type === 'trade_up');
  const ha            = allSkus.filter(s => s.sku_type === 'high_availability');
  const bundles       = allSkus.filter(s => s.sku_type === 'activation_bundle');

  const product = {
    ...group,
    appliance,
    subscriptions,
    tradeUps,
    highAvailability: ha,
    activationBundles: bundles,
    specSections: SECTION_DEFS[group.category] || [],
    features: featureGroups,
  };

  fs.writeFileSync(
    path.join(OUT_DIR, `product-${slug}.json`),
    JSON.stringify(product, null, 2),
  );
  console.log(`  ✓ product-${slug}.json`);
  return product;
}

// ── Run ───────────────────────────────────────────────────
console.log('Exporting static data...');
const categories = exportCategories();

// Export per-category JSON files (for catalog pages)
for (const categoryName of Object.keys(categories)) {
  exportCategory(categoryName);
}

// Export per-product JSON files (for product detail pages)
let productCount = 0;
for (const cat of Object.values(categories)) {
  for (const p of cat.products) {
    exportProduct(p.slug);
    productCount++;
  }
}

db.close();
console.log(`\nDone! Exported ${Object.keys(categories).length} categories + ${productCount} products to ${OUT_DIR}`);
