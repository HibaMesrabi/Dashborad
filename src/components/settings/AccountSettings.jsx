import React, { useRef, useState } from 'react';
import {
  UserCircle,
  Save,
  Lock
} from 'lucide-react';

/*
  Account Settings

  مسؤول عن:
  - عرض معلومات حساب الأدمن
  - تغيير كلمة المرور
  - حفظ كلمة المرور الجديدة

  الاسم والبريد الإلكتروني
  للعرض فقط ولا يمكن تعديلهما.
*/

const AccountSettings = () => {
  /*
    الاسم الحالي
  */
  const [fullName] =
    useState('Admin');
  /*
    البريد الإلكتروني الحالي
  */
  const [email] =
    useState('admin@gmail.com');
  /*
    الصورة الشخصية
    سيتم استخدامها لاحقاً
  */
  const [avatar] =
    useState(null);
  /*
    كلمة المرور الحالية
  */
  const [currentPassword,
    setCurrentPassword] =
    useState('');
  /*
    كلمة المرور الجديدة
  */
  const [newPassword,
    setNewPassword] =
    useState('');
  /*
    تأكيد كلمة المرور الجديدة
  */
  const [confirmPassword,
    setConfirmPassword] =
    useState('');
  /*
    مرجع لاختيار الصورة
    سيستخدم لاحقاً
  */
  const fileRef =
    useRef(null);
  /*
    حفظ البيانات
    تغيير كلمة المرور
  */
  const handleSave = () => {
    console.log(
      'Change Password',
      {
        currentPassword,
        newPassword,
        confirmPassword
      }
    );
  };
  return (
    <section
      className="
        bg-gradient-to-br
        from-[#183C69]
        via-[#204A7A]
        to-[#295789]
        border
        border-white/10
        rounded-3xl
        p-6
        md:p-8
        mb-6
        shadow-2xl
        hover:border-blue-400/40
        transition-all
        duration-300
      "
    >
      {/* عنوان القسم */}
      <div className="flex items-center gap-4 mb-8">
        {/* أيقونة القسم */}
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-blue-500
            to-blue-600
            flex
            items-center
            justify-center
            text-white
            shadow-lg
          "
        >
          <UserCircle size={22} />
        </div>
        {/* اسم القسم */}
        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Account Settings
          </h2>
          <p
            className="
              text-slate-100
              mt-1
            "
          >
            Manage your administrator account.
          </p>
        </div>
      </div>
      {/* معلومات الحساب */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          mb-8
        "
      >

        {/* الاسم */}
        <div>
          <label
            className="
              block
              text-sm
              font-medium
              text-slate-100
              mb-2
            "
          >
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            readOnly
            className="
              w-full
              h-12
              px-4
              rounded-2xl
              bg-[#0A192F]/70
              border
              border-white/10
              text-white
              cursor-not-allowed
              outline-none
            "
          />
        </div>
        {/* البريد الإلكتروني */}
        <div>
          <label
            className="
              block
              text-sm
              font-medium
              text-slate-100
              mb-2
            "
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="
              w-full
              h-12
              px-4
              rounded-2xl
              bg-[#0A192F]/70
              border
              border-white/10
              text-white
              cursor-not-allowed
              outline-none
            "
          />
        </div>
      </div>
            {/* تغيير كلمة المرور */}
      <div
        className="
          p-6
          rounded-3xl
          bg-[#0A192F]/60
          border
          border-white/10
        "
      >

        {/* عنوان القسم */}

        <div className="flex items-center gap-3 mb-5">

          <Lock
            size={18}
            className="text-orange-400"
          />

          <h3
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            Change Password
          </h3>

        </div>

        {/* حقول كلمة المرور */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
          "
        >

          {/* كلمة المرور الحالية */}

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-slate-100
                mb-2
              "
            >
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              className="
                w-full
                h-12
                px-4
                rounded-2xl
                bg-[#0A192F]
                border
                border-[#1E3A5F]
                text-white
                placeholder:text-slate-300
                outline-none
                focus:border-orange-400
                transition
              "
            />

          </div>

          {/* كلمة المرور الجديدة */}

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-slate-100
                mb-2
              "
            >
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              className="
                w-full
                h-12
                px-4
                rounded-2xl
                bg-[#0A192F]
                border
                border-[#1E3A5F]
                text-white
                placeholder:text-slate-300
                outline-none
                focus:border-orange-400
                transition
              "
            />

          </div>

          {/* تأكيد كلمة المرور */}

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                text-slate-100
                mb-2
              "
            >
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="
                w-full
                h-12
                px-4
                rounded-2xl
                bg-[#0A192F]
                border
                border-[#1E3A5F]
                text-white
                placeholder:text-slate-300
                outline-none
                focus:border-orange-400
                transition
              "
            />

          </div>

        </div>

      </div>

      {/* زر حفظ كلمة المرور */}

      <div
        className="
          flex
          justify-end
          mt-6
        "
      >

        <button
          onClick={handleSave}
          className="
            flex
            items-center
            gap-2
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-500
            to-blue-600
            hover:from-blue-600
            hover:to-blue-700
            text-white
            font-semibold
            shadow-lg
            transition
          "
        >

          <Save size={18} />

          Save Changes

        </button>
      </div>
    </section>
  );
};
export default AccountSettings;