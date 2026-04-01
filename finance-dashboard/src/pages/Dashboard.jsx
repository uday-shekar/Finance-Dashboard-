import { useState } from "react";
import { transactions as data } from "../data/transactions";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const [transactions, setTransactions] = useState(data);

  // ✅ Calculations
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // ✅ Chart Data
  const lineData = [
    { name: "Jan", value: 10000 },
    { name: "Feb", value: 20000 },
    { name: "Mar", value: 30000 },
    { name: "Apr", value: 40000 },
    { name: "May", value: 50000 },
    { name: "Jun", value: 60000 },
  ];

  const pieData = [
    { name: "Food", value: 400 },
    { name: "Shopping", value: 300 },
    { name: "Bills", value: 200 },
    { name: "Transport", value: 100 },
  ];

  const COLORS = ["#ec4899", "#8b5cf6", "#3b82f6", "#10b981"];

  return (
    <div className="p-6 bg-[#f5f7fb] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border-t-4 border-blue-500">
          <p className="text-gray-400 text-sm">TOTAL BALANCE</p>
          <h2 className="text-2xl font-bold">
            ₹ {balance.toLocaleString()}
          </h2>
          <p className="text-gray-400 text-xs">Net balance</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-t-4 border-green-500">
          <p className="text-gray-400 text-sm">TOTAL INCOME</p>
          <h2 className="text-2xl font-bold">
            ₹ {totalIncome.toLocaleString()}
          </h2>
          <p className="text-red-400 text-xs">↓ vs last month</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-t-4 border-red-500">
          <p className="text-gray-400 text-sm">TOTAL EXPENSES</p>
          <h2 className="text-2xl font-bold">
            ₹ {totalExpense.toLocaleString()}
          </h2>
          <p className="text-red-400 text-xs">↓ vs last month</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-t-4 border-purple-500">
          <p className="text-gray-400 text-sm">SAVINGS RATE</p>
          <h2 className="text-2xl font-bold">
            {((balance / totalIncome) * 100).toFixed(1)}%
          </h2>
          <p className="text-gray-400 text-xs">
            {transactions.length} transactions
          </p>
        </div>
      </div>

      {/* ✅ Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Balance Trend</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">
            Spending by Category
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ✅ Transactions */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">
          Transactions
        </h2>

        {transactions.length === 0 ? (
          <p>No transactions available</p>
        ) : (
          transactions.map((t) => (
            <div
              key={t.id}
              className="flex justify-between border-b py-2"
            >
              <span>{t.date}</span>
              <span>{t.category}</span>
              <span>₹ {t.amount}</span>
              <span
                className={
                  t.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {t.type}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;