import React from 'react';
import { transactions } from '../data/transactions';

const TransactionTable = ({ role }) => {
  return (
    <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-500 text-xs uppercase border-b border-slate-800 bg-slate-900/50">
            <th className="p-4">Date</th>
            <th className="p-4">Description</th>
            <th className="p-4">Category</th>
            <th className="p-4">Amount</th>
            {role === 'Admin' && <th className="p-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-slate-300 divide-y divide-slate-800/50">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-slate-800/30 transition-colors group">
              <td className="p-4 text-sm font-mono">{t.date}</td>
              <td className="p-4 font-medium text-white">{t.description}</td>
              <td className="p-4">
                <span className="px-2 py-1 rounded bg-slate-800 text-[10px]">{t.category}</span>
              </td>
              <td className={`p-4 font-bold ${t.type === 'Expense' ? 'text-rose-400' : 'text-emerald-400'}`}>
                {t.type === 'Expense' ? '-' : '+'}₹{t.amount.toLocaleString()}
              </td>
              {role === 'Admin' && (
                <td className="p-4 text-right space-x-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-indigo-400 hover:underline">Edit</button>
                  <button className="text-rose-400 hover:underline">Del</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;