import React from 'react';
import { Eye, ArrowRight, MessageSquareCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { name, slug, price, category, imageUrl } = product;

  // Configuration for your business WhatsApp line
  const WHATSAPP_NUMBER = "265995727978"; // Replace with your actual Malawian WhatsApp number (no + sign)
  
  // Create a clean, pre-filled WhatsApp message URL
  const encodedMessage = encodeURIComponent(
    `Hello! I'm interested in purchasing the *${name}* (${price}). Is this item available for order?`
  );
  const whatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200/80 transition-all duration-300 shadow-premium hover:shadow-glass flex flex-col h-full">
      
      {/* Image Wrap & Interactive Floating Actions */}
      <div className="relative aspect-square w-full bg-lightBg overflow-hidden">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Category Badge overlay with safe fallback */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary font-heading font-semibold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
          {category || "Premium Asset"}
        </span>

        {/* Premium Quick View Action Overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/product/${slug}`}
            className="p-3 bg-white text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content & Layout Specifications */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-start gap-4 mb-5">
            <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-secondary transition-colors duration-200 line-clamp-2 leading-snug">
              <Link to={`/product/${slug}`}>{name}</Link>
            </h3>
            <span className="font-heading font-bold text-base text-slate-900 whitespace-nowrap">
              {price}
            </span>
          </div>
        </div>

        {/* Dynamic Action Zone: Instant Checkout & Exploration Link */}
        <div className="flex flex-col gap-3 pt-4 border-t border-slate-50/80">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            {/* Custom WhatsApp Icon / Chat Icon */}
            <MessageSquareCheck className="w-4 h-4" /> Place Order via WhatsApp
          </a>

          <Link
            to={`/product/${slug}`}
            className="inline-flex items-center justify-center gap-1.5 font-heading font-semibold text-xs text-slate-500 hover:text-primary transition-colors duration-200 py-1"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}