import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { transactions as initialData } from '../data/transactions';
import { 
  Search, Plus, Edit2, Trash2, 
  Shield, X 
} from 'lucide-react';

const Transactions = ({ role }) => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [sortOrder, setSortOrder] = useState('Newest First');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({ description: '', amount: '', category: 'Food', type: 'Expense', date: new Date().toISOString().split('T')[0] });

  const categories = ["Education","Entertainment","Food","Freelance","Healthcare","Investment","Rent","Salary","Shopping","Subscriptions","Transport","Utilities"];
  const isAdmin = role?.toLowerCase() === 'admin';

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
      setData([{ ...formData, id: Date.now(), amount: Number(formData.amount) }, ...data]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete transaction?")) {
      setData(data.filter(t => t.id !== id));
    }
  };

  const filteredData = useMemo(() => {
    let result = [...data];
    if (searchTerm) result = result.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterType !== 'All Types') result = result.filter(t => t.type === filterType);
    if (filterCategory !== 'All Categories') result = result.filter(t => t.category === filterCategory);
    result.sort((a,b)=> sortOrder==='Newest First'? new Date(b.date)-new Date(a.date): new Date(a.date)-new Date(b.date));
    return result;
  }, [data, searchTerm, filterType, filterCategory, sortOrder]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8 bg-[#f8fafc] dark:bg-[#0f172a] min-h-screen overflow-x-hidden">

      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">Transactions</h2>
            <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border w-fit">
              <Shield size={12} className={isAdmin ? "text-green-500":"text-yellow-500"} />
              <span className="text-[10px] font-bold">{role} Mode</span>
            </div>
          </div>

          {isAdmin && (
            <button onClick={()=>handleOpenModal()}
              className="w-full sm:w-auto bg-indigo-600 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2">
              <Plus size={16}/> Add
            </button>
          )}
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white dark:bg-[#1e293b] p-4 rounded-2xl">
          
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={16}/>
            <input placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm outline-none"
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
          </div>

          <select onChange={(e)=>setFilterType(e.target.value)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm">
            <option>All Types</option><option>Income</option><option>Expense</option>
          </select>

          <select onChange={(e)=>setFilterCategory(e.target.value)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm">
            <option>All Categories</option>{categories.map(c=><option key={c}>{c}</option>)}
          </select>

          <select onChange={(e)=>setSortOrder(e.target.value)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm">
            <option>Newest First</option><option>Oldest First</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden">

          {/* 🔥 scroll fix */}
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm">

              <thead className="bg-slate-100 dark:bg-slate-900 text-xs uppercase">
                <tr>
                  <th className="p-4">Desc</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Amount</th>
                  {isAdmin && <th className="p-4 text-right">Actions</th>}
                </tr>
              </thead>

              <tbody>
                {filteredData.map(t => (
                  <tr key={t.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="p-4">
                      <div className="font-bold">{t.description}</div>
                      <div className="text-xs text-gray-400">{t.date}</div>
                    </td>

                    <td className="p-4">{t.category}</td>

                    <td className={`p-4 font-bold ${t.type==='Expense'?'text-red-500':'text-green-500'}`}>
                      {t.type==='Expense'?'-':'+'}₹{t.amount}
                    </td>

                    {isAdmin && (
                      <td className="p-4 text-right space-x-2">
                        <button onClick={()=>handleOpenModal(t)}><Edit2 size={14}/></button>
                        <button onClick={()=>handleDelete(t.id)}><Trash2 size={14}/></button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{scale:0.9}} animate={{scale:1}}
              className="w-full max-w-md bg-white dark:bg-[#1e293b] p-6 rounded-2xl">

              <div className="flex justify-between mb-4">
                <h3 className="font-bold">{editingTransaction?"Edit":"Add"} Transaction</h3>
                <button onClick={()=>setIsModalOpen(false)}><X/></button>
              </div>

              <form onSubmit={handleSave} className="space-y-3">
                <input required placeholder="Description"
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-900"
                  value={formData.description}
                  onChange={(e)=>setFormData({...formData,description:e.target.value})}
                />

                <input required type="number" placeholder="Amount"
                  className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-900"
                  value={formData.amount}
                  onChange={(e)=>setFormData({...formData,amount:e.target.value})}
                />

                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
                  Save
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