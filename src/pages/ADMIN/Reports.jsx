import React, { useState } from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import ReportsStats from '../../components/reports/ReportsStats';
import ReportsCharts from '../../components/reports/ReportsCharts';
import ReportsFilters from '../../components/reports/ReportsFilters';
import ReportsTable from '../../components/reports/ReportsTable';

/*
  Reports Page (Admin Dashboard)

  - Stores reports data
  - Handles filtering
  - Sends data to child components
*/

const Reports = () => {

  /*
    Monthly reports data (mock data for now)
  */

  const [reportsData] = useState([

    {
      id: 1,
      year: 2026,
      month: 'January',
      users: 40,
      companies: 5,
      news: 30,
      reports: 2
    },

    {
      id: 2,
      year: 2026,
      month: 'February',
      users: 55,
      companies: 7,
      news: 45,
      reports: 3
    },

    {
      id: 3,
      year: 2026,
      month: 'March',
      users: 70,
      companies: 8,
      news: 60,
      reports: 5
    },

    {
      id: 4,
      year: 2026,
      month: 'April',
      users: 90,
      companies: 10,
      news: 75,
      reports: 4
    },

    {
      id: 5,
      year: 2026,
      month: 'May',
      users: 110,
      companies: 12,
      news: 90,
      reports: 6
    },

    {
      id: 6,
      year: 2026,
      month: 'June',
      users: 130,
      companies: 14,
      news: 105,
      reports: 7
    }

  ]);

  /*
    Filters state
  */

  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  /*
    Apply filtering logic
  */

  const filteredData = reportsData.filter((item) => {

    const matchYear =
      selectedYear === 'All'
        ? true
        : item.year === Number(selectedYear);

    const matchMonth =
      selectedMonth === 'All'
        ? true
        : item.month === selectedMonth;

    return matchYear && matchMonth;
  });

  return (

    <AdminLayout>

      {/* Page Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white mb-2">
          Reports Dashboard
        </h1>

      </div>

      {/* Stats Cards */}

      <ReportsStats data={reportsData} />

      {/* Charts Section */}

      <ReportsCharts data={reportsData} />

      {/* Filters */}

      <ReportsFilters
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      {/* Table */}

      <ReportsTable reports={filteredData} />

    </AdminLayout>

  );

};

export default Reports;