import { apiClient } from "./client";

export const signup = (data) => apiClient.post("/auth/signup", data);
export const login = (data) => apiClient.post("/auth/login", data);
export const logout = () => apiClient.post("/auth/logout");
export const getMe = () => apiClient.get("/auth/me");
