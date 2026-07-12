import React, { useState, useEffect } from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import CompanyStats from '../../components/companies/CompanyStats';
import CompanyFilters from '../../components/companies/CompanyFilters';
import CompanyTable from '../../components/companies/CompanyTable';

import api from '../../api/axios';
/*
  Companies Page
*/

const Companies = () => {

  /*
    بيانات الشركات

    حالياً Frontend فقط
  */

  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState({ total_companies: 0, blocked_companies: 0, total_balance: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  /*
    Search State
  */

  const [search, setSearch] = useState('');

  /*
    Selected Sector
  */

  const [selectedCategory, setSelectedCategory] = useState('All');

  // جلب الفئات مرة وحدة عند فتح الصفحة
  useEffect(() => {
    api.get('/admin/categories')
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  /*
    فلترة الشركات
  */

  // جلب الشركات، يتجدد مع الصفحة/البحث/الفئة
  const fetchCompanies = () => {
    setLoading(true);
    const categoryParam = selectedCategory === 'All' ? '' : `&category_id=${selectedCategory}`;

    api.get(`/admin/companies?page=${currentPage}&search=${search}${categoryParam}`)
      .then((res) => {
        const mappedCompanies = res.data.data.companies.data.map(company => ({
          id: company.id,
          name: company.name,
          sector: company.category,
          wallet: company.wallet_balance,
          blocked: company.status === "Blocked",
        }));
        setCompanies(mappedCompanies);
        setStats(res.data.data.stats);
        setLastPage(res.data.data.companies.meta.last_page);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, search, selectedCategory]);

  return (

    <AdminLayout>

      {/* عنوان الصفحة */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white mb-2">
          Companies Management
        </h1>

      </div>

      {/* الإحصائيات */}

      <CompanyStats stats={stats} />

      {/* الفلاتر */}

      <CompanyFilters
        search={search}
        setSearch={(value) => { setSearch(value); setCurrentPage(1); }}
        selectedSector={selectedCategory}
        setSelectedSector={(value) => { setSelectedCategory(value); setCurrentPage(1); }}
        categories={categories}
      />

      {loading ? (
        <p className="text-slate-300 text-center p-6">Loading...</p>
      ) : (
        <>
          {/* الجدول */}
          <CompanyTable
            companies={companies}
            setCompanies={setCompanies}
            onActionSuccess={fetchCompanies}
          />

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-[#112D4E] text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="text-slate-300 text-sm">
              Page {currentPage} of {lastPage}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, lastPage))}
              disabled={currentPage === lastPage}
              className="px-4 py-2 rounded-lg bg-[#112D4E] text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}

    </AdminLayout>
  );
};

export default Companies;