import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ShoppingCartSimple, CaretDown, CaretLeft, CaretRight, Package } from '@phosphor-icons/react';
import styles from './ProductCatalog.module.css';
import { useQuote } from '../../context/QuoteContext.jsx';
import { SECTION_DEFS, getSpecValue } from '../../data/featureSpecs.js';
import SecurityBundles from '../SecurityBundles/SecurityBundles.jsx';
import SecuritySuiteTable from '../SecuritySuiteTable/SecuritySuiteTable.jsx';
import WifiSubscriptions from '../WifiSubscriptions/WifiSubscriptions.jsx';
import RenewalsSection from '../RenewalsSection/RenewalsSection.jsx';

const BASE_URL = import.meta.env.BASE_URL;

const BANNERS = {
  tabletop: `${BASE_URL}banners/Tabletop_banner.jpg`,
  mseries:  `${BASE_URL}banners/Rackmount_banner.jpg`,
  wifi:     `${BASE_URL}banners/Access-points_banner.jpg`,
};

const TAB_ORDER = ['tabletop', 'mseries', 'wifi'];

const TAB_LABELS = {
  tabletop: 'Firebox Tabletop',
  mseries:  'Firebox M Series',
  wifi:     'Wi-Fi 6 Access Points',
};

const formatPrice = (p) => {
  if (!p || p === 0) return '$0';
  return '$' + Math.round(p).toLocaleString('en-AU');
};

const termLabel = (y) => (y === 1 ? '1 Year' : `${y} Years`);

