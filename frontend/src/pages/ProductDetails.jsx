import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Sparkles, Truck, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();

  // Premium multi-image high-fidelity visualization setup
  const mockImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800"
  ];

  const [activeImg, setActiveImg] = useState(mockImages[0]);

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COMPONENT: Image Gallery Interactive Engine */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full aspect-square bg-lightBg rounded-2xl overflow-hidden border border-slate-100 shadow-premium relative group">
            <img 
              src={activeImg} 
              alt="High resolution active preview" 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {mockImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-24 aspect-square rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImg === img ? 'border-secondary scale-98 shadow-sm' : 'border-slate-100 opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt="Thumbnail preview option" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COMPONENT: Premium Purchasing Inquiries Interface Frame */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="text-xs font-heading font-bold text-secondary uppercase tracking-widest bg-secondary/5 px-3 py-1.5 rounded-lg mb-4">
            System Spec Active
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight text-primary mb-3">
            Premium Asset Core Deployment Engine
          </h1>
          <div className="font-heading font-bold text-2xl text-slate-900 mb-6">$849.00</div>
          
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            This asset delivers unprecedented lifecycle optimization limits, utilizing clean modular structural configurations designed to integrate beautifully under diverse organizational frameworks.
          </p>

          {/* Specifications Matrix Table Card */}
          <div className="w-full bg-lightBg rounded-xl p-5 border border-slate-100 mb-8">
            <h4 className="font-heading font-bold text-xs uppercase text-slate-400 tracking-wider mb-3">Architectural Directives</h4>
            <div className="space-y-2 text-xs font-medium text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-200/50"><span>Architecture Standard</span><span className="text-primary font-semibold">ISO-Elite Tier 1</span></div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/50"><span>Deployment Capacity</span><span className="text-primary font-semibold">Continuous Multi-Cycle</span></div>
              <div className="flex justify-between py-1.5"><span>Allocation Readiness</span><span className="text-success font-semibold">Immediate Dispatch Core</span></div>
            </div>
          </div>

          <button className="w-full bg-primary hover:bg-slate-800 text-white font-heading font-semibold text-sm py-4 rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" /> Instantiate Commercial Inquiry
          </button>
        </div>

      </div>
    </div>
  );
}