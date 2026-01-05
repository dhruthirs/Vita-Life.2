import React from "react";
import { BarChart3 } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Comprehensive blood bank analytics and reports</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <BarChart3 className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports Coming Soon</h2>
        <p className="text-gray-600">Advanced analytics and reporting features will be available soon.</p>
      </div>
    </div>
  );
};

export default Reports;
