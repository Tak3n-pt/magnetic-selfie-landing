"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "@/components/Section";
import Logo from "@/components/Logo";

export default function Offer() {
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]));

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

  return (
    <Section>
      <motion.div
        className="relative glass rounded-3xl p-8 md:p-12 text-center overflow-hidden perspective-1000"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated blob backgrounds */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Limited badge - top right */}
        <motion.div
          className="absolute top-6 right-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg z-10"
          animate={{ rotate: [0, -2, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ⚡ عرض حصري محدود
        </motion.div>

        {/* Logo at top */}
        <div className="mb-6">
          <Logo size="medium" showText={true} />
          <motion.p
            className="text-white/60 text-xs mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Official Product
          </motion.p>
        </div>

        {/* Floating price */}
        <motion.div
          className="relative z-10 my-8"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Price */}
            <motion.h3
              className="text-7xl md:text-9xl font-black leading-none"
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #3B82F6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: `
                  0 2px 0 rgba(139, 92, 246, 0.3),
                  0 4px 0 rgba(59, 130, 246, 0.2),
                  0 6px 0 rgba(6, 182, 212, 0.1),
                  0 12px 24px rgba(6, 182, 212, 0.4)
                `,
                filter: "drop-shadow(0 0 30px rgba(6, 182, 212, 0.6))",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            >
              7900
            </motion.h3>
            <motion.p
              className="text-2xl md:text-3xl font-bold text-white/90 mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{
                textShadow: "0 2px 8px rgba(6, 182, 212, 0.3)",
              }}
            >
              DA
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Value propositions */}
        <motion.div
          className="space-y-3 text-white/80 max-w-md mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { icon: "✓", text: "التوصيل لـ 69 ولاية" },
            { icon: "✓", text: "ضمان ما بعد البيع" },
            { icon: "✓", text: "جميع الملحقات مشمولة" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center gap-3 text-sm md:text-base"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            >
              <span className="text-green-400 font-bold text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
      </motion.div>
    </Section>
  );
}
