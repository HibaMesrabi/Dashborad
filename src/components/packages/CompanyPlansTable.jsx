import React from 'react';
import { Building2, FileText } from 'lucide-react';

/*
  Company subscriptions table (company_plans)
*/

const CompanyPlansTable = ({ rows }) => {
  return (
    <div className="overflow-x-auto rounded-3xl border border-[#1E3A5F] bg-[#112D4E] shadow-2xl">
      <table className="w-full text-left text-white">
        <thead className="bg-[#0A192F] border-b border-[#1E3A5F]">
          <tr>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Company</th>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Package</th>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Posts Remaining</th>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Paid</th>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Subscription Date</th>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-10 text-center text-slate-400">
                No subscriptions found
              </td>
            </tr>
          )}

          {rows.map((r) => (
            <tr
              key={r.id}
              className="border-b border-[#1E3A5F] hover:bg-[#1A3C63] transition-all duration-300"
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-300">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="font-semibold">{r.company_name}</p>
                    <p className="text-xs text-slate-400">#{r.company_id}</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-5">
                <span className="px-3 py-1 rounded-full text-sm bg-orange-500/10 text-orange-300 border border-orange-500/20">
                  {r.plan_name}
                </span>
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-blue-400" />
                  <span className="font-medium">{r.posts_remaining}</span>
                </div>
              </td>

              <td className="px-6 py-5 font-medium text-green-300">
                ${Number(r.price_paid).toFixed(2)}
              </td>

              <td className="px-6 py-5 text-slate-300 text-sm">
                {new Date(r.created_at).toLocaleDateString('en-GB')}
              </td>

              <td className="px-6 py-5">
                {r.status === 'active' ? (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-300 border border-green-500/20">
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-sm bg-slate-500/10 text-slate-300 border border-slate-500/20">
                    Expired
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyPlansTable;
