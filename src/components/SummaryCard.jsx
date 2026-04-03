import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCard = ({ title, amount, sub, border }) => {

  const isPositive =
    sub?.includes('+') ||
    sub?.toLowerCase().includes('higher') ||
    sub?.toLowerCase().includes('increase');

  const isNegative =
    sub?.includes('-') ||
    sub?.includes('↓') ||
    sub?.toLowerCase().includes('decrease');

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-[#1e293b]
        p-4 sm:p-5 md:p-6
        rounded-2xl shadow-sm
        border-t-4 ${border}
        border-x border-b border-slate-100 dark:border-slate-800
        transition-all duration-300 relative overflow-hidden group`}
    >

      {/* 🔥 Background Effect */}
      <div
        className={`absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-5 group-hover:opacity-10 transition-opacity
        ${border.replace('border-', 'bg-')}`}
      />

      <div className="relative z-10">

        {/* TITLE */}
        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-[0.15em] mb-2 uppercase">
          {title}
        </p>

        {/* AMOUNT */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          {amount}
        </h2>

        {/* SUB TEXT */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          
          {isPositive && (
            <TrendingUp size={14} className="text-emerald-500 shrink-0" />
          )}

          {isNegative && (
            <TrendingDown size={14} className="text-rose-500 shrink-0" />
          )}

          <p
            className={`text-[10px] sm:text-[11px] font-bold break-words ${
              isPositive
                ? 'text-emerald-500'
                : isNegative
                ? 'text-rose-500'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryCard;