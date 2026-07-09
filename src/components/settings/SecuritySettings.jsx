import React, { useState } from 'react';
import { Shield, Bell, LogOut, KeyRound } from 'lucide-react';

/*
  Security Settings (NEW DESIGN)

  هذا القسم مسؤول عن:
  - تفعيل Two Factor Authentication
  - إشعارات تسجيل الدخول
  - تسجيل الخروج من كل الأجهزة
  - تحسين أمان الحساب

  التصميم يعتمد على Cards + Gradient UI
*/

const SecuritySettings = () => {

  /*
    حالات الإعدادات
  */

  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (

    <div className="space-y-6">

      {/* ===== TITLE ===== */}
      <div className="mb-2">

        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield size={22} />
          Security Settings
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Control your account security and active sessions
        </p>

      </div>

      {/* ===== GRID ===== */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ===== 2FA CARD ===== */}
        <div className="p-6 rounded-2xl border border-white/10 shadow-xl
                        bg-gradient-to-br from-[#0B2447] to-[#112D4E]">

          <div className="flex items-start justify-between">

            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                <KeyRound size={18} />
                Two-Factor Authentication
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Add extra protection to your account login
              </p>
            </div>

            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition
                ${twoFactor ? 'bg-green-500' : 'bg-slate-600'}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition
                  ${twoFactor ? 'translate-x-7' : 'translate-x-0'}`}
              />
            </button>

          </div>

        </div>

        {/* ===== LOGIN ALERTS CARD ===== */}
        <div className="p-6 rounded-2xl border border-white/10 shadow-xl
                        bg-gradient-to-br from-[#0B2447] to-[#112D4E]">

          <div className="flex items-start justify-between">

            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Bell size={18} />
                Login Notifications
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Get notified when someone logs into your account
              </p>
            </div>

            <button
              onClick={() => setLoginAlerts(!loginAlerts)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition
                ${loginAlerts ? 'bg-green-500' : 'bg-slate-600'}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition
                  ${loginAlerts ? 'translate-x-7' : 'translate-x-0'}`}
              />
            </button>

          </div>

        </div>

        {/* ===== LOGOUT CARD ===== */}
        <div className="p-6 rounded-2xl border border-red-500/20 shadow-xl
                        bg-gradient-to-br from-[#1a1a2e] to-[#112D4E]">

          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-2 text-white font-semibold">
              <LogOut size={18} />
              Logout All Devices
            </div>

            <p className="text-slate-400 text-sm">
              This will sign you out from all devices except this one
            </p>

            <button
              className="mt-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition text-white w-fit"
            >
              Logout All
            </button>

          </div>

        </div>

      </div>

    </div>

  );
};

export default SecuritySettings;

{/*Two-Factor Authentication: زر تشغيل/إيقاف للمصادقة الثنائية. 
Login Notifications: عند تفعيله، يتلقى الأدمن إشعارًا عند تسجيل الدخول إلى حسابه.

Session Management: يعرض الجلسات النشطة (مثل الجهاز الحالي). لاحقًا يمكن عرض عدة أجهزة مع إمكانية إنهاء أي جلسة.

Logout From All Devices: ينهي جميع جلسات تسجيل الدخول باستثناء الجلسة الحالية.

Save Changes: يحفظ إعدادات الأمان في قاعدة البيانات لاحقًا. */}