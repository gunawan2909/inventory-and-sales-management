import { useState } from 'react';
import { FileText, CheckSquare, Save, Lock, Unlock, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import Modal from '../../Modal';

// Types
interface Adjustment {
  id: number;
  adjustment_no: string;
  plan_no: string;
  adjustment_date: string;
  total_increase_value: number;
  total_decrease_value: number;
  net_impact: number;
  affected_products_count: number;
  status: 'draft' | 'pending_approval' | 'approved' | 'posted';
  created_by: string;
  approved_by: string | null;
}

interface AdjustmentDetail {
  id: number;
  product_code: string;
  product_name: string;
  location: string;
  system_qty: number;
  counted_qty: number;
  adjustment_qty: number;
  reason_code: string;
  unit_cost: number;
  adjustment_value: number;
}

// Mock data
const mockAdjustments: Adjustment[] = [
  {
    id: 1,
    adjustment_no: 'ADJ-2025-001',
    plan_no: 'SO-BDG-20251210-002',
    adjustment_date: '2025-12-10',
    total_increase_value: 4500000,
    total_decrease_value: 40200000,
    net_impact: -35700000,
    affected_products_count: 35,
    status: 'pending_approval',
    created_by: 'Admin',
    approved_by: null
  }
];

const mockAdjustmentDetails: AdjustmentDetail[] = [
  {
    id: 1,
    product_code: 'PRD-001',
    product_name: 'Product Alpha',
    location: 'Zone A',
    system_qty: 150,
    counted_qty: 148,
    adjustment_qty: -2,
    reason_code: 'shrinkage',
    unit_cost: 100000,
    adjustment_value: -200000
  },
  {
    id: 2,
    product_code: 'PRD-005',
    product_name: 'Product Epsilon',
    location: 'Zone A',
    system_qty: 80,
    counted_qty: 0,
    adjustment_qty: -80,
    reason_code: 'theft',
    unit_cost: 500000,
    adjustment_value: -40000000
  },
  {
    id: 3,
    product_code: 'PRD-012',
    product_name: 'Product Lambda',
    location: 'Zone B',
    system_qty: 100,
    counted_qty: 118,
    adjustment_qty: 18,
    reason_code: 'counting_error',
    unit_cost: 250000,
    adjustment_value: 4500000
  }
];

export default function OpnameAdjustmentTab() {
  const [adjustments] = useState<Adjustment[]>(mockAdjustments);
  const [adjustmentDetails] = useState<AdjustmentDetail[]>(mockAdjustmentDetails);
  const [selectedAdjustment, setSelectedAdjustment] = useState<Adjustment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showPostingModal, setShowPostingModal] = useState(false);

  const [finalizationChecklist, setFinalizationChecklist] = useState({
    all_sheets_completed: false,
    all_variances_reviewed: false,
    recounts_completed: false,
    investigations_completed: false,
    approvals_obtained: false,
    adjustments_approved: false,
    accounting_reviewed: false
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700',
      pending_approval: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      posted: 'bg-blue-100 text-blue-700'
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  const getStatusText = (status: string) => {
    const text = {
      draft: 'Draft',
      pending_approval: 'Pending Approval',
      approved: 'Approved',
      posted: 'Posted'
    };
    return text[status as keyof typeof text] || status;
  };

  const getReasonText = (code: string) => {
    const reasons: Record<string, string> = {
      shrinkage: 'Shrinkage',
      damage: 'Damage',
      expiry: 'Expiry',
      theft: 'Theft',
      counting_error: 'Counting Error',
      system_error: 'System Error',
      mislocation: 'Mislocation',
      other: 'Other'
    };
    return reasons[code] || code;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleViewDetail = (adjustment: Adjustment) => {
    setSelectedAdjustment(adjustment);
    setShowDetailModal(true);
  };

  const handleApproveAdjustment = (adjustment: Adjustment) => {
    if (confirm(`Approve adjustment ${adjustment.adjustment_no}?`)) {
      alert('Adjustment approved successfully!');
    }
  };

  const handlePostAdjustment = (adjustment: Adjustment) => {
    setSelectedAdjustment(adjustment);
    setShowPostingModal(true);
  };

  const handleFinalize = (adjustment: Adjustment) => {
    setSelectedAdjustment(adjustment);
    setShowFinalizeModal(true);
  };

  const checkAllCompleted = () => {
    return Object.values(finalizationChecklist).every(v => v === true);
  };

  const handleSubmitFinalization = () => {
    if (!checkAllCompleted()) {
      alert('Please complete all checklist items before finalizing');
      return;
    }

    if (confirm('Finalize Stock Opname? This action cannot be undone.')) {
      alert('Stock Opname finalized successfully! Inventory has been unfrozen.');
      setShowFinalizeModal(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-gray-900 font-medium mb-4">Stock Opname: SO-BDG-20251210-002</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Items Adjusted</p>
            <p className="text-2xl font-bold text-gray-900">35</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Increase Value
            </p>
            <p className="text-xl font-bold text-green-600">{formatCurrency(4500000)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-red-600" />
              Decrease Value
            </p>
            <p className="text-xl font-bold text-red-600">{formatCurrency(40200000)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Net Impact</p>
            <p className="text-xl font-bold text-red-900">{formatCurrency(-35700000)}</p>
          </div>
        </div>
      </div>

      {/* Adjustments List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-gray-900 font-medium">Adjustment Documents</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Adjustment No</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Plan No</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Date</th>
                <th className="text-right py-3 px-4 text-gray-600 text-sm font-medium">Net Impact</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Items</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Status</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map((adj) => (
                <tr key={adj.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{adj.adjustment_no}</td>
                  <td className="py-3 px-4 text-gray-700">{adj.plan_no}</td>
                  <td className="py-3 px-4 text-gray-700">{adj.adjustment_date}</td>
                  <td className={`py-3 px-4 text-right font-medium ${
                    adj.net_impact >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(adj.net_impact)}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-900">{adj.affected_products_count}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(adj.status)}`}>
                      {getStatusText(adj.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewDetail(adj)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        View Details
                      </button>
                      {adj.status === 'pending_approval' && (
                        <button
                          onClick={() => handleApproveAdjustment(adj)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                      )}
                      {adj.status === 'approved' && (
                        <button
                          onClick={() => handlePostAdjustment(adj)}
                          className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                          Post
                        </button>
                      )}
                      {adj.status === 'posted' && (
                        <button
                          onClick={() => handleFinalize(adj)}
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                          Finalize
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAdjustment && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`Adjustment: ${selectedAdjustment.adjustment_no}`}
          size="xl"
        >
          <div className="space-y-4">
            {/* Header Info */}
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Plan No</p>
                <p className="text-gray-900 font-medium">{selectedAdjustment.plan_no}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Adjustment Date</p>
                <p className="text-gray-900 font-medium">{selectedAdjustment.adjustment_date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadge(selectedAdjustment.status)}`}>
                  {getStatusText(selectedAdjustment.status)}
                </span>
              </div>
            </div>

            {/* Adjustment Details Table */}
            <div>
              <h4 className="text-gray-900 font-medium mb-3">Adjustment Items</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-2 px-3 text-gray-600 text-xs font-medium">Product</th>
                        <th className="text-left py-2 px-3 text-gray-600 text-xs font-medium">Location</th>
                        <th className="text-right py-2 px-3 text-gray-600 text-xs font-medium">System</th>
                        <th className="text-right py-2 px-3 text-gray-600 text-xs font-medium">Counted</th>
                        <th className="text-right py-2 px-3 text-gray-600 text-xs font-medium">Adj Qty</th>
                        <th className="text-left py-2 px-3 text-gray-600 text-xs font-medium">Reason</th>
                        <th className="text-right py-2 px-3 text-gray-600 text-xs font-medium">Unit Cost</th>
                        <th className="text-right py-2 px-3 text-gray-600 text-xs font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adjustmentDetails.map((detail) => (
                        <tr key={detail.id} className="border-b border-gray-100 text-sm">
                          <td className="py-2 px-3">
                            <div>
                              <p className="text-gray-900 font-medium text-xs">{detail.product_code}</p>
                              <p className="text-gray-600 text-xs">{detail.product_name}</p>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-gray-700 text-xs">{detail.location}</td>
                          <td className="py-2 px-3 text-right text-gray-900">{detail.system_qty}</td>
                          <td className="py-2 px-3 text-right text-gray-900">{detail.counted_qty}</td>
                          <td className={`py-2 px-3 text-right font-medium ${
                            detail.adjustment_qty > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {detail.adjustment_qty > 0 ? '+' : ''}{detail.adjustment_qty}
                          </td>
                          <td className="py-2 px-3 text-xs">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {getReasonText(detail.reason_code)}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right text-gray-700 text-xs">
                            {formatCurrency(detail.unit_cost)}
                          </td>
                          <td className={`py-2 px-3 text-right font-medium text-xs ${
                            detail.adjustment_value >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(detail.adjustment_value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 font-medium">
                        <td colSpan={7} className="py-2 px-3 text-right text-gray-900">Total Net Impact:</td>
                        <td className={`py-2 px-3 text-right font-bold ${
                          selectedAdjustment.net_impact >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(selectedAdjustment.net_impact)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Financial Impact Summary */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="text-blue-900 font-medium mb-3">Financial Impact Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-blue-700">Total Increase</p>
                  <p className="text-green-600 font-bold">{formatCurrency(selectedAdjustment.total_increase_value)}</p>
                </div>
                <div>
                  <p className="text-blue-700">Total Decrease</p>
                  <p className="text-red-600 font-bold">{formatCurrency(selectedAdjustment.total_decrease_value)}</p>
                </div>
                <div>
                  <p className="text-blue-700">Net Impact on P&L</p>
                  <p className={`font-bold ${selectedAdjustment.net_impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(selectedAdjustment.net_impact)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              {selectedAdjustment.status === 'pending_approval' && (
                <button
                  onClick={() => {
                    handleApproveAdjustment(selectedAdjustment);
                    setShowDetailModal(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve Adjustment
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Posting Modal */}
      <Modal
        isOpen={showPostingModal}
        onClose={() => setShowPostingModal(false)}
        title="Post Adjustment"
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-900 font-medium">Important: Posting Actions</p>
                <p className="text-orange-700 text-sm mt-1">
                  Posting this adjustment will:
                </p>
                <ul className="text-orange-700 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Update stock balance for all affected products</li>
                  <li>Update stock values</li>
                  <li>Create stock movement records</li>
                  <li>Generate journal entries for accounting</li>
                  <li>Lock the adjustment (cannot be modified)</li>
                </ul>
              </div>
            </div>
          </div>

          {selectedAdjustment && (
            <>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 font-medium mb-3">Posting Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Adjustment Number:</span>
                    <span className="text-gray-900 font-medium">{selectedAdjustment.adjustment_no}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="text-gray-900 font-medium">{selectedAdjustment.affected_products_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Value Impact:</span>
                    <span className={`font-medium ${selectedAdjustment.net_impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(selectedAdjustment.net_impact)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="text-blue-900 font-medium mb-2">Journal Entries to be Generated</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• DR: Inventory Loss/COGS - {formatCurrency(40200000)}</p>
                  <p>• CR: Inventory Asset - {formatCurrency(40200000)}</p>
                  <p>• DR: Inventory Asset - {formatCurrency(4500000)}</p>
                  <p>• CR: Inventory Gain - {formatCurrency(4500000)}</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={() => setShowPostingModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (confirm('Post this adjustment? This action cannot be undone.')) {
                      alert('Adjustment posted successfully! Stock balances and journal entries have been updated.');
                      setShowPostingModal(false);
                    }
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Post Adjustment
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Finalization Modal */}
      <Modal
        isOpen={showFinalizeModal}
        onClose={() => setShowFinalizeModal(false)}
        title="Finalize Stock Opname"
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-indigo-900 font-medium">Final Step: Complete Stock Opname</p>
                <p className="text-indigo-700 text-sm mt-1">
                  Please verify all checklist items before finalizing. This action will lock the opname and unfreeze inventory.
                </p>
              </div>
            </div>
          </div>

          {/* Finalization Checklist */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-gray-900 font-medium mb-3 flex items-center gap-2">
              <CheckSquare className="w-5 h-5" />
              Pre-Finalization Checklist
            </h4>
            <div className="space-y-3">
              {Object.entries(finalizationChecklist).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setFinalizationChecklist({
                      ...finalizationChecklist,
                      [key]: e.target.checked
                    })}
                    className="w-5 h-5"
                  />
                  <span className={`text-sm ${value ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  {value && <CheckCircle className="w-4 h-4 text-green-600" />}
                </label>
              ))}
            </div>
          </div>

          {/* Inventory Status */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-gray-900 font-medium mb-3">Current Status</h4>
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-red-900 font-medium">Inventory: FROZEN</p>
                  <p className="text-red-700 text-sm">All transactions are currently blocked</p>
                </div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Unlock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-green-900 font-medium">After Finalization</p>
                  <p className="text-green-700 text-sm">Inventory will be unfrozen and all operations will resume</p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning if not all checked */}
          {!checkAllCompleted() && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <p className="text-yellow-900 text-sm font-medium">
                  Please complete all checklist items before finalizing
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => setShowFinalizeModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitFinalization}
              disabled={!checkAllCompleted()}
              className={`px-4 py-2 rounded-lg ${
                checkAllCompleted()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Finalize Stock Opname
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
