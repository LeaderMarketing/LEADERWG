import React, { useState } from 'react';
import { ShoppingCartSimple } from '@phosphor-icons/react';
import styles from './App.module.css';
import ProductCatalog from './components/ProductCatalog/ProductCatalog.jsx';
import QuoteCartPanel from './components/QuoteCartPanel/QuoteCartPanel.jsx';
import { useQuote } from './context/QuoteContext.jsx';

function App() {
  const { state: quoteState } = useQuote();

  // Quote Cart modal
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>WatchGuard Security Appliances</h1>
        </header>

        <ProductCatalog />
      </div>

      {/* Quote Cart modal overlay */}
      <QuoteCartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating Cart Button */}
      <button
        type="button"
        className={`${styles.floatingCartBtn} ${quoteState.itemCount > 0 ? styles.hasItems : ''}`}
        onClick={() => setIsCartOpen(true)}
        aria-label="Open quote cart"
      >
        <span className={styles.cartIcon}>
          <ShoppingCartSimple size={20} weight="fill" />
        </span>
        {quoteState.itemCount > 0 && <span className={styles.cartBadge}>{quoteState.itemCount}</span>}
      </button>
    </div>
  );
}

export default App;
