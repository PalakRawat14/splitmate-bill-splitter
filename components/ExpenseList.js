"use client";

function getPersonName(id, friends) {
  const p = friends.find((f) => f.id === id);
  return p ? p.name : "Unknown";
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(n) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getExpenseIcon(title) {
  const t = title.toLowerCase();
  if (t.includes("food") || t.includes("dinner") || t.includes("lunch") || t.includes("pizza") || t.includes("restaurant")) return "🍽️";
  if (t.includes("cab") || t.includes("uber") || t.includes("taxi") || t.includes("travel") || t.includes("fuel") || t.includes("petrol")) return "🚗";
  if (t.includes("movie") || t.includes("game") || t.includes("fun")) return "🎬";
  if (t.includes("beer") || t.includes("drink") || t.includes("bar") || t.includes("wine")) return "🍻";
  if (t.includes("gift") || t.includes("present")) return "🎁";
  if (t.includes("grocer") || t.includes("mall") || t.includes("shop")) return "🛒";
  if (t.includes("hotel") || t.includes("stay") || t.includes("room")) return "🏨";
  if (t.includes("trip") || t.includes("vacation") || t.includes("holiday")) return "✈️";
  return "💳";
}

export default function ExpenseList({ expenses, friends, setExpenses }) {
  function handleDelete(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  if (expenses.length === 0) {
    return (
      <div className="glass-card">
        <h2 className="card-title">
          <span className="card-title-left">
            <span className="card-title-icon">📋</span>
            Expenses
          </span>
        </h2>
        <div className="empty-state">
          <div className="empty-state-icon">🧾</div>
          <p className="helper-text">
            No expenses yet. Add your first shared bill above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h2 className="card-title">
        <span className="card-title-left">
          <span className="card-title-icon">📋</span>
          Expenses
        </span>
        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)" }}>
          {expenses.length}
        </span>
      </h2>

      <div className="expense-list">
        {expenses.map((expense) => {
          const share = expense.amount / expense.participantIds.length;

          return (
            <div key={expense.id} className="expense-item">
              <div className="expense-actions">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </div>

              <div className="expense-top">
                <div className="expense-title-wrap">
                  <span className="expense-icon">
                    {getExpenseIcon(expense.title)}
                  </span>
                  <div>
                    <span className="expense-title">{expense.title}</span>
                  </div>
                </div>
                <div className="expense-amount-col">
                  <span className="expense-amount">
                    ₹{formatAmount(expense.amount)}
                  </span>
                  <span className="expense-share">
                    ₹{formatAmount(share)} each
                  </span>
                </div>
              </div>

              <div className="expense-details">
                <div className="expense-detail">
                  <span className="detail-label">Paid by</span>
                  <span>{getPersonName(expense.paidByPersonId, friends)}</span>
                </div>
                <div className="expense-detail">
                  <span className="detail-label">Shared by</span>
                  <span>
                    {expense.participantIds
                      .map((pid) => getPersonName(pid, friends))
                      .join(", ")}
                  </span>
                </div>
                <div className="expense-detail">
                  <span className="detail-label">Split</span>
                  <span>Equal among selected friends</span>
                </div>
                <div className="expense-detail">
                  <span className="detail-label">Date</span>
                  <span>{formatDate(expense.createdAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
