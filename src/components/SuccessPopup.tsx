"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Package, MapPin, Clock, Palette } from "lucide-react";
import confetti from "canvas-confetti";

type OrderDetails = {
  name: string;
  phone: string;
  wilaya: string;
  commune: string;
  deliveryType: "home" | "bureau";
  color: "white" | "grey";
  address?: string;
  shippingFee: number;
  deliveryTime: string;
  totalPrice: number;
};

interface SuccessPopupProps {
  orderDetails: OrderDetails;
  onClose: () => void;
}

export default function SuccessPopup({ orderDetails, onClose }: SuccessPopupProps) {
  const [countdown, setCountdown] = useState(10);

  // Auto-close when countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      onClose();
    }
  }, [countdown, onClose]);

  useEffect(() => {
    // Trigger confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);

    // Keyboard listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const colorName = orderDetails.color === "white" ? "أبيض لؤلؤي" : "رمادي سحابي";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          className="relative w-full max-w-lg glass rounded-3xl border-2 border-white/20 overflow-hidden shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.5
            }
          }}
          exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
        >
          {/* Gradient Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white/80 group-hover:text-white" />
          </button>

          {/* Auto-close Countdown */}
          <div className="absolute top-4 right-4 text-xs text-white/60">
            {countdown}s
          </div>

          {/* Content */}
          <div className="relative p-8 pt-12">
            <motion.div
              className="flex flex-col items-center text-center space-y-6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }}
            >
              {/* Success Icon with Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                    delay: 0.2
                  }
                }}
              >
                <div className="relative">
                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <CheckCircle className="w-20 h-20 text-cyan-400 relative" strokeWidth={2.5} />
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  تم تأكيد طلبك!
                </h2>
                <p className="text-white/70 text-sm">
                  شكراً لك {orderDetails.name}، سنتواصل معك قريباً
                </p>
              </motion.div>

              {/* Order Summary Card */}
              <motion.div
                className="w-full glass rounded-2xl p-6 border border-white/10 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start gap-3 text-right">
                  <Package className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-white/50">المنتج</p>
                    <p className="font-semibold">Magnetic Selfie Screen Ultra</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-right">
                  <Palette className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-white/50">اللون</p>
                    <p className="font-semibold">{colorName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-right">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-white/50">التوصيل</p>
                    <p className="font-semibold">{orderDetails.wilaya}</p>
                    <p className="text-sm text-white/70">{orderDetails.commune}</p>
                    {orderDetails.deliveryType === "home" && orderDetails.address && (
                      <p className="text-xs text-white/50 mt-1">{orderDetails.address}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-right">
                  <Clock className="w-5 h-5 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-white/50">وقت التوصيل المتوقع</p>
                    <p className="font-semibold">{orderDetails.deliveryTime}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">رسوم الشحن</span>
                    <span className="font-semibold">{orderDetails.shippingFee} DA</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold">المجموع</span>
                    <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {orderDetails.totalPrice.toLocaleString()} DA
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                onClick={onClose}
                className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                رائع، شكراً!
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
