import { useState } from 'react';
import { LayoutDashboard, ShoppingCart, Warehouse, TrendingUp, Truck, Users, CreditCard, Wallet, BookOpen, Shield, Database } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PurchasingModule from './components/modules/PurchasingModule';
import InventoryModule from './components/modules/InventoryModule';
import SalesModule from './components/modules/SalesModule';
import DeliveryModule from './components/modules/DeliveryModule';
import ARModule from './components/modules/ARModule';
import APModule from './components/modules/APModule';
import CashModule from './components/modules/CashModule';
import AccountingModule from './components/modules/AccountingModule';
import SecurityModule from './components/modules/SecurityModule';
import MasterModule from './components/modules/MasterModule';

type ModuleType = 'dashboard' | 'purchasing' | 'inventory' | 'sales' | 'delivery' | 'ar' | 'ap' | 'cash' | 'accounting' | 'security' | 'master';

const modules = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, color: 'blue' },
  { id: 'purchasing', name: 'Pembelian', icon: ShoppingCart, color: 'purple' },
  { id: 'inventory', name: 'Gudang & Inventory', icon: Warehouse, color: 'green' },
  { id: 'sales', name: 'Penjualan', icon: TrendingUp, color: 'orange' },
  { id: 'delivery', name: 'Delivery/Ekspedisi', icon: Truck, color: 'cyan' },
  { id: 'ar', name: 'Piutang (A/R)', icon: Users, color: 'pink' },
  { id: 'ap', name: 'Hutang (A/P)', icon: CreditCard, color: 'red' },
  { id: 'cash', name: 'Kas & Operasional', icon: Wallet, color: 'emerald' },
  { id: 'accounting', name: 'Akuntansi (GL)', icon: BookOpen, color: 'indigo' },
  { id: 'security', name: 'Security & Approval', icon: Shield, color: 'slate' },
  { id: 'master', name: 'Master Data', icon: Database, color: 'amber' }
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard onNavigate={setActiveModule} />;
      case 'purchasing': return <PurchasingModule />;
      case 'inventory': return <InventoryModule />;
      case 'sales': return <SalesModule />;
      case 'delivery': return <DeliveryModule />;
      case 'ar': return <ARModule />;
      case 'ap': return <APModule />;
      case 'cash': return <CashModule />;
      case 'accounting': return <AccountingModule />;
      case 'security': return <SecurityModule />;
      case 'master': return <MasterModule />;
      default: return <Dashboard onNavigate={setActiveModule} />;
    }
  };

  const getModuleColors = (moduleId: string, isActive: boolean) => {
    const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
      dashboard: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' },
      purchasing: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-600' },
      inventory: { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-600' },
      sales: { bg: 'bg-orange-50', text: 'text-orange-600', icon: 'text-orange-600' },
      delivery: { bg: 'bg-cyan-50', text: 'text-cyan-600', icon: 'text-cyan-600' },
      ar: { bg: 'bg-pink-50', text: 'text-pink-600', icon: 'text-pink-600' },
      ap: { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-600' },
      cash: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'text-emerald-600' },
      accounting: { bg: 'bg-indigo-50', text: 'text-indigo-600', icon: 'text-indigo-600' },
      security: { bg: 'bg-slate-50', text: 'text-slate-600', icon: 'text-slate-600' },
      master: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-600' }
    };
    
    if (isActive) {
      return colorMap[moduleId] || colorMap.dashboard;
    }
    return { bg: '', text: 'text-gray-700', icon: 'text-gray-500' };
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-gray-900">ERP System</h1>
                  <p className="text-xs text-gray-500">v1.0</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;
              
              const colors = getModuleColors(module.id, isActive);
              
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id as ModuleType)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive 
                      ? `${colors.bg} ${colors.text} shadow-sm` 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={module.name}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? colors.icon : 'text-gray-500'}`} />
                  {sidebarOpen && <span className="truncate">{module.name}</span>}
                </button>
              );
            })}
          </nav>

          {/* Toggle Button */}
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {renderModule()}
      </main>
    </div>
  );
}