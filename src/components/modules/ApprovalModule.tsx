import { useState } from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

const approvals = [
  { id: 1, type: 'Edit Sales Order', reference: 'SO-JKT-20251207-002', user: 'Sales User', reason: 'Price change', status: 'PENDING' },
  { id: 2, type: 'Manual Journal', reference: 'JV-2025-003', user: 'Finance User', reason: 'Correction entry', status: 'PENDING' },
  { id: 3, type: 'Period Closing', reference: 'November 2025', user: 'Accounting User', reason: 'Month end close', status: 'APPROVED' },
  { id: 4, type: 'Price Change', reference: 'PRD-001', user: 'Manager', reason: 'Market adjustment', status: 'PENDING' },
  { id: 5, type: 'Delete Transaction', reference: 'INV-2025-045', user: 'Finance User', reason: 'Duplicate entry', status: 'REJECTED' }
];

export default function ApprovalModule() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');

  const filteredApprovals = approvals.filter(approval => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return approval.status === 'PENDING';
    if (activeTab === 'approved') return approval.status === 'APPROVED';
    if (activeTab === 'rejected') return approval.status === 'REJECTED';
    return true;
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
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
                    <td colSpan={6} className="py-8 text-center text-gray-500">
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
