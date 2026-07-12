import React, { useState } from 'react';
import api from '../../api/axios';

import {
  ShieldBan,
  ShieldCheck,
  Wallet,
  Building2,
} from 'lucide-react';

/*
  Company Table

  مسؤوليتها:
  - عرض الشركات
  - تنفيذ Block / Unblock
  - عرض معلومات الشركة
*/

const CompanyTable = ({
  companies,
  setCompanies,
  onActionSuccess,
}) => {

  /*
    تخزين الشركة المحددة
    لفتح نافذة الـ Block
  */

  const [selectedCompany, setSelectedCompany] = useState(null);

  /*
    تخزين سبب الحظر
  */

  const [blockReason, setBlockReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  /*
    أسباب جاهزة للحظر
  */

  const blockReasons = [
    'Spam Content',
    'Fake News',
    'Policy Violation',
    'Abusive Behavior',
    'Copyright Issues',
    'Other',
  ];

  // تنفيذ الحظر عبر الباك اند
  const blockCompany = () => {
    const finalReason = blockReason === 'Other' ? customReason : blockReason;

    api.post(`/admin/companies/${selectedCompany.id}/ban`, { ban_reason: finalReason }).then(() => {
      onActionSuccess();
      setSelectedCompany(null);
      setBlockReason('');
      setCustomReason('');
    })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || 'An error occurred');
      });
  };

  // تنفيذ فك الحظر عبر الباك اند
  const unblockCompany = (companyId) => {
    if (!confirm("Are you shure unban this company ?")) return;

    api.post(`/admin/companies/${companyId}/unban`)
      .then(() => {
        onActionSuccess();
      })
  };

  return (

    <>

      {/* جدول الشركات */}

      <div
        className="
          overflow-x-auto
          rounded-3xl
          border border-[#1E3A5F]
          bg-[#112D4E]
          shadow-2xl
        "
      >

        <table className="w-full text-left text-white">

          {/* رأس الجدول */}

          <thead
            className="
              bg-[#0A192F]
              border-b border-[#1E3A5F]
            "
          >

            <tr>

              <th className="px-6 py-5 text-sm font-semibold text-slate-300">
                Company
              </th>

              <th className="px-6 py-5 text-sm font-semibold text-slate-300">
                Sector
              </th>

              <th className="px-6 py-5 text-sm font-semibold text-slate-300">
                Wallet
              </th>

              <th className="px-6 py-5 text-sm font-semibold text-slate-300">
                Status
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-slate-300">
                Actions
              </th>

            </tr>

          </thead>

          {/* محتوى الجدول */}

          <tbody>

            {companies.map((company) => (

              <tr
                key={company.id}
                className="
                  border-b border-[#1E3A5F]
                  hover:bg-[#1A3C63]
                  transition-all duration-300
                "
              >

                {/* اسم الشركة */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    {/* أيقونة الشركة */}

                    <div
                      className="
                        w-11 h-11
                        rounded-2xl
                        bg-orange-500/10
                        flex items-center justify-center
                        text-orange-400
                      "
                    >
                      <Building2 size={20} />
                    </div>

                    {/* بيانات الشركة */}

                    <div>

                      <h3 className="font-semibold text-white">
                        {company.name}
                      </h3>

                      <p className="text-sm text-slate-400">
                        Company ID #{company.id}
                      </p>

                    </div>

                  </div>

                </td>

                {/* القطاع */}

                <td className="px-6 py-5">

                  <span
                    className="
                      px-3 py-1
                      rounded-full
                      text-sm
                      bg-blue-500/10
                      text-blue-300
                      border border-blue-500/20
                    "
                  >
                    {company.sector}
                  </span>

                </td>

                {/* المحفظة */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2">

                    <Wallet
                      size={18}
                      className="text-green-400"
                    />

                    <span className="font-medium text-white">
                      ${company.wallet}
                    </span>

                  </div>

                </td>

                {/* الحالة */}

                <td className="px-6 py-5">

                  {company.blocked ? (

                    <span
                      className="
                        px-3 py-1
                        rounded-full
                        text-sm
                        bg-red-500/10
                        text-red-300
                        border border-red-500/20
                      "
                    >
                      Blocked
                    </span>

                  ) : (

                    <span
                      className="
                        px-3 py-1
                        rounded-full
                        text-sm
                        bg-green-500/10
                        text-green-300
                        border border-green-500/20
                      "
                    >
                      Active
                    </span>

                  )}

                </td>

                {/* الأزرار */}

                <td className="px-6 py-5">

                  <div className="flex justify-center">

                    {company.blocked ? (

                      <button
                        onClick={() => unblockCompany(company.id)}
                        className="
                          flex items-center gap-2
                          px-4 py-2
                          rounded-xl
                          bg-green-500/10
                          text-green-300
                          border border-green-500/20
                          hover:bg-green-500/20
                          transition-all duration-300
                        "
                      >

                        <ShieldCheck size={18} />

                        Unblock

                      </button>

                    ) : (

                      <button
                        onClick={() => setSelectedCompany(company)}
                        className="
                          flex items-center gap-2
                          px-4 py-2
                          rounded-xl
                          bg-red-500/10
                          text-red-300
                          border border-red-500/20
                          hover:bg-red-500/20
                          transition-all duration-300
                        "
                      >

                        <ShieldBan size={18} />

                        Block

                      </button>

                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Modal تبع الحظر */}

      {selectedCompany && (

        <div
          className="
            fixed inset-0
            bg-black/60
            backdrop-blur-sm
            flex items-center justify-center
            z-50
          "
        >

          {/* محتوى النافذة */}

          <div
            className="
              w-full max-w-md
              bg-[#112D4E]
              border border-[#1E3A5F]
              rounded-3xl
              p-6
              shadow-2xl
            "
          >

            {/* العنوان */}

            <h2 className="text-2xl font-bold text-white mb-2">
              Block Company
            </h2>

            <p className="text-slate-400 mb-6">
              Select or write the reason for blocking this company.
            </p>

            {/* اختيار السبب */}

            <select
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              className="
                w-full
                bg-[#0A192F]
                border border-[#1E3A5F]
                rounded-2xl
                p-3
                text-white
                mb-4
                outline-none
                focus:border-red-400
              "
            >

              <option value="">
                Select Reason
              </option>

              {blockReasons.map((reason, index) => (

                <option
                  key={index}
                  value={reason}
                >
                  {reason}
                </option>

              ))}

            </select>

            {/* كتابة السبب */}

            {blockReason === 'Other' && (

              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Write reason..."
                className="
                  w-full
                  h-28
                  resize-none
                  bg-[#0A192F]
                  border border-[#1E3A5F]
                  rounded-2xl
                  p-3
                  text-white
                  outline-none
                  focus:border-red-400
                  mb-4
                "
              />

            )}

            {/* الأزرار */}

            <div className="flex justify-end gap-3">

              {/* زر الإلغاء */}

              <button
                onClick={() => {
                  setSelectedCompany(null);
                  setBlockReason('');
                  setCustomReason('');
                }}
                className="
                  px-5 py-2.5
                  rounded-xl
                  bg-white/10
                  hover:bg-white/20
                  transition-all
                  text-white
                "
              >
                Cancel
              </button>

              {/* زر التأكيد */}

              <button
                disabled={blockReason === 'Other' ? !customReason.trim() : !blockReason}
                onClick={blockCompany}
                className="
                  px-5 py-2.5
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  disabled:opacity-50
                  transition-all
                  text-white
                "
              >
                Confirm Block
              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );
};

export default CompanyTable;