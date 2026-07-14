import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Connects to your cart state

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart(); // Destructure cart items from your CartContext
  const location = useLocation();

  // Calculate total items in cart dynamically
  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile navigation on route change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/catalog' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'glass-effect border-b border-slate-100/80 shadow-sm' : 'bg-white border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Core Brand Identity Layout */}
        <Link to="/" className="flex items-center gap-2.5 focus:outline-none">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-heading font-bold text-xl tracking-tight shadow-md">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg tracking-tight leading-none text-primary">MR GMwale</span>
            <span className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5">Premium Ecosystem</span>
          </div>
        </Link>

        {/* Mid-Tier Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 transition-colors duration-200 hover:text-primary ${isActive ? 'text-primary font-semibold' : 'text-slate-500'}`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Global Functional Actions Layout */}
        <div className="hidden md:flex items-center gap-6">
          {/* Desktop Cart Icon with Dynamic Badge */}
          <Link to="/cart" className="relative p-2.5 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-xl transition-all" aria-label="Shopping Cart">
            <ShoppingBag className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Link to="/catalog" className="bg-primary hover:bg-slate-800 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
            Procure Catalog
          </Link>
        </div>

        {/* Mobile Controls Layout */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Cart Icon with Dynamic Badge */}
          <Link to="/cart" className="relative p-2 text-slate-600 hover:text-primary rounded-xl transition-all mr-1" aria-label="Shopping Cart">
            <ShoppingBag className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </Link>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-primary hover:bg-lightBg rounded-xl transition-colors focus:outline-none"
            aria-label="Toggle navigation configuration menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Drawer Overlay Layer */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl flex flex-col p-6 gap-4 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-heading font-medium text-base py-2 border-b border-slate-50 ${location.pathname === link.path ? 'text-secondary' : 'text-slate-600'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/catalog" className="w-full text-center bg-primary text-white font-semibold text-sm py-3.5 rounded-xl mt-2">
            Procure Catalog
          </Link>
        </div>
      )}
    </header>
  );
}