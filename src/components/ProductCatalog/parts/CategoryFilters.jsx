import React from 'react';
import styles from '../ProductCatalog.module.css';

/**
 * Filter definitions per category.
 * Each filter has a label and a predicate that tests a product slug.
 */
const CATEGORY_FILTERS = {
  tabletop: {
    key: 'builtInWifi',
    label: 'Built-in WiFi',
    test: (slug) => /[-]w/i.test(slug),
  },
  mseries: {
    key: 'unrestrictedVlan',
    label: 'Unrestricted VLAN',
    test: (slug) => /^M(295|395|495|595|695|5800)$/i.test(slug),
  },
  wifi: {
    key: 'outdoor',
    label: 'Outdoor / Rugged',
    test: (slug) => /cr/i.test(slug),
  },
};

export { CATEGORY_FILTERS };

export default function CategoryFilters({ activeTab, filterOn, setFilterOn }) {
  const filter = CATEGORY_FILTERS[activeTab];
  if (!filter) return null;

  return (
    <div className={styles.filterBar}>
      <button
        className={`${styles.filterToggle} ${filterOn ? styles.filterActive : ''}`}
        onClick={() => setFilterOn((v) => !v)}
        aria-pressed={filterOn}
      >
        <span className={styles.filterSwitch}>
          <span className={styles.filterKnob} />
        </span>
        {filter.label}
      </button>
    </div>
  );
}
