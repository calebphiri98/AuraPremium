import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Headphones, Layers, CircleCheck, ArrowUpRight, HelpCircle, Lock } from 'lucide-react';
import ExpandableGrid from '../components/ExpandableGrid';
import ProductCard from '../components/ProductCard';

// Comprehensive high-fidelity mock dataset modeling data expected from Phase 3 Backend Engine APIs
const MOCK_HOMEPAGE_PRODUCTS = Array.from({ length: 14 }).map((_, i) => ({
  id: `prod_${i + 1}`,
  name: `Premium Enterprise Asset ${String.fromCharCode(65 + i)}00x`,
  slug: `premium-enterprise-asset-${String.fromCharCode(65 + i).toLowerCase()}00x`,
  price: 249.99 + (i * 75),
  category: i % 2 === 0 ? "Executive Portfolio" : "Industrial Core",
  description: "Engineered using high-fidelity specifications optimized to ensure elite tier structural performance thresholds across long cycles.",
  imageUrl: `https://images.unsplash.com/photo-${[
    "1523275335684-37898b6baf30", "1505740420928-5e560c06d30e", "1542291026-7eec264c27ff", 
    "1572635196237-14b3f281503f", "1560343090-f0409e92791a", "1526170375885-4d8ecf77b99f"
  ][i % 6]}?q=80&w=600&auto=format&fit=crop`
}));

const FAQ_DATA = [
  { q: "How are products verified for quality guarantee thresholds?", a: "Every single asset under custody passes through rigorous engineering specifications and validation criteria prior to secure logistics initialization." },
  { q: "What are the exact standard turnaround configurations for global dispatch?", a: "Standard enterprise accounts unlock prioritised express custom logistics, yielding dispatch processing inside immediate multi-hour frameworks." },
  { q: "Can I manage product allocations under corporate custom volume contracts?", a: "Absolutely. Contact our corporate desk to instantiate tailored service blueprints designed around dedicated supply channels." }
];

