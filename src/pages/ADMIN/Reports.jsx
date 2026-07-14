import React, { useState, useEffect } from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import ReportsStats from '../../components/reports/ReportsStats';
import ReportsCharts from '../../components/reports/ReportsCharts';
import ReportsFilters from '../../components/reports/ReportsFilters';
import ReportsTable from '../../components/reports/ReportsTable';

import api from '../../api/axios';

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

  const [counters, setCounters] = useState({
    total_users: 0,
    total_companies: 0,
    total_news: 0,
    total_reports: 0
  });

  const [chartsData, setChartsData] = useState([]);

  const [monthlyReports, setMonthlyReports] = useState([]);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*
    Filters state
  */

  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  /*
    Apply filtering logic
  */

  useEffect(() => {

    const fetchReportsData = async () => {

      try {

        setLoading(true);
        setError(null);

        const response = await api.get('/admin/reports-analytics', {
          params: {
            year: selectedYear === 'All' ? undefined : selectedYear,
            month: selectedMonth === 'All' ? undefined : selectedMonth,
            page: currentPage
          }
        });

        const result = response.data.data;

        setCounters(result.counters);

        const mergedCharts = result.charts.months_labels.map((month, index) => ({
          month,
          users: result.charts.users_growth[index],
          news: result.charts.news_growth[index]
        }));

        setChartsData(mergedCharts);

        setMonthlyReports(result.monthly_reports.records);
        setPagination(result.monthly_reports.pagination);

      } catch (err) {

        setError('حدث خطأ أثناء جلب بيانات التقارير');

      } finally {

        setLoading(false);

      }

    };

    fetchReportsData();

  }, [selectedYear, selectedMonth, currentPage]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  return (

    <AdminLayout>

      {/* Page Header */}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
          {error}
        </div>
      )}

      {/* Stats Cards */}

      <ReportsStats counters={counters} />

      {/* Charts Section */}

      <ReportsCharts data={chartsData} />

      {/* Filters */}

      <ReportsFilters
        selectedYear={selectedYear}
        setSelectedYear={handleYearChange}
        selectedMonth={selectedMonth}
        setSelectedMonth={handleMonthChange}
      />

      {/* Table */}

      <ReportsTable
        reports={monthlyReports}
        loading={loading}
        pagination={pagination}
        onPageChange={setCurrentPage}
      />

    </AdminLayout>

  );

};

export default Reports;