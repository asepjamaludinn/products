"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as messageApi from "@/lib/api/message.api";
import { Spinner } from "@/components/atoms/Spinner";
import { EmptyState } from "@/components/molecules/EmptyState";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    messageApi
      .listConversations()
      .then((res) => setConversations(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Spinner />;
  if (conversations.length === 0) {
    return (
      <EmptyState
        title="No conversations"
        description="Start a chat to see it here."
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Messages</h1>
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/messages/${conversation.id}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
          >
            <span className="text-sm font-medium text-slate-900">
              {conversation.participants.map((p) => p.user.name).join(", ")}
            </span>
            <span className="truncate text-xs text-slate-400">
              {conversation.messages[0]?.content ?? "No messages yet"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
