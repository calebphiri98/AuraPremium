// src/routes/AppRoutes.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext'; // Import CartProvider

const Home = lazy(() => import('../pages/Home'));
const Catalog = lazy(() => import('../pages/Catalog'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Cart = lazy(() => import('../pages/Cart')); // Lazy-load Cart page
const TrackOrder = lazy(() => import('../pages/TrackOrder')); // Lazy-load Tracker page

// Admin Dashboard Section Components Lazy Ingest Engines
const AdminLogin = lazy(() => import('../pages/admin/Login'));
const AdminRegister = lazy(() => import('../pages/admin/SignUp')); // Lazy-load SignUp page
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
      <CartProvider> {/* Wrap routes with CartProvider */}
        <Suspense fallback={<PageSkeletonLoader />}>
          <Routes>
            {/* Main User Site Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="product/:slug" element={<ProductDetails />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cart" element={<Cart />} /> {/* Register Cart Path */}
              <Route path="track-order" element={<TrackOrder />} /> {/* Register Tracking Path */}
            </Route>

            {/* Dedicated Secured Administrative Subsections Layout Blocks */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminRegister />} /> {/* Register SignUp Path */}
            
            {/* Quick-redirect base admin URL to login */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}