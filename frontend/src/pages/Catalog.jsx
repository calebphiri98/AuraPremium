import React, { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [isListView, setIsListView] = useState(false);

  // ✅ Hooks are now properly declared inside the component body
  const debouncedSearch = useDebounce(search, 400);

  // Simulation data injection for isolated runtime fallback protection
  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      const mockData = Array.from({ length: 8 }).map((_, i) => ({
        id: `c_${i}`,
        name: `Asset Profile Signature ${String.fromCharCode(65 + i)}00x`,
        slug: `asset-profile-signature-${String.fromCharCode(65 + i).toLowerCase()}00x`,
        price: 299.00 + (i * 120),
        category: i % 2 === 0 ? "Executive Portfolio" : "Industrial Core",
        description: "Optimized corporate hardware baseline engineered to satisfy intense structural and performance parameters flawlessly.",
        imageUrl: `https://images.unsplash.com/photo-${["1523275335684-37898b6baf30", "1505740420928-5e560c06d30e"][i % 2]}?q=80&w=600&auto=format&fit=crop`
      }));

      // Apply client-side filters using our debounced value to prevent stuttering
      const filteredData = mockData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                              product.description.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory = category ? product.category.toLowerCase().includes(category.toLowerCase()) : true;
        return matchesSearch && matchesCategory;
      });

      // Handle simple sorting
      if (sort === 'price-low') {
        filteredData.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-high') {
        filteredData.sort((a, b) => b.price - a.price);
      }

      setProducts(filteredData);
      setLoading(false);
    }, 450);

    return () => clearTimeout(delay);
  }, [debouncedSearch, category, sort]); // ✅ Listen to debouncedSearch here!

  return (
    <div className="min-h-screen bg-lightBg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-left">
          <h1 className="font-heading font-bold text-3xl tracking-tight mb-2">Enterprise Resource Index</h1>
          <p className="text-slate-500 text-sm">Deploy high-performance parameters to query structural assets seamlessly.</p>
        </div>

        {/* Dynamic Context Multi-Filter Control Console Header Deck */}
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
              <option value="executive">Executive Portfolio</option>
              <option value="industrial">Industrial Core</option>
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

            <div className="h-9 w-[1px] bg-slate-200 hidden sm:block" />

            <div className="flex items-center bg-lightBg rounded-xl p-1">
              <button onClick={() => setIsListView(false)} className={`p-1.5 rounded-lg ${!isListView ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setIsListView(true)} className={`p-1.5 rounded-lg ${isListView ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Dynamic Execution Loop Grid UI Mapping */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-96 w-full bg-white rounded-2xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className={isListView ? "flex flex-col gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}