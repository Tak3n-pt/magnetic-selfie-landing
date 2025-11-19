"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "@/components/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Logo 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]));

  // Scroll-triggered navbar shrink
  const navHeight = useTransform(scrollY, [0, 100], [80, 64]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleLogoMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const navLinks = [
    { href: "#features", label: "المزايا" },
    { href: "#offer", label: "العرض" },
    { href: "#faq", label: "الأسئلة" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass border-b border-white/10 shadow-2xl backdrop-blur-xl"
            : "bg-transparent"
        }`}
        style={{ height: navHeight }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <motion.a
              href="#"
              className="relative flex items-center group perspective-1000"
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoMouseLeave}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/40 via-cyan-500/40 to-blue-500/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Text Logo with 3D tilt */}
              <motion.div
                className="relative flex items-baseline gap-0.5"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                dir="ltr"
              >
                {/* Big "E" */}
                <motion.span
                  className="text-4xl md:text-5xl font-black leading-none"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #3B82F6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: `
                      0 1px 0 rgba(59, 130, 246, 0.4),
                      0 2px 0 rgba(59, 130, 246, 0.3),
                      0 3px 0 rgba(59, 130, 246, 0.2),
                      0 4px 0 rgba(59, 130, 246, 0.1),
                      0 8px 16px rgba(6, 182, 212, 0.3)
                    `,
                    filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))",
                  }}
                  whileHover={{
                    scale: 1.05,
                    filter: "drop-shadow(0 0 30px rgba(6, 182, 212, 0.8))",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  E
                </motion.span>

                {/* "verMart" in white */}
                <motion.span
                  className={`font-bold text-3xl md:text-4xl tracking-tight leading-none text-white ${
                    isScrolled ? "hidden md:block" : "block"
                  }`}
                  style={{
                    textShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
                  }}
                  animate={{ opacity: isScrolled ? 0.9 : 1 }}
                >
                  verMart
                </motion.span>
              </motion.div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white font-medium transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button as="a" href="#order" className="shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow">
                  اطلب الآن
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-white rounded-full"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white rounded-full"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white rounded-full"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0, pointerEvents: "none" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        />

        {/* Menu Content */}
        <motion.div
          className="absolute top-20 left-4 right-4 glass rounded-3xl border border-white/20 p-6 shadow-2xl"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -20,
            scale: isMobileMenuOpen ? 1 : 0.95,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="block text-white text-lg font-medium hover:text-blue-400 transition-colors py-2 border-b border-white/10 last:border-0"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Button
                as="a"
                href="#order"
                className="w-full shadow-lg shadow-blue-500/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                اطلب الآن
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
