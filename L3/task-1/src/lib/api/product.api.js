import { apiClient } from "./client";

const buildQuery = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "")
      query.set(key, value);
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

export const listProducts = (params = {}) =>
  apiClient.get(`/products${buildQuery(params)}`);
export const getProduct = (id) => apiClient.get(`/products/${id}`);
export const createProduct = (data) => apiClient.post("/products", data);
export const updateProduct = (id, data) =>
  apiClient.put(`/products/${id}`, data);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);
