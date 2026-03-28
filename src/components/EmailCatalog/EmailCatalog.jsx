import React from 'react';
import {
  ShoppingCartSimple,
  CheckCircle,
} from '@phosphor-icons/react';
import styles from './EmailCatalog.module.css';
import { useEmailData, PRODUCTS } from './hooks/useEmailData.js';
import { useQuote } from '../../context/QuoteContext.jsx';
import { formatPrice } from '../../data/productPrices.js';

/* ─── SKU → Partner Portal URLs ─── */
const SKU_URLS = {
  'NWG-WGEMA011': 'https://partner.leadersystems.com.au/products.html?C9LLfojDO9c=gbfka9UICyYqWxNbdhvKqw==nsZ0s6noFRytLl2p/PBMV5alSDI=',
  'NWG-WGEMA013': 'https://partner.leadersystems.com.au/products.html?TI1ndeX2aY0=mpr+C7Uz4qumuAAgPL+29Q==h/1w3sG1q1oAi/GKUrMlelXvBLY=',
  'NWG-WGEMA021': 'https://partner.leadersystems.com.au/products.html?Km+Ydtk1n/Q=9opSp+ISNND5xjnaIHoNdw==mjykHKSqaC1hKj2AnaTI/+jiH/s=',
  'NWG-WGEMA023': 'https://partner.leadersystems.com.au/products.html?Sxc+hOGpLFY=yl5uma2JA8hGgZVQRH/4Aw==wEV1y6SbE4v12gHzB5Zx2sd5joo=',
  'NWG-WGEMA031': 'https://partner.leadersystems.com.au/products.html?2o3NwnflOzY=PaNUz4wXn1b3gdNEriZ4zA==X8wWnd5LqXPCyh3sUrEL6PuL7N8=',
  'NWG-WGEMA033': 'https://partner.leadersystems.com.au/products.html?veURCUC1SrQ=4b9vowPCn+A3bt/dolZmCQ==YzEDjW5LCDCH/SdcWdC+16YdoNg=',
  'NWG-WGEMA041': 'https://partner.leadersystems.com.au/products.html?HjWbUQVFhuY=kflfHI3XhytfvEaUAScSYw==/iMFsc8O6R7+lQ52ZRnZNUevcvI=',
  'NWG-WGEMA043': 'https://partner.leadersystems.com.au/products.html?m6ycxrBqDeE=CMec3zLuYLgZX5VBjR9DIg==dPH5st9WLxm+UNxZUM6OM6OtJos=',
  'NWG-WGEMA051': 'https://partner.leadersystems.com.au/products.html?sQD+pXmBYfY=P8fBTYHPxm0lW3vsiBUKCw==lnF74Fv/CNGJKKcn1BWVu69vAaU=',
  'NWG-WGEMA053': 'https://partner.leadersystems.com.au/products.html?iWWn8mm8DAU=yuUiOPd0tplBXCW4ZckwVw==moj0cJGn0RPK7O6iMwEL0u8FRhI=',
  'NWG-WGEMA061': 'https://partner.leadersystems.com.au/products.html?stZw9khJ1js=mA4G/NIHZRpx9aIwJx+zJw==Ptj9Cak/vWSbV3CyqOmOeBMwlYw=',
  'NWG-WGEMA063': 'https://partner.leadersystems.com.au/products.html?5gqjaAlZgP8=aaKNnTSj4oM1SF9bCehCJQ==6B5WSWVltntHxWk2tNVsDEJOQ2E=',
  'NWG-WGEMA071': 'https://partner.leadersystems.com.au/products.html?CWWypiVCF88=75FcNLWwTO22NwzWSqr2hQ==VsjNddVk39ophVLKusjqQTsvvVA=',
  'NWG-WGEMA073': 'https://partner.leadersystems.com.au/products.html?REI46siHHOw=y1dszI1zmyXGf74UQDvjCQ==fVEUQESCKsZE48JbllSpjtblbpg=',
  'NWG-WGEMA081': 'https://partner.leadersystems.com.au/products.html?wIyLA+7fGuY=rxrz3dBxeLLG1A1f+evkmg==3Shi3/nYFiKRJA43KFni16Uqi6o=',
  'NWG-WGEMA083': 'https://partner.leadersystems.com.au/products.html?BnTF7UlOAwo=92gJMZvOtvH0e+um6dQn2g==Ev8mRlLN88U8KWKKi6qoCZdHCWQ=',
  'NWG-WGEMA091': 'https://partner.leadersystems.com.au/products.html?CYKRElsWXxA=dxgTyQ1vy8Ews07GjUp9bA==5vLjCInQI91bWHp+xE4emr2kukY=',
  'NWG-WGEMA093': 'https://partner.leadersystems.com.au/products.html?7sbtPcqqtWY=YMR41iF0zQ0DPA5+tvF1Gw==k+pDFKElajxTWRsDU4n2p56ky2Q=',
};

function getSkuUrl(sku) {
  return SKU_URLS[sku] || '';
}

