import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Search, Trash2, ShieldCheck, UserX } from 'lucide-react';
import { useEffect } from 'react';
import api from '../../api/axios';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  // حالة البحث
  const [search, setSearch] = useState('');

  const [banModalUser, setBanModalUser] = useState(null); // آيدي المستخدم يلي فاتحين له نافذة الحظر
  const [banReason, setBanReason] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get(`/admin/getUsers?page=${currentPage}&search=${search}`)
      .then((res) => {
        const mappedUsers = res.data.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          status: user.is_active ? "Active" : "Blocked",
          verified: user.verification_status === "approved",
        }));
        setUsers(mappedUsers);
        setLastPage(res.data.meta.last_page);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentPage, search]);


  // // فلترة المستخدمين حسب البحث
  // const filteredUsers = users.filter(user =>
  //   user.name.toLowerCase().includes(search.toLowerCase()) ||
  //   user.email.toLowerCase().includes(search.toLowerCase())
  // );

  // حذف مستخدم
  const deleteUser = (id) => {
    if (confirm("Are you sure?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // // حظر / فك الحظر
  // const toggleBlock = (id) => {
  //   setUsers(users.map(user =>
  //     user.id === id
  //       ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
  //       : user
  //   ));
  // };

  // فتح نافذة إدخال سبب الحظر
  const openBanModal = (id) => {
    setBanModalUser(id);
    setBanReason('');
  };

  // تأكيد الحظر وإرساله للباك اند
  const confirmBan = () => {
    if (!banReason.trim()) return;

    api.post(`/admin/users/${banModalUser}/ban`, { ban_reason: banReason })
      .then(() => {
        setUsers(users.map(user =>
          user.id === banModalUser ? { ...user, status: "Blocked" } : user
        ));
        setBanModalUser(null);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || 'حدث خطأ أثناء الحظر');
      });
  };

  // فك الحظر مباشرة (بدون سبب)
  const unbanUser = (id) => {
    if (!confirm("Are you sure you want to unban this user?")) return;
    api.post(`/admin/users/${id}/unban`)
      .then(() => {
        setUsers(users.map(user =>
          user.id === id ? { ...user, status: "Active" } : user
        ));
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || 'حدث خطأ أثناء فك الحظر');
      });
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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent outline-none text-white w-full text-sm"
          />
        </div>
      </div>

      {/* الجدول */}
      <div className="bg-[#112D4E] rounded-2xl overflow-hidden">

        {users.length === 0 ? (
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
              {users.map(user => (
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
                    </button>
                    {/* حظر / فك حظر */}
                    <button onClick={() => user.status === "Active" ? openBanModal(user.id) : unbanUser(user.id)}>
                      <UserX className="text-yellow-400" size={18} />
                    </button>

                    {/* حذف
                    <button onClick={() => deleteUser(user.id)}>
                      <Trash2 className="text-red-400" size={18} />
                    </button> */}

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}
        <div className="flex justify-center items-center gap-4 p-4 border-t border-slate-700">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-[#0A192F] text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-slate-300 text-sm">
            Page {currentPage} of {lastPage}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, lastPage))}
            disabled={currentPage === lastPage}
            className="px-4 py-2 rounded-lg bg-[#0A192F] text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {banModalUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#112D4E] p-6 rounded-2xl w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-white">
              Ban reason
            </h3>

            <textarea
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="Write ban reason here..."
              className="w-full h-24 p-3 rounded-lg bg-[#0A192F] text-white outline-none resize-none text-sm"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setBanModalUser(null)}
                className="px-4 py-2 rounded-lg bg-slate-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmBan}
                disabled={!banReason.trim()}
                className="px-4 py-2 rounded-lg bg-red-500 text-white disabled:opacity-40"
              >
                Confirm Ban
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default Users;