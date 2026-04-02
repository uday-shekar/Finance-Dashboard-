import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCard = ({ title, amount, sub, border }) => {
  // Check if sub text indicates a positive or negative trend for icon
  const isPositive = sub.includes('+') || sub.toLowerCase().includes('higher') || sub.toLowerCase().includes('increase');
  const isNegative = sub.includes('-') || sub.includes('↓') || sub.toLowerCase().includes('decrease');

  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border-t-4 ${border} border-x border-b border-slate-100 dark:border-slate-800 transition-all duration-300 relative overflow-hidden group`}
    >
      {/* Background Decorative Element */}
      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${border.replace('border-', 'bg-')}`} />

      <div className="relative z-10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-[0.15em] mb-3 uppercase">
          {title}
        </p>
        
        <div className="flex items-baseline gap-1">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight mb-2">
            {amount}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {isPositive && <TrendingUp size={14} className="text-emerald-500" />}
          {isNegative && <TrendingDown size={14} className="text-rose-500" />}
          <p className={`text-[11px] font-bold ${
            isPositive ? 'text-emerald-500' : isNegative ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500'
          }`}>
            {sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryCard;