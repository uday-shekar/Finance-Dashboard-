import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, ArrowRightLeft, BarChart3, 
  ShieldCheck, User, Menu, X 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, role }) => {

  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'transactions', label: 'Transactions', icon: <ArrowRightLeft size={18} /> },
    { id: 'insights', label: 'Insights', icon: <BarChart3 size={18} /> },
  ];

  const isAdmin = role === 'Admin';

  return (
    <>
      {/*  MOBILE TOP BAR */}
      {!isDesktop && (
        <div className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-white dark:bg-[#0f172a] border-b z-50">
          <h1 className="text-lg font-bold">
            Fin<span className="text-indigo-600">Flow</span>
          </h1>
          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </div>
      )}

      {/*  OVERLAY */}
      <AnimatePresence>
        {open && !isDesktop && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>

      {/*  SIDEBAR */}
      <AnimatePresence>
        {(open || isDesktop) && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-[#0f172a] border-r flex flex-col z-50 lg:static"
          >

            {/*  BRAND HEADER */}
            <div className="px-5 py-6 border-b">
              <div className="flex items-center gap-3">
                
                {/* LOGO */}
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
                  F
                </div>

                <div>
                  <h1 className="text-lg font-bold text-slate-800 dark:text-white">
                    Fin<span className="text-indigo-600">Flow</span>
                  </h1>
                  <p className="text-[10px] tracking-[0.2em] text-slate-400">
                    SMART FINANCE
                  </p>
                </div>
              </div>
            </div>

            {/*  MENU */}
            <div className="flex-1 px-3 py-4">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className={`${isActive ? 'text-indigo-600' : ''}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/*  ROLE CARD */}
            <div className="p-4 m-4 rounded-2xl bg-slate-100 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isAdmin
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {isAdmin ? <ShieldCheck size={16} /> : <User size={16} />}
                </div>

                <div>
                  <p className="text-[10px] tracking-wider text-slate-400 uppercase">
                    AUTHENTICATED
                  </p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {isAdmin ? 'Admin Mode' : 'User Mode'}
                  </p>
                </div>
              </div>
            </div>

          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;