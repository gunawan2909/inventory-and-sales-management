import { useState } from 'react';
import { Truck, Package, CheckCircle, MapPin, Clock } from 'lucide-react';

const deliveries = [
  { id: 1, deliveryNo: 'DLV-20251207-001', customer: 'Toko Jaya', address: 'Jakarta Selatan', items: 5, driver: 'Budi', status: 'IN TRANSIT', eta: '14:30' },
  { id: 2, deliveryNo: 'DLV-20251207-002', customer: 'UD Maju', address: 'Jakarta Barat', items: 3, driver: 'Andi', status: 'DELIVERED', eta: '-' },
  { id: 3, deliveryNo: 'DLV-20251207-003', customer: 'CV Sejahtera', address: 'Tangerang', items: 8, driver: 'Dedi', status: 'PICKING', eta: '16:00' }
];

const pickingTasks = [
  { id: 1, pickNo: 'PK-JKT-20251207-001', soNumber: 'SO-JKT-20251207-001', items: 5, picked: 5, status: 'COMPLETED' },
  { id: 2, pickNo: 'PK-JKT-20251207-002', soNumber: 'SO-JKT-20251207-002', items: 8, picked: 3, status: 'IN PROGRESS' },
  { id: 3, pickNo: 'PK-JKT-20251207-003', soNumber: 'SO-JKT-20251207-003', items: 3, picked: 0, status: 'NOT STARTED' }
];

const packingTasks = [
  { id: 1, packNo: 'PACK-20251207-001', soNumber: 'SO-JKT-20251207-001', boxes: 2, weight: 15.5, status: 'COMPLETED' },
  { id: 2, packNo: 'PACK-20251207-002', soNumber: 'SO-JKT-20251207-002', boxes: 3, weight: 22.3, status: 'IN PROGRESS' }
];

export default function DeliveryModule() {
  const [activeTab, setActiveTab] = useState<'deliveries' | 'packing'>('deliveries');

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl lg:text-2xl text-gray-900 mb-1 font-medium">Modul Delivery / Ekspedisi</h1>
          <p className="text-sm md:text-base text-gray-600">Packing, Pengiriman</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">In Transit</p>
              <p className="text-gray-900">23</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Delivered Today</p>
              <p className="text-gray-900">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Picking</p>
              <p className="text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">On Time %</p>
              <p className="text-gray-900">94%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            <button
              onClick={() => setActiveTab('deliveries')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'deliveries' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Deliveries
            </button>
            <button
              onClick={() => setActiveTab('packing')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'packing' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Packing
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Deliveries Tab */}
          {activeTab === 'deliveries' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Delivery No</th>
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Address</th>
                    <th className="text-center py-3 px-4 text-gray-600">Items</th>
                    <th className="text-left py-3 px-4 text-gray-600">Driver</th>
                    <th className="text-center py-3 px-4 text-gray-600">ETA</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((delivery) => (
                    <tr key={delivery.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{delivery.deliveryNo}</td>
                      <td className="py-3 px-4 text-gray-700">{delivery.customer}</td>
                      <td className="py-3 px-4 text-gray-700">{delivery.address}</td>
                      <td className="py-3 px-4 text-center text-gray-900">{delivery.items}</td>
                      <td className="py-3 px-4 text-gray-700">{delivery.driver}</td>
                      <td className="py-3 px-4 text-center text-gray-700">{delivery.eta}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          delivery.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                          delivery.status === 'IN TRANSIT' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {delivery.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-cyan-600 hover:text-cyan-700">Track</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Packing Tab */}
          {activeTab === 'packing' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Pack No</th>
                    <th className="text-left py-3 px-4 text-gray-600">SO Number</th>
                    <th className="text-center py-3 px-4 text-gray-600">Boxes</th>
                    <th className="text-center py-3 px-4 text-gray-600">Weight (kg)</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {packingTasks.map((task) => (
                    <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{task.packNo}</td>
                      <td className="py-3 px-4 text-gray-700">{task.soNumber}</td>
                      <td className="py-3 px-4 text-center text-gray-900">{task.boxes}</td>
                      <td className="py-3 px-4 text-center text-gray-900">{task.weight}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          task.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-cyan-600 hover:text-cyan-700">Print Label</button>
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
