import React, { useState } from 'react';

/*
  إعدادات حساب الأدمن

  تسمح للأدمن بتعديل:

  - الاسم
  - البريد الإلكتروني
  - كلمة المرور
  - الصورة الشخصية

  حالياً البيانات محلية فقط،
  ولاحقاً سيتم ربطها مع الـ Backend.
*/

const AccountSettings = () => {

  /*
    بيانات الحساب
  */

  const [name, setName] =
    useState('Admin');

  const [email, setEmail] =
    useState('admin@platform.com');

  const [password, setPassword] =
    useState('');

  /*
    الصورة المختارة
  */

  const [image, setImage] =
    useState(null);

  /*
    تغيير الصورة
  */

  const handleImageChange = (event) => {

    const file = event.target.files[0];

    if (file) {

      setImage(
        URL.createObjectURL(file)
      );

    }

  };

  /*
    حفظ البيانات

    لاحقاً سيتم إرسالها للـ Backend
  */

  const handleSave = () => {

    console.log({

      name,

      email,

      password,

      image

    });

    alert(
      'Account settings saved successfully.'
    );

  };

  return (

    <div
      className="
        bg-[#112D4E]
        rounded-3xl
        border border-white/10
        p-8
        shadow-xl
      "
    >

      {/* عنوان البطاقة */}

      <h2
        className="
          text-2xl
          font-bold
          text-white
          mb-8
        "
      >
        Account Settings
      </h2>

      {/* الصورة الشخصية */}

      <div
        className="
          flex
          items-center
          gap-6
          mb-8
        "
      >

        <div
          className="
            w-24
            h-24
            rounded-full
            overflow-hidden
            bg-[#071A33]
            border
            border-white/10
            flex
            items-center
            justify-center
          "
        >

          {image ? (

            <img

              src={image}

              alt="Profile"

              className="
                w-full
                h-full
                object-cover
              "

            />

          ) : (

            <span
              className="
                text-slate-400
                text-sm
              "
            >
              No Image
            </span>

          )}

        </div>

        <div>

          <label
            className="
              cursor-pointer
              px-5
              py-2
              rounded-xl
              bg-orange-500
              text-white
              hover:bg-orange-600
              transition
            "
          >
            Change Picture

            <input

              type="file"

              accept="image/*"

              onChange={handleImageChange}

              className="hidden"

            />

          </label>

        </div>

      </div>

      {/* الحقول */}

      <div
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >

        {/* الاسم */}

        <div>

          <label
            className="
              block
              text-slate-300
              mb-2
            "
          >
            Full Name
          </label>

          <input

            type="text"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            className="
              w-full
              h-12
              px-4
              rounded-xl
              bg-[#071A33]
              border border-white/10
              text-white
              outline-none
              focus:border-orange-500
            "

          />

        </div>

        {/* البريد */}

        <div>

          <label
            className="
              block
              text-slate-300
              mb-2
            "
          >
            Email
          </label>

          <input

            type="email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="
              w-full
              h-12
              px-4
              rounded-xl
              bg-[#071A33]
              border border-white/10
              text-white
              outline-none
              focus:border-orange-500
            "

          />

        </div>

      </div>

      {/* كلمة المرور */}

      <div className="mt-6">

        <label
          className="
            block
            text-slate-300
            mb-2
          "
        >
          New Password
        </label>

        <input

          type="password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          placeholder="Enter new password"

          className="
            w-full
            h-12
            px-4
            rounded-xl
            bg-[#071A33]
            border border-white/10
            text-white
            outline-none
            focus:border-orange-500
          "

        />

      </div>

      {/* زر الحفظ */}

      <div className="mt-8">

        <button

          onClick={handleSave}

          className="
            px-8
            py-3
            rounded-xl
            bg-orange-500
            text-white
            font-semibold
            hover:bg-orange-600
            transition
          "

        >
          Save Changes
        </button>

      </div>

    </div>

  );

};

export default AccountSettings;