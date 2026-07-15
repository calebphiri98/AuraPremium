import React, { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';
import { API } from '../config/api';
export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [isListView, setIsListView] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const formatToKwacha = (amount) => {
    const numericValue = parseFloat(amount);
    if (isNaN(numericValue)) return 'MK 0.00';
    
    return 'MK ' + numericValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch catalog listings from database.');
        }
        
        const result = await response.json();
        
        // Handle both raw array responses or { success: true, data: [...] } responses
        const productsArray = Array.isArray(result) ? result : (result?.data || []);

        const formattedProducts = productsArray.map(product => {
          const images = product.images || [];
          const primaryImg = images.find(img => img.is_primary) || images[0];
          
          return {
            ...product,
            rawPrice: parseFloat(product.price || 0),
            formattedPrice: formatToKwacha(product.price),
            imageUrl: primaryImg ? primaryImg.image_url : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600'
          };
        });

        setProducts(formattedProducts);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          product.description?.toLowerCase().includes(debouncedSearch.toLowerCase());
    
    const matchesCategory = category 
      ? product.category_name?.toLowerCase() === category.toLowerCase() 
      : true;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-low') return a.rawPrice - b.rawPrice;
    if (sort === 'price-high') return b.rawPrice - a.rawPrice;
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const uniqueCategories = [...new Set(products.map(p => p.category_name).filter(Boolean))];

  return (
    <div className="min-h-screen bg-lightBg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-left">
          <h1 className="font-heading font-bold text-3xl tracking-tight mb-2">Enterprise Resource Index</h1>
          <p className="text-slate-500 text-sm">Deploy high-performance parameters to query structural assets seamlessly.</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-premium mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter assets dynamically..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-lightBg rounded-xl text-sm border border-transparent focus:border-slate-200 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 bg-lightBg rounded-xl text-sm font-medium focus:outline-none border border-transparent"
            >
              <option value="">All Segmentations</option>
              {uniqueCategories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 bg-lightBg rounded-xl text-sm font-medium focus:outline-none border border-transparent"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="flex items-center bg-lightBg rounded-xl p-1">
              <button onClick={() => setIsListView(false)} className={`p-1.5 rounded-lg ${!isListView ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setIsListView(true)} className={`p-1.5 rounded-lg ${isListView ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-96 w-full bg-white rounded-2xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className={isListView ? "flex flex-col gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"}>
            {sortedProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={{
                  ...p,
                  price: p.formattedPrice
                }} 
              />
            ))}
            {sortedProducts.length === 0 && (
              <p className="text-slate-400 col-span-full py-12 text-center text-sm">No assets found matching current criteria.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}