import React, { useState, useRef, useCallback } from 'react';
import styles from './ProductCatalog.module.css';
import { useQuote } from '../../context/QuoteContext.jsx';

// Hooks
import { useProductData, useSubscriptions, useDragScroll, useStickyHeader } from './hooks/index.js';

// Sub-components
import {
  StickyHeader,
  CategoryBanner,
  CategoryTabs,
  CategoryFilters,
  ProductColumns,
  SubscriptionRow,
  SpecsSection,
} from './parts/index.js';
import { CATEGORY_FILTERS } from './parts/CategoryFilters.jsx';

// Sections below the comparison grid
import SecurityBundles from '../SecurityBundles/SecurityBundles.jsx';
import SecuritySuiteTable from '../SecuritySuiteTable/SecuritySuiteTable.jsx';
import WifiSubscriptions from '../WifiSubscriptions/WifiSubscriptions.jsx';
import RenewalsSection from '../RenewalsSection/RenewalsSection.jsx';

// ── Helpers ──
const termLabel = (y) => (y === 1 ? '1 Year' : `${y} Years`);

const getImageSrc = (product) =>
  product.appliance?.full_sku
    ? `https://partner.leadersystems.com.au/Images/${product.appliance.full_sku}.jpg`
    : null;

// ════════════════════════════════════════════════════════════
//  ProductCatalog — orchestrator
// ════════════════════════════════════════════════════════════
export default function ProductCatalog({ onSelectHardware, onSelectSubscription }) {
  const { addItem } = useQuote();
  const scrollRef = useRef(null);

  // ── Data ──
  const { categories, products, productDetails, loading, activeTab, setActiveTab } =
    useProductData();

  // ── Subscriptions ──
  const subs = useSubscriptions(productDetails, activeTab);

  // ── UI state ──
  const [specsOpen, setSpecsOpen] = useState(true);
  const [filterOn, setFilterOn] = useState(false);

  // Reset filter when tab changes
  React.useEffect(() => setFilterOn(false), [activeTab]);

  // ── Filtered products ──
  const filteredProducts = React.useMemo(() => {
    if (!filterOn) return products;
    const cfg = CATEGORY_FILTERS[activeTab];
    if (!cfg) return products;
    return products.filter((p) => cfg.test(p.slug));
  }, [products, activeTab, filterOn]);

  // ── Behaviours ──
  useDragScroll(scrollRef, [products]);
  const { headerRowRef, stickyScrollRef, isSticky } = useStickyHeader(scrollRef, [products]);

  // ── Grid columns (shared across all rows) ──
  const gridCols = `200px repeat(${filteredProducts.length}, 220px)`;

  // ── Cart actions ──
  const handleAddHardware = useCallback(
    (product) => {
      if (!product.appliance) return;
      addItem({
        sku: product.appliance.sku_code,
        name: product.name,
        description: 'Appliance Only',
        unitPrice: product.appliance.msrp,
        image: getImageSrc(product),
        productUrl: product.appliance.url,
      });
      onSelectHardware?.(product);
    },
    [addItem, onSelectHardware],
  );

  const handleAddSubscription = useCallback(
    (product) => {
      const currentSub = subs.getCurrentSub(product.slug);
      if (!currentSub) return;
      addItem({
        sku: currentSub.sku_code,
        name: product.name,
        description: `${currentSub.subscription_type} (${termLabel(currentSub.term_years)})`,
        unitPrice: currentSub.msrp,
        image: getImageSrc(product),
        productUrl: currentSub.url,
      });
      onSelectSubscription?.(product, currentSub);
    },
    [addItem, subs, onSelectSubscription],
  );

  // ── Loading / error states ──
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading products...</div>
    );
  }
  if (!categories) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#ef4444' }}>
        Failed to load products.
      </div>
    );
  }

  // ── Render ──
  return (
    <div className={styles.catalog}>
      <StickyHeader
        products={filteredProducts}
        gridCols={gridCols}
        isSticky={isSticky}
        stickyScrollRef={stickyScrollRef}
      />

      <CategoryBanner activeTab={activeTab} setActiveTab={setActiveTab} />
      <CategoryTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categoryCounts={categories ? Object.fromEntries(
          Object.entries(categories).map(([k, v]) => [k, v.products?.length ?? 0])
        ) : null}
      />
      <CategoryFilters activeTab={activeTab} filterOn={filterOn} setFilterOn={setFilterOn} />

      {/* ═══ COMPARISON GRID ═══ */}
      <div className={styles.tableWrapper} ref={scrollRef}>
        <div className={styles.grid} style={{ gridTemplateColumns: gridCols }}>
          <ProductColumns
            products={filteredProducts}
            headerRowRef={headerRowRef}
            getImageSrc={getImageSrc}
            onAddHardware={handleAddHardware}
          />
          <SubscriptionRow
            products={filteredProducts}
            {...subs}
            onAddSubscription={handleAddSubscription}
          />
        </div>

        <SpecsSection
          activeTab={activeTab}
          products={filteredProducts}
          gridCols={gridCols}
          specsOpen={specsOpen}
          setSpecsOpen={setSpecsOpen}
        />
      </div>

      {/* ═══ SECURITY BUNDLES / WIFI LICENSE ═══ */}
      {(activeTab === 'tabletop' || activeTab === 'mseries') && (
        <>
          <SecurityBundles />
          <SecuritySuiteTable />
        </>
      )}

      {activeTab === 'wifi' && <WifiSubscriptions />}

      {/* ═══ RENEWALS & UPGRADES ═══ */}
      <RenewalsSection />
    </div>
  );
}
