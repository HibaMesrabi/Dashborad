import React, { useState } from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import ReportedStats from '../../components/reported/ReportedStats';
import ReportedFilters from '../../components/reported/ReportedFilters';
import ReportedTable from '../../components/reported/ReportedTable';

/*
  صفحة إدارة المحتوى المبلغ عنه
*/

const ReportedContent = () => {

  /*
    بيانات تجريبية
  */

  const [reports, setReports] = useState([

    {
      id: 1,
      content: 'Fake AI Conference Registration Link',
      reportedBy: 'Ahmad Khaled',
      reason: 'Spam',
      type: 'Company',
      status: 'Pending',
      date: '2025-07-10',
      user: 'Future Tech Labs',

      isHidden: false,
      isBlocked: false,
      isRestricted: false
    },

    {
      id: 2,
      content: 'Misleading Technology News',
      reportedBy: 'Sara Ali',
      reason: 'Fake News',
      type: 'Company',
      status: 'Dismissed',
      date: '2025-07-08',
      user: 'Neural Systems',

      isHidden: false,
      isBlocked: false,
      isRestricted: false
    },

    {
      id: 3,
      content: 'Offensive Profile',
      reportedBy: 'Mohammad Hasan',
      reason: 'Offensive Content',
      type: 'User',
      status: 'Resolved',
      date: '2025-07-05',
      user: 'User Account',

      isHidden: true,
      isBlocked: false,
      isRestricted: true
    }

  ]);

  const [search, setSearch] = useState('');

  const [selectedStatus, setSelectedStatus] =
    useState('All');

  const [selectedType, setSelectedType] =
    useState('All');

  /*
    الفلترة
  */

  const filteredReports = reports.filter(
    (report) => {

      const matchesSearch =

        report.content
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        report.reportedBy
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        report.reason
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =

        selectedStatus === 'All'
          ? true
          : report.status === selectedStatus;

      const matchesType =

        selectedType === 'All'
          ? true
          : report.type === selectedType;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );

    }
  );

  return (

    <AdminLayout>

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
          Manage reported content and user violations.
        </p>

      </div>

      <ReportedStats reports={reports} />

      <ReportedFilters

        search={search}
        setSearch={setSearch}

        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}

        selectedType={selectedType}
        setSelectedType={setSelectedType}

      />

      <ReportedTable

        reports={filteredReports}
        setReports={setReports}

      />

    </AdminLayout>

  );

};

export default ReportedContent;