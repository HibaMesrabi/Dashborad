import React, { useState } from 'react';

/*
  Layout الخاص بلوحة تحكم الأدمن
*/
import AdminLayout from '../../layouts/AdminLayout';

/*
  مكونات صفحة المحتوى المبلغ عنه
*/
import ReportedStats from '../../components/reported/ReportedStats';
import ReportedFilters from '../../components/reported/ReportedFilters';
import ReportedTable from '../../components/reported/ReportedTable';

/*
  صفحة إدارة المحتوى المبلغ عنه
*/

const ReportedContent = () => {

  /*
    بيانات تجريبية
    لاحقاً سيتم جلبها من Laravel API
  */

  const [reports, setReports] = useState([

    {
      // رقم البلاغ
      id: 1,

      // الشخص الذي قام بالإبلاغ
      reporter_name: "Ahmad Khaled",

      // نوع العنصر المبلغ عنه
      reportable_type: "post",

      // عنوان البوست
      reported_item: "AI Conference 2025",

      // سبب البلاغ
      reason: "Spam",

      // حالة البلاغ
      status: "pending",

      // تاريخ البلاغ
      created_at: "2025-07-10"
    },

    {
      id: 2,

      reporter_name: "Sara Ali",

      reportable_type: "account",

      reported_item: "Future Tech Company",

      reason: "Fake Account",

      status: "dismissed",

      created_at: "2025-07-08"
    },

    {
      id: 3,

      reporter_name: "Mohammad Hasan",

      reportable_type: "post",

      reported_item: "New AI Chip Released",

      reason: "Fake News",

      status: "resolved",

      created_at: "2025-07-05"
    },

    {
      id: 4,

      reporter_name: "Noor Ahmad",

      reportable_type: "account",

      reported_item: "Ahmed Mohammed",

      reason: "Harassment",

      status: "pending",

      created_at: "2025-07-03"
    },

    {
      id: 5,

      reporter_name: "Lina Omar",

      reportable_type: "post",

      reported_item: "Cyber Security Summit",

      reason: "Misleading Information",

      status: "pending",

      created_at: "2025-07-01"
    }

  ]);

  /*
    قيمة البحث
  */

  const [search, setSearch] = useState('');

  /*
    فلترة الحالة
  */

  const [selectedStatus, setSelectedStatus] =
    useState('All');

  /*
    فلترة النوع
  */

  const [selectedType, setSelectedType] =
    useState('All');

  /*
    فلترة البيانات
  */

  const filteredReports = reports.filter((report) => {

    // البحث

    const matchesSearch =

      report.reported_item
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      report.reporter_name
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      report.reason
        .toLowerCase()
        .includes(search.toLowerCase());

    // فلترة الحالة

    const matchesStatus =

      selectedStatus === 'All'

        ? true

        : report.status === selectedStatus;

    // فلترة النوع

    const matchesType =

      selectedType === 'All'

        ? true

        : report.reportable_type === selectedType;

    return (

      matchesSearch &&

      matchesStatus &&

      matchesType

    );

  });

  return (

    <AdminLayout>

      {/* عنوان الصفحة */}

      <div className="mb-8">

        <h1
          className="
            text-3xl
            font-bold
            text-white
            mb-2
          "
        >
          Reported Content
        </h1>

        <p className="text-slate-400">


        </p>

      </div>

      {/* كروت الإحصائيات */}

      <ReportedStats

        reports={reports}

      />

      {/* الفلاتر */}

      <ReportedFilters

        search={search}
        setSearch={setSearch}

        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}

        selectedType={selectedType}
        setSelectedType={setSelectedType}

      />

      {/* جدول البلاغات */}

      <ReportedTable

        reports={filteredReports}

        setReports={setReports}

      />

    </AdminLayout>

  );

};

export default ReportedContent;