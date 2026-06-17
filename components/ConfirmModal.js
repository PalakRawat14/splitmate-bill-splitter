"use client";

import { useEffect, useCallback } from "react";

export default function ConfirmModal({
  show,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "primary",
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && onCancel) onCancel();
    },
    [onCancel]
  );

  useEffect(() => {
    if (show) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [show, handleKeyDown]);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="helper-text" style={{ marginBottom: 0 }}>
          {message}
        </p>
        <div className="modal-actions">
          {cancelLabel && (
            <button className="btn btn-outline" onClick={onCancel}>
              {cancelLabel}
            </button>
          )}
          <button
            className={`btn ${variant === "danger" ? "btn-danger" : "btn-primary"}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
