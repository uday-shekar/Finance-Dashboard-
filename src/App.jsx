import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';

// Lazy pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TransactionsPage = lazy(() => import('./pages/Transactions'));
const InsightsPage = lazy(() => import('./pages/Insights'));

//  LOADER
const PageLoader = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState('Admin');

  //  DARK MODE
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  //  LOCK BODY SCROLL
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  //  PAGE ANIMATION
  const pageVariants = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: { duration: 0.2 }
  };

  return (
    <div className="h-screen w-full flex bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100">

      {/*  SIDEBAR */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={role} 
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      {/*  MAIN CONTENT */}
      <main
        className="
          flex-1 
          h-screen 
          overflow-y-auto
          overflow-x-hidden
          pt-14        
          lg:pt-0      
          px-3 sm:px-4
        "
      >
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">

            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard" 
                {...pageVariants} 
                className="min-h-full"
              >
                <Dashboard 
                  role={role} 
                  setRole={setRole} 
                  darkMode={darkMode} 
                  toggleTheme={toggleTheme} 
                />
              </motion.div>
            )}

            {/* TRANSACTIONS */}
            {activeTab === 'transactions' && (
              <motion.div 
                key="transactions" 
                {...pageVariants} 
                className="min-h-full"
              >
                <TransactionsPage 
                  role={role} 
                  darkMode={darkMode} 
                />
              </motion.div>
            )}

            {/* INSIGHTS */}
            {activeTab === 'insights' && (
              <motion.div 
                key="insights" 
                {...pageVariants} 
                className="min-h-full"
              >
                <InsightsPage 
                  darkMode={darkMode} 
                />
              </motion.div>
            )}

          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
}

export default App;