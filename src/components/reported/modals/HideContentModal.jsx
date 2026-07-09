import React from 'react';

/*
  HideContentModal

  المسؤول عن:
  - تأكيد إخفاء المحتوى المخالف
  - إغلاق النافذة
  - تنفيذ عملية الإخفاء
*/

const HideContentModal = ({

  // إغلاق المودال
  onClose,

  // تنفيذ الإخفاء
  onConfirm,

}) => {

  return (

    /*
      الخلفية السوداء
      تغطي كامل الشاشة
    */
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

      {/* صندوق المودال */}
      <div
        className="
          w-[450px]
          bg-[#112D4E]
          rounded-3xl
          border border-white/10
          p-6
          shadow-2xl
        "
      >

        {/* عنوان النافذة */}
        <h2
          className="
            text-2xl
            font-bold
            text-white
            mb-3
          "
        >
          Hide Content
        </h2>

        {/* وصف العملية */}
        <p
          className="
            text-slate-400
            mb-8
          "
        >
          Are you sure you want to hide this content?
        </p>

        {/* الأزرار */}
        <div
          className="
            flex
            justify-end
            gap-3
          "
        >

          {/* إلغاء */}
          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-xl
              bg-slate-600
              text-white
              hover:bg-slate-700
              transition
            "
          >
            Cancel
          </button>

          {/* تأكيد الإخفاء */}
          <button
            onClick={onConfirm}
            className="
              px-5
              py-2
              rounded-xl
              bg-yellow-600
              text-white
              hover:bg-yellow-700
              transition
            "
          >
            Hide
          </button>

        </div>

      </div>

    </div>

  );

};

export default HideContentModal;