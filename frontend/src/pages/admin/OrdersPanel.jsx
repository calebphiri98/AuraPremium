import React, { useState, useEffect } from 'react';
import { Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

import {API} from '../../../src/config/api.js'
const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrdersPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`${API}/orders`);
    setOrders(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatusChange = async (id, status) => {
    await fetch(`${API}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete order #${id}?`)) return;
    await fetch(`${API}/orders/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Orders</h2>

      {loading ? (
        <div className="text-slate-400 text-sm flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading…</div>
      ) : orders.length === 0 ? (
        <p className="text-slate-400 text-sm">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">#{o.id} — {o.customer_name}</p>
                  <p className="text-slate-500 text-xs">{o.phone} · {o.delivery_location} · {new Date(o.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-700 font-medium text-sm">MWK {Number(o.total_price).toLocaleString()}</span>
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className="text-xs font-medium border border-slate-200 rounded-full px-2.5 py-1"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={() => setExpanded(expanded === o.id ? null : o.id)} className="p-1.5 text-slate-500 hover:text-violet-700">
                    {expanded === o.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button onClick={() => handleDelete(o.id)} className="p-1.5 text-slate-500 hover:text-red-600"><Trash2 size={15} /></button>
                </div>
              </div>

              {expanded === o.id && (
                <div className="border-t border-slate-100 px-4 py-3 bg-slate-50">
                  {o.notes && <p className="text-slate-600 text-sm mb-2">Notes: {o.notes}</p>}
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-500 text-left">
                        <th className="py-1">Product</th>
                        <th className="py-1">Qty</th>
                        <th className="py-1">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(o.items || []).map((it) => (
                        <tr key={it.id}>
                          <td className="py-1 text-slate-700">{it.product_name || `#${it.product_id}`}</td>
                          <td className="py-1 text-slate-700">{it.quantity}</td>
                          <td className="py-1 text-slate-700">MWK {Number(it.price).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}