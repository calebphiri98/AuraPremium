import React, { useState } from 'react';
import { Package, Tag, ShoppingCart, Mail, Home, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your actual logout logic here (e.g., localStorage.removeItem, API call)
    console.log('Logging out...');
    navigate('/login');
  };

  const activeLabel = TABS.find((t) => t.key === activeTab)?.label ?? '';

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
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 md:px-8 md:py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-base md:text-xl font-bold text-slate-900 truncate">
            <span className="md:hidden">{activeLabel}</span>
            <span className="hidden md:inline">Admin Control Hub</span>
          </h1>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-violet-700 transition-colors"
          >
            <Home size={16} /> Home
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex flex-col sticky top-[57px] z-20 shadow-sm">
          <button
            onClick={() => { navigate('/'); setMenuOpen(false); }}
            className="flex items-center gap-3 px-2 py-3 text-sm text-slate-700 hover:text-violet-700 transition-colors"
          >
            <Home size={17} /> Back to site
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-2 py-3 text-sm text-red-600 hover:text-red-800 transition-colors border-t border-slate-100"
          >
            <LogOut size={17} /> Log out
          </button>
        </div>
      )}

      {/* Desktop tab navigation */}
      <div className="hidden md:block bg-white border-b border-slate-200 px-8">
        <nav className="flex gap-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
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
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        {renderPanel()}
      </div>

      {/* Mobile bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex z-30"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setMenuOpen(false); }}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[56px] transition-colors ${
                isActive ? 'text-violet-700' : 'text-slate-400'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
              <span className={`text-[11px] leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}