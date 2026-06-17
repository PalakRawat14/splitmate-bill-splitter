"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import FriendManager from "@/components/FriendManager";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import Summary from "@/components/Summary";
import BillHistory from "@/components/BillHistory";
import Footer from "@/components/Footer";
import ConfirmModal from "@/components/ConfirmModal";
import {
  loadFriends,
  loadExpenses,
  saveFriends,
  saveExpenses,
  clearSplitMateData,
  loadTheme,
  saveTheme,
} from "@/lib/storage";
import { calculateTotalSpent, calculateSettlements, calculateBalances, calculateHighestSpender, calculateLargestExpense, calculateAverageExpense, formatCurrency } from "@/lib/calculations";

function Sparkline({ color }) {
  return (
    <svg className="stat-sparkline" viewBox="0 0 48 28" fill="none">
      <path
        d="M2 22 Q12 14 18 18 T28 8 T36 12 T46 4"
        stroke={color || "var(--primary)"}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M2 22 Q12 14 18 18 T28 8 T36 12 T46 4"
        stroke={color || "var(--primary)"}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.15"
      />
    </svg>
  );
}

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [theme, setTheme] = useState("light");
  const [sharedData, setSharedData] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  const loaded = useRef(false);

  useEffect(() => {
    setFriends(loadFriends());
    setExpenses(loadExpenses());
    setTheme(loadTheme());
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (loaded.current) {
      saveFriends(friends);
    }
  }, [friends]);

  useEffect(() => {
    if (loaded.current) {
      saveExpenses(expenses);
    }
  }, [expenses]);

  useEffect(() => {
    if (loaded.current) {
      saveTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  /* Shareable URL hash loading */
  useEffect(() => {
    if (!loaded.current) return;
    const hash = window.location.hash;
    if (hash && hash.startsWith("#splitmate=")) {
      try {
        const encoded = hash.replace("#splitmate=", "");
        const json = decodeURIComponent(encoded);
        const data = JSON.parse(json);
        if (
          data &&
          Array.isArray(data.friends) &&
          Array.isArray(data.expenses)
        ) {
          setSharedData(data);
        } else {
          setAlertMsg("This shared bill link is invalid or expired.");
        }
      } catch {
        setAlertMsg("This shared bill link is invalid or expired.");
      }
    }
  }, [loaded.current]);

  function handleLoadShared() {
    setFriends(sharedData.friends);
    setExpenses(sharedData.expenses);
    setSharedData(null);
    window.location.hash = "";
  }

  function handleReset() {
    setFriends([]);
    setExpenses([]);
    clearSplitMateData();
  }

  const totalSpent = calculateTotalSpent(expenses);
  const settlements = calculateSettlements(calculateBalances(friends, expenses));

  return (
    <div className="app-shell">
      <Header theme={theme} setTheme={setTheme} />
      <main className="main-content">
        <div className="container">
          {friends.length >= 2 && expenses.length > 0 && (
            <>
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon-box teal">₹</div>
                  <div className="stat-info">
                    <span className="stat-label">Total Spent</span>
                    <span className="stat-value">{formatCurrency(totalSpent)}</span>
                  </div>
                  <Sparkline color="var(--primary)" />
                </div>
                <div className="stat-card">
                  <div className="stat-icon-box blue">👥</div>
                  <div className="stat-info">
                    <span className="stat-label">Friends</span>
                    <span className="stat-value">{friends.length}</span>
                  </div>
                  <Sparkline color="#3b82f6" />
                </div>
                <div className="stat-card">
                  <div className="stat-icon-box purple">📄</div>
                  <div className="stat-info">
                    <span className="stat-label">Expenses</span>
                    <span className="stat-value">{expenses.length}</span>
                  </div>
                  <Sparkline color="#8b5cf6" />
                </div>
                <div className="stat-card">
                  <div className="stat-icon-box green">🔄</div>
                  <div className="stat-info">
                    <span className="stat-label">Settlements</span>
                    <span className="stat-value">{settlements.length}</span>
                  </div>
                  <Sparkline color="#10b981" />
                </div>
              </div>
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon-box teal">📊</div>
                  <div className="stat-info">
                    <span className="stat-label">Highest Spender</span>
                    <span className="stat-value" style={{ fontSize: "1rem" }}>
                      {(() => {
                        const hs = calculateHighestSpender(expenses, friends);
                        return hs ? `${hs.name} (${formatCurrency(hs.amount)})` : "—";
                      })()}
                    </span>
                  </div>
                  <Sparkline color="var(--primary)" />
                </div>
                <div className="stat-card">
                  <div className="stat-icon-box purple">🏷️</div>
                  <div className="stat-info">
                    <span className="stat-label">Largest Expense</span>
                    <span className="stat-value" style={{ fontSize: "1rem" }}>
                      {(() => {
                        const le = calculateLargestExpense(expenses);
                        return le ? `${le.title} (${formatCurrency(le.amount)})` : "—";
                      })()}
                    </span>
                  </div>
                  <Sparkline color="#8b5cf6" />
                </div>
                <div className="stat-card">
                  <div className="stat-icon-box blue">📐</div>
                  <div className="stat-info">
                    <span className="stat-label">Average Expense</span>
                    <span className="stat-value">{formatCurrency(calculateAverageExpense(expenses))}</span>
                  </div>
                  <Sparkline color="#3b82f6" />
                </div>
                <div className="stat-card">
                  <div className="stat-icon-box green">💰</div>
                  <div className="stat-info">
                    <span className="stat-label">Total Spent</span>
                    <span className="stat-value">{formatCurrency(totalSpent)}</span>
                  </div>
                  <Sparkline color="#10b981" />
                </div>
              </div>
            </>
          )}
          <div className="layout-grid">
            <div className="layout-grid-left">
              <FriendManager
                friends={friends}
                setFriends={setFriends}
                expenses={expenses}
              />
              <ExpenseForm
                friends={friends}
                expenses={expenses}
                setExpenses={setExpenses}
              />
              <BillHistory
                friends={friends}
                expenses={expenses}
                setFriends={setFriends}
                setExpenses={setExpenses}
              />
            </div>
            <div className="layout-grid-right">
              <Summary
                friends={friends}
                expenses={expenses}
                onReset={handleReset}
              />
              <ExpenseList
                expenses={expenses}
                friends={friends}
                setExpenses={setExpenses}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <ConfirmModal
        show={sharedData !== null}
        title="Load Shared Bill"
        message="This link contains a shared SplitMate bill. Load it?"
        confirmLabel="Load"
        variant="primary"
        onConfirm={handleLoadShared}
        onCancel={() => {
          setSharedData(null);
          window.location.hash = "";
        }}
      />

      <ConfirmModal
        show={alertMsg !== ""}
        title="Invalid Link"
        message={alertMsg}
        confirmLabel="OK"
        cancelLabel=""
        variant="primary"
        onConfirm={() => setAlertMsg("")}
        onCancel={() => setAlertMsg("")}
      />
    </div>
  );
}
