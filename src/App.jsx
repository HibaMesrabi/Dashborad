import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/ADMIN/AdminDashboard';
import Users from './pages/ADMIN/Users';
import Companies from './pages/ADMIN/Companies'; 
import News from './pages/ADMIN/News';
import ReportedContent from './pages/ADMIN/ReportedContent';
import Reports from './pages/ADMIN/Reports';
import Settings from './pages/ADMIN/Settings';
// صفحة مؤقتة للشركة
const CompanyDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A192F] text-white">
      <h1>لوحة تحكم الشركة</h1>
    </div>
  );
};

function App() {
  return (
    <Routes>

      {/* الصفحة الرئيسية */}
      <Route path="/" element={<Home />} />

      {/* تسجيل الدخول */}
      <Route path="/login" element={<Login />} />

      {/* داشبورد الأدمن */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* داشبورد الشركة */}
      <Route path="/company-dashboard" element={<CompanyDashboard />} />

      {/* إدارة المستخدمين */}
      <Route path="/users" element={<Users />} />
     {/* أدارة الشركات */}
      <Route path="/companies" element={<Companies />} />

      {/* أدارة الأخبار */}
        <Route path="/news" element={<News />}/> 
      {/* المحتوى المبلغ عنه */}
      <Route path="/reported" element={<ReportedContent />}/>
      {/*التقارير*/}
      <Route path="/reports" element={<Reports />}/>
      {/* إعدادات المنصة */}
      <Route path="/settings" element={<Settings />}/>
      
    </Routes>
  );
}

export default App;