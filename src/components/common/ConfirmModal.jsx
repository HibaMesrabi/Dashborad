import React from 'react';

/*
مربع تأكيد موحد
يستخدم للحذف والأرشفة

*/

const ConfirmModal = ({
  open,
  title,
  message,
  onConfirm,
  onClose,
  confirmText,
  danger
}) => {

  if (!open) return null;

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
          border border-white/10
          p-6
        "
      >

        {/* العنوان */}

        <h2
          className="
            text-2xl
            font-bold
            text-white
            mb-4
          "
        >
          {title}
        </h2>

        {/* الرسالة */}

        <p className="text-slate-300 mb-8">
          {message}
        </p>

        {/* الأزرار */}

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-xl
              bg-slate-600
              text-white
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`
              px-5
              py-2
              rounded-xl
              text-white

              ${
                danger
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>

  );
};

export default ConfirmModal;