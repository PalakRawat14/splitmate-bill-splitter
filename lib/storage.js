const FRIENDS_KEY = "splitmate_friends";
const EXPENSES_KEY = "splitmate_expenses";
const HISTORY_KEY = "splitmate_bill_history";
const THEME_KEY = "splitmate_theme";

function parseArray(data) {
  try {
    const val = JSON.parse(data);
    return Array.isArray(val) ? val : [];
  } catch {
    return [];
  }
}

export function loadFriends() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(FRIENDS_KEY);
  return data ? parseArray(data) : [];
}

export function saveFriends(friends) {
  try {
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
  } catch {
    /* storage full or unavailable */
  }
}

export function loadExpenses() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(EXPENSES_KEY);
  return data ? parseArray(data) : [];
}

export function saveExpenses(expenses) {
  try {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch {
    /* storage full or unavailable */
  }
}

export function clearSplitMateData() {
  try {
    localStorage.removeItem(FRIENDS_KEY);
    localStorage.removeItem(EXPENSES_KEY);
  } catch {
    /* unavailable */
  }
}

/* Bill History */
export function loadBillHistory() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? parseArray(data) : [];
}

export function saveBillHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    /* storage full */
  }
}

export function addBillToHistory(bill) {
  const history = loadBillHistory();
  history.unshift(bill);
  saveBillHistory(history);
  return history;
}

export function deleteBillFromHistory(id) {
  const history = loadBillHistory().filter((b) => b.id !== id);
  saveBillHistory(history);
  return history;
}

export function clearBillHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    /* unavailable */
  }
}

/* Theme */
export function loadTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const val = localStorage.getItem(THEME_KEY);
    if (val === "dark" || val === "light") return val;
    return "light";
  } catch {
    return "light";
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* unavailable */
  }
}