/* ═══════════════════════════════════════════════════════════
   Reusable SKU display
   ═══════════════════════════════════════════════════════════ */
function SkuLink({ sku }) {
  if (!sku) return null;
  const url = getSkuUrl(sku);
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.skuLink}>
        {sku}
      </a>
    );
  }
  return <span className={styles.skuCode}>{sku}</span>;
}

/* ═══════════════════════════════════════════════════════════
   Product Card
   ═══════════════════════════════════════════════════════════ */
function ProductCard({ product, data, onAdd }) {
  const { selections, setSelection, getAvailableTerms, getSkuForSelection, getPriceForSelection } = data;
  const sel = selections[product.key] || {};
  const tier = sel.tier || product.tiers[0];
  const terms = getAvailableTerms(product.key, tier);
  const term = sel.term || terms[0];
  const sku = getSkuForSelection(product.key, tier, term);
  const price = getPriceForSelection(product.key, tier, term);

  const handleTierChange = (e) => {
    const newTier = e.target.value;
    setSelection(product.key, 'tier', newTier);
    const newTerms = getAvailableTerms(product.key, newTier);
    if (newTerms.length && !newTerms.includes(sel.term)) {
      setSelection(product.key, 'term', newTerms[0]);
    }
  };

  const imageUrl = sku ? `https://www.leadersystems.com.au/Images/${sku}.jpg` : null;

  return (
    <div className={styles.productCard}>
      {imageUrl && (
        <div className={styles.cardImageWrap}>
          <img src={imageUrl} alt={product.label} className={styles.cardImage} />
        </div>
      )}
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardName}>{product.label}</h3>
        </div>
        <p className={styles.cardDesc}>{product.description}</p>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>License Tier</label>
          <select
            className={styles.selectField}
            value={tier}
            onChange={handleTierChange}
          >
            {product.tiers.map((t) => (
              <option key={t} value={t}>{t} users</option>
            ))}
          </select>
        </div>

        {terms.length > 0 && (
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Subscription Term</label>
            <select
              className={styles.selectField}
              value={term}
              onChange={(e) => setSelection(product.key, 'term', e.target.value)}
            >
              {terms.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.priceBlock}>
          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(price)}</span>
            <span className={styles.priceNote}>MSRP <span className={styles.perSeat}>per user</span></span>
          </div>
        </div>

        <button
          className={styles.addBtn}
          disabled={!sku}
          onClick={() =>
            onAdd({
              sku,
              name: product.label,
              description: `${tier} users (${term})`,
              unitPrice: price || 0,
            })
          }
          title="Add to quote cart"
        >
          <ShoppingCartSimple size={14} weight="bold" />
          Add to Cart
        </button>
        <SkuLink sku={sku} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Banner
   ═══════════════════════════════════════════════════════════ */
function EmailBanner() {
  return (
    <div className={styles.bannerWrap}>
      <div className={`${styles.bannerFallback} ${styles.bannerFallbackEmail}`} />
      <div className={styles.bannerOverlay}>
        <h2 className={styles.bannerHeadline}>Email Security</h2>
        <p className={styles.bannerDescription}>
          Protect your inbox from spam, phishing, malware, and data leaks with cloud-based
          email security. Multi-layer filtering for inbound and outbound email with
          quarantine management and content policies.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Feature Highlights
   ═══════════════════════════════════════════════════════════ */
const FEATURES = [
  'Multi-layer anti-spam engine',
  'Anti-phishing with URL rewriting',
  'Anti-malware attachment scanning',
  'Content filtering policies',
  'Outbound email protection',
  'Quarantine management',
  'Supports Exchange, Microsoft 365, Google Workspace',
  'Centralised cloud management',
  'Compliance & audit reporting',
];

function FeatureHighlights() {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.featuresHeadline}>Key Capabilities</h2>
      <p className={styles.featuresDesc}>
        Panda Email Protection delivers comprehensive cloud-based email security
        for businesses of all sizes.
      </p>
      <div className={styles.featuresGrid}>
        {FEATURES.map((feature) => (
          <div key={feature} className={styles.featureCard}>
            <CheckCircle size={18} weight="fill" className={styles.featureIcon} />
            <span className={styles.featureText}>{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Section Header
   ═══════════════════════════════════════════════════════════ */
function SectionHeader({ title, subtitle }) {
  return (
    <div className={styles.sectionDivider}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main EmailCatalog Component
   ═══════════════════════════════════════════════════════════ */
export default function EmailCatalog() {
  const data = useEmailData();
  const { addItem } = useQuote();
  const handleAdd = (item) => addItem(item);

  return (
    <div className={styles.catalog}>
      <EmailBanner />

      <SectionHeader
        title="Cloud Email Protection"
        subtitle="Cloud-based email gateway filtering for inbound and outbound email across Exchange, Microsoft 365, and Google Workspace."
      />
      <div className={styles.singleCardWrap}>
        {PRODUCTS.map((product) => (
          <ProductCard key={product.key} product={product} data={data} onAdd={handleAdd} />
        ))}
      </div>

      <FeatureHighlights />
    </div>
  );
}
