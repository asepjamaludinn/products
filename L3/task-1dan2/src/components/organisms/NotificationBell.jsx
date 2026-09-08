"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useNotifications } from "@/lib/context/NotificationContext";
import { NotificationItem } from "@/components/molecules/NotificationItem";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils/cn";

const VARIANT_BUTTON_CLASSES = {
  default: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  light: "text-slate-300 hover:bg-slate-800 hover:text-white",
};

export const NotificationBell = ({ variant = "default" }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSelect = async (notification) => {
    if (!notification.isRead) await markAsRead(notification.id);
    setIsOpen(false);
    if (notification.type === "CHAT" && notification.data?.conversationId) {
      router.push(`/messages/${notification.data.conversationId}`);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
          VARIANT_BUTTON_CLASSES[variant],
        )}
        aria-label="Notifications"
      >
        <Bell size={19} strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-sm font-semibold text-slate-900">
              Notifications
            </span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <EmptyState
                title="No notifications"
                description="You're all caught up."
              />
            ) : (
              notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onClick={handleSelect}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
