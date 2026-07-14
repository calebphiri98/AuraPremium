import React from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { name, slug, price, description, category, imageUrl } = product;

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
        
        {/* Category Badge overlay */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary font-heading font-semibold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
          {category}
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
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-secondary transition-colors duration-200 line-clamp-1">
            <Link to={`/product/${slug}`}>{name}</Link>
          </h3>
          <span className="font-heading font-bold text-base text-slate-900 whitespace-nowrap">
            ${Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <p className="text-slate-500 text-xs leading-relaxed font-normal line-clamp-2 mb-5 flex-grow">
          {description}
        </p>

        <div className="pt-4 border-t border-slate-50/80 flex items-center justify-between">
          <Link
            to={`/product/${slug}`}
            className="inline-flex items-center gap-1.5 font-heading font-semibold text-xs text-primary group-hover:text-secondary transition-colors duration-200"
          >
            Explore Options
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}