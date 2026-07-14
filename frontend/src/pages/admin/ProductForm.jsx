import React, { useState } from 'react';
import { Plus, Trash2, Loader2, ArrowLeft, Star, Upload } from 'lucide-react';

const API = 'http://localhost:5000/api';

export default function ProductForm({ item, categories, onCancel, onSuccess }) {
  const isEdit = Boolean(item);

  const [form, setForm] = useState({
    name: item?.name || '',
    slug: item?.slug || '',
    description: item?.description || '',
    price: item?.price || '',
    stock: item?.stock ?? 0,
    category_id: item?.category_id || '',
    featured: item?.featured || false,
  });

  const [specs, setSpecs] = useState(
    item?.specifications && Object.keys(item.specifications).length
      ? Object.entries(item.specifications).map(([key, value]) => ({ key, value }))
      : [{ key: '', value: '' }]
  );

  const [images, setImages] = useState(
    item?.images?.length
      ? item.images.map((img) => ({ image_url: img.image_url }))
      : [{ image_url: '' }]
  );

  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [error, setError] = useState('');

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  // --- Image helpers ---
  const updateImage = (i, value) => {
    setImages((imgs) => imgs.map((row, idx) => (idx === i ? { image_url: value } : row)));
  };
  const addImage = () => setImages((imgs) => [...imgs, { image_url: '' }]);
  const removeImage = (i) => setImages((imgs) => imgs.filter((_, idx) => idx !== i));
  const makePrimary = (i) => setImages((imgs) => [imgs[i], ...imgs.filter((_, idx) => idx !== i)]);

  // --- Specifications helpers ---
  const updateSpec = (i, field, value) => {
    setSpecs((s) => s.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)));
  };
  const addSpec = () => setSpecs((s) => [...s, { key: '', value: '' }]);
  const removeSpec = (i) => setSpecs((s) => s.filter((_, idx) => idx !== i));

  // --- Backend-based Upload ---
  const handleFileUpload = async (i, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingIndex(i);
    setError('');

    const formData = new FormData();
    formData.append('image', file); // 'image' matches your backend's upload.single('image')

    try {
      const res = await fetch(`${API}/products/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      
      updateImage(i, data.image_url);
    } catch (err) {
      setError(`Upload error: ${err.message}`);
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const slug = form.slug || form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const specifications = Object.fromEntries(
      specs.filter((s) => s.key.trim()).map((s) => [s.key.trim(), s.value])
    );
    const cleanImages = images.filter((img) => img.image_url.trim());

    const payload = { ...form, slug, price: Number(form.price), stock: Number(form.stock), specifications, images: cleanImages };

    try {
      const res = await fetch(isEdit ? `${API}/products/${item.id}` : `${API}/products`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to save product');
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm mb-5">
        <ArrowLeft size={16} /> Back to products
      </button>

      <h2 className="text-xl font-semibold text-slate-900 mb-6">{isEdit ? `Edit "${item.name}"` : 'Add product'}</h2>

      {error && <div className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h3 className="font-medium text-slate-900">Basic information</h3>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input required value={form.name} onChange={update('name')} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Description</label>
            <textarea required rows={4} value={form.description} onChange={update('description')} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Price (MWK)</label>
              <input required type="number" step="0.01" value={form.price} onChange={update('price')} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Stock</label>
              <input required type="number" value={form.stock} onChange={update('stock')} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Category</label>
              <select value={form.category_id} onChange={update('category_id')} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                <option value="">Uncategorized</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={form.featured} onChange={update('featured')} /> Featured product
          </label>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-slate-900">Images</h3>
            <button type="button" onClick={addImage} className="flex items-center gap-1 text-sm text-violet-700 hover:text-violet-900">
              <Plus size={15} /> Add image
            </button>
          </div>
          {images.map((img, i) => (
            <div key={i} className="flex items-center gap-2">
              <button type="button" onClick={() => makePrimary(i)} className={`p-2 ${i === 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                <Star size={16} className={i === 0 ? 'fill-amber-500' : ''} />
              </button>
              <input value={img.image_url} onChange={(e) => updateImage(i, e.target.value)} placeholder="https://..." className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              <label className="cursor-pointer p-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                {uploadingIndex === i ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} className="text-slate-500" />}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(i, e)} />
              </label>
              {images.length > 1 && <button type="button" onClick={() => removeImage(i)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={15} /></button>}
            </div>
          ))}
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-slate-900">Specifications</h3>
            <button type="button" onClick={addSpec} className="flex items-center gap-1 text-sm text-violet-700 hover:text-violet-900"><Plus size={15} /> Add spec</button>
          </div>
          {specs.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={row.key} onChange={(e) => updateSpec(i, 'key', e.target.value)} placeholder="Key (e.g. Material)" className="w-1/3 border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              <input value={row.value} onChange={(e) => updateSpec(i, 'value', e.target.value)} placeholder="Value (e.g. Leather)" className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              {specs.length > 1 && <button type="button" onClick={() => removeSpec(i)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={15} /></button>}
            </div>
          ))}
        </section>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Cancel</button>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-violet-700 text-white hover:bg-violet-800 disabled:opacity-60">
            {saving && <Loader2 size={16} className="animate-spin" />}
            {isEdit ? 'Save changes' : 'Create product'}
          </button>
        </div>
      </form>
    </div>
  );
}