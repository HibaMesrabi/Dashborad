import React from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import GeneralSettings from '../../components/settings/GeneralSettings';
import AccountSettings from '../../components/settings/AccountSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';

/*
  صفحة الإعدادات

  مسؤولية الصفحة:

  - عرض عنوان الصفحة
  - ترتيب أقسام الإعدادات
  - عرض زر حفظ التعديلات

  لا تحتوي الصفحة على أي منطق،
  فقط تقوم باستدعاء المكونات.
*/

const Settings = () => {

  /*
    سيتم لاحقاً إرسال جميع البيانات
    إلى الـ Backend عند الضغط
    على زر الحفظ.
  */

  const handleSave = () => {

    console.log(
      'Save Settings'
    );

  };

  return (

    <AdminLayout>

      {/* عنوان الصفحة */}

      <div className="mb-8">

        <h1
          className="
            text-3xl
            font-bold
            text-white
            mb-2
          "
        >
          Settings
        </h1>

        <p
          className="
            text-slate-400
          "
        >
          Manage platform settings and administrator account.
        </p>

      </div>

      {/* إعدادات المنصة */}

      <GeneralSettings />

      {/* إعدادات الحساب */}

      <AccountSettings />

      {/* إعدادات الأمان */}

      <SecuritySettings />

      {/* زر حفظ التعديلات */}

      <div
        className="
          flex
          justify-end
          mt-8
          mb-10
        "
      >

        <button

          onClick={handleSave}

          className="
            px-8
            py-3
            rounded-xl
            bg-orange-500
            text-white
            font-semibold
            hover:bg-orange-600
            transition
          "

        >
          Save Changes
        </button>

      </div>

    </AdminLayout>

  );

};

export default Settings;