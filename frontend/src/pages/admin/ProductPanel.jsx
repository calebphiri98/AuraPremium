import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit2, Trash2, Loader2, Package, Search, ImageOff } from 'lucide-react';
import ProductForm from './ProductForm';

import { API } from '../../../src/config/api.js';

function StockBadge({ stock }) {
  const stockNum = Number(stock) || 0;
  let styles = 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
  let label = `${stockNum} in stock`;

  if (stockNum === 0) {
    styles = 'bg-red-50 text-red-700 ring-red-600/20';
    label = 'Out of stock';
  } else if (stockNum < 5) {
    styles = 'bg-amber-50 text-amber-700 ring-amber-600/20';
    label = `Low · ${stockNum} left`;
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles}`}>
      {label}
    </span>
  );
}

function ProductThumb({ image, name, size = 'w-10 h-10' }) {
  if (image) {
    return (
      <img
        src={image.image_url}
        alt={name}
        className={`${size} rounded-lg object-cover border border-slate-200 flex-shrink-0`}
      />
    );
  }
  return (
    <div className={`${size} rounded-lg bg-slate-100 flex items-center justify-center text-slate-300 flex-shrink-0`}>
      <ImageOff size={16} />
    </div>
  );
}

export default function ProductsPanel() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([
        fetch(`${API}/products`).then((r) => r.json()),
        fetch(`${API}/categories`).then((r) => r.json()),
      ]);
      setProducts(p);
      setCategories(c);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product? This can\'t be undone.')) return;
    setDeletingId(id);
    try {
      await fetch(`${API}/products/${id}`, { method: 'DELETE' });
      await fetchData();
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category_name?.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (view === 'form') {
    return (
      <ProductForm
        item={editing}
        categories={categories}
        onCancel={() => setView('list')}
        onSuccess={() => { setView('list'); fetchData(); }}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Products</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? 'Loading…' : `${products.length} product${products.length === 1 ? '' : 's'} total`}
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setView('form'); }}
          className="inline-flex items-center justify-center gap-2 bg-violet-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-violet-800 active:bg-violet-900 transition-colors shadow-sm shadow-violet-700/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
        >
          <Plus size={16} /> Add product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or category…"
          className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus:border-violet-500"
        />
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl py-16 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin mb-2" size={22} />
          <span className="text-sm">Loading products…</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* Empty state */
        <div className="bg-white border border-slate-200 rounded-xl py-16 flex flex-col items-center justify-center text-center px-6">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Package size={22} />
          </div>
          <p className="text-sm font-medium text-slate-700">
            {query ? 'No products match your search' : 'No products yet'}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {query ? 'Try a different name or category.' : 'Add your first product to get started.'}
          </p>
          {!query && (
            <button
              onClick={() => { setEditing(null); setView('form'); }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:text-violet-800"
            >
              <Plus size={15} /> Add product
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile: card list (default, priority view) */}
          <ul className="flex flex-col gap-2.5 md:hidden">
            {filteredProducts.map((p) => {
              const primaryImage = p.images?.find((img) => img.is_primary) || p.images?.[0];
              return (
                <li
                  key={p.id}
                  className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 active:bg-slate-50 transition-colors"
                >
                  <ProductThumb image={primaryImage} name={p.name} size="w-14 h-14" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-slate-900 text-sm leading-snug truncate">{p.name}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{p.category_name || 'Uncategorized'}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-slate-900">
                        MWK {Number(p.price).toLocaleString()}
                      </span>
                      <StockBadge stock={p.stock} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 justify-center border-l border-slate-100 pl-2 ml-1">
                    <button
                      onClick={() => { setEditing(p); setView('form'); }}
                      aria-label={`Edit ${p.name}`}
                      className="w-11 h-11 flex items-center justify-center rounded-lg text-slate-500 hover:bg-violet-50 hover:text-violet-700 active:bg-violet-100 transition-colors"
                    >
                      <Edit2 size={17} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deletingId === p.id}
                      aria-label={`Delete ${p.name}`}
                      className="w-11 h-11 flex items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 active:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {deletingId === p.id ? <Loader2 size={17} className="animate-spin" /> : <Trash2 size={17} />}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Desktop: table */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 w-24"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const primaryImage = p.images?.find((img) => img.is_primary) || p.images?.[0];
                  return (
                    <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <ProductThumb image={primaryImage} name={p.name} />
                          <span className="font-medium text-slate-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{p.category_name || '—'}</td>
                      <td className="px-4 py-3 text-slate-600 font-medium">MWK {Number(p.price).toLocaleString()}</td>
                      <td className="px-4 py-3"><StockBadge stock={p.stock} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => { setEditing(p); setView('form'); }}
                            aria-label={`Edit ${p.name}`}
                            className="p-2 rounded-lg text-slate-500 hover:bg-violet-50 hover:text-violet-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deletingId === p.id}
                            aria-label={`Delete ${p.name}`}
                            className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            {deletingId === p.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
// import React, { useState, useEffect } from 'react';
// import { Plus, Edit2, Trash2, Loader2, Star } from 'lucide-react';
// import ProductForm from './ProductForm';

// import {API} from '../../../src/config/api.js'

// export default function ProductsPanel() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [view, setView] = useState('list'); // 'list' | 'form'
//   const [editing, setEditing] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [p, c] = await Promise.all([
//         fetch(`${API}/products`).then((r) => r.json()),
//         fetch(`${API}/categories`).then((r) => r.json()),
//       ]);
//       setProducts(p);
//       setCategories(c);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { fetchData(); }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this product?')) return;
//     await fetch(`${API}/products/${id}`, { method: 'DELETE' });
//     fetchData();
//   };

//   if (view === 'form') {
//     return (
//       <ProductForm
//         item={editing}
//         categories={categories}
//         onCancel={() => setView('list')}
//         onSuccess={() => { setView('list'); fetchData(); }}
//       />
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-slate-900">Products</h2>
//         <button
//           onClick={() => { setEditing(null); setView('form'); }}
//           className="flex items-center gap-2 bg-violet-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-violet-800 transition"
//         >
//           <Plus size={16} /> Add product
//         </button>
//       </div>

//       <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-500">
//               <th className="px-4 py-3">Image</th>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Category</th>
//               <th className="px-4 py-3">Price</th>
//               <th className="px-4 py-3">Stock</th>
//               <th className="px-4 py-3 w-20"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400"><Loader2 className="animate-spin inline mr-2" size={16} />Loading…</td></tr>
//             ) : products.length === 0 ? (
//               <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No products yet.</td></tr>
//             ) : products.map((p) => {
//               const primaryImage = p.images?.find((img) => img.is_primary) || p.images?.[0];
//               return (
//                 <tr key={p.id} className="border-b border-slate-100 last:border-0">
//                   <td className="px-4 py-3">
//                     {primaryImage ? (
//                       <img src={primaryImage.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
//                     ) : (
//                       <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300">
//                         <Star size={14} />
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
//                   <td className="px-4 py-3 text-slate-600">{p.category_name || '—'}</td>
//                   <td className="px-4 py-3 text-slate-600">MWK {Number(p.price).toLocaleString()}</td>
//                   <td className="px-4 py-3 text-slate-600">{p.stock}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-2 justify-end">
//                       <button onClick={() => { setEditing(p); setView('form'); }} className="p-1.5 text-slate-500 hover:text-violet-700"><Edit2 size={15} /></button>
//                       <button onClick={() => handleDelete(p.id)} className="p-1.5 text-slate-500 hover:text-red-600"><Trash2 size={15} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }