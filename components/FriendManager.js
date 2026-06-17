"use client";

import { useState } from "react";

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getInitials(name) {
  return name.charAt(0).toUpperCase();
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

export default function FriendManager({ friends, setFriends, expenses }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmed = name.trim();

    if (!trimmed) {
      setError("Please enter a friend name.");
      return;
    }

    if (trimmed.length > 30) {
      setError("Friend name must be 30 characters or less.");
      return;
    }

    const duplicate = friends.some(
      (f) => f.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (duplicate) {
      setError("This friend is already added.");
      return;
    }

    const newFriend = {
      id: generateId(),
      name: toTitleCase(trimmed),
    };

    setFriends((prev) => [...prev, newFriend]);
    setName("");
    setSuccess(`"${toTitleCase(trimmed)}" has been added.`);
  }

  function handleDelete(friend) {
    setError("");
    setSuccess("");

    const isPayer = expenses.some((e) => e.paidByPersonId === friend.id);
    const isParticipant = expenses.some((e) =>
      e.participantIds.includes(friend.id)
    );

    if (isPayer || isParticipant) {
      setError(
        "This friend is already used in an expense and cannot be deleted."
      );
      return;
    }

    setFriends((prev) => prev.filter((f) => f.id !== friend.id));
  }

  return (
    <div className="glass-card">
      <h2 className="card-title">
        <span className="card-title-left">
          <span className="card-title-icon">👥</span>
          Friends
        </span>
      </h2>

      <form onSubmit={handleAdd} className="input-group">
        <div className="input-icon-wrap" style={{ flex: 1 }}>
          <span className="input-icon">✏️</span>
          <input
            className="input"
            type="text"
            placeholder="Enter friend name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
              setSuccess("");
            }}
            maxLength={30}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      {error && <p className="msg msg-error">{error}</p>}
      {success && <p className="msg msg-success">{success}</p>}

      {friends.length > 0 && (
        <p className="friend-count">
          {friends.length} {friends.length === 1 ? "friend" : "friends"} in group
        </p>
      )}

      {friends.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">👋</div>
          <p className="helper-text">
            No friends added yet. Add your first friend above.
          </p>
        </div>
      )}

      <div className="friend-chips">
        {friends.map((friend) => (
          <div key={friend.id} className="friend-chip">
            <span className="friend-avatar">{getInitials(friend.name)}</span>
            <span>{friend.name}</span>
            <button
              type="button"
              className="chip-delete"
              onClick={() => handleDelete(friend)}
              title="Remove friend"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
