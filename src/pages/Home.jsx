import React from 'react';
import { LayoutDashboard, LogIn, Building, Users } from 'lucide-react';

// استيراد الصور من مجلد media داخل src
import homeImg from '../media/home-bg.png';
import img2 from '../media/home2-bg.png';
import img3 from '../media/home3-bg.png';
import img4 from '../media/home4-bg.png';
import {useNavigate} from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112D4E] to-slate-900 font-sans text-right text-white" dir="rtl">
      
      {/* Header: شريط علوي ثابت */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-700/40 bg-[#0A192F]/70 backdrop-blur-sm sticky top-0 z-50">
        
        {/* اللوجو + العنوان */}
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 p-2 rounded-lg text-white shadow-md">
            <LayoutDashboard size={22} />
          </div>
          <span className="text-xl font-bold">
            Welcome <span className="text-orange-500">to</span> Dashboard
          </span>
        </div>

        {/* أيقونة المستخدم */}
        <div className="bg-white/10 p-2.5 rounded-full text-slate-300 border border-slate-600 shadow-sm">
          <Users size={20} />
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          
          {/* صورة رئيسية مع أنيميشن دخول */}
          <div className="flex-1 w-full max-w-sm md:max-w-none animate-[fadeIn_1s_ease]">
            <img
              src={homeImg}
              alt="home"
              className="w-full h-72 object-cover rounded-2xl shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>

          {/* عنوان رئيسي */}
          <div className="flex-1 animate-[fadeInUp_1s_ease]">
            <h1 className="text-5xl md:text-6xl font-extrabold">
              MANAGEMENT <span className="text-orange-500">PLATFORM</span> NEWS
            </h1>
          </div>

        </div>
      </main>

      {/* Cards Section */}
      <div className="px-6 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* كرت المعارض */}
          <div className="bg-white/90 text-slate-900 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-500 animate-[fadeInUp_0.8s_ease]">
            
            {/* صورة بعرض الكرت */}
            <img src={img2} className="w-full h-40 object-cover" />

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Exhibitions</h3>
              <p className="text-slate-600">Events At Technology Exhibitions</p>
            </div>
          </div>

          {/* كرت المحاضرات */}
          <div className="bg-white/90 text-slate-900 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-500 delay-100 animate-[fadeInUp_0.9s_ease]">
            
            <img src={img3} className="w-full h-40 object-cover" />

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">LECTURES</h3>
              <p className="text-slate-600">Academic And Professional Lectures</p>
            </div>
          </div>

          {/* كرت الدورات */}
          <div className="bg-white/90 text-slate-900 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-500 delay-200 animate-[fadeInUp_1s_ease]">
            
            <img src={img4} className="w-full h-40 object-cover" />

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">COURSES</h3>
              <p className="text-slate-600">Training Courses And Interactive Workshops</p>
            </div>
          </div>

        </div>
      </div>
       {/* قسم الدخول */}
      <div className="px-6 pb-20 md:pb-32 text-center">
        <h2 className="text-3xl font-bold mb-10">Welcome To The Management <span className="text-orange-500">PLATFORM</span></h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">          
          <div className="px-6 pb-20 md:pb-32 text-center text-white">  
  
  

  {/* الكرت */}
  <div className="flex justify-center">
    
    <div 
      onClick={() => navigate('/login')} // عند الضغط يروح لصفحة تسجيل الدخول
      className="bg-[#112D4E] p-12 rounded-3xl border border-slate-700/50 // خلفية الكرت
      flex flex-col items-center gap-6 
      hover:bg-[#1A3C63] transition-all duration-300 
      cursor-pointer group shadow-2xl w-full max-w-md"
    >

      {/* أيقونة */}
      <div className="bg-orange-100 p-5 rounded-full text-orange-600 group-hover:scale-110 transition">
        <LogIn size={36} />
      </div>

      {/* العنوان */}
      <h3 className="text-2xl font-bold text-white">
        Login
      </h3>

       {/* زر */}
      <button className="mt-4 bg-white text-slate-950 px-8 py-3 rounded-xl font-medium 
      group-hover:bg-orange-500 group-hover:text-white transition">
        login
      </button>

    </div>

  </div>
</div>

          
        </div>
      </div>

      {/* تعريف الأنيميشن */}
      <style>{`
        @keyframes fadeIn {  // تعريف الأنيميشن للظهور
          from {opacity: 0;} // البداية تكون شفافة
          to {opacity: 1;}  // النهاية تكون شفافة
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);// 
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
};

export default Home;
