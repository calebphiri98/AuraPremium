
import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// // Mock high-performance modern UI shells for initial deployment compatibility
// const GlobalHeaderPlaceholder = () => (
//   <header className="sticky top-0 z-50 w-full glass-effect border-b border-slate-100 transition-all duration-300">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
//       <div className="flex items-center gap-2">
//         <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center font-heading text-white font-bold text-lg">M</div>
//         <span className="font-heading font-bold text-xl tracking-tight text-primary">MR GMwale</span>
//       </div>
//       <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
//         <a href="/" className="hover:text-secondary transition-colors">Home</a>
//         <a href="/catalog" className="hover:text-secondary transition-colors">Catalog</a>
//         <a href="/about" className="hover:text-secondary transition-colors">About</a>
//         <a href="/contact" className="hover:text-secondary transition-colors">Contact</a>
//       </nav>
//       <div className="flex items-center gap-4">
//         <a href="/catalog" className="bg-primary hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg">Explore</a>
//       </div>
//     </div>
//   </header>
// );

// const GlobalFooterPlaceholder = () => (
//   <footer className="bg-primary text-white border-t border-slate-900 pt-16 pb-12">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
//       <div className="md:col-span-1">
//         <div className="flex items-center gap-2 mb-4">
//           <div className="w-9 h-9 bg-white text-primary rounded-xl flex items-center justify-center font-heading font-bold text-lg">M</div>
//           <span className="font-heading font-bold text-xl tracking-tight text-white">MR GMwale</span>
//         </div>
//         <p className="text-slate-400 text-sm leading-relaxed">Providing high-end products engineered with uncompromising precision and premium quality standards.</p>
//       </div>
//       <div>
//         <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-slate-200 mb-4">Products</h4>
//         <ul className="space-y-2 text-sm text-slate-400">
//           <li><a href="/catalog" className="hover:text-white transition-colors">Featured Lineup</a></li>
//           <li><a href="/catalog" className="hover:text-white transition-colors">New Arrivals</a></li>
//         </ul>
//       </div>
//       <div>
//         <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-slate-200 mb-4">Company</h4>
//         <ul className="space-y-2 text-sm text-slate-400">
//           <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
//           <li><a href="/contact" className="hover:text-white transition-colors">Get In Touch</a></li>
//         </ul>
//       </div>
//       <div>
//         <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-slate-200 mb-4">Legal</h4>
//         <ul className="space-y-2 text-sm text-slate-400">
//           <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
//           <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
//         </ul>
//       </div>
//     </div>
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
//       &copy; {new Date().getFullYear()} MR GMwale. All rights reserved. Built for enterprise performance.
//     </div>
//   </footer>
// );

// export default function MainLayout() {
//   return (
//     <div className="flex flex-col min-h-screen bg-white selection:bg-secondary/10">
//       <GlobalHeaderPlaceholder />
//       <main className="flex-grow">
//         <AnimatePresence mode="wait">
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -15 }}
//             transition={{ duration: 0.35, ease: 'easeInOut' }}
//           >
//             <Outlet />
//           </motion.div>
//         </AnimatePresence>
//       </main>
//       <GlobalFooterPlaceholder />
//     </div>
//   );
// }