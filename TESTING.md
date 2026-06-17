# SplitMate – Testing Checklist

## Test 1: Equal Split

**Setup:**
- Friends: Palak, Rahul, Ankit
- Expense: Dinner ₹900 paid by Palak, shared by all three

**Expected Settlement:**
- Rahul pays Palak ₹300
- Ankit pays Palak ₹300

**Verification:** Summary section shows the two settlement transactions above.

---

## Test 2: Selected Members

**Setup:**
- Friends: Palak, Rahul, Ankit
- Expense: Cab ₹300 paid by Rahul, shared by Palak and Rahul only

**Expected Settlement:**
- Palak owes Rahul ₹150

**Verification:** Summary shows only Palak → Rahul ₹150. Ankit is settled.

---

## Test 3: Combined Settlement

**Setup:**
- Friends: Palak, Rahul, Ankit
- Expense 1: Dinner ₹900 paid by Palak, shared by Palak, Rahul, Ankit
- Expense 2: Cab ₹300 paid by Rahul, shared by Palak and Rahul

**Expected Settlement:**
- Rahul pays Palak ₹150
- Ankit pays Palak ₹300

**Verification:** Summary shows both settlements with correct amounts.

---

## Test 4: Bill History

**Steps:**
1. Add friends and expenses
2. Click "Save Current Bill" and enter a title
3. Refresh the page
4. Click "Load" on the saved bill

**Expected:** Friends and expenses are restored exactly as saved.

---

## Test 5: Shareable URL

**Steps:**
1. Add friends and expenses
2. Click "Shareable Link"
3. Open the copied URL in a new tab

**Expected:** A modal appears asking to load the shared bill. Confirm to load.

---

## Test 6: Theme Persistence

**Steps:**
1. Click "Switch to Dark Mode"
2. Refresh the page

**Expected:** Dark mode persists after refresh. Toggle back to light mode and confirm persistence again.
