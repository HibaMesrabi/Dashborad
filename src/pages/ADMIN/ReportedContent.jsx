import React, { useEffect, useState } from 'react';

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
  Axios لإرسال الطلبات إلى Laravel
*/
import api from '../../api/axios';

/*
  صفحة إدارة المحتوى المبلغ عنه
*/

const ReportedContent = () => {

  /*
    جميع البلاغات القادمة من Laravel
  */
  const [reports, setReports] = useState([]);

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
    جلب البلاغات من Laravel
  */
  const fetchReports = async () => {

    try {

      const response = await api.get('/reported');

      /*
        ReportResource::collection()
        ترجع البيانات داخل data
      */
      setReports(response.data.data);

    } catch (error) {

      console.error('Error Loading Reports :', error);

    }

  };

  /*
    عند فتح الصفحة
    يتم جلب جميع البلاغات
  */
  useEffect(() => {

    fetchReports();

  }, []);

  /*
    فلترة البيانات
  */
  const filteredReports = reports.filter((report) => {

    /*
      البحث
    */
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

    /*
      فلترة الحالة
    */
    const matchesStatus =

      selectedStatus === "All"

        ? true

        : report.status === selectedStatus;

    /*
      فلترة النوع
    */
    const matchesType =

      selectedType === "All"

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

  <h1 className="text-3xl font-bold text-white">

    Reported Content

  </h1>

</div>

      {/* الإحصائيات */}

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

        fetchReports={fetchReports}

      />

    </AdminLayout>

  );

};

export default ReportedContent;