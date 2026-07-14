import React from 'react';

/*
  جدول التقارير

  يعرض الإحصائيات الشهرية:

  - السنة
  - الشهر
  - عدد المستخدمين
  - عدد الشركات
  - عدد الأخبار
  - عدد البلاغات
*/

const ReportsTable = ({ reports, loading, pagination, onPageChange }) => {
  return (

    <div
      className="
        bg-[#112D4E]
        rounded-3xl
        border border-white/10
        shadow-xl
        overflow-hidden
      "
    >

      {/* عنوان الجدول */}

      <div
        className="
          p-5
          border-b
          border-white/10
        "
      >

        <h2
          className="
            text-xl
            font-bold
            text-white
          "
        >
          Monthly Reports
        </h2>

      </div>

      {/* محتوى الجدول */}

      <div className="overflow-x-auto">

        <table className="w-full">

          {/* رأس الجدول */}

          <thead>

            <tr
              className="
                bg-[#071A33]
                text-slate-300
              "
            >

              <th className="px-6 py-4 text-left">
                Year
              </th>

              <th className="px-6 py-4 text-left">
                Month
              </th>

              <th className="px-6 py-4 text-center">
                Users
              </th>

              <th className="px-6 py-4 text-center">
                Companies
              </th>

              <th className="px-6 py-4 text-center">
                News
              </th>

              <th className="px-6 py-4 text-center">
                Reports
              </th>

            </tr>

          </thead>

          {/* بيانات الجدول */}

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="6"
                  className="
                    py-10
                    text-center
                    text-slate-400
                  "
                >
                  Loading...
                </td>

              </tr>

            ) : reports.length > 0 ? (

              reports.map((item, index) => (

                <tr

                  key={`${item.year}-${item.month}-${index}`}

                  className="
                    border-t
                    border-white/5
                    hover:bg-white/5
                    transition
                  "
                >

                  {/* السنة */}

                  <td className="px-6 py-5 text-white">
                    {item.year}
                  </td>

                  {/* الشهر */}

                  <td className="px-6 py-5 text-slate-300">
                    {item.month}
                  </td>

                  {/* المستخدمون */}

                  <td
                    className="
                      px-6 py-5
                      text-center
                      text-orange-400
                      font-semibold
                    "
                  >
                    {item.users}
                  </td>

                  {/* الشركات */}

                  <td
                    className="
                      px-6 py-5
                      text-center
                      text-cyan-400
                      font-semibold
                    "
                  >
                    {item.companies}
                  </td>

                  {/* الأخبار */}

                  <td
                    className="
                      px-6 py-5
                      text-center
                      text-green-400
                      font-semibold
                    "
                  >
                    {item.news}
                  </td>

                  {/* البلاغات */}

                  <td
                    className="
                      px-6 py-5
                      text-center
                      text-red-400
                      font-semibold
                    "
                  >
                    {item.reports}
                  </td>

                </tr>

              ))

            ) : (

              /*
                تظهر هذه الرسالة
                عندما لا توجد بيانات
              */

              <tr>

                <td
                  colSpan="6"
                  className="
                    py-10
                    text-center
                    text-slate-400
                  "
                >
                  No reports found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {pagination && pagination.last_page > 1 && (

        <div
          className="
            flex
            items-center
            justify-between
            px-6 py-4
            border-t
            border-white/10
          "
        >

          <button
            onClick={() => onPageChange(pagination.current_page - 1)}
            disabled={pagination.current_page <= 1}
            className="
              px-4 py-2
              rounded-xl
              bg-[#071A33]
              text-white
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            Previous
          </button>

          <span className="text-slate-400 text-sm">
            Page {pagination.current_page} of {pagination.last_page}
          </span>

          <button
            onClick={() => onPageChange(pagination.current_page + 1)}
            disabled={pagination.current_page >= pagination.last_page}
            className="
              px-4 py-2
              rounded-xl
              bg-[#071A33]
              text-white
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            Next
          </button>

        </div>

      )}

    </div>

  );

};

export default ReportsTable;