import { useState } from 'react';
import { AlertTriangle, CheckCircle, RefreshCw, Search, Eye, ThumbsUp, ThumbsDown, FileText, Camera, MessageSquare } from 'lucide-react';
import Modal from '../../Modal';

// Types
interface Variance {
  id: number;
  plan_no: string;
  product_code: string;
  product_name: string;
  location: string;
  system_qty: number;
  counted_qty: number;
  variance_qty: number;
  variance_pct: number;
  unit_cost: number;
  variance_value: number;
  variance_category: 'zero' | 'small' | 'medium' | 'large' | 'critical';
  status: 'pending' | 'under_investigation' | 'approved' | 'recount_requested';
  counter_name: string;
  has_photo: boolean;
  has_remark: boolean;
  requires_recount: boolean;
}

// Mock data
const mockVariances: Variance[] = [
  {
    id: 1,
    plan_no: 'SO-BDG-20251210-002',
    product_code: 'PRD-001',
    product_name: 'Product Alpha',
    location: 'Zone A - Rack 1',
    system_qty: 150,
    counted_qty: 148,
    variance_qty: -2,
    variance_pct: -1.33,
    unit_cost: 100000,
    variance_value: -200000,
    variance_category: 'small',
    status: 'pending',
    counter_name: 'John Doe',
    has_photo: false,
    has_remark: true,
    requires_recount: false
  },
  {
    id: 2,
    plan_no: 'SO-BDG-20251210-002',
    product_code: 'PRD-005',
    product_name: 'Product Epsilon',
    location: 'Zone A - Rack 3',
    system_qty: 80,
    counted_qty: 0,
    variance_qty: -80,
    variance_pct: -100,
    unit_cost: 500000,
    variance_value: -40000000,
    variance_category: 'critical',
    status: 'recount_requested',
    counter_name: 'John Doe',
    has_photo: true,
    has_remark: true,
    requires_recount: true
  },
  {
    id: 3,
    plan_no: 'SO-BDG-20251210-002',
    product_code: 'PRD-012',
    product_name: 'Product Lambda',
    location: 'Zone B - Rack 7',
    system_qty: 100,
    counted_qty: 118,
    variance_qty: 18,
    variance_pct: 18,
    unit_cost: 250000,
    variance_value: 4500000,
    variance_category: 'large',
    status: 'under_investigation',
    counter_name: 'Jane Smith',
    has_photo: false,
    has_remark: true,
    requires_recount: true
  },
  {
    id: 4,
    plan_no: 'SO-BDG-20251210-002',
    product_code: 'PRD-022',
    product_name: 'Product Omega',
    location: 'Zone C - Rack 12',
    system_qty: 50,
    counted_qty: 54,
    variance_qty: 4,
    variance_pct: 8,
    unit_cost: 150000,
    variance_value: 600000,
    variance_category: 'medium',
    status: 'approved',
    counter_name: 'Bob Wilson',
    has_photo: false,
    has_remark: false,
    requires_recount: false
  }
];

