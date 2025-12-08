import { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Users, MapPin, Calendar, Lock, Unlock, FileText, AlertCircle } from 'lucide-react';
import Modal from '../../Modal';

// Types
interface OpnamePlan {
  id: number;
  plan_no: string;
  opname_type: string;
  planned_date: string;
  warehouse: string;
  status: 'draft' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  team_count: number;
  items_count: number;
  is_frozen: boolean;
}

// Mock data
const opnamePlans: OpnamePlan[] = [
  {
    id: 1,
    plan_no: 'SO-JKT-20251215-001',
    opname_type: 'Full Count',
    planned_date: '2025-12-15 08:00',
    warehouse: 'Jakarta Main',
    status: 'scheduled',
    team_count: 3,
    items_count: 450,
    is_frozen: false
  },
  {
    id: 2,
    plan_no: 'SO-BDG-20251210-002',
    opname_type: 'Cycle Count',
    planned_date: '2025-12-10 09:00',
    warehouse: 'Bandung',
    status: 'in_progress',
    team_count: 2,
    items_count: 150,
    is_frozen: true
  },
  {
    id: 3,
    plan_no: 'SO-JKT-20251205-003',
    opname_type: 'ABC Analysis',
    planned_date: '2025-12-05 08:00',
    warehouse: 'Jakarta Main',
    status: 'completed',
    team_count: 2,
    items_count: 200,
    is_frozen: false
  }
];

const warehouses = ['Jakarta Main', 'Bandung', 'Surabaya', 'Medan', 'Semarang'];
const locations = ['Zone A', 'Zone B', 'Zone C', 'Warehouse 1', 'Warehouse 2'];
const categories = ['Electronics', 'Accessories', 'Hardware', 'Software', 'Furniture'];

