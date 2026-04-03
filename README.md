# 💰 Finance Dashboard UI

A clean, responsive, and interactive finance dashboard built to help users track financial activity, analyze spending patterns, and manage transactions effectively.

---

## 🚀 Live Demo

👉 https://finance-dashboard-i79c.vercel.app/

---

## 📌 Objective

This project was built as part of a Frontend Developer Internship assignment.
The goal is to demonstrate:

* UI design skills
* Component structuring
* State management
* Data visualization
* User experience thinking

---

## ✨ Features

### 📊 Dashboard Overview

* Total Balance, Income, and Expenses summary cards
* Time-based visualization (balance trend)
* Category-based visualization (spending breakdown)

---

### 💳 Transactions Section

* View all transactions with:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)
* Features:

  * 🔍 Search transactions
  * 🧮 Filter by type & category
  * ↕️ Sort (Newest / Oldest)

---

### 🔐 Role-Based UI (Simulated)

* **Admin**

  * Add transactions
  * Edit transactions
  * Delete transactions

* **Viewer**

  * Read-only access

* Role switching via dropdown (for demo purposes)

---

### 📈 Insights Section

* Highest spending category
* Monthly spending comparison
* Key observations based on transaction data

---

### 🎨 UI/UX Enhancements

* 🌙 Dark mode support
* 📱 Fully responsive design
* ⚡ Smooth animations (Framer Motion / GSAP)
* 🧼 Clean and minimal interface

---

## 🧠 State Management

* `useState` → for managing transactions, filters, and role
* `useMemo` → for optimized filtering and sorting
* Simple and scalable approach without external libraries

---

## 📁 Project Structure

```
src/
 ├── components/      # Reusable UI components
 ├── pages/           # Main pages (Dashboard, Transactions, etc.)
 ├── data/            # Mock data
 ├── App.jsx          # Root component
 └── main.jsx         # Entry point
```

---

## 🛠️ Tech Stack

* **Framework:** React
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion, GSAP
* **Charts:** (Recharts / Chart.js — update based on your project)
* **Deployment:** Vercel

---

## ⚙️ Installation & Setup

1. Clone the repository:

```
https://github.com/uday-shekar/Finance-Dashboard-.git
```

2. Navigate to project folder:

```
cd finance-dashboard
```

3. Install dependencies:

```
npm install
```

4. Run the project:

```
npm run dev
```

---

## 📦 Data Handling

* Uses **mock/static data**
* No backend required
* Optional: Can be extended with API integration

---

## ⚠️ Edge Case Handling

* Displays message when no transactions are available
* Handles empty search/filter results gracefully
* Prevents invalid actions in Viewer mode

---

## 🚀 Optional Enhancements Implemented

* ✅ Dark mode
* ✅ Animations
* ✅ Responsive design
* ✅ Role-based UI
* ✅ Clean UX patterns

---

## 🔮 Future Improvements

* API integration (real backend)
* Data persistence (localStorage / database)
* Export transactions (CSV/JSON)
* Advanced analytics & insights
* User authentication

---

## 👨‍💻 Author

**Nallamolu Uday Shekar**
📧 [udayshekarnallamolu@gmail.com](mailto:udayshekarnallamolu@gmail.com)

---

## 📄 License

This project is for evaluation purposes only.
