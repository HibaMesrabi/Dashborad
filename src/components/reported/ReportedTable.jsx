import React, { useState } from 'react';
import api from '../../api/axios';

import {

  CheckCircle2,

  XCircle,

  Eye,

  X

} from 'lucide-react';

/*
  جدول المحتوى المبلغ عنه
*/

const ReportedTable = ({

  reports,

  fetchReports

}) => {

  /*
    حالة فتح وإغلاق نافذة الملاحظات
  */

  const [showModal, setShowModal] = useState(false);

  /*
    نوع العملية
    Resolve أو Dismiss أو View
  */

  const [actionType, setActionType] = useState("");

  /*
    البلاغ الحالي
  */

  const [selectedReport, setSelectedReport] = useState(null);

  /*
    الملاحظة التي سيكتبها الأدمن
  */

  const [adminNote, setAdminNote] = useState("");

  /*
    فتح نافذة كتابة الملاحظة
  */

  const openModal = (report, action) => {

    setSelectedReport(report);

    setActionType(action);

    setAdminNote(report.admin_notes || "");

    setShowModal(true);

  };

  /*
    إغلاق النافذة
  */

  const closeModal = () => {

    setShowModal(false);

    setSelectedReport(null);

    setAdminNote("");

    setActionType("");

  };

  /*
    حفظ الملاحظة وتغيير الحالة
  */
  /*
    إرسال القرار إلى Laravel
  */
  const saveAction = async () => {

    try {

      if (actionType === "resolved") {

        await api.patch(

          `/admin/reported/${selectedReport.id}/resolve`,

          {

            admin_notes: adminNote

          }

        );

      }

      else {

        await api.patch(

          `/admin/reported/${selectedReport.id}/dismiss`,

          {

            admin_notes: adminNote

          }

        );

      }

      /*
        تحديث البيانات من قاعدة البيانات
      */

      await fetchReports();

      closeModal();

    }

    catch (error) {

      console.error(error);

    }

  };

  return (

    <>

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

        {/* تغليف الجدول للشاشات الصغيرة */}

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

                <th className="px-5 py-6 text-left">

                  ID

                </th>

                <th className="px-5 py-6 text-left">

                  Reporter

                </th>

                <th className="px-5 py-6 text-left">

                  Reported Item

                </th>

                <th className="px-5 py-6 text-left">

                  Type

                </th>

                <th className="px-5 py-6 text-left">

                  Reason

                </th>

                <th className="px-5 py-6 text-left">

                  Status

                </th>

                <th className="px-5 py-6 text-left">

                  Created At

                </th>

                <th className="px-5 py-6 text-center">

                  Actions

                </th>

              </tr>

            </thead>

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

                    {/* العنصر المبلغ عنه */}

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

                        ${report.status === "pending"

                            ? "bg-yellow-500/20 text-yellow-400"

                            : ""

                          }

                        ${report.status === "resolved"

                            ? "bg-green-500/20 text-green-400"

                            : ""

                          }

                        ${report.status === "dismissed"

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

                      {report.created_at ? new Date(report.created_at).toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit' }) : "-"}
                    </td>

                    {/* الإجراءات */}

                    <td className="px-5 py-5">

                      {

                        report.status === "pending"

                          ?

                          (

                            <div className="flex justify-center gap-3">

                              {/* قبول البلاغ */}

                              <button

                                onClick={() =>

                                  openModal(

                                    report,

                                    "resolved"

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
                              transition
                            "

                                title="Resolve"

                              >

                                <CheckCircle2 size={18} />

                              </button>

                              {/* رفض البلاغ */}

                              <button

                                onClick={() =>

                                  openModal(

                                    report,

                                    "dismissed"

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
                              transition
                            "

                                title="Dismiss"

                              >

                                <XCircle size={18} />

                              </button>

                            </div>

                          )

                          :

                          (

                            <div className="flex justify-center">

                              {/* عرض الملاحظة */}

                              <button

                                onClick={() =>

                                  openModal(

                                    report,

                                    "view"

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
                              text-blue-300
                              hover:bg-[#2D67BC]
                              transition
                            "

                                title="View Note"

                              >

                                <Eye size={18} />

                              </button>

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
      {/* نافذة الملاحظات */}

      {

        showModal && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="w-full max-w-lg rounded-3xl bg-[#17365D] border border-[#21446D] shadow-2xl">

              {/* رأس النافذة */}

              <div className="flex items-center justify-between px-6 py-5 border-b border-[#21446D]">

                <h2 className="text-xl font-bold text-white">

                  {

                    actionType === "resolved"

                      ? "Resolve Report"

                      : actionType === "dismissed"

                        ? "Dismiss Report"

                        : "Admin Note"

                  }

                </h2>

                {/* زر الإغلاق */}

                <button

                  onClick={closeModal}

                  className="text-slate-300 hover:text-white"

                >

                  <X size={20} />

                </button>

              </div>

              {/* محتوى النافذة */}

              <div className="p-6">

                <label className="block text-slate-300 mb-3">

                  Admin Note

                </label>

                <textarea

                  rows={6}

                  value={adminNote}

                  onChange={(e) => setAdminNote(e.target.value)}

                  readOnly={actionType === "view"}

                  placeholder="Write your note here..."

                  className="
                    w-full
                    bg-[#0B1F3A]
                    border
                    border-[#21446D]
                    rounded-2xl
                    px-4
                    py-3
                    text-white
                    resize-none
                    outline-none
                    focus:border-orange-400
                  "

                />

              </div>

              {/* أزرار النافذة */}

              <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#21446D]">

                {/* زر إغلاق */}

                <button

                  onClick={closeModal}

                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-slate-600
                    hover:bg-slate-500
                    text-white
                    transition
                  "

                >

                  Close

                </button>

                {/* زر الحفظ يظهر فقط عند قبول أو رفض البلاغ */}

                {

                  actionType !== "view" && (

                    <button

                      onClick={saveAction}

                      className="
                        px-6
                        py-2.5
                        rounded-xl
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        font-semibold
                        transition
                      "

                    >

                      Save

                    </button>

                  )

                }

              </div>

            </div>

          </div>

        )

      }

    </>

  );

};

export default ReportedTable;

