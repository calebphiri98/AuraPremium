import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Star } from 'lucide-react';
import ProductForm from './ProductForm';

const API = 'http://localhost:5000/api';

export default function ProductsPanel() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editing, setEditing] = useState(null);

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
    if (!window.confirm('Delete this product?')) return;
    await fetch(`${API}/products/${id}`, { method: 'DELETE' });
    fetchData();
  };

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Products</h2>
        <button
          onClick={() => { setEditing(null); setView('form'); }}
          className="flex items-center gap-2 bg-violet-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-violet-800 transition"
        >
          <Plus size={16} /> Add product
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-500">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400"><Loader2 className="animate-spin inline mr-2" size={16} />Loading…</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No products yet.</td></tr>
            ) : products.map((p) => {
              const primaryImage = p.images?.find((img) => img.is_primary) || p.images?.[0];
              return (
                <tr key={p.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3">
                    {primaryImage ? (
                      <img src={primaryImage.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300">
                        <Star size={14} />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-slate-600">{p.category_name || '—'}</td>
                  <td className="px-4 py-3 text-slate-600">MWK {Number(p.price).toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">{p.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => { setEditing(p); setView('form'); }} className="p-1.5 text-slate-500 hover:text-violet-700"><Edit2 size={15} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 text-slate-500 hover:text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}