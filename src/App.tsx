import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingCart, Warehouse, TrendingUp, Truck, Users, CreditCard, Wallet, BookOpen, Shield, Database, ClipboardList, CheckSquare, Menu, X } from 'lucide-react';
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
import ApprovalModule from './components/modules/ApprovalModule';
import MasterModule from './components/modules/MasterModule';
import StockOpnameModule from './components/modules/StockOpnameModule';

type ModuleType = 'dashboard' | 'purchasing' | 'inventory' | 'sales' | 'delivery' | 'ar' | 'ap' | 'cash' | 'accounting' | 'security' | 'approval' | 'master' | 'stock-opname';

const modules = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, color: 'blue' },
  { id: 'purchasing', name: 'Pembelian', icon: ShoppingCart, color: 'purple' },
  { id: 'inventory', name: 'Gudang & Inventory', icon: Warehouse, color: 'green' },
  { id: 'stock-opname', name: 'Stock Opname', icon: ClipboardList, color: 'teal' },
  { id: 'sales', name: 'Penjualan', icon: TrendingUp, color: 'orange' },
  { id: 'delivery', name: 'Delivery/Ekspedisi', icon: Truck, color: 'cyan' },
  { id: 'ar', name: 'Piutang (A/R)', icon: Users, color: 'pink' },
  { id: 'ap', name: 'Hutang (A/P)', icon: CreditCard, color: 'red' },
  { id: 'cash', name: 'Kas & Operasional', icon: Wallet, color: 'emerald' },
  { id: 'accounting', name: 'Akuntansi (GL)', icon: BookOpen, color: 'indigo' },
  { id: 'security', name: 'Security', icon: Shield, color: 'slate' },
  { id: 'approval', name: 'Workflow Approval', icon: CheckSquare, color: 'blue' },
  { id: 'master', name: 'Master Data', icon: Database, color: 'amber' }
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size - using 640px (sm breakpoint) for better desktop support
  useEffect(() => {
    const checkMobile = () => {
      // Use 640px instead of 768px to avoid triggering mobile mode on small desktop windows
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when module changes
  const handleModuleChange = (module: ModuleType) => {
    setActiveModule(module);
    setMobileMenuOpen(false);
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard onNavigate={handleModuleChange} />;
      case 'purchasing': return <PurchasingModule />;
      case 'inventory': return <InventoryModule />;
      case 'stock-opname': return <StockOpnameModule />;
      case 'sales': return <SalesModule />;
      case 'delivery': return <DeliveryModule />;
      case 'ar': return <ARModule />;
      case 'ap': return <APModule />;
      case 'cash': return <CashModule />;
      case 'accounting': return <AccountingModule />;
      case 'security': return <SecurityModule />;
      case 'approval': return <ApprovalModule />;
      case 'master': return <MasterModule />;
      default: return <Dashboard onNavigate={handleModuleChange} />;
    }
  };

  const getModuleColors = (moduleId: string, isActive: boolean) => {
    const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
      dashboard: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' },
      purchasing: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-600' },
      inventory: { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-600' },
      'stock-opname': { bg: 'bg-teal-50', text: 'text-teal-600', icon: 'text-teal-600' },
      sales: { bg: 'bg-orange-50', text: 'text-orange-600', icon: 'text-orange-600' },
      delivery: { bg: 'bg-cyan-50', text: 'text-cyan-600', icon: 'text-cyan-600' },
      ar: { bg: 'bg-pink-50', text: 'text-pink-600', icon: 'text-pink-600' },
      ap: { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-600' },
      cash: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'text-emerald-600' },
      accounting: { bg: 'bg-indigo-50', text: 'text-indigo-600', icon: 'text-indigo-600' },
      security: { bg: 'bg-slate-50', text: 'text-slate-600', icon: 'text-slate-600' },
      approval: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' },
      master: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-600' }
    };
    
    if (isActive) {
      return colorMap[moduleId] || colorMap.dashboard;
    }
    return { bg: '', text: 'text-gray-700', icon: 'text-gray-500' };
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button - Only visible on mobile (< 640px) */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.svg" alt="MERCY Logo" className="w-8 h-8" />
          <div>
            <h1 className="text-xs font-bold text-gray-900">MERCY</h1>
            <p className="text-[10px] text-gray-500">Medimart ERP</p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: Always visible, Mobile: Overlay when open */}
      <aside className={`
        bg-white border-r border-gray-200 transition-all duration-300 z-50
        ${isMobile
          ? `fixed inset-y-0 left-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
          : `${sidebarOpen ? 'w-64' : 'w-20'}`
        }
      `}>
        <div className="h-full flex flex-col">
          {/* Logo - Desktop only (>= 640px) */}
          <div className="p-4 border-b border-gray-200 hidden sm:block">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.svg" alt="MERCY Logo" className="w-10 h-10" />
              {sidebarOpen && (
                <div>
                  <h1 className="text-sm font-bold text-gray-900">MERCY</h1>
                  <p className="text-xs text-gray-500">Medimart ERP v1.0</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 overflow-y-auto p-3 space-y-1 ${isMobile ? 'mt-16' : ''}`}>
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;

              const colors = getModuleColors(module.id, isActive);

              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleChange(module.id as ModuleType)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? `${colors.bg} ${colors.text} shadow-sm`
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={module.name}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? colors.icon : 'text-gray-500'}`} />
                  {(isMobile || sidebarOpen) && <span className="truncate">{module.name}</span>}
                </button>
              );
            })}
          </nav>

          {/* Toggle Button - Desktop only (>= 640px) */}
          <div className="p-3 border-t border-gray-200 hidden sm:block">
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
      <main className={`flex-1 overflow-auto ${isMobile ? 'pt-14' : ''}`}>
        {renderModule()}
      </main>
    </div>
  );
}