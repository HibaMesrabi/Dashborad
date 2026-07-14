import React, { useState, useEffect } from 'react';
import { LockKeyhole, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

/*
  صفحة إعادة تعيين كلمة المرور
*/

const ResetPassword = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // جلب التوكن والإيميل تلقائياً من الرابط الذي أُرسل للمستخدم
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(''); // لعرض الأخطاء القادمة من لارافيل
  const [loading, setLoading] = useState(false); // لحالة جاري الإرسال

  // للتحقق من أن المستخدم دخل للصفحة عبر رابط صحيح يحتوي على التوكن
  useEffect(() => {
    if (!token || !email) {
      setError("Invalid or expired link. Please request a new password reset.");
    }
  }, [token, email]);

  /*
    عند الضغط على زر إعادة التعيين
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!token || !email) {
      setError("can't reset password. Invalid or expired link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // إرسال البيانات للـ API الخاص بلارافيل
      await api.post('/password/reset', {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      setSuccess(true);
      setPassword('');
      setConfirmPassword('');

      // تحويل المستخدم لصفحة تسجيل الدخول تلقائياً بعد 3 ثوانٍ
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to reset password. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-[#0A192F]
        via-[#112D4E]
        to-[#0A192F]
        p-4
      "
    >

      {/* الكارد */}

      <div
        className="
          w-full
          max-w-md
          bg-gradient-to-br
          from-[#112D4E]
          to-[#0F2748]
          border
          border-[#1E3A5F]
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        {/* العنوان */}

        <h1
          className="
            text-3xl
            font-bold
            text-white
            text-center
            mb-3
          "
        >
          Reset Password
        </h1>

        <p
          className="
            text-slate-300
            text-center
            mb-8
          "
        >
          Create a new password for your account.
        </p>

        {success && (
          <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 text-center">
            Password changed successfully! Redirecting to login...
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-center">
            {error}
          </div>
        )}

        {/* الفورم */}

        <form onSubmit={handleSubmit}>

          {/* كلمة المرور */}

          <div className="mb-5">

            <label className="block text-slate-200 mb-2">

              New Password

            </label>

            <div className="relative">

              <LockKeyhole
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="
                  w-full
                  h-12
                  pl-12
                  pr-4
                  rounded-2xl
                  bg-[#0A192F]
                  border
                  border-[#1E3A5F]
                  text-white
                  outline-none
                  focus:border-orange-400
                "
              />

            </div>

          </div>

          {/* تأكيد كلمة المرور */}

          <div className="mb-7">

            <label className="block text-slate-200 mb-2">

              Confirm Password

            </label>

            <div className="relative">

              <LockKeyhole
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm password"
                className="
                  w-full
                  h-12
                  pl-12
                  pr-4
                  rounded-2xl
                  bg-[#0A192F]
                  border
                  border-[#1E3A5F]
                  text-white
                  outline-none
                  focus:border-orange-400
                "
              />

            </div>

          </div>

          {/* الزر */}

          <button
            type="submit"
            className="
              w-full
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-orange-600
              hover:from-orange-600
              hover:to-orange-700
              text-white
              font-semibold
              transition
            "
          >
            Reset Password
          </button>

        </form>

        {/* العودة لتسجيل الدخول */}

        <Link
          to="/login"
          className="
            flex
            items-center
            justify-center
            gap-2
            mt-6
            text-slate-300
            hover:text-white
            transition
          "
        >

          <ArrowLeft size={16} />

          Back to Login

        </Link>

      </div>

    </div>

  );

};

export default ResetPassword;