export default function OpnameVerificationTab() {
  const [variances, setVariances] = useState<Variance[]>(mockVariances);
  const [selectedVariance, setSelectedVariance] = useState<Variance | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRecountModal, setShowRecountModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getVarianceCategoryBadge = (category: string) => {
    const styles = {
      zero: 'bg-green-100 text-green-700 border-green-200',
      small: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      medium: 'bg-orange-100 text-orange-700 border-orange-200',
      large: 'bg-red-100 text-red-700 border-red-200',
      critical: 'bg-red-200 text-red-900 border-red-300 font-bold'
    };
    return styles[category as keyof typeof styles] || styles.small;
  };

  const getVarianceCategoryText = (category: string) => {
    const text = {
      zero: 'Zero Variance',
      small: 'Small (<5%)',
      medium: 'Medium (5-10%)',
      large: 'Large (10-20%)',
      critical: 'Critical (>20%)'
    };
    return text[category as keyof typeof text] || category;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      under_investigation: 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      recount_requested: 'bg-orange-100 text-orange-700'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getStatusText = (status: string) => {
    const text = {
      pending: 'Pending Review',
      under_investigation: 'Under Investigation',
      approved: 'Approved',
      recount_requested: 'Recount Requested'
    };
    return text[status as keyof typeof text] || status;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleViewDetail = (variance: Variance) => {
    setSelectedVariance(variance);
    setShowDetailModal(true);
  };

  const handleRequestRecount = (variance: Variance) => {
    setSelectedVariance(variance);
    setShowRecountModal(true);
  };

  const handleApprove = (variance: Variance) => {
    setSelectedVariance(variance);
    setShowApprovalModal(true);
  };

  const handleSubmitRecount = (reason: string) => {
    if (!selectedVariance) return;

    setVariances(prevVariances =>
      prevVariances.map(v =>
        v.id === selectedVariance.id
          ? { ...v, status: 'recount_requested' }
          : v
      )
    );

    alert(`Recount requested for ${selectedVariance.product_code}. Reason: ${reason}`);
    setShowRecountModal(false);
    setSelectedVariance(null);
  };

  const handleSubmitApproval = (decision: 'approve' | 'reject', remarks: string) => {
    if (!selectedVariance) return;

    if (decision === 'approve') {
      setVariances(prevVariances =>
        prevVariances.map(v =>
          v.id === selectedVariance.id
            ? { ...v, status: 'approved' }
            : v
        )
      );
      alert(`Variance approved for ${selectedVariance.product_code}`);
    } else {
      alert(`Variance rejected. Remarks: ${remarks}`);
    }

    setShowApprovalModal(false);
    setSelectedVariance(null);
  };

  // Filter variances
  const filteredVariances = variances.filter(v => {
    if (filterCategory !== 'all' && v.variance_category !== filterCategory) return false;
    if (filterStatus !== 'all' && v.status !== filterStatus) return false;
    return true;
  });

  // Summary statistics
  const stats = {
    total: variances.length,
    critical: variances.filter(v => v.variance_category === 'critical').length,
    large: variances.filter(v => v.variance_category === 'large').length,
    pending: variances.filter(v => v.status === 'pending').length,
    totalVarianceValue: variances.reduce((sum, v) => sum + Math.abs(v.variance_value), 0)
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Variances</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-sm text-red-700 mb-1">Critical Variances</p>
          <p className="text-2xl font-bold text-red-900">{stats.critical}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <p className="text-sm text-orange-700 mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-orange-900">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">Total Variance Value</p>
          <p className="text-lg font-bold text-blue-900">{formatCurrency(stats.totalVarianceValue)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search product..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="critical">Critical (&gt;20%)</option>
            <option value="large">Large (10-20%)</option>
            <option value="medium">Medium (5-10%)</option>
            <option value="small">Small (&lt;5%)</option>
            <option value="zero">Zero Variance</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="recount_requested">Recount Requested</option>
            <option value="under_investigation">Under Investigation</option>
            <option value="approved">Approved</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export
          </button>
        </div>
      </div>

      {/* Variances Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Product</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Location</th>
                <th className="text-right py-3 px-4 text-gray-600 text-sm font-medium">System</th>
                <th className="text-right py-3 px-4 text-gray-600 text-sm font-medium">Counted</th>
                <th className="text-right py-3 px-4 text-gray-600 text-sm font-medium">Variance</th>
                <th className="text-right py-3 px-4 text-gray-600 text-sm font-medium">Variance %</th>
                <th className="text-right py-3 px-4 text-gray-600 text-sm font-medium">Value Impact</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Category</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Status</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVariances.map((variance) => (
                <tr key={variance.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-900 font-medium text-sm">{variance.product_code}</p>
                      <p className="text-gray-600 text-xs">{variance.product_name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm">{variance.location}</td>
                  <td className="py-3 px-4 text-right text-gray-900">{variance.system_qty}</td>
                  <td className="py-3 px-4 text-right text-gray-900">{variance.counted_qty}</td>
                  <td className={`py-3 px-4 text-right font-medium ${
                    variance.variance_qty > 0 ? 'text-green-600' : variance.variance_qty < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {variance.variance_qty > 0 ? '+' : ''}{variance.variance_qty}
                  </td>
                  <td className={`py-3 px-4 text-right font-medium ${
                    variance.variance_pct > 0 ? 'text-green-600' : variance.variance_pct < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {variance.variance_pct > 0 ? '+' : ''}{variance.variance_pct.toFixed(2)}%
                  </td>
                  <td className={`py-3 px-4 text-right text-sm font-medium ${
                    variance.variance_value > 0 ? 'text-green-600' : variance.variance_value < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {formatCurrency(variance.variance_value)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getVarianceCategoryBadge(variance.variance_category)}`}>
                      {getVarianceCategoryText(variance.variance_category)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(variance.status)}`}>
                      {getStatusText(variance.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleViewDetail(variance)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {variance.status === 'pending' && variance.requires_recount && (
                        <button
                          onClick={() => handleRequestRecount(variance)}
                          className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                          title="Request Recount"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                      {variance.status === 'pending' && (
                        <button
                          onClick={() => handleApprove(variance)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Approve/Reject"
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                      )}
                      {(variance.has_photo || variance.has_remark) && (
                        <div className="flex gap-1">
                          {variance.has_photo && <Camera className="w-3 h-3 text-blue-600" />}
                          {variance.has_remark && <MessageSquare className="w-3 h-3 text-orange-600" />}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVariances.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No variances found matching your filters</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedVariance && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`Variance Detail: ${selectedVariance.product_code}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Product</p>
                <p className="text-gray-900 font-medium">{selectedVariance.product_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-gray-900 font-medium">{selectedVariance.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">System Qty</p>
                <p className="text-gray-900 font-medium">{selectedVariance.system_qty}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Counted Qty</p>
                <p className="text-gray-900 font-medium">{selectedVariance.counted_qty}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Variance Qty</p>
                <p className={`font-medium ${
                  selectedVariance.variance_qty > 0 ? 'text-green-600' : selectedVariance.variance_qty < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {selectedVariance.variance_qty > 0 ? '+' : ''}{selectedVariance.variance_qty}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Variance %</p>
                <p className={`font-medium ${
                  selectedVariance.variance_pct > 0 ? 'text-green-600' : selectedVariance.variance_pct < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {selectedVariance.variance_pct > 0 ? '+' : ''}{selectedVariance.variance_pct.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Unit Cost</p>
                <p className="text-gray-900 font-medium">{formatCurrency(selectedVariance.unit_cost)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Value Impact</p>
                <p className={`font-medium ${
                  selectedVariance.variance_value > 0 ? 'text-green-600' : selectedVariance.variance_value < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {formatCurrency(selectedVariance.variance_value)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Counter</p>
                <p className="text-gray-900 font-medium">{selectedVariance.counter_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getVarianceCategoryBadge(selectedVariance.variance_category)}`}>
                  {getVarianceCategoryText(selectedVariance.variance_category)}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-gray-900 font-medium mb-2">Count History</h4>
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">1st Count (Original):</span>
                  <span className="text-gray-900 font-medium">{selectedVariance.counted_qty}</span>
                </div>
                {selectedVariance.status === 'recount_requested' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-600">Recount Requested</span>
                    <span className="text-orange-600 font-medium">Pending</span>
                  </div>
                )}
              </div>
            </div>

            {selectedVariance.has_remark && (
              <div className="border-t pt-4">
                <h4 className="text-gray-900 font-medium mb-2">Remarks</h4>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">Sample remark: Items found in different location, mislocation issue.</p>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              {selectedVariance.status === 'pending' && selectedVariance.requires_recount && (
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleRequestRecount(selectedVariance);
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Request Recount
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Recount Request Modal */}
      <Modal
        isOpen={showRecountModal}
        onClose={() => setShowRecountModal(false)}
        title="Request Recount"
        size="md"
      >
        <div className="space-y-4">
          {selectedVariance && (
            <>
              <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                <p className="text-sm text-orange-900 font-medium">
                  {selectedVariance.product_code} - {selectedVariance.product_name}
                </p>
                <p className="text-sm text-orange-700 mt-1">
                  Variance: {selectedVariance.variance_pct.toFixed(2)}% ({formatCurrency(selectedVariance.variance_value)})
                </p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Assign to Team *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">-- Select Team (different from original) --</option>
                  <option>Team B - Jane Smith</option>
                  <option>Team C - Bob Wilson</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Reason for Recount *</label>
                <textarea
                  id="recount-reason"
                  rows={4}
                  placeholder="Explain why recount is needed..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={() => setShowRecountModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const reason = (document.getElementById('recount-reason') as HTMLTextAreaElement)?.value;
                    if (!reason) {
                      alert('Please provide a reason for recount');
                      return;
                    }
                    handleSubmitRecount(reason);
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Submit Recount Request
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="Approve Variance"
        size="md"
      >
        <div className="space-y-4">
          {selectedVariance && (
            <>
              <div className={`border p-3 rounded-lg ${
                selectedVariance.variance_category === 'critical'
                  ? 'bg-red-50 border-red-200'
                  : selectedVariance.variance_category === 'large'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <p className="text-sm font-medium">
                  {selectedVariance.product_code} - {selectedVariance.product_name}
                </p>
                <p className="text-sm mt-1">
                  Variance: {selectedVariance.variance_pct.toFixed(2)}% | Value: {formatCurrency(selectedVariance.variance_value)}
                </p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Decision *</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSubmitApproval('approve', '')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      const remarks = (document.getElementById('approval-remarks') as HTMLTextAreaElement)?.value;
                      handleSubmitApproval('reject', remarks);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <ThumbsDown className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Remarks (Optional)</label>
                <textarea
                  id="approval-remarks"
                  rows={3}
                  placeholder="Add approval remarks..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
