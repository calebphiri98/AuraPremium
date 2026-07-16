import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';

const CHANNELS_META = {
  call: { label: 'Voice call', tag: 'CH.01', ring: 'ring-violet-500/30', dot: 'bg-violet-500', text: 'text-violet-700', bg: 'bg-violet-50' },
  whatsapp: { label: 'WhatsApp', tag: 'CH.02', ring: 'ring-emerald-500/30', dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  email: { label: 'Email', tag: 'CH.03', ring: 'ring-blue-500/30', dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
  location: { label: 'Studio', tag: 'CH.04', ring: 'ring-amber-500/30', dot: 'bg-amber-600', text: 'text-amber-700', bg: 'bg-amber-50' },
};

export default function Contact() {
  const phoneNumber = '0984317944';
  const email = 'genesismwale@gmail.com';
  const whatsappNumber = `265${phoneNumber.replace(/^0/, '')}`;

  return (
    <div className="min-h-screen bg-[#FBF8F3] pb-12">
      {/* Font imports remain the same */}
      
      {/* Hero band - Adjusted padding for mobile */}
      <div className="relative overflow-hidden bg-[#0B2E33]">
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24">
          <p className="font-mono-label text-[10px] sm:text-[11px] tracking-[0.2em] text-[#C08A28] uppercase mb-4">
            Open channel — Zomba, Malawi
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-[#FBF8F3] leading-[1]">
            Let's talk.
          </h1>
          <p className="font-body text-[#9FC1C0] mt-6 max-w-md leading-relaxed text-sm sm:text-base">
            Four ways to reach the studio. Pick whichever feels most like you — a call
            gets answered, a message gets a reply within the day.
          </p>
        </div>
      </div>

      {/* Channels - Mobile-optimized spacing */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 relative">
        <div className="grid gap-3">
          <ChannelCard meta={CHANNELS_META.call} icon={<Phone size={20} />} value={phoneNumber} action={`tel:${phoneNumber}`} />
          <ChannelCard meta={CHANNELS_META.whatsapp} icon={<MessageCircle size={20} />} value={phoneNumber} action={`https://wa.me/${whatsappNumber}`} external />
          <ChannelCard meta={CHANNELS_META.email} icon={<Mail size={20} />} value={email} action={`mailto:${email}`} />
          <ChannelCard meta={CHANNELS_META.location} icon={<MapPin size={20} />} value="Zomba, Malawi" action="#" external />
        </div>

        {/* Business hours - Optimized for mobile readability */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-8 text-center">
            <p className="font-mono-label text-[10px] tracking-[0.2em] text-slate-400 uppercase mb-4">Studio hours</p>
            <h3 className="font-display text-lg font-semibold text-slate-900 mb-4">When we're on air</h3>
            <div className="font-body text-sm text-slate-600 space-y-2">
              <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-4">
                <span className="font-medium text-slate-900">Mon – Fri:</span>
                <span>8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-4">
                <span className="font-medium text-slate-900">Saturday:</span>
                <span>9:00 AM – 1:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelCard({ meta, icon, value, action, external }) {
  return (
    <a
      href={action}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-slate-300 active:scale-[0.98]"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.bg} ${meta.text} ring-1 ${meta.ring}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-mono-label text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
          {meta.label}
        </h3>
        <p className="font-display text-base sm:text-lg font-semibold text-slate-900 truncate">{value}</p>
      </div>
      <ArrowUpRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
    </a>
  );
}