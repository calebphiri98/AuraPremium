import React from 'react';
import { MapPin, Truck, ShieldCheck, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Hero Section */}
        <header className="text-center space-y-3 px-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Us
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Based in the heart of <span className="font-bold text-violet-700">Zomba</span>, we are dedicated to bringing quality products to your doorstep, no matter where you are in Malawi.
          </p>
        </header>

        {/* Feature Grid - Optimized for Mobile Touch */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard 
            icon={<MapPin size={22} />} 
            title="Rooted in Zomba" 
            description="We operate from Zomba, serving our local community with pride and excellence." 
          />
          <FeatureCard 
            icon={<Truck size={22} />} 
            title="Nationwide Delivery" 
            description="From Nsanje to Chitipa, we ensure your orders reach you safely across Malawi." 
          />
          <FeatureCard 
            icon={<ShieldCheck size={22} />} 
            title="Quality Assured" 
            description="We hand-pick our products to ensure you receive only the best quality every time." 
          />
          <FeatureCard 
            icon={<Clock size={22} />} 
            title="Reliable Service" 
            description="We value your time and work hard to maintain consistent, prompt delivery schedules." 
          />
        </section>

        {/* Mission Section */}
        <section className="bg-gradient-to-br from-violet-700 to-indigo-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
              Our Mission
            </h2>
            <p className="text-violet-100 leading-relaxed text-sm sm:text-base">
              Our goal is to bridge the gap between quality products and every household in Malawi. By leveraging our local expertise in Zomba and a robust logistics network, we strive to make shopping effortless, accessible, and dependable for everyone, everywhere.
            </p>
          </div>
          {/* Subtle Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </section>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-violet-200 hover:shadow-md active:scale-[0.98]">
      <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}