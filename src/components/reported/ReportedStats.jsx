import React from 'react';

import {
  FileWarning,
  Clock,
  EyeOff,
  ShieldAlert,
  Ban
} from 'lucide-react';

/*
  كروت إحصائيات المحتوى المخالف

  تعرض:

  - إجمالي البلاغات
  - البلاغات المعلقة
  - المحتوى المخفي
  - المستخدمين المقيدين
  - المستخدمين المحظورين
*/

const ReportedStats = ({ reports }) => {

  /*
    إجمالي البلاغات
  */

  const totalReports = reports.length;

  /*
    البلاغات المعلقة
  */

  const pendingReports = reports.filter(
    item => item.status === 'Pending'
  ).length;

  /*
    أرقام تجريبية مؤقتة

    لاحقاً ستأتي من الـ API
  */

  const hiddenContent = 8;

  const restrictedUsers = 3;

  const blockedUsers = 2;

  /*
    بيانات الكروت
  */

  const stats = [

    {
      title: 'Total Reports',
      value: totalReports,
      icon: <FileWarning size={24} />
    },

    {
      title: 'Pending Reports',
      value: pendingReports,
      icon: <Clock size={24} />
    },

    {
      title: 'Hidden Content',
      value: hiddenContent,
      icon: <EyeOff size={24} />
    },

    {
      title: 'Restricted Users',
      value: restrictedUsers,
      icon: <ShieldAlert size={24} />
    },

    {
      title: 'Blocked Users',
      value: blockedUsers,
      icon: <Ban size={24} />
    }

  ];

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-5
        gap-6
        mb-8
      "
    >

      {stats.map((item, index) => (

        <div
          key={index}
          className="
            bg-[#112D4E]
            p-6
            rounded-3xl
            border
            border-white/10
            shadow-xl
            hover:border-orange-400/30
            transition-all
          "
        >

          <div
            className="
              w-14 h-14
              rounded-xl
              flex
              items-center
              justify-center
              bg-[#071A33]
              text-orange-400
              mb-4
            "
          >
            {item.icon}
          </div>

          <p className="text-slate-400 text-sm">
            {item.title}
          </p>

          <h2
            className="
              text-4xl
              font-bold
              text-white
              mt-2
            "
          >
            {item.value}
          </h2>

        </div>

      ))}

    </div>

  );

};

export default ReportedStats;