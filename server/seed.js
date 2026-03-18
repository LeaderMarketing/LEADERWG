// Seed the database from WG Hardware SKUS_full.csv
// Prices come from the DBP_ex_GST column in the CSV
// Run: node server/seed.js

const fs = require('fs');
const path = require('path');
const { initDb, DB_PATH } = require('./db');
const { buildFeatureRecords } = require('../src/data/featureSpecs.shared.cjs');

const CSV_PATH = path.join(__dirname, 'data', 'WG Hardware SKUS_full.csv');
const DATA_DIR = path.join(__dirname, 'data');
const FEATURE_SPECS_PATH = path.join(__dirname, '..', 'src', 'data', 'featureSpecs.shared.cjs');

// ── Parse CSV (handles quoted fields with commas) ─────────
function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseMsrp(raw) {
  if (!raw) return 0;
  const cleaned = raw.replace(/[$,\s]/g, '');
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : val;
}

function findLatestLeaderPriceCsv() {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((file) => /^leader_dbp_prices_\d{4}-\d{2}-\d{2}\.csv$/i.test(file))
    .sort();

  if (files.length === 0) return null;
  return path.join(DATA_DIR, files[files.length - 1]);
}

function loadLeaderPriceMap() {
  const latestPriceCsv = findLatestLeaderPriceCsv();
  if (!latestPriceCsv) {
    return { priceMap: new Map(), source: null };
  }

  const raw = fs.readFileSync(latestPriceCsv, 'utf-8');
  const lines = raw.split(/\r?\n/).filter((line) => line.trim());
  const rows = lines.slice(1);
  const priceMap = new Map();

  for (const line of rows) {
    const fields = parseCsvLine(line);
    if (fields.length < 13) continue;

    const [skuInput, partNum, _productName, dbpExGst, _dbpIncGst, _rrpExGst, _rrpIncGst, _syd, _mel, _brs, _adl, _wa, status] = fields;
    const sku = (partNum || skuInput || '').trim();
    const normalizedStatus = (status || '').trim().toUpperCase();

    if (!sku || normalizedStatus === 'NOT FOUND') continue;

    const price = parseMsrp(dbpExGst);
    if (price > 0) {
      priceMap.set(sku, price);
    }
  }

  return {
    priceMap,
    source: path.basename(latestPriceCsv),
  };
}

function getSeedSourceFiles() {
  const latestLeaderPriceCsv = findLatestLeaderPriceCsv();
  return [CSV_PATH, latestLeaderPriceCsv, FEATURE_SPECS_PATH].filter(Boolean);
}

// ── Classify SKU type from name ───────────────────────────
function classifySku(name, deliveryMethod) {
  if (deliveryMethod === 'Physical') return { type: 'appliance', subType: null };
  const lower = name.toLowerCase();
  if (lower.includes('points activation bundle')) return { type: 'activation_bundle', subType: null };
  if (lower.includes('trade up')) {
    // Detect the underlying subscription type  
    if (lower.includes('total security'))       return { type: 'trade_up', subType: 'Total Security Suite' };
    if (lower.includes('basic security'))       return { type: 'trade_up', subType: 'Basic Security Suite' };
    return { type: 'trade_up', subType: null };
  }
  if (lower.includes('high availability'))      return { type: 'high_availability', subType: 'High Availability' };
  if (lower.includes('total security'))         return { type: 'subscription', subType: 'Total Security Suite' };
  if (lower.includes('basic security'))         return { type: 'subscription', subType: 'Basic Security Suite' };
  if (lower.includes('standard support'))       return { type: 'subscription', subType: 'Standard Support' };
  if (lower.includes('usp wi-fi'))              return { type: 'subscription', subType: 'USP Wi-Fi' };
  if (lower.includes('standard wi-fi'))         return { type: 'subscription', subType: 'Standard Wi-Fi' };
  return { type: 'other', subType: null };
}

// ── Extract term years from name ──────────────────────────
function extractTerm(name) {
  const m = name.match(/(\d+)[- ](?:year|yr)/i);
  if (m) return parseInt(m[1], 10);
  if (/1-month/i.test(name)) return 0; // Monthly subscription
  return null;
}

