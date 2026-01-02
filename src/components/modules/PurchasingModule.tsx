import { useState } from 'react';
import { Search, Plus, FileText, Package, Receipt, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Modal from '../Modal';

const vendors = [
  { id: 1, code: 'V001', name: 'PT Supplier Jaya', status: 'ACTIVE', isPkp: true, paymentTerm: 'NET 30', creditLimit: 50000000, outstanding: 12500000 },
  { id: 2, code: 'V002', name: 'CV Maju Terus', status: 'ACTIVE', isPkp: false, paymentTerm: 'NET 45', creditLimit: 30000000, outstanding: 8200000 },
  { id: 3, code: 'V003', name: 'UD Sejahtera', status: 'ACTIVE', isPkp: true, paymentTerm: 'COD', creditLimit: 20000000, outstanding: 0 }
];

const purchaseOrders = [
  { id: 1, poNumber: 'PO-2025-001', vendor: 'PT Supplier Jaya', date: '2025-12-01', amount: 25000000, status: 'APPROVED', qtyReceived: 50, qtyOrdered: 100 },
  { id: 2, poNumber: 'PO-2025-002', vendor: 'CV Maju Terus', date: '2025-12-03', amount: 18500000, status: 'PARTIALLY RECEIVED', qtyReceived: 75, qtyOrdered: 150 },
  { id: 3, poNumber: 'PO-2025-003', vendor: 'UD Sejahtera', date: '2025-12-05', amount: 12000000, status: 'PENDING', qtyReceived: 0, qtyOrdered: 80 }
];

const invoices = [
  { id: 1, invoiceNumber: 'INV-2025-001', poNumber: 'PO-2025-001', vendor: 'PT Supplier Jaya', date: '2025-12-05', dueDate: '2026-01-04', amount: 25000000, status: 'PAID' },
  { id: 2, invoiceNumber: 'INV-2025-002', poNumber: 'PO-2025-002', vendor: 'CV Maju Terus', date: '2025-12-08', dueDate: '2026-01-22', amount: 18500000, status: 'PENDING' },
  { id: 3, invoiceNumber: 'INV-2025-003', poNumber: 'PO-2025-003', vendor: 'UD Sejahtera', date: '2025-12-10', dueDate: '2026-01-09', amount: 12000000, status: 'OVERDUE' }
];

const matchingData = [
  { id: 1, poNumber: 'PO-2025-001', grNumber: 'GR-2025-001', invoiceNo: 'INV-V001-123', status: 'MATCHED', variance: 0 },
  { id: 2, poNumber: 'PO-2025-002', grNumber: 'GR-2025-002', invoiceNo: 'INV-V002-456', status: 'VARIANCE QTY', variance: 5 },
  { id: 3, poNumber: 'PO-2025-003', grNumber: '-', invoiceNo: '-', status: 'PENDING', variance: 0 }
];

export default function PurchasingModule() {
  const [activeTab, setActiveTab] = useState<'vendors' | 'po' | 'invoice' | 'matching'>('vendors');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreatePO, setShowCreatePO] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showViewPO, setShowViewPO] = useState(false);
  const [showViewInvoice, setShowViewInvoice] = useState(false);
  const [selectedPO, setSelectedPO] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Modul Pembelian (Purchasing)</h1>
          <p className="text-gray-600">Vendor Management, Purchase Orders, Three-Way Matching</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Active PO</p>
              <p className="text-gray-900">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Goods Received</p>
              <p className="text-gray-900">38</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Invoices Matched</p>
              <p className="text-gray-900">32</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Variance Cases</p>
              <p className="text-gray-900">6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'vendors' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Pilih Vendor
            </button>
            <button
              onClick={() => setActiveTab('po')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'po' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Purchase Orders
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'invoice' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Invoice
            </button>
            <button
              onClick={() => setActiveTab('matching')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'matching' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              PO ⇄ GR ⇄ Invoice Matching
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Search and Action Buttons */}
          <div className="mb-4 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {activeTab === 'po' && (
              <button
                onClick={() => setShowCreatePO(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Create New PO
              </button>
            )}
            {activeTab === 'invoice' && (
              <button
                onClick={() => setShowCreateInvoice(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Create New Invoice
              </button>
            )}
          </div>

          {/* Vendors Tab */}
          {activeTab === 'vendors' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Code</th>
                    <th className="text-left py-3 px-4 text-gray-600">Vendor Name</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">PKP</th>
                    <th className="text-left py-3 px-4 text-gray-600">Payment Term</th>
                    <th className="text-right py-3 px-4 text-gray-600">Credit Limit</th>
                    <th className="text-right py-3 px-4 text-gray-600">Outstanding</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{vendor.code}</td>
                      <td className="py-3 px-4 text-gray-900">{vendor.name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                          {vendor.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {vendor.isPkp ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">PKP</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">Non-PKP</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{vendor.paymentTerm}</td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        Rp {(vendor.creditLimit / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={vendor.outstanding > vendor.creditLimit * 0.8 ? 'text-red-600' : 'text-gray-900'}>
                          Rp {(vendor.outstanding / 1000000).toFixed(1)}M
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowVendorDetails(true);
                          }}
                          className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Purchase Orders Tab */}
          {activeTab === 'po' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">PO Number</th>
                    <th className="text-left py-3 px-4 text-gray-600">Vendor</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                    <th className="text-right py-3 px-4 text-gray-600">Amount</th>
                    <th className="text-center py-3 px-4 text-gray-600">Qty (Received/Ordered)</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((po) => (
                    <tr key={po.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{po.poNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{po.vendor}</td>
                      <td className="py-3 px-4 text-gray-700">{po.date}</td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        Rp {(po.amount / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {po.qtyReceived}/{po.qtyOrdered}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          po.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                          po.status === 'PARTIALLY RECEIVED' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {po.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedPO(po);
                            setShowViewPO(true);
                          }}
                          className="text-purple-600 hover:text-purple-700"
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

          {/* Invoice Tab */}
          {activeTab === 'invoice' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Invoice Number</th>
                    <th className="text-left py-3 px-4 text-gray-600">PO Number</th>
                    <th className="text-left py-3 px-4 text-gray-600">Vendor</th>
                    <th className="text-left py-3 px-4 text-gray-600">Invoice Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Due Date</th>
                    <th className="text-right py-3 px-4 text-gray-600">Amount</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{invoice.invoiceNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.poNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.vendor}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.date}</td>
                      <td className="py-3 px-4 text-gray-700">{invoice.dueDate}</td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        Rp {(invoice.amount / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setShowViewInvoice(true);
                          }}
                          className="text-purple-600 hover:text-purple-700"
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

          {/* Matching Tab */}
          {activeTab === 'matching' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">PO Number</th>
                    <th className="text-left py-3 px-4 text-gray-600">GR Number</th>
                    <th className="text-left py-3 px-4 text-gray-600">Invoice No</th>
                    <th className="text-center py-3 px-4 text-gray-600">Variance %</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {matchingData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{item.poNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{item.grNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{item.invoiceNo}</td>
                      <td className="py-3 px-4 text-center">
                        {item.variance > 0 ? (
                          <span className="text-orange-600">{item.variance}%</span>
                        ) : (
                          <span className="text-green-600">0%</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm flex items-center justify-center gap-1 ${
                          item.status === 'MATCHED' ? 'bg-green-100 text-green-700' :
                          item.status === 'VARIANCE QTY' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.status === 'MATCHED' && <CheckCircle className="w-4 h-4" />}
                          {item.status === 'VARIANCE QTY' && <AlertTriangle className="w-4 h-4" />}
                          {item.status === 'PENDING' && <Clock className="w-4 h-4" />}
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-purple-600 hover:text-purple-700">
                          {item.status === 'PENDING' ? 'Match' : 'Review'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create PO Modal */}
      <Modal
        isOpen={showCreatePO}
        onClose={() => setShowCreatePO(false)}
        title="Create New Purchase Order"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">PO Number</label>
              <input
                type="text"
                defaultValue="PO-2025-004"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">PO Date</label>
              <input
                type="date"
                defaultValue="2025-12-08"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Select Vendor *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">-- Select Vendor --</option>
              {vendors.map(v => (
                <option key={v.id} value={v.id}>{v.code} - {v.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Payment Terms</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>NET 30</option>
                <option>NET 45</option>
                <option>NET 60</option>
                <option>COD</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Expected Delivery Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-gray-900 mb-3">Items</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <label className="block text-gray-700 text-sm mb-1">Product</label>
                  <input
                    type="text"
                    placeholder="Search product..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm mb-1">Qty</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm mb-1">Unit</label>
                  <input
                    type="text"
                    placeholder="PCS"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm mb-1">Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="col-span-2">
                  <button className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                    Add Item
                  </button>
                </div>
              </div>
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
              <span className="text-gray-900">Total:</span>
              <span className="text-gray-900">Rp 0</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              rows={3}
              placeholder="Additional notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => setShowCreatePO(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Purchase Order created successfully!');
                setShowCreatePO(false);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Create PO
            </button>
          </div>
        </div>
      </Modal>

      {/* Create Invoice Modal */}
      <Modal
        isOpen={showCreateInvoice}
        onClose={() => setShowCreateInvoice(false)}
        title="Create New Invoice"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Invoice Number</label>
              <input
                type="text"
                defaultValue="INV-2025-004"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Invoice Date</label>
              <input
                type="date"
                defaultValue="2025-12-08"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">PO Number *</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- Select PO Number --</option>
                {purchaseOrders.map(po => (
                  <option key={po.id} value={po.poNumber}>{po.poNumber} - {po.vendor}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Select Vendor *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-- Select Vendor --</option>
              {vendors.map(v => (
                <option key={v.id} value={v.id}>{v.code} - {v.name}</option>
              ))}
            </select>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-gray-900 mb-3">Items</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <label className="block text-gray-700 text-sm mb-1">Product</label>
                  <input
                    type="text"
                    placeholder="Search product..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm mb-1">Qty</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm mb-1">Unit</label>
                  <input
                    type="text"
                    placeholder="PCS"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm mb-1">Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Add Item
                  </button>
                </div>
              </div>
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
              <span className="text-gray-900">Total:</span>
              <span className="text-gray-900">Rp 0</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              rows={3}
              placeholder="Additional notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => setShowCreateInvoice(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Invoice created successfully!');
                setShowCreateInvoice(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Invoice
            </button>
          </div>
        </div>
      </Modal>

      {/* View PO Modal */}
      <Modal
        isOpen={showViewPO}
        onClose={() => setShowViewPO(false)}
        title="Purchase Order Details"
        size="lg"
      >
        {selectedPO && (
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">PO Number</p>
                  <p className="text-gray-900">{selectedPO.poNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    selectedPO.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                    selectedPO.status === 'PARTIALLY RECEIVED' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedPO.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Vendor</p>
                  <p className="text-gray-900">{selectedPO.vendor}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Date</p>
                  <p className="text-gray-900">{selectedPO.date}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">Items</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3 text-gray-600 text-sm">Product</th>
                      <th className="text-center py-2 px-3 text-gray-600 text-sm">Qty Ordered</th>
                      <th className="text-center py-2 px-3 text-gray-600 text-sm">Qty Received</th>
                      <th className="text-right py-2 px-3 text-gray-600 text-sm">Price</th>
                      <th className="text-right py-2 px-3 text-gray-600 text-sm">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2 px-3 text-gray-900">Product Sample</td>
                      <td className="py-2 px-3 text-center text-gray-700">{selectedPO.qtyOrdered}</td>
                      <td className="py-2 px-3 text-center text-gray-700">{selectedPO.qtyReceived}</td>
                      <td className="py-2 px-3 text-right text-gray-700">Rp 250,000</td>
                      <td className="py-2 px-3 text-right text-gray-900">Rp {(selectedPO.amount / 1000000).toFixed(1)}M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">Rp {(selectedPO.amount / 1.11 / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">PPN (11%):</span>
                <span className="text-gray-900">Rp {(selectedPO.amount * 0.11 / 1.11 / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">Rp {(selectedPO.amount / 1000000).toFixed(1)}M</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                onClick={() => setShowViewPO(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Print PDF
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Invoice Modal */}
      <Modal
        isOpen={showViewInvoice}
        onClose={() => setShowViewInvoice(false)}
        title="Invoice Details"
        size="lg"
      >
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Invoice Number</p>
                  <p className="text-gray-900">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">PO Number</p>
                  <p className="text-gray-900">{selectedInvoice.poNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Vendor</p>
                  <p className="text-gray-900">{selectedInvoice.vendor}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Invoice Date</p>
                  <p className="text-gray-900">{selectedInvoice.date}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Due Date</p>
                  <p className="text-gray-900">{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    selectedInvoice.status === 'PAID' ? 'bg-green-100 text-green-700' :
                    selectedInvoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedInvoice.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">Items</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3 text-gray-600 text-sm">Product</th>
                      <th className="text-center py-2 px-3 text-gray-600 text-sm">Qty</th>
                      <th className="text-center py-2 px-3 text-gray-600 text-sm">Unit</th>
                      <th className="text-right py-2 px-3 text-gray-600 text-sm">Price</th>
                      <th className="text-right py-2 px-3 text-gray-600 text-sm">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2 px-3 text-gray-900">Product Sample</td>
                      <td className="py-2 px-3 text-center text-gray-700">100</td>
                      <td className="py-2 px-3 text-center text-gray-700">PCS</td>
                      <td className="py-2 px-3 text-right text-gray-700">Rp 250,000</td>
                      <td className="py-2 px-3 text-right text-gray-900">Rp {(selectedInvoice.amount / 1000000).toFixed(1)}M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">Rp {(selectedInvoice.amount / 1.11 / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">PPN (11%):</span>
                <span className="text-gray-900">Rp {(selectedInvoice.amount * 0.11 / 1.11 / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">Rp {(selectedInvoice.amount / 1000000).toFixed(1)}M</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                onClick={() => setShowViewInvoice(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Print PDF
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Vendor Details Modal */}
      <Modal
        isOpen={showVendorDetails}
        onClose={() => setShowVendorDetails(false)}
        title="Vendor Details"
        size="md"
      >
        {selectedVendor && (
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Vendor Code</p>
                  <p className="text-gray-900 font-semibold">{selectedVendor.code}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                    {selectedVendor.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600 text-sm">Vendor Name</p>
                  <p className="text-gray-900 font-semibold">{selectedVendor.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">PKP Status</p>
                  {selectedVendor.isPkp ? (
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">PKP</span>
                  ) : (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">Non-PKP</span>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Payment Terms</p>
                  <p className="text-gray-900">{selectedVendor.paymentTerm}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-900 font-semibold mb-3">Credit Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Credit Limit:</span>
                  <span className="text-gray-900 font-medium">Rp {(selectedVendor.creditLimit / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Outstanding:</span>
                  <span className={selectedVendor.outstanding > selectedVendor.creditLimit * 0.8 ? 'text-red-600 font-medium' : 'text-gray-900'}>
                    Rp {(selectedVendor.outstanding / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="text-green-600 font-medium">
                    Rp {((selectedVendor.creditLimit - selectedVendor.outstanding) / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 text-sm">Utilization:</span>
                    <span className="text-gray-900 text-sm">
                      {((selectedVendor.outstanding / selectedVendor.creditLimit) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        (selectedVendor.outstanding / selectedVendor.creditLimit) > 0.8 ? 'bg-red-500' :
                        (selectedVendor.outstanding / selectedVendor.creditLimit) > 0.5 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${(selectedVendor.outstanding / selectedVendor.creditLimit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                onClick={() => setShowVendorDetails(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowVendorDetails(false);
                  setShowCreatePO(true);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create PO for This Vendor
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
