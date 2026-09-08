"use client";

import { Button } from "@/components/atoms/Button";

export const ConfirmDialog = ({
  title,
  description,
  isOpen,
  onCancel,
  onConfirm,
  isLoading,
  confirmLabel = "Delete",
  variant = "danger",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
          <span className="text-lg font-semibold text-red-600" aria-hidden>
            !
          </span>
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1.5 text-sm text-slate-500">{description}</p>
        <div className="mt-6 flex justify-end gap-2.5">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant={variant} onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
