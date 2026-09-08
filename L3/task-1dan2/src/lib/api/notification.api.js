import { apiClient } from "./client";

export const listNotifications = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/notifications${query ? `?${query}` : ""}`);
};
export const markNotificationAsRead = (id) =>
  apiClient.patch(`/notifications/${id}/read`);
export const markAllNotificationsAsRead = () =>
  apiClient.patch("/notifications/read-all");
