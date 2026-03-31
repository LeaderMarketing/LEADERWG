import { useState, useEffect } from 'react';

const STATIC_BASE = `${import.meta.env.BASE_URL || '/'}static-data`;

/**
 * Deployment modes:
 *   - GitHub Pages (static preview): hostname contains 'github.io'
 *     → loads pre-exported JSON directly, no API calls
 *   - Production (Railway): VITE_API_URL env var or same-origin '/api'
 *     → hits the Express API on the same server
 *   - Local dev: Vite proxy forwards '/api' to localhost:3001
 *     → same as production from the frontend's perspective
 */
const IS_STATIC_PREVIEW = window.location.hostname.includes('github.io');
const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch JSON from the Express API first; fall back to pre-exported
 * static JSON in public/static-data/ (GitHub Pages).
 *
 * On GitHub Pages (static preview), skips the API attempt entirely
 * and loads from pre-exported JSON immediately.
 */
async function fetchWithFallback(apiPath, staticPath) {
  if (!IS_STATIC_PREVIEW) {
    try {
      const res = await fetch(`${API_BASE}${apiPath}`);
      if (!res.ok) throw new Error(res.status);
      return await res.json();
    } catch {
      // API unavailable — fall through to static
    }
  }
  const res = await fetch(staticPath);
  if (!res.ok) throw new Error(`Static fallback failed: ${res.status}`);
  return res.json();
}

/**
 * useCatalogApi(category)
 *
 * Fetches all product groups + their SKUs for a given category.
 * Returns { data, loading, error } where data is:
 *   { label: string, products: [{ slug, name, ..., skus: [...] }] }
 *
 * Works with both the Express API (/api/categories/:category) and
 * the static JSON fallback (category-{name}.json).
 */
export function useCatalogApi(category) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    setError(null);

    fetchWithFallback(
      `/categories/${category}`,
      `${STATIC_BASE}/category-${category}.json`,
    )
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [category]);

  return { data, loading, error };
}
