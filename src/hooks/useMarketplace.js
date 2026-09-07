import { useState, useEffect, useCallback } from 'react';
import { getLiveCategories, getLiveProducts } from '../services/marketplaceAPI';

/**
 * Custom hook — manages marketplace products, categories,
 * search/filter state, and loading / error indicators.
 */
export const useMarketplaceHook = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load categories once on mount
  useEffect(() => {
    const loadCategories = async () => {
      const categList = await getLiveCategories();
      setCategories(categList);
    };
    loadCategories();
  }, []);

  // Fetch products whenever category or search changes
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const productList = await getLiveProducts(selectedCategory, searchQuery);
      setProducts(productList);
    } catch (err) {
      setError('Failed to fetch marketplace data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Retry / refresh handler used by the error-state component
  const refreshData = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    categories,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    refreshData,
  };
};
