import React from 'react';

import {

  CheckCircle2,

  XCircle

} from 'lucide-react';

/*
  جدول المحتوى المبلغ عنه
*/

const ReportedTable = ({

  reports,

  setReports

}) => {

  /*
    تغيير حالة البلاغ
  */

  const updateStatus = (id, newStatus) => {

    const updated = reports.map((report) =>

      report.id === id

        ? {

            ...report,

            status: newStatus

          }

        : report

    );

    setReports(updated);

  };

  const confirmStatusChange = (id, newStatus, message) => {

    if (window.confirm(message)) {

      updateStatus(id, newStatus);

    }

  };

  return (

    <div

      className="
        bg-[#17365D]
        rounded-3xl
        overflow-hidden
        shadow-2xl
        border
        border-[#21446D]
      "

    >

      {/* تغليف الجدول ليدعم الشاشات الصغيرة */}

      <div className="overflow-x-auto">

        <table className="w-full">

          {/* رأس الجدول */}

          <thead>

            <tr

              className="
                bg-[#0B1F3A]
                text-white
                text-[16px]
                font-semibold
              "

            >

              {/* رقم البلاغ */}

              <th className="px-5 py-6 text-left">

                ID

              </th>

              {/* الشخص الذي قام بالإبلاغ */}

              <th className="px-5 py-6 text-left">

                Reporter

              </th>

              {/* العنصر المبلغ عنه */}

              <th className="px-5 py-6 text-left">

                Reported Item

              </th>

              {/* نوع العنصر */}

              <th className="px-5 py-6 text-left">

                Type

              </th>

              {/* سبب البلاغ */}

              <th className="px-5 py-6 text-left">

                Reason

              </th>

              {/* حالة البلاغ */}

              <th className="px-5 py-6 text-left">

                Status

              </th>

              {/* تاريخ البلاغ */}

              <th className="px-5 py-6 text-left">

                Created At

              </th>

              {/* الإجراءات */}

              <th className="px-5 py-6 text-center">

                Actions

              </th>

            </tr>

          </thead>

          {/* جسم الجدول */}

          <tbody>

            {

              reports.map((report) => (

                <tr

                  key={report.id}

                  className="
                    border-b
                    border-[#21446D]
                    hover:bg-[#21446D]
                    transition-all
                    duration-200
                  "

                >

                  {/* رقم البلاغ */}

                  <td className="px-5 py-5 text-white text-[16px]">

                    {report.id}

                  </td>

                  {/* الشخص الذي أرسل البلاغ */}

                  <td className="px-5 py-5 text-white text-[16px]">

                    {report.reporter_name}

                  </td>

                  {/* المنشور أو الحساب المبلغ عنه */}

                  <td className="px-5 py-5 text-white text-[16px]">

                    {report.reported_item}

                  </td>

                  {/* نوع العنصر */}

                  <td className="px-5 py-5 text-white text-[16px] capitalize">

                    {report.reportable_type}

                  </td>

                  {/* سبب البلاغ */}

                  <td className="px-5 py-5 text-white text-[16px]">

                    {report.reason}

                  </td>

                  {/* حالة البلاغ */}

                  <td className="px-5 py-5">

                    <span

                      className={`
                        px-4
                        py-1.5
                        rounded-full
                        text-sm
                        font-semibold

                        ${
                          report.status === "pending"

                            ? "bg-yellow-500/20 text-yellow-400"

                            : ""
                        }

                        ${
                          report.status === "resolved"

                            ? "bg-green-500/20 text-green-400"

                            : ""
                        }

                        ${
                          report.status === "dismissed"

                            ? "bg-red-500/20 text-red-400"

                            : ""
                        }

                      `}

                    >

                      {report.status}

                    </span>

                  </td>

                  {/* تاريخ البلاغ */}

                  <td className="px-5 py-5 text-white text-[16px]">

                    {report.created_at || "-"}

                  </td>
                                    {/* الإجراءات */}

                  <td className="px-5 py-5">

                    {

                      report.status === "pending"

                      ? (

                        <div className="flex justify-center gap-3">

                          {/* زر قبول البلاغ */}

                          <button

                            onClick={() =>
                              confirmStatusChange(
                                report.id,
                                "resolved",
                                "Are you sure you want to accept this report?"
                              )
                            }

                            className="
                              w-10
                              h-10
                              rounded-xl
                              bg-[#23539A]
                              flex
                              items-center
                              justify-center
                              text-green-400
                              hover:bg-[#2D67BC]
                              transition-all
                              duration-200
                            "

                            title="Resolve"

                          >

                            <CheckCircle2 size={18} />

                          </button>

                          {/* زر رفض البلاغ */}

                          <button

                            onClick={() =>
                              confirmStatusChange(
                                report.id,
                                "dismissed",
                                "Are you sure you want to reject this report?"
                              )
                            }

                            className="
                              w-10
                              h-10
                              rounded-xl
                              bg-[#5A3D58]
                              flex
                              items-center
                              justify-center
                              text-red-400
                              hover:bg-[#704A6D]
                              transition-all
                              duration-200
                            "

                            title="Dismiss"

                          >

                            <XCircle size={18} />

                          </button>

                        </div>

                      )

                      : (

                        <div className="flex justify-center">

                          <span className="text-slate-500 text-lg">

                            —

                          </span>

                        </div>

                      )

                    }

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ReportedTable;