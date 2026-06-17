"use client";

import { useState, useEffect } from "react";

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function ExpenseForm({ friends, expenses, setExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidByPersonId, setPaidByPersonId] = useState("");
  const [participantIds, setParticipantIds] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setParticipantIds(friends.map((f) => f.id));
  }, [friends]);

  function toggleParticipant(id) {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (friends.length < 2) {
      setError("You need at least 2 friends to add expenses.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter an expense title.");
      return;
    }

    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!paidByPersonId) {
      setError("Please select who paid.");
      return;
    }

    if (participantIds.length === 0) {
      setError("Please select at least one person who shared this expense.");
      return;
    }

    const newExpense = {
      id: generateId(),
      title: title.trim(),
      amount: Math.round(amt * 100) / 100,
      paidByPersonId,
      participantIds: [...participantIds],
      createdAt: new Date().toISOString(),
    };

    setExpenses((prev) => [...prev, newExpense]);
    setTitle("");
    setAmount("");
    setSuccess("Expense has been added.");
  }

  if (friends.length < 2) {
    return (
      <div className="glass-card">
        <h2 className="card-title">
          <span className="card-title-left">
            <span className="card-title-icon">💰</span>
            Add Expense
          </span>
        </h2>
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <p className="helper-text">
            You need at least 2 friends to add expenses.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h2 className="card-title">
        <span className="card-title-left">
          <span className="card-title-icon">💰</span>
          Add Expense
        </span>
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Title</label>
            <div className="input-icon-wrap">
              <span className="input-icon">📝</span>
              <input
                className="input"
                type="text"
                placeholder="e.g. Dinner, Pizza"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="label">Amount (₹)</label>
            <div className="input-icon-wrap">
              <span className="input-icon">₹</span>
              <input
                className="input"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="e.g. 1500"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="label">Paid by</label>
          <select
            className="select"
            value={paidByPersonId}
            onChange={(e) => {
              setPaidByPersonId(e.target.value);
              setError("");
              setSuccess("");
            }}
          >
            <option value="">-- Select who paid --</option>
            {friends.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="label">Shared by</label>
          <div className="checkbox-group">
            {friends.map((f) => (
              <label key={f.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={participantIds.includes(f.id)}
                  onChange={() => toggleParticipant(f.id)}
                />
                <span>{f.name}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px",
              background: "var(--primary-light)", borderRadius: 100, fontSize: "0.72rem",
              fontWeight: 700, color: "var(--primary-dark)", letterSpacing: "0.02em"
            }}>
              Split Type: Equal Split
            </span>
          </div>
          <p className="helper-text" style={{ marginTop: 10, fontSize: "0.78rem" }}>
            This version splits selected expenses equally among selected friends.
          </p>
        </div>

        {error && <p className="msg msg-error">{error}</p>}
        {success && <p className="msg msg-success">{success}</p>}

        <button type="submit" className="btn btn-primary btn-full">
          Add Expense
        </button>
      </form>
    </div>
  );
}
