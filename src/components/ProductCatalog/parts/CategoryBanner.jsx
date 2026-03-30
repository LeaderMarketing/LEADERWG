import React from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import styles from '../ProductCatalog.module.css';

const TAB_ORDER = ['tabletop', 'mseries', 'wifi'];
const TAB_LABELS = {
  tabletop: 'Firebox Tabletop',
  mseries:  'Firebox M Series',
  wifi:     'Wi-Fi 6 Access Points',
};

const BANNER_CONTENT = {
  tabletop: {
    headline: 'Firebox Tabletop Firewalls',
    description:
      'Tabletop Firebox Appliances with built-in PoE+ with optional Wi-Fi or 5G. Ideal for small offices and branches.',
    imageAlt: 'Firebox Tabletop Firewall appliance',
  },
  mseries: {
    headline: 'Firebox Rackmount Firewalls',
    description:
      'Purpose-built for high-demand environments like distributed enterprises and data centers delivering up to 5x faster VPN and 3x UTM throughput.',
    imageAlt: 'Firebox Rackmount Firewall appliance',
  },
  wifi: {
    headline: 'Indoor & Outdoor Access Points',
    description:
      'Deliver fast speeds and secure WPA3 encryption — suited for remote workers, IoT, offices, and rugged deployments.',
    imageAlt: 'WatchGuard Access Point device',
  },
};

export default function CategoryBanner({ activeTab, setActiveTab }) {
  const content = BANNER_CONTENT[activeTab];

  return (
    <div className={styles.bannerWrap}>
      {/* Dark red gradient background */}
      <div className={styles.bannerGradient} />

      {/* Text overlay — left side */}
      <div className={styles.bannerOverlay}>
        <h1 className={styles.bannerHeadline}>{content.headline}</h1>
        <p className={styles.bannerDescription}>{content.description}</p>
      </div>

      {/* Image placeholder — right side */}
      <div className={styles.bannerImageArea}>
        <img
          src=""
          alt={content.imageAlt}
          className={styles.bannerImage}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <span className={styles.bannerImagePlaceholder}>{content.imageAlt}</span>
      </div>

      {/* Navigation arrows */}
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
  );
}

export { TAB_ORDER, TAB_LABELS };
