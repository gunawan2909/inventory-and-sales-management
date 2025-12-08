import { useState } from 'react';
import { FileText, Download, BarChart3, PieChart, TrendingUp, Users, Target, AlertCircle } from 'lucide-react';
import Modal from '../../Modal';

// Types
type ReportType = 'summary' | 'accuracy' | 'team_performance' | 'financial' | 'compliance' | 'trends';

interface OpnameReport {
  plan_no: string;
  warehouse: string;
  opname_date: string;
  items_counted: number;
  variance_items: number;
  accuracy_pct: number;
  variance_value: number;
  duration_hours: number;
  team_count: number;
}

// Mock data
const mockReports: OpnameReport[] = [
  {
    plan_no: 'SO-BDG-20251210-002',
    warehouse: 'Bandung',
    opname_date: '2025-12-10',
    items_counted: 135,
    variance_items: 35,
    accuracy_pct: 74.07,
    variance_value: 35700000,
    duration_hours: 6.5,
    team_count: 3
  },
  {
    plan_no: 'SO-JKT-20251205-001',
    warehouse: 'Jakarta',
    opname_date: '2025-12-05',
    items_counted: 450,
    variance_items: 18,
    accuracy_pct: 96.0,
    variance_value: 4200000,
    duration_hours: 8.0,
    team_count: 5
  },
  {
    plan_no: 'SO-SBY-20251201-003',
    warehouse: 'Surabaya',
    opname_date: '2025-12-01',
    items_counted: 320,
    variance_items: 12,
    accuracy_pct: 96.25,
    variance_value: 2800000,
    duration_hours: 7.5,
    team_count: 4
  }
];

const varianceByReason = [
  { reason: 'Shrinkage', count: 15, value: 1500000, pct: 42.9 },
  { reason: 'Theft', count: 5, value: 40000000, pct: 14.3 },
  { reason: 'Counting Error', count: 8, value: 5200000, pct: 22.9 },
  { reason: 'Mislocation', count: 5, value: 800000, pct: 14.3 },
  { reason: 'System Error', count: 2, value: 200000, pct: 5.7 }
];

const teamPerformance = [
  { team: 'Team A - John Doe', items_counted: 52, accuracy: 94.2, speed: 8.5, recount_needed: 3 },
  { team: 'Team B - Jane Smith', items_counted: 45, accuracy: 97.8, speed: 7.2, recount_needed: 1 },
  { team: 'Team C - Bob Wilson', items_counted: 38, accuracy: 100.0, speed: 6.8, recount_needed: 0 }
];

