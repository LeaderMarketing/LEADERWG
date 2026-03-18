import { getSkuCode } from './productSkus.js';

const leaderPriceFiles = import.meta.glob('../../server/data/leader_dbp_prices_*.csv', {
  eager: true,
  import: 'default',
  query: '?raw',
});

function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  fields.push(current.trim());
  return fields;
}

function parsePrice(rawValue) {
  if (!rawValue) return null;

  const normalized = rawValue.replace(/[$,\s]/g, '');
  const numeric = Number.parseFloat(normalized);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

function getLatestLeaderPriceFile() {
  const entries = Object.entries(leaderPriceFiles).sort(([leftPath], [rightPath]) =>
    leftPath.localeCompare(rightPath),
  );

  if (entries.length === 0) return null;
  return entries[entries.length - 1];
}

function buildPriceLookup() {
  const latestFile = getLatestLeaderPriceFile();
  if (!latestFile) {
    return {
      sourceFile: null,
      pricesBySku: new Map(),
    };
  }

  const [sourceFile, csvRaw] = latestFile;
  const pricesBySku = new Map();
  const lines = csvRaw.split(/\r?\n/).filter((line) => line.trim());

  for (const line of lines.slice(1)) {
    const fields = parseCsvLine(line);
    if (fields.length < 13) continue;

    const [skuInput, partNum, _productName, dbpExGst, _dbpIncGst, _rrpExGst, _rrpIncGst, _syd, _mel, _brs, _adl, _wa, status] = fields;
    const sku = (partNum || skuInput || '').trim();
    const normalizedStatus = (status || '').trim().toUpperCase();
    const price = parsePrice(dbpExGst);

    if (!sku || normalizedStatus === 'NOT FOUND' || price === null) continue;
    pricesBySku.set(sku, price);
  }

  return {
    sourceFile,
    pricesBySku,
  };
}

const { sourceFile, pricesBySku } = buildPriceLookup();

export const pricingSourceFile = sourceFile;

export function getPriceBySku(sku) {
  if (!sku) return null;
  return pricesBySku.get(sku) ?? null;
}

export function getProductPrice(productName, serviceType, term = null) {
  const sku = getSkuCode(productName, serviceType, term);
  return getPriceBySku(sku);
}

export function getAppliancePrice(productName) {
  return getProductPrice(productName, 'Appliance Only', null);
}

export function getSubscriptionPrice(productName, serviceType, term) {
  return getProductPrice(productName, serviceType, term);
}

export function formatPrice(price) {
  if (price === null || price === undefined || price === 0) {
    return 'TBC';
  }

  return `$${price.toLocaleString('en-AU')}`;
}

export function getStartingPrice(productName, isWifi = false) {
  const primaryService = isWifi ? 'Standard Wi-Fi' : 'Standard Support';
  return getProductPrice(productName, primaryService, '1 Year') ?? getAppliancePrice(productName);
}

export default pricesBySku;
