"use client";

import { motion } from "framer-motion";

export default function PricingBadge() {
  const price = 7900;

  return (
    <motion.div
      className="inline-flex items-center gap-2 sm:gap-3 glass rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20 shadow-xl max-w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.12, duration: 0.5 }}
    >
      {/* Best Seller Badge */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg whitespace-nowrap">
        ⭐ الأكثر مبيعاً
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          {price}
        </span>
        <span className="text-lg text-white/80 font-semibold">DA</span>
      </div>
    </motion.div>
  );
}
