import React, { useState, useEffect } from 'react';
import { Check, Trash2, Loader2 } from 'lucide-react';

import {API} from '../../../src/config/api.js'

export default function MessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`${API}/messages`);
    setMessages(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const toggleProcessed = async (msg) => {
    await fetch(`${API}/messages/${msg.id}/processed`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ processed: !msg.processed }),
    });
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await fetch(`${API}/messages/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Inquiries</h2>

      {loading ? (
        <div className="text-slate-400 text-sm flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading…</div>
      ) : messages.length === 0 ? (
        <p className="text-slate-400 text-sm">No inquiries yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`bg-white border rounded-xl p-4 ${m.processed ? 'border-slate-200 opacity-60' : 'border-violet-200'}`}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-medium text-slate-900">{m.sender_name} {m.company && <span className="text-slate-400 font-normal">· {m.company}</span>}</p>
                  <p className="text-slate-500 text-xs mb-2">{m.email} · {new Date(m.created_at).toLocaleString()}</p>
                  <p className="text-slate-700 text-sm">{m.message}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => toggleProcessed(m)} className={`p-1.5 rounded-md ${m.processed ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600'}`}><Check size={15} /></button>
                  <button onClick={() => handleDelete(m.id)} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}