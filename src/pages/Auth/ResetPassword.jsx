import React, { useState } from 'react';
import { LockKeyhole, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

/*
  صفحة إعادة تعيين كلمة المرور
*/

const ResetPassword = () => {

  // كلمة المرور الجديدة
  const [password, setPassword] = useState('');

  // تأكيد كلمة المرور
  const [confirmPassword, setConfirmPassword] = useState('');

  // رسالة نجاح مؤقتة
  const [success, setSuccess] = useState(false);

  /*
    عند الضغط على زر إعادة التعيين
  */
  const handleSubmit = (e) => {

    e.preventDefault();

    // التحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {

      alert('Passwords do not match.');

      return;

    }

    console.log({

      password,

      confirmPassword

    });

    // إظهار رسالة نجاح مؤقتة
    setSuccess(true);

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

        {

          success && (

            <div
              className="
                mb-6
                p-4
                rounded-2xl
                bg-green-500/10
                border
                border-green-500/30
                text-green-400
                text-center
              "
            >
              Password changed successfully.
            </div>

          )

        }

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