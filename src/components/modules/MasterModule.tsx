import { useState, useMemo, useCallback, memo } from 'react';
import { Package, Building2, Users, Store, DollarSign, Search, TrendingUp, Percent, History, Eye, Edit2, Trash2 } from 'lucide-react';
import Modal from '../Modal';

const products = [
  { id: 1, sku: 'PRD-001', name: 'Product Alpha', category: 'Electronics', brand: 'Brand A', price: 135000, cost: 100000, margin: 25.9, stock: 150, status: 'Active' },
  { id: 2, sku: 'PRD-002', name: 'Product Beta', category: 'Accessories', brand: 'Brand B', price: 62000, cost: 50000, margin: 19.4, stock: 89, status: 'Active' },
  { id: 3, sku: 'PRD-003', name: 'Product Gamma', category: 'Electronics', brand: 'Brand A', price: 95000, cost: 75000, margin: 21.1, stock: 0, status: 'Out of Stock' }
];

const branches = [
  { id: 1, code: 'JKT', name: 'Jakarta', type: 'HQ', address: 'Jakarta Selatan', phone: '021-12345678', manager: 'John Doe', status: 'Active' },
  { id: 2, code: 'BDG', name: 'Bandung', type: 'Branch', address: 'Bandung Kota', phone: '022-87654321', manager: 'Jane Smith', status: 'Active' },
  { id: 3, code: 'SBY', name: 'Surabaya', type: 'Warehouse', address: 'Surabaya Barat', phone: '031-11223344', manager: 'Bob Wilson', status: 'Active' }
];

const vendors = [
  { id: 1, code: 'V001', name: 'PT Supplier Jaya', category: 'Local', contact: 'Ahmad', phone: '0812-3456-7890', isPkp: true, rating: 4.5, status: 'Active' },
  { id: 2, code: 'V002', name: 'CV Maju Terus', category: 'Local', contact: 'Budi', phone: '0813-9876-5432', isPkp: false, rating: 4.2, status: 'Active' },
  { id: 3, code: 'V003', name: 'UD Sejahtera', category: 'Import', contact: 'Chandra', phone: '0821-1122-3344', isPkp: true, rating: 4.8, status: 'Active' }
];

const customers = [
  { id: 1, code: 'C001', name: 'Toko Jaya', category: 'Retail', contact: 'Dewi', phone: '0856-1234-5678', creditLimit: 10000000, outstanding: 3200000, status: 'Active' },
  { id: 2, code: 'C002', name: 'UD Maju', category: 'Wholesale', contact: 'Eko', phone: '0857-9876-5432', creditLimit: 8000000, outstanding: 7500000, status: 'Active' },
  { id: 3, code: 'C003', name: 'CV Sejahtera', category: 'VIP', contact: 'Fani', phone: '0858-1122-3344', creditLimit: 15000000, outstanding: 4200000, status: 'Active' }
];

// Price Lists - Different pricing tiers
const priceLists = [
  { id: 1, name: 'Retail Price', code: 'RETAIL', type: 'Standard', description: 'Standard retail pricing for walk-in customers', products: 1234, status: 'Active', markup: 35 },
  { id: 2, name: 'Wholesale Price', code: 'WHOLESALE', type: 'Volume', description: 'Wholesale pricing for bulk orders (min 100 units)', products: 856, status: 'Active', markup: 25 },
  { id: 3, name: 'VIP Customer', code: 'VIP', type: 'Special', description: 'Special pricing for VIP customers', products: 1120, status: 'Active', markup: 20 },
  { id: 4, name: 'Distributor Price', code: 'DIST', type: 'Dealer', description: 'Distributor/dealer pricing', products: 945, status: 'Active', markup: 15 },
  { id: 5, name: 'Online Channel', code: 'ONLINE', type: 'Channel', description: 'E-commerce and online marketplace pricing', products: 782, status: 'Active', markup: 30 }
];

