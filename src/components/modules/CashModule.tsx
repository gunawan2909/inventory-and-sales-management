import { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Camera } from 'lucide-react';

const expenses = [
  { id: 1, expenseNo: 'PE-JKT-20251207-001', category: 'Office Supplies', amount: 250000, date: '2025-12-07', status: 'APPROVED' },
  { id: 2, expenseNo: 'PE-JKT-20251207-002', category: 'Transportation', amount: 150000, date: '2025-12-07', status: 'PENDING' },
  { id: 3, expenseNo: 'PE-JKT-20251207-003', category: 'Utilities', amount: 1200000, date: '2025-12-07', status: 'APPROVED' }
];

const dailySummary = {
  opening: 5200000,
  cashIn: 2400000,
  cashOut: 1650000,
  closing: 5950000
};

const branches = [
  { id: 1, branch: 'Jakarta', opening: 5200000, cashIn: 2400000, cashOut: 1650000, closing: 5950000 },
  { id: 2, branch: 'Bandung', opening: 3100000, cashIn: 1800000, cashOut: 980000, closing: 3920000 },
  { id: 3, branch: 'Surabaya', opening: 4500000, cashIn: 3200000, cashOut: 1100000, closing: 6600000 }
];

export default function CashModule() {
  const [activeTab, setActiveTab] = useState<'expense' | 'recap' | 'upload' | 'report'>('expense');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-1">Modul Kas & Operasional</h1>
        <p className="text-gray-600">Pengeluaran, Rekap Harian, Upload Bukti, Laporan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Cash Balance</p>
              <p className="text-gray-900">Rp 5.95M</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Cash In Today</p>
              <p className="text-gray-900">Rp 2.4M</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Cash Out Today</p>
              <p className="text-gray-900">Rp 1.65M</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Receipts Uploaded</p>
              <p className="text-gray-900">45</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            {['expense', 'recap', 'upload', 'report'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${activeTab === tab ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab === 'expense' ? 'Pengeluaran Harian' : tab === 'recap' ? 'Rekap Harian' : tab === 'upload' ? 'Upload Bukti' : 'Laporan per Cabang'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'expense' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  Add Expense
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600">Expense No</th>
                      <th className="text-left py-3 px-4 text-gray-600">Category</th>
                      <th className="text-right py-3 px-4 text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-600">Date</th>
                      <th className="text-center py-3 px-4 text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{expense.expenseNo}</td>
                        <td className="py-3 px-4 text-gray-700">{expense.category}</td>
                        <td className="py-3 px-4 text-right text-gray-900">Rp {(expense.amount / 1000).toFixed(0)}K</td>
                        <td className="py-3 px-4 text-gray-700">{expense.date}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            expense.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {expense.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="text-emerald-600 hover:text-emerald-700">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'recap' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-lg border border-emerald-200">
                <h3 className="text-gray-700 mb-4">Daily Cash Summary - December 7, 2025</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Opening Balance</p>
                    <p className="text-gray-900">Rp {(dailySummary.opening / 1000000).toFixed(2)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Cash IN</p>
                    <p className="text-green-600">+ Rp {(dailySummary.cashIn / 1000000).toFixed(2)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Cash OUT</p>
                    <p className="text-red-600">- Rp {(dailySummary.cashOut / 1000000).toFixed(2)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Closing Balance</p>
                    <p className="text-gray-900">Rp {(dailySummary.closing / 1000000).toFixed(2)}M</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                    Close Day
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-700 mb-2">Upload Receipt Photo</h3>
              <p className="text-gray-500 text-sm mb-4">Drag and drop or click to browse</p>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                Take Photo / Upload
              </button>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Branch</th>
                    <th className="text-right py-3 px-4 text-gray-600">Opening</th>
                    <th className="text-right py-3 px-4 text-gray-600">Cash IN</th>
                    <th className="text-right py-3 px-4 text-gray-600">Cash OUT</th>
                    <th className="text-right py-3 px-4 text-gray-600">Closing</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{branch.branch}</td>
                      <td className="py-3 px-4 text-right text-gray-700">Rp {(branch.opening / 1000000).toFixed(2)}M</td>
                      <td className="py-3 px-4 text-right text-green-600">Rp {(branch.cashIn / 1000000).toFixed(2)}M</td>
                      <td className="py-3 px-4 text-right text-red-600">Rp {(branch.cashOut / 1000000).toFixed(2)}M</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(branch.closing / 1000000).toFixed(2)}M</td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-emerald-600 hover:text-emerald-700">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
