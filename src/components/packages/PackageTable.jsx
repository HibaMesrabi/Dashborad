import React from 'react';
import { Package, Edit2, Trash2, Power, FileText, DollarSign } from 'lucide-react';

/*
  Packages table (plans)
*/

const PackageTable = ({ plans, onEdit, onDelete, onToggle }) => {
  return (
    <div className="overflow-x-auto rounded-3xl border border-[#1E3A5F] bg-[#112D4E] shadow-2xl">
      <table className="w-full text-left text-white">
        <thead className="bg-[#0A192F] border-b border-[#1E3A5F]">
          <tr>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Package</th>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Posts Count</th>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Price</th>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Price per Post</th>
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">Status</th>
            <th className="px-6 py-5 text-center text-sm font-semibold text-slate-300">Actions</th>
          </tr>
        </thead>

        <tbody>
          {plans.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-10 text-center text-slate-400">
                No packages currently available
              </td>
            </tr>
          )}

          {plans.map((plan) => (
            <tr
              key={plan.id}
              className="border-b border-[#1E3A5F] hover:bg-[#1A3C63] transition-all duration-300"
            >
              {/* Name */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{plan.name}</h3>
                    <p className="text-sm text-slate-400">Plan ID #{plan.id}</p>
                  </div>
                </div>
              </td>

              {/* Posts count */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-blue-400" />
                  <span className="font-medium">{plan.posts_count}</span>
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-green-400" />
                  <span className="font-medium">${Number(plan.price).toFixed(2)}</span>
                </div>
              </td>

              {/* Price per post */}
              <td className="px-6 py-5">
                <span className="px-3 py-1 rounded-full text-sm bg-orange-500/10 text-orange-300 border border-orange-500/20">
                  ${Number(plan.price_per_post).toFixed(2)}
                </span>
              </td>

              {/* Status */}
              <td className="px-6 py-5">
                {plan.is_active ? (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-300 border border-green-500/20">
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-300 border border-red-500/20">
                    Inactive
                  </span>
                )}
              </td>

              {/* Actions */}
              <td className="px-6 py-5">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onToggle(plan.id)}
                    title={plan.is_active ? 'Deactivate' : 'Activate'}
                    className={`
                      p-2 rounded-xl border transition
                      ${plan.is_active
                        ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20 hover:bg-yellow-500/20'
                        : 'bg-green-500/10 text-green-300 border-green-500/20 hover:bg-green-500/20'}
                    `}
                  >
                    <Power size={16} />
                  </button>

                  <button
                    onClick={() => onEdit(plan)}
                    title="Edit"
                    className="p-2 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(plan.id)}
                    title="Delete"
                    className="p-2 rounded-xl bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageTable;
