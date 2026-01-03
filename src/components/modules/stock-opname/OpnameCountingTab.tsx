import { useState } from 'react';
import { Play, CheckCircle, Clock, MapPin, Camera, MessageSquare, Barcode, Search, AlertTriangle } from 'lucide-react';
import Modal from '../../Modal';

// Types
interface CountSheet {
  id: number;
  sheet_no: string;
  plan_no: string;
  location: string;
  zone: string;
  items_total: number;
  items_counted: number;
  progress_pct: number;
  status: 'not_started' | 'in_progress' | 'completed';
  assigned_to: string;
  started_at: string | null;
}

interface CountItem {
  id: number;
  product_code: string;
  product_name: string;
  uom: string;
  system_qty: number | null;
  counted_qty: number | null;
  status: 'pending' | 'counted' | 'zero';
  has_photo: boolean;
  has_remark: boolean;
}

// Mock data
const mockCountSheets: CountSheet[] = [
  {
    id: 1,
    sheet_no: 'CS-001',
    plan_no: 'SO-BDG-20251210-002',
    location: 'Bandung Warehouse',
    zone: 'Zone A - Rack 1-5',
    items_total: 45,
    items_counted: 32,
    progress_pct: 71,
    status: 'in_progress',
    assigned_to: 'John Doe',
    started_at: '2025-12-10 09:15:00'
  },
  {
    id: 2,
    sheet_no: 'CS-002',
    plan_no: 'SO-BDG-20251210-002',
    location: 'Bandung Warehouse',
    zone: 'Zone B - Rack 6-10',
    items_total: 38,
    items_counted: 0,
    progress_pct: 0,
    status: 'not_started',
    assigned_to: 'Jane Smith',
    started_at: null
  },
  {
    id: 3,
    sheet_no: 'CS-003',
    plan_no: 'SO-BDG-20251210-002',
    location: 'Bandung Warehouse',
    zone: 'Zone C - Rack 11-15',
    items_total: 52,
    items_counted: 52,
    progress_pct: 100,
    status: 'completed',
    assigned_to: 'Bob Wilson',
    started_at: '2025-12-10 09:00:00'
  }
];

const mockCountItems: CountItem[] = [
  { id: 1, product_code: 'PRD-001', product_name: 'Product Alpha', uom: 'PCS', system_qty: 150, counted_qty: 148, status: 'counted', has_photo: false, has_remark: true },
  { id: 2, product_code: 'PRD-002', product_name: 'Product Beta', uom: 'PCS', system_qty: 50, counted_qty: null, status: 'pending', has_photo: false, has_remark: false },
  { id: 3, product_code: 'PRD-003', product_name: 'Product Gamma', uom: 'BOX', system_qty: 30, counted_qty: 0, status: 'zero', has_photo: true, has_remark: true },
  { id: 4, product_code: 'PRD-004', product_name: 'Product Delta', uom: 'PCS', system_qty: 100, counted_qty: null, status: 'pending', has_photo: false, has_remark: false },
];

