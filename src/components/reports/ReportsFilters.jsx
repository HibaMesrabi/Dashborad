import React from 'react';

/*
  فلاتر التقارير

  تسمح للمشرف بـ:

  - اختيار السنة
  - اختيار الشهر
  - إعادة ضبط الفلاتر
*/

const ReportsFilters = ({

  selectedYear,
  setSelectedYear,

  selectedMonth,
  setSelectedMonth

}) => {

  /*
    قائمة السنوات

    يمكن تعديلها لاحقاً
    لتأتي من الـ API
  */

  const years = [

    'All',
    '2023',
    '2024',
    '2025',
    '2026'

  ];

  /*
    أسماء الأشهر
  */

  const months = [

    'All',

    'January',
    'February',
    'March',
    'April',
    'May',
    'June',

    'July',
    'August',
    'September',
    'October',
    'November',
    'December'

  ];

  /*
    إعادة تعيين الفلاتر
  */

  const resetFilters = () => {

    setSelectedYear('All');

    setSelectedMonth('All');

  };

  return (

    <div
      className="
        bg-[#112D4E]
        rounded-3xl
        border border-white/10
        p-6
        shadow-xl
        mb-8
      "
    >

      {/* عنوان القسم */}

      <h2
        className="
          text-xl
          font-bold
          text-white
          mb-6
        "
      >
        Reports Filters
      </h2>

      {/* الحقول */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        "
      >

        {/* اختيار السنة */}

        <select

          value={selectedYear}

          onChange={(e) =>
            setSelectedYear(e.target.value)
          }

          className="
            h-12
            px-4
            rounded-xl
            bg-[#071A33]
            border border-white/10
            text-white
            outline-none
            focus:border-orange-500
          "
        >

          {years.map((year) => (

            <option
              key={year}
              value={year}
            >
              {year === 'All'
                ? 'All Years'
                : year}
            </option>

          ))}

        </select>

        {/* اختيار الشهر */}

        <select

          value={selectedMonth}

          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }

          className="
            h-12
            px-4
            rounded-xl
            bg-[#071A33]
            border border-white/10
            text-white
            outline-none
            focus:border-orange-500
          "
        >

          {months.map((month) => (

            <option
              key={month}
              value={month}
            >
              {month === 'All'
                ? 'All Months'
                : month}
            </option>

          ))}

        </select>

        {/* زر إعادة الضبط */}

        <button

          onClick={resetFilters}

          className="
            h-12
            rounded-xl
            bg-orange-500
            text-white
            font-semibold
            hover:bg-orange-600
            transition
          "
        >
          Reset Filters
        </button>

      </div>

    </div>

  );

};

export default ReportsFilters;