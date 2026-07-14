import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Package, BarChart3, Mail, Plus, Trash2, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [previews, setPreviews] = useState([]);

  // Client side image processing framework layout matching multiple-upload criteria
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const mappedUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...mappedUrls]);
  };

  return (
    <div className="min-h-screen bg-lightBg flex text-left">
      {/* Structural Admin Control Side Navigation Panel Deck */}
      <aside className="w-64 bg-primary text-white p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          <div>
            <h3 className="font-heading font-bold text-lg tracking-tight">System Console</h3>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase">MR GMwale v1.2</p>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-sm font-medium"><BarChart3 className="w-4 h-4" /> Metrics Analytics</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl text-sm transition-all"><Package className="w-4 h-4" /> Asset Management</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl text-sm transition-all"><Mail className="w-4 h-4" /> Message Logs</a>
          </nav>
        </div>
        <button onClick={logout} className="flex items-center justify-center gap-2 w-full py-3 bg-red-950/40 hover:bg-error text-error hover:text-white font-semibold text-xs tracking-wider uppercase rounded-xl border border-error/20 transition-all">
          <LogOut className="w-4 h-4" /> Terminate Instance
        </button>
      </aside>

      {/* Main Structural Working Canvas Workspace */}
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="font-heading font-bold text-3xl tracking-tight text-slate-900">Control Matrix</h1>
            <p className="text-slate-500 text-sm">Review telemetry states and dispatch asset modifications effortlessly.</p>
          </div>
        </div>

        {/* Overview Metric Cards Widgets Grid Lineup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { t: 'Gross Portfolio Revenue', v: '$428,940.00', d: '+18.4% MoM Change' },
            { t: 'Active Dispatched Inventory', v: '1,420 SKUs', d: 'Stable Storage Levels' },
            { t: 'Commercial Inquiries Logged', v: '84 Leads', d: '94% Operational Conversion' }
          ].map((card, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-premium">
              <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-slate-400 mb-2">{card.t}</h4>
              <div className="text-2xl font-heading font-bold text-slate-900 mb-1">{card.v}</div>
              <p className="text-xs text-success font-medium">{card.d}</p>
            </div>
          ))}
        </div>

        {/* High-Fidelity Multi-Image Asset Ingestion Frame Implementation */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-premium max-w-3xl">
          <h3 className="font-heading font-bold text-lg mb-2">Ingest Portfolio Assets</h3>
          <p className="text-slate-500 text-xs mb-6">Advanced multi-image pipeline interface.</p>
          
          <div className="border-2 border-dashed border-slate-200 bg-lightBg rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-secondary/50 transition-colors relative cursor-pointer">
            <input 
              type="file" 
              multiple 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-3"><Plus className="w-5 h-5 text-secondary" /></div>
            <p className="text-xs font-semibold font-heading text-slate-700">Select Multiple Structural Asset Assets</p>
            <p className="text-[11px] text-slate-400 mt-1">Acceptable types: WebP, JPEG, PNG limits up to 5MB total</p>
          </div>

          {previews.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mt-6 pt-6 border-t border-slate-100">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-square bg-lightBg rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={src} alt="Upload Matrix preview asset" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setPreviews(prev => prev.filter((_, idx) => idx !== i))}
                    className="absolute inset-0 bg-error/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}