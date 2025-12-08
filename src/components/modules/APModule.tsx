import { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, FileText } from 'lucide-react';

const apData = [
  { id: 1, vendor: 'PT Supplier Jaya', total: 12500000, current: 5000000, d30: 4000000, d60: 2500000, d90: 1000000 },
  { id: 2, vendor: 'CV Maju Terus', total: 8200000, current: 8200000, d30: 0, d60: 0, d90: 0 }
];

const payments = [
  { id: 1, paymentNo: 'PAY-001', vendor: 'PT Supplier Jaya', invoiceNo: 'INV-V001-123', amount: 5000000, date: '2025-12-07', method: 'Transfer', status: 'COMPLETED' },
  { id: 2, paymentNo: 'PAY-002', vendor: 'CV Maju Terus', invoiceNo: 'INV-V002-456', amount: 3000000, date: '2025-12-07', method: 'Check', status: 'PENDING' }
];

const margins = [
  { id: 1, product: 'Product Alpha', cost: 100000, price: 135000, margin: 25.9, volume: 150, contribution: 5250000 },
  { id: 2, product: 'Product Beta', cost: 50000, price: 62000, margin: 19.4, volume: 89, contribution: 1068000 },
  { id: 3, product: 'Product Gamma', cost: 75000, price: 95000, margin: 21.1, volume: 120, contribution: 2400000 }
];

export default function APModule() {
  const [activeTab, setActiveTab] = useState<'aging' | 'payment' | 'margin' | 'profit'>('aging');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-1">Modul Hutang Vendor (A/P)</h1>
        <p className="text-gray-600">Invoice, Payment, Margin Analysis, Profitability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total AP</p>
              <p className="text-gray-900">Rp 650K</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Due This Week</p>
              <p className="text-gray-900">Rp 280K</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Avg Margin</p>
              <p className="text-gray-900">22.1%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Paid Today</p>
              <p className="text-gray-900">Rp 156K</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            {['aging', 'payment', 'margin', 'profit'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${activeTab === tab ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab === 'aging' ? 'Aging Hutang' : tab === 'payment' ? 'Payment' : tab === 'margin' ? 'Margin Analysis' : 'Laporan Laba'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'aging' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Vendor</th>
                    <th className="text-right py-3 px-4 text-gray-600">Total</th>
                    <th className="text-right py-3 px-4 text-gray-600">Current</th>
                    <th className="text-right py-3 px-4 text-gray-600">1-30 Days</th>
                    <th className="text-right py-3 px-4 text-gray-600">31-60 Days</th>
                    <th className="text-right py-3 px-4 text-gray-600">61-90 Days</th>
                  </tr>
                </thead>
                <tbody>
                  {apData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{item.vendor}</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(item.total / 1000000).toFixed(1)}M</td>
                      <td className="py-3 px-4 text-right text-green-600">Rp {(item.current / 1000000).toFixed(1)}M</td>
                      <td className="py-3 px-4 text-right text-yellow-600">Rp {(item.d30 / 1000000).toFixed(1)}M</td>
                      <td className="py-3 px-4 text-right text-orange-600">Rp {(item.d60 / 1000000).toFixed(1)}M</td>
                      <td className="py-3 px-4 text-right text-red-600">Rp {(item.d90 / 1000000).toFixed(1)}M</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Payment No</th>
                    <th className="text-left py-3 px-4 text-gray-600">Vendor</th>
                    <th className="text-left py-3 px-4 text-gray-600">Invoice No</th>
                    <th className="text-right py-3 px-4 text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                    <th className="text-center py-3 px-4 text-gray-600">Method</th>
                    <th className="text-center py-3 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{payment.paymentNo}</td>
                      <td className="py-3 px-4 text-gray-700">{payment.vendor}</td>
                      <td className="py-3 px-4 text-gray-700">{payment.invoiceNo}</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(payment.amount / 1000000).toFixed(1)}M</td>
                      <td className="py-3 px-4 text-gray-700">{payment.date}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">{payment.method}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          payment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'margin' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Product</th>
                    <th className="text-right py-3 px-4 text-gray-600">Cost</th>
                    <th className="text-right py-3 px-4 text-gray-600">Price</th>
                    <th className="text-center py-3 px-4 text-gray-600">Margin %</th>
                    <th className="text-center py-3 px-4 text-gray-600">Volume</th>
                    <th className="text-right py-3 px-4 text-gray-600">Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {margins.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{item.product}</td>
                      <td className="py-3 px-4 text-right text-gray-700">Rp {(item.cost / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(item.price / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          item.margin > 25 ? 'bg-green-100 text-green-700' :
                          item.margin > 15 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.margin.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">{item.volume}</td>
                      <td className="py-3 px-4 text-right text-gray-900">Rp {(item.contribution / 1000000).toFixed(1)}M</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'profit' && (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-700 mb-2">Laporan Laba per Produk/Outlet</h3>
              <p className="text-gray-500">Detailed profitability analysis by product, outlet, and sales person</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
