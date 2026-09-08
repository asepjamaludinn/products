"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "@/lib/context/SocketContext";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/lib/context/ToastContext";
import * as messageApi from "@/lib/api/message.api";

export const useChat = (conversationId) => {
  const { socket, isConnected } = useSocket();
  const { user } = useAuth();
  const toast = useToast();

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typingUserId, setTypingUserId] = useState(null);
  const typingTimeoutRef = useRef(null);

  const numericConversationId = Number(conversationId);

  useEffect(() => {
    if (!numericConversationId) return;
    setIsLoading(true);
    messageApi
      .listMessages(numericConversationId)
      .then((res) => setMessages([...res.data].reverse()))
      .finally(() => setIsLoading(false));
  }, [numericConversationId]);

  useEffect(() => {
    if (!socket || !isConnected || !numericConversationId) return;

    socket.emit(
      "chat:join",
      { conversationId: numericConversationId },
      (ack) => {
        if (ack && ack.success === false) {
          toast.error(ack.message || "Failed to join conversation");
        }
      },
    );

    const handleNewMessage = (message) => {
      if (Number(message.conversationId) !== numericConversationId) return;

      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };

    const handleTyping = ({ userId, isTyping }) => {
      if (userId === user?.id) return;
      setTypingUserId(isTyping ? userId : null);
    };

    socket.on("chat:message:new", handleNewMessage);
    socket.on("chat:typing", handleTyping);

    return () => {
      socket.emit("chat:leave", { conversationId: numericConversationId });
      socket.off("chat:message:new", handleNewMessage);
      socket.off("chat:typing", handleTyping);
    };
  }, [socket, isConnected, numericConversationId, user?.id, toast]);

  const sendMessage = useCallback(
    (content) => {
      if (!content.trim()) return;

      if (!socket || !isConnected) {
        toast.error("Not connected to chat server. Please refresh the page.");
        return;
      }

      socket.emit(
        "chat:message:send",
        { conversationId: numericConversationId, content },
        (ack) => {
          if (!ack?.success) {
            toast.error(ack?.message || "Failed to send message");
            console.error(ack?.message);
          } else if (ack?.data) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === ack.data.id)) return prev;
              return [...prev, ack.data];
            });
          }
        },
      );
    },
    [socket, isConnected, numericConversationId, toast],
  );

  const notifyTyping = useCallback(
    (isTyping) => {
      if (!socket || !isConnected) return;
      socket.emit("chat:typing", {
        conversationId: numericConversationId,
        isTyping,
      });

      clearTimeout(typingTimeoutRef.current);
      if (isTyping) {
        typingTimeoutRef.current = setTimeout(
          () =>
            socket.emit("chat:typing", {
              conversationId: numericConversationId,
              isTyping: false,
            }),
          2000,
        );
      }
    },
    [socket, isConnected, numericConversationId],
  );

  return {
    messages,
    isLoading,
    sendMessage,
    notifyTyping,
    typingUserId,
    isConnected,
  };
};
