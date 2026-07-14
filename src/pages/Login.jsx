import React, { useState, useEffect } from 'react';

// استيراد Link للانتقال إلى صفحة نسيت كلمة المرور
// واستيراد useNavigate للتنقل بعد تسجيل الدخول
import { Link, useNavigate } from 'react-router-dom';

// أيقونة تسجيل الدخول
import { LogIn } from 'lucide-react';
// Axios للاتصال مع Laravel
import api from '../api/axios';
/*
Login Page
*/

const Login = () => {

  /*
States
  */

  // البريد الإلكتروني
  const [email, setEmail] = useState('');

  // كلمة المرور
  const [password, setPassword] = useState('');

  // خيار تذكرني
  const [remember, setRemember] = useState(false);

  // يستخدم للتنقل بين الصفحات
  const navigate = useNavigate();

/*
  تسجيل الدخول باستخدام Laravel
*/
const handleLogin = async (e) => {

  // منع إعادة تحميل الصفحة
  e.preventDefault();

  try {

    // إرسال البيانات إلى Laravel
    const response = await api.post('/login', {

      email,

      password

    });

    /*
      حفظ التوكن
    */
    localStorage.setItem(

      "token",

      response.data.access_token

    );

    /*
      حفظ نوع المستخدم
    */
    localStorage.setItem(

      "role",

      response.data.user_type.toLowerCase()

    );

    /*
      حفظ البريد الإلكتروني إذا كان Remember Me مفعلاً
    */
    if (remember) {

      localStorage.setItem(

        "savedEmail",

        email

      );

    }

    else {

      localStorage.removeItem(

        "savedEmail"

      );

    }

    /*
      الانتقال حسب نوع الحساب
    */
    if (

      response.data.user_type.toLowerCase() === "admin"

    ) {

      navigate("/admin-dashboard");

    }

    else if (

      response.data.user_type.toLowerCase() === "company"

    ) {

      navigate("/company-dashboard");

    }

    else {

      alert("ليس لديك صلاحية للدخول.");

    }

  }

  catch (error) {

    if (error.response) {

      alert(error.response.data.message);

    }

    else {

      alert("حدث خطأ أثناء تسجيل الدخول.");

    }

  }

};
 

  /*
استرجاع الإيميل المحفوظ
  */

  useEffect(() => {

    const savedEmail =
      localStorage.getItem("savedEmail");

    if (savedEmail) {

      setEmail(savedEmail);

      setRemember(true);

    }

  }, []);

  /*
واجهة الصفحة
  */

  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#0A192F]
      text-white
    "
    >

      {/* صندوق تسجيل الدخول */}

      <div
        className="
        bg-[#112D4E]
        p-10
        rounded-3xl
        shadow-2xl
        w-full
        max-w-md
        animate-[fadeInUp_0.8s_ease]
      "
      >

        {/* عنوان الصفحة */}

        <h2
          className="
          text-3xl
          font-bold
          mb-8
          text-center
        "
        >
          LOGIN
        </h2>

        {/* نموذج تسجيل الدخول */}

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >

          {/* البريد الإلكتروني */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
            p-3
            rounded-lg
            bg-white/10
            border
            border-slate-600
            focus:outline-none
            focus:border-orange-500
          "
          />

          {/* كلمة المرور */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
            p-3
            rounded-lg
            bg-white/10
            border
            border-slate-600
            focus:outline-none
            focus:border-orange-500
          "
          />
           {/* خيارات إضافية */}

          <div className="flex items-center justify-between text-sm">

            {/* تذكرني */}

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />

              Remember me

            </label>

            {/* الانتقال إلى صفحة نسيت كلمة المرور */}

            <Link
              to="/forgot-password"
              className="
                text-orange-400
                hover:text-orange-300
                hover:underline
                transition
              "
            >
              Forgot your password?
            </Link>

          </div>

          {/* زر تسجيل الدخول */}

          <button
            type="submit"
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-orange-500
              py-3
              rounded-lg
              font-medium
              hover:bg-orange-600
              transition
            "
          >

            Login

            <LogIn size={18} />

          </button>

        </form>

      </div>

      {/* أنيميشن ظهور الصفحة */}

      <style>

        {`
          @keyframes fadeInUp {

            from {

              opacity: 0;

              transform: translateY(40px);

            }

            to {

              opacity: 1;

              transform: translateY(0);

            }

          }
        `}

      </style>

    </div>

  );

};

export default Login;