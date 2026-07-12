import React, { useState, useEffect } from 'react';

// استيراد Link للانتقال إلى صفحة نسيت كلمة المرور
// واستيراد useNavigate للتنقل بعد تسجيل الدخول
import { Link, useNavigate } from 'react-router-dom';

// أيقونة تسجيل الدخول
import { LogIn } from 'lucide-react';

/*
=========================================
            Login Page
=========================================
*/

const Login = () => {

  /*
  =========================================
              States
  =========================================
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
  =========================================
          Login Function
  =========================================
  */

  const handleLogin = (e) => {

    // منع إعادة تحميل الصفحة
    e.preventDefault();

    // بيانات الأدمن (مؤقتة)
    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456";

    // بيانات الشركة (مؤقتة)
    const companyEmail = "company@gmail.com";
    const companyPassword = "123456";

    /*
      التحقق من الأدمن
    */

    if (

      email === adminEmail &&
      password === adminPassword

    ) {

      // حفظ نوع المستخدم
      localStorage.setItem(
        "role",
        "admin"
      );

      // حفظ الإيميل إذا كان خيار تذكرني مفعل
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

      // الانتقال إلى لوحة الأدمن
      navigate("/admin-dashboard");

    }

    /*
      التحقق من الشركة
    */

    else if (

      email === companyEmail &&
      password === companyPassword

    ) {

      // حفظ نوع المستخدم
      localStorage.setItem(
        "role",
        "company"
      );

      // حفظ الإيميل
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

      // الانتقال إلى لوحة الشركة
      navigate("/company-dashboard");

    }

    /*
      بيانات غير صحيحة
    */

    else {

      alert(
        "البريد الإلكتروني أو كلمة المرور غير صحيحة"
      );

    }

  };

  /*
  =========================================
      استرجاع الإيميل المحفوظ
  =========================================
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
  =========================================
          واجهة الصفحة
  =========================================
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