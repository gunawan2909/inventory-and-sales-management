import { useState } from 'react';
import { CheckCircle, Clock, XCircle, Filter } from 'lucide-react';

const approvals = [
  { id: 1, type: 'Edit Sales Order', reference: 'SO-JKT-20251207-002', module: 'Sales Order', user: 'Sales User', reason: 'Price change', status: 'PENDING' },
  { id: 2, type: 'Manual Journal', reference: 'JV-2025-003', module: 'Accounting', user: 'Finance User', reason: 'Correction entry', status: 'PENDING' },
  { id: 3, type: 'Period Closing', reference: 'November 2025', module: 'Accounting', user: 'Accounting User', reason: 'Month end close', status: 'APPROVED' },
  { id: 4, type: 'Price Change', reference: 'PRD-001', module: 'Master Data', user: 'Manager', reason: 'Market adjustment', status: 'PENDING' },
  { id: 5, type: 'Delete Transaction', reference: 'INV-2025-045', module: 'Inventory', user: 'Finance User', reason: 'Duplicate entry', status: 'REJECTED' },
  { id: 6, type: 'Cancel Purchase Order', reference: 'PO-2025-123', module: 'Purchase Order', user: 'Purchasing', reason: 'Vendor issue', status: 'PENDING' },
  { id: 7, type: 'Stock Adjustment', reference: 'ADJ-2025-089', module: 'Gudang', user: 'Warehouse Manager', reason: 'Physical count difference', status: 'APPROVED' },
  { id: 8, type: 'Void Invoice', reference: 'INV-AR-2025-234', module: 'Piutang', user: 'Finance User', reason: 'Customer request', status: 'PENDING' }
];

// Get unique modules for filter
const modules = ['All Modules', ...Array.from(new Set(approvals.map(a => a.module)))];

export default function ApprovalModule() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [selectedModule, setSelectedModule] = useState<string>('All Modules');

  const filteredApprovals = approvals.filter(approval => {
    // Filter by status
    const statusMatch = activeTab === 'all' ? true :
                       activeTab === 'pending' ? approval.status === 'PENDING' :
                       activeTab === 'approved' ? approval.status === 'APPROVED' :
                       activeTab === 'rejected' ? approval.status === 'REJECTED' : true;

    // Filter by module
    const moduleMatch = selectedModule === 'All Modules' ? true : approval.module === selectedModule;

    return statusMatch && moduleMatch;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-1">Modul Workflow Approval</h1>
        <p className="text-gray-600">Approval Request, History, Settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pending Approvals</p>
              <p className="text-gray-900">
                {approvals.filter(a => a.status === 'PENDING').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Approved Today</p>
              <p className="text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Rejected Today</p>
              <p className="text-gray-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total This Month</p>
              <p className="text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            {[
              { id: 'pending', label: 'Pending', count: approvals.filter(a => a.status === 'PENDING').length },
              { id: 'approved', label: 'Approved', count: approvals.filter(a => a.status === 'APPROVED').length },
              { id: 'rejected', label: 'Rejected', count: approvals.filter(a => a.status === 'REJECTED').length },
              { id: 'all', label: 'All Requests', count: approvals.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-gray-200">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {/* Module Filter */}
          <div className="mb-4 flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <label className="text-sm text-gray-600">Filter by Module:</label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {modules.map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">
              Showing {filteredApprovals.length} request{filteredApprovals.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">Module</th>
                  <th className="text-left py-3 px-4 text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 text-gray-600">Reference</th>
                  <th className="text-left py-3 px-4 text-gray-600">Requested By</th>
                  <th className="text-left py-3 px-4 text-gray-600">Reason</th>
                  <th className="text-center py-3 px-4 text-gray-600">Status</th>
                  <th className="text-center py-3 px-4 text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApprovals.length > 0 ? (
                  filteredApprovals.map((approval) => (
                    <tr key={approval.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                          {approval.module}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{approval.type}</td>
                      <td className="py-3 px-4 text-gray-700">{approval.reference}</td>
                      <td className="py-3 px-4 text-gray-700">{approval.user}</td>
                      <td className="py-3 px-4 text-gray-700">{approval.reason}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          approval.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                          approval.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {approval.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {approval.status === 'PENDING' ? (
                          <div className="flex gap-2 justify-center">
                            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                              Approve
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button className="text-blue-600 hover:text-blue-700">View</button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No approval requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
