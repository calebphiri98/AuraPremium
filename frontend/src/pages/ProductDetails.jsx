import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, ExternalLink, Package } from 'lucide-react';
import { API } from '../config/api';

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState('');

  // CONFIG: Replace with your actual WhatsApp business number
  const WHATSAPP_NUMBER = "265995727978"; 

  const handleInquiry = () => {
    const message = `Hello! I would like to inquire about the following product: ${product.name} (Ref: ${slug}). Is this item still available?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const formatToKwacha = (amount) => {
    const numericValue = parseFloat(amount);
    if (isNaN(numericValue)) return 'MK 0.00';
    return 'MK ' + numericValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API}/products/${slug}`);
        if (!response.ok) throw new Error('This premium asset could not be retrieved.');
        const result = await response.json();
        if (result.success) {
          setProduct(result.data);
          const primaryImg = result.data.images.find(img => img.is_primary) || result.data.images[0];
          setActiveImg(primaryImg ? primaryImg.image_url : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProductDetails();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-xl font-bold text-red-600 mb-2">Asset Query Failed</h2>
      <p className="text-slate-500 text-sm mb-6">{error || 'The requested product does not exist.'}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative">
            <img src={activeImg} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images?.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImg(img.image_url)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${activeImg === img.image_url ? 'border-emerald-600' : 'border-transparent'}`}
                >
                  <img src={img.image_url} alt="preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Details & CTA */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full mb-4">
            {product.category_name || "Premium Collection"}
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">{product.name}</h1>
          <div className="text-2xl font-bold text-emerald-600 mb-6">{formatToKwacha(product.price)}</div>
          
          <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>

          {/* Specs */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="w-full bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Specifications</h4>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-slate-500 capitalize">{key}</span>
                    <span className="font-semibold text-slate-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional WhatsApp CTA */}
          <button 
            onClick={handleInquiry}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:translate-y-0"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Instantiate Commercial Inquiry</span>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </button>
        </div>
      </div>
    </div>
  );
}