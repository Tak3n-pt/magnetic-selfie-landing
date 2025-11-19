"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import Button from "@/components/Button";

export default function PricingCard() {
  const [stock, setStock] = useState(23); // Dynamic stock counter

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const price = 7900;

  const includedItems = [
    { icon: "📱", text: "شاشة مغناطيسية ألترا احترافية" },
    { icon: "💡", text: "إضاءة LED قابلة للتعديل" },
    { icon: "🔋", text: "بطارية قابلة للشحن 3000mAh" },
    { icon: "🧲", text: "حلقة MagSafe عالمية" },
    { icon: "📦", text: "حقيبة حمل فاخرة" },
    { icon: "🎁", text: "ضمان سنتين + شحن مجاني" },
  ];

  return (
    <motion.div
      className="relative max-w-lg mx-auto perspective-1000"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />

      {/* Main card */}
      <div className="relative glass rounded-3xl p-8 border border-white/20 shadow-2xl backdrop-blur-xl bg-white/5 overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Best Seller Badge */}
        <motion.div
          className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full font-bold shadow-lg text-sm"
          animate={{ rotate: [0, -5, 0], y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⭐ الأكثر مبيعاً
        </motion.div>

        {/* Price Section */}
        <div className="text-center mb-8 relative z-10">
          <motion.div
            className="flex items-baseline justify-center gap-2"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <span className="text-7xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {price}
            </span>
            <span className="text-2xl text-white/80 font-semibold">DA</span>
          </motion.div>
        </div>

        {/* Stock Counter */}
        <div className="glass rounded-xl p-4 border border-white/10 text-center mb-6">
          <div className="text-white/60 text-xs mb-2">المتبقي بالمخزون</div>
          <motion.div
            className="text-3xl font-black text-red-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {stock} فقط
          </motion.div>
        </div>

        {/* What's Included */}
        <div className="mb-8 relative z-10">
          <h3 className="text-white font-bold text-lg mb-4 text-center">
            📦 ماذا ستحصل عليه؟
          </h3>
          <div className="space-y-3">
            {includedItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-white/90"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="glass rounded-xl p-4 border border-white/10 mb-6 relative z-10">
          <div className="flex justify-between text-white font-bold text-lg">
            <span>السعر الإجمالي:</span>
            <span className="text-green-400">{price} DA</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button className="w-full text-lg py-6 shadow-2xl" as="a" href="#order">
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🛒 اطلب الآن - عرض محدود
          </motion.span>
        </Button>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-white/60">
          <div className="flex items-center gap-1">
            <span>🔒</span>
            <span>دفع آمن 100%</span>
          </div>
          <div className="flex items-center gap-1">
            <span>✅</span>
            <span>ضمان استرجاع المال</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🚚</span>
            <span>شحن سريع مجاني</span>
          </div>
        </div>

        {/* Social Proof */}
        <motion.div
          className="mt-4 text-center text-white/70 text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔥 <span className="font-bold text-orange-400">127</span> شخص اشتروا هذا المنتج اليوم
        </motion.div>
      </div>
    </motion.div>
  );
}
