import React, { useState } from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import NewsStats from '../../components/news/NewsStats';
import NewsFilters from '../../components/news/NewsFilters';
import NewsTable from '../../components/news/NewsTable';

/*
  الصفحة الرئيسية لإدارة الأخبار
*/

const News = () => {

  /*
    بيانات تجريبية مؤقتة
  */

  const [news, setNews] = useState([

    {
      id: 1,
      title: 'AI Conference 2026',
      company: 'Syrian AI Solutions',
      sector: 'AI',
      status: 'Published',
      views: 1250,
      publishDate: '2026-06-01',
      expireDate: '2026-06-30',
    },

    {
      id: 2,
      title: 'Machine Learning Workshop',
      company: 'Future Tech Labs',
      sector: 'Technology',
      status: 'Featured',
      views: 980,
      publishDate: '2026-05-25',
      expireDate: '2026-06-20',
    },

    {
      id: 3,
      title: 'Programming Bootcamp',
      company: 'Code Vision',
      sector: 'Programming',
      status: 'Reported',
      views: 500,
      publishDate: '2026-04-15',
      expireDate: '2026-05-15',
    },

    {
      id: 4,
      title: 'Cyber Security Summit',
      company: 'Digital Shield',
      sector: 'Cyber Security',
      status: 'Published',
      views: 2200,
      publishDate: '2026-06-18',
      expireDate: '2026-07-01',
    },

    {
      id: 5,
      title: 'Deep Learning Meetup',
      company: 'Neural Systems',
      sector: 'AI',
      status: 'Expired',
      views: 1800,
      publishDate: '2026-03-01',
      expireDate: '2026-03-20',
    },

  ]);

  /*
    البحث
  */

  const [search, setSearch] = useState('');

  /*
    الفلاتر
  */

  const [selectedStatus, setSelectedStatus] =
    useState('All');

  const [selectedSector, setSelectedSector] =
    useState('All');

  const [selectedDate, setSelectedDate] =
    useState('All');

  /*
    فلترة الأخبار
  */

  const filteredNews = news.filter((item) => {

    const matchesSearch =

      item.title.toLowerCase().includes(search.toLowerCase())

      ||

      item.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =

      selectedStatus === 'All'
        ? true
        : item.status === selectedStatus;

    const matchesSector =

      selectedSector === 'All'
        ? true
        : item.sector === selectedSector;

    let matchesDate = true;

    const today = new Date();

    const publishDate =
      new Date(item.publishDate);

    const differenceInDays =
      (today - publishDate) /
      (1000 * 60 * 60 * 24);

    if (selectedDate === '7') {

      matchesDate =
        differenceInDays <= 7;

    }

    if (selectedDate === '30') {

      matchesDate =
        differenceInDays <= 30;

    }

    if (selectedDate === '90') {

      matchesDate =
        differenceInDays <= 90;

    }

    return (

      matchesSearch

      &&

      matchesStatus

      &&

      matchesSector

      &&

      matchesDate

    );

  });

  return (

    <AdminLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white mb-2">
          News Management
        </h1>

      </div>

      <NewsStats news={news} />

      <NewsFilters

        search={search}
        setSearch={setSearch}

        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}

        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}

        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}

      />

      <NewsTable

        news={filteredNews}
        setNews={setNews}

      />

    </AdminLayout>

  );

};

export default News;