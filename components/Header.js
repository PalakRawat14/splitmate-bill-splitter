import ThemeToggle from "./ThemeToggle";

export default function Header({ theme, setTheme }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div className="header-left">
            <div className="header-logo-box">₹</div>
            <div className="header-info">
              <div className="header-title-row">
                <h1>SplitMate</h1>
                <span className="header-tagline">
                  Split bills in seconds ✦
                </span>
              </div>
              <div className="header-creator">
                Created by Palak Rawat &middot;{" "}
                <a href="mailto:rawatpalak140@gmail.com">rawatpalak140@gmail.com</a>
              </div>
              <div className="header-badges">
                <span className="header-badge">✓ Free Online Tool</span>
                <span className="header-badge">✓ No Login Required</span>
                <span className="header-badge">✓ ₹0 Spent</span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}
