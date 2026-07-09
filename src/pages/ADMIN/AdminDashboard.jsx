import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';// استدعاء الكروت

// الأيقونات
import {
  Users,
  Building,
  Newspaper,
  AlertTriangle,
  Package,
  BarChart
} from 'lucide-react'; 

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

  // بيانات الكروت
  const stats = [
    {
      title: "Users",
      value: 1200,
      icon: Users,
      color: "bg-blue-500",
      route: "/users" // المسار عند الضغط
    },
    {
      title: "Companies",
      value: 85,
      icon: Building,
      color: "bg-purple-500",
      route: "/companies"
    },
    {
      title: "News",
      value: 340,
      icon: Newspaper,
      color: "bg-orange-500",
      route: "/news"
    },
    {
      title: "Reports",
      value: 12,
      icon: AlertTriangle,
      color: "bg-red-500",
      route: "/reports"
    },
    {
      title: "Packages",
      value: 6,
      icon: Package,
      color: "bg-green-500",
      route: "/packages"
    },
    {
      title: "Pending News",
      value: "4%",
      icon: Newspaper,
      color: "bg-cyan-500",
      
    }
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
              
              onClick={()=> {
                if(item.title === "Pending News") // لا ينقل عند الضغط على هذا الكرت
                  navigate("/pending-news");
              }}
              
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

      {/* معلومات الادمن*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-[#112D4E] p-6 rounded-2xl shadow-xl animate-fadeUp">
          <h2 className="text-xl font-bold mb-4">
            Admin Information
          </h2>

          <p className="text-slate-300">Name: Admin User</p>
          <p className="text-slate-300">Email: admin@gmail.com</p>
          <p className="text-slate-300">Role: Super Admin</p>
        </div>

        <div className="bg-[#112D4E] p-6 rounded-2xl shadow-xl animate-fadeUp">
          <h2 className="text-xl font-bold mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3 text-slate-300">

            <li className="flex justify-between">
              <span>New user registered</span>
              <span className="text-xs text-slate-400">2 min ago</span>
            </li>

            <li className="flex justify-between">
              <span>News approved</span>
              <span className="text-xs text-slate-400">10 min ago</span>
            </li>

            <li className="flex justify-between">
              <span>Company added news</span>
              <span className="text-xs text-slate-400">1 hour ago</span>
            </li>

          </ul>

        </div>

      </div>{/*أنيميشن*/}
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