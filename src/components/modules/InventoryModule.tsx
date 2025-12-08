import { useState } from 'react';
import { Package, Barcode, TrendingDown, ArrowRightLeft, AlertCircle, CheckCircle } from 'lucide-react';

const stockData = [
  { id: 1, sku: 'PRD-001', name: 'Product Alpha', category: 'Electronics', stock: 150, min: 50, max: 200, value: 15000000, status: 'normal' },
  { id: 2, sku: 'PRD-002', name: 'Product Beta', category: 'Accessories', stock: 25, min: 50, max: 150, value: 2500000, status: 'low' },
  { id: 3, sku: 'PRD-003', name: 'Product Gamma', category: 'Electronics', stock: 0, min: 30, max: 100, value: 0, status: 'out' },
  { id: 4, sku: 'PRD-004', name: 'Product Delta', category: 'Hardware', stock: 180, min: 20, max: 100, value: 18000000, status: 'overstock' }
];

const transferData = [
  { id: 1, trNumber: 'TR-JKT-BDG-20251205-001', from: 'Jakarta', to: 'Bandung', items: 5, status: 'IN TRANSIT', date: '2025-12-05' },
  { id: 2, trNumber: 'TR-BDG-SBY-20251204-002', from: 'Bandung', to: 'Surabaya', items: 3, status: 'COMPLETED', date: '2025-12-04' },
  { id: 3, trNumber: 'TR-SBY-JKT-20251206-003', from: 'Surabaya', to: 'Jakarta', items: 8, status: 'PENDING APPROVAL', date: '2025-12-06' }
];

const movementData = [
  { id: 1, timestamp: '2025-12-07 09:15:23', type: 'IN', reference: 'GR-2025-001', product: 'Product Alpha', qty: 50, balance: 150, user: 'Admin' },
  { id: 2, timestamp: '2025-12-07 10:30:45', type: 'OUT', reference: 'SO-2025-045', product: 'Product Beta', qty: -25, balance: 25, user: 'Sales' },
  { id: 3, timestamp: '2025-12-07 11:20:18', type: 'OUT', reference: 'SO-2025-046', product: 'Product Gamma', qty: -15, balance: 0, user: 'Sales' }
];

export default function InventoryModule() {
  const [activeTab, setActiveTab] = useState<'stock' | 'transfer' | 'movement' | 'barcode'>('stock');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Modul Gudang & Inventory</h1>
          <p className="text-gray-600">Stock Management, Barcode, Transfer Antar Cabang</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Items</p>
              <p className="text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Stock Value</p>
              <p className="text-gray-900">Rp 5.2M</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Low Stock</p>
              <p className="text-gray-900">15 Items</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Out of Stock</p>
              <p className="text-gray-900">3 Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            <button
              onClick={() => setActiveTab('stock')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'stock' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Stock Inquiry
            </button>
            <button
              onClick={() => setActiveTab('transfer')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'transfer' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Transfer Antar Cabang
            </button>
            <button
              onClick={() => setActiveTab('movement')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'movement' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Stock Movement
            </button>
            <button
              onClick={() => setActiveTab('barcode')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'barcode' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Generate Barcode
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Stock Inquiry Tab */}
          {activeTab === 'stock' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">SKU</th>
                    <th className="text-left py-3 px-4 text-gray-600">Product Name</th>
                    <th className="text-left py-3 px-4 text-gray-600">Category</th>
                    <th className="text-center py-3 px-4 text-gray-600">Stock</th>
                    <th className="text-center py-3 px-4 text-gray-600">Min/Max</th>
                    <th className="text-right py-3 px-4 text-gray-600">Value</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{item.sku}</td>
                      <td className="py-3 px-4 text-gray-900">{item.name}</td>
                      <td className="py-3 px-4 text-gray-700">{item.category}</td>
                      <td className="py-3 px-4 text-center text-gray-900">{item.stock}</td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {item.min}/{item.max}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        Rp {(item.value / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          item.status === 'normal' ? 'bg-green-100 text-green-700' :
                          item.status === 'low' ? 'bg-orange-100 text-orange-700' :
                          item.status === 'out' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.status === 'normal' ? 'Normal' :
                           item.status === 'low' ? 'Low Stock' :
                           item.status === 'out' ? 'Out of Stock' :
                           'Overstock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Transfer Tab */}
          {activeTab === 'transfer' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <ArrowRightLeft className="w-4 h-4" />
                  Create Transfer
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600">TR Number</th>
                      <th className="text-left py-3 px-4 text-gray-600">From</th>
                      <th className="text-left py-3 px-4 text-gray-600">To</th>
                      <th className="text-center py-3 px-4 text-gray-600">Items</th>
                      <th className="text-left py-3 px-4 text-gray-600">Date</th>
                      <th className="text-center py-3 px-4 text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transferData.map((transfer) => (
                      <tr key={transfer.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{transfer.trNumber}</td>
                        <td className="py-3 px-4 text-gray-700">{transfer.from}</td>
                        <td className="py-3 px-4 text-gray-700">{transfer.to}</td>
                        <td className="py-3 px-4 text-center text-gray-900">{transfer.items}</td>
                        <td className="py-3 px-4 text-gray-700">{transfer.date}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            transfer.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                            transfer.status === 'IN TRANSIT' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {transfer.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="text-green-600 hover:text-green-700">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Movement Tab */}
          {activeTab === 'movement' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Timestamp</th>
                    <th className="text-center py-3 px-4 text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 text-gray-600">Reference</th>
                    <th className="text-left py-3 px-4 text-gray-600">Product</th>
                    <th className="text-center py-3 px-4 text-gray-600">Qty</th>
                    <th className="text-center py-3 px-4 text-gray-600">Balance After</th>
                    <th className="text-left py-3 px-4 text-gray-600">User</th>
                  </tr>
                </thead>
                <tbody>
                  {movementData.map((movement) => (
                    <tr key={movement.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700 text-sm">{movement.timestamp}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          movement.type === 'IN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {movement.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{movement.reference}</td>
                      <td className="py-3 px-4 text-gray-900">{movement.product}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={movement.qty > 0 ? 'text-green-600' : 'text-red-600'}>
                          {movement.qty > 0 ? '+' : ''}{movement.qty}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-900">{movement.balance}</td>
                      <td className="py-3 px-4 text-gray-700">{movement.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Barcode Tab */}
          {activeTab === 'barcode' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Select Branch</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Jakarta</option>
                    <option>Bandung</option>
                    <option>Surabaya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Barcode Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Code 128</option>
                    <option>Code 39</option>
                    <option>EAN-13</option>
                    <option>QR Code</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Label Size</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Small (50x25mm)</option>
                    <option>Medium (70x30mm)</option>
                    <option>Large (100x50mm)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    defaultValue={1}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="showPrice" className="w-4 h-4" />
                <label htmlFor="showPrice" className="text-gray-700">Show price on label</label>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Barcode className="w-4 h-4" />
                  Generate Barcode
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Preview
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
