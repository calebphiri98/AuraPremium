import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, ChevronDown, ChevronUp, Loader2, Search, Inbox, MapPin, MessageCircle } from 'lucide-react';

import { API } from '../../../src/config/api.js';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_STYLES = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Processing: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  Shipped: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
};

const STATUS_DOT = {
  Pending: 'bg-amber-500',
  Processing: 'bg-blue-500',
  Shipped: 'bg-violet-500',
  Delivered: 'bg-emerald-500',
  Cancelled: 'bg-red-500',
};

// Normalizes a local or international Malawian number into wa.me format (265XXXXXXXXX)
function toWhatsAppNumber(raw) {
  if (!raw) return null;
  const digits = String(raw).replace(/\D/g, '');
  if (!digits) return null;
  if (digits.startsWith('265')) return digits;
  if (digits.startsWith('0')) return `265${digits.slice(1)}`;
  return `265${digits}`;
}

function initials(name) {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

function StatusSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
      className={`text-xs font-medium rounded-full pl-2.5 pr-6 py-1.5 ring-1 ring-inset border-0 appearance-none bg-no-repeat bg-[right_0.4rem_center] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${STATUS_STYLES[value] || 'bg-slate-50 text-slate-600 ring-slate-600/20'}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3'><path d='M6 9l6 6 6-6'/></svg>\")",
        backgroundSize: '10px',
      }}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

export default function OrdersPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/orders`);
      setOrders(await res.json());
    } catch (err) {
      console.error(err);
    }
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
    if (!window.confirm(`Delete order #${id}? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await fetch(`${API}/orders/${id}`, { method: 'DELETE' });
      await fetchData();
    } finally {
      setDeletingId(null);
    }
  };

  const counts = useMemo(() => {
    const c = { All: orders.length };
    STATUSES.forEach((s) => { c[s] = orders.filter((o) => o.status === s).length; });
    return c;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let list = orders;
    if (statusFilter !== 'All') list = list.filter((o) => o.status === statusFilter);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (o) =>
          o.customer_name?.toLowerCase().includes(q) ||
          o.phone?.toLowerCase().includes(q) ||
          String(o.id).includes(q)
      );
    }
    return list;
  }, [orders, query, statusFilter]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Orders</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? 'Loading…' : `${orders.length} order${orders.length === 1 ? '' : 's'} total`}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by order #, customer, or phone…"
          className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus:border-violet-500"
        />
      </div>

      {/* Status filter chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        {['All', ...STATUSES].map((s) => {
          const active = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                active
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s !== 'All' && <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[s]}`} />}
              {s}
              <span className={active ? 'text-slate-300' : 'text-slate-400'}>{counts[s] ?? 0}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl py-16 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin mb-2" size={22} />
          <span className="text-sm">Loading orders…</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl py-16 flex flex-col items-center justify-center text-center px-6">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Inbox size={22} />
          </div>
          <p className="text-sm font-medium text-slate-700">
            {query || statusFilter !== 'All' ? 'No orders match your filters' : 'No orders yet'}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {query || statusFilter !== 'All' ? 'Try a different search or status.' : 'New orders will show up here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredOrders.map((o) => {
            const isExpanded = expanded === o.id;
            const waNumber = toWhatsAppNumber(o.phone);
            return (
              <div
                key={o.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow transition-shadow"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : o.id)}
                  className="w-full text-left px-4 py-3.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                      {initials(o.customer_name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 text-sm">
                        {o.customer_name}
                        <span className="text-slate-400 font-normal ml-1.5">#{o.id}</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 text-xs mt-1">
                        {waNumber ? (
                          <a
                            href={`https://wa.me/${waNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
                          >
                            <MessageCircle size={12} />
                            {o.phone}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1"><MessageCircle size={12} />{o.phone}</span>
                        )}
                        <span className="inline-flex items-center gap-1"><MapPin size={11} />{o.delivery_location}</span>
                        <span>{new Date(o.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 flex-shrink-0 pl-12 sm:pl-0">
                    <span className="text-slate-900 font-semibold text-sm">
                      MWK {Number(o.total_price).toLocaleString()}
                    </span>
                    <StatusSelect value={o.status} onChange={(e) => handleStatusChange(o.id, e.target.value)} />
                    <span
                      onClick={(e) => { e.stopPropagation(); handleDelete(o.id); }}
                      role="button"
                      aria-label={`Delete order ${o.id}`}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 active:bg-red-100 transition-colors"
                    >
                      {deletingId === o.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                    </span>
                    <span className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-4 py-3.5 bg-slate-50">
                    {o.notes && (
                      <p className="text-slate-600 text-sm mb-3">
                        <span className="font-medium text-slate-700">Notes:</span> {o.notes}
                      </p>
                    )}

                    {/* Mobile: stacked item rows */}
                    <ul className="sm:hidden space-y-2">
                      {(o.items || []).map((it) => (
                        <li key={it.id} className="flex items-center justify-between text-sm bg-white border border-slate-200 rounded-lg px-3 py-2">
                          <div className="min-w-0">
                            <p className="text-slate-800 truncate">{it.product_name || `#${it.product_id}`}</p>
                            <p className="text-slate-400 text-xs">Qty {it.quantity}</p>
                          </div>
                          <span className="text-slate-700 font-medium flex-shrink-0">
                            MWK {Number(it.price).toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Desktop: table */}
                    <table className="hidden sm:table w-full text-sm">
                      <thead>
                        <tr className="text-slate-500 text-left">
                          <th className="py-1 font-medium">Product</th>
                          <th className="py-1 font-medium">Qty</th>
                          <th className="py-1 font-medium">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(o.items || []).map((it) => (
                          <tr key={it.id} className="border-t border-slate-100 first:border-0">
                            <td className="py-1.5 text-slate-700">{it.product_name || `#${it.product_id}`}</td>
                            <td className="py-1.5 text-slate-700">{it.quantity}</td>
                            <td className="py-1.5 text-slate-700">MWK {Number(it.price).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}