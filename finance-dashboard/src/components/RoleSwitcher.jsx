import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye } from 'lucide-react';

const RoleSwitcher = ({ role, setRole }) => {
  // Safe check for role string
  const isAdmin = role?.toLowerCase() === 'admin';

  return (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all">
      <div className="relative flex items-center bg-slate-100 dark:bg-slate-900 rounded-xl p-1 w-48 overflow-hidden">
        
        {/* Sliding Background Highlight */}
        <motion.div
          className="absolute h-8 bg-white dark:bg-indigo-600 rounded-lg shadow-sm z-0"
          initial={false}
          animate={{
            // Adjusted x percentage for perfect alignment
            x: isAdmin ? '104%' : '0%', 
            width: '48%',
          }}
          // FIXED: Round bracket changed to curly brace
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Viewer Option */}
        <button
          type="button"
          onClick={() => setRole('Viewer')}
          className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors duration-300 ${
            !isAdmin ? 'text-indigo-600 dark:text-white' : 'text-slate-400'
          }`}
        >
          <Eye size={12} />
          Viewer
        </button>

        {/* Admin Option */}
        <button
          type="button"
          onClick={() => setRole('Admin')}
          className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors duration-300 ${
            isAdmin ? 'text-indigo-600 dark:text-white' : 'text-slate-400'
          }`}
        >
          <ShieldCheck size={12} />
          Admin
        </button>
      </div>

      {/* Mini Status Indicator */}
      <div className="hidden md:flex items-center gap-2 pr-2 border-l border-slate-100 dark:border-slate-800 pl-4">
        <div className={`w-2 h-2 rounded-full animate-pulse transition-all duration-500 ${
          isAdmin 
            ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' 
            : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
        }`} />
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
          System {isAdmin ? 'Unlocked' : 'Restricted'}
        </span>
      </div>
    </div>
  );
};

export default RoleSwitcher;