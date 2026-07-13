import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';// استدعاء الكروت
import { useState, useEffect } from 'react';

// الأيقونات
import {
  Users,
  Building,
  Newspaper,
  AlertTriangle,
  Package,
  BarChart
} from 'lucide-react';

import api from '../../api/axios';

// استدعاء المخطط
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';

/*
  Admin Dashboard:
  - يعرض إحصائيات
  - تنقل بين الصفحات
  - مخطط بياني
*/

const AdminDashboard = () => {

  const navigate = useNavigate(); // للتنقل بين الصفحات

  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/overview')
      .then((res) => {
        setStatistics(res.data.data.statistics);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to loading statistics. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-slate-300">Loading...</p>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <p className="text-red-400">{error}</p>
      </AdminLayout>
    );
  }

  const stats = [
    { title: "Users", value: statistics.users, icon: Users, color: "bg-blue-500", route: "/users" },
    { title: "Companies", value: statistics.companies, icon: Building, color: "bg-purple-500", route: "/companies" },
    { title: "News", value: statistics.posts, icon: Newspaper, color: "bg-orange-500", route: "/news" },
    { title: "Reports", value: statistics.reports, icon: AlertTriangle, color: "bg-red-500", route: "/Reported" },
    { title: "Packages", value: statistics.packages, icon: Package, color: "bg-green-500", route: "/packages" },
  ];

  return (
    <AdminLayout>

      {/* عنوان */}
      <h1 className="text-3xl font-bold mb-8 animate-fadeIn">
        Dashboard Overview
      </h1>

      {/* الكروت*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (
            <div
              key={index}

              // onClick={() => {
              //   if (item.title === "Pending News") // لا ينقل عند الضغط على هذا الكرت
              //     navigate("/pending-news");
              // }}

              // عند الضغط يروح لصفحة معينة
              onClick={() => navigate(item.route)}

              className="p-6 rounded-2xl bg-[#112D4E] shadow-xl 
              hover:scale-105 transition duration-300 
              cursor-pointer animate-fadeUp"
            >
              <div className="flex items-center justify-between mb-4">

                {/* أيقونة */}
                <div className={`p-3 rounded-full text-white ${item.color}`}>
                  <Icon size={22} />
                </div>

                {/* رقم */}
                <span className="text-2xl font-bold">
                  {item.value}
                </span>

              </div>

              {/* عنوان */}
              <h3 className="text-slate-300">
                {item.title}
              </h3>

            </div>
          );
        })}

      </div>

      {/* المخطط  */}
      <AnalyticsChart />

      {/*أنيميشن*/}
      <style>
        {` 
        @keyframes fadeUp { 
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeUp {
          animation: fadeUp 0.6s ease forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        `}
      </style>

    </AdminLayout>
  );
};

export default AdminDashboard;