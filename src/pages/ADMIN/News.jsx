import React, { useState, useEffect } from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import NewsStats from '../../components/news/NewsStats';
import NewsFilters from '../../components/news/NewsFilters';
import NewsTable from '../../components/news/NewsTable';
import api from '../../api/axios';
/*
  الصفحة الرئيسية لإدارة الأخبار
*/

const News = () => {

  /*
    بيانات تجريبية مؤقتة
  */

  const [news, setNews] = useState([]);
  const [cards, setCards] = useState({ total_news: 0, published: 0, under_review: 0, archived: 0, rejected: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  /*
    البحث
  */

  const [search, setSearch] = useState('');

  /*
    الفلاتر
  */

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');
  /*
    جلب الفئات
  */
  useEffect(() => {
    api.get('/admin/categories?type=post')
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  /*
    فلترة الأخبار
  */

  const fetchNews = () => {
    setLoading(true);

    const params = new URLSearchParams();
    params.append('page', currentPage);
    if (search) params.append('search', search);
    if (selectedStatus !== 'All') params.append('status', selectedStatus);
    if (selectedCategory !== 'All') params.append('category_id', selectedCategory);
    if (selectedDate !== 'All') params.append('date_filter', selectedDate);

    api.get(`/admin/posts?${params.toString()}`)
      .then((res) => {
        const mappedNews = res.data.news.data.map(post => ({
          id: post.id,
          title: post.title,
          company: post.account.name,
          sector: post.category.name,
          status: post.status,
          views: post.views_count,
          publishDate: post.created_at.split('T')[0],
          expireDate: post.end_date ? post.end_date.split('T')[0] : '-',
        }));
        setNews(mappedNews);
        setCards(res.data.cards);
        setLastPage(res.data.news.last_page);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews();
  }, [currentPage, search, selectedStatus, selectedCategory, selectedDate]);

  return (
    <AdminLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          News Management
        </h1>
      </div>

      <NewsStats cards={cards} />

      <NewsFilters
        search={search}
        setSearch={(value) => { setSearch(value); setCurrentPage(1); }}
        selectedStatus={selectedStatus}
        setSelectedStatus={(value) => { setSelectedStatus(value); setCurrentPage(1); }}
        selectedSector={selectedCategory}
        setSelectedSector={(value) => { setSelectedCategory(value); setCurrentPage(1); }}
        selectedDate={selectedDate}
        setSelectedDate={(value) => { setSelectedDate(value); setCurrentPage(1); }}
        categories={categories}
      />

      {loading ? (
        <p className="text-slate-300 text-center p-6">Loading...</p>
      ) : (
        <>
          <NewsTable
            news={news}
            setNews={setNews}
            onActionSuccess={fetchNews}
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

export default News;