import React, { useState } from 'react';
import {
  Plus,
  Search,
  Package as PackageIcon,
  Users
} from 'lucide-react';

import AdminLayout from '../../layouts/AdminLayout';
import PackageStats from '../../components/packages/PackageStats';
import PackageTable from '../../components/packages/PackageTable';
import PackageModal from '../../components/packages/PackageModal';
import CompanyPlansTable from '../../components/packages/CompanyPlansTable';
import ConfirmModal from '../../components/common/ConfirmModal';

const Packages = () => {

  /*
    التبويب الحالي
  */

  const [tab, setTab] = useState('plans');

  /*
    بيانات الباقات
  */

  const [plans, setPlans] = useState([

    {
      id: 1,
      name: 'Basic',
      posts_count: 20,
      price: 49.99,
      price_per_post: 2.50,
      is_active: true,
      created_at: '2025-01-10'
    },

    {
      id: 2,
      name: 'Standard',
      posts_count: 50,
      price: 99.99,
      price_per_post: 2.00,
      is_active: true,
      created_at: '2025-02-14'
    },

    {
      id: 3,
      name: 'Pro',
      posts_count: 120,
      price: 199.99,
      price_per_post: 1.67,
      is_active: true,
      created_at: '2025-03-05'
    },

    {
      id: 4,
      name: 'Enterprise',
      posts_count: 500,
      price: 699.99,
      price_per_post: 1.40,
      is_active: false,
      created_at: '2025-04-20'
    }

  ]);

  /*
    اشتراكات الشركات
  */

  const [companyPlans] = useState([

    {
      id: 1,
      company_id: 1,
      company_name: 'Neural Code',
      plan_id: 3,
      plan_name: 'Pro',
      posts_remaining: 80,
      status: 'active',
      price_paid: 199.99,
      created_at: '2025-05-10'
    },

    {
      id: 2,
      company_id: 2,
      company_name: 'VisionX',
      plan_id: 2,
      plan_name: 'Standard',
      posts_remaining: 30,
      status: 'active',
      price_paid: 99.99,
      created_at: '2025-06-01'
    },

    {
      id: 3,
      company_id: 3,
      company_name: 'DeepMind Syria',
      plan_id: 1,
      plan_name: 'Basic',
      posts_remaining: 0,
      status: 'expired',
      price_paid: 49.99,
      created_at: '2025-03-15'
    },

    {
      id: 4,
      company_id: 6,
      company_name: 'Future AI',
      plan_id: 3,
      plan_name: 'Pro',
      posts_remaining: 110,
      status: 'active',
      price_paid: 199.99,
      created_at: '2025-06-25'
    },

    {
      id: 5,
      company_id: 7,
      company_name: 'Quantum Tech',
      plan_id: 4,
      plan_name: 'Enterprise',
      posts_remaining: 420,
      status: 'active',
      price_paid: 699.99,
      created_at: '2025-04-28'
    }

  ]);

  /*
    نافذة إضافة وتعديل الباقة
  */

  const [modalOpen, setModalOpen] = useState(false);

  const [editing, setEditing] = useState(null);

  /*
    حذف الباقة
  */

  const [deleteId, setDeleteId] = useState(null);

  /*
    الباقة التي سيتم تفعيلها أو إيقافها
  */

  const [togglePlan, setTogglePlan] = useState(null);

  /*
    البحث والفلترة
  */

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPlans = plans.filter((p) => {

    const matchSearch =

      p.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =

      statusFilter === 'All'

        ? true

        : statusFilter === 'Active'

        ? p.is_active

        : !p.is_active;

    return matchSearch && matchStatus;

  });

  const filteredSubs = companyPlans.filter((s) =>

    s.company_name
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    s.plan_name
      .toLowerCase()
      .includes(search.toLowerCase())

  );
    /*
    إضافة أو تعديل باقة
  */

  const handleSave = (data) => {

    if (data.id) {

      setPlans((prev) =>

        prev.map((p) =>

          p.id === data.id

            ? { ...p, ...data }

            : p

        )

      );

    }

    else {

      const newId =

        plans.length

          ? Math.max(...plans.map((p) => p.id)) + 1

          : 1;

      setPlans((prev) => [

        ...prev,

        {

          ...data,

          id: newId,

          created_at: new Date()
            .toISOString()
            .slice(0, 10)

        }

      ]);

    }

    setModalOpen(false);

    setEditing(null);

  };

  /*
    تنفيذ التفعيل أو الإيقاف
    بعد الضغط على Confirm
  */

  const handleToggle = () => {

    if (!togglePlan) return;

    setPlans((prev) =>

      prev.map((p) =>

        p.id === togglePlan.id

          ? {

              ...p,

              is_active: !p.is_active

            }

          : p

      )

    );

    setTogglePlan(null);

  };

  /*
    حذف الباقة
  */

  const handleDelete = () => {

    setPlans((prev) =>

      prev.filter((p) =>

        p.id !== deleteId

      )

    );

    setDeleteId(null);

  };

  return (

    <AdminLayout>

      {/* عنوان الصفحة */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-white">

            Package Management

          </h1>

          <p className="text-slate-400 mt-2">

            Manage subscription packages and company subscriptions.

          </p>

        </div>

        {

          tab === 'plans' && (

            <button

              onClick={() => {

                setEditing(null);

                setModalOpen(true);

              }}

              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-orange-500
                to-orange-600
                hover:from-orange-600
                hover:to-orange-700
                text-white
                font-semibold
                shadow-lg
                transition
              "

            >

              <Plus size={18} />

              Add Package

            </button>

          )

        }

      </div>
            {/* الإحصائيات */}

      <PackageStats

        plans={plans}

        companyPlans={companyPlans}

      />

      {/* التبويبات */}

      <div className="flex gap-2 mb-6 bg-[#112D4E] p-1.5 rounded-2xl border border-[#1E3A5F] w-fit">

        <button

          onClick={() => setTab('plans')}

          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition
            ${
              tab === 'plans'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }
          `}

        >

          <PackageIcon size={18} />

          Packages

        </button>

        <button

          onClick={() => setTab('subscriptions')}

          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition
            ${
              tab === 'subscriptions'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white'
            }
          `}

        >

          <Users size={18} />

          Company Subscriptions

        </button>

      </div>

      {/* البحث */}

      <div className="mb-6 flex flex-col lg:flex-row gap-4">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder={
              tab === 'plans'
                ? 'Search for a package...'
                : 'Search for a company or package...'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 bg-[#112D4E] border border-[#1E3A5F] rounded-2xl pl-11 pr-4 text-white placeholder:text-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition shadow-lg"
          />

        </div>

        {

          tab === 'plans' && (

            <div className="lg:w-60">

              <select

                value={statusFilter}

                onChange={(e) => setStatusFilter(e.target.value)}

                className="w-full h-12 bg-[#112D4E] border border-[#1E3A5F] rounded-2xl px-4 text-white outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition shadow-lg"

              >

                <option value="All">All Packages</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>

              </select>

            </div>

          )

        }

      </div>

      {/* الجدول */}

      {

        tab === 'plans'

        ? (

          <PackageTable

            plans={filteredPlans}

            onEdit={(plan) => {

              setEditing(plan);

              setModalOpen(true);

            }}

            onDelete={(id) => setDeleteId(id)}

            onToggle={(id) => {

              const plan = plans.find((p) => p.id === id);

              setTogglePlan(plan);

            }}

          />

        )

        : (

          <CompanyPlansTable

            rows={filteredSubs}

          />

        )

      }

      {/* نافذة إضافة وتعديل */}

      <PackageModal

        open={modalOpen}

        onClose={() => {

          setModalOpen(false);

          setEditing(null);

        }}

        onSave={handleSave}

        initialData={editing}

      />

      {/* تأكيد حذف */}

      <ConfirmModal

        open={!!deleteId}

        title="Delete Package"

        message="Are you sure you want to delete this package? This cannot be undone."

        confirmText="Delete"

        danger

        onClose={() => setDeleteId(null)}

        onConfirm={handleDelete}

      />

      {/* تأكيد تفعيل أو إيقاف */}

      <ConfirmModal

        open={!!togglePlan}

        title={

          togglePlan?.is_active

            ? "Deactivate Package"

            : "Activate Package"

        }

        message={

          togglePlan?.is_active

            ? "Are you sure you want to deactivate this package?"

            : "Are you sure you want to activate this package?"

        }

        confirmText={

          togglePlan?.is_active

            ? "Deactivate"

            : "Activate"

        }

        danger={togglePlan?.is_active}

        onClose={() => setTogglePlan(null)}

        onConfirm={handleToggle}

      />

    </AdminLayout>

  );

};

export default Packages;