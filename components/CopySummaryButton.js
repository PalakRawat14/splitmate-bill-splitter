"use client";

import { useState } from "react";
import {
  calculateBalances,
  calculateSettlements,
  calculateTotalSpent,
  formatCurrency,
} from "@/lib/calculations";

export default function CopySummaryButton({ friends, expenses }) {
  const [msg, setMsg] = useState("");

  async function handleCopy() {
    setMsg("");

    const totalSpent = calculateTotalSpent(expenses);
    const balances = calculateBalances(friends, expenses);
    const settlements = calculateSettlements(balances);

    const lines = [];
    lines.push("SplitMate Settlement Summary");
    lines.push("");
    lines.push(`Total spent: ${formatCurrency(totalSpent)}`);
    lines.push(`Friends: ${friends.length}`);
    lines.push(`Expenses: ${expenses.length}`);
    lines.push("");

    lines.push("Balances:");
    balances.forEach((b) => {
      if (b.amount > 0.01) {
        lines.push(`  ${b.name} gets back ${formatCurrency(b.amount)}`);
      } else if (b.amount < -0.01) {
        lines.push(`  ${b.name} owes ${formatCurrency(b.amount)}`);
      } else {
        lines.push(`  ${b.name} is settled up`);
      }
    });
    lines.push("");

    lines.push("Settlement Plan:");
    if (settlements.length === 0) {
      lines.push("  Everyone is settled up.");
    } else {
      settlements.forEach((s) => {
        lines.push(`  ${s.from} pays ${s.to} ${formatCurrency(s.amount)}`);
      });
    }
    lines.push("");
    lines.push("Built using SplitMate by Palak Rawat.");
    lines.push("Contact: rawatpalak140@gmail.com");

    const text = lines.join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setMsg("Summary copied!");
    } catch {
      setMsg("Could not copy summary. Please try again.");
    }
  }

  return (
    <div>
      <button
        className="btn btn-outline"
        onClick={handleCopy}
        disabled={expenses.length === 0}
      >
        Copy Summary
      </button>
      {msg && (
        <p
          className={`msg ${msg === "Summary copied!" ? "msg-success" : "msg-error"}`}
          style={{ marginTop: 8, marginBottom: 0, fontSize: "0.75rem" }}
        >
          {msg}
        </p>
      )}
    </div>
  );
}
