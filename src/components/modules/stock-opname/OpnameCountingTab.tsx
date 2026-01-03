import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import Modal from '../../Modal';

// Types
interface CountItem {
  id: number;
  product_code: string;
  product_name: string;
  location: string;
  uom: string;
  system_qty: number | null;
  counted_qty: number | null;
  status: 'pending' | 'counted' | 'variance';
}

// Mock data - expanded for better demonstration
const mockCountItems: CountItem[] = [
  { id: 1, product_code: 'PRD-001', product_name: 'Product Alpha', location: 'Rak A-01', uom: 'PCS', system_qty: 150, counted_qty: 148, status: 'variance' },
  { id: 2, product_code: 'PRD-002', product_name: 'Product Beta', location: 'Rak A-02', uom: 'PCS', system_qty: 50, counted_qty: null, status: 'pending' },
  { id: 3, product_code: 'PRD-003', product_name: 'Product Gamma', location: 'Rak B-01', uom: 'BOX', system_qty: 30, counted_qty: 30, status: 'counted' },
  { id: 4, product_code: 'PRD-004', product_name: 'Product Delta', location: 'Rak B-02', uom: 'PCS', system_qty: 100, counted_qty: null, status: 'pending' },
  { id: 5, product_code: 'PRD-005', product_name: 'Product Epsilon', location: 'Rak C-01', uom: 'PCS', system_qty: 75, counted_qty: 75, status: 'counted' },
  { id: 6, product_code: 'PRD-006', product_name: 'Product Zeta', location: 'Rak C-02', uom: 'BOX', system_qty: 40, counted_qty: null, status: 'pending' },
];

export default function OpnameCountingTab() {
  const [countItems, setCountItems] = useState<CountItem[]>(mockCountItems);
  const [showCountModal, setShowCountModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CountItem | null>(null);
  const [countQty, setCountQty] = useState('');
  const [remark, setRemark] = useState('');

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      counted: 'bg-green-100 text-green-700',
      variance: 'bg-orange-100 text-orange-700'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getStatusText = (status: string) => {
    const text = {
      pending: 'Pending',
      counted: 'Counted',
      variance: 'Variance'
    };
    return text[status as keyof typeof text] || status;
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
      alert('Mohon masukkan jumlah yang valid');
      return;
    }

    const qty = parseFloat(countQty);
    const systemQty = selectedItem.system_qty || 0;

    // Determine status based on counted vs system qty
    let newStatus: 'pending' | 'counted' | 'variance' = 'counted';
    if (qty !== systemQty) {
      newStatus = 'variance';
    }

    // Update the item
    setCountItems(prevItems =>
      prevItems.map(item =>
        item.id === selectedItem.id
          ? { ...item, counted_qty: qty, status: newStatus }
          : item
      )
    );

    alert('Data counting berhasil disimpan!');
    setShowCountModal(false);
    setSelectedItem(null);
    setCountQty('');
    setRemark('');
  };

  // Calculate progress
  const totalItems = countItems.length;
  const countedItems = countItems.filter(item => item.status !== 'pending').length;
  const progressPct = totalItems > 0 ? Math.round((countedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Progress Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-900 font-medium">Stock Opname: SO-BDG-20251210-002</p>
            <p className="text-blue-700 text-sm">Bandung Warehouse - Counting Period</p>
          </div>
          <div className="text-right">
            <p className="text-blue-900 font-medium">Progress: {progressPct}%</p>
            <p className="text-blue-700 text-sm">{countedItems} / {totalItems} items counted</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-gray-900 font-medium">Daftar Item untuk Counting</h3>
          <p className="text-sm text-gray-600">Klik tombol "Input" untuk memasukkan jumlah hasil counting</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Kode Produk</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Nama Produk</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Lokasi</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">UOM</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Qty System</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Qty Counted</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Variance</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Status</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {countItems.map((item) => {
                const variance = item.counted_qty !== null && item.system_qty !== null
                  ? item.counted_qty - item.system_qty
                  : null;

                return (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-mono text-sm">{item.product_code}</td>
                    <td className="py-3 px-4 text-gray-700">{item.product_name}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{item.location}</td>
                    <td className="py-3 px-4 text-center text-gray-600 text-sm">{item.uom}</td>
                    <td className="py-3 px-4 text-center text-gray-900">
                      {item.system_qty !== null ? item.system_qty : '-'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.counted_qty !== null ? (
                        <span className="text-gray-900 font-medium">{item.counted_qty}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {variance !== null ? (
                        <span className={`font-medium ${
                          variance === 0 ? 'text-green-600' :
                          variance > 0 ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {variance > 0 ? '+' : ''}{variance}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenCount(item)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        <Edit2 className="w-3 h-3" />
                        {item.status === 'pending' ? 'Input' : 'Edit'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Count Modal */}
      {selectedItem && (
        <Modal
          isOpen={showCountModal}
          onClose={() => setShowCountModal(false)}
          title="Input Hasil Counting"
          size="md"
        >
          <div className="space-y-4">
            {/* Product Info */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Kode Produk</p>
                  <p className="text-gray-900 font-medium">{selectedItem.product_code}</p>
                </div>
                <div>
                  <p className="text-gray-600">Lokasi</p>
                  <p className="text-gray-900 font-medium">{selectedItem.location}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600">Nama Produk</p>
                  <p className="text-gray-900 font-medium">{selectedItem.product_name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Qty System</p>
                  <p className="text-gray-900 font-medium">
                    {selectedItem.system_qty !== null ? selectedItem.system_qty : '-'} {selectedItem.uom}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-gray-700 mb-2">Jumlah Hasil Counting *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={countQty}
                  onChange={(e) => setCountQty(e.target.value)}
                  placeholder="Masukkan jumlah"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1"
                  autoFocus
                />
                <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg min-w-[60px] text-center">
                  {selectedItem.uom}
                </span>
              </div>
            </div>

            {/* Variance Warning */}
            {countQty && selectedItem.system_qty !== null && parseFloat(countQty) !== selectedItem.system_qty && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-orange-800 text-sm font-medium">
                  Variance terdeteksi: {parseFloat(countQty) - selectedItem.system_qty} {selectedItem.uom}
                </p>
              </div>
            )}

            {/* Remarks (Optional) */}
            <div>
              <label className="block text-gray-700 mb-2">Catatan (Opsional)</label>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Tambahkan catatan jika diperlukan..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                onClick={() => setShowCountModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleSaveCount}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
