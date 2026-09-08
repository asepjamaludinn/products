import { cn } from "@/lib/utils/cn";

const formatTime = (date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

export const NotificationItem = ({ notification, onClick }) => (
  <button
    onClick={() => onClick(notification)}
    className={cn(
      "flex w-full flex-col items-start gap-1 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-slate-50",
      !notification.isRead && "bg-brand-50/60",
    )}
  >
    <div className="flex w-full items-center justify-between">
      <span className="text-sm font-medium text-slate-900">
        {notification.title}
      </span>
      <span className="text-xs text-slate-400">
        {formatTime(notification.createdAt)}
      </span>
    </div>
    <p className="line-clamp-2 text-xs text-slate-500">
      {notification.message}
    </p>
  </button>
);
