import React, { useState } from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import CompanyStats from '../../components/companies/CompanyStats';
import CompanyFilters from '../../components/companies/CompanyFilters';
import CompanyTable from '../../components/companies/CompanyTable';

/*
  Companies Page
*/

const Companies = () => {

  /*
    بيانات الشركات

    حالياً Frontend فقط
  */

  const [companies, setCompanies] = useState([

    {
      id: 1,
      name: 'Neural Code',
      sector: 'AI',
      wallet: 4200,
      blocked: false,
    },

    {
      id: 2,
      name: 'VisionX',
      sector: 'Software',
      wallet: 3100,
      blocked: false,
    },

    {
      id: 3,
      name: 'DeepMind Syria',
      sector: 'AI',
      wallet: 5200,
      blocked: true,
    },

    {
      id: 4,
      name: 'CodeCraft',
      sector: 'Technology',
      wallet: 1800,
      blocked: false,
    },

    {
      id: 5,
      name: 'Smart Stack',
      sector: 'Software',
      wallet: 2600,
      blocked: false,
    },

    {
      id: 6,
      name: 'Future AI',
      sector: 'AI',
      wallet: 4700,
      blocked: false,
    },

    {
      id: 7,
      name: 'Quantum Tech',
      sector: 'Technology',
      wallet: 6200,
      blocked: true,
    },

    {
      id: 8,
      name: 'Nexa Systems',
      sector: 'Software',
      wallet: 2900,
      blocked: false,
    },

  ]);

  /*
    Search State
  */

  const [search, setSearch] = useState('');

  /*
    Selected Sector
  */

  const [selectedSector, setSelectedSector] = useState('All');

  /*
    فلترة الشركات
  */

  const filteredCompanies = companies.filter((company) => {

    const matchesSearch =
      company.name.toLowerCase().includes(search.toLowerCase());

    const matchesSector =
      selectedSector === 'All'
        ? true
        : company.sector === selectedSector;

    return matchesSearch && matchesSector;

  });

  return (

    <AdminLayout>

      {/* عنوان الصفحة */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white mb-2">
          Companies Management
        </h1>

       

      </div>

      {/* الإحصائيات */}

      <CompanyStats companies={companies} />

      {/* الفلاتر */}

      <CompanyFilters
        search={search}
        setSearch={setSearch}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
      />

      {/* الجدول */}

      <CompanyTable
        companies={filteredCompanies}
        setCompanies={setCompanies}
      />

    </AdminLayout>
  );
};

export default Companies;