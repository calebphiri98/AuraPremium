
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