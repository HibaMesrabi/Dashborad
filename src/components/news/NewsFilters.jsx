import React from 'react';
import { Search } from 'lucide-react';

/*
  البحث والفلاتر
*/

const NewsFilters = ({

  search,
  setSearch,

  selectedStatus,
  setSelectedStatus,

  selectedSector,
  setSelectedSector,

  selectedDate,
  setSelectedDate,

  categories,

}) => {

  return (

    <div
      className="
        bg-[#112D4E]
        rounded-3xl
        border border-white/10
        p-6
        mb-8
        shadow-xl
      "
    >

      <h2
        className="
          text-xl
          font-bold
          text-white
          mb-5
        "
      >
        Search & Filters
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news..."
            className="
              w-full
              h-11
              pl-11
              rounded-xl
              bg-[#071A33]
              border border-white/10
              text-white
            "
          />

        </div>

        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value)
          }
          className="
            h-11
            rounded-xl
            px-4
            bg-[#071A33]
            border border-white/10
            text-white
          "
        >
          <option value="All">Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="under_review">Under Review</option>
          <option value="archived">Archived</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={selectedSector}
          onChange={(e) =>
            setSelectedSector(e.target.value)
          }
          className="
            h-11
            rounded-xl
            px-4
            bg-[#071A33]
            border border-white/10
            text-white
          "
        >
          <option value="All">Sector</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="
            h-11
            rounded-xl
            px-4
            bg-[#071A33]
            border border-white/10
            text-white
          "
        >
          <option value="All">Date</option>
          <option value="last_7">Last 7 Days</option>
          <option value="last_30">Last 30 Days</option>
          <option value="last_90">Last 90 Days</option>
        </select>

      </div>

    </div>

  );

};

export default NewsFilters;