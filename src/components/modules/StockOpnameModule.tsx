import { useState } from 'react';
import { ClipboardList, Users, CheckCircle, Save, BarChart3, Calendar, AlertTriangle } from 'lucide-react';
import OpnamePlanningTab from './stock-opname/OpnamePlanningTab';
import OpnameCountingTab from './stock-opname/OpnameCountingTab';
import OpnameVerificationTab from './stock-opname/OpnameVerificationTab';
import OpnameAdjustmentTab from './stock-opname/OpnameAdjustmentTab';
import OpnameReportingTab from './stock-opname/OpnameReportingTab';

type TabType = 'planning' | 'counting' | 'verification' | 'adjustment' | 'reporting';

// Mock stats data
const statsData = {
  scheduledOpnames: 3,
  activeOpnames: 1,
  pendingApprovals: 8,
  completedThisMonth: 5,
  averageAccuracy: 97.5,
  totalVarianceValue: 15000000,
  itemsCounted: 1250,
  varianceItems: 35
};

export default function StockOpnameModule() {
  const [activeTab, setActiveTab] = useState<TabType>('planning');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Modul Stock Opname</h1>
          <p className="text-gray-600">Physical Inventory Count, Variance Analysis & Adjustment</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Scheduled Opnames</p>
              <p className="text-gray-900">{statsData.scheduledOpnames}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Active Opnames</p>
              <p className="text-gray-900">{statsData.activeOpnames}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pending Approvals</p>
              <p className="text-gray-900">{statsData.pendingApprovals}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Accuracy Rate</p>
              <p className="text-gray-900">{statsData.averageAccuracy}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-2 p-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('planning')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'planning' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Perencanaan
            </button>
            <button
              onClick={() => setActiveTab('counting')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'counting' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              Pelaksanaan Counting
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'verification' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Verifikasi & Recount
            </button>
            <button
              onClick={() => setActiveTab('adjustment')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'adjustment' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Save className="w-4 h-4" />
              Adjustment & Finalisasi
            </button>
            <button
              onClick={() => setActiveTab('reporting')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'reporting' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Reporting & Analytics
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'planning' && <OpnamePlanningTab />}
          {activeTab === 'counting' && <OpnameCountingTab />}
          {activeTab === 'verification' && <OpnameVerificationTab />}
          {activeTab === 'adjustment' && <OpnameAdjustmentTab />}
          {activeTab === 'reporting' && <OpnameReportingTab />}
        </div>
      </div>
    </div>
  );
}
