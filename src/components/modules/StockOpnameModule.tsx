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
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl lg:text-2xl text-gray-900 mb-1 font-medium">Modul Stock Opname</h1>
          <p className="text-sm md:text-base text-gray-600">Physical Inventory Count, Variance Analysis & Adjustment</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-600 text-xs md:text-sm truncate">Scheduled Opnames</p>
              <p className="text-sm md:text-base text-gray-900 font-medium">{statsData.scheduledOpnames}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-600 text-xs md:text-sm truncate">Active Opnames</p>
              <p className="text-sm md:text-base text-gray-900 font-medium">{statsData.activeOpnames}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-600 text-xs md:text-sm truncate">Pending Approvals</p>
              <p className="text-sm md:text-base text-gray-900 font-medium">{statsData.pendingApprovals}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-600 text-xs md:text-sm truncate">Accuracy Rate</p>
              <p className="text-sm md:text-base text-gray-900 font-medium">{statsData.averageAccuracy}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 md:gap-2 p-2 md:p-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('planning')}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-xs md:text-sm ${
                activeTab === 'planning' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Perencanaan</span>
              <span className="sm:hidden">Plan</span>
            </button>
            <button
              onClick={() => setActiveTab('counting')}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-xs md:text-sm ${
                activeTab === 'counting' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ClipboardList className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Pelaksanaan Counting</span>
              <span className="sm:hidden">Count</span>
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-xs md:text-sm ${
                activeTab === 'verification' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Verifikasi & Recount</span>
              <span className="sm:hidden">Verify</span>
            </button>
            <button
              onClick={() => setActiveTab('adjustment')}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-xs md:text-sm ${
                activeTab === 'adjustment' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Save className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Adjustment & Finalisasi</span>
              <span className="sm:hidden">Adjust</span>
            </button>
            <button
              onClick={() => setActiveTab('reporting')}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-xs md:text-sm ${
                activeTab === 'reporting' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Reporting & Analytics</span>
              <span className="sm:hidden">Report</span>
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
