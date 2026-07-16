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
    <div className="min-h-screen bg-[#FBF8F3]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-mono-label { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .font-body { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      {/* Hero band */}
      <div className="relative overflow-hidden bg-[#0B2E33]">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.12]"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[...Array(6)].map((_, i) => (
            <circle key={i} cx="40" cy="100" r={20 + i * 22} fill="none" stroke="#C08A28" strokeWidth="1" />
          ))}
        </svg>
        <div className="relative max-w-2xl mx-auto px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <p className="font-mono-label text-[11px] tracking-[0.2em] text-[#C08A28] uppercase mb-4">
            Open channel — Zomba, Malawi
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#FBF8F3] leading-[1.05]">
            Let's talk.
          </h1>
          <p className="font-body text-[#9FC1C0] mt-4 max-w-md leading-relaxed">
            Four ways to reach the studio. Pick whichever feels most like you — a call
            gets answered, a message gets a reply within the day.
          </p>
        </div>
      </div>

      {/* Channels */}
      <div className="max-w-2xl mx-auto px-6 -mt-10 sm:-mt-12 relative pb-16">
        <div className="grid gap-3.5">
          <ChannelCard
            meta={CHANNELS_META.call}
            icon={<Phone size={20} />}
            value={phoneNumber}
            action={`tel:${phoneNumber}`}
          />
          <ChannelCard
            meta={CHANNELS_META.whatsapp}
            icon={<MessageCircle size={20} />}
            value={phoneNumber}
            action={`https://wa.me/${whatsappNumber}`}
            external
          />
          <ChannelCard
            meta={CHANNELS_META.email}
            icon={<Mail size={20} />}
            value={email}
            action={`mailto:${email}`}
          />
          <ChannelCard
            meta={CHANNELS_META.location}
            icon={<MapPin size={20} />}
            value="Zomba, Malawi"
            action="https://www.google.com/maps/search/?api=1&query=Zomba%2C+Malawi"
            external
          />
        </div>

        {/* Business hours — ticket stub */}
        <div className="relative mt-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div
              className="h-3 w-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 8px 0, #FBF8F3 4px, transparent 4.5px)',
                backgroundSize: '16px 8px',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top',
              }}
            />
            <div className="px-6 py-6 text-center">
              <p className="font-mono-label text-[10px] tracking-[0.2em] text-slate-400 uppercase mb-2">
                Studio hours
              </p>
              <h3 className="font-display text-lg font-semibold text-slate-900 mb-3">
                When we're on air
              </h3>
              <div className="font-body text-sm text-slate-500 space-y-1">
                <p className="flex justify-center gap-2">
                  <span className="text-slate-700 font-medium w-32 text-right">Mon – Fri</span>
                  <span>8:00 AM – 5:00 PM</span>
                </p>
                <p className="flex justify-center gap-2">
                  <span className="text-slate-700 font-medium w-32 text-right">Saturday</span>
                  <span>9:00 AM – 1:00 PM</span>
                </p>
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
      className={`group relative flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300 active:translate-y-0`}
    >
      <span className="font-mono-label absolute top-3 right-4 text-[10px] tracking-widest text-slate-300 group-hover:text-slate-400 transition-colors">
        {meta.tag}
      </span>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.bg} ${meta.text} ring-1 ${meta.ring}`}>
        {icon}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
          <h3 className="font-mono-label text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {meta.label}
          </h3>
        </div>
        <p className="font-display text-lg font-semibold text-slate-900 mt-0.5 truncate">{value}</p>
      </div>

      <ArrowUpRight
        size={16}
        className="ml-auto text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
      />
    </a>
  );
}