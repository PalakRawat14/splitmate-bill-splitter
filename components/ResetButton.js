"use client";

import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function ResetButton({ onReset, expenses }) {
  const [showConfirm, setShowConfirm] = useState(false);

  function handleConfirm() {
    onReset();
    setShowConfirm(false);
  }

  return (
    <>
      <button
        className="btn btn-outline-danger"
        onClick={() => setShowConfirm(true)}
        disabled={expenses.length === 0}
      >
        Reset All
      </button>
      <ConfirmModal
        show={showConfirm}
        title="Reset All Data"
        message="Are you sure you want to delete all friends and expenses?"
        confirmLabel="Reset All"
        variant="danger"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
