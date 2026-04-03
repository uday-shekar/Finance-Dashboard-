import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { transactions as initialData } from '../data/transactions';
import { Plus, Edit2, Trash2, X, Search, Filter } from 'lucide-react';

const Transactions = ({ role }) => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [sortOrder, setSortOrder] = useState('Newest First');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'Expense',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ["Education","Entertainment","Food","Freelance","Healthcare","Investment","Rent","Salary","Shopping","Subscriptions","Transport","Utilities"];
  const isAdmin = role?.toLowerCase() === 'admin';

  // ---------- HANDLERS ----------
  const handleOpenModal = (t = null) => {
    if (t) {
      setEditingTransaction(t);
      setFormData(t);
    } else {
      setEditingTransaction(null);
      setFormData({
        description: '',
        amount: '',
        category: 'Food',
        type: 'Expense',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedAmount = Number(formData.amount);
    
    if (editingTransaction) {
      setData(data.map(t => t.id === editingTransaction.id ? { ...formData, amount: updatedAmount } : t));
    } else {
      setData([{ ...formData, id: Date.now(), amount: updatedAmount }, ...data]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) {
      setData(data.filter(t => t.id !== id));
    }
  };

  // ---------- FILTER LOGIC ----------
  const filteredData = useMemo(() => {
    let result = [...data];
    if (searchTerm) result = result.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterType !== 'All Types') result = result.filter(t => t.type === filterType);
    if (filterCategory !== 'All Categories') result = result.filter(t => t.category === filterCategory);

    result.sort((a, b) => sortOrder === 'Newest First' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
    return result;
  }, [data, searchTerm, filterType, filterCategory, sortOrder]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-10 space-y-6 bg-[#f8fafc] dark:bg-[#0f172a] min-h-screen text-slate-800 dark:text-slate-100"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-sm text-slate-500">{filteredData.length} records found</p>
        </div>

        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-colors"
          >
            <Plus size={20} /> <span className="hidden sm:inline">Add Transaction</span>
          </motion.button>
        )}
      </div>

      {/* FILTERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            placeholder="Search descriptions..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          onChange={(e) => setFilterType(e.target.value)}
          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
        >
          <option>All Types</option>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <select
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
        >
          <option>All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
        >
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-5 font-semibold">Description</th>
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold text-right">Amount</th>
                {isAdmin && <th className="p-5 font-semibold text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredData.map((t) => (
                <motion.tr key={t.id} layout className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-5">
                    <p className="font-medium dark:text-white">{t.description}</p>
                    <p className="text-xs text-slate-400">{t.date}</p>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {t.category}
                    </span>
                  </td>
                  <td className={`p-5 text-right font-bold ${t.type === 'Expense' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {t.type === 'Expense' ? '-' : '+'} ₹{t.amount.toLocaleString()}
                  </td>
                  {isAdmin && (
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-3 text-slate-400">
                        <button onClick={() => handleOpenModal(t)} className="hover:text-indigo-500 transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(t.id)} className="hover:text-rose-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {filteredData.map(t => (
            <div key={t.id} className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold dark:text-white">{t.description}</p>
                  <p className="text-xs text-slate-400">{t.date} • {t.category}</p>
                </div>
                <p className={`font-bold ${t.type === 'Expense' ? 'text-rose-500' : 'text-emerald-500'}`}>
                  ₹{t.amount}
                </p>
              </div>
              {isAdmin && (
                <div className="flex gap-4 pt-2">
                  <button onClick={() => handleOpenModal(t)} className="text-xs font-bold text-indigo-500 uppercase">Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="text-xs font-bold text-rose-500 uppercase">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-2xl shadow-black/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{editingTransaction ? 'Edit' : 'New'} Transaction</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</label>
                  <input
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Amount</label>
                    <input
                      required
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option>Expense</option>
                      <option>Income</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 mt-4 hover:bg-indigo-700 transition-colors"
                >
                  {editingTransaction ? 'Update' : 'Save'} Transaction
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Transactions;