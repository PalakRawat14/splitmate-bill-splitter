export function roundMoney(amount) {
  const rounded = Math.round(amount * 100) / 100;
  return Math.abs(rounded) < 0.01 ? 0 : rounded;
}

export function formatCurrency(amount) {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `₹${formatted}`;
}

export function calculateTotalSpent(expenses) {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function calculateHighestSpender(expenses, friends) {
  if (expenses.length === 0) return null;
  const totals = {};
  expenses.forEach((e) => {
    totals[e.paidByPersonId] = (totals[e.paidByPersonId] || 0) + e.amount;
  });
  let maxId = null;
  let maxAmt = 0;
  Object.entries(totals).forEach(([id, amt]) => {
    if (amt > maxAmt) {
      maxAmt = amt;
      maxId = id;
    }
  });
  const person = friends.find((f) => f.id === maxId);
  return person ? { name: person.name, amount: maxAmt } : null;
}

export function calculateLargestExpense(expenses) {
  if (expenses.length === 0) return null;
  let max = expenses[0];
  expenses.forEach((e) => {
    if (e.amount > max.amount) max = e;
  });
  return max;
}

export function calculateAverageExpense(expenses) {
  if (expenses.length === 0) return 0;
  return expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length;
}

export function calculateBalances(friends, expenses) {
  const balances = friends.map((friend) => ({
    personId: friend.id,
    name: friend.name,
    amount: 0,
  }));

  expenses.forEach((expense) => {
    const payer = balances.find((b) => b.personId === expense.paidByPersonId);
    if (payer) {
      payer.amount = roundMoney(payer.amount + expense.amount);
    }

    const share = roundMoney(expense.amount / expense.participantIds.length);
    expense.participantIds.forEach((participantId) => {
      const participant = balances.find((b) => b.personId === participantId);
      if (participant) {
        participant.amount = roundMoney(participant.amount - share);
      }
    });
  });

  return balances;
}

export function calculateSettlements(balances) {
  const settlements = [];

  const debtors = balances
    .filter((b) => b.amount < -0.01)
    .map((b) => ({ ...b, amount: Math.abs(b.amount) }))
    .sort((a, b) => b.amount - a.amount);

  const creditors = balances
    .filter((b) => b.amount > 0.01)
    .map((b) => ({ ...b, amount: b.amount }))
    .sort((a, b) => b.amount - a.amount);

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const minAmount = roundMoney(Math.min(debtors[i].amount, creditors[j].amount));

    if (minAmount > 0) {
      settlements.push({
        from: debtors[i].name,
        to: creditors[j].name,
        amount: minAmount,
      });
    }

    debtors[i].amount = roundMoney(debtors[i].amount - minAmount);
    creditors[j].amount = roundMoney(creditors[j].amount - minAmount);

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }

  return settlements;
}
