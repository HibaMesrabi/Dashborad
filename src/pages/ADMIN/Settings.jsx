import React from 'react';

import AdminLayout from '../../layouts/AdminLayout';

import AccountSettings from '../../components/settings/AccountSettings';
import NotificationSettings from '../../components/settings/NotificationSettings';

/*
  Settings Page
  Four independent cards:
    1. Account Settings
    2. Notification Settings
  Each card owns its own state and Save action.
*/

const Settings = () => {
  return (
    <AdminLayout>
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
      </div>

      <AccountSettings />
      <NotificationSettings />
    </AdminLayout>
  );
};

export default Settings;
