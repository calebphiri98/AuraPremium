import React, { useState } from 'react';
import { Package, Tag, ShoppingCart, Mail, Home, LogOut } from 'lucide-react'; // Added icons
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router
import ProductsPanel from './ProductPanel';
import CategoriesPanel from './CategoriesPanel';
import OrdersPanel from './OrdersPanel';
import MessagesPanel from './MessagesPanel';

const TABS = [
  { key: 'products', label: 'Products', icon: Package },
  { key: 'categories', label: 'Categories', icon: Tag },
  { key: 'orders', label: 'Orders', icon: ShoppingCart },
  { key: 'messages', label: 'Inquiries', icon: Mail },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your actual logout logic here (e.g., localStorage.removeItem, API call)
    console.log("Logging out...");
    navigate('/login'); 
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsPanel />;
      case 'categories':
        return <CategoriesPanel />;
      case 'orders':
        return <OrdersPanel />;
      case 'messages':
        return <MessagesPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Admin Control Hub</h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-violet-700 transition"
          >
            <Home size={16} /> Home
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-slate-200 px-8">
        <nav className="flex gap-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === key
                  ? 'border-violet-700 text-violet-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Active panel */}
      <div className="p-8 max-w-6xl mx-auto">
        {renderPanel()}
      </div>
    </div>
  );
}