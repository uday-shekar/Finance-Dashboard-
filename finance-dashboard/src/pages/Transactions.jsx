import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { transactions as initialData } from '../data/transactions';
import { 
  Search, Plus, Edit2, Trash2, UserCircle, 
  Filter, Download, AlertCircle, Shield, X 
} from 'lucide-react';

const Transactions = ({ role }) => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [sortOrder, setSortOrder] = useState('Newest First');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({ description: '', amount: '', category: 'Food', type: 'Expense', date: new Date().toISOString().split('T')[0] });

  const categories = ["Education", "Entertainment", "Food", "Freelance", "Healthcare", "Investment", "Rent", "Salary", "Shopping", "Subscriptions", "Transport", "Utilities"];
  const isAdmin = role?.toLowerCase() === 'admin';

  // --- Handlers ---
  const handleOpenModal = (transaction = null) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData(transaction);
    } else {
      setEditingTransaction(null);
      setFormData({ description: '', amount: '', category: 'Food', type: 'Expense', date: new Date().toISOString().split('T')[0] });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      setData(data.map(t => t.id === editingTransaction.id ? { ...formData, amount: Number(formData.amount) } : t));
    } else {
      const newTransaction = { ...formData, id: Date.now(), amount: Number(formData.amount) };
      setData([newTransaction, ...data]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this transaction?")) {
      setData(data.filter(t => t.id !== id));
    }
  };

  // --- Filtering & Sorting ---
  const filteredData = useMemo(() => {
    let result = [...data];
    if (searchTerm) result = result.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterType !== 'All Types') result = result.filter(t => t.type === filterType);
    if (filterCategory !== 'All Categories') result = result.filter(t => t.category === filterCategory);
    result.sort((a, b) => sortOrder === 'Newest First' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
    return result;
  }, [data, searchTerm, filterType, filterCategory, sortOrder]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 md:p-10 space-y-8 bg-[#f8fafc] dark:bg-[#0f172a] min-h-screen transition-all">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Transactions</h2>
            <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 w-fit shadow-sm">
              <Shield size={12} className={isAdmin ? "text-emerald-500" : "text-amber-500"} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{role} Mode</span>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {isAdmin && (
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenModal()}
                className="flex-1 md:flex-none bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                <Plus size={18} /> Add Record
              </motion.button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-[#1e293b] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search..." className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none dark:text-white" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select onChange={(e) => setFilterType(e.target.value)} className="bg-slate-50 dark:bg-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-sm border-none outline-none">
            <option>All Types</option><option>Income</option><option>Expense</option>
          </select>
          <select onChange={(e) => setFilterCategory(e.target.value)} className="bg-slate-50 dark:bg-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-sm border-none outline-none">
            <option>All Categories</option>{categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select onChange={(e) => setSortOrder(e.target.value)} className="bg-slate-50 dark:bg-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-sm border-none outline-none">
            <option>Newest First</option><option>Oldest First</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
              <tr>
                <th className="p-5">Description</th><th className="p-5">Category</th><th className="p-5">Amount</th>
                {isAdmin && <th className="p-5 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map(t => (
                <tr key={t.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 group transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-slate-800 dark:text-white">{t.description}</div>
                    <div className="text-[10px] text-slate-400">{t.date}</div>
                  </td>
                  <td className="p-5 text-xs font-semibold text-slate-500 dark:text-slate-400">{t.category}</td>
                  <td className={`p-5 font-bold ${t.type === 'Expense' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {t.type === 'Expense' ? '-' : '+'}₹{t.amount.toLocaleString()}
                  </td>
                  {isAdmin && (
                    <td className="p-5 text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(t)} className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-lg"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(t.id)} className="p-2 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 size={14} /></button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-[#1e293b] w-full max-w-md rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold dark:text-white">{editingTransaction ? 'Edit Transaction' : 'New Transaction'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500"><X /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
                  <input required type="text" className="w-full mt-1 bg-slate-50 dark:bg-slate-900 dark:text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</label>
                    <input required type="number" className="w-full mt-1 bg-slate-50 dark:bg-slate-900 dark:text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</label>
                    <select className="w-full mt-1 bg-slate-50 dark:bg-slate-900 dark:text-white p-3 rounded-xl outline-none" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                      <option>Expense</option><option>Income</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all mt-4">
                  {editingTransaction ? 'Update Record' : 'Add Record'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Transactions;