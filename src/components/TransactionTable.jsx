import React from 'react';
import { transactions } from '../data/transactions';

const TransactionTable = ({ role }) => {

  return (
    <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden">

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-slate-900/60 border-b border-slate-800">
            <tr className="text-slate-400 uppercase text-[11px] tracking-wide">

              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Category</th>
              <th className="px-4 py-3 text-right">Amount</th>

              {role === 'Admin' && (
                <th className="px-4 py-3 text-right">Actions</th>
              )}

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60 text-slate-300">

            {transactions.map((t) => {
              const category =
                t.category ||
                t.categoryName ||
                (t.type === 'Income' ? 'Income' : 'Expense') ||
                "Uncategorized";

              return (
                <tr key={t.id} className="hover:bg-slate-800/40 transition group">

                  <td className="px-4 py-3 text-xs font-mono">
                    {t.date}
                  </td>

                  <td className="px-4 py-3 font-medium text-white">
                    {t.description || t.desc}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-[10px]">
                      {category}
                    </span>
                  </td>

                  <td className={`px-4 py-3 text-right font-semibold ${
                    t.type === 'Expense' ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {t.type === 'Expense' ? '-' : '+'}₹
                    {Number(t.amount).toLocaleString()}
                  </td>

                  {role === 'Admin' && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-3 text-xs opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                        <button className="text-indigo-400 hover:underline">Edit</button>
                        <button className="text-rose-400 hover:underline">Del</button>
                      </div>
                    </td>
                  )}

                </tr>
              );
            })}

          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden divide-y divide-slate-800">

        {transactions.map((t) => {
          const category =
            t.category ||
            t.categoryName ||
            (t.type === 'Income' ? 'Income' : 'Expense') ||
            "Uncategorized";

          return (
            <div key={t.id} className="p-4 space-y-2">

              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-white">
                  {t.description || t.desc}
                </p>

                <p className={`text-sm font-bold ${
                  t.type === 'Expense' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {t.type === 'Expense' ? '-' : '+'}₹
                  {Number(t.amount).toLocaleString()}
                </p>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>{t.date}</span>

                <span className="bg-slate-800 px-2 py-0.5 rounded">
                  {category}
                </span>
              </div>

              {role === 'Admin' && (
                <div className="flex justify-end gap-4 text-xs pt-2">
                  <button className="text-indigo-400">Edit</button>
                  <button className="text-rose-400">Del</button>
                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default TransactionTable;