import React from 'react';

/*
  هذا الكومبوننت مسؤول عن:

  - البحث
  - فلترة الحالة
  - فلترة النوع
*/

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
        bg-gradient-to-br
        from-[#1A2A44]
        to-[#0F1C2E]
        border
        border-[#223A5E]
        rounded-2xl
        p-6
        mb-6
        shadow-lg
      "
    >

      {/* عنوان القسم */}

      <h2 className="text-white text-lg font-semibold mb-4">

        Filters

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* البحث */}

        <input

          type="text"

          placeholder="Search by reporter . . "

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="
            w-full
            bg-[#0B1624]
            border
            border-[#223A5E]
            rounded-xl
            px-4
            py-2
            text-white
            placeholder:text-slate-500
            focus:outline-none
            focus:border-purple-500
          "

        />

        {/* فلترة الحالة */}

        <select

          value={selectedStatus}

          onChange={(e) =>
            setSelectedStatus(e.target.value)
          }

          className="
            w-full
            bg-[#0B1624]
            border
            border-[#223A5E]
            rounded-xl
            px-4
            py-2
            text-white
            focus:outline-none
            focus:border-purple-500
          "

        >

          <option value="All">

            All Status

          </option>

          <option value="pending">

            Pending

          </option>

          <option value="resolved">

            Resolved

          </option>

          <option value="dismissed">

            Dismissed

          </option>

        </select>
                {/* فلترة النوع */}

        <select

          value={selectedType}

          onChange={(e) =>
            setSelectedType(e.target.value)
          }

          className="
            w-full
            bg-[#0B1624]
            border
            border-[#223A5E]
            rounded-xl
            px-4
            py-2
            text-white
            focus:outline-none
            focus:border-purple-500
          "

        >

          <option value="All">

            All Types

          </option>

          <option value="post">

            Posts

          </option>

          <option value="account">

            Accounts

          </option>

        </select>

      </div>

    </div>

  );

};

export default ReportedFilters;