import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

/*
  Admin Layout
  يحتوي:
  - Sidebar
  - Topbar
  - Content
*/

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112D4E] to-slate-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="
          mr-64
          min-h-screen
          flex
          flex-col
        "
      >
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="p-6 text-white">
          {children}
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;