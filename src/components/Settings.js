import React from "react";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and system settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <SettingsIcon className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings Coming Soon</h2>
        <p className="text-gray-600">System settings and preferences management will be available soon.</p>
      </div>
    </div>
  );
};

export default Settings;
