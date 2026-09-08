"use client";

import { useCallback, useEffect, useState } from "react";
import * as categoryApi from "@/lib/api/category.api";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await categoryApi.listCategories();
      setCategories(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (data) => {
    await categoryApi.createCategory(data);
    await fetchCategories();
  };

  const removeCategory = async (id) => {
    await categoryApi.deleteCategory(id);
    await fetchCategories();
  };

  return {
    categories,
    isLoading,
    error,
    addCategory,
    removeCategory,
    refresh: fetchCategories,
  };
};
