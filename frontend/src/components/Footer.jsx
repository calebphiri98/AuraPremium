import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const phoneNumber = '0984317944';
  const email = 'genesismwale@gmail.com';
  const whatsappNumber = `265${phoneNumber.replace(/^0/, '')}`;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-6 sm:pt-16 sm:pb-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">

          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">MR GMwale</h2>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Based in Zomba, delivering quality products to your doorstep everywhere across Malawi.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3 sm:space-y-4 pt-6 md:pt-0 border-t border-slate-800 md:border-0">
            <h3 className="font-semibold text-white text-sm sm:text-base">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:block sm:space-y-2 text-sm">
              <li><Link to="/" className="hover:text-violet-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-violet-400 transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-violet-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-violet-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4 pt-6 md:pt-0 border-t border-slate-800 md:border-0">
            <h3 className="font-semibold text-white text-sm sm:text-base">Contact Info</h3>
            <ul className="space-y-2.5 sm:space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Zomba%2C+Malawi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <MapPin size={17} className="shrink-0 text-slate-500" /> Zomba, Malawi
                </a>
              </li>
              <li>
                <a href={`tel:${phoneNumber}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone size={17} className="shrink-0 text-slate-500" /> 0984 317 944
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle size={17} className="shrink-0 text-slate-500" /> WhatsApp us
                </a>
              </li>
              <li className="min-w-0">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Mail size={17} className="shrink-0 text-slate-500" />
                  <span className="truncate">{email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} MR GMwale. All rights reserved.
        </div>
      </div>
    </footer>
  );
}