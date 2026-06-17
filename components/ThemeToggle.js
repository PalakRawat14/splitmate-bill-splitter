"use client";

export default function ThemeToggle({ theme, setTheme }) {
  function toggle() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <button className="theme-toggle-btn" onClick={toggle}>
      {theme === "dark" ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
    </button>
  );
}
