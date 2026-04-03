import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, ComposedChart, Line 
} from 'recharts';
import { TrendingUp, CreditCard, Calendar, Target, AlertCircle, ArrowUpRight } from 'lucide-react';

const spendingData = [
  { name: 'Rent', value: 55000, color: '#6366f1' },
  { name: 'Shopping', value: 21000, color: '#ec4899' },
  { name: 'Education', value: 14000, color: '#8b5cf6' },
  { name: 'Food', value: 13000, color: '#f43f5e' },
  { name: 'Utilities', value: 8000, color: '#0ea5e9' },
  { name: 'Healthcare', value: 7000, color: '#10b981' },
  { name: 'Transport', value: 6000, color: '#f59e0b' },
  { name: 'Entertainment', value: 3000, color: '#64748b' },
];

const comparisonData = [
  { month: 'Jan', income: 85000, expense: 42000 },
  { month: 'Feb', income: 85000, expense: 38000 },
  { month: 'Mar', income: 95000, expense: 45000 },
  { month: 'Apr', income: 85000, expense: 52000 },
];

const Insights = ({ darkMode }) => {
  if (!spendingData || spendingData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-400">
        <AlertCircle size={48} className="mb-4" />
        <p>No data available to generate insights, mava!</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8 bg-[#f8fafc] dark:bg-[#0f172a] min-h-screen overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
              Smart Insights
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              AI-powered analysis of your spending habits.
            </p>
          </div>

          <div className="hidden md:block bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-xl border">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <ArrowUpRight size={14} /> Update Live
            </span>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <InsightCard icon={<Target className="text-indigo-500" size={20} />} title="Highest Category" value="Rent" sub="₹55,000 this month" percentage="45%" />
          <InsightCard icon={<Calendar className="text-emerald-500" size={20} />} title="Best Month" value="Aug 2024" sub="Savings ₹85K" percentage="+12%" />
          <InsightCard icon={<TrendingUp className="text-blue-500" size={20} />} title="Avg Spend" value="₹10,500" sub="Safe margin 20%" />
          <InsightCard icon={<CreditCard className="text-rose-500" size={20} />} title="Volume" value="87 Txns" sub="68 Exp | 19 Inc" />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">

          {/* BAR CHART */}
          <div className="xl:col-span-2 bg-white dark:bg-[#1e293b] p-4 sm:p-6 md:p-8 rounded-3xl shadow-sm">
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">Spending by Category</h3>

            <div className="h-[250px] sm:h-[300px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                    {spendingData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* COMPARISON */}
          <div className="bg-white dark:bg-[#1e293b] p-4 sm:p-6 md:p-8 rounded-3xl shadow-sm">
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">Income vs Expense</h3>

            <div className="h-[220px] sm:h-[260px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={comparisonData}>
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Bar dataKey="income" fill="#10b981" />
                  <Line type="monotone" dataKey="expense" stroke="#f43f5e" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* OBSERVATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 md:p-8 rounded-3xl text-white relative overflow-hidden">
            <h3 className="text-lg font-bold mb-3 flex gap-2 items-center">
              <TrendingUp size={20}/> Smart Observation
            </h3>
            <p className="text-sm">
              Savings rate <b>87%</b>. Food expense increased. Set daily limit.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 md:p-8 rounded-3xl shadow-sm">
            <h4 className="text-sm font-bold mb-4 flex gap-2 items-center">
              <AlertCircle size={18}/> Alerts
            </h4>
            <div className="space-y-3">
              <AlertItem label="Rent" status="Due" color="text-rose-500"/>
              <AlertItem label="AWS" status="Paid" color="text-green-500"/>
              <AlertItem label="Savings" status="90%" color="text-indigo-500"/>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const InsightCard = ({ title, value, sub, percentage, icon }) => (
  <div className="bg-white dark:bg-[#1e293b] p-4 sm:p-6 rounded-2xl hover:scale-[1.02] transition">
    <div className="flex justify-between mb-3">
      {icon}
      {percentage && <span className="text-xs text-green-500">{percentage}</span>}
    </div>
    <p className="text-xs text-slate-400">{title}</p>
    <h3 className="text-xl sm:text-2xl font-bold">{value}</h3>
    <p className="text-xs">{sub}</p>
  </div>
);

const AlertItem = ({ label, status, color }) => (
  <div className="flex justify-between text-xs">
    <span>{label}</span>
    <span className={color}>{status}</span>
  </div>
);

export default Insights;