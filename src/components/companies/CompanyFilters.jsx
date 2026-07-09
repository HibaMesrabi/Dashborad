import React from 'react';

import { Search } from 'lucide-react';

/*
  Company Filters
*/

const CompanyFilters = ({
  search,
  setSearch,
  selectedSector,
  setSelectedSector,
}) => {

  /*
    القطاعات
  */

  const sectors = [
    'All',
    'Technology',
    'AI',
    'Software',
  ];

  return (

    <div
      className="
        mb-8
        flex flex-col lg:flex-row
        gap-4
      "
    >

      {/* Search */}

      <div className="relative flex-1">

        {/* أيقونة البحث */}

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

        {/* Input */}

        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            h-12
            bg-[#112D4E]
            border border-[#1E3A5F]
            rounded-2xl
            pl-11
            pr-4
            text-white
            placeholder:text-slate-400
            outline-none
            focus:border-orange-400
            focus:ring-2
            focus:ring-orange-400/20
            transition-all
            shadow-lg
          "
        />

      </div>

      {/* Filter */}

      <div className="lg:w-60">

        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="
            w-full
            h-12
            bg-[#112D4E]
            border border-[#1E3A5F]
            rounded-2xl
            px-4
            text-white
            outline-none
            focus:border-orange-400
            focus:ring-2
            focus:ring-orange-400/20
            transition-all
            shadow-lg
          "
        >

          {sectors.map((sector, index) => (

            <option
              key={index}
              value={sector}
              className="bg-[#112D4E]"
            >
              {sector === 'All'
                ? 'Sectors'
                : sector}
            </option>

          ))}

        </select>

      </div>

    </div>
  );
};

export default CompanyFilters;