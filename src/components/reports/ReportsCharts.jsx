import React from 'react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

/*
  الرسوم البيانية

  تعرض:

  - نمو المستخدمين خلال الأشهر
  - عدد الأخبار خلال الأشهر
  استخدمت مكتبة recharts
*/

const ReportsCharts = ({ data }) => {

  return (

    <div
      className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mb-8
      "
    >

      {/* مخطط المستخدمين */}

      <div
        className="
          bg-[#112D4E]
          rounded-3xl
          border border-white/10
          p-6
          shadow-xl
        "
      >

        {/* عنوان الرسم */}

        <h2
          className="
            text-xl
            font-bold
            text-white
            mb-6
          "
        >
          Users Growth
        </h2>

        {/* الرسم */}

        <div className="h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="month"
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="users"
                stroke="#F97316"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* مخطط الأخبار */}

      <div
        className="
          bg-[#112D4E]
          rounded-3xl
          border border-white/10
          p-6
          shadow-xl
        "
      >

        {/* عنوان الرسم */}

        <h2
          className="
            text-xl
            font-bold
            text-white
            mb-6
          "
        >
          News Growth
        </h2>

        {/* الرسم */}

        <div className="h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="month"
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Bar
                dataKey="news"
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

};

export default ReportsCharts;