import React from 'react';
import {
  Newspaper,
  CheckCircle,
  AlertTriangle,
  Star,
  Clock
} from 'lucide-react';

/*
  كروت إحصائيات الأخبار

  تعرض:
  - إجمالي الأخبار
  - المنشورة
  - المبلغ عنها
  - المميزة
  - المنتهية
*/

const NewsStats = ({ cards }) => {

  const stats = [
    { title: 'Total News', value: cards.total_news, icon: <Newspaper size={24} /> },
    { title: 'Published', value: cards.published, icon: <CheckCircle size={24} /> },
    { title: 'Under Review', value: cards.under_review, icon: <AlertTriangle size={24} /> },
    { title: 'Archived', value: cards.archived, icon: <Star size={24} /> },
    { title: 'Rejected', value: cards.rejected, icon: <Clock size={24} /> }
  ];

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-5
        gap-6
        mb-8
      "
    >

      {stats.map((stat, index) => (

        <div
          key={index}
          className="
            bg-[#112D4E]
            rounded-3xl
            p-6
            border border-white/10
            shadow-xl

            hover:border-orange-400/30
            hover:-translate-y-1

            transition-all
            duration-300
          "
        >

          {/* الأيقونة */}

          <div
            className="
              w-14
              h-14

              rounded-2xl

              flex
              items-center
              justify-center

              bg-[#071A33]

              text-orange-400

              mb-4
            "
          >
            {stat.icon}
          </div>

          {/* عنوان الكرت */}

          <p
            className="
              text-slate-400
              text-sm
            "
          >
            {stat.title}
          </p>

          {/* القيمة */}

          <h3
            className="
              text-4xl
              font-bold
              text-white
              mt-2
            "
          >
            {stat.value}
          </h3>

        </div>

      ))}

    </div>

  );

};

export default NewsStats;