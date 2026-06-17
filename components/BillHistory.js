"use client";

import { useState, useEffect } from "react";
import {
  loadBillHistory,
  addBillToHistory,
  deleteBillFromHistory,
  clearBillHistory,
} from "@/lib/storage";
import ConfirmModal from "./ConfirmModal";

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function BillHistory({
  friends,
  expenses,
  setFriends,
  setExpenses,
}) {
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [billTitle, setBillTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    setHistory(loadBillHistory());
  }, []);

  function openSaveModal() {
    if (friends.length < 2 || expenses.length === 0) {
      setErrorMsg("Add friends and expenses before saving a bill.");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }
    setBillTitle("");
    setShowModal(true);
  }

  function confirmSave() {
    const trimmed = billTitle.trim();
    if (!trimmed) return;
    const bill = {
      id: generateId(),
      title: trimmed,
      friends: JSON.parse(JSON.stringify(friends)),
      expenses: JSON.parse(JSON.stringify(expenses)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setHistory(addBillToHistory(bill));
    setShowModal(false);
    setBillTitle("");
  }

  function handleModalKeyDown(e) {
    if (e.key === "Enter") confirmSave();
    if (e.key === "Escape") setShowModal(false);
  }

  function promptLoad(bill) {
    setConfirm({
      title: "Load Bill",
      message:
        "Loading this bill will replace your current friends and expenses. Continue?",
      confirmLabel: "Load",
      variant: "primary",
      onConfirm: () => {
        setFriends(bill.friends);
        setExpenses(bill.expenses);
        setConfirm(null);
      },
      onCancel: () => setConfirm(null),
    });
  }

  function promptDelete(id) {
    setConfirm({
      title: "Delete Bill",
      message: "Delete this saved bill?",
      confirmLabel: "Delete",
      variant: "danger",
      onConfirm: () => {
        setHistory(deleteBillFromHistory(id));
        setConfirm(null);
      },
      onCancel: () => setConfirm(null),
    });
  }

  function promptClear() {
    setConfirm({
      title: "Clear Bill History",
      message: "Clear all saved bill history?",
      confirmLabel: "Clear All",
      variant: "danger",
      onConfirm: () => {
        clearBillHistory();
        setHistory([]);
        setConfirm(null);
      },
      onCancel: () => setConfirm(null),
    });
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="glass-card">
      <h2 className="card-title">
        <span className="card-title-left">
          <span className="card-title-icon">🕘</span>
          Bill History
        </span>
        <button className="btn btn-primary btn-sm" onClick={openSaveModal}>
          💾 Save Current Bill
        </button>
      </h2>

      {errorMsg && <p className="msg msg-error">{errorMsg}</p>}

      {history.length === 0 && (
        <div className="empty-state" style={{ marginTop: 8 }}>
          <div className="empty-state-icon">📁</div>
          <p className="helper-text">
            No saved bills yet. Save a bill to view it here.
          </p>
        </div>
      )}

      {history.length > 0 && (
        <>
          <div className="bill-history-list">
            {history.map((bill) => (
              <div key={bill.id} className="bill-history-item">
                <div className="bill-history-info">
                  <strong className="bill-title">{bill.title}</strong>
                  <span className="bill-meta">
                    {bill.friends?.length || 0} friends,{" "}
                    {bill.expenses?.length || 0} expenses
                  </span>
                  <span className="bill-date">
                    {formatDate(bill.createdAt)}
                  </span>
                </div>
                <div className="bill-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => promptLoad(bill)}
                  >
                    Load
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => promptDelete(bill.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-outline btn-full"
            onClick={promptClear}
            style={{ marginTop: 12 }}
          >
            Clear Bill History
          </button>
        </>
      )}

      {/* Save bill title modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleModalKeyDown}
          >
            <h3 className="modal-title">Save Current Bill</h3>
            <p className="helper-text" style={{ marginBottom: 12 }}>
              Enter a title for this bill:
            </p>
            <input
              className="input"
              type="text"
              placeholder="e.g. Goa Trip, Weekend Dinner..."
              value={billTitle}
              onChange={(e) => setBillTitle(e.target.value)}
              autoFocus
              maxLength={60}
            />
            <div className="modal-actions">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={confirmSave}
                disabled={!billTitle.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generic confirm modal */}
      {confirm && (
        <ConfirmModal
          show={true}
          title={confirm.title}
          message={confirm.message}
          confirmLabel={confirm.confirmLabel}
          cancelLabel="Cancel"
          variant={confirm.variant}
          onConfirm={confirm.onConfirm}
          onCancel={confirm.onCancel}
        />
      )}
    </div>
  );
}
