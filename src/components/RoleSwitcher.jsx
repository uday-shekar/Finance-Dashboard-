import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye } from 'lucide-react';

const RoleSwitcher = ({ role, setRole }) => {
  const isAdmin = role?.toLowerCase() === 'admin';

  return (
    <div
      className="flex items-center justify-between gap-3 
      bg-white dark:bg-slate-800 
      p-2 sm:p-2.5 
      rounded-2xl 
      border border-slate-200 dark:border-slate-700 
      shadow-sm transition-all w-full max-w-sm"
    >
      {/* SWITCH */}
      <div className="relative flex items-center bg-slate-100 dark:bg-slate-900 rounded-xl p-1 w-full overflow-hidden">

        {/* 🔥 SLIDER FIX (NO % BUG) */}
        <motion.div
          className="absolute top-1 bottom-1 w-1/2 bg-white dark:bg-indigo-600 rounded-lg shadow-sm z-0"
          initial={false}
          animate={{
            x: isAdmin ? '100%' : '0%',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />

        {/* VIEWER */}
        <button
          type="button"
          onClick={() => setRole('Viewer')}
          className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 
            py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wide transition-colors
            ${!isAdmin ? 'text-indigo-600 dark:text-white' : 'text-slate-400'}
          `}
        >
          <Eye size={14} />
          Viewer
        </button>

        {/* ADMIN */}
        <button
          type="button"
          onClick={() => setRole('Admin')}
          className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 
            py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wide transition-colors
            ${isAdmin ? 'text-indigo-600 dark:text-white' : 'text-slate-400'}
          `}
        >
          <ShieldCheck size={14} />
          Admin
        </button>
      </div>

      {/* 🔥 STATUS (ONLY DESKTOP) */}
      <div className="hidden sm:flex items-center gap-2 px-2 border-l border-slate-200 dark:border-slate-700">
        
        <div
          className={`w-2 h-2 rounded-full animate-pulse ${
            isAdmin
              ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]'
              : 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]'
          }`}
        />

        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">
          {isAdmin ? 'Admin Mode' : 'Viewer Mode'}
        </span>
      </div>
    </div>
  );
};

export default RoleSwitcher;