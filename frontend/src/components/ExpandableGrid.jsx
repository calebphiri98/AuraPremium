import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Reusable layout engine built to fulfill the critical homepage product display requirements.
 * Dynamically updates UI without re-fetching or triggering component lifecycle layout shifts.
 */
export default function ExpandableGrid({ 
  items, 
  initialCount = 8, 
  renderItem,
  buttonLabelExpand = "View More Products",
  buttonLabelCollapse = "Show Less"
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleItems = isExpanded ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Container holding the grid with a unified layout configuration */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id || index}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.16, 1, 0.3, 1], // Custom premium elastic cubic-bezier 
                layout: { type: "spring", stiffness: 220, damping: 26 }
              }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modern High-Converting Animated CTA Button Trigger */}
      {hasMore && (
        <div className="mt-14 md:mt-18">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold font-heading text-sm rounded-xl overflow-hidden tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:bg-slate-800 active:scale-98 focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            {/* Background Subtle Gradient Glow Shift */}
            <span className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative flex items-center gap-2">
              {isExpanded ? buttonLabelCollapse : buttonLabelExpand}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </motion.span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}