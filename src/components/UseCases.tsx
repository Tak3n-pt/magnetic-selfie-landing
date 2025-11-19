"use client";

import Image from "next/image";
import Section from "@/components/Section";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

const productImages = [
  { src: "/images/product-real-1.jpg", alt: "المنتج الحقيقي - منظر أمامي", badge: "Real Product" },
  { src: "/images/product-real-2.jpg", alt: "المنتج الحقيقي - زاوية جانبية", badge: "Actual Photo" },
  { src: "/images/product-real-3.jpg", alt: "المنتج الحقيقي - التفاصيل", badge: "No Filter" },
];

function ProductShowcaseCard({ image, index }: { image: typeof productImages[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
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
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative group perspective-1000"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card */}
      <div className="relative glass rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Real Product Badge */}
        <motion.div
          className="absolute top-4 right-4 z-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg backdrop-blur-sm"
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✓ {image.badge}
        </motion.div>

        {/* Image */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 400px, 100vw"
              priority={index === 0}
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60 group-hover:from-black/10 group-hover:to-black/70 transition-all duration-500" />

          {/* Floating info on hover */}
          <motion.div
            className="absolute bottom-6 left-6 right-6 glass rounded-2xl px-6 py-4 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white font-semibold text-sm">{image.alt}</p>
            <p className="text-white/70 text-xs mt-1">صورة حقيقية بدون تعديل</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function UseCases() {
  return (
    <Section>
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3">
            صور حقيقية للمنتج
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg text-white/80 mb-4">
            <span className="inline-flex items-center gap-2 glass rounded-full px-6 py-2 border border-white/20">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              جاهزة للحفلات، الجيم، البوثات، والبثوث المنزلية
            </span>
          </div>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            شاهد المنتج الحقيقي كما هو - بدون فلاتر أو تعديلات. ما تراه هو ما ستحصل عليه.
          </p>
        </motion.div>
      </div>

      {/* Product Showcase Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {productImages.map((image, index) => (
          <ProductShowcaseCard key={image.src} image={image} index={index} />
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-green-400">✓</span>
          <span>صور حقيقية 100%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400">✓</span>
          <span>بدون تعديل أو فلاتر</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">✓</span>
          <span>ما تراه هو ما تحصل عليه</span>
        </div>
      </motion.div>
    </Section>
  );
}
