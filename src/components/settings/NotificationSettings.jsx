import React, { useState } from 'react';
import {
  Mail,
  Save
} from 'lucide-react';

/*
  Notification Settings

  هذا القسم مسؤول عن:

  - تفعيل أو إيقاف إشعارات البريد الإلكتروني.
  - تفعيل أو إيقاف إشعارات تسجيل الدخول.
  - حفظ الإعدادات.

  ملاحظة:

  الإشعارات التي تظهر داخل الموقع
  تظهر في جرس الإشعارات الموجود
  في الشريط العلوي.
*/

const NotificationSettings = () => {

  /*
    تفعيل إشعارات البريد الإلكتروني
  */

  const [emailEnabled, setEmailEnabled] =
    useState(true);

  /*
    تفعيل إشعارات تسجيل الدخول
  */

  const [loginNotifications, setLoginNotifications] =
    useState(true);

  /*
    حفظ الإعدادات
  */

  const handleSave = () => {

    console.log(

      'Save Notification Settings',

      {

        emailEnabled,

        loginNotifications

      }

    );

  };

  return (

    <section

      className="

        bg-gradient-to-br

        from-[#183C69]

        via-[#204A7A]

        to-[#295789]

        border

        border-white/10

        rounded-3xl

        p-6

        md:p-8

        mb-6

        shadow-2xl

        hover:border-purple-400/40

        transition-all

        duration-300

      "

    >

      {/* عنوان القسم */}

      <div className="flex items-center gap-4 mb-8">

        {/* أيقونة القسم */}

        <div

          className="

            w-12

            h-12

            rounded-2xl

            bg-gradient-to-br

            from-purple-500

            to-fuchsia-600

            flex

            items-center

            justify-center

            text-white

            shadow-lg

          "

        >

          <Mail size={22} />

        </div>

        {/* اسم القسم */}

        <div>

          <h2

            className="

              text-2xl

              font-bold

              text-white

            "

          >

            Notification Preferences

          </h2>

          <p

            className="

              text-sm

              text-slate-100

              mt-1

            "

          >

            Manage email notifications and login alerts.

          </p>

        </div>

      </div>

      {/* إشعارات البريد الإلكتروني */}

      <div

        className="

          flex

          items-center

          justify-between

          p-5

          rounded-2xl

          bg-[#0A192F]/60

          border

          border-[#1E3A5F]

        "

      >

        <div>

          <p

            className="

              text-white

              font-medium

            "

          >

            Email Notifications

          </p>

          <p

            className="

              text-sm

              text-slate-200

              mt-1

            "

          >

            {emailEnabled

              ? 'Receive email notifications.'

              : 'Email notifications are disabled.'}

          </p>

        </div>

        <button

          type="button"

          onClick={() =>
            setEmailEnabled(
              !emailEnabled
            )
          }

          className={`

            relative

            w-14

            h-7

            rounded-full

            transition

            ${emailEnabled

              ? 'bg-green-500'

              : 'bg-slate-600'}

          `}

        >

          <span

            className={`

              absolute

              top-1

              w-5

              h-5

              rounded-full

              bg-white

              transition

              ${emailEnabled

                ? 'left-8'

                : 'left-1'}

            `}

          />

        </button>

      </div>
            {/* إشعارات تسجيل الدخول */}

      <div

        className="

          flex

          items-center

          justify-between

          p-5

          rounded-2xl

          bg-[#0A192F]/60

          border

          border-[#1E3A5F]

          mt-4

        "

      >

        <div>

          <p

            className="

              text-white

              font-medium

            "

          >

            Login Notifications

          </p>

          <p

            className="

              text-sm

              text-slate-200

              mt-1

            "

          >

            Receive a notification whenever a new login is detected.

          </p>

        </div>

        <button

          type="button"

          onClick={() =>

            setLoginNotifications(

              !loginNotifications

            )

          }

          className={`

            relative

            w-14

            h-7

            rounded-full

            transition

            ${loginNotifications

              ? 'bg-green-500'

              : 'bg-slate-600'}

          `}

        >

          <span

            className={`

              absolute

              top-1

              w-5

              h-5

              rounded-full

              bg-white

              transition

              ${loginNotifications

                ? 'left-8'

                : 'left-1'}

            `}

          />

        </button>

      </div>

      {/* زر حفظ الإعدادات */}

      <div

        className="

          flex

          justify-end

          mt-6

        "

      >

        <button

          onClick={handleSave}

          className="

            flex

            items-center

            gap-2

            px-5

            py-2.5

            rounded-xl

            bg-gradient-to-r

            from-purple-500

            to-fuchsia-600

            hover:from-purple-600

            hover:to-fuchsia-700

            text-white

            font-semibold

            shadow-lg

            transition

          "

        >

          <Save size={16} />

          Save Changes

        </button>

      </div>

    </section>

  );

};

export default NotificationSettings;