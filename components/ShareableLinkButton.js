"use client";

import { useState } from "react";

export default function ShareableLinkButton({ friends, expenses }) {
  const [msg, setMsg] = useState("");

  async function handleCreate() {
    setMsg("");

    if (friends.length === 0 || expenses.length === 0) {
      setMsg("Add friends and expenses before creating a shareable link.");
      return;
    }

    const payload = {
      version: 1,
      friends,
      expenses,
      createdAt: new Date().toISOString(),
    };

    const json = JSON.stringify(payload);
    const encoded = encodeURIComponent(json);
    const url =
      window.location.origin +
      window.location.pathname +
      "#splitmate=" +
      encoded;

    try {
      await navigator.clipboard.writeText(url);
      setMsg("Shareable link copied!");
    } catch {
      setMsg("Could not copy link. Please try again.");
    }
  }

  return (
    <div>
      <button
        className="btn btn-outline-purple"
        onClick={handleCreate}
        disabled={friends.length === 0 || expenses.length === 0}
      >
        🔗 Shareable Link
      </button>
      {msg && (
        <p
          className={`msg ${msg === "Shareable link copied!" ? "msg-success" : "msg-error"}`}
          style={{ marginTop: 8, marginBottom: 0, fontSize: "0.75rem" }}
        >
          {msg}
        </p>
      )}
    </div>
  );
}
