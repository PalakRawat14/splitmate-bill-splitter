# SplitMate – Smart Expense Splitting Web App

A responsive, glassmorphism-styled expense-sharing web app built with Next.js. Manage group bills, calculate individual balances, and generate optimized settlement plans — all in the browser with no backend required.

## Features

- **Friend Management** – Add and remove friends with duplicate detection and validation
- **Expense Tracking** – Log expenses with title, amount, payer, and selected participants
- **Equal Split** – Splits each expense equally among selected participants
- **Optimized Settlement Plan** – Calculates net balances and minimizes unnecessary payments
- **Bill History** – Save, load, and delete bills using localStorage (persists across sessions)
- **Dark/Light Mode** – Toggle theme with saved preference
- **Shareable Expense Breakdown Links** – Share bills via URL encoding (no backend needed)
- **Copyable Settlement Summary** – One-click copy of the full settlement plan
- **Mini Analytics Dashboard** – View highest spender, largest expense, average expense, and totals
- **Responsive Glassmorphism UI** – Modern frosted-glass design with mobile-first layout
- **Vercel Deployment** – Ready to deploy on Vercel with zero configuration

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** JavaScript
- **Styling:** CSS (custom properties, glassmorphism design system)
- **Storage:** Browser localStorage
- **Deployment:** Vercel

## Live Demo

[View Live Demo](https://splitmate.vercel.app)

## GitHub Repository

[github.com/palakrawat/splitmate](https://github.com/palakrawat/splitmate)

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/palakrawat/splitmate.git

# Navigate to the project directory
cd splitmate

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Algorithm Explanation

### Equal Split Calculation

1. Each expense is divided equally among the selected participants.
2. The payer is credited the full amount.
3. Each participant (including the payer, if selected) is debited their share.

### Optimized Settlement

1. Net balances are computed for each person by summing credits and debits across all expenses.
2. Debtors (negative balance) and creditors (positive balance) are identified.
3. A greedy matching algorithm pairs the largest debtor with the largest creditor, minimizing the number of transactions.
4. The result is a settlement plan that shows exactly who pays whom and how much.

This approach ensures no unnecessary circular payments and produces a minimal set of transactions.

## Testing Checklist

See [`TESTING.md`](./TESTING.md) for detailed test cases covering equal split, selected members, combined settlement, bill history, shareable URLs, and theme persistence.

## Future Improvements

- Advanced split modes (percentage, custom shares, unequal splits)
- Export to PDF/CSV
- Multi-currency support
- Tag/category system with filters
- Receipt image upload (client-side OCR)
- Group dashboard with per-event summaries

## Resume-Ready Project Entry

**SplitMate – Smart Expense Splitting Web App** | Next.js, JavaScript, CSS, LocalStorage, Vercel  
• Built a responsive expense-sharing web app to manage group bills, calculate individual balances, and generate optimized settlement plans.  
• Implemented friend management, selected-member expense splitting, bill history, dark/light mode, and shareable expense breakdown links.  
• Used localStorage for persistent browser data and URL encoding for backend-free bill sharing.  
• Designed a modern glassmorphism dashboard UI with mobile-first responsive layout and deployed the app on Vercel.