export default function ProductCatalog({ onSelectHardware, onSelectSubscription }) {
  const { addItem } = useQuote();
  const scrollRef = useRef(null);

  const [categories, setCategories] = useState(null);
  const [activeTab, setActiveTab] = useState('tabletop');
  const [loading, setLoading] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(true);

  // Per-product subscription state: { [slug]: { subType, termYears, details } }
  const [productStates, setProductStates] = useState({});

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Products for the active tab
  const products = useMemo(() => categories?.[activeTab]?.products || [], [categories, activeTab]);

  // Fetch full details for each product in the active category
  useEffect(() => {
    if (products.length === 0) return;
    products.forEach((p) => {
      if (productStates[p.slug]?.details) return;
      fetch(`/api/products/${p.slug}`)
        .then((r) => r.json())
        .then((data) => {
          const types = [...new Set((data.subscriptions || []).map((s) => s.subscription_type))];
          setProductStates((prev) => ({
            ...prev,
            [p.slug]: {
              details: data,
              subType: types[0] || '',
              termYears: 1,
            },
          }));
        })
        .catch(console.error);
    });
  }, [products]);

  // Reset when tab changes
  useEffect(() => {
    setProductStates({});
    setSpecsOpen(true);
  }, [activeTab]);

  // ── Subscription helpers ──
  const getSubState = (slug) => productStates[slug] || {};

  const setSubType = (slug, subType) => {
    setProductStates((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], subType, termYears: 1 },
    }));
  };

  const setTermYears = (slug, termYears) => {
    setProductStates((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], termYears },
    }));
  };

  const getSubscriptionTypes = (slug) => {
    const d = getSubState(slug).details;
    if (!d?.subscriptions) return [];
    return [...new Set(d.subscriptions.map((s) => s.subscription_type))];
  };

  const getAvailableTerms = (slug) => {
    const st = getSubState(slug);
    const d = st.details;
    if (!d?.subscriptions) return [];
    return [
      ...new Set(
        d.subscriptions
          .filter((s) => s.subscription_type === st.subType)
          .map((s) => s.term_years)
          .filter((t) => t > 0)
      ),
    ].sort((a, b) => a - b);
  };

  const getCurrentSub = (slug) => {
    const st = getSubState(slug);
    const d = st.details;
    if (!d?.subscriptions) return null;
    return (
      d.subscriptions.find(
        (s) => s.subscription_type === st.subType && s.term_years === st.termYears
      ) || null
    );
  };

  const getImageSrc = (product) => {
    return product.appliance?.full_sku
      ? `https://partner.leadersystems.com.au/Images/${product.appliance.full_sku}.jpg`
      : null;
  };

  // ── Add to cart ──
  const handleAddHardware = (product) => {
    if (!product.appliance) return;
    addItem({
      sku: product.appliance.sku_code,
      name: product.name,
      description: 'Appliance Only',
      unitPrice: product.appliance.msrp,
      image: getImageSrc(product),
      productUrl: product.appliance.url,
    });
    if (onSelectHardware) onSelectHardware(product);
  };

  const handleAddSubscription = (product) => {
    const currentSub = getCurrentSub(product.slug);
    if (!currentSub) return;
    addItem({
      sku: currentSub.sku_code,
      name: product.name,
      description: `${currentSub.subscription_type} (${termLabel(currentSub.term_years)})`,
      unitPrice: currentSub.msrp,
      image: getImageSrc(product),
      productUrl: currentSub.url,
    });
    if (onSelectSubscription) onSelectSubscription(product, currentSub);
  };

  // ── Drag to scroll ──
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const down = (e) => {
      if (e.target.closest('button, select, a, input')) return;
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };
    const end = () => { isDown = false; el.style.cursor = 'grab'; };
    const move = (e) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - ((e.pageX - el.offsetLeft) - startX) * 1.5;
    };
    el.addEventListener('mousedown', down);
    el.addEventListener('mouseleave', end);
    el.addEventListener('mouseup', end);
    el.addEventListener('mousemove', move);
    return () => {
      el.removeEventListener('mousedown', down);
      el.removeEventListener('mouseleave', end);
      el.removeEventListener('mouseup', end);
      el.removeEventListener('mousemove', move);
    };
  }, [products]);

  // ── Spec sections ──
  const specSections = SECTION_DEFS[activeTab] || [];
  const numProducts = products.length;
  const gridCols = `200px repeat(${numProducts}, 220px)`;

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading products...</div>;
  }
  if (!categories) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#ef4444' }}>Failed to load products.</div>;
  }

  return (
    <div className={styles.catalog}>
      {/* Banner */}
      <div className={styles.bannerWrap}>
        <img src={BANNERS[activeTab]} alt={TAB_LABELS[activeTab]} className={styles.banner} />
        <button
          className={`${styles.bannerNav} ${styles.bannerNavLeft}`}
          onClick={() => {
            const idx = TAB_ORDER.indexOf(activeTab);
            setActiveTab(TAB_ORDER[(idx - 1 + TAB_ORDER.length) % TAB_ORDER.length]);
          }}
          aria-label="Previous category"
        >
          <CaretLeft size={18} weight="bold" />
        </button>
        <button
          className={`${styles.bannerNav} ${styles.bannerNavRight}`}
          onClick={() => {
            const idx = TAB_ORDER.indexOf(activeTab);
            setActiveTab(TAB_ORDER[(idx + 1) % TAB_ORDER.length]);
          }}
          aria-label="Next category"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabBar}>
        {TAB_ORDER.map((key) => (
          <button
            key={key}
            className={`${styles.tabBtn} ${activeTab === key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {TAB_LABELS[key]}
          </button>
        ))}
      </div>

      {/* ═══ COMPARISON GRID ═══ */}
      <div className={styles.tableWrapper} ref={scrollRef}>
        <div className={styles.grid} style={{ gridTemplateColumns: gridCols }}>
          {/* Row: Product cards */}
          <div className={styles.headerLabel} />
          {products.map((product) => {
            const imgSrc = getImageSrc(product);
            return (
              <div key={product.slug} className={styles.productCard}>
                <div className={styles.productImageWrap}>
                  {imgSrc ? (
                    <img src={imgSrc} alt={product.name} className={styles.productImage} />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <Package size={24} weight="duotone" />
                    </div>
                  )}
                </div>
                {product.appliance?.url ? (
                  <a href={product.appliance.url} target="_blank" rel="noopener noreferrer" className={styles.productName}>{product.name}</a>
                ) : (
                  <h3 className={styles.productName}>{product.name}</h3>
                )}
                <p className={styles.productDesc}>{product.description}</p>
              </div>
            );
          })}

          {/* Row: Price */}
          <div className={styles.priceLabel}></div>
          {products.map((product) => (
            <div key={`price-${product.slug}`} className={styles.priceCell}>
              <span className={styles.priceValue}>{formatPrice(product.appliance?.msrp)}</span>
              <span className={styles.priceNote}>ex.GST</span>
              <span className={styles.priceInfo}>
                i
                <span className={styles.priceTooltip}>Pricing is for appliance only. License not included and requires separate purchase.</span>
              </span>
            </div>
          ))}

          {/* Row: Appliance */}
          <div className={styles.actionLabel}></div>
          {products.map((product) => (
            <div key={`hw-${product.slug}`} className={styles.actionCell}>
              <button className={styles.addHwBtn} onClick={() => handleAddHardware(product)} title="Add appliance to quote cart">
                <ShoppingCartSimple size={14} weight="bold" />
                Add to Cart
              </button>
              {product.appliance?.url && (
                <a href={product.appliance.url} target="_blank" rel="noopener noreferrer" className={styles.skuLink}>
                  {product.appliance.sku_code}
                </a>
              )}
            </div>
          ))}

          {/* ═══ SUBSCRIPTION SECTION (inside grid) ═══ */}
          <div className={styles.subLabelCell}>Watchguard Licence</div>
          {products.map((product) => {
            const subTypes = getSubscriptionTypes(product.slug);
            const terms = getAvailableTerms(product.slug);
            const st = getSubState(product.slug);
            const currentSub = getCurrentSub(product.slug);
            return (
              <div key={`sub-${product.slug}`} className={styles.subCell}>
                {subTypes.length > 0 ? (
                  <>
                    <select className={styles.subSelect} value={st.subType || ''} onChange={(e) => setSubType(product.slug, e.target.value)}>
                      {subTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select className={styles.subSelect} value={st.termYears || 1} onChange={(e) => setTermYears(product.slug, Number(e.target.value))}>
                      {terms.map((y) => <option key={y} value={y}>{termLabel(y)}</option>)}
                    </select>
                    <div className={styles.subPrice}>
                      {currentSub ? formatPrice(currentSub.msrp) : '—'}
                      {currentSub && <span className={styles.priceNote}>ex.GST</span>}
                    </div>
                    <button className={styles.addSubBtn} onClick={() => handleAddSubscription(product)} disabled={!currentSub} title="Add subscription to quote cart">
                      <ShoppingCartSimple size={14} weight="bold" />
                      Add to Cart
                    </button>
                    {currentSub?.url && (
                      <a href={currentSub.url} target="_blank" rel="noopener noreferrer" className={styles.skuLink}>
                        {currentSub.sku_code}
                      </a>
                    )}
                  </>
                ) : (
                  <span className={styles.noSub}>—</span>
                )}
              </div>
            );
          })}
        </div>

        {/* ═══ COLLAPSIBLE SPECS ═══ */}
        <button className={styles.specsToggle} onClick={() => setSpecsOpen(!specsOpen)}>
          Compare Specs
          <span className={`${styles.chevron} ${specsOpen ? styles.chevronOpen : ''}`}>
            <CaretDown size={14} weight="bold" />
          </span>
        </button>

        <div className={`${styles.collapseWrapper} ${specsOpen ? styles.collapseOpen : ''}`}>
          <div className={styles.collapseInner}>
            <div className={styles.specsGrid} style={{ gridTemplateColumns: gridCols }}>
              {specSections.map((section, sIdx) => (
                <React.Fragment key={`sec-${sIdx}`}>
                  <div className={styles.sectionHeader}>
                    {section.title}
                  </div>
                  {products.map((product) => (
                    <div key={`sechdr-${sIdx}-${product.slug}`} className={styles.sectionHeaderSpacer} />
                  ))}
                  {section.rows.map((row, rIdx) => (
                    <React.Fragment key={`row-${sIdx}-${rIdx}`}>
                      <div className={styles.featureLabel}>{row.label}</div>
                      {products.map((product) => (
                        <div key={`${product.slug}-${row.key}`} className={styles.cell}>
                          {getSpecValue(product.slug, row.key)}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SECURITY BUNDLES / WIFI LICENSE SECTION ═══ */}
      {(activeTab === 'tabletop' || activeTab === 'mseries') && (
        <>
          <SecurityBundles />
          <SecuritySuiteTable />
        </>
      )}

      {activeTab === 'wifi' && (
        <WifiSubscriptions />
      )}

      {/* ═══ RENEWALS & UPGRADES ═══ */}
      <RenewalsSection />
    </div>
  );
}
