"use client";

import { useCallback, useEffect, useState } from "react";
import * as productApi from "@/lib/api/product.api";

export const useProducts = ({
  initialPage = 1,
  initialLimit = 10,
  categoryId,
} = {}) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(
    async (page = initialPage) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productApi.listProducts({
          page,
          limit: initialLimit,
          categoryId,
        });
        setProducts(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [initialLimit, initialPage, categoryId],
  );

  useEffect(() => {
    fetchProducts(initialPage);
  }, [fetchProducts, initialPage]);

  const removeProduct = async (id) => {
    await productApi.deleteProduct(id);
    await fetchProducts(pagination.page);
  };

  return {
    products,
    pagination,
    isLoading,
    error,
    goToPage: fetchProducts,
    removeProduct,
    refresh: fetchProducts,
  };
};
