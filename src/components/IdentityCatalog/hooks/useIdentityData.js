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
    description: 'Cloud-based multi-factor authentication with push notifications, SSO, and risk-based access policies.',
    tiers: TIERS,
  },
  {
    key: 'Total Identity Security',
    label: 'AuthPoint Total Identity Security',
    group: 'identity',
    section: 'core',
    description: 'AuthPoint MFA plus dark web credential monitoring and a corporate password manager for complete identity protection.',
    tiers: TIERS,
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

export function useIdentityData() {
  const [selections, setSelections] = useState(buildInitialSelections);

  const setSelection = useCallback((productKey, field, value) => {
    setSelections((prev) => ({
      ...prev,
      [productKey]: { ...prev[productKey], [field]: value },
    }));
  }, []);

  const getAvailableTerms = useCallback((productKey, tier) => {
    return Object.keys(identityProductSkus[productKey]?.[tier] || {});
  }, []);

  const getSkuForSelection = useCallback((productKey, tier, term) => {
    return identityProductSkus[productKey]?.[tier]?.[term] || null;
  }, []);

  const getPriceForSelection = useCallback((productKey, tier, term) => {
    const sku = identityProductSkus[productKey]?.[tier]?.[term];
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
