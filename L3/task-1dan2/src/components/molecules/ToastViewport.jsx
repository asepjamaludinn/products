"use client";

import { useToastList } from "@/lib/context/ToastContext";
import { Toast } from "@/components/atoms/Toast";

export const ToastViewport = () => {
  const { toasts, removeToast } = useToastList();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          variant={t.variant}
          onDismiss={() => removeToast(t.id)}
        />
      ))}
    </div>
  );
};