export default function OpnameReportingTab() {
  const [activeReport, setActiveReport] = useState<ReportType>('summary');
  const [selectedPlan, setSelectedPlan] = useState<string>('SO-BDG-20251210-002');
  const [showExportModal, setShowExportModal] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleExport = (format: string) => {
    alert(`Exporting report as ${format}...`);
    setShowExportModal(false);
  };

  const currentReport = mockReports.find(r => r.plan_no === selectedPlan) || mockReports[0];

  return (
    <div className="space-y-4">
      {/* Report Selection */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-gray-600 mb-1">Select Opname</label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mockReports.map((report) => (
                <option key={report.plan_no} value={report.plan_no}>
                  {report.plan_no} - {report.warehouse} ({report.opname_date})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex gap-2 p-4 min-w-max">
            <button
              onClick={() => setActiveReport('summary')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeReport === 'summary' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Summary Report
            </button>
            <button
              onClick={() => setActiveReport('accuracy')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeReport === 'accuracy' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Target className="w-4 h-4" />
              Accuracy Analysis
            </button>
            <button
              onClick={() => setActiveReport('team_performance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeReport === 'team_performance' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="w-4 h-4" />
              Team Performance
            </button>
            <button
              onClick={() => setActiveReport('financial')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeReport === 'financial' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Financial Impact
            </button>
            <button
              onClick={() => setActiveReport('trends')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeReport === 'trends' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Trends & Analytics
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Summary Report */}
          {activeReport === 'summary' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Opname Summary Report</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Opname Number</p>
                      <p className="text-gray-900 font-medium">{currentReport.plan_no}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Warehouse</p>
                      <p className="text-gray-900 font-medium">{currentReport.warehouse}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="text-gray-900 font-medium">{currentReport.opname_date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="text-gray-900 font-medium">{currentReport.duration_hours} hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Counting Statistics */}
              <div>
                <h4 className="text-gray-900 font-medium mb-3">Counting Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 mb-1">Total Items Counted</p>
                    <p className="text-2xl font-bold text-blue-900">{currentReport.items_counted}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-700 mb-1">Variance Items</p>
                    <p className="text-2xl font-bold text-orange-900">{currentReport.variance_items}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 mb-1">Accuracy Rate</p>
                    <p className="text-2xl font-bold text-green-900">{currentReport.accuracy_pct.toFixed(2)}%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700 mb-1">Teams Deployed</p>
                    <p className="text-2xl font-bold text-purple-900">{currentReport.team_count}</p>
                  </div>
                </div>
              </div>

              {/* Variance Summary */}
              <div>
                <h4 className="text-gray-900 font-medium mb-3">Variance Summary</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-2 px-4 text-sm text-gray-600">Category</th>
                        <th className="text-center py-2 px-4 text-sm text-gray-600">Count</th>
                        <th className="text-center py-2 px-4 text-sm text-gray-600">%</th>
                        <th className="text-right py-2 px-4 text-sm text-gray-600">Value Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 text-gray-700">Zero Variance</td>
                        <td className="py-2 px-4 text-center text-gray-900">{currentReport.items_counted - currentReport.variance_items}</td>
                        <td className="py-2 px-4 text-center text-gray-900">{((currentReport.items_counted - currentReport.variance_items) / currentReport.items_counted * 100).toFixed(1)}%</td>
                        <td className="py-2 px-4 text-right text-green-600 font-medium">{formatCurrency(0)}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 text-gray-700">Small Variance (&lt;5%)</td>
                        <td className="py-2 px-4 text-center text-gray-900">15</td>
                        <td className="py-2 px-4 text-center text-gray-900">11.1%</td>
                        <td className="py-2 px-4 text-right text-yellow-600 font-medium">{formatCurrency(1500000)}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 text-gray-700">Medium Variance (5-10%)</td>
                        <td className="py-2 px-4 text-center text-gray-900">8</td>
                        <td className="py-2 px-4 text-center text-gray-900">5.9%</td>
                        <td className="py-2 px-4 text-right text-orange-600 font-medium">{formatCurrency(5200000)}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 text-gray-700">Large Variance (10-20%)</td>
                        <td className="py-2 px-4 text-center text-gray-900">7</td>
                        <td className="py-2 px-4 text-center text-gray-900">5.2%</td>
                        <td className="py-2 px-4 text-right text-red-600 font-medium">{formatCurrency(8000000)}</td>
                      </tr>
                      <tr className="bg-red-50">
                        <td className="py-2 px-4 text-red-900 font-medium">Critical Variance (&gt;20%)</td>
                        <td className="py-2 px-4 text-center text-red-900 font-bold">5</td>
                        <td className="py-2 px-4 text-center text-red-900 font-bold">3.7%</td>
                        <td className="py-2 px-4 text-right text-red-900 font-bold">{formatCurrency(21000000)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Variance by Reason */}
              <div>
                <h4 className="text-gray-900 font-medium mb-3">Top Variance Reasons</h4>
                <div className="space-y-2">
                  {varianceByReason.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{item.reason}</p>
                        <p className="text-sm text-gray-600">{item.count} items ({item.pct}%)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 font-medium">{formatCurrency(item.value)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Accuracy Analysis */}
          {activeReport === 'accuracy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory Accuracy Analysis</h3>

                {/* Accuracy Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 mb-2">Overall Accuracy (Qty Basis)</p>
                    <p className="text-3xl font-bold text-green-900">{currentReport.accuracy_pct.toFixed(2)}%</p>
                    <div className="mt-3 flex items-center gap-2">
                      {currentReport.accuracy_pct >= 95 ? (
                        <>
                          <Target className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700 font-medium">Target Met</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-xs text-orange-700 font-medium">Below Target (95%)</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 mb-2">SKU Accuracy</p>
                    <p className="text-3xl font-bold text-blue-900">74.07%</p>
                    <p className="text-xs text-blue-700 mt-3">100 / 135 SKUs with zero variance</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700 mb-2">Value Accuracy</p>
                    <p className="text-3xl font-bold text-purple-900">92.5%</p>
                    <p className="text-xs text-purple-700 mt-3">Based on total inventory value</p>
                  </div>
                </div>

                {/* Trend Chart Placeholder */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="text-gray-900 font-medium mb-4">Accuracy Trend (Last 6 Opnames)</h4>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Chart visualization would appear here</p>
                      <p className="text-sm text-gray-500 mt-1">Showing accuracy trend over time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Performance */}
          {activeReport === 'team_performance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Team Performance Report</h3>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm text-gray-600">Team</th>
                        <th className="text-center py-3 px-4 text-sm text-gray-600">Items Counted</th>
                        <th className="text-center py-3 px-4 text-sm text-gray-600">Accuracy %</th>
                        <th className="text-center py-3 px-4 text-sm text-gray-600">Speed (items/hr)</th>
                        <th className="text-center py-3 px-4 text-sm text-gray-600">Recount Needed</th>
                        <th className="text-center py-3 px-4 text-sm text-gray-600">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamPerformance.map((team, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-900 font-medium">{team.team}</td>
                          <td className="py-3 px-4 text-center text-gray-900">{team.items_counted}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`font-medium ${
                              team.accuracy >= 98 ? 'text-green-600' :
                              team.accuracy >= 95 ? 'text-blue-600' :
                              'text-orange-600'
                            }`}>
                              {team.accuracy}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-900">{team.speed}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={team.recount_needed === 0 ? 'text-green-600' : 'text-orange-600'}>
                              {team.recount_needed}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              team.accuracy >= 98 ? 'bg-green-100 text-green-700' :
                              team.accuracy >= 95 ? 'bg-blue-100 text-blue-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {team.accuracy >= 98 ? 'Excellent' :
                               team.accuracy >= 95 ? 'Good' :
                               'Fair'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Best Practices */}
                <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="text-blue-900 font-medium mb-2">Best Practices from Top Teams</h4>
                  <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                    <li>Team C achieved 100% accuracy with systematic location verification</li>
                    <li>Team B maintains high speed without compromising accuracy</li>
                    <li>Regular breaks improve counting accuracy by 5-8%</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Financial Impact */}
          {activeReport === 'financial' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Impact Report</h3>

                {/* P&L Impact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 mb-2">Inventory Gain</p>
                    <p className="text-xl font-bold text-green-900">{formatCurrency(4500000)}</p>
                    <p className="text-xs text-green-700 mt-1">18 items (positive variance)</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-700 mb-2">Inventory Loss</p>
                    <p className="text-xl font-bold text-red-900">{formatCurrency(40200000)}</p>
                    <p className="text-xs text-red-700 mt-1">17 items (negative variance)</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 mb-2">Net Impact on P&L</p>
                    <p className="text-xl font-bold text-red-900">{formatCurrency(-35700000)}</p>
                    <p className="text-xs text-blue-700 mt-1">Loss to be expensed</p>
                  </div>
                </div>

                {/* GL Account Breakdown */}
                <div>
                  <h4 className="text-gray-900 font-medium mb-3">Journal Entry Summary</h4>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left py-2 px-4 text-sm text-gray-600">GL Account</th>
                          <th className="text-right py-2 px-4 text-sm text-gray-600">Debit</th>
                          <th className="text-right py-2 px-4 text-sm text-gray-600">Credit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-4 text-gray-700">1140 - Inventory Asset</td>
                          <td className="py-2 px-4 text-right text-gray-900">{formatCurrency(4500000)}</td>
                          <td className="py-2 px-4 text-right text-gray-900">-</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-4 text-gray-700">8120 - Inventory Gain</td>
                          <td className="py-2 px-4 text-right text-gray-900">-</td>
                          <td className="py-2 px-4 text-right text-gray-900">{formatCurrency(4500000)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-4 text-gray-700">6210 - Shrinkage Expense</td>
                          <td className="py-2 px-4 text-right text-gray-900">{formatCurrency(1500000)}</td>
                          <td className="py-2 px-4 text-right text-gray-900">-</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-4 text-gray-700">6220 - Theft Loss</td>
                          <td className="py-2 px-4 text-right text-gray-900">{formatCurrency(40000000)}</td>
                          <td className="py-2 px-4 text-right text-gray-900">-</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-4 text-gray-700">1140 - Inventory Asset</td>
                          <td className="py-2 px-4 text-right text-gray-900">-</td>
                          <td className="py-2 px-4 text-right text-gray-900">{formatCurrency(41500000)}</td>
                        </tr>
                        <tr className="bg-gray-50 font-bold">
                          <td className="py-2 px-4 text-gray-900">Total</td>
                          <td className="py-2 px-4 text-right text-gray-900">{formatCurrency(46000000)}</td>
                          <td className="py-2 px-4 text-right text-gray-900">{formatCurrency(46000000)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trends & Analytics */}
          {activeReport === 'trends' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Historical Trends & Analytics</h3>

                {/* Historical Comparison */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <h4 className="text-gray-900 font-medium mb-4">Historical Opname Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left py-2 px-3 text-sm text-gray-600">Plan No</th>
                          <th className="text-left py-2 px-3 text-sm text-gray-600">Date</th>
                          <th className="text-center py-2 px-3 text-sm text-gray-600">Items</th>
                          <th className="text-center py-2 px-3 text-sm text-gray-600">Variances</th>
                          <th className="text-center py-2 px-3 text-sm text-gray-600">Accuracy</th>
                          <th className="text-right py-2 px-3 text-sm text-gray-600">Value Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockReports.map((report, idx) => (
                          <tr key={idx} className="border-b border-gray-200">
                            <td className="py-2 px-3 text-sm text-gray-900">{report.plan_no}</td>
                            <td className="py-2 px-3 text-sm text-gray-700">{report.opname_date}</td>
                            <td className="py-2 px-3 text-center text-sm text-gray-900">{report.items_counted}</td>
                            <td className="py-2 px-3 text-center text-sm text-gray-900">{report.variance_items}</td>
                            <td className="py-2 px-3 text-center text-sm">
                              <span className={`font-medium ${
                                report.accuracy_pct >= 95 ? 'text-green-600' : 'text-orange-600'
                              }`}>
                                {report.accuracy_pct.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right text-sm text-red-600 font-medium">
                              {formatCurrency(report.variance_value)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Insights & Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="text-blue-900 font-medium mb-3 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Key Insights
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• Accuracy improving month-over-month (+2.3%)</li>
                      <li>• Jakarta warehouse consistently above 95% target</li>
                      <li>• Shrinkage trending down (-15% vs last quarter)</li>
                      <li>• Team training program showing positive results</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <h4 className="text-orange-900 font-medium mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Recommendations
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-2">
                      <li>• Increase Bandung opname frequency to monthly</li>
                      <li>• Review Zone A security procedures (theft issues)</li>
                      <li>• Implement blind counting for all warehouses</li>
                      <li>• Schedule Team A for additional accuracy training</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Report"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700">Select export format for {selectedPlan}:</p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleExport('PDF')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-8 h-8 text-red-600" />
              <span className="text-gray-900 font-medium">PDF</span>
              <span className="text-xs text-gray-500">Formatted report</span>
            </button>

            <button
              onClick={() => handleExport('Excel')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-8 h-8 text-green-600" />
              <span className="text-gray-900 font-medium">Excel</span>
              <span className="text-xs text-gray-500">Raw data</span>
            </button>

            <button
              onClick={() => handleExport('CSV')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-gray-900 font-medium">CSV</span>
              <span className="text-xs text-gray-500">For integration</span>
            </button>

            <button
              onClick={() => handleExport('PowerPoint')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-8 h-8 text-orange-600" />
              <span className="text-gray-900 font-medium">PowerPoint</span>
              <span className="text-xs text-gray-500">Presentation</span>
            </button>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => setShowExportModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
