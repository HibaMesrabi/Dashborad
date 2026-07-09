import React from 'react';
import { User } from 'lucide-react';

/*
  Topbar:
   شريط علوي بسيط
   فيه اسم المستخدم أو أيقونة
*/

const Topbar = () => {
  return (
    <div className="h-16 bg-[#112D4E] flex items-center justify-between px-6 text-white shadow">

      {/* عنوان الصفحة */}
      <h1 className="text-lg font-semibold">
        Dashboard
      </h1>

      {/* أيقونة المستخدم */}
      <div className="bg-white/10 p-2 rounded-full">
        <User size={20} />
      </div>

    </div>
  );
};

export default Topbar;