import { useState } from 'react';
import { Package, Building2, Users, Store, DollarSign } from 'lucide-react';

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

export default function MasterModule() {
  const [activeTab, setActiveTab] = useState<'products' | 'branches' | 'vendors' | 'customers' | 'pricing'>('products');

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
                onClick={() => setActiveTab(tab as any)}
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
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
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
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'branches' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
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
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
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
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-700 mb-2">Price List Management</h3>
              <p className="text-gray-500 mb-4">Manage pricing and margin configuration per customer category or channel</p>
              <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                Manage Price Lists
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
