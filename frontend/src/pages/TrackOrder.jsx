// src/pages/TrackOrder.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Calendar, Package } from 'lucide-react';

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    // Fetch order status from backend
    fetch(`http://localhost:5000/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.order);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-lightBg py-16 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-premium text-center max-w-md">
          <h2 className="font-heading font-bold text-2xl mb-4">No Order Specified</h2>
          <p className="text-slate-500 mb-6">Please check your tracking link or return to our inventory.</p>
          <Link to="/catalog" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-all">Go to Catalog</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-slate-500 animate-pulse font-semibold">Retrieving your order status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBg py-12 px-4 sm:px-6 text-left">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-premium p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Order Confirmed</span>
            </div>
            <h1 className="font-heading font-bold text-2xl text-slate-900">Order Reference #{orderId}</h1>
          </div>
          <div className="bg-amber-50 text-amber-800 px-4 py-2 rounded-xl text-sm font-bold border border-amber-200/50">
            Status: {order?.status || 'Pending Dispatch'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Recipient Details</h3>
            <div className="flex items-center gap-2 text-slate-600 text-sm"><Package className="w-4 h-4 text-slate-400" /> {order?.customer_name || 'Loading...'}</div>
            <div className="flex items-center gap-2 text-slate-600 text-sm"><Phone className="w-4 h-4 text-slate-400" /> {order?.phone || 'Loading...'}</div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Destination</h3>
            <div className="flex items-center gap-2 text-slate-600 text-sm"><MapPin className="w-4 h-4 text-slate-400" /> {order?.delivery_location || 'Loading...'}</div>
            {order?.notes && <p className="text-xs text-slate-400 italic">Notes: "{order.notes}"</p>}
          </div>
        </div>

        <div className="bg-lightBg rounded-xl p-4 mb-8">
          <p className="text-xs text-slate-500 font-bold mb-4">You have successfully sent this invoice directly to Aura Store via WhatsApp to coordinate processing and logistics.</p>
          <Link to="/catalog" className="text-primary hover:text-slate-800 text-sm font-bold transition-all">← Continue Browsing Assets</Link>
        </div>
      </div>
    </div>
  );
}