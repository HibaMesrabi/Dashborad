import React from 'react';

/*
  مخطط بياني يلي بصفحة الداشبورد لعرض عدد الأخبار عبر الأشهر
  استخدمت مكتبة Recharts 
*/

import { // مكونات الرسم
  LineChart, 
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer 
} from 'recharts';

const AnalyticsChart = () => {

  // بيانات تجريبية (لاحقاً من Backend)
  const data = [
    { month: 'Jan', news: 40 },
    { month: 'Feb', news: 70 },
    { month: 'Mar', news: 55 },
    { month: 'Apr', news: 90 },
    { month: 'May', news: 120 },
  ];

  return (
    <div className="bg-[#112D4E] p-6 rounded-2xl shadow-xl mb-10">

      {/* عنوان */}
      <h2 className="text-xl font-bold mb-4 text-white">
        News Analytics
      </h2>

      {/* حجم الرسم */}
      <div className="w-full h-72">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            {/* المحاور */}
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />

            {/* معلومات عند المرور */}
            <Tooltip />

            {/* الخط */}
            <Line
              type="monotone"
              dataKey="news"
              stroke="#f97316"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default AnalyticsChart;