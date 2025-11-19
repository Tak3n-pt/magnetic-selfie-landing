"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = "medium", showText = true, className = "" }: LogoProps) {
  const sizes = {
    small: { circle: 60, text: "text-2xl", subtext: "text-xs" },
    medium: { circle: 80, text: "text-4xl", subtext: "text-sm" },
    large: { circle: 100, text: "text-5xl", subtext: "text-base" },
  };

  const config = sizes[size];

  return (
    <motion.div
      className={`flex flex-col items-center gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Circular Badge */}
      <div className="relative group">
        {/* Rotating border glow */}
        <motion.div
          className="absolute -inset-1 rounded-full"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #06B6D4, #3B82F6, #06B6D4)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Main circle */}
        <motion.div
          className="relative glass rounded-full border-2 border-white/20 flex items-center justify-center overflow-hidden"
          style={{
            width: config.circle,
            height: config.circle,
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-xl" />

          {/* The "E" */}
          <motion.span
            className={`relative font-black ${config.text} leading-none`}
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #3B82F6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: `
                0 1px 0 rgba(59, 130, 246, 0.4),
                0 2px 0 rgba(59, 130, 246, 0.3),
                0 3px 0 rgba(59, 130, 246, 0.2),
                0 8px 16px rgba(6, 182, 212, 0.3)
              `,
              filter: "drop-shadow(0 0 15px rgba(6, 182, 212, 0.5))",
            }}
          >
            E
          </motion.span>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Text */}
      {showText && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div
            className={`font-bold ${config.subtext} tracking-wide`}
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #3B82F6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            EverMart
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
