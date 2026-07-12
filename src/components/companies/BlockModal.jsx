import React, { useState } from 'react';

/*
  نافذة تأكيد الحظر
*/

const BlockModal = ({
  company,
  closeModal,
  confirmBlock,
}) => {

  // سبب الحظر
  const [reason, setReason] = useState('');

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-[#112D4E] w-full max-w-md p-6 rounded-3xl shadow-2xl">

        <h2 className="text-2xl font-bold text-white mb-4">
          حظر الشركة
        </h2>

        <p className="text-slate-400 mb-4">
          الرجاء كتابة سبب الحظر.
        </p>

        <textarea
          placeholder="اكتب السبب..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="
            w-full
            h-32
            bg-[#0A192F]
            border border-slate-700
            rounded-2xl
            p-4
            text-white
            resize-none
            focus:outline-none
            focus:border-red-500
          "
        />

        <div className="flex justify-end gap-3 mt-6">

          {/* إلغاء */}

          <button
            onClick={closeModal}
            className="
              px-5 py-2 rounded-xl
              bg-slate-700
              text-white
              hover:bg-slate-600
              transition
            "
          >
            إلغاء
          </button>

          {/* تأكيد */}

          <button
            onClick={() => confirmBlock(company.id)}
            className="
              px-5 py-2 rounded-xl
              bg-red-600
              text-white
              hover:bg-red-700
              transition
            "
          >
            تأكيد الحظر
          </button>

        </div>

      </div>

    </div>
  );
};

export default BlockModal;