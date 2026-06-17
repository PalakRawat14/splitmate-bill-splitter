# SplitMate – Smart Expense Splitting Web App

SplitMate is a responsive expense-sharing web app that helps groups manage shared bills, calculate individual balances, and generate an optimized settlement plan. It runs fully in the browser using client-side storage, with no backend or login required.

Live tool URL: https://splitmate-bill-splitter.vercel.app

## Key Highlights

* Built with Next.js and JavaScript
* Fully client-side application with no backend dependency
* Optimized settlement calculation using net balance simplification
* Persistent bill history using browser localStorage
* Shareable expense breakdown links using URL encoding
* Dark/light mode with saved theme preference
* Responsive glassmorphism UI for desktop and mobile
* Ready to deploy on Vercel

## Features

### Friend Management

Add and remove friends with validation, duplicate-name prevention, and clean friend chips.

### Expense Tracking

Create expenses with title, amount, payer, and selected participants.

### Equal Split Calculation

Split expenses equally among selected members. The app supports selected-member splitting, so only the people involved in an expense are included in the calculation.

### Optimized Settlement Plan

SplitMate calculates net balances first, then generates a simplified payment plan to reduce unnecessary transactions.

### Bill History

Save, load, and delete previous bills using localStorage. Saved bills remain available after refreshing the browser.

### Shareable Breakdown Links

Create a shareable URL containing the bill data. Anyone with the link can load and view the expense breakdown.

Note: Shareable links work best for small and medium bills. Very large bills may create long URLs.

### Theme Toggle

Switch between dark and light mode. The selected theme is saved locally.

### Copy Settlement Summary

Copy the final settlement plan in a clean text format for sharing with friends.

### Mini Analytics Dashboard

View useful insights such as total spending, highest spender, largest expense, average expense, and settlement count.

## Tech Stack

| Area       | Technology            |
| ---------- | --------------------- |
| Framework  | Next.js               |
| Language   | JavaScript            |
| Styling    | CSS, Glassmorphism UI |
| Storage    | localStorage          |
| Deployment | Vercel                |

## Algorithm Explanation

### Balance Calculation

For every expense:

1. The payer is credited with the full expense amount.
2. The expense amount is divided equally among selected participants.
3. Each participant is debited their share.
4. Final net balances are calculated for every person.

A positive balance means the person should receive money.
A negative balance means the person owes money.

### Settlement Optimization

After calculating net balances:

1. People with positive balances become creditors.
2. People with negative balances become debtors.
3. The app matches debtors and creditors using a greedy settlement approach.
4. Each transaction settles as much debt as possible.
5. Very small differences below ₹0.01 are treated as zero.

This reduces unnecessary circular payments and creates a simpler settlement plan.

## Example

Friends:

* Palak
* Rahul
* Ankit

Expenses:

* Dinner: ₹900 paid by Palak, shared by Palak, Rahul, Ankit
* Cab: ₹300 paid by Rahul, shared by Palak, Rahul

Expected settlement:

* Rahul pays Palak ₹150
* Ankit pays Palak ₹300

## Project Structure

```txt
app/
  page.js
  globals.css

components/
  Header.js
  FriendManager.js
  ExpenseForm.js
  ExpenseList.js
  Summary.js
  BillHistory.js
  ThemeToggle.js
  ShareableLinkButton.js
  CopySummaryButton.js
  ResetButton.js
  Footer.js

lib/
  calculations.js
  storage.js
```

## How to Run Locally

```bash
git clone https://github.com/PalakRawat14/ADD_REPO_NAME_HERE.git
cd ADD_REPO_NAME_HERE
npm install
npm run dev
```

Open this URL in your browser:

```txt
http://localhost:3000
```

## Build for Production

```bash
npm run build
```

## Deployment

The project is ready to deploy on Vercel.

Steps:

1. Push the code to GitHub.
2. Open Vercel.
3. Import the GitHub repository.
4. Keep the default Next.js settings.
5. Click Deploy.

## Testing Checklist

See [`TESTING.md`](./TESTING.md) for detailed manual test cases.

Main checks:

* Add friends
* Prevent duplicate friends
* Add expenses
* Calculate balances
* Generate settlement plan
* Save and load bill history
* Test dark/light mode
* Create shareable link
* Copy settlement summary
* Reset all data
* Test responsive layout

## Future Improvements

* Percentage and custom split modes
* CSV/PDF export
* Multi-currency support
* Category-based filters
* Receipt upload
* Group dashboard
* Backend version with authentication and database storage
