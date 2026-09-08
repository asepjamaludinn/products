import { apiClient } from "./client";

export const listConversations = () => apiClient.get("/conversations");
export const startConversation = (userId) =>
  apiClient.post("/conversations", { userId });
export const startSupportConversation = () =>
  apiClient.post("/conversations/support");
export const listMessages = (conversationId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(
    `/conversations/${conversationId}/messages${query ? `?${query}` : ""}`,
  );
};
