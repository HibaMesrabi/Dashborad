import React, { useState } from 'react';

/*
  BlockUserModal

  المسؤول عن:

  - اختيار سبب الحظر
  - كتابة سبب مخصص
  - منع الحظر بدون سبب
  - إرسال السبب عند التأكيد

  ملاحظة:
  تنفيذ الحظر الحقيقي يتم من الـ Backend
  نحن هنا فقط واجهة Frontend
*/

const BlockUserModal = ({

  // إغلاق المودال
  onClose,

  // تنفيذ الحظر
  onConfirm

}) => {

  /*
    السبب المختار
  */

  const [reason, setReason] =
    useState('');

  /*
    سبب مخصص
  */

  const [customReason, setCustomReason] =
    useState('');

  /*
    تحديد السبب النهائي

    إذا اختار Other
    نأخذ النص المكتوب

    غير ذلك
    نأخذ السبب المختار
  */

  const finalReason =

    reason === 'Other'

      ? customReason

      : reason;

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

      {/* صندوق المودال */}

      <div
        className="
          w-[550px]
          bg-[#112D4E]
          rounded-3xl
          p-6
          border
          border-orange-500/20
          shadow-2xl
        "
      >

        {/* العنوان */}

        <h2
          className="
            text-2xl
            font-bold
            text-orange-400
            mb-2
          "
        >
          Block User
        </h2>

        {/* الوصف */}

        <p
          className="
            text-slate-400
            mb-5
          "
        >
          Please select a reason before blocking
          this user.
        </p>

        {/* قائمة الأسباب */}

        <select

          value={reason}

          onChange={(e) =>
            setReason(e.target.value)
          }

          className="
            w-full
            h-12
            px-4
            rounded-xl
            bg-[#071A33]
            border
            border-white/10
            text-white
            outline-none
            mb-4
          "
        >

          <option value="">
            Select Reason
          </option>

          <option value="Spam">
            Spam
          </option>

          <option value="Fake Information">
            Fake Information
          </option>

          <option value="Harassment">
            Harassment
          </option>

          <option value="Repeated Violations">
            Repeated Violations
          </option>

          <option value="Inappropriate Content">
            Inappropriate Content
          </option>

          <option value="Other">
            Other
          </option>

        </select>

        {/* سبب مخصص */}

        {reason === 'Other' && (

          <textarea

            value={customReason}

            onChange={(e) =>
              setCustomReason(
                e.target.value
              )
            }

            rows={4}

            placeholder="Write the reason..."

            className="
              w-full
              p-4
              rounded-xl
              bg-[#071A33]
              border
              border-white/10
              text-white
              outline-none
              resize-none
            "
          />

        )}

        {/* الأزرار */}

        <div
          className="
            flex
            justify-end
            gap-3
            mt-6
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

          {/* تأكيد الحظر */}

          <button

            disabled={!finalReason}

            onClick={() =>
              onConfirm(finalReason)
            }

            className="
              px-5
              py-2
              rounded-xl
              bg-orange-600
              text-white
              hover:bg-orange-700
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Block User
          </button>

        </div>

      </div>

    </div>

  );

};

export default BlockUserModal;