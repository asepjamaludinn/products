"use client";

import { useParams } from "next/navigation";
import { ChatWindow } from "@/components/organisms/ChatWindow";

export default function ConversationPage() {
  const params = useParams();
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Chat</h1>
      <ChatWindow conversationId={Number(params.conversationId)} />
    </div>
  );
}
