import { useEffect, useState } from 'react';
import { fetchPricing } from '../api.js';

/**
 * Fetch the pricing catalog once on mount.
 * Returns { products, productsById, loading, error }.
 */
export default function useCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPricing()
      .then((data) => {
        if (cancelled) return;
        setProducts(data ?? []);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const productsById = new Map(products.map((p) => [p.id, p]));
  return { products, productsById, loading, error };
}
