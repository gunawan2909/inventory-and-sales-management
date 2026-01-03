import { useState } from 'react';
import { Users, Calendar, Upload, CheckCircle } from 'lucide-react';

const agingData = [
  { id: 1, customer: 'Toko Jaya', total: 5200000, current: 3000000, d30: 1500000, d60: 500000, d90: 200000, over90: 0 },
  { id: 2, customer: 'UD Maju', total: 8500000, current: 2000000, d30: 3000000, d60: 2500000, d90: 500000, over90: 500000 },
  { id: 3, customer: 'CV Sejahtera', total: 3400000, current: 3400000, d30: 0, d60: 0, d90: 0, over90: 0 }
];

const collectionTasks = [
  { id: 1, customer: 'Toko Jaya', amount: 1500000, dueDate: '2025-12-10', priority: 'Medium', status: 'SCHEDULED' },
  { id: 2, customer: 'UD Maju', amount: 3500000, dueDate: '2025-12-08', priority: 'High', status: 'OVERDUE' },
  { id: 3, customer: 'PT Sukses', amount: 2200000, dueDate: '2025-12-15', priority: 'Low', status: 'SCHEDULED' }
];

const paymentUploads = [
  { id: 1, customer: 'Toko Jaya', invoiceNo: 'INV-001', amount: 1500000, uploadDate: '2025-12-07', status: 'VERIFIED' },
  { id: 2, customer: 'UD Maju', invoiceNo: 'INV-002', amount: 2500000, uploadDate: '2025-12-07', status: 'PENDING' }
];

const salesInvoices = [
  { id: 1, invoiceNo: 'INV-JKT-20251207-001', soNumber: 'SO-JKT-20251207-001', customer: 'Toko Jaya', invoiceDate: '2025-12-07', dueDate: '2026-01-06', amount: 5500000, paid: 0, balance: 5500000, status: 'UNPAID' },
  { id: 2, invoiceNo: 'INV-JKT-20251207-002', soNumber: 'SO-JKT-20251207-002', customer: 'UD Maju', invoiceDate: '2025-12-07', dueDate: '2026-01-06', amount: 8200000, paid: 0, balance: 8200000, status: 'UNPAID' },
  { id: 3, invoiceNo: 'INV-JKT-20251206-045', soNumber: 'SO-JKT-20251206-045', customer: 'CV Sejahtera', invoiceDate: '2025-12-06', dueDate: '2026-01-05', amount: 3400000, paid: 3400000, balance: 0, status: 'PAID' },
  { id: 4, invoiceNo: 'INV-JKT-20251205-038', soNumber: 'SO-JKT-20251205-038', customer: 'Toko Jaya', invoiceDate: '2025-12-05', dueDate: '2026-01-04', amount: 6200000, paid: 3000000, balance: 3200000, status: 'PARTIAL' },
  { id: 5, invoiceNo: 'INV-JKT-20251204-032', soNumber: 'SO-JKT-20251204-032', customer: 'UD Makmur', invoiceDate: '2025-12-04', dueDate: '2025-12-19', amount: 4500000, paid: 0, balance: 4500000, status: 'OVERDUE' }
];

export default function ARModule() {
  const [activeTab, setActiveTab] = useState<'aging' | 'invoice' | 'upload'>('aging');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Modul Piutang (A/R)</h1>
          <p className="text-gray-600">Aging, Collection, Payment Upload</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total AR</p>
              <p className="text-gray-900">Rp 890K</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Overdue</p>
              <p className="text-gray-900">Rp 245K</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Collected Today</p>
              <p className="text-gray-900">Rp 128K</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pending Verification</p>
              <p className="text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            <button
              onClick={() => setActiveTab('aging')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'aging' ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Aging Piutang
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'invoice' ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Daftar Invoice
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'upload' ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Upload Bukti Transfer
            </button>
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'aging' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-right py-3 px-4 text-gray-600">Total</th>
                    <th className="text-right py-3 px-4 text-gray-600">Current</th>
                    <th className="text-right py-3 px-4 text-gray-600">1-30 Days</th>
                    <th className="text-right py-3 px-4 text-gray-600">31-60 Days</th>
                    <th className="text-right py-3 px-4 text-gray-600">61-90 Days</th>
                    <th className="text-right py-3 px-4 text-gray-600">&gt;90 Days</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agingData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{item.customer}</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(item.total / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-right text-green-600">Rp {(item.current / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-right text-yellow-600">Rp {(item.d30 / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-right text-orange-600">Rp {(item.d60 / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-right text-red-600">Rp {(item.d90 / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-right text-red-700">Rp {(item.over90 / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-pink-600 hover:text-pink-700">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'invoice' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Invoice No</th>
                    <th className="text-left py-3 px-4 text-gray-600">SO Number</th>
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Invoice Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Due Date</th>
                    <th className="text-right py-3 px-4 text-gray-600">Amount</th>
                    <th className="text-right py-3 px-4 text-gray-600">Paid</th>
                    <th className="text-right py-3 px-4 text-gray-600">Balance</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{invoice.invoiceNo}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.soNumber}</td>
                      <td className="py-3 px-4 text-gray-900">{invoice.customer}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.invoiceDate}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.dueDate}</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(invoice.amount / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-right text-gray-700">Rp {(invoice.paid / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(invoice.balance / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          invoice.status === 'PAID' ? 'bg-green-100 text-green-700' :
                          invoice.status === 'UNPAID' ? 'bg-yellow-100 text-yellow-700' :
                          invoice.status === 'PARTIAL' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-gray-700 mb-2">Upload Payment Proof</h3>
                <p className="text-gray-500 text-sm mb-4">Drag and drop files or click to browse</p>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                  Select Files
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                      <th className="text-left py-3 px-4 text-gray-600">Invoice No</th>
                      <th className="text-right py-3 px-4 text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-600">Upload Date</th>
                      <th className="text-center py-3 px-4 text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentUploads.map((upload) => (
                      <tr key={upload.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{upload.customer}</td>
                        <td className="py-3 px-4 text-gray-700">{upload.invoiceNo}</td>
                        <td className="py-3 px-4 text-right text-gray-900">Rp {(upload.amount / 1000).toFixed(0)}K</td>
                        <td className="py-3 px-4 text-gray-700">{upload.uploadDate}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            upload.status === 'VERIFIED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {upload.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="text-pink-600 hover:text-pink-700">
                            {upload.status === 'PENDING' ? 'Verify' : 'View'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}