import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">MR GMwale</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Based in Zomba, delivering quality products to your doorstep everywhere across Malawi.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-violet-400 transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-violet-400 transition">Products</Link></li>
              <li><Link to="/about" className="hover:text-violet-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-violet-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Info</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <MapPin size={18} /> Zomba, Malawi
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} /> 0984 317 944
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} /> genesismwale@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} MR GMwale. All rights reserved.
        </div>
      </div>
    </footer>
  );
}