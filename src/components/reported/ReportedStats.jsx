import React from 'react';

/*
  كروت الإحصائيات
  تعتمد على جدول reports
*/

const ReportedStats = ({ reports }) => {

  // العدد الكلي للبلاغات
  const totalReports = reports.length;

  // عدد البلاغات على المنشورات
  const reportedPosts =
    reports.filter(
      report => report.reportable_type === "post"
    ).length;

  // عدد البلاغات على الحسابات
  const reportedAccounts =
    reports.filter(
      report => report.reportable_type === "account"
    ).length;

  // البلاغات المعلقة
  const pendingReports =
    reports.filter(
      report => report.status === "pending"
    ).length;

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {/* جميع البلاغات */}

      <div className="bg-[#1e3a5f] rounded-2xl p-6 shadow-lg">

        <p className="text-slate-300 text-sm mb-2">

          Total Reports

        </p>

        <h2 className="text-3xl font-bold text-white">

          {totalReports}

        </h2>

      </div>

      {/* بلاغات المنشورات */}

      <div className="bg-[#1e3a5f] rounded-2xl p-6 shadow-lg">

        <p className="text-slate-300 text-sm mb-2">

          Reported Posts

        </p>

        <h2 className="text-3xl font-bold text-blue-400">

          {reportedPosts}

        </h2>

      </div>

      {/* بلاغات الحسابات */}

      <div className="bg-[#1e3a5f] rounded-2xl p-6 shadow-lg">

        <p className="text-slate-300 text-sm mb-2">

          Reported Accounts

        </p>

        <h2 className="text-3xl font-bold text-purple-400">

          {reportedAccounts}

        </h2>

      </div>

      {/* البلاغات المعلقة */}

      <div className="bg-[#1e3a5f] rounded-2xl p-6 shadow-lg">

        <p className="text-slate-300 text-sm mb-2">

          Pending Reports

        </p>

        <h2 className="text-3xl font-bold text-yellow-400">

          {pendingReports}

        </h2>

      </div>

    </div>

  );

};

export default ReportedStats;