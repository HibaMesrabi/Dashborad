import React, { useState } from 'react';

/*
  Restrict User Modal

  تقييد المستخدم لفترة محددة
*/

const RestrictUserModal = ({

  onClose,

  onConfirm

}) => {

  const [duration, setDuration] =
    useState('');

  return (

    <div
      className="
        fixed inset-0
        bg-black/70
        flex items-center justify-center
        z-50
      "
    >

      <div
        className="
          w-[500px]
          bg-[#112D4E]
          rounded-3xl
          p-6
          border border-blue-500/20
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-blue-400
            mb-4
          "
        >
          Restrict User
        </h2>

        <select
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
          className="
            w-full
            h-12
            rounded-xl
            px-4
            bg-[#071A33]
            border border-white/10
            text-white
          "
        >
          <option value="">
            Select Duration
          </option>

          <option value="3 Days">
            3 Days
          </option>

          <option value="7 Days">
            7 Days
          </option>

          <option value="30 Days">
            30 Days
          </option>
        </select>

        <div
          className="
            flex justify-end gap-3 mt-6
          "
        >

          <button
            onClick={onClose}
            className="
              px-5 py-2
              rounded-xl
              bg-slate-600
              text-white
            "
          >
            Cancel
          </button>

          <button
            disabled={!duration}
            onClick={() =>
              onConfirm(duration)
            }
            className="
              px-5 py-2
              rounded-xl
              bg-blue-600
              text-white
              disabled:opacity-50
            "
          >
            Restrict
          </button>

        </div>

      </div>

    </div>

  );

};

export default RestrictUserModal;