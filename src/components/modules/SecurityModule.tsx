import { useState } from 'react';
import { Shield, Lock, FileText, Activity } from 'lucide-react';

const approvals = [
  { id: 1, type: 'Edit Sales Order', reference: 'SO-JKT-20251207-002', user: 'Sales User', reason: 'Price change', status: 'PENDING' },
  { id: 2, type: 'Manual Journal', reference: 'JV-2025-003', user: 'Finance User', reason: 'Correction entry', status: 'PENDING' },
  { id: 3, type: 'Period Closing', reference: 'November 2025', user: 'Accounting User', reason: 'Month end close', status: 'APPROVED' }
];

const activityLogs = [
  { id: 1, timestamp: '2025-12-07 14:32:15', user: 'admin@company.com', action: 'Login', module: 'System', ip: '192.168.1.100', status: 'Success' },
  { id: 2, timestamp: '2025-12-07 14:35:22', user: 'sales@company.com', action: 'Create SO', module: 'Sales', ip: '192.168.1.105', status: 'Success' },
  { id: 3, timestamp: '2025-12-07 14:38:45', user: 'unknown@test.com', action: 'Login', module: 'System', ip: '203.45.67.89', status: 'Failed' }
];

const otpRequests = [
  { id: 1, user: 'finance@company.com', action: 'Approve Payment >10M', timestamp: '2025-12-07 14:30:00', status: 'VERIFIED' },
  { id: 2, user: 'admin@company.com', action: 'Export Financial Report', timestamp: '2025-12-07 14:25:00', status: 'PENDING' }
];

export default function SecurityModule() {
  const [activeTab, setActiveTab] = useState<'otp' | 'audit' | 'settings'>('otp');

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="text-lg md:text-xl lg:text-2xl text-gray-900 mb-1 font-medium">Modul Security</h1>
        <p className="text-sm md:text-base text-gray-600">2FA/OTP, Audit Log, Settings</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pending Approvals</p>
              <p className="text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">OTP Sent Today</p>
              <p className="text-gray-900">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Audit Logs</p>
              <p className="text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Failed Logins</p>
              <p className="text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            {['otp', 'audit', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${activeTab === tab ? 'bg-slate-50 text-slate-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab === 'otp' ? 'OTP/2FA' : tab === 'audit' ? 'Audit Log' : 'Security Settings'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'otp' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-blue-900 mb-1">Two-Factor Authentication (2FA)</h3>
                    <p className="text-blue-700 text-sm">OTP is sent via SMS, WhatsApp, or Email for critical transactions</p>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600">User</th>
                      <th className="text-left py-3 px-4 text-gray-600">Action</th>
                      <th className="text-left py-3 px-4 text-gray-600">Timestamp</th>
                      <th className="text-center py-3 px-4 text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otpRequests.map((request) => (
                      <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{request.user}</td>
                        <td className="py-3 px-4 text-gray-700">{request.action}</td>
                        <td className="py-3 px-4 text-gray-700 text-sm">{request.timestamp}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            request.status === 'VERIFIED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Timestamp</th>
                    <th className="text-left py-3 px-4 text-gray-600">User</th>
                    <th className="text-left py-3 px-4 text-gray-600">Action</th>
                    <th className="text-left py-3 px-4 text-gray-600">Module</th>
                    <th className="text-left py-3 px-4 text-gray-600">IP Address</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700 text-sm font-mono">{log.timestamp}</td>
                      <td className="py-3 px-4 text-gray-900">{log.user}</td>
                      <td className="py-3 px-4 text-gray-700">{log.action}</td>
                      <td className="py-3 px-4 text-gray-700">{log.module}</td>
                      <td className="py-3 px-4 text-gray-700 font-mono text-sm">{log.ip}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-gray-900 mb-3">Security Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-gray-900">Require 2FA for Critical Transactions</p>
                      <p className="text-gray-500 text-sm">Payments, Exports, Configuration Changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-gray-900">Session Timeout</p>
                      <p className="text-gray-500 text-sm">Auto logout after 30 minutes of inactivity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-gray-900">Comprehensive Audit Logging</p>
                      <p className="text-gray-500 text-sm">Log all user activities and system events</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
