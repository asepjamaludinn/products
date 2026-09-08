"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useChat } from "@/lib/hooks/useChat";
import { ChatMessageBubble } from "@/components/molecules/ChatMessageBubble";
import { ChatInput } from "@/components/molecules/ChatInput";
import { Spinner } from "@/components/atoms/Spinner";

export const ChatWindow = ({ conversationId }) => {
  const { user } = useAuth();
  const { messages, isLoading, sendMessage, notifyTyping, typingUserId } =
    useChat(conversationId);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex h-[32rem] flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === user?.id}
          />
        ))}
        {typingUserId && (
          <p className="text-xs italic text-slate-400">Typing…</p>
        )}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={sendMessage} onTyping={notifyTyping} />
    </div>
  );
};
