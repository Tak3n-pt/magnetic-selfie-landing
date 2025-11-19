"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Button from "@/components/Button";
import HeroGallery from "@/components/HeroGallery";
import PricingBadge from "@/components/PricingBadge";
import * as fbq from "@/components/FacebookPixel";

export default function Hero() {
  useEffect(() => {
    // Track ViewContent after 3 seconds (user is engaged)
    const timer = setTimeout(() => {
      fbq.event("ViewContent", {
        content_name: "Magnetic Selfie Screen Ultra",
        content_category: "Electronics",
        content_type: "product",
        value: 7900,
        currency: "DZD"
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 start-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(107,140,255,.18)_0%,transparent_60%)]" />
        <div className="absolute -top-40 -end-20 h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,79,216,.14)_0%,transparent_60%)]" />
      </div>

      <div className="container pt-20 md:pt-24 pb-10 overflow-hidden">
        <div className="grid items-start md:items-center gap-6 md:gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-3 md:space-y-4">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block rounded-full border border-white/15 px-4 py-1 text-sm text-white/80 glass">
                Magnetic Selfie Screen Ultra
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-[1.15] tracking-tight"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.7 }}
            >
              ثبّت هاتفك وإضاءتك في ثوانٍ، وصوّر بثبات في أي حدث أو مكان.
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-prose"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              تثبيت مغناطيسي قوي مع تشتت ضوئي ناعم يحافظ على حدة الفيديو حتى وسط الزحام. مثالي للفعاليات، والجيم، ومحتوى التيك توك والإنستغرام عندما تحتاج تصوير ثابت بدون ترايبود.
            </motion.p>

            <PricingBadge />

            <motion.div className="flex items-center gap-4" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
              <Button as="a" href="#order">
                اطلب الآن قبل نفاذ الكمية
              </Button>
              <Button variant="ghost" as="a" href="#features">
                شاهد المزايا
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="relative w-full max-w-full flex justify-center md:justify-end overflow-hidden"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <HeroGallery />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
