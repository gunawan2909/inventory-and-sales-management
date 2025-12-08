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
  const [activeTab, setActiveTab] = useState<'deliveries' | 'picking' | 'packing' | 'tracking'>('deliveries');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Modul Delivery / Ekspedisi</h1>
          <p className="text-gray-600">Picking, Packing, Pengiriman, Tracking</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
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
        <div className="bg-white p-4 rounded-lg border border-gray-200">
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
        <div className="bg-white p-4 rounded-lg border border-gray-200">
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
        <div className="bg-white p-4 rounded-lg border border-gray-200">
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
              onClick={() => setActiveTab('picking')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'picking' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Picking
            </button>
            <button
              onClick={() => setActiveTab('packing')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'packing' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Packing
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'tracking' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Live Tracking
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

          {/* Picking Tab */}
          {activeTab === 'picking' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Pick No</th>
                    <th className="text-left py-3 px-4 text-gray-600">SO Number</th>
                    <th className="text-center py-3 px-4 text-gray-600">Total Items</th>
                    <th className="text-center py-3 px-4 text-gray-600">Picked</th>
                    <th className="text-center py-3 px-4 text-gray-600">Progress</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pickingTasks.map((task) => {
                    const progress = (task.picked / task.items) * 100;
                    return (
                      <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{task.pickNo}</td>
                        <td className="py-3 px-4 text-gray-700">{task.soNumber}</td>
                        <td className="py-3 px-4 text-center text-gray-900">{task.items}</td>
                        <td className="py-3 px-4 text-center text-gray-900">{task.picked}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-cyan-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-gray-700 text-sm">{Math.round(progress)}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            task.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                            task.status === 'IN PROGRESS' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="text-cyan-600 hover:text-cyan-700">
                            {task.status === 'NOT STARTED' ? 'Start' : 'View'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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

          {/* Tracking Tab */}
          {activeTab === 'tracking' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-700 mb-2">Live GPS Tracking</h3>
                <p className="text-gray-500">Real-time delivery tracking map would appear here</p>
                <div className="mt-4 flex justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-600 text-sm">In Transit (23)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-gray-600 text-sm">Delivered (45)</span>
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
