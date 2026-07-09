import React from 'react';
import { Search } from 'lucide-react';

const ReportedFilters = ({

  search,
  setSearch,

  selectedStatus,
  setSelectedStatus,

  selectedType,
  setSelectedType

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
          md:grid-cols-3
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
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search reports..."
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
            px-4
            rounded-xl
            bg-[#071A33]
            border border-white/10
            text-white
          "
        >

          <option value="All">
            Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Dismissed">
            Dismissed
          </option>

          <option value="Resolved">
            Resolved
          </option>

        </select>

        <select
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value)
          }
          className="
            h-11
            px-4
            rounded-xl
            bg-[#071A33]
            border border-white/10
            text-white
          "
        >

          <option value="All">
            Report Type
          </option>

          <option value="User">
            User
          </option>

          <option value="Company">
            Company
          </option>

        </select>

      </div>

    </div>

  );

};

export default ReportedFilters;