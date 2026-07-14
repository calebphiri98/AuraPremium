import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';

const API = 'http://localhost:5000/api';

export default function CategoriesPanel() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`${API}/categories`);
    setCategories(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    await fetch(`${API}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), slug }),
    });
    setName('');
    setSaving(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? Products will become uncategorized.')) return;
    await fetch(`${API}/categories/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Categories</h2>

      <form onSubmit={handleAdd} className="flex gap-3 mb-5 max-w-sm">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
        />
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-violet-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-violet-800 disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Add
        </button>
      </form>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-500">
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400"><Loader2 className="animate-spin inline mr-2" size={16} />Loading…</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400">No categories yet.</td></tr>
            ) : categories.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-4 py-3 text-slate-600">{c.product_count}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-slate-500 hover:text-red-600"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}