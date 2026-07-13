import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Bell,
  UserPlus,
  Building2,
  Flag,
  BadgeCheck,
} from 'lucide-react';

/*
  شريط الأعلى
  - عنوان الصفحة
  - أيقونة الإشعارات مع قائمة منسدلة وعداد الرسائل غير المقروءة
  - أيقونة المستخدم
*/

const iconFor = (type) => {
  switch (type) {
    case 'user':
      return { Icon: UserPlus, color: 'text-blue-300', bg: 'bg-blue-500/10' };
    case 'company':
      return { Icon: Building2, color: 'text-orange-300', bg: 'bg-orange-500/10' };
    case 'report':
      return { Icon: Flag, color: 'text-red-300', bg: 'bg-red-500/10' };
    case 'verification':
      return { Icon: BadgeCheck, color: 'text-purple-300', bg: 'bg-purple-500/10' };
    default:
      return { Icon: Bell, color: 'text-slate-300', bg: 'bg-white/10' };
  }
};

const initialNotifications = [
  { id: 1, type: 'user', title: 'New User Registered', body: 'Sarah Ahmad just signed up.', time: '2m ago', read: false },
  { id: 2, type: 'company', title: 'New Company Registered', body: 'Neural Code created a company profile.', time: '15m ago', read: false },
  { id: 3, type: 'report', title: 'New Report', body: 'A post was reported for spam.', time: '1h ago', read: false },
  { id: 4, type: 'verification', title: 'Verification Request', body: 'VisionX requested verification.', time: '3h ago', read: true },
];

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const wrapperRef = useRef(null);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => { 
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick); // تعليمة تنتظر حدوث حدث متل النقر كتابة او سكرول 
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const markAllRead = () => { 
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const toggleNotifications = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="h-16 bg-[#112D4E] flex items-center justify-between px-6 text-white shadow relative">
      {/* عنوان الصفحة */}
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        {/* أيقونة الإشعارات */}
        <div ref={wrapperRef} className="relative">
          <button
            onClick={toggleNotifications}
            className="relative bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-[10px] font-bold flex items-center justify-center border-2 border-[#112D4E]">
                {unread}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0A192F] border border-[#1E3A5F] rounded-2xl shadow-2xl overflow-hidden z-50">
              {/* رأس القائمة */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E3A5F]">
                <div>
                  <p className="text-white font-semibold text-sm">Notifications</p>
                  <p className="text-xs text-slate-400">{unread} unread</p>
                </div>
                <button
                  onClick={markAllRead} // تمر على جميع الاشعارات 
                  className="text-xs text-orange-400 hover:text-orange-300 transition"
                >
                  Mark all as read
                </button>
              </div>

              {/* قائمة الإشعارات */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 && (
                  <p className="px-4 py-10 text-center text-slate-400 text-sm">
                    No notifications
                  </p>
                )}

                {notifications.map((n) => {
                  const { Icon, color, bg } = iconFor(n.type); // هي فانكشن تختار الايقونة حسب نوع الاشعار و تعطيه لون و خلفية مناسبة
                  return (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`
                        flex items-start gap-3 px-4 py-3
                        border-b border-[#1E3A5F]/60
                        hover:bg-[#112D4E] transition cursor-pointer
                        ${!n.read ? 'bg-[#112D4E]/60' : ''}
                      `}
                    >
                      <div className={`w-9 h-9 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{n.title}</p>
                        <p className="text-xs text-slate-400 truncate">{n.body}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{n.time}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ذيل القائمة */}
              <div className="px-4 py-3 border-t border-[#1E3A5F] text-center">
                <button className="text-xs text-slate-300 hover:text-white transition">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* أيقونة المستخدم */}
        <div className="bg-white/10 p-2 rounded-full">
          <User size={20} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;