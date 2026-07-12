import React from 'react';
import { Package, CheckCircle2, DollarSign, Users } from 'lucide-react';

/*
  Package statistics
  - Total number of packages
  - Active packages
  - Active subscriptions (company_plans active)
  - Total payments (price_paid)
*/

const PackageStats = ({ plans, companyPlans }) => {

  const totalPlans = plans.length;

  const activePlans = plans.filter((p) => p.is_active).length;

  const activeSubscriptions = companyPlans.filter(
    (cp) => cp.status === 'active'
  ).length;

  const totalRevenue = companyPlans.reduce(
    (sum, cp) => sum + Number(cp.price_paid || 0),
    0
  );

  const cards = [
    {
      title: 'Total Packages',
      value: totalPlans,
      icon: Package,
      color: 'text-orange-400',
    },
    {
      title: 'Active Packages',
      value: activePlans,
      icon: CheckCircle2,
      color: 'text-green-400',
    },
    {
      title: 'Active Subscriptions',
      value: activeSubscriptions,
      icon: Users,
      color: 'text-blue-400',
    },
    {
      title: 'Total Payments',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className="bg-[#112D4E] p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition"
          >
            <Icon className={`${c.color} mb-4`} />
            <h3 className="text-slate-400 mb-2">{c.title}</h3>
            <p className="text-3xl font-bold text-white">{c.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PackageStats;
