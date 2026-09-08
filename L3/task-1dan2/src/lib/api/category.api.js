import { apiClient } from "./client";

export const listCategories = () => apiClient.get("/categories");
export const createCategory = (data) => apiClient.post("/categories", data);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);