// Price History for tracking
const priceHistory = [
  { id: 1, product: 'Product Alpha', sku: 'PRD-001', oldPrice: 125000, newPrice: 135000, changeDate: '2024-11-15', changedBy: 'Admin', reason: 'Market adjustment' },
  { id: 2, product: 'Product Beta', sku: 'PRD-002', oldPrice: 58000, newPrice: 62000, changeDate: '2024-11-20', changedBy: 'Manager', reason: 'Cost increase' },
  { id: 3, product: 'Product Gamma', sku: 'PRD-003', oldPrice: 95000, newPrice: 95000, changeDate: '2024-11-01', changedBy: 'Admin', reason: 'No change' }
];

// Margin Configuration
const marginConfig = {
  targetMargin: 25,
  minimumMargin: 15,
  warningThreshold: 18,
  priceRoundingRule: 'nearest_1000',
  autoUpdatePricing: false
};

// Memoized table row component for performance
const ProductRow = memo(({ product }: { product: typeof products[0] }) => (
  <tr className="border-b border-gray-100 hover:bg-gray-50">
    <td className="py-3 px-4 text-gray-900">{product.sku}</td>
    <td className="py-3 px-4 text-gray-900">{product.name}</td>
    <td className="py-3 px-4 text-gray-700">{product.category}</td>
    <td className="py-3 px-4 text-gray-700">{product.brand}</td>
    <td className="py-3 px-4 text-right text-gray-900">Rp {(product.price / 1000).toFixed(0)}K</td>
    <td className="py-3 px-4 text-right text-gray-700">Rp {(product.cost / 1000).toFixed(0)}K</td>
    <td className="py-3 px-4 text-center">
      <span className={`px-2 py-1 rounded text-sm ${
        product.margin > 25 ? 'bg-green-100 text-green-700' :
        product.margin > 15 ? 'bg-yellow-100 text-yellow-700' :
        'bg-red-100 text-red-700'
      }`}>
        {product.margin.toFixed(1)}%
      </span>
    </td>
    <td className="py-3 px-4 text-center text-gray-900">{product.stock}</td>
    <td className="py-3 px-4 text-center">
      <span className={`px-2 py-1 rounded text-sm ${
        product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {product.status}
      </span>
    </td>
  </tr>
));

ProductRow.displayName = 'ProductRow';

export default function MasterModule() {
  const [activeTab, setActiveTab] = useState<'products' | 'branches' | 'vendors' | 'customers' | 'pricing'>('products');
  const [pricingSubTab, setPricingSubTab] = useState<'lists' | 'history' | 'margin' | 'bulk'>('lists');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Memoized filtered products with search
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(p =>
      p.sku.toLowerCase().includes(query) ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Memoized filtered branches
  const filteredBranches = useMemo(() => {
    if (!searchQuery) return branches;
    const query = searchQuery.toLowerCase();
    return branches.filter(b =>
      b.code.toLowerCase().includes(query) ||
      b.name.toLowerCase().includes(query) ||
      b.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Memoized filtered vendors
  const filteredVendors = useMemo(() => {
    if (!searchQuery) return vendors;
    const query = searchQuery.toLowerCase();
    return vendors.filter(v =>
      v.code.toLowerCase().includes(query) ||
      v.name.toLowerCase().includes(query) ||
      v.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Memoized filtered customers
  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(c =>
      c.code.toLowerCase().includes(query) ||
      c.name.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Memoized pagination calculation
  const paginatedData = useMemo(() => {
    let data: any[] = [];
    switch(activeTab) {
      case 'products': data = filteredProducts; break;
      case 'branches': data = filteredBranches; break;
      case 'vendors': data = filteredVendors; break;
      case 'customers': data = filteredCustomers; break;
      default: data = [];
    }
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [activeTab, currentPage, filteredProducts, filteredBranches, filteredVendors, filteredCustomers]);

  // Memoized total pages
  const totalPages = useMemo(() => {
    let total = 0;
    switch(activeTab) {
      case 'products': total = filteredProducts.length; break;
      case 'branches': total = filteredBranches.length; break;
      case 'vendors': total = filteredVendors.length; break;
      case 'customers': total = filteredCustomers.length; break;
      default: total = 0;
    }
    return Math.ceil(total / itemsPerPage);
  }, [activeTab, filteredProducts, filteredBranches, filteredVendors, filteredCustomers]);

  // Optimized callbacks
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  }, []);

  const handleTabChange = useCallback((tab: typeof activeTab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Modal handlers
  const handleOpenModal = useCallback((mode: 'add' | 'edit' | 'view', item?: any) => {
    setModalMode(mode);
    setSelectedItem(item || null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  const handleSaveItem = useCallback((formData: any) => {
    // TODO: Implement actual save logic (API call, state management, etc.)
    console.log('Saving item:', formData);
    handleCloseModal();
  }, [handleCloseModal]);

  const handleDeleteItem = useCallback((id: number) => {
    // TODO: Implement actual delete logic (API call, state management, etc.)
    if (window.confirm('Are you sure you want to delete this item?')) {
      console.log('Deleting item:', id);
    }
  }, []);

  // Calculate margin statistics
  const marginStats = useMemo(() => {
    const avgMargin = products.reduce((sum, p) => sum + p.margin, 0) / products.length;
    const lowMarginCount = products.filter(p => p.margin < marginConfig.minimumMargin).length;
    const targetMarginCount = products.filter(p => p.margin >= marginConfig.targetMargin).length;
    return { avgMargin, lowMarginCount, targetMarginCount };
  }, []);

  // Render modal content based on active tab and mode
  const renderModalContent = () => {
    const isViewMode = modalMode === 'view';
    const isEditMode = modalMode === 'edit';
    const isAddMode = modalMode === 'add';

    if (activeTab === 'products') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handleSaveItem(new FormData(e.currentTarget)); }}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  name="sku"
                  defaultValue={selectedItem?.sku || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedItem?.name || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  defaultValue={selectedItem?.category || 'Electronics'}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                >
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Fashion</option>
                  <option>Home & Living</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  defaultValue={selectedItem?.brand || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost (Rp)</label>
                <input
                  type="number"
                  name="cost"
                  defaultValue={selectedItem?.cost || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rp)</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedItem?.price || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  defaultValue={selectedItem?.stock || 0}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={selectedItem?.status || 'Active'}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>
            {!isViewMode && (
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  {isEditMode ? 'Update' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </form>
      );
    }

    if (activeTab === 'branches') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handleSaveItem(new FormData(e.currentTarget)); }}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                <input
                  type="text"
                  name="code"
                  defaultValue={selectedItem?.code || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedItem?.name || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  defaultValue={selectedItem?.type || 'Branch'}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                >
                  <option>HQ</option>
                  <option>Branch</option>
                  <option>Warehouse</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                <input
                  type="text"
                  name="manager"
                  defaultValue={selectedItem?.manager || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                defaultValue={selectedItem?.address || ''}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={selectedItem?.phone || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={selectedItem?.status || 'Active'}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            {!isViewMode && (
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  {isEditMode ? 'Update' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </form>
      );
    }

    if (activeTab === 'vendors') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handleSaveItem(new FormData(e.currentTarget)); }}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Code</label>
                <input
                  type="text"
                  name="code"
                  defaultValue={selectedItem?.code || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedItem?.name || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  defaultValue={selectedItem?.category || 'Local'}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                >
                  <option>Local</option>
                  <option>Import</option>
                  <option>Distributor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  name="contact"
                  defaultValue={selectedItem?.contact || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={selectedItem?.phone || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input
                  type="number"
                  name="rating"
                  step="0.1"
                  min="0"
                  max="5"
                  defaultValue={selectedItem?.rating || 0}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPkp"
                    defaultChecked={selectedItem?.isPkp || false}
                    disabled={isViewMode}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-gray-700">PKP (Pengusaha Kena Pajak)</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={selectedItem?.status || 'Active'}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            {!isViewMode && (
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  {isEditMode ? 'Update' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </form>
      );
    }

    if (activeTab === 'customers') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handleSaveItem(new FormData(e.currentTarget)); }}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Code</label>
                <input
                  type="text"
                  name="code"
                  defaultValue={selectedItem?.code || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedItem?.name || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  defaultValue={selectedItem?.category || 'Retail'}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                >
                  <option>Retail</option>
                  <option>Wholesale</option>
                  <option>VIP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  name="contact"
                  defaultValue={selectedItem?.contact || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={selectedItem?.phone || ''}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Limit (Rp)</label>
                <input
                  type="number"
                  name="creditLimit"
                  defaultValue={selectedItem?.creditLimit || 0}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outstanding (Rp)</label>
                <input
                  type="number"
                  name="outstanding"
                  defaultValue={selectedItem?.outstanding || 0}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={selectedItem?.status || 'Active'}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            {!isViewMode && (
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  {isEditMode ? 'Update' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </form>
      );
    }

    return null;
  };

  // Get modal title based on active tab and mode
  const getModalTitle = () => {
    const action = modalMode === 'add' ? 'Add' : modalMode === 'edit' ? 'Edit' : 'View';
    const entity = activeTab === 'products' ? 'Product' :
                   activeTab === 'branches' ? 'Branch' :
                   activeTab === 'vendors' ? 'Vendor' :
                   activeTab === 'customers' ? 'Customer' : '';
    return `${action} ${entity}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-1">Modul Master Data</h1>
        <p className="text-gray-600">Produk, Cabang, Vendor, Customer, Harga & Margin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Products</p>
              <p className="text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Branches</p>
              <p className="text-gray-900">15</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Vendors</p>
              <p className="text-gray-900">87</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Customers</p>
              <p className="text-gray-900">456</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Price Lists</p>
              <p className="text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            {['products', 'branches', 'vendors', 'customers', 'pricing'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as any)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${activeTab === tab ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab === 'products' ? 'Products & Category' : tab === 'branches' ? 'Branches' : tab === 'vendors' ? 'Vendors' : tab === 'customers' ? 'Customers/Outlets' : 'Pricing & Margin'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products by SKU, name, category, or brand..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <button
                  onClick={() => handleOpenModal('add')}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Add Product
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600">SKU</th>
                      <th className="text-left py-3 px-4 text-gray-600">Product Name</th>
                      <th className="text-left py-3 px-4 text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 text-gray-600">Brand</th>
                      <th className="text-right py-3 px-4 text-gray-600">Price</th>
                      <th className="text-right py-3 px-4 text-gray-600">Cost</th>
                      <th className="text-center py-3 px-4 text-gray-600">Margin %</th>
                      <th className="text-center py-3 px-4 text-gray-600">Stock</th>
                      <th className="text-center py-3 px-4 text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{product.sku}</td>
                          <td className="py-3 px-4 text-gray-900">{product.name}</td>
                          <td className="py-3 px-4 text-gray-700">{product.category}</td>
                          <td className="py-3 px-4 text-gray-700">{product.brand}</td>
                          <td className="py-3 px-4 text-right text-gray-900">Rp {(product.price / 1000).toFixed(0)}K</td>
                          <td className="py-3 px-4 text-right text-gray-700">Rp {(product.cost / 1000).toFixed(0)}K</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded text-sm ${
                              product.margin > 25 ? 'bg-green-100 text-green-700' :
                              product.margin > 15 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {product.margin.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-900">{product.stock}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded text-sm ${
                              product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenModal('view', product)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenModal('edit', product)}
                                className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(product.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-gray-500">
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {filteredProducts.length > itemsPerPage && (
                <div className="flex justify-center gap-2 pt-4">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-amber-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'branches' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => handleOpenModal('add')}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Add Branch
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600">Code</th>
                      <th className="text-left py-3 px-4 text-gray-600">Branch Name</th>
                      <th className="text-left py-3 px-4 text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 text-gray-600">Address</th>
                      <th className="text-left py-3 px-4 text-gray-600">Phone</th>
                      <th className="text-left py-3 px-4 text-gray-600">Manager</th>
                      <th className="text-center py-3 px-4 text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.map((branch) => (
                      <tr key={branch.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{branch.code}</td>
                        <td className="py-3 px-4 text-gray-900">{branch.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            branch.type === 'HQ' ? 'bg-purple-100 text-purple-700' :
                            branch.type === 'Branch' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {branch.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{branch.address}</td>
                        <td className="py-3 px-4 text-gray-700">{branch.phone}</td>
                        <td className="py-3 px-4 text-gray-700">{branch.manager}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">{branch.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenModal('view', branch)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenModal('edit', branch)}
                              className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(branch.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'vendors' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => handleOpenModal('add')}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Add Vendor
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600">Code</th>
                      <th className="text-left py-3 px-4 text-gray-600">Vendor Name</th>
                      <th className="text-left py-3 px-4 text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 text-gray-600">Contact Person</th>
                      <th className="text-left py-3 px-4 text-gray-600">Phone</th>
                      <th className="text-center py-3 px-4 text-gray-600">PKP</th>
                      <th className="text-center py-3 px-4 text-gray-600">Rating</th>
                      <th className="text-center py-3 px-4 text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{vendor.code}</td>
                        <td className="py-3 px-4 text-gray-900">{vendor.name}</td>
                        <td className="py-3 px-4 text-gray-700">{vendor.category}</td>
                        <td className="py-3 px-4 text-gray-700">{vendor.contact}</td>
                        <td className="py-3 px-4 text-gray-700">{vendor.phone}</td>
                        <td className="py-3 px-4 text-center">
                          {vendor.isPkp ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">PKP</span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">Non-PKP</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                            ★ {vendor.rating}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">{vendor.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenModal('view', vendor)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenModal('edit', vendor)}
                              className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(vendor.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => handleOpenModal('add')}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Add Customer
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600">Code</th>
                      <th className="text-left py-3 px-4 text-gray-600">Customer Name</th>
                      <th className="text-left py-3 px-4 text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 text-gray-600">Contact</th>
                      <th className="text-left py-3 px-4 text-gray-600">Phone</th>
                      <th className="text-right py-3 px-4 text-gray-600">Credit Limit</th>
                      <th className="text-right py-3 px-4 text-gray-600">Outstanding</th>
                      <th className="text-center py-3 px-4 text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{customer.code}</td>
                        <td className="py-3 px-4 text-gray-900">{customer.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            customer.category === 'VIP' ? 'bg-purple-100 text-purple-700' :
                            customer.category === 'Wholesale' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {customer.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{customer.contact}</td>
                        <td className="py-3 px-4 text-gray-700">{customer.phone}</td>
                        <td className="py-3 px-4 text-right text-gray-900">Rp {(customer.creditLimit / 1000000).toFixed(1)}M</td>
                        <td className="py-3 px-4 text-right">
                          <span className={customer.outstanding > customer.creditLimit * 0.8 ? 'text-red-600' : 'text-gray-900'}>
                            Rp {(customer.outstanding / 1000000).toFixed(1)}M
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">{customer.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenModal('view', customer)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenModal('edit', customer)}
                              className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(customer.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-4">
              {/* Sub-tabs for Pricing Module */}
              <div className="border-b border-gray-200">
                <div className="flex gap-2">
                  {[
                    { id: 'lists', label: 'Price Lists', icon: DollarSign },
                    { id: 'margin', label: 'Margin Analysis', icon: Percent },
                    { id: 'history', label: 'Price History', icon: History },
                    { id: 'bulk', label: 'Bulk Update', icon: TrendingUp }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setPricingSubTab(id as any)}
                      className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                        pricingSubTab === id
                          ? 'border-amber-600 text-amber-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Lists Tab */}
              {pricingSubTab === 'lists' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-900 font-medium">Price List Management</h3>
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                      Create New Price List
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {priceLists.map((priceList) => (
                      <div key={priceList.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-gray-900 font-medium">{priceList.name}</h4>
                            <span className="text-sm text-gray-600">{priceList.code}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            priceList.type === 'Standard' ? 'bg-blue-100 text-blue-700' :
                            priceList.type === 'Volume' ? 'bg-purple-100 text-purple-700' :
                            priceList.type === 'Special' ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {priceList.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{priceList.description}</p>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                          <div className="flex gap-4 text-sm">
                            <span className="text-gray-600">
                              <span className="font-medium text-gray-900">{priceList.products}</span> products
                            </span>
                            <span className="text-gray-600">
                              <span className="font-medium text-green-700">+{priceList.markup}%</span> markup
                            </span>
                          </div>
                          <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Margin Analysis Tab */}
              {pricingSubTab === 'margin' && (
                <div className="space-y-4">
                  <h3 className="text-gray-900 font-medium">Margin Analysis & Configuration</h3>

                  {/* Margin Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-700 text-sm font-medium">Average Margin</span>
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-green-900 font-bold">{marginStats.avgMargin.toFixed(1)}%</div>
                      <div className="text-green-600 text-xs mt-1">Target: {marginConfig.targetMargin}%</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-amber-700 text-sm font-medium">Products at Target</span>
                        <Percent className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="text-amber-900 font-bold">{marginStats.targetMarginCount}</div>
                      <div className="text-amber-600 text-xs mt-1">≥ {marginConfig.targetMargin}% margin</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-red-700 text-sm font-medium">Low Margin Alert</span>
                        <DollarSign className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="text-red-900 font-bold">{marginStats.lowMarginCount}</div>
                      <div className="text-red-600 text-xs mt-1">Below {marginConfig.minimumMargin}%</div>
                    </div>
                  </div>

                  {/* Margin Configuration */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="text-gray-900 font-medium mb-4">Margin Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Target Margin (%)</label>
                        <input
                          type="number"
                          defaultValue={marginConfig.targetMargin}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Minimum Margin (%)</label>
                        <input
                          type="number"
                          defaultValue={marginConfig.minimumMargin}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Warning Threshold (%)</label>
                        <input
                          type="number"
                          defaultValue={marginConfig.warningThreshold}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Price Rounding</label>
                        <select
                          defaultValue={marginConfig.priceRoundingRule}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="nearest_100">Nearest 100</option>
                          <option value="nearest_1000">Nearest 1,000</option>
                          <option value="nearest_5000">Nearest 5,000</option>
                          <option value="nearest_10000">Nearest 10,000</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="autoUpdate"
                        defaultChecked={marginConfig.autoUpdatePricing}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="autoUpdate" className="text-sm text-gray-700">
                        Automatically update pricing when cost changes
                      </label>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                        Save Configuration
                      </button>
                    </div>
                  </div>

                  {/* Products by Margin */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="text-gray-900 font-medium mb-4">Products by Margin Category</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-3 text-gray-600 text-sm">SKU</th>
                            <th className="text-left py-2 px-3 text-gray-600 text-sm">Product</th>
                            <th className="text-right py-2 px-3 text-gray-600 text-sm">Cost</th>
                            <th className="text-right py-2 px-3 text-gray-600 text-sm">Price</th>
                            <th className="text-center py-2 px-3 text-gray-600 text-sm">Margin</th>
                            <th className="text-center py-2 px-3 text-gray-600 text-sm">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-100 text-sm">
                              <td className="py-2 px-3 text-gray-900">{product.sku}</td>
                              <td className="py-2 px-3 text-gray-900">{product.name}</td>
                              <td className="py-2 px-3 text-right text-gray-700">Rp {(product.cost / 1000).toFixed(0)}K</td>
                              <td className="py-2 px-3 text-right text-gray-900">Rp {(product.price / 1000).toFixed(0)}K</td>
                              <td className="py-2 px-3 text-center">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  product.margin >= marginConfig.targetMargin ? 'bg-green-100 text-green-700' :
                                  product.margin >= marginConfig.warningThreshold ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {product.margin.toFixed(1)}%
                                </span>
                              </td>
                              <td className="py-2 px-3 text-center text-xs text-gray-600">
                                {product.margin >= marginConfig.targetMargin ? '✓ At Target' :
                                 product.margin >= marginConfig.warningThreshold ? '⚠ Warning' :
                                 '✗ Below Min'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Price History Tab */}
              {pricingSubTab === 'history' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-900 font-medium">Price Change History</h3>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Export History
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-gray-600">SKU</th>
                          <th className="text-left py-3 px-4 text-gray-600">Product</th>
                          <th className="text-right py-3 px-4 text-gray-600">Old Price</th>
                          <th className="text-right py-3 px-4 text-gray-600">New Price</th>
                          <th className="text-center py-3 px-4 text-gray-600">Change</th>
                          <th className="text-left py-3 px-4 text-gray-600">Date</th>
                          <th className="text-left py-3 px-4 text-gray-600">Changed By</th>
                          <th className="text-left py-3 px-4 text-gray-600">Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {priceHistory.map((history) => {
                          const changePercent = ((history.newPrice - history.oldPrice) / history.oldPrice * 100);
                          return (
                            <tr key={history.id} className="border-b border-gray-100">
                              <td className="py-3 px-4 text-gray-900">{history.sku}</td>
                              <td className="py-3 px-4 text-gray-900">{history.product}</td>
                              <td className="py-3 px-4 text-right text-gray-700">
                                Rp {(history.oldPrice / 1000).toFixed(0)}K
                              </td>
                              <td className="py-3 px-4 text-right text-gray-900 font-medium">
                                Rp {(history.newPrice / 1000).toFixed(0)}K
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-1 rounded text-sm ${
                                  changePercent > 0 ? 'bg-green-100 text-green-700' :
                                  changePercent < 0 ? 'bg-red-100 text-red-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
                                </span>
                              </td>
                              <td className="py-3 px-4 text-gray-700">{history.changeDate}</td>
                              <td className="py-3 px-4 text-gray-700">{history.changedBy}</td>
                              <td className="py-3 px-4 text-gray-600 text-sm">{history.reason}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Bulk Update Tab */}
              {pricingSubTab === 'bulk' && (
                <div className="space-y-4">
                  <h3 className="text-gray-900 font-medium">Bulk Price Update</h3>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-amber-900 font-medium mb-1">Bulk Update Options</h4>
                        <p className="text-amber-700 text-sm">
                          Update prices for multiple products at once based on percentage or fixed amount changes
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Update by Category */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h4 className="text-gray-900 font-medium mb-4">Update by Category</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Select Category</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500">
                            <option>Electronics</option>
                            <option>Accessories</option>
                            <option>All Categories</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Adjustment Type</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500">
                            <option>Percentage Increase</option>
                            <option>Percentage Decrease</option>
                            <option>Fixed Amount Increase</option>
                            <option>Fixed Amount Decrease</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Value</label>
                          <input
                            type="number"
                            placeholder="Enter value"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                          Preview Changes
                        </button>
                      </div>
                    </div>

                    {/* Update by Margin Target */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h4 className="text-gray-900 font-medium mb-4">Update to Target Margin</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Filter Products</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500">
                            <option>All Products</option>
                            <option>Below Minimum Margin</option>
                            <option>Below Target Margin</option>
                            <option>By Category</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Target Margin (%)</label>
                          <input
                            type="number"
                            defaultValue={marginConfig.targetMargin}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Rounding Rule</label>
                          <select
                            defaultValue={marginConfig.priceRoundingRule}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          >
                            <option value="nearest_100">Nearest 100</option>
                            <option value="nearest_1000">Nearest 1,000</option>
                            <option value="nearest_5000">Nearest 5,000</option>
                          </select>
                        </div>
                        <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                          Calculate New Prices
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Import/Export */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="text-gray-900 font-medium mb-4">Import/Export Prices</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-3">Import prices from Excel/CSV file</p>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          Import from File
                        </button>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-3">Export current prices to Excel/CSV</p>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          Export to File
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit/View */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={getModalTitle()}
        size="lg"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}
