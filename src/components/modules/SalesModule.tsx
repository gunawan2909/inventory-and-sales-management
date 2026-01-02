import { useState } from 'react';
import { FileText, RotateCcw, Receipt, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import Modal from '../Modal';

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

const salesInvoices = [
  { id: 1, invoiceNo: 'INV-JKT-20251207-001', soNumber: 'SO-JKT-20251207-001', customer: 'Toko Jaya', invoiceDate: '2025-12-07', dueDate: '2026-01-06', amount: 5500000, paid: 0, balance: 5500000, status: 'UNPAID' },
  { id: 2, invoiceNo: 'INV-JKT-20251207-002', soNumber: 'SO-JKT-20251207-002', customer: 'UD Maju', invoiceDate: '2025-12-07', dueDate: '2026-01-06', amount: 8200000, paid: 0, balance: 8200000, status: 'UNPAID' },
  { id: 3, invoiceNo: 'INV-JKT-20251206-045', soNumber: 'SO-JKT-20251206-045', customer: 'CV Sejahtera', invoiceDate: '2025-12-06', dueDate: '2026-01-05', amount: 3400000, paid: 3400000, balance: 0, status: 'PAID' },
  { id: 4, invoiceNo: 'INV-JKT-20251205-038', soNumber: 'SO-JKT-20251205-038', customer: 'Toko Jaya', invoiceDate: '2025-12-05', dueDate: '2026-01-04', amount: 6200000, paid: 3000000, balance: 3200000, status: 'PARTIAL' },
  { id: 5, invoiceNo: 'INV-JKT-20251204-032', soNumber: 'SO-JKT-20251204-032', customer: 'UD Makmur', invoiceDate: '2025-12-04', dueDate: '2025-12-19', amount: 4500000, paid: 0, balance: 4500000, status: 'OVERDUE' }
];

export default function SalesModule() {
  const [activeTab, setActiveTab] = useState<'orders' | 'refund' | 'invoice' | 'credit'>('orders');
  const [showCreateSO, setShowCreateSO] = useState(false);
  const [showCreateRefund, setShowCreateRefund] = useState(false);
  const [selectedSO, setSelectedSO] = useState<typeof salesOrders[0] | null>(null);
  const [showSODetail, setShowSODetail] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Modul Penjualan (Sales)</h1>
          <p className="text-gray-600">Sales Orders, Refund, Faktur, Credit Management</p>
        </div>
        <button
          onClick={() => setShowCreateSO(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
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
                        <button
                          onClick={() => {
                            setSelectedSO(order);
                            setShowSODetail(true);
                          }}
                          className="text-orange-600 hover:text-orange-700"
                        >
                          View
                        </button>
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
                <button
                  onClick={() => setShowCreateRefund(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
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
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {salesInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{invoice.invoiceNo}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.soNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.customer}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.invoiceDate}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.dueDate}</td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        Rp {(invoice.amount / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700">
                        Rp {invoice.paid > 0 ? (invoice.paid / 1000000).toFixed(1) + 'M' : '0'}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        Rp {invoice.balance > 0 ? (invoice.balance / 1000000).toFixed(1) + 'M' : '0'}
                      </td>
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
                      <td className="py-3 px-4 text-center">
                        <button className="text-orange-600 hover:text-orange-700">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

      {/* Create Sales Order Modal */}
      <Modal
        isOpen={showCreateSO}
        onClose={() => setShowCreateSO(false)}
        title="Create Sales Order"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">SO Number</label>
              <input
                type="text"
                defaultValue="SO-JKT-20251208-003"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Order Date</label>
              <input
                type="date"
                defaultValue="2025-12-08"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Select Customer *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="">-- Select Customer --</option>
              <option>Toko Jaya</option>
              <option>UD Maju</option>
              <option>CV Sejahtera</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Payment Terms</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Cash</option>
                <option>Credit 30 Days</option>
                <option>Credit 45 Days</option>
                <option>Credit 60 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Delivery Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-gray-900 mb-3">Items</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-400 text-sm">
              Add items to this sales order
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900">Rp 0</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">PPN (11%):</span>
              <span className="text-gray-900">Rp 0</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-900 font-semibold">Total:</span>
              <span className="text-gray-900 font-semibold">Rp 0</span>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => setShowCreateSO(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Sales Order created successfully!');
                setShowCreateSO(false);
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Create SO
            </button>
          </div>
        </div>
      </Modal>

      {/* Create Refund Modal */}
      <Modal
        isOpen={showCreateRefund}
        onClose={() => setShowCreateRefund(false)}
        title="Create Refund / Return"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Refund Number</label>
            <input
              type="text"
              defaultValue="REF-20251208-003"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Original Sales Order *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="">-- Select SO --</option>
              <option>SO-JKT-20251207-001 - Toko Jaya</option>
              <option>SO-JKT-20251206-045 - CV Sejahtera</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Customer</label>
            <input
              type="text"
              value="Toko Jaya"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Reason for Refund *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="">-- Select Reason --</option>
              <option>Damaged Product</option>
              <option>Wrong Item</option>
              <option>Quality Issue</option>
              <option>Customer Request</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Refund Amount</label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              rows={3}
              placeholder="Additional details about the refund..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => setShowCreateRefund(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Refund created successfully!');
                setShowCreateRefund(false);
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Create Refund
            </button>
          </div>
        </div>
      </Modal>

      {/* Sales Order Detail Modal */}
      <Modal
        isOpen={showSODetail}
        onClose={() => setShowSODetail(false)}
        title="Sales Order Detail"
        size="lg"
      >
        {selectedSO && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div>
                <label className="block text-gray-600 text-sm mb-1">SO Number</label>
                <p className="text-gray-900 font-medium">{selectedSO.soNumber}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Date</label>
                <p className="text-gray-900">{selectedSO.date}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Customer</label>
                <p className="text-gray-900">{selectedSO.customer}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Status</label>
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  selectedSO.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                  selectedSO.status === 'DELIVERED' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {selectedSO.status}
                </span>
              </div>
            </div>

            <div className="pb-4 border-b">
              <label className="block text-gray-600 text-sm mb-2">Credit Status</label>
              <div className="flex items-center gap-2">
                {selectedSO.creditStatus === 'OK' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Credit OK</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 font-medium">Over Credit Limit</span>
                  </>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-gray-900 font-semibold">Rp {(selectedSO.amount / 1000000).toFixed(1)}M</span>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 font-medium mb-3">Order Items</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 text-sm">
                Item details would be displayed here
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                onClick={() => setShowSODetail(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                Print SO
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
