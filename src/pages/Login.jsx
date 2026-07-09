import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {

  // تخزين القيم المدخلة
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false); // لتخزين تذكرني

  const navigate = useNavigate();

  // دالة التحقق من تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    // بيانات الأدمن (تجريبية)
    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456";

    // بيانات الشركة (تجريبية)
    const companyEmail = "company@gmail.com";
    const companyPassword = "123456";

    // 🟢 أولاً: التحقق إذا المستخدم أدمن
    if (email === adminEmail && password === adminPassword) {

      // تخزين نوع المستخدم
      localStorage.setItem("role", "admin");

      // التعامل مع "تذكرني"
      if (remember) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // الانتقال إلى لوحة تحكم الأدمن
      navigate('/admin-dashboard');

    } 
    //  ثانياً: التحقق إذا المستخدم شركة
    else if (email === companyEmail && password === companyPassword) {

      // تخزين نوع المستخدم
      localStorage.setItem("role", "company");

      // التعامل مع "تذكرني"
      if (remember) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // الانتقال إلى لوحة تحكم الشركة
      navigate('/company-dashboard');

    } 
    // ❌ إذا البيانات غير صحيحة
    else {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  // استرجاع الإيميل المحفوظ عند فتح الصفحة
  useEffect(() => {

    // قراءة الإيميل من localStorage
    const savedEmail = localStorage.getItem("savedEmail");

    // إذا موجود نحطه داخل الحقل ونفعل checkbox
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }

  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A192F] via-[#112D4E] to-slate-900 text-white">

      {/* صندوق تسجيل الدخول */}
      <div className="bg-[#112D4E] p-10 rounded-3xl shadow-2xl w-full max-w-md animate-[fadeInUp_0.8s_ease]">
        
        {/* عنوان */}
        <h2 className="text-3xl font-bold mb-8 text-center">
         LOGIN
        </h2>

        {/* الفورم */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          
          {/* حقل الإيميل */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // تحديث القيمة
            className="p-3 rounded-lg bg-white/10 border border-slate-600 focus:outline-none focus:border-orange-500"
          />

          {/* حقل الباسورد */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // تحديث القيمة
            className="p-3 rounded-lg bg-white/10 border border-slate-600 focus:outline-none focus:border-orange-500"
          />

          {/* خيارات إضافية */}
          <div className="flex items-center justify-between text-sm">

            {/* checkbox تذكرني */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)} // تبديل الحالة
              />
              Remember me
            </label>

            {/* نسيت كلمة المرور */}
            <button 
              type="button"
              onClick={() => alert("ميزة إعادة تعيين كلمة المرور غير مفعلة حالياً")}
              className="text-orange-400 hover:underline"
            >
              Forgot your password?
            </button>

          </div>{/* زر الدخول */}
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 bg-orange-500 py-3 rounded-lg font-medium hover:bg-orange-600 transition"
          >
            login
            <LogIn size={18} />
          </button>

        </form>
      </div>

      {/* أنيميشن الدخول */}
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