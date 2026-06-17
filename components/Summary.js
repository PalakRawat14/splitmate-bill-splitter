"use client";

import {
  calculateBalances,
  calculateSettlements,
  calculateTotalSpent,
  formatCurrency,
} from "@/lib/calculations";
import CopySummaryButton from "./CopySummaryButton";
import ResetButton from "./ResetButton";
import ShareableLinkButton from "./ShareableLinkButton";

function getAvatarColor(name) {
  const colors = [
    ["#0891b2", "#0e7490"],
    ["#10b981", "#059669"],
    ["#f59e0b", "#d97706"],
    ["#ef4444", "#dc2626"],
    ["#8b5cf6", "#7c3aed"],
    ["#ec4899", "#db2777"],
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % colors.length;
  return `linear-gradient(135deg, ${colors[idx][0]}, ${colors[idx][1]})`;
}

export default function Summary({ friends, expenses, onReset }) {
  const totalSpent = calculateTotalSpent(expenses);
  const balances = calculateBalances(friends, expenses);
  const settlements = calculateSettlements(balances);

  if (expenses.length === 0) {
    return (
      <div className="glass-card">
        <h2 className="card-title">
          <span className="card-title-left">
            <span className="card-title-icon">📊</span>
            Summary
          </span>
        </h2>
        <div className="empty-state">
          <div className="empty-state-icon">📈</div>
          <p className="helper-text">
            Add some expenses to see the summary and settlement plan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h2 className="card-title">
        <span className="card-title-left">
          <span className="card-title-icon">📊</span>
          Summary
        </span>
      </h2>

      <div className="summary-stats">
        <div className="summary-stat">
          <span className="stat-label">Total Spent</span>
          <span className="stat-value">{formatCurrency(totalSpent)}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">Friends</span>
          <span className="stat-value">{friends.length}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">Expenses</span>
          <span className="stat-value">{expenses.length}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">Settlements</span>
          <span className="stat-value">{settlements.length}</span>
        </div>
      </div>

      <h3 className="section-subtitle">Balances</h3>
      <div className="balance-list">
        {balances.map((b) => {
          let statusText = "";
          let cls = "";
          if (b.amount > 0.01) {
            statusText = "gets back";
            cls = "balance-positive";
          } else if (b.amount < -0.01) {
            statusText = "owes";
            cls = "balance-negative";
          } else {
            statusText = "settled";
            cls = "balance-zero";
          }
          return (
            <div key={b.personId} className={`balance-row ${cls}`}>
              <div className="balance-left">
                <span
                  className="balance-avatar"
                  style={{ background: getAvatarColor(b.name) }}
                >
                  {b.name.charAt(0).toUpperCase()}
                </span>
                <span className="balance-name">{b.name}</span>
              </div>
              <span className="balance-status">{statusText}</span>
              <span className="balance-amount">
                {b.amount > 0.01
                  ? formatCurrency(b.amount)
                  : b.amount < -0.01
                    ? formatCurrency(b.amount)
                    : "—"}
              </span>
            </div>
          );
        })}
      </div>

      <h3 className="section-subtitle">
        Settlement Plan
        {settlements.length > 0 && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 10px",
            background: "var(--success-light)", borderRadius: 100, fontSize: "0.68rem",
            fontWeight: 700, color: "var(--success-text)", letterSpacing: "0.02em",
            marginLeft: 8, whiteSpace: "nowrap"
          }}>
            Optimized Settlement
          </span>
        )}
      </h3>
      <p className="helper-text" style={{ marginBottom: 12, fontSize: "0.78rem" }}>
        This settlement plan reduces unnecessary payments by calculating net balances first.
      </p>
      {settlements.length === 0 ? (
        <p className="helper-text" style={{ margin: 0 }}>
          Everyone is settled up.
        </p>
      ) : (
        <div className="settlement-list">
          {settlements.map((s, i) => (
            <div key={i} className="settlement-row">
              <div className="settlement-payer">
                <span
                  className="settlement-payer-avatar"
                  style={{ background: getAvatarColor(s.from) }}
                >
                  {s.from.charAt(0).toUpperCase()}
                </span>
                <span>{s.from}</span>
              </div>
              <div className="settlement-action">
                <span>pays</span>
              </div>
              <span className="settlement-arrow">→</span>
              <div className="settlement-action">
                <span>receives</span>
              </div>
              <div className="settlement-receiver">
                <span>{s.to}</span>
                <span
                  className="settlement-receiver-avatar"
                  style={{ background: getAvatarColor(s.to) }}
                >
                  {s.to.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="settlement-amount">
                {formatCurrency(s.amount)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="summary-actions">
        <CopySummaryButton friends={friends} expenses={expenses} />
        <ShareableLinkButton friends={friends} expenses={expenses} />
        <ResetButton onReset={onReset} expenses={expenses} />
      </div>
    </div>
  );
}
