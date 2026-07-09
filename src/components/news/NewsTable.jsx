import React, { useState } from 'react';

import {
  Archive,
  RotateCcw,
  Trash2
} from 'lucide-react';

/*
  جدول الأخبار

  يحتوي على:
  - عرض الأخبار
  - أرشفة
  - إلغاء أرشفة
  - حذف
*/

const NewsTable = ({ news, setNews }) => {

  // الخبر المحدد
  const [selectedNews, setSelectedNews] =
    useState(null);

  // نافذة الأرشفة
  const [showArchiveModal, setShowArchiveModal] =
    useState(false);

  // نافذة الحذف
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  /*
    أرشفة أو إلغاء أرشفة
  */

  const handleArchiveToggle = () => {

    setNews((prevNews) =>

      prevNews.map((item) =>

        item.id === selectedNews.id

          ? {

              ...item,

              status:

                item.status === 'Archived'

                  ? 'Published'

                  : 'Archived'

            }

          : item

      )

    );

    setShowArchiveModal(false);

    setSelectedNews(null);
  };

  /*
    حذف الخبر
  */

  const handleDelete = () => {

    setNews((prevNews) =>

      prevNews.filter(

        item =>
          item.id !== selectedNews.id

      )

    );

    setShowDeleteModal(false);

    setSelectedNews(null);
  };

  /*
    ألوان الحالات
  */

  const getStatusStyle = (status) => {

    switch (status) {

      case 'Published':
        return 'bg-green-500/20 text-green-400';

      case 'Featured':
        return 'bg-yellow-500/20 text-yellow-400';

      case 'Reported':
        return 'bg-red-500/20 text-red-400';

      case 'Expired':
        return 'bg-slate-500/20 text-slate-300';

      case 'Archived':
        return 'bg-blue-500/20 text-blue-400';

      default:
        return 'bg-slate-500/20 text-slate-300';
    }
  };

  return (

    <>

      {/* صندوق الجدول */}

      <div
        className="
          bg-[#112D4E]
          rounded-3xl
          overflow-hidden
          border border-white/10
          shadow-xl
        "
      >

        {/* عنوان القسم */}

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
            News List
          </h2>

        </div>

        {/* الجدول */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr
                className="
                  bg-[#071A33]
                  text-slate-300
                "
              >

                <th className="px-4 py-4 text-left">
                  Title
                </th>

                <th className="px-4 py-4 text-left">
                  Company
                </th>

                <th className="px-4 py-4 text-left">
                  Sector
                </th>

                <th className="px-4 py-4 text-left">
                  Status
                </th>

                <th className="px-4 py-4 text-left">
                  Views
                </th>

                <th className="px-4 py-4 text-left">
                  Publish Date
                </th>

                <th className="px-4 py-4 text-left">
                  Expire Date
                </th>

                <th className="px-4 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {news.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-t
                    border-white/5

                    hover:bg-white/5

                    transition
                  "
                >

                  <td className="px-4 py-4 text-white">
                    {item.title}
                  </td>

                  <td className="px-4 py-4 text-slate-300">
                    {item.company}
                  </td>

                  <td className="px-4 py-4 text-slate-300">
                    {item.sector}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        ${getStatusStyle(item.status)}
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="px-4 py-4 text-slate-300">
                    {item.views}
                  </td>

                  <td className="px-4 py-4 text-slate-300">
                    {item.publishDate}
                  </td>

                  <td className="px-4 py-4 text-slate-300">
                    {item.expireDate}
                  </td>

                  <td className="px-4 py-4">

                    <div
                      className="
                        flex
                        justify-center
                        gap-2
                      "
                    >

                      {/* أرشفة */}

                      <button

                        onClick={() => {

                          setSelectedNews(item);

                          setShowArchiveModal(true);

                        }}

                        className="
                          p-2
                          rounded-lg

                          bg-blue-500/20
                          text-blue-400

                          hover:bg-blue-500/30

                          transition
                        "
                      >

                        {item.status === 'Archived'

                          ? <RotateCcw size={18} />

                          : <Archive size={18} />

                        }

                      </button>

                      {/* حذف */}

                      <button

                        onClick={() => {

                          setSelectedNews(item);

                          setShowDeleteModal(true);

                        }}

                        className="
                          p-2
                          rounded-lg

                          bg-red-500/20
                          text-red-400

                          hover:bg-red-500/30

                          transition
                        "
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* نافذة الأرشفة */}

      {showArchiveModal && (

        <div
          className="
            fixed
            inset-0

            bg-black/70

            flex
            items-center
            justify-center

            z-50
          "
        >

          <div
            className="
              bg-[#112D4E]

              w-[420px]

              rounded-3xl

              p-6

              border border-white/10
            "
          >

            <h3
              className="
                text-2xl
                font-bold
                text-white
                mb-3
              "
            >
              {selectedNews?.status === 'Archived'
                ? 'Unarchive News'
                : 'Archive News'}
            </h3>

            <p
              className="
                text-slate-400
                mb-6
              "
            >
              Confirm this action.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowArchiveModal(false)
                }
                className="
                  px-4
                  py-2

                  rounded-xl

                  bg-slate-600
                  text-white
                "
              >
                Cancel
              </button>

              <button
                onClick={handleArchiveToggle}
                className="
                  px-4
                  py-2

                  rounded-xl

                  bg-blue-600
                  text-white
                "
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

      {/* نافذة الحذف */}

      {showDeleteModal && (

        <div
          className="
            fixed
            inset-0

            bg-black/70

            flex
            items-center
            justify-center

            z-50
          "
        >

          <div
            className="
              bg-[#112D4E]

              w-[420px]

              rounded-3xl

              p-6

              border border-red-500/30
            "
          >

            <h3
              className="
                text-2xl
                font-bold
                text-red-400
                mb-3
              "
            >
              Delete News
            </h3>

            <p
              className="
                text-slate-400
                mb-6
              "
            >
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="
                  px-4 py-2
                  rounded-xl

                  bg-slate-600
                  text-white
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="
                  px-4 py-2
                  rounded-xl

                  bg-red-600
                  text-white
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );

};

export default NewsTable;