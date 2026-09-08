import { cn } from "@/lib/utils/cn";

const formatTime = (date) => {
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  } catch {
    return "";
  }
};

export const ChatMessageBubble = ({ message, isOwn }) => {
  const messageText =
    message?.content ?? message?.message ?? message?.text ?? "";

  return (
    <div
      className={cn(
        "flex w-full my-1.5",
        isOwn ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-xs rounded-2xl px-4 py-2.5 text-sm shadow-sm break-words",
          isOwn
            ? "bg-brand-600 text-white"
            : "bg-slate-200 text-slate-900 font-medium",
        )}
      >
        <p className={cn("text-sm", isOwn ? "text-white" : "text-slate-900")}>
          {messageText}
        </p>
        <span
          className={cn(
            "mt-1 block text-[10px] text-right",
            isOwn ? "text-white/80" : "text-slate-500",
          )}
        >
          {formatTime(message?.createdAt ?? message?.timestamp)}
        </span>
      </div>
    </div>
  );
};
