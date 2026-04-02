import React from 'react';
import { motion } from 'framer-motion';
import SummaryCard from '../components/SummaryCard';
import { BalanceTrend, SpendingPie } from '../components/Charts';
import { LayoutDashboard, ShieldCheck, ShieldAlert, Moon, Sun } from 'lucide-react';

const Dashboard = ({ role, setRole, darkMode, toggleTheme }) => {
  // Animation Variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-10 space-y-8 bg-[#f8fafc] dark:bg-[#0f172a] min-h-screen transition-colors duration-300"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
              Dashboard Overview
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back, mava! Checking your <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{role}</span> insights.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* ROLE TOGGLE BUTTON */}
          <button 
            onClick={() => setRole(role === 'Admin' ? 'Viewer' : 'Admin')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all duration-300 ${
              role === 'Admin' 
              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800' 
              : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800'
            }`}
          >
            {role === 'Admin' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
            {role} Mode
          </button>
          
          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-600" />}
          </button>
        </div>
      </motion.div>

      {/* Summary Cards Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          title="Total Balance" 
          amount="₹8,65,550" 
          sub="+12% from last month" 
          border="border-indigo-500" 
        />
        <SummaryCard 
          title="Total Income" 
          amount="₹10,02,400" 
          sub="6.3% higher than usual" 
          border="border-emerald-400" 
        />
        <SummaryCard 
          title="Total Expenses" 
          amount="₹1,36,850" 
          sub="↓ 29.8% decrease" 
          border="border-rose-400" 
        />
        <SummaryCard 
          title="Savings Rate" 
          amount="86.4%" 
          sub="Based on 87 entries" 
          border="border-amber-400" 
        />
      </motion.div>

      {/* Visualizations Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
        
        {/* Time-based Visualization (Large) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Balance Trend</h3>
              <p className="text-xs text-slate-400">Financial growth over the last 6 months</p>
            </div>
            <div className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Real-time Data</div>
          </div>
          <div className="h-[320px] w-full">
            <BalanceTrend darkMode={darkMode} />
          </div>
        </div>

        {/* Categorical Visualization (Small) */}
        <div className="lg:col-span-1 bg-white dark:bg-[#1e293b] p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Spending Breakdown</h3>
            <p className="text-xs text-slate-400">Category-wise expenses</p>
          </div>
          <div className="h-[320px] w-full flex items-center justify-center">
            <SpendingPie darkMode={darkMode} />
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default Dashboard;