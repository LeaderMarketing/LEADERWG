import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TopLevelNav.module.css';

const NAV_ITEMS = [
  { path: '/', label: 'Security Appliances' },
  { path: '/virtual', label: 'Virtual' },
  { path: '/renewals', label: 'Renewals/Upgrades' },
  { path: '/mdr-xdr', label: 'MDR & XDR' },
  { path: '/endpoint', label: 'Endpoint & Mobile' },
  { path: '/cloud', label: 'Cloud & Server' },
  { path: '/identity', label: 'Identity & Access' },
  { path: '/email', label: 'Email Security' },
];

export default function TopLevelNav() {
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
      </div>
    </nav>
  );
}

export { NAV_ITEMS };
