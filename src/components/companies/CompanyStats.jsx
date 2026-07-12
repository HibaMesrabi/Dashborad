import React from 'react';
import { Building2, Ban, Wallet } from 'lucide-react';

/*
  كروت الإحصائيات
*/

const CompanyStats = ({ stats }) => {

  // عدد الشركات
  const totalCompanies = stats.total_companies;

  // عدد المحظورين
  const blockedCompanies = stats.blocked_companies;

  // مجموع الأرصدة
  const totalWallets = stats.total_balance;

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      {/* عدد الشركات */}

      <div className="bg-[#112D4E] p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition">

        <Building2 className="text-orange-400 mb-4" />

        <h3 className="text-slate-400 mb-2">
          Companies
        </h3>

        <p className="text-3xl font-bold text-white">
          {totalCompanies}
        </p>

      </div>

      {/* المحظورون */}

      <div className="bg-[#112D4E] p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition">

        <Ban className="text-red-400 mb-4" />

        <h3 className="text-slate-400 mb-2">
          Blocked
        </h3>

        <p className="text-3xl font-bold text-white">
          {blockedCompanies}
        </p>

      </div>

      {/* الرصيد */}

      <div className="bg-[#112D4E] p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition">

        <Wallet className="text-green-400 mb-4" />

        <h3 className="text-slate-400 mb-2">
          Total Wallets
        </h3>

        <p className="text-3xl font-bold text-white">
          ${totalWallets}
        </p>

      </div>

    </div>
  );
};

export default CompanyStats;