import { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';

// Types
interface CountItem {
  id: number;
  product_code: string;
  product_name: string;
  location: string;
  uom: string;
  system_qty: number | null;
  counted_qty: number | null;
}

// Mock data - expanded for better demonstration
const mockCountItems: CountItem[] = [
  { id: 1, product_code: 'PRD-001', product_name: 'Product Alpha', location: 'Rak A-01', uom: 'PCS', system_qty: 150, counted_qty: 148 },
  { id: 2, product_code: 'PRD-002', product_name: 'Product Beta', location: 'Rak A-02', uom: 'PCS', system_qty: 50, counted_qty: null },
  { id: 3, product_code: 'PRD-003', product_name: 'Product Gamma', location: 'Rak B-01', uom: 'BOX', system_qty: 30, counted_qty: 30 },
  { id: 4, product_code: 'PRD-004', product_name: 'Product Delta', location: 'Rak B-02', uom: 'PCS', system_qty: 100, counted_qty: null },
  { id: 5, product_code: 'PRD-005', product_name: 'Product Epsilon', location: 'Rak C-01', uom: 'PCS', system_qty: 75, counted_qty: 75 },
  { id: 6, product_code: 'PRD-006', product_name: 'Product Zeta', location: 'Rak C-02', uom: 'BOX', system_qty: 40, counted_qty: null },
];

export default function OpnameCountingTab() {
  const [countItems, setCountItems] = useState<CountItem[]>(mockCountItems);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState<{[key: number]: string}>({});

  const handleEditMode = () => {
    // Initialize edited items with current counted_qty values
    const initialEdits: {[key: number]: string} = {};
    countItems.forEach(item => {
      initialEdits[item.id] = item.counted_qty?.toString() || '';
    });
    setEditedItems(initialEdits);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedItems({});
  };

  const handleSaveEdit = () => {
    // Update countItems with edited values
    const updatedItems = countItems.map(item => {
      const editedValue = editedItems[item.id];
      if (editedValue !== undefined && editedValue !== '') {
        const qty = parseFloat(editedValue);
        if (!isNaN(qty) && qty >= 0) {
          return { ...item, counted_qty: qty };
        }
      }
      return item;
    });

    setCountItems(updatedItems);
    setIsEditing(false);
    setEditedItems({});
    alert('Data counting berhasil disimpan!');
  };

  const handleQtyChange = (itemId: number, value: string) => {
    setEditedItems(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  // Calculate progress
  const totalItems = countItems.length;
  const countedItems = countItems.filter(item => item.counted_qty !== null).length;
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
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900 font-medium">Daftar Item untuk Counting</h3>
            <p className="text-sm text-gray-600">
              {isEditing ? 'Mode Edit: Masukkan jumlah hasil counting pada kolom Qty Counted' : 'Klik tombol "Edit" untuk mulai input counting'}
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={handleEditMode}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
              </>
            )}
          </div>
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
              </tr>
            </thead>
            <tbody>
              {countItems.map((item) => {
                const displayQty = isEditing ? editedItems[item.id] : item.counted_qty?.toString();

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
                      {isEditing ? (
                        <input
                          type="number"
                          value={displayQty || ''}
                          onChange={(e) => handleQtyChange(item.id, e.target.value)}
                          placeholder="0"
                          className="w-24 px-2 py-1 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                          step="1"
                        />
                      ) : (
                        displayQty ? (
                          <span className="text-gray-900 font-medium">{displayQty}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
