import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ArrowRightLeft, BarChart3, ShieldCheck, User } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, role, darkMode }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'transactions', label: 'Transactions', icon: <ArrowRightLeft size={18} /> },
    { id: 'insights', label: 'Insights', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 flex flex-col fixed left-0 top-0 transition-colors duration-300 z-50">
      
      {/* Logo Section */}
      <div className="p-8 pb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic">
            F
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
            Fin<span className="text-indigo-600 dark:text-indigo-400">Flow</span>
          </h1>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] mt-2 pl-1">
          Smart Finance
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                isActive 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {/* Active Background Pill */}
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border-r-4 border-indigo-600 dark:border-indigo-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="relative z-10 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Role Section */}
      <div className="p-4 mx-4 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-inner">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${role === 'Admin' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
            {role === 'Admin' ? <ShieldCheck size={16} /> : <User size={16} />}
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Authenticated
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {role} Mode
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;