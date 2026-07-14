import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import api from '../../api/axios';

/*
  Forgot Password Page
*/

const ForgotPassword = () => {

  // الإيميل
  const [email, setEmail] = useState('');

  // رسالة نجاح وهمية حالياً
  const [success, setSuccess] = useState(false);

  /*
  إرسال رابط إعادة تعيين كلمة المرور
*/
const handleSubmit = async (e) => {

  // منع إعادة تحميل الصفحة
  e.preventDefault();

  try {

    // إرسال الإيميل إلى Laravel
    const response = await api.post('/password/email', {

      email

    });

    // إظهار رسالة النجاح
    alert(response.data.message);

    setSuccess(true);

  }

  catch (error) {

    // إظهار رسالة الخطأ القادمة من Laravel
    if (error.response) {

      alert(error.response.data.message);

    }

    else {

      alert("حدث خطأ أثناء إرسال الرابط.");

    }

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

        <h1
          className="
            text-3xl
            font-bold
            text-white
            text-center
            mb-3
          "
        >
          Forgot Password
        </h1>

        <p
          className="
            text-slate-300
            text-center
            mb-8
          "
        >
          Enter your email address and we will send you a reset link.
        </p>

        {

          success && (

            <div
              className="
                mb-5
                p-4
                rounded-2xl
                bg-green-500/10
                border
                border-green-500/30
                text-green-400
              "
            >
              Reset link sent successfully.
            </div>

          )

        }

        <form onSubmit={handleSubmit}>

          <div className="mb-6">

            <label
              className="
                block
                text-slate-200
                mb-2
              "
            >
              Email Address
            </label>

            <div className="relative">

              <Mail
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
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
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
                placeholder="Enter your email"
              />

            </div>

          </div>

          <button
            type="submit"
            className="
              w-full
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-orange-600
              text-white
              font-semibold
            "
          >
            Send Reset Link
          </button>

        </form>

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
          "
        >
          <ArrowLeft size={16} />

          Back to Login

        </Link>

      </div>

    </div>

  );

};

export default ForgotPassword;