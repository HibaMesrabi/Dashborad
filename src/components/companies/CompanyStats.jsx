import React from 'react';
import { Building2, Ban, Wallet } from 'lucide-react';

/*
  كروت الإحصائيات
*/

const CompanyStats = ({ companies }) => {

  // عدد الشركات
  const totalCompanies = companies.length;

  // عدد المحظورين
  const blockedCompanies = companies.filter(
    (company) => company.blocked
  ).length;

  // مجموع الأرصدة
  const totalWallets = companies.reduce(
    (total, company) => total + company.wallet,
    0
  );

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      {/* عدد الشركات */}

      <div className="bg-[#112D4E] p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition">

        <Building2 className="text-orange-400 mb-4" />

        <h3 className="text-slate-400 mb-2">
          الشركات
        </h3>

        <p className="text-3xl font-bold text-white">
          {totalCompanies}
        </p>

      </div>

      {/* المحظورون */}

      <div className="bg-[#112D4E] p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition">

        <Ban className="text-red-400 mb-4" />

        <h3 className="text-slate-400 mb-2">
          المحظورون
        </h3>

        <p className="text-3xl font-bold text-white">
          {blockedCompanies}
        </p>

      </div>

      {/* الرصيد */}

      <div className="bg-[#112D4E] p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition">

        <Wallet className="text-green-400 mb-4" />

        <h3 className="text-slate-400 mb-2">
          إجمالي المحافظ
        </h3>

        <p className="text-3xl font-bold text-white">
          ${totalWallets}
        </p>

      </div>

    </div>
  );
};

export default CompanyStats;