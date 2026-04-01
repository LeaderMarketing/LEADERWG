import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartSimple } from '@phosphor-icons/react';
import styles from './TopLevelNav.module.css';
import { useQuote } from '../../context/QuoteContext.jsx';

const NAV_ITEMS = [
  { path: '/', label: 'Security Appliances' },
  { path: '/virtual', label: 'Virtual' },
  { path: '/cloud', label: 'Cloud' },
  { path: '/mdr-ndr', label: 'MDR & NDR' },
  { path: '/endpoint', label: 'Endpoint & Mobile' },
  { path: '/identity', label: 'Identity & Access' },
  { path: '/email', label: 'Email Security' },
  { path: '/renewals', label: 'Renewals & Upgrades' },
];

export default function TopLevelNav({ onCartClick }) {
  const { state: quoteState } = useQuote();

  return (
    <nav className={styles.topNav}>
      <div className={styles.navInner}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navActive : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <button
          type="button"
          className={`${styles.cartBtn} ${quoteState.itemCount > 0 ? styles.cartBtnActive : ''}`}
          onClick={onCartClick}
          aria-label="Open quote cart"
        >
          <ShoppingCartSimple size={18} weight="fill" />
          {quoteState.itemCount > 0 && (
            <span className={styles.cartBadge}>{quoteState.itemCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export { NAV_ITEMS };
