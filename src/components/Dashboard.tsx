import { ShoppingCart, Warehouse, TrendingUp, Truck, Users, CreditCard, Wallet, BookOpen, Shield, Database, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';

interface DashboardProps {
  onNavigate: (module: string) => void;
}

const statsData = [
  { label: 'Total Sales', value: 'Rp 2.4M', change: '+12.5%', trend: 'up', color: 'orange' },
  { label: 'Total Purchases', value: 'Rp 1.8M', change: '+8.3%', trend: 'up', color: 'purple' },
  { label: 'Stock Value', value: 'Rp 5.2M', change: '-2.1%', trend: 'down', color: 'green' },
  { label: 'Outstanding AR', value: 'Rp 890K', change: '+5.2%', trend: 'up', color: 'pink' },
  { label: 'Outstanding AP', value: 'Rp 650K', change: '-3.4%', trend: 'down', color: 'red' },
  { label: 'Cash Balance', value: 'Rp 1.2M', change: '+15.8%', trend: 'up', color: 'emerald' }
];

const moduleCards = [
  {
    id: 'purchasing',
    name: 'Pembelian',
    icon: ShoppingCart,
    color: 'purple',
    stats: '45 PO Active',
    description: 'Vendor, Matching PO-GR-Invoice'
  },
  {
    id: 'inventory',
    name: 'Gudang & Inventory',
    icon: Warehouse,
    color: 'green',
    stats: '1,234 Items',
    description: 'Stock, Barcode, Transfer'
  },
  {
    id: 'sales',
    name: 'Penjualan',
    icon: TrendingUp,
    color: 'orange',
    stats: '89 SO Today',
    description: 'PO, Refund, Faktur, Plafon'
  },
  {
    id: 'delivery',
    name: 'Delivery/Ekspedisi',
    icon: Truck,
    color: 'cyan',
    stats: '23 In Transit',
    description: 'Picking, Packing, Pengiriman'
  },
  {
    id: 'ar',
    name: 'Piutang (A/R)',
    icon: Users,
    color: 'pink',
    stats: 'Rp 890K Due',
    description: 'Aging, Collection, Matching'
  },
  {
    id: 'ap',
    name: 'Hutang (A/P)',
    icon: CreditCard,
    color: 'red',
    stats: 'Rp 650K Due',
    description: 'Invoice, Payment, Margin'
  },
  {
    id: 'cash',
    name: 'Kas & Operasional',
    icon: Wallet,
    color: 'emerald',
    stats: 'Rp 245K Today',
    description: 'Pengeluaran, Rekap, Bukti'
  },
  {
    id: 'accounting',
    name: 'Akuntansi (GL)',
    icon: BookOpen,
    color: 'indigo',
    stats: '156 Entries',
    description: 'COA, Laporan, Jurnal'
  },
  {
    id: 'security',
    name: 'Security & Approval',
    icon: Shield,
    color: 'slate',
    stats: '12 Pending',
    description: '2FA, Approval, Audit Log'
  },
  {
    id: 'master',
    name: 'Master Data',
    icon: Database,
    color: 'amber',
    stats: '5 Modules',
    description: 'Produk, Vendor, Customer'
  }
];

const alerts = [
  { type: 'warning', message: '15 items low stock alert', module: 'inventory' },
  { type: 'info', message: '12 approvals pending', module: 'security' },
  { type: 'warning', message: '8 invoices overdue > 30 days', module: 'ar' },
  { type: 'success', message: '23 deliveries on schedule', module: 'delivery' }
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
      slate: { bg: 'bg-slate-100', text: 'text-slate-600' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600' }
    };
    return colorMap[color] || colorMap.purple;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-gray-600">Medimart Enterprise Resource System - Version 1.0</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-gray-900 mb-2">{stat.value}</p>
            <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <h2 className="text-gray-900">Alerts & Notifications</h2>
        </div>
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                alert.type === 'warning' ? 'bg-orange-50 border-orange-200' :
                alert.type === 'info' ? 'bg-blue-50 border-blue-200' :
                'bg-green-50 border-green-200'
              }`}
            >
              <span className="text-gray-700">{alert.message}</span>
              <button
                onClick={() => onNavigate(alert.module)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                View →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-gray-900 mb-4">Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {moduleCards.map((module) => {
            const Icon = module.icon;
            const colorClasses = getColorClasses(module.color);
            return (
              <button
                key={module.id}
                onClick={() => onNavigate(module.id)}
                className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
                <h3 className="text-gray-900 mb-1">{module.name}</h3>
                <p className={`text-${module.color}-600 text-sm mb-2`}>{module.stats}</p>
                <p className="text-gray-500 text-sm">{module.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}