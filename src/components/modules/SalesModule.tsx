import { useState } from 'react';
import { FileText, RotateCcw, Receipt, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const salesOrders = [
  { id: 1, soNumber: 'SO-JKT-20251207-001', customer: 'Toko Jaya', date: '2025-12-07', amount: 5500000, status: 'APPROVED', creditStatus: 'OK' },
  { id: 2, soNumber: 'SO-JKT-20251207-002', customer: 'UD Maju', date: '2025-12-07', amount: 8200000, status: 'PENDING APPROVAL', creditStatus: 'OVER_LIMIT' },
  { id: 3, soNumber: 'SO-JKT-20251206-045', customer: 'CV Sejahtera', date: '2025-12-06', amount: 3400000, status: 'DELIVERED', creditStatus: 'OK' }
];

const refundOrders = [
  { id: 1, refundNo: 'REF-20251207-001', originalSO: 'SO-JKT-20251205-038', customer: 'Toko Jaya', reason: 'Damaged', amount: 450000, status: 'APPROVED' },
  { id: 2, refundNo: 'REF-20251206-002', originalSO: 'SO-JKT-20251204-032', customer: 'UD Makmur', reason: 'Wrong Item', amount: 780000, status: 'PENDING' }
];

const customerCredits = [
  { id: 1, customer: 'Toko Jaya', creditLimit: 10000000, outstanding: 3200000, available: 6800000, utilization: 32 },
  { id: 2, customer: 'UD Maju', creditLimit: 8000000, outstanding: 7500000, available: 500000, utilization: 94 },
  { id: 3, customer: 'CV Sejahtera', creditLimit: 15000000, outstanding: 4200000, available: 10800000, utilization: 28 }
];

export default function SalesModule() {
  const [activeTab, setActiveTab] = useState<'orders' | 'refund' | 'invoice' | 'credit'>('orders');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Modul Penjualan (Sales)</h1>
          <p className="text-gray-600">Sales Orders, Refund, Faktur, Credit Management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
          <FileText className="w-4 h-4" />
          Create Sales Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">SO Today</p>
              <p className="text-gray-900">89</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Sales Today</p>
              <p className="text-gray-900">Rp 2.4M</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Refunds</p>
              <p className="text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Invoices</p>
              <p className="text-gray-900">76</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Sales Orders
            </button>
            <button
              onClick={() => setActiveTab('refund')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'refund' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Refund/Return
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'invoice' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Invoices
            </button>
            <button
              onClick={() => setActiveTab('credit')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'credit' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Credit Limit
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Sales Orders Tab */}
          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">SO Number</th>
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                    <th className="text-right py-3 px-4 text-gray-600">Amount</th>
                    <th className="text-center py-3 px-4 text-gray-600">Credit Status</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {salesOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{order.soNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                      <td className="py-3 px-4 text-gray-700">{order.date}</td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        Rp {(order.amount / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-center">
                        {order.creditStatus === 'OK' ? (
                          <span className="flex items-center justify-center gap-1 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                            OK
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            Over Limit
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          order.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                          order.status === 'DELIVERED' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-orange-600 hover:text-orange-700">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Refund Tab */}
          {activeTab === 'refund' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  <RotateCcw className="w-4 h-4" />
                  Create Refund
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600">Refund No</th>
                      <th className="text-left py-3 px-4 text-gray-600">Original SO</th>
                      <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                      <th className="text-left py-3 px-4 text-gray-600">Reason</th>
                      <th className="text-right py-3 px-4 text-gray-600">Amount</th>
                      <th className="text-center py-3 px-4 text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refundOrders.map((refund) => (
                      <tr key={refund.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{refund.refundNo}</td>
                        <td className="py-3 px-4 text-gray-700">{refund.originalSO}</td>
                        <td className="py-3 px-4 text-gray-700">{refund.customer}</td>
                        <td className="py-3 px-4 text-gray-700">{refund.reason}</td>
                        <td className="py-3 px-4 text-right text-gray-900">
                          Rp {(refund.amount / 1000).toFixed(0)}K
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            refund.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {refund.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="text-orange-600 hover:text-orange-700">Review</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Invoice Tab */}
          {activeTab === 'invoice' && (
            <div className="text-center py-12">
              <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-700 mb-2">Invoice Management</h3>
              <p className="text-gray-500 mb-4">Generate, print, and manage sales invoices</p>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                Generate Invoice
              </button>
            </div>
          )}

          {/* Credit Limit Tab */}
          {activeTab === 'credit' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-right py-3 px-4 text-gray-600">Credit Limit</th>
                    <th className="text-right py-3 px-4 text-gray-600">Outstanding</th>
                    <th className="text-right py-3 px-4 text-gray-600">Available</th>
                    <th className="text-center py-3 px-4 text-gray-600">Utilization</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customerCredits.map((credit) => (
                    <tr key={credit.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{credit.customer}</td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        Rp {(credit.creditLimit / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700">
                        Rp {(credit.outstanding / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        Rp {(credit.available / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                credit.utilization > 80 ? 'bg-red-500' :
                                credit.utilization > 50 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${credit.utilization}%` }}
                            />
                          </div>
                          <span className="text-gray-700 text-sm">{credit.utilization}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          credit.utilization < 80 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {credit.utilization < 80 ? 'Active' : 'High Risk'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-orange-600 hover:text-orange-700">Adjust</button>
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
