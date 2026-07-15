
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';
import ExpandableGrid from '../components/ExpandableGrid';
import ProductCard from '../components/ProductCard';
import { API } from '../config/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatToKwacha = (amount) => {
    const numericValue = parseFloat(amount);
    if (isNaN(numericValue)) return 'MK 0.00';
    
    return 'MK ' + numericValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/products`);
        
        if (response.ok) {
          const result = await response.json();
          const productsArray = Array.isArray(result) ? result : (result?.data || []);

          const formatted = productsArray.map(p => {
            const images = p.images || [];
            const primaryImg = images.find(img => img.is_primary) || images[0];
            
            return {
              ...p,
              price: formatToKwacha(p.price),
              imageUrl: primaryImg ? primaryImg.image_url : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800'
            };
          });
          
          setProducts(formatted);
        }
      } catch (err) {
        console.error("Failed loading homepage collections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  return (
    <div className="w-full bg-white overflow-x-hidden">
      <SEO 
        title="High-Performance B2B Logistics Ecosystem" 
        description="Curating luxury-tier global products backed by robust client services."
        slug=""
      />
      
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-lightBg to-white pt-20 pb-16">
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary font-heading font-semibold text-xs tracking-wide uppercase mb-6">
              <Layers className="w-3.5 h-3.5" /> Market Leadership Redefined
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-primary leading-[1.1] mb-6">
              Precision Crafted Products For The <span className="text-secondary">Elite Enterprise</span>
            </h1>
            <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed max-w-xl mb-10">
              Uncompromising quality benchmarks and premium fulfillment guarantees across all pipelines.
            </p>
            <div className="flex flex-col w-full sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/catalog" className="w-full sm:w-auto text-center px-8 py-4 bg-primary text-white font-semibold font-heading text-sm rounded-xl hover:bg-slate-800 transition-all shadow-md">
                Explore Premium Catalog
              </Link>
            </div>
          </div>
          
          {/* Animated Featured Image */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-[320px] md:max-w-[420px] aspect-[4/5] animate-[float_4s_ease-in-out_infinite]">
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-secondary/20 rounded-[2rem] blur-2xl" />
              
              {/* Image Card */}
              <div className="relative w-full h-full bg-white rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" 
                  alt="Featured Hero Asset"
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-96 w-full bg-lightBg rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <ExpandableGrid 
            items={products} 
            initialCount={8} 
            renderItem={(product) => <ProductCard product={product} />} 
          />
        )}
      </section>

      {/* FOOTER CTA SECTION */}
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
            
            <Link to="/admin/login" className="inline-flex items-center gap-2 bg-slate-800/80 text-slate-300 border border-slate-700 font-heading font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-slate-800 hover:text-white transition-all">
              <ShieldCheck className="w-4 h-4 text-secondary" /> Administrative Login
            </Link>
          </div>
        </div>
      </section>

      {/* Add this CSS for the floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}


