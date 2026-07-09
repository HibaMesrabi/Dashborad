import React, { useState } from 'react';

/*
  إعدادات المنصة

  مسؤول عن:

  - اسم المنصة
  - وصف المنصة
  - اللغة الافتراضية
  - شعار المنصة
*/

const GeneralSettings = () => {

  /*
    اسم المنصة
  */
  const [platformName, setPlatformName] =
    useState('AI News Platform');

  /*
    وصف المنصة
  */
  const [platformDescription, setPlatformDescription] =
    useState('Latest Artificial Intelligence News');

  /*
    اللغة الافتراضية
  */
  const [language, setLanguage] =
    useState('English');

  /*
    اسم ملف الشعار

    حالياً فقط لعرض اسم الملف
  */
  const [logo, setLogo] =
    useState(null);

  return (

    <div
      className="
        bg-[#112D4E]
        rounded-3xl
        border border-white/10
        shadow-xl
        p-6
        mb-8
      "
    >

      {/* عنوان القسم */}

      <h2
        className="
          text-2xl
          font-bold
          text-white
          mb-6
        "
      >
        General Settings
      </h2>

      <div className="space-y-6">

        {/* اسم المنصة */}

        <div>

          <label
            className="
              block
              text-slate-300
              mb-2
            "
          >
            Platform Name
          </label>

          <input

            type="text"

            value={platformName}

            onChange={(e) =>
              setPlatformName(
                e.target.value
              )
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

        {/* وصف المنصة */}

        <div>

          <label
            className="
              block
              text-slate-300
              mb-2
            "
          >
            Platform Description
          </label>

          <textarea

            rows={4}

            value={platformDescription}

            onChange={(e) =>
              setPlatformDescription(
                e.target.value
              )
            }

            className="
              w-full
              p-4
              rounded-xl
              bg-[#071A33]
              border border-white/10
              text-white
              outline-none
              resize-none
              focus:border-orange-500
            "

          />

        </div>

        {/* اللغة */}

        <div>

          <label
            className="
              block
              text-slate-300
              mb-2
            "
          >
            Default Language
          </label>

          <select

            value={language}

            onChange={(e) =>
              setLanguage(
                e.target.value
              )
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

          >

            <option>
              English
            </option>

            <option>
              Arabic
            </option>

          </select>

        </div>

        {/* شعار المنصة */}

        <div>

          <label
            className="
              block
              text-slate-300
              mb-2
            "
          >
            Platform Logo
          </label>

          <input

            type="file"

            accept="image/*"

            onChange={(e) =>
              setLogo(
                e.target.files[0]
              )
            }

            className="
              w-full
              text-white
              file:bg-orange-500
              file:border-0
              file:text-white
              file:px-4
              file:py-2
              file:rounded-lg
              file:mr-4
            "

          />

          {

            logo && (

              <p
                className="
                  mt-3
                  text-green-400
                  text-sm
                "
              >
                Selected:
                {' '}
                {logo.name}
              </p>

            )

          }

        </div>

      </div>

    </div>

  );

};

export default GeneralSettings;