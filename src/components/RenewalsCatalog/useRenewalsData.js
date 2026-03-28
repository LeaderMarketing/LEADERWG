import { useState, useCallback, useMemo } from 'react';
import { fireboxApplianceSkus } from '../../data/productSkus/fireboxAppliances.js';
import { fireboxVProductSkus } from '../../data/productSkus/fireboxV.js';
import { fireboxCloudProductSkus } from '../../data/productSkus/fireboxCloud.js';
import { getPriceBySku } from '../../data/productPrices.js';

// ── Tab definitions ──
export const TABS = [
  { key: 'tabletop', label: 'Firebox T-Series' },
  { key: 'mseries', label: 'Firebox M-Series' },
  { key: 'virtual', label: 'FireboxV' },
  { key: 'cloud', label: 'Firebox Cloud' },
];

// ── Model lists per tab ──
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

const VIRTUAL_MODELS = Object.keys(fireboxVProductSkus).sort();
const CLOUD_MODELS = Object.keys(fireboxCloudProductSkus).sort();

// ── Unified SKU lookup — maps tab → SKU data source ──
function getSkuSource(tab) {
  switch (tab) {
    case 'tabletop': return fireboxApplianceSkus;
    case 'mseries': return fireboxApplianceSkus;
    case 'virtual': return fireboxVProductSkus;
    case 'cloud': return fireboxCloudProductSkus;
    default: return {};
  }
}

function getModels(tab) {
  switch (tab) {
    case 'tabletop': return T_SERIES_MODELS;
    case 'mseries': return M_SERIES_MODELS;
    case 'virtual': return VIRTUAL_MODELS;
    case 'cloud': return CLOUD_MODELS;
    default: return [];
  }
}

export function getModelPrefix(tab) {
  switch (tab) {
    case 'tabletop': return 'Firebox';
    case 'mseries': return 'Firebox';
    case 'virtual': return '';
    case 'cloud': return '';
    default: return '';
  }
}

// ── Section definitions (service type options per section) ──
export const SECTIONS = {
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

// ── Filter models that have at least one SKU in a given section for a tab ──
function modelsForSection(tab, sectionId) {
  const models = getModels(tab);
  const source = getSkuSource(tab);
  const serviceKeys = SECTIONS[sectionId].map((o) => o.key);
  return models.filter((model) =>
    serviceKeys.some((svc) => source[model]?.[svc]),
  );
}

export function useRenewalsData() {
  const [activeTab, setActiveTab] = useState('tabletop');
  const [cardState, setCardState] = useState({});

  const models = useMemo(() => getModels(activeTab), [activeTab]);
  const skuSource = useMemo(() => getSkuSource(activeTab), [activeTab]);
  const modelPrefix = getModelPrefix(activeTab);

  const getCardState = useCallback(
    (cardId) => {
      const sectionModels = models;
      const firstModel = sectionModels[0] || '';
      const defaults = { model: firstModel, serviceType: '', term: '1 Year' };
      return cardState[cardId] ? { ...defaults, ...cardState[cardId] } : defaults;
    },
    [cardState, models],
  );

  const updateCardState = useCallback((cardId, field, value) => {
    setCardState((prev) => {
      const current = prev[cardId] || {};
      const updated = { ...current, [field]: value };

      if (field === 'model' || field === 'serviceType') {
        const svcKey = field === 'serviceType' ? value : updated.serviceType;
        const modelKey = field === 'model' ? value : updated.model;
        const src = getSkuSource(activeTab);
        const terms = Object.keys(src[modelKey]?.[svcKey] || {});
        updated.term = terms[0] || '1 Year';
      }

      return { ...prev, [cardId]: updated };
    });
  }, [activeTab]);

  const getAvailableTerms = useCallback((model, serviceType) => {
    return Object.keys(skuSource[model]?.[serviceType] || {});
  }, [skuSource]);

  const getSkuForSelection = useCallback((model, serviceType, term) => {
    return skuSource[model]?.[serviceType]?.[term] || null;
  }, [skuSource]);

  const getPriceForSelection = useCallback((model, serviceType, term) => {
    const sku = skuSource[model]?.[serviceType]?.[term];
    return sku ? getPriceBySku(sku) : null;
  }, [skuSource]);

  const getAvailableOptions = useCallback((model, sectionId) => {
    return SECTIONS[sectionId].filter(
      (opt) => skuSource[model]?.[opt.key],
    );
  }, [skuSource]);

  const getModelsForSection = useCallback((sectionId) => {
    return modelsForSection(activeTab, sectionId);
  }, [activeTab]);

  return useMemo(
    () => ({
      activeTab,
      setActiveTab,
      models,
      modelPrefix,
      SECTIONS,
      getModelsForSection,
      getCardState,
      updateCardState,
      getAvailableTerms,
      getSkuForSelection,
      getPriceForSelection,
      getAvailableOptions,
    }),
    [activeTab, setActiveTab, models, modelPrefix, getModelsForSection, getCardState, updateCardState, getAvailableTerms, getSkuForSelection, getPriceForSelection, getAvailableOptions],
  );
}
