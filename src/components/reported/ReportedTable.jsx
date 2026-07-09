import React, { useState } from 'react';

import {
  EyeOff,
  Eye,
  Trash2,
  Ban,
  ShieldAlert
} from 'lucide-react';

import HideContentModal from './modals/HideContentModal';
import DeleteContentModal from './modals/DeleteContentModal';
import BlockUserModal from './modals/BlockUserModal';
import RestrictUserModal from './modals/RestrictUserModal';

/*
  جدول إدارة المحتوى المبلغ عنه
*/

const ReportedTable = ({
  reports,
  setReports
}) => {

  /*
    العنصر المحدد
  */

  const [selectedReport, setSelectedReport] =
    useState(null);

  /*
    المودالات
  */

  const [showHideModal, setShowHideModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [showBlockModal, setShowBlockModal] =
    useState(false);

  const [showRestrictModal, setShowRestrictModal] =
    useState(false);

  /*
    ألوان الحالات
  */

  const getStatusStyle = (status) => {

    switch (status) {

      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400';

      case 'Dismissed':
        return 'bg-blue-500/20 text-blue-400';

      case 'Resolved':
        return 'bg-green-500/20 text-green-400';

      default:
        return 'bg-slate-500/20 text-slate-400';

    }

  };

  /*
    إخفاء / إظهار المحتوى
  */

  const toggleHidden = (id) => {

    setReports((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isHidden: !item.isHidden
            }
          : item
      )
    );

  };

  /*
    حظر / فك الحظر
  */

  const toggleBlocked = (id) => {

    setReports((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isBlocked: !item.isBlocked
            }
          : item
      )
    );

  };

  /*
    تقييد / إزالة التقييد
  */

  const toggleRestricted = (id) => {

    setReports((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isRestricted:
                !item.isRestricted
            }
          : item
      )
    );

  };

  /*
    حذف المحتوى
  */

  const deleteContent = (id) => {

    setReports((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

  };

  return (

    <>

      <div
        className="
          bg-[#112D4E]
          rounded-3xl
          border border-white/10
          overflow-hidden
        "
      >

        <div className="p-5 border-b border-white/10">

          <h2 className="text-xl font-bold text-white">
            Reported Content
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-[#071A33] text-slate-300">

                <th className="px-4 py-4 text-left">
                  Content
                </th>

                <th className="px-4 py-4 text-left">
                  Reported By
                </th>

                <th className="px-4 py-4 text-left">
                  Type
                </th>

                <th className="px-4 py-4 text-left">
                  Reason
                </th>

                <th className="px-4 py-4 text-left">
                  Status
                </th>

                <th className="px-4 py-4 text-left">
                  Date
                </th>

                <th className="px-4 py-4 text-left">
                  Moderation
                </th>

                <th className="px-4 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {reports.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-t
                    border-white/5
                    hover:bg-white/5
                  "
                >

                  <td className="px-4 py-4 text-white">
                    {item.content}
                  </td>

                  <td className="px-4 py-4 text-slate-300">
                    {item.reportedBy}
                  </td>

                  <td className="px-4 py-4 text-orange-400">
                    {item.type}
                  </td>

                  <td className="px-4 py-4 text-slate-300">
                    {item.reason}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`
                        px-3 py-1 rounded-full
                        text-xs font-medium
                        ${getStatusStyle(item.status)}
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="px-4 py-4 text-slate-300">   
                    {item.date}
                  </td>

                  {/* حالة الإدارة */}

                  <td className="px-4 py-4">

                    <div className="flex flex-col gap-1">

                      {item.isHidden && (       

                        <span className="text-yellow-400 text-xs">
                          Hidden
                        </span>

                      )}

                      {item.isBlocked && (

                        <span className="text-red-400 text-xs">
                          Blocked
                        </span>

                      )}

                      {item.isRestricted && (

                        <span className="text-blue-400 text-xs">
                          Restricted
                        </span>

                      )}

                    </div>

                  </td>

                  <td className="px-4 py-4">

                    <div className="flex justify-center gap-2">

                      {/* Hide / Unhide */}

                      <button
                        onClick={() => {

                          if (item.isHidden) {

                            toggleHidden(item.id);

                          } else {

                            setSelectedReport(item);

                            setShowHideModal(true);

                          }

                        }}
                        className="
                          p-2 rounded-lg
                          bg-yellow-500/20
                          text-yellow-400
                        "
                      >

                        {item.isHidden
                          ? <Eye size={18} />
                          : <EyeOff size={18} />
                        }

                      </button>

                      {/* Delete */}

                      <button
                        onClick={() => {

                          setSelectedReport(item);

                          setShowDeleteModal(true);

                        }}
                        className="
                          p-2 rounded-lg
                          bg-red-500/20
                          text-red-400
                        "
                      >
                        <Trash2 size={18} />
                      </button>

                      {/* Block */}

                      <button
                        onClick={() => {

                          if (item.isBlocked) {

                            toggleBlocked(item.id);

                          } else {

                            setSelectedReport(item);

                            setShowBlockModal(true);

                          }

                        }}
                        className="
                          p-2 rounded-lg
                          bg-orange-500/20
                          text-orange-400
                        "
                      >
                        <Ban size={18} />
                      </button>

                      {/* Restrict */}

                      <button
                        onClick={() => {

                          if (
                            item.isRestricted
                          ) {

                            toggleRestricted(
                              item.id
                            );

                          } else {

                            setSelectedReport(item);

                            setShowRestrictModal(
                              true
                            );

                          }

                        }}
                        className="
                          p-2 rounded-lg
                          bg-blue-500/20
                          text-blue-400
                        "
                      >
                        <ShieldAlert size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {showHideModal && (

        <HideContentModal

          onClose={() =>
            setShowHideModal(false)
          }

          onConfirm={() => {

            toggleHidden(
              selectedReport.id
            );

            setShowHideModal(false);

          }}

        />

      )}

      {showDeleteModal && (

        <DeleteContentModal

          onClose={() =>
            setShowDeleteModal(false)
          }

          onConfirm={() => {

            deleteContent(
              selectedReport.id
            );

            setShowDeleteModal(false);
 
          }}

        />

      )}

      {showBlockModal && (

        <BlockUserModal

          onClose={() =>
            setShowBlockModal(false)
          }

          onConfirm={() => {

            toggleBlocked(
              selectedReport.id
            );

            setShowBlockModal(false);

          }}

        />

      )}

      {showRestrictModal && (

        <RestrictUserModal

          onClose={() =>
            setShowRestrictModal(false)
          }

          onConfirm={() => {

            toggleRestricted(
              selectedReport.id
            );

            setShowRestrictModal(false);

          }}

        />

      )}

    </>

  );

};

export default ReportedTable;