export default function OpnameCountingTab() {
  const [countSheets] = useState<CountSheet[]>(mockCountSheets);
  const [selectedSheet, setSelectedSheet] = useState<CountSheet | null>(null);
  const [countItems, setCountItems] = useState<CountItem[]>(mockCountItems);
  const [showCountModal, setShowCountModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CountItem | null>(null);
  const [countMethod, setCountMethod] = useState<'barcode' | 'manual'>('manual');
  const [countQty, setCountQty] = useState('');
  const [remark, setRemark] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles = {
      not_started: 'bg-gray-100 text-gray-700',
      in_progress: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      counted: 'bg-green-100 text-green-700',
      zero: 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles] || styles.not_started;
  };

  const getStatusText = (status: string) => {
    const text = {
      not_started: 'Not Started',
      in_progress: 'In Progress',
      completed: 'Completed',
      pending: 'Pending',
      counted: 'Counted',
      zero: 'Zero Count'
    };
    return text[status as keyof typeof text] || status;
  };

  const handleStartSheet = (sheet: CountSheet) => {
    if (confirm(`Start counting for ${sheet.sheet_no}?`)) {
      setSelectedSheet(sheet);
    }
  };

  const handleOpenCount = (item: CountItem) => {
    setSelectedItem(item);
    setCountQty(item.counted_qty?.toString() || '');
    setRemark('');
    setShowCountModal(true);
  };

  const handleSaveCount = () => {
    if (!selectedItem) return;

    if (!countQty || parseFloat(countQty) < 0) {
      alert('Please enter a valid quantity');
      return;
    }

    const qty = parseFloat(countQty);

    // Update the item
    setCountItems(prevItems =>
      prevItems.map(item =>
        item.id === selectedItem.id
          ? { ...item, counted_qty: qty, status: qty === 0 ? 'zero' : 'counted', has_remark: remark.length > 0 }
          : item
      )
    );

    alert('Count saved successfully!');
    setShowCountModal(false);
    setSelectedItem(null);
    setCountQty('');
    setRemark('');
  };

  const handleBarcodeSimulation = () => {
    // Simulate barcode scan
    const randomQty = Math.floor(Math.random() * 100) + 1;
    setCountQty(randomQty.toString());
    alert(`Barcode scanned! Product identified: ${selectedItem?.product_name}`);
  };

  const handleCompleteSheet = (sheet: CountSheet) => {
    const pendingItems = countItems.filter(item => item.status === 'pending').length;
    if (pendingItems > 0) {
      alert(`Cannot complete sheet: ${pendingItems} items not counted yet`);
      return;
    }

    if (confirm(`Complete counting for ${sheet.sheet_no}? This will require your digital signature.`)) {
      alert('Count sheet completed and signed successfully!');
    }
  };

  return (
    <div className="space-y-4">
      {/* Active Opname Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-900 font-medium">Active Opname: SO-BDG-20251210-002</p>
              <p className="text-blue-700 text-sm">Bandung Warehouse - Started at 09:00</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-900 font-medium">Progress: 62%</p>
            <p className="text-blue-700 text-sm">84 / 135 items counted</p>
          </div>
        </div>
      </div>

      {/* Count Sheets List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {countSheets.map((sheet) => (
          <div key={sheet.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-gray-900 font-medium">{sheet.sheet_no}</h3>
                <p className="text-sm text-gray-600">{sheet.zone}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(sheet.status)}`}>
                {getStatusText(sheet.status)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{sheet.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  {sheet.started_at ? `Started at ${sheet.started_at}` : 'Not started'}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900 font-medium">
                  {sheet.items_counted} / {sheet.items_total} items ({sheet.progress_pct}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    sheet.progress_pct === 100 ? 'bg-green-600' : 'bg-blue-600'
                  }`}
                  style={{ width: `${sheet.progress_pct}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {sheet.status === 'not_started' && (
                <button
                  onClick={() => handleStartSheet(sheet)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Play className="w-4 h-4" />
                  Start Counting
                </button>
              )}
              {sheet.status === 'in_progress' && (
                <>
                  <button
                    onClick={() => setSelectedSheet(sheet)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue Counting
                  </button>
                  {sheet.progress_pct === 100 && (
                    <button
                      onClick={() => handleCompleteSheet(sheet)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Complete
                    </button>
                  )}
                </>
              )}
              {sheet.status === 'completed' && (
                <button
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Counting Detail (when sheet is selected) */}
      {selectedSheet && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-900 font-medium">
                  Counting: {selectedSheet.sheet_no} - {selectedSheet.zone}
                </h3>
                <p className="text-sm text-gray-600">
                  {countItems.filter(i => i.status === 'counted' || i.status === 'zero').length} / {countItems.length} items counted
                </p>
              </div>
              <button
                onClick={() => setSelectedSheet(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Search/Scan Bar */}
            <div className="mb-4 flex gap-2">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search product or scan barcode..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Barcode className="w-4 h-4" />
                Scan
              </button>
            </div>

            {/* Items List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 text-gray-600 text-sm font-medium">Product Code</th>
                    <th className="text-left py-2 px-3 text-gray-600 text-sm font-medium">Product Name</th>
                    <th className="text-center py-2 px-3 text-gray-600 text-sm font-medium">UOM</th>
                    <th className="text-center py-2 px-3 text-gray-600 text-sm font-medium">System Qty</th>
                    <th className="text-center py-2 px-3 text-gray-600 text-sm font-medium">Counted Qty</th>
                    <th className="text-center py-2 px-3 text-gray-600 text-sm font-medium">Status</th>
                    <th className="text-center py-2 px-3 text-gray-600 text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {countItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3 text-gray-900 font-mono text-sm">{item.product_code}</td>
                      <td className="py-2 px-3 text-gray-700">{item.product_name}</td>
                      <td className="py-2 px-3 text-center text-gray-600 text-sm">{item.uom}</td>
                      <td className="py-2 px-3 text-center text-gray-900">
                        {item.system_qty !== null ? item.system_qty : '-'}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {item.counted_qty !== null ? (
                          <span className={item.counted_qty === 0 ? 'text-red-600 font-medium' : 'text-gray-900'}>
                            {item.counted_qty}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                          {item.has_photo && <Camera className="w-3 h-3 text-blue-600" />}
                          {item.has_remark && <MessageSquare className="w-3 h-3 text-orange-600" />}
                        </div>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => handleOpenCount(item)}
                          className={`px-3 py-1 rounded text-sm ${
                            item.status === 'pending'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {item.status === 'pending' ? 'Count' : 'Edit'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Count Modal */}
      {selectedItem && (
        <Modal
          isOpen={showCountModal}
          onClose={() => setShowCountModal(false)}
          title="Record Count"
          size="md"
        >
          <div className="space-y-4">
            {/* Product Info */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Product</p>
              <p className="text-gray-900 font-medium">{selectedItem.product_code} - {selectedItem.product_name}</p>
              <p className="text-sm text-gray-600 mt-1">
                System Qty: <span className="font-medium">{selectedItem.system_qty !== null ? selectedItem.system_qty : 'Hidden (Blind Count)'}</span> {selectedItem.uom}
              </p>
            </div>

            {/* Count Method */}
            <div>
              <label className="block text-gray-700 text-sm mb-2">Count Method</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCountMethod('manual')}
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    countMethod === 'manual'
                      ? 'bg-blue-50 border-blue-600 text-blue-700'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  Manual Entry
                </button>
                <button
                  onClick={() => setCountMethod('barcode')}
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    countMethod === 'barcode'
                      ? 'bg-blue-50 border-blue-600 text-blue-700'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  <Barcode className="w-4 h-4 inline mr-2" />
                  Barcode Scan
                </button>
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-gray-700 text-sm mb-2">Counted Quantity *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={countQty}
                  onChange={(e) => setCountQty(e.target.value)}
                  placeholder="Enter quantity"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
                <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg">{selectedItem.uom}</span>
                {countMethod === 'barcode' && (
                  <button
                    onClick={handleBarcodeSimulation}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Barcode className="w-5 h-5" />
                  </button>
                )}
              </div>
              {parseFloat(countQty) === 0 && (
                <div className="mt-2 flex items-center gap-2 text-orange-600 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Zero count requires photo and remarks</span>
                </div>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Photo {parseFloat(countQty) === 0 && <span className="text-red-600">*</span>}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Camera className="w-4 h-4" />
                  Take Photo
                </button>
                <span className="px-3 py-2 text-sm text-gray-600">Optional (max 5 photos)</span>
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Remarks {parseFloat(countQty) === 0 && <span className="text-red-600">*</span>}
              </label>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Add remarks if needed (damaged, expired, mislocation, etc.)"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Quality Check (if applicable) */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-900 font-medium mb-2">Quality Check</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-blue-700 mb-1">Condition</label>
                  <select className="w-full px-2 py-1 text-sm border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Good</option>
                    <option>Damaged</option>
                    <option>Expired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-blue-700 mb-1">Batch No (Optional)</label>
                  <input
                    type="text"
                    placeholder="Batch number"
                    className="w-full px-2 py-1 text-sm border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                onClick={() => setShowCountModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCount}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Count
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Photo Modal (Simulated) */}
      <Modal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        title="Take Photo"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Camera interface would appear here</p>
            <p className="text-sm text-gray-500 mt-2">In a real implementation, this would access device camera</p>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Photo captured!');
                setShowPhotoModal(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Capture Photo
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
