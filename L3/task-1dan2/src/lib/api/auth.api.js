import { apiClient } from "./client";

export const signup = (data) => apiClient.post("/auth/signup", data);
export const login = (data) => apiClient.post("/auth/login", data);
export const logout = () => apiClient.post("/auth/logout");
export const getMe = () => apiClient.get("/auth/me");
export const updateProfile = (data) => apiClient.put("/auth/profile", data);
export const updatePassword = (data) => apiClient.put("/auth/password", data);
