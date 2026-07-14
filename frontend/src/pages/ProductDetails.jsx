import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Sparkles, Truck, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState('');

  // Helper function to format numbers into Malawian Kwacha (MK)
  const formatToKwacha = (amount) => {
    const numericValue = parseFloat(amount);
    if (isNaN(numericValue)) return 'MK 0.00';
    
    return 'MK ' + numericValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:5000/api/products/${slug}`);
        if (!response.ok) {
          throw new Error('This premium asset could not be retrieved.');
        }
        
        const result = await response.json();
        if (result.success) {
          setProduct(result.data);
          
          // Determine the primary image or default to the first image in the array
          const primaryImg = result.data.images.find(img => img.is_primary) || result.data.images[0];
          setActiveImg(primaryImg ? primaryImg.image_url : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800');
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProductDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h2 className="text-xl font-bold text-red-600 mb-2">Asset Query Failed</h2>
        <p className="text-slate-500 text-sm mb-6">{error || 'The requested product does not exist.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COMPONENT: Image Gallery Interactive Engine */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full aspect-square bg-lightBg rounded-2xl overflow-hidden border border-slate-100 shadow-premium relative group">
            <img 
              src={activeImg} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
            />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImg(img.image_url)}
                  className={`w-24 aspect-square rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImg === img.image_url ? 'border-secondary scale-98 shadow-sm' : 'border-slate-100 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img.image_url} alt={`${product.name} preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COMPONENT: Premium Purchasing Inquiries Interface Frame */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="text-xs font-heading font-bold text-secondary uppercase tracking-widest bg-secondary/5 px-3 py-1.5 rounded-lg mb-4">
            {product.category_name || "Uncategorized"}
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight text-primary mb-3">
            {product.name}
          </h1>
          
          {/* Dynamically formatted price displayed in MK */}
          <div className="font-heading font-bold text-2xl text-slate-900 mb-6">
            {formatToKwacha(product.price)}
          </div>
          
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Specifications Matrix Table Card (Now reading dynamically from JSONB) */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="w-full bg-lightBg rounded-xl p-5 border border-slate-100 mb-8">
              <h4 className="font-heading font-bold text-xs uppercase text-slate-400 tracking-wider mb-3">Architectural Directives</h4>
              <div className="space-y-2 text-xs font-medium text-slate-700">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1.5 border-b border-slate-200/50 capitalize">
                    <span>{key}</span>
                    <span className="text-primary font-semibold">{val}</span>
                  </div>
                ))}
                <div className="flex justify-between py-1.5">
                  <span>Allocation Readiness</span>
                  <span className={`${product.stock > 0 ? 'text-success' : 'text-red-500'} font-semibold`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <button className="w-full bg-primary hover:bg-slate-800 text-white font-heading font-semibold text-sm py-4 rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" /> Instantiate Commercial Inquiry
          </button>
        </div>

      </div>
    </div>
  );
}