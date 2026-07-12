import React, { useState, useEffect } from 'react';

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

import api from '../../api/axios';

const AnalyticsChart = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/reports-analytics')
      .then((res) => {
        const { months_labels, news_growth } = res.data.data.charts;

        const chartData = months_labels.map((month, index) => ({
          month: month.slice(0, 3), // اختصار الاسم متل "Jan" بدل "January"
          news: news_growth[index],
        }));

        setData(chartData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-[#112D4E] p-6 rounded-2xl shadow-xl mb-10">
        <p className="text-slate-300">جارِ تحميل المخطط...</p>
      </div>
    );
  }

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