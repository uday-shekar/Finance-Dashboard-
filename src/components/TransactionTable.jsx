import React from 'react';
import { transactions } from '../data/transactions';

const TransactionTable = ({ role }) => {
  return (
    <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden">

      {/* 🔥 SCROLL WRAPPER (MAIN FIX) */}
      <div className="w-full overflow-x-auto">

        <table className="min-w-[700px] w-full text-left">

          {/* HEADER */}
          <thead>
            <tr className="text-slate-500 text-xs uppercase border-b border-slate-800 bg-slate-900/50">
              <th className="p-3 sm:p-4">Date</th>
              <th className="p-3 sm:p-4">Description</th>
              <th className="p-3 sm:p-4">Category</th>
              <th className="p-3 sm:p-4">Amount</th>
              {role === 'Admin' && (
                <th className="p-3 sm:p-4 text-right">Actions</th>
              )}
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="text-slate-300 divide-y divide-slate-800/50">
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                {/* DATE */}
                <td className="p-3 sm:p-4 text-xs sm:text-sm font-mono whitespace-nowrap">
                  {t.date}
                </td>

                {/* DESCRIPTION */}
                <td className="p-3 sm:p-4 font-medium text-white whitespace-nowrap">
                  {t.description}
                </td>

                {/* CATEGORY */}
                <td className="p-3 sm:p-4">
                  <span className="px-2 py-1 rounded bg-slate-800 text-[10px] whitespace-nowrap">
                    {t.category}
                  </span>
                </td>

                {/* AMOUNT */}
                <td
                  className={`p-3 sm:p-4 font-bold whitespace-nowrap ${
                    t.type === 'Expense'
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {t.type === 'Expense' ? '-' : '+'}₹
                  {t.amount.toLocaleString()}
                </td>

                {/* ACTIONS */}
                {role === 'Admin' && (
                  <td className="p-3 sm:p-4 text-right space-x-3 text-xs opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <button className="text-indigo-400 hover:underline">
                      Edit
                    </button>
                    <button className="text-rose-400 hover:underline">
                      Del
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default TransactionTable;