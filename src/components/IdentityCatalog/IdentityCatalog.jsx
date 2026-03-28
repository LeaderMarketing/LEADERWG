import React from 'react';
import {
  ShoppingCartSimple,
  CheckCircle,
  XCircle,
} from '@phosphor-icons/react';
import styles from './IdentityCatalog.module.css';
import { useIdentityData, PRODUCTS } from './hooks/useIdentityData.js';
import { useQuote } from '../../context/QuoteContext.jsx';
import { formatPrice } from '../../data/productPrices.js';

/* ─── SKU → Partner Portal URLs ─── */
const SKU_URLS = {
  // ─── AuthPoint ───
  'NWG-WGATH30101': 'https://partner.leadersystems.com.au/products.html?BxMsV9F32VM=9d+Zocs/gD4A91egLJftLw==jYL9WEwjwLriN0u3TYWhmRFIlpBjXg==',
  'NWG-WGATH30103': 'https://partner.leadersystems.com.au/products.html?o2zMPzaxFQ4=YyRzB2XoosBUvc5fzTLKzA==8S0tr5vmuolFNaBZ0JPZMReiZ8+QKQ==',
  'NWG-WGATH30201': 'https://partner.leadersystems.com.au/products.html?tq1cgQ31hbg=wS0SR94uQgt6PGF/oerVZg==ErbkdvBm4t9xex4xL7v9CIEaRImjVg==',
  'NWG-WGATH30203': 'https://partner.leadersystems.com.au/products.html?ehh6iC5l1dE=VplI7HNJMZ6OBXRx+YXhwA==XYQnBIOyfDqOJK88IwTyOzRdhDnRoA==',
  'NWG-WGATH30301': 'https://partner.leadersystems.com.au/products.html?MPPWzA/T/ps=lnPK4sNcnZgioY7ja+QtDQ==i3+5Sn4AUDfXD1Mbt/sWALzAbjXrVw==',
  'NWG-WGATH30303': 'https://partner.leadersystems.com.au/products.html?5nH3f6TeIXA=07AejVXYZS9pwuTRnWco9g==ztqkdtAWxbeZOP7flSp5c4MhQXoqlw==',
  'NWG-WGATH30401': 'https://partner.leadersystems.com.au/products.html?Ltem6Ul6XDU=zBWj3bmGuxQE9D5eyIB3nQ==uLmFrwck1cbec9f2b+FwTUsapRIjqw==',
  'NWG-WGATH30403': 'https://partner.leadersystems.com.au/products.html?tz3SacodrZA=EO1+fPJXKSkRJEJPIlht7w==t0AUBqNUJzECUD8IaPF7IUyhAmpuzQ==',
  'NWG-WGATH30501': 'https://partner.leadersystems.com.au/products.html?znPWVD3059Y=PpCzVuLI/W7aF7JDipldAQ==187sXX6apwaUcNEUIZ9Y0lILdrAOhg==',
  'NWG-WGATH30503': 'https://partner.leadersystems.com.au/products.html?2OXfJY+/ddc=PlVJVFROhQ1Uyn1snmRuTg==tzGGpHQuhTzBhQAEKE+HtF+doBPhOw==',
  'NWG-WGATH30601': 'https://partner.leadersystems.com.au/products.html?ARl+muRLzto=53qSgQt2xl49Ixv56GUWQg==GXQouGYwAPZctQTJb3PbDl0FaQ+Rxg==',
  'NWG-WGATH30603': 'https://partner.leadersystems.com.au/products.html?4Ig+64bt9O4=0FGo3Gk5lZx6zxH4kFrerw==v2ts1OvZtyV8Xw/B7yZgMDKVD1mnvQ==',
  'NWG-WGATH30701': 'https://partner.leadersystems.com.au/products.html?3zD6NQLZCeE=rbn6Cv8Olua6J0Q0wBKH1Q==9NGbJJqV8jEOYyaSR9j5glFwmQ7wig==',
  'NWG-WGATH30703': 'https://partner.leadersystems.com.au/products.html?6chBJk1r5io=1Dz8CpQaaIeZN6NK46KoNg==0z/6pe98U4BOmMlWF2lQOPdbiYToXA==',
  // ─── Total Identity Security ───
  'NWG-WGTIS30101': 'https://partner.leadersystems.com.au/products.html?vXqN/UXrqAI=zaqmGCZllF80U3oFitBgUA==pxDijevYxJepJoZnHS7m5oOJrwzRRg==',
  'NWG-WGTIS30103': 'https://partner.leadersystems.com.au/products.html?Rkf1+XHoMr8=JVtJauOJKIPr/KPxXpc7Lw==HTOugwNcK7Qy2xLumaOFJ03cyanVlg==',
  'NWG-WGTIS30201': 'https://partner.leadersystems.com.au/products.html?RKAVPA0fKhE=TPASRFDQjWPuuZSLU2Y2fg==hONojiE206JxElgRMUx+Bnravr2FZw==',
  'NWG-WGTIS30203': 'https://partner.leadersystems.com.au/products.html?oeO2+bjR5zQ=sYNuceqTi6mVlJoOE4wbzA==nElrtFTSX9FNYJ7dz0XEhFplq0J1Yg==',
  'NWG-WGTIS30301': 'https://partner.leadersystems.com.au/products.html?MYuo8WyqQHQ=JT8n/6JryRKIUp3u5ZVuzw==UK7BDMcJ9A8IRj+D2L1qRgRAAuidyQ==',
  'NWG-WGTIS30303': 'https://partner.leadersystems.com.au/products.html?b2tdg4LSp+s=Sme2mUXBhrkvwCqOxOkk1A==8ZAm+fG+Ido15swavcWG+/cW9931jw==',
  'NWG-WGTIS30401': 'https://partner.leadersystems.com.au/products.html?0xkVIWqhJYg=PYuTpfNeCQR8vWroxqjJVQ==uzxPKXoP/VcQLF4qjm8p4BkKkNq7qg==',
  'NWG-WGTIS30403': 'https://partner.leadersystems.com.au/products.html?XWEu/cB4qwM=V5XLkNs/coaLHZRzJFfW0A==CX3aRjttMWqTEbM9kBJtSAyLqIb5IA==',
  'NWG-WGTIS30501': 'https://partner.leadersystems.com.au/products.html?MfBTHwZLK80=NOW/nlkttuCneZltdDndPw==j+KrNH3HwiXtsVsmANvZu1SV3Kbcew==',
  'NWG-WGTIS30503': 'https://partner.leadersystems.com.au/products.html?+KpRgzCRUQ4=/BewiN8+76y613IfY98BDw==PEtfMFyDCiSovCt6TIIcVzQCU0XRaw==',
  'NWG-WGTIS30601': 'https://partner.leadersystems.com.au/products.html?9lxcarADPzY=7sUqo6LsiiTLbQcVAmMhIw==F/qmB+LmaKODR9Q22w9boqlcINVEOA==',
  'NWG-WGTIS30603': 'https://partner.leadersystems.com.au/products.html?V0LDHMrv+UE=QeBEptoBatZcjPSMI9H0+Q==v1lgk/svfbYT6RDov/MKYb0AAnYGyg==',
  'NWG-WGTIS30701': 'https://partner.leadersystems.com.au/products.html?01UpY5ykCjQ=I/dzak7pD7IVwPK0ly20pQ==1SGaV8ljD7AmsKyfk+5Cxqtn5FicxA==',
  'NWG-WGTIS30703': 'https://partner.leadersystems.com.au/products.html?RVpxNC77++4=SxxTVREq2fP3/CI2U+1IEQ==Eo5tRIODnQSO7HHu5jIduJNaZbSLng==',
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
   Product Card — subscription products
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
function IdentityBanner() {
  return (
    <div className={styles.bannerWrap}>
      <div className={`${styles.bannerFallback} ${styles.bannerFallbackIdentity}`} />
      <div className={styles.bannerOverlay}>
        <h2 className={styles.bannerHeadline}>Identity & Access Security</h2>
        <p className={styles.bannerDescription}>
          Secure every login with WatchGuard AuthPoint — cloud-based multi-factor authentication
          that protects your workforce from credential theft, phishing, and unauthorized access.
          Add dark web monitoring and password management with Total Identity Security.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Comparison Table — AuthPoint vs Total Identity Security
   ═══════════════════════════════════════════════════════════ */
function Check() {
  return <CheckCircle size={18} weight="fill" className={styles.checkIcon} />;
}
function NoCheck() {
  return <XCircle size={16} weight="regular" className={styles.noCheckIcon} />;
}

const COMPARISON_ROWS = [
  { feature: 'Multi-Factor Authentication (MFA)', authpoint: true, tis: true },
  { feature: 'Single Sign-On (SSO)', authpoint: true, tis: true },
  { feature: 'Risk-Based Authentication', authpoint: true, tis: true },
  { feature: 'Push-Based Authentication', authpoint: true, tis: true },
  { feature: 'TOTP / QR Code Authentication', authpoint: true, tis: true },
  { feature: 'Hardware Token Support', authpoint: true, tis: true },
  { feature: 'Dark Web Credential Monitoring', authpoint: false, tis: true },
  { feature: 'Corporate Password Manager', authpoint: false, tis: true },
  { feature: 'Shared Vault & Credential Management', authpoint: false, tis: true },
];

function IdentityComparisonTable() {
  return (
    <section className={styles.comparisonSection}>
      <h2 className={styles.comparisonHeadline}>AuthPoint vs Total Identity Security</h2>
      <p className={styles.comparisonDesc}>
        Both solutions provide robust multi-factor authentication. Total Identity Security
        adds dark web monitoring and a corporate password manager for complete credential protection.
      </p>
      <div className={styles.tableWrap}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th>Feature</th>
              <th>AuthPoint</th>
              <th>Total Identity Security</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.feature}>
                <td><strong>{row.feature}</strong></td>
                <td>{row.authpoint ? <Check /> : <NoCheck />}</td>
                <td>{row.tis ? <Check /> : <NoCheck />}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
   Main IdentityCatalog Component
   ═══════════════════════════════════════════════════════════ */
export default function IdentityCatalog() {
  const data = useIdentityData();
  const { addItem } = useQuote();
  const handleAdd = (item) => addItem(item);

  const coreProducts = PRODUCTS.filter((p) => p.section === 'core');

  return (
    <div className={styles.catalog}>
      <IdentityBanner />

      {/* Core MFA Products — 2-column */}
      <SectionHeader
        title="Multi-Factor Authentication"
        subtitle="Choose between standard MFA or the complete identity security bundle with dark web monitoring and password management."
      />
      <div className={styles.coreGrid}>
        {coreProducts.map((product) => (
          <ProductCard key={product.key} product={product} data={data} onAdd={handleAdd} />
        ))}
      </div>

      {/* Comparison Table */}
      <IdentityComparisonTable />
    </div>
  );
}
