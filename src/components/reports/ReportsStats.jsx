import React from 'react';

import {
  Users,
  Building2,
  Newspaper,
  FileWarning
} from 'lucide-react';

/*
  كروت الإحصائيات الخاصة بالتقارير

  تعرض:

  - إجمالي المستخدمين
  - إجمالي الشركات
  - إجمالي الأخبار
  - إجمالي البلاغات
*/

const ReportsStats = ({ data }) => {

  /*
    حساب مجموع المستخدمين
  */

  const totalUsers = data.reduce(

    (total, item) => total + item.users,

    0

  );

  /*
    حساب مجموع الشركات
  */

  const totalCompanies = data.reduce(

    (total, item) => total + item.companies,

    0

  );

  /*
    حساب مجموع الأخبار
  */

  const totalNews = data.reduce(

    (total, item) => total + item.news,

    0

  );

  /*
    حساب مجموع البلاغات
  */

  const totalReports = data.reduce(

    (total, item) => total + item.reports,

    0

  );

  /*
    مصفوفة الكروت

    لتسهيل إنشاء الكروت بشكل ديناميكي
  */

  const stats = [

    {
      title: 'Total Users',
      value: totalUsers,
      icon: <Users size={26} />
    },

    {
      title: 'Total Companies',
      value: totalCompanies,
      icon: <Building2 size={26} />
    },

    {
      title: 'Total News',
      value: totalNews,
      icon: <Newspaper size={26} />
    },

    {
      title: 'Total Reports',
      value: totalReports,
      icon: <FileWarning size={26} />
    }

  ];

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
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
            border border-white/10
            shadow-xl
            hover:border-orange-400/30
            transition-all
          "
        >

          {/* أيقونة الكرت */}

          <div
            className="
              w-14
              h-14
              rounded-xl
              flex
              items-center
              justify-center
              bg-[#071A33]
              text-orange-400
              mb-5
            "
          >

            {item.icon}

          </div>

          {/* عنوان الكرت */}

          <p
            className="
              text-slate-400
              text-sm
            "
          >
            {item.title}
          </p>

          {/* القيمة */}

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

export default ReportsStats;