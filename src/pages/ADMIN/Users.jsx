import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Search, Trash2, ShieldCheck, UserX } from 'lucide-react';

const Users = () => {

  // بيانات المستخدمين (تجريبية)
  const [users, setUsers] = useState([
    { id: 1, name: "Amer ms", email: "Amer.MS@gmail.com", status: "Active", verified: false },
    { id: 2, name: "Rayan Me", email: "rayan.me@mail.com", status: "Blocked", verified: true },
    { id: 3, name: "Abd Al Rahman KH", email: "A.Kh@outlook.com", status: "Active", verified: false },
    { id: 4, name: "Rama Youssef", email: "rama.y@gmail.com", status: "Active", verified: true },
    { id: 5, name: "Fatema Ha", email: "Fatema.H@mail.com", status: "Blocked", verified: false },
  ]);

  // حالة البحث
  const [search, setSearch] = useState('');

  // فلترة المستخدمين حسب البحث
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // حذف مستخدم
  const deleteUser = (id) => {
    if (confirm("Are you sure?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // حظر / فك الحظر
  const toggleBlock = (id) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
        : user
    ));
  };

  // توثيق المستخدم
  const verifyUser = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, verified: true } : user
    ));
  };

  return (
    <AdminLayout>

      {/* عنوان الصفحة */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Users Management
        </h1>
      </div>

      {/* البحث */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 bg-[#112D4E] px-4 py-2 rounded-full w-80">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-white w-full text-sm"
          />
        </div>
      </div>

      {/* الجدول */}
      <div className="bg-[#112D4E] rounded-2xl overflow-hidden">

        {filteredUsers.length === 0 ? (
          <p className="text-center p-6 text-slate-400">
            No users found
          </p>
        ) : (

          <table className="w-full text-right">

            <thead className="bg-[#0A192F]">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Verified</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className="border-b border-slate-700 hover:bg-[#1A3C63] transition"
                >

                  {/* الاسم */}
                  <td className="p-4">{user.name}</td>

                  {/* الإيميل */}
                  <td className="p-4">{user.email}</td>

                  {/* الحالة */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm 
                      ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
                      {user.status}
                    </span>
                  </td>

                  {/* التوثيق */}
                  <td className="p-4">
                    {user.verified ? "✔" : "—"}
                  </td>

                  {/* العمليات */}
                  <td className="p-4 flex gap-4 justify-center">

                    {/* توثيق */}
                    <button onClick={() => verifyUser(user.id)}>
                      <ShieldCheck className="text-green-400" size={18} />
                    </button>{/* حظر */}
                    <button onClick={() => toggleBlock(user.id)}>
                      <UserX className="text-yellow-400" size={18} />
                    </button>

                    {/* حذف */}
                    <button onClick={() => deleteUser(user.id)}>
                      <Trash2 className="text-red-400" size={18} />
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </AdminLayout>
  );
};

export default Users;