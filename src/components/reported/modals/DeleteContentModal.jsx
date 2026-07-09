import React from 'react';

/*
  DeleteContentModal

  المسؤول عن:
  - تأكيد حذف المحتوى
  - إلغاء العملية
  - تنفيذ الحذف
*/

const DeleteContentModal = ({

  onClose,

  onConfirm

}) => {

  return (

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
          w-[450px]
          bg-[#112D4E]
          rounded-3xl
          border border-red-500/20
          p-6
          shadow-2xl
        "
      >

        {/* العنوان */}

        <h2
          className="
            text-2xl
            font-bold
            text-red-400
            mb-3
          "
        >
          Delete Content
        </h2>

        {/* الوصف */}

        <p
          className="
            text-slate-400
            mb-8
          "
        >
          This action cannot be undone.
          The content will be permanently removed.
        </p>

        {/* الأزرار */}

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >

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

          <button
            onClick={onConfirm}
            className="
              px-5
              py-2
              rounded-xl
              bg-red-600
              text-white
              hover:bg-red-700
              transition
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

};

export default DeleteContentModal;