import React, { useState } from 'react';

import {
  LayoutDashboard,
  Users,
  Building,
  Newspaper,
  ShieldAlert,
  Package,
  BarChart,
  Settings,
  LogOut,
  Menu
} from 'lucide-react'; // مكتبة أيقونات  سهلة الاستخدام

import { useNavigate } from 'react-router-dom'; // للتنقل بين الصفحات

/*
  Sidebar

  مسؤوليتها:
  - التنقل بين صفحات الداشبورد
  - Collapse / Expand
  - Logout
  - تبقى ثابتة أثناء الـ Scroll
*/

const Sidebar = () => {

  /*
    حالة فتح وإغلاق الـ Sidebar
  */

  const [open, setOpen] = useState(true); // اذا كانت false، الـ Sidebar مغلقة، اذا كانت true، الـ Sidebar مفتوحة

  /*
    للتنقل بين الصفحات
  */

  const navigate = useNavigate(); //للتنقل بين الصفحات بدل من تحديثها كل شوي 

  /*
    عناصر القائمة
  */

  const menuItems = [
      // استخدمت array لان استخدمت map حتى تمر على كل عنصر 
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      route: "/admin-dashboard"
    },

    {
      title: "Users",
      icon: <Users size={20} />,
      route: "/users"
    },

    {
      title: "Companies",
      icon: <Building size={20} />,
      route: "/companies"
    },

    {
      title: "News",
      icon: <Newspaper size={20} />,
      route: "/news"
    },

    {
      title: "Reported Content",
      icon: <ShieldAlert size={20} />,
      route: "/reported"
    },

    {
      title: "Packages",
      icon: <Package size={20} />,
      route: "/packages"
    },

    {
      title: "Reports",
      icon: <BarChart size={20} />,
      route: "/reports"
    },

    {
      title: "Settings",
      icon: <Settings size={20} />,
      route: "/settings"
    },

  ];

  /*
    Logout

    حالياً Frontend فقط
  */

  const handleLogout = () => {
 
    localStorage.removeItem("role");// بعد تسجيل الدخول بتم حفظ نوع المستخدم

    navigate('/'); // بعد تسجيل الخروج بتم توجيه المستخدم للصفحة الرئيسية

  };

  return (

    /*
      fixed:
      يجعل الـ Sidebar ثابت دائماً

      top-0 right-0:
      تثبيت بالمكان الصحيح

      z-50:
      حتى يبقى فوق المحتوى
    */

    <div
  className={`
    ${open ? "w-64" : "w-20"}

    /* تثبيت الـ Sidebar على الشاشة */
    fixed top-0 right-0

    /* ياخد كامل ارتفاع الشاشة */
    h-screen

    /* ألوان الخلفية */
    bg-gradient-to-b from-[#0A192F] via-[#112D4E] to-[#0A192F]

    /* تنسيق عام */
    text-white
    p-5
    flex flex-col
    justify-between

    /* أنيميشن */
    transition-all duration-300

    /* ظل احترافي */
    shadow-2xl

    /* حتى يبقى فوق كل العناصر */
    z-50
 ` }
>

      {/* القسم العلوي */}

      <div>

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          {/* عنوان اللوحة */}

          {open && (

            <h1
              className="
                text-xl
                font-extrabold
                tracking-wider
                text-orange-400
                drop-shadow-[0_0_6px_rgba(255,140,0,0.6)]
              "
            >
              ADMIN PANEL
            </h1>

          )}

          {/* زر فتح وإغلاق القائمة */}

          <Menu
            className="
              cursor-pointer
              hover:text-orange-400
              transition
            "
            onClick={() => setOpen(!open)}
          />

        </div>

        {/* القائمة */}

        <ul className="flex flex-col gap-3">

          {menuItems.map((item, index) => (

            <li
              key={index}

              /*
                الانتقال للصفحة
              */

              onClick={() => navigate(item.route)}

              className="
                flex items-center gap-4

                p-3 rounded-xl

                cursor-pointer

                hover:bg-[#1A3C63]
                hover:shadow-lg
                hover:scale-[1.04]

                transition-all duration-300

                group
              "
            >

              {/* الأيقونة */}

              <div
                className="
                  text-orange-400

                  group-hover:scale-125
                  group-hover:rotate-6

                  transition-all duration-300
                "
              >
                {item.icon}
              </div>

              {/* النص */}

              {open && (

                <span
                  className="
                    text-sm
                    font-medium
                    tracking-wide

                    group-hover:text-orange-300

                    transition
                  "
                >
                  {item.title}
                </span>

              )}

            </li>

          ))}

        </ul>

      </div>

      {/* زر تسجيل الخروج */}

      <div className="mt-6 border-t border-white/10 pt-4">

        <button
          onClick={handleLogout}

          className="
            w-full

            flex items-center justify-center gap-3

            px-4 py-3

            rounded-xl

            bg-red-600

            text-white font-semibold

            shadow-[0_12px_30px_rgba(220,38,38,0.45)]

            border border-red-500/40

            hover:bg-red-700
            hover:shadow-[0_18px_45px_rgba(220,38,38,0.6)]
            hover:-translate-y-0.5

            active:scale-95

            transition-all duration-300 ease-out
          "
        >

          {/* أيقونة */}

          <LogOut size={20} />

          {/* النص */}

          {open && (
            <span>Logout</span>
          )}

        </button>

      </div>

    </div>

  );
};

export default Sidebar;