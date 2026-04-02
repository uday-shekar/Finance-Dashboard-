import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, ComposedChart, Line, Area 
} from 'recharts';
import { TrendingUp, CreditCard, Calendar, Target, AlertCircle, ArrowUpRight } from 'lucide-react';

// Categorical Data: Spending Breakdown
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

// Monthly Comparison Data (Requirement 4)
const comparisonData = [
  { month: 'Jan', income: 85000, expense: 42000 },
  { month: 'Feb', income: 85000, expense: 38000 },
  { month: 'Mar', income: 95000, expense: 45000 },
  { month: 'Apr', income: 85000, expense: 52000 },
];

const Insights = ({ darkMode }) => {
  // Graceful Handling for Empty Data (Requirement 6)
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
      className="p-6 md:p-10 space-y-8 bg-[#f8fafc] dark:bg-[#0f172a] min-h-screen transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Smart Insights</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">AI-powered analysis of your spending habits.</p>
          </div>
          <div className="hidden md:block bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <ArrowUpRight size={14} /> Update Live
            </span>
          </div>
        </div>

        {/* 1. Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InsightCard 
            icon={<Target className="text-indigo-500" size={20} />}
            title="Highest Category" 
            value="Rent" 
            sub="₹55,000 this month" 
            percentage="45% of total"
          />
          <InsightCard 
            icon={<Calendar className="text-emerald-500" size={20} />}
            title="Best Month" 
            value="Aug 2024" 
            sub="Savings: ₹85,000" 
            percentage="+12% ROI"
          />
          <InsightCard 
            icon={<TrendingUp className="text-blue-500" size={20} />}
            title="Avg Monthly Spend" 
            value="₹10,500" 
            sub="Safety margin: 20%" 
          />
          <InsightCard 
            icon={<CreditCard className="text-rose-500" size={20} />}
            title="Volume" 
            value="87 Txns" 
            sub="68 Expenses | 19 Income" 
          />
        </div>

        {/* 2. Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Horizontal Bar Chart: Category Breakdown */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="mb-8">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">Spending by Category</h3>
              <p className="text-xs text-slate-400">Where your money goes</p>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={spendingData} margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={darkMode ? "#334155" : "#f1f5f9"} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    fontSize={12} 
                    width={90}
                    stroke={darkMode ? "#94a3b8" : "#64748b"}
                  />
                  <Tooltip 
                    cursor={{fill: darkMode ? '#ffffff05' : '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: darkMode ? '#0f172a' : '#fff', color: darkMode ? '#fff' : '#000', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={14}>
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Comparison Chart (Requirement 4) */}
          <div className="lg:col-span-1 bg-white dark:bg-[#1e293b] p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6">Income vs Expense</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={comparisonData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: darkMode ? '#0f172a' : '#fff' }}/>
                  <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                  <Line type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-bold">Monthly Trend Analysis</p>
          </div>
        </div>

        {/* 3. Observations & Alerts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Observation Box */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={20} /> Smart Observation
              </h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                 your current savings rate is <span className="text-white font-bold text-lg">87%</span>. While your income remains steady, your food expenses increased by 15% this week. Consider setting a daily cap."
              </p>
              <button className="text-xs font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all">Review Food Budget</button>
            </div>
            {/* Background Decoration */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Budget Alerts Panel */}
          <div className="bg-white dark:bg-[#1e293b] p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 uppercase tracking-wider">
              <AlertCircle size={18} className="text-amber-500" /> Action Required
            </h4>
            <div className="space-y-4">
              <AlertItem label="Rent Payment" status="Due in 2 days" color="text-rose-500" />
              <AlertItem label="AWS Subscription" status="Paid" color="text-emerald-500" />
              <AlertItem label="Savings Goal" status="90% Reached" color="text-indigo-500" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Sub-components for better modularity
const InsightCard = ({ title, value, sub, percentage, icon }) => (
  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">{icon}</div>
      {percentage && (
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
          {percentage}
        </span>
      )}
    </div>
    <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-1 uppercase">{title}</p>
    <h3 className="text-2xl font-bold mb-1 text-slate-800 dark:text-white">{value}</h3>
    <p className="text-[11px] text-slate-400 font-medium">{sub}</p>
  </div>
);

const AlertItem = ({ label, status, color }) => (
  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{label}</span>
    <span className={`text-[10px] font-black uppercase ${color}`}>{status}</span>
  </div>
);

export default Insights;