export default function OpnamePlanningTab() {
  const [plans] = useState<OpnamePlan[]>(opnamePlans);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<OpnamePlan | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    opname_type: 'full_count',
    planned_date: '',
    planned_time: '08:00',
    estimated_duration: 480,
    frequency: 'one_time',
    warehouse_id: '',
    scope_locations: [] as string[],
    scope_categories: [] as string[],
    team_name: '',
    team_leader: '',
    team_members: '',
    pre_freeze: false,
    blind_count: false,
    notes: ''
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700',
      scheduled: 'bg-blue-100 text-blue-700',
      in_progress: 'bg-green-100 text-green-700',
      completed: 'bg-purple-100 text-purple-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  const getStatusText = (status: string) => {
    const text = {
      draft: 'Draft',
      scheduled: 'Scheduled',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return text[status as keyof typeof text] || status;
  };

  const handleCreatePlan = () => {
    console.log('Creating opname plan:', formData);
    alert('Stock Opname Plan created successfully!');
    setShowCreateModal(false);
    // Reset form
    setFormData({
      opname_type: 'full_count',
      planned_date: '',
      planned_time: '08:00',
      estimated_duration: 480,
      frequency: 'one_time',
      warehouse_id: '',
      scope_locations: [],
      scope_categories: [],
      team_name: '',
      team_leader: '',
      team_members: '',
      pre_freeze: false,
      blind_count: false,
      notes: ''
    });
  };

  const handleViewDetail = (plan: OpnamePlan) => {
    setSelectedPlan(plan);
    setShowDetailModal(true);
  };

  const handleFreeze = (plan: OpnamePlan) => {
    if (confirm(`Are you sure you want to ${plan.is_frozen ? 'unfreeze' : 'freeze'} inventory for ${plan.plan_no}?`)) {
      alert(`Inventory ${plan.is_frozen ? 'unfrozen' : 'frozen'} successfully!`);
    }
  };

  const handleGenerateSheets = (plan: OpnamePlan) => {
    if (confirm(`Generate count sheets for ${plan.plan_no}?`)) {
      alert('Count sheets generated successfully!');
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search opname plans..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Create Opname Plan
        </button>
      </div>

      {/* Plans List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Plan No</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Planned Date</th>
                <th className="text-left py-3 px-4 text-gray-600 text-sm font-medium">Warehouse</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Teams</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Items</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Status</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Frozen</th>
                <th className="text-center py-3 px-4 text-gray-600 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{plan.plan_no}</td>
                  <td className="py-3 px-4 text-gray-700">{plan.opname_type}</td>
                  <td className="py-3 px-4 text-gray-700">{plan.planned_date}</td>
                  <td className="py-3 px-4 text-gray-700">{plan.warehouse}</td>
                  <td className="py-3 px-4 text-center text-gray-900">{plan.team_count}</td>
                  <td className="py-3 px-4 text-center text-gray-900">{plan.items_count}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(plan.status)}`}>
                      {getStatusText(plan.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {plan.is_frozen ? (
                      <Lock className="w-4 h-4 text-red-600 mx-auto" />
                    ) : (
                      <Unlock className="w-4 h-4 text-gray-400 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewDetail(plan)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {plan.status === 'draft' && (
                        <button
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {plan.status === 'scheduled' && (
                        <>
                          <button
                            onClick={() => handleFreeze(plan)}
                            className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                            title={plan.is_frozen ? 'Unfreeze' : 'Freeze Inventory'}
                          >
                            {plan.is_frozen ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleGenerateSheets(plan)}
                            className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                            title="Generate Count Sheets"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {plan.status === 'draft' && (
                        <button
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Create Plan Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Stock Opname Plan"
        size="xl"
      >
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-gray-900 font-medium mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">Opname Type *</label>
                <select
                  value={formData.opname_type}
                  onChange={(e) => setFormData({ ...formData, opname_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="full_count">Full Count (All Items)</option>
                  <option value="cycle_count">Cycle Count (Rotating Partial)</option>
                  <option value="spot_check">Spot Check (Random Sampling)</option>
                  <option value="category_based">Category-Based</option>
                  <option value="high_value">High-Value Items Only</option>
                  <option value="abc_analysis">ABC Analysis Based</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">Warehouse *</label>
                <select
                  value={formData.warehouse_id}
                  onChange={(e) => setFormData({ ...formData, warehouse_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Warehouse --</option>
                  {warehouses.map((wh) => (
                    <option key={wh} value={wh}>{wh}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">Planned Date *</label>
                <input
                  type="date"
                  value={formData.planned_date}
                  onChange={(e) => setFormData({ ...formData, planned_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">Planned Time *</label>
                <input
                  type="time"
                  value={formData.planned_time}
                  onChange={(e) => setFormData({ ...formData, planned_time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">Estimated Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.estimated_duration}
                  onChange={(e) => setFormData({ ...formData, estimated_duration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="one_time">One-Time</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scope Definition */}
          <div>
            <h3 className="text-gray-900 font-medium mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Scope Definition
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">Locations/Zones (Optional)</label>
                <div className="border border-gray-300 rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
                  {locations.map((loc) => (
                    <label key={loc} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm text-gray-700">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">Product Categories (Optional)</label>
                <div className="border border-gray-300 rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Team Assignment */}
          <div>
            <h3 className="text-gray-900 font-medium mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team Assignment
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">Team Name *</label>
                <input
                  type="text"
                  value={formData.team_name}
                  onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                  placeholder="e.g., Team A"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">Team Leader *</label>
                <select
                  value={formData.team_leader}
                  onChange={(e) => setFormData({ ...formData, team_leader: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Leader --</option>
                  <option value="1">John Doe</option>
                  <option value="2">Jane Smith</option>
                  <option value="3">Bob Wilson</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm mb-2">Team Members (Comma-separated)</label>
                <textarea
                  value={formData.team_members}
                  onChange={(e) => setFormData({ ...formData, team_members: e.target.value })}
                  placeholder="Enter member names or IDs..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div>
            <h3 className="text-gray-900 font-medium mb-3">Options</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.pre_freeze}
                  onChange={(e) => setFormData({ ...formData, pre_freeze: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Pre-freeze inventory before opname</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.blind_count}
                  onChange={(e) => setFormData({ ...formData, blind_count: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Blind count (hide system quantity from counters)</span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or instructions..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePlan}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Plan
            </button>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      {selectedPlan && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`Opname Plan: ${selectedPlan.plan_no}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="text-gray-900 font-medium">{selectedPlan.opname_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Warehouse</p>
                <p className="text-gray-900 font-medium">{selectedPlan.warehouse}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Planned Date</p>
                <p className="text-gray-900 font-medium">{selectedPlan.planned_date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadge(selectedPlan.status)}`}>
                  {getStatusText(selectedPlan.status)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teams Assigned</p>
                <p className="text-gray-900 font-medium">{selectedPlan.team_count} teams</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Items to Count</p>
                <p className="text-gray-900 font-medium">{selectedPlan.items_count} items</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Inventory Status</p>
                <div className="flex items-center gap-2 mt-1">
                  {selectedPlan.is_frozen ? (
                    <>
                      <Lock className="w-4 h-4 text-red-600" />
                      <span className="text-red-600 font-medium">Frozen</span>
                      <AlertCircle className="w-4 h-4 text-red-600 ml-2" />
                      <span className="text-sm text-red-600">All transactions are blocked</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">Active</span>
                    </>
                  )}
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
              {selectedPlan.status === 'scheduled' && (
                <button
                  onClick={() => handleGenerateSheets(selectedPlan)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Generate Count Sheets
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
