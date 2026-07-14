import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-slate-900 pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Information & Value Propositions */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center font-heading font-bold text-xl shadow-lg">
                M
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">MR GMwale</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Curating luxury-tier global products backed by robust client services, optimized for premium commercial specifications.
            </p>
            <div className="flex flex-col gap-3 mt-2 text-slate-300 text-xs font-medium">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> 100% Quality Assurance Standard</div>
              <div className="flex items-center gap-2"><Award className="w-4 h-4 text-accent" /> Enterprise Grade Operational Track Record</div>
            </div>
          </div>

          {/* Hyperlinked Architectural Context Grid Map */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-slate-400 mb-5">Product Matrix</h4>
            <ul className="space-y-3 text-sm text-slate-300 font-medium">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Core Showcase</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">Luxury Lineup</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">New Additions</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-1 lg:col-span-2">
            <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-slate-400 mb-5">Corporate</h4>
            <ul className="space-y-3 text-sm text-slate-300 font-medium">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Ethos</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Corporate Contact</Link></li>
            </ul>
          </div>

          {/* Global HQ Office Operational Contacts */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-slate-400 mb-5">Corporate Hub</h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">Premium Commercial Zone, Suite 400, Global Operations Centre</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-slate-400">+1 (800) 555-MWALE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-slate-400">operations@mrgmwale.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Sign-off Footer Deck */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="text-center md:text-left">&copy; {new Date().getFullYear()} MR GMwale Corporation. All structural processes reserved.</div>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="hover:text-slate-300 transition-colors whitespace-nowrap">Privacy Infrastructure</a>
          <a href="#" className="hover:text-slate-300 transition-colors whitespace-nowrap">Terms of Engagement</a>
        </div>
      </div>
    </footer>
  );
}