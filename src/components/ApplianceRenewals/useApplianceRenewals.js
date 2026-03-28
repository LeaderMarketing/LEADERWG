import { useState, useCallback, useMemo } from 'react';
import { fireboxApplianceSkus } from '../../data/productSkus/fireboxAppliances.js';
import { getPriceBySku } from '../../data/productPrices.js';

// ── Model lists split by series ──
const T_SERIES_MODELS = Object.keys(fireboxApplianceSkus)
  .filter((k) => k.startsWith('T'))
  .sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    return numA - numB || a.localeCompare(b);
  });

const M_SERIES_MODELS = Object.keys(fireboxApplianceSkus)
  .filter((k) => k.startsWith('M'))
  .sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    return numA - numB || a.localeCompare(b);
  });

// ── Section definitions (service type options per section) ──
const SECTIONS = {
  renewal: [
    { label: 'Basic Security Renewal', key: 'Basic Security Renewal' },
    { label: 'Total Security Renewal', key: 'Total Security Renewal' },
  ],
  support: [
    { label: 'Standard Support Renewal', key: 'Standard Support Renewal' },
    { label: 'Gold Support Renewal', key: 'Gold Support Renewal' },
  ],
  tradeUp: [
    { label: 'Trade Up to Basic Security', key: 'Trade Up Basic Security' },
    { label: 'Trade Up to Total Security', key: 'Trade Up Total Security' },
  ],
  cloud: [
    { label: 'Cloud 1-Month Data Retention', key: 'Cloud 1-Month Data Retention' },
  ],
  individual: [
    { label: 'WebBlocker', key: 'WebBlocker' },
    { label: 'spamBlocker', key: 'spamBlocker' },
    { label: 'Gateway AntiVirus', key: 'Gateway AntiVirus' },
    { label: 'Intrusion Prevention Service', key: 'Intrusion Prevention Service' },
    { label: 'Reputation Enabled Defense', key: 'Reputation Enabled Defense' },
    { label: 'Application Control', key: 'Application Control' },
    { label: 'APT Blocker', key: 'APT Blocker' },
    { label: 'Network Discovery', key: 'Network Discovery' },
  ],
};

// ── Filter models that have at least one SKU in a given section ──
function modelsForSection(modelList, sectionId) {
  const serviceKeys = SECTIONS[sectionId].map((o) => o.key);
  return modelList.filter((model) =>
    serviceKeys.some((svc) => fireboxApplianceSkus[model]?.[svc]),
  );
}

export function useApplianceRenewals() {
  // Per-card state: keyed by `${series}-${sectionId}` e.g. "t-renewal", "m-support"
  const [cardState, setCardState] = useState({});

  const getCardKey = useCallback((series, sectionId) => `${series}-${sectionId}`, []);

  const getCardState = useCallback(
    (series, sectionId) => {
      const key = `${series}-${sectionId}`;
      // Always compute defaults, then merge saved state on top
      const models = series === 't' ? T_SERIES_MODELS : M_SERIES_MODELS;
      const sectionModels = modelsForSection(models, sectionId);
      const firstModel = sectionModels[0] || models[0];
      const firstService = SECTIONS[sectionId][0]?.key;
      const terms = Object.keys(fireboxApplianceSkus[firstModel]?.[firstService] || {});
      const defaults = { model: firstModel, serviceType: firstService, term: terms[0] || '1 Year' };
      return cardState[key] ? { ...defaults, ...cardState[key] } : defaults;
    },
    [cardState],
  );

  const updateCardState = useCallback((series, sectionId, field, value) => {
    setCardState((prev) => {
      const key = `${series}-${sectionId}`;
      const current = prev[key] || {};
      const updated = { ...current, [field]: value };

      // Reset term when model or serviceType changes
      if (field === 'model' || field === 'serviceType') {
        const svcKey = field === 'serviceType' ? value : updated.serviceType || SECTIONS[sectionId][0]?.key;
        const modelKey = field === 'model' ? value : updated.model;
        const terms = Object.keys(fireboxApplianceSkus[modelKey]?.[svcKey] || {});
        updated.term = terms[0] || '1 Year';
      }

      return { ...prev, [key]: updated };
    });
  }, []);

  const getAvailableTerms = useCallback((model, serviceType) => {
    return Object.keys(fireboxApplianceSkus[model]?.[serviceType] || {});
  }, []);

  const getSkuForSelection = useCallback((model, serviceType, term) => {
    return fireboxApplianceSkus[model]?.[serviceType]?.[term] || null;
  }, []);

  const getPriceForSelection = useCallback((model, serviceType, term) => {
    const sku = fireboxApplianceSkus[model]?.[serviceType]?.[term];
    return sku ? getPriceBySku(sku) : null;
  }, []);

  // Filter service options to only those available for the selected model
  const getAvailableOptions = useCallback((model, sectionId) => {
    return SECTIONS[sectionId].filter(
      (opt) => fireboxApplianceSkus[model]?.[opt.key],
    );
  }, []);

  return useMemo(
    () => ({
      T_SERIES_MODELS,
      M_SERIES_MODELS,
      SECTIONS,
      modelsForSection,
      getCardState,
      updateCardState,
      getAvailableTerms,
      getSkuForSelection,
      getPriceForSelection,
      getAvailableOptions,
    }),
    [getCardState, updateCardState, getAvailableTerms, getSkuForSelection, getPriceForSelection, getAvailableOptions],
  );
}
