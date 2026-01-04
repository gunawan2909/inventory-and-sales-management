import { useState } from 'react';
import { BookOpen, FileText, BarChart3, List } from 'lucide-react';

const coaData = [
  { code: '1-10-101-0001', name: 'Cash in Hand', type: 'Asset', level: 4, balance: 5950000, status: 'Active' },
  { code: '1-10-102-0001', name: 'Cash in Bank', type: 'Asset', level: 4, balance: 12500000, status: 'Active' },
  { code: '1-20-201-0001', name: 'Accounts Receivable', type: 'Asset', level: 4, balance: 8900000, status: 'Active' },
  { code: '2-10-101-0001', name: 'Accounts Payable', type: 'Liability', level: 4, balance: 6500000, status: 'Active' },
  { code: '4-10-101-0001', name: 'Sales Revenue', type: 'Income', level: 4, balance: 24000000, status: 'Active' }
];

const journals = [
  { id: 1, journalNo: 'JV-2025-001', date: '2025-12-07', description: 'Sales Invoice SO-001', debit: 5500000, credit: 5500000, status: 'POSTED' },
  { id: 2, journalNo: 'JV-2025-002', date: '2025-12-07', description: 'Payment to Vendor', debit: 3000000, credit: 3000000, status: 'POSTED' },
  { id: 3, journalNo: 'JV-2025-003', date: '2025-12-07', description: 'Expense - Office Supplies', debit: 250000, credit: 250000, status: 'PENDING' }
];

export default function AccountingModule() {
  const [activeTab, setActiveTab] = useState<'coa' | 'journal' | 'reports' | 'approval'>('coa');

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="text-lg md:text-xl lg:text-2xl text-gray-900 mb-1 font-medium">Modul Akuntansi (General Ledger)</h1>
        <p className="text-sm md:text-base text-gray-600">COA, Laporan Keuangan, Jurnal Otomatis, Approval</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <List className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">COA Accounts</p>
              <p className="text-gray-900">245</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Journal Entries</p>
              <p className="text-gray-900">156</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Assets</p>
              <p className="text-gray-900">Rp 45.2M</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Net Profit MTD</p>
              <p className="text-gray-900">Rp 8.5M</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            {['coa', 'journal', 'reports', 'approval'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${activeTab === tab ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab === 'coa' ? 'Chart of Accounts' : tab === 'journal' ? 'Journal Entries' : tab === 'reports' ? 'Financial Reports' : 'Approval Koreksi'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'coa' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Account Code</th>
                    <th className="text-left py-3 px-4 text-gray-600">Account Name</th>
                    <th className="text-left py-3 px-4 text-gray-600">Type</th>
                    <th className="text-center py-3 px-4 text-gray-600">Level</th>
                    <th className="text-right py-3 px-4 text-gray-600">Balance</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {coaData.map((account, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-mono text-sm">{account.code}</td>
                      <td className="py-3 px-4 text-gray-900">{account.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          account.type === 'Asset' ? 'bg-blue-100 text-blue-700' :
                          account.type === 'Liability' ? 'bg-red-100 text-red-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {account.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">{account.level}</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(account.balance / 1000000).toFixed(2)}M</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">{account.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'journal' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Journal No</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Description</th>
                    <th className="text-right py-3 px-4 text-gray-600">Debit</th>
                    <th className="text-right py-3 px-4 text-gray-600">Credit</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {journals.map((journal) => (
                    <tr key={journal.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{journal.journalNo}</td>
                      <td className="py-3 px-4 text-gray-700">{journal.date}</td>
                      <td className="py-3 px-4 text-gray-700">{journal.description}</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(journal.debit / 1000000).toFixed(2)}M</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(journal.credit / 1000000).toFixed(2)}M</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          journal.status === 'POSTED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {journal.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-indigo-600 hover:text-indigo-700">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Balance Sheet', 'Income Statement', 'Cash Flow Statement'].map((report) => (
                <div key={report} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <BarChart3 className="w-12 h-12 text-indigo-500 mb-3" />
                  <h3 className="text-gray-900 mb-2">{report}</h3>
                  <p className="text-gray-500 text-sm mb-4">Generate {report.toLowerCase()} for selected period</p>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Generate Report
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'approval' && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-700 mb-2">Journal Entry Approval</h3>
              <p className="text-gray-500 mb-4">Manual journal entries and correction entries require approval</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                View Pending Approvals
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
