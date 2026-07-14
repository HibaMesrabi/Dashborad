import React, { useRef, useState, useEffect } from 'react';
import {
  UserCircle,
  Save,
  Lock
} from 'lucide-react';
import api from '../../api/axios';

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
      جاي من /admin/settings/account
    */
  const [fullName, setFullName] =
    useState('');
  /*
    البريد الإلكتروني الحالي
    جاي من /admin/settings/account
  */
  const [email, setEmail] =
    useState('');
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
  أخطاء الـ validation
  (من الباك اند)
*/
  const [errors, setErrors] =
    useState({});
  /*
    رسالة النجاح
  */
  const [successMessage, setSuccessMessage] =
    useState('');
  /*
    حالة الحفظ (تعطيل الزر أثناء الإرسال)
  */
  const [saving, setSaving] =
    useState(false);
  /*
    مرجع لاختيار الصورة
    سيستخدم لاحقاً
  */
  const fileRef =
    useRef(null);
  /*
      جلب بيانات الحساب الحالي
      (الاسم والإيميل) عند تحميل الصفحة
    */
  useEffect(() => {

    const fetchAccountData = async () => {

      try {

        const response = await api.get('/admin/settings/account');

        setFullName(response.data.name);
        setEmail(response.data.email);

      } catch (err) {

        // تجاهل الخطأ هون، الحقول رح تظل فاضية

      }

    };

    fetchAccountData();

  }, []);

  /*
    حفظ البيانات
    تغيير كلمة المرور
  */
  const handleSave = async () => {

    setErrors({});
    setSuccessMessage('');
    setSaving(true);

    try {

      await api.patch('/admin/settings/password', {
        currentPassword,
        newPassword,
        confirmPassword
      });

      setSuccessMessage('Password changed successfully.');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

    } catch (err) {

      if (err.response?.status === 422) {

        setErrors(err.response.data.errors || {});

      } else {

        setErrors({ general: ['Something went wrong. Please try again.'] });

      }

    } finally {

      setSaving(false);

    }

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

            {errors.currentPassword && (
              <p className="text-red-400 text-sm mt-2">
                {errors.currentPassword[0]}
              </p>
            )}

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

            {errors.newPassword && (
              <p className="text-red-400 text-sm mt-2">
                {errors.newPassword[0]}
              </p>
            )}

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

            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-2">
                {errors.confirmPassword[0]}
              </p>
            )}

          </div>

        </div>

        {errors.general && (
          <p className="text-red-400 text-sm mt-4">
            {errors.general[0]}
          </p>
        )}

        {successMessage && (
          <p className="text-green-400 text-sm mt-4">
            {successMessage}
          </p>
        )}

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
          disabled={saving}
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
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >

          <Save size={18} />

          {saving ? 'Saving...' : 'Save Changes'}

        </button>
      </div>
    </section>
  );
};
export default AccountSettings;