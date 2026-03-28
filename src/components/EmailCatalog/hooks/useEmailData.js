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

export function useEmailData() {
  const [selections, setSelections] = useState(buildInitialSelections);

  const setSelection = useCallback((productKey, field, value) => {
    setSelections((prev) => ({
      ...prev,
      [productKey]: { ...prev[productKey], [field]: value },
    }));
  }, []);

  const getAvailableTerms = useCallback((productKey, tier) => {
    return Object.keys(emailProductSkus[productKey]?.[tier] || {});
  }, []);

  const getSkuForSelection = useCallback((productKey, tier, term) => {
    return emailProductSkus[productKey]?.[tier]?.[term] || null;
  }, []);

  const getPriceForSelection = useCallback((productKey, tier, term) => {
    const sku = emailProductSkus[productKey]?.[tier]?.[term];
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
