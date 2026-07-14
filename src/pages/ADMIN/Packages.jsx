import React, { useEffect, useState } from 'react';
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

import api from '../../api/axios';

const Packages = () => {

  /*
    التبويب الحالي
  */
  const [tab, setTab] = useState('plans');

  /*
    بيانات الباقات القادمة من Laravel
  */
  const [plans, setPlans] = useState([]);

  /*
    اشتراكات الشركات القادمة من Laravel
  */
  const [companyPlans, setCompanyPlans] = useState([]);

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

  /*
    جلب جميع الباقات من Laravel
  */
  const fetchPlans = async () => {
    try {

      const response = await api.get('/packages');

      setPlans(response.data.plans);

    } catch (error) {

      console.error('Error Loading Packages:', error);

    }
  };

  /*
    جلب اشتراكات الشركات من Laravel
  */
  const fetchCompanySubscriptions = async () => {
    try {

      const response = await api.get('/packages/company-subscriptions');

      setCompanyPlans(response.data.subscriptions.data);

    } catch (error) {

      console.error('Error Loading Company Subscriptions:', error);

    }
  };

  /*
    عند فتح الصفحة لأول مرة
    يتم جلب الباقات والاشتراكات
  */
  useEffect(() => {

    fetchPlans();

    fetchCompanySubscriptions();

  }, []);

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
const handleSave = async (data) => {

  try {

    // إذا كان يوجد id فهذا يعني تعديل
    if (data.id) {

      await api.put(`/packages/${data.id}`, data);

    }

    // إذا لم يوجد id فهذا يعني إضافة
    else {

      await api.post('/packages', data);

    }

    // إعادة تحميل البيانات بعد نجاح العملية
    await fetchPlans();

    setModalOpen(false);

    setEditing(null);

  } catch (error) {

    console.error('Error Saving Package:', error);

  }

};

/*
  تنفيذ التفعيل أو الإيقاف
*/
const handleToggle = async () => {

  if (!togglePlan) return;

  try {

    await api.patch(`/packages/${togglePlan.id}/toggle-status`);

    await fetchPlans();

    setTogglePlan(null);

  } catch (error) {

    console.error('Error Updating Status:', error);

  }

};

/*
  حذف الباقة
*/
const handleDelete = async () => {

  try {

    await api.delete(`/packages/${deleteId}`);

    await fetchPlans();

    setDeleteId(null);

  } catch (error) {

    console.error('Error Deleting Package:', error);

  }

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