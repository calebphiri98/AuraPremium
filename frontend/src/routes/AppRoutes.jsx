import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';

const Home = lazy(() => import('../pages/Home'));
const Catalog = lazy(() => import('../pages/Catalog'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));

// Admin Dashboard Section Components Lazy Ingest Engines
const AdminLogin = lazy(() => import('../pages/admin/Login'));
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));

const PageSkeletonLoader = () => (
  <div className="w-full min-h-[70vh] flex flex-col justify-center items-center gap-4 bg-lightBg">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-secondary rounded-full animate-spin" />
    <p className="font-heading font-medium text-xs text-slate-400 uppercase tracking-widest animate-pulse">Processing Configuration Matrix</p>
  </div>
);

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageSkeletonLoader />}>
        <Routes>
          {/* Main User Site Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="product/:slug" element={<ProductDetails />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Dedicated Secured Administrative Subsections Layout Blocks */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

// import React, { lazy, Suspense } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import MainLayout from '../layouts/MainLayout';

// // High-speed Route Chunk Loading with Premium Skeleton Screen Implementations
// const Home = lazy(() => import('../pages/Home'));
// const Catalog = lazy(() => import('../pages/Catalog'));
// const ProductDetails = lazy(() => import('../pages/ProductDetails'));
// const About = lazy(() => import('../pages/About'));
// const Contact = lazy(() => import('../pages/Contact'));

// const PageSkeletonLoader = () => (
//   <div className="w-full min-h-[70vh] flex flex-col justify-center items-center gap-4 bg-lightBg">
//     <div className="w-12 h-12 border-4 border-slate-200 border-t-secondary rounded-full animate-spin"></div>
//     <p className="font-heading font-medium text-xs text-slate-400 uppercase tracking-widest animate-pulse">Loading Experience</p>
//   </div>
// );

// export default function AppRoutes() {
//   return (
//     <Suspense fallback={<PageSkeletonLoader />}>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Home />} />
//           <Route path="catalog" element={<Catalog />} />
//           <Route path="product/:slug" element={<ProductDetails />} />
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// }