export default function Home() {
  return (
    <div className="w-full bg-white">
      <SEO 
        title="High-Performance B2B Logistics Ecosystem" 
        description="Curating luxury-tier global products backed by robust client services, optimized for premium commercial specifications."
        slug=""
      />
      
      {/* SECTION 1: HERO CONTAINER SETUP */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-lightBg to-white overflow-hidden pt-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-secondary/5 to-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary font-heading font-semibold text-xs tracking-wide uppercase mb-6">
              <Layers className="w-3.5 h-3.5" /> Market Leadership Redefined
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary leading-[1.1] mb-6">
              Precision Crafted Products For The <span className="text-secondary">Elite Enterprise</span>
            </h1>
            <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed max-w-xl mb-10">
              Uncompromising quality benchmarks, seamless modern user interaction architectures, and premium fulfillment guarantees across all pipelines.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/catalog" className="w-full sm:w-auto text-center px-8 py-4 bg-primary text-white font-semibold font-heading text-sm rounded-xl hover:bg-slate-800 transition-all shadow-md hover:shadow-xl">
                Explore Premium Catalog
              </Link>
              <Link to="/contact" className="w-full sm:w-auto text-center px-8 py-4 bg-transparent text-primary font-semibold font-heading text-sm rounded-xl hover:bg-lightBg transition-all border border-slate-200">
                Contact Corporate Desk
              </Link>
            </div>
            
            {/* Trust Badges Bar + Admin Portal Entry Link */}
            <div className="mt-14 pt-8 border-t border-slate-100 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-400 font-heading text-xs font-semibold uppercase tracking-wider">
              <div className="flex gap-4">
                <div>✓ ISO 9001 Audited</div>
                <div>✓ Global Transport Matrix</div>
                <div>✓ 24/7 Corporate SLA</div>
              </div>
              
              {/* Added subtle Admin Login link */}
              <Link to="/admin/login" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-slate-100/50">
                <Lock className="w-3.5 h-3.5" /> Staff Console
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] bg-white rounded-3xl p-4 shadow-glass border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" 
                alt="Featured Hero Framework Asset"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPANY HIGHLIGHTS DATA METRICS COUNTER */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          {[
            { label: "Years Operational", val: "12+" },
            { label: "Premium SKU Catalog", val: "1,400+" },
            { label: "Corporate Client Accounts", val: "98k+" },
            { label: "On-Time Dispatch SLA", val: "99.9%" },
            { label: "Product Lifetime Guarantee", val: "100%" }
          ].map((m, idx) => (
            <div key={idx} className="flex flex-col justify-center">
              <div className="font-heading font-bold text-3xl sm:text-4xl text-accent mb-2">{m.val}</div>
              <div className="text-slate-400 text-xs font-medium tracking-wide uppercase">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 & 4: FEATURED SECTIONS WITH EXPANDABLE GRID CRITICAL LOGIC */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight mb-4">
            Curated Structural Formations
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Reviewing initial foundational allocations. Interact below to expand visibility seamlessly across the complete collection index instantly.
          </p>
        </div>

        {/* Integration of our Custom Reusable Expandable Grid Component */}
        <ExpandableGrid 
          items={MOCK_HOMEPAGE_PRODUCTS} 
          initialCount={8} 
          renderItem={(product) => <ProductCard product={product} />} 
        />
      </section>

      {/* SECTION 6: WHY CHOOSE US ASSURANCES */}
      <section className="py-24 bg-lightBg border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-heading font-bold text-3xl tracking-tight mb-3">Engineered To Surpass Industry Metrics</h2>
            <p className="text-slate-500 text-sm">Every arrangement is tailored to optimize enterprise reliability and deployment durability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-secondary" />, title: "Premium Verification Quality", desc: "Uncompromising specifications verified across extensive lifecycle iterations under absolute technical standards." },
              { icon: <Truck className="w-6 h-6 text-secondary" />, title: "Accelerated Priority Dispatch", desc: "Integrated smart dispatch structures designed to support fast-moving deployment windows without delay." },
              { icon: <Headphones className="w-6 h-6 text-secondary" />, title: "Direct Specialized Support Desk", desc: "Instant programmatic escalation to dedicated production design specialists available across all time zones." }
            ].map((box, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium">
                <div className="w-12 h-12 rounded-xl bg-lightBg flex items-center justify-center mb-6">{box.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-3">{box.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: ACCORDION INTERACTION (FAQ SYSTEM) */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-3xl tracking-tight mb-3">Frequently Clarified Logistics</h2>
          <p className="text-slate-500 text-sm">Clear operational parameters ensuring transparent partner onboarding.</p>
        </div>
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div key={index} className="p-6 bg-white rounded-xl border border-slate-100 shadow-premium">
              <h3 className="font-heading font-semibold text-sm flex items-center gap-2 text-primary mb-2">
                <HelpCircle className="w-4 h-4 text-secondary flex-shrink-0" /> {faq.q}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: CONVERSION CTA PLACEMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="w-full bg-gradient-to-r from-primary to-slate-900 rounded-3xl p-12 md:p-16 relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4 max-w-xl leading-snug">
            Ready To Upgrade Your Enterprise Inventory Footprint?
          </h2>
          <p className="text-slate-400 text-sm max-w-md mb-8">
            Connect with a specialist now or request targeted catalog access configurations with customized high-volume asset pricing models.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-slate-100 transition-all shadow-lg">
              Initialize Engagement Matrix <ArrowUpRight className="w-4 h-4 text-primary" />
            </Link>
            
            {/* Added alternative access path for administrators */}
            <Link to="/admin/login" className="inline-flex items-center gap-2 bg-slate-800/80 text-slate-300 border border-slate-700 font-heading font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-slate-800 hover:text-white transition-all">
              <ShieldCheck className="w-4 h-4 text-secondary" /> Administrative Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}