// ── Map Product Group to category ─────────────────────────
function familyToCategory(family) {
  if (family === 'Access Points') return 'wifi';
  if (family === 'M-Series')      return 'mseries';
  if (family === 'T-Series')      return 'tabletop';
  return 'other';
}

// ── Map product group slug to image file ──────────────────
const IMAGE_MAP = {
  'AP130':   'AP130.jpg',
  'AP230W':  'AP230W.jpg',
  'AP330':   'AP330.jpg',
  'AP332CR': 'AP332CER.jpg',
  'AP430CR': 'AP430CR.jpg',
  'AP432':   'AP432.jpg',
  'M290':    'm295.jpg',     // share image with M295 for now
  'M295':    'm295.jpg',
  'M390':    'm395.jpg',     // share image with M395 for now  
  'M395':    'm395.jpg',
  'M4800':   'm4800.jpg',
  'M495':    'm495.jpg',
  'M5800':   'm5800.jpg',
  'M590':    'm595.jpg',     // share image with M595 for now
  'M595':    'm595.jpg',
  'M690':    'm695.jpg',     // share image with M695 for now
  'M695':    'm695.jpg',
  'T115-W':  'T115-W.jpg',
  'T125':    'T125.jpg',
  'T125-W':  'T125-W.jpg',
  'T145':    'T145.jpg',
  'T145-W':  'T145.jpg',    // share image with T145 for now
  'T185':    'T185.jpg',
  'T25-W':   'T115-W.jpg',  // share image for now
  'T45-CW':  'T145.jpg',    // share image for now
  'T45-PoE': 'T145.jpg',    // share image for now
  'T45-W-PoE': 'T145.jpg',  // share image for now
};

// ── Map Product Group to friendly display name ────────────
function groupToDisplayName(slug, family) {
  if (family === 'Access Points') return `WatchGuard ${slug}`;
  if (family === 'M-Series')      return `Firebox ${slug}`;
  if (family === 'T-Series')      return `Firebox ${slug}`;
  return slug;
}

// ── Short descriptions (from existing productData.js) ─────
const DESCRIPTIONS = {
  'AP130':   'Entry-level Wi-Fi 6 for small offices and remote workers',
  'AP230W':  'Wall-plate AP with built-in switch for hospitality',
  'AP330':   'Medium-density AP for retail and K-12 schools',
  'AP332CR': 'Rugged outdoor AP for retail and manufacturing',
  'AP430CR': 'High-density outdoor AP for stadiums and campuses',
  'AP432':   'High-density 4x4 AP for large campuses',
  'M290':    'Rackmount UTM for small-medium businesses',
  'M295':    'Rackmount UTM for medium-sized businesses',
  'M390':    'Mid-range rackmount firewall for growing networks',
  'M395':    'High-throughput firewall for demanding networks',
  'M4800':   'Data center firewall with 40Gb fiber options',
  'M495':    'Enterprise-grade security with modular expansion',
  'M5800':   'Enterprise flagship with unrestricted VPN tunnels',
  'M590':    'High-performance rackmount for large organizations',
  'M595':    'Advanced threat protection for large organizations',
  'M690':    'High-capacity firewall for enterprise campuses',
  'M695':    'Maximum performance rackmount appliance',
  'T115-W':  'Entry-level firewall with built-in Wi-Fi 7 for small offices',
  'T125':    'Compact UTM appliance for small business networks',
  'T125-W':  'Compact UTM appliance with built-in Wi-Fi 7 antennas',
  'T145':    'Mid-range tabletop firewall with SFP+ connectivity',
  'T145-W':  'Mid-range tabletop firewall with Wi-Fi 7',
  'T185':    'High-performance tabletop for growing businesses',
  'T25-W':   'Entry-level firewall with Wi-Fi for home offices',
  'T45-CW':  'Cellular WAN tabletop firewall with 5G/LTE',
  'T45-PoE': 'Tabletop firewall with Power over Ethernet ports',
  'T45-W-PoE': 'Tabletop firewall with Wi-Fi and PoE ports',
};

// ── Seed shared feature data ──────────────────────────────
function seedFeatures(db, groupId, slug, category) {
  const insert = db.prepare(`
    INSERT INTO product_features (product_group_id, feature_category, feature_name, feature_value, sort_order)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const feature of buildFeatureRecords(category, slug)) {
    insert.run(
      groupId,
      feature.featureCategory,
      feature.featureName,
      feature.featureValue,
      feature.sortOrder,
    );
  }
}

// ── MAIN ──────────────────────────────────────────────────
function seed() {
  const raw = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = raw.split(/\r?\n/).filter(l => l.trim());
  const rows = lines.slice(1);
  const { priceMap, source: leaderPriceSource } = loadLeaderPriceMap();

  const db = initDb();

  // Clear existing data
  db.exec('DELETE FROM product_features');
  db.exec('DELETE FROM skus');
  db.exec('DELETE FROM product_groups');

  // Collect unique product groups
  const groupSet = new Map();
  const parsedRows = [];

  for (const line of rows) {
    const fields = parseCsvLine(line);
    if (fields.length < 7) continue;

    const [fullSku, name, priceRaw, deliveryMethod, family, group, url] = fields;
    const csvPrice = parseMsrp(priceRaw);
    const price = priceMap.get(fullSku) ?? csvPrice;
    const skuCode = fullSku.replace(/^NWG-/, '');
    const { type, subType } = classifySku(name, deliveryMethod);
    const term = extractTerm(name);

    if (!groupSet.has(group)) {
      groupSet.set(group, { family, category: familyToCategory(family) });
    }

    parsedRows.push({ fullSku, skuCode, name, msrp: price, deliveryMethod, family, group, url, type, subType, term });
  }

  // Insert product groups
  const insertGroup = db.prepare(`
    INSERT INTO product_groups (slug, name, family, category, description, image_file)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const groupIdMap = {};

  for (const [slug, info] of groupSet.entries()) {
    const displayName = groupToDisplayName(slug, info.family);
    const desc = DESCRIPTIONS[slug] || '';
    const img = IMAGE_MAP[slug] || null;
    const result = insertGroup.run(slug, displayName, info.family, info.category, desc, img);
    groupIdMap[slug] = result.lastInsertRowid;
    seedFeatures(db, result.lastInsertRowid, slug, info.category);
  }

  // Insert SKUs
  const insertSku = db.prepare(`
    INSERT INTO skus (sku_code, full_sku, name, msrp, delivery_method, product_group_id, url, sku_type, subscription_type, term_years)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((rows) => {
    for (const r of rows) {
      insertSku.run(
        r.skuCode, r.fullSku, r.name, r.msrp, r.deliveryMethod,
        groupIdMap[r.group], r.url, r.type, r.subType, r.term
      );
    }
  });

  insertMany(parsedRows);

  // Summary
  const groupCount = db.prepare('SELECT COUNT(*) as c FROM product_groups').get().c;
  const skuCount = db.prepare('SELECT COUNT(*) as c FROM skus').get().c;
  const featureCount = db.prepare('SELECT COUNT(*) as c FROM product_features').get().c;

  console.log(`Seeded successfully:`);
  console.log(`  ${groupCount} product groups`);
  console.log(`  ${skuCount} SKUs`);
  console.log(`  ${featureCount} feature entries`);
  if (leaderPriceSource) {
    console.log(`  pricing source override: ${leaderPriceSource}`);
  } else {
    console.log('  pricing source override: none (using WG Hardware SKUS_full.csv prices)');
  }

  db.close();
}

function seedIfNeeded() {
  const sourceFiles = getSeedSourceFiles();

  if (!fs.existsSync(DB_PATH)) {
    seed();
    return;
  }

  const dbMtime = fs.statSync(DB_PATH).mtimeMs;
  const newestSourceMtime = sourceFiles.reduce((latest, filePath) => {
    const mtime = fs.statSync(filePath).mtimeMs;
    return Math.max(latest, mtime);
  }, 0);

  if (newestSourceMtime > dbMtime) {
    seed();
  }
}

if (require.main === module) {
  seed();
}

module.exports = {
  seed,
  seedIfNeeded,
};
