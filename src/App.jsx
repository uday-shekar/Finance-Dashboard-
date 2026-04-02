import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';

// Lazy loading pages for better build performance and code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TransactionsPage = lazy(() => import('./pages/Transactions'));
const InsightsPage = lazy(() => import('./pages/Insights'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
        Loading Mava...
      </p>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState('Admin'); 
  
  // Persist Dark Mode preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Sync theme with localStorage and document body
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Page Transition Variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <div className="flex">
        
        {/* Sidebar: Navigation and Role display */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          role={role} 
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        {/* Main Content Area */}
        <main className="flex-1 ml-64 min-h-screen relative overflow-x-hidden">
          {/* Suspense handles the loading state of lazy components */}
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              
              {/* Dashboard Content */}
              {activeTab === 'dashboard' && (
                <motion.div key="dashboard" {...pageVariants} className="w-full">
                  <Dashboard 
                    role={role} 
                    setRole={setRole} 
                    darkMode={darkMode} 
                    toggleTheme={toggleTheme} 
                  />
                </motion.div>
              )}

              {/* Transactions Content */}
              {activeTab === 'transactions' && (
                <motion.div key="transactions" {...pageVariants} className="w-full">
                  <TransactionsPage 
                    role={role} 
                    darkMode={darkMode} 
                  />
                </motion.div>
              )}

              {/* Insights Content */}
              {activeTab === 'insights' && (
                <motion.div key="insights" {...pageVariants} className="w-full">
                  <InsightsPage 
                    darkMode={darkMode} 
                  />
                </motion.div>
              )}
              
            </AnimatePresence>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;