"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";
import HeroGallery from "@/components/HeroGallery";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 start-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(107,140,255,.18)_0%,transparent_60%)]" />
        <div className="absolute -top-40 -end-20 h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,79,216,.14)_0%,transparent_60%)]" />
      </div>

      <div className="container pt-14 md:pt-20 pb-10">
        <div className="grid items-start md:items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block rounded-full border border-white/15 px-4 py-1 text-sm text-white/80 glass">
                الشاشة المغناطيسية للتصوير السيلفي ألترا
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
            <motion.div className="flex items-center gap-4" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
              <Button variant="ghost" as="a" href="#features">
                شاهد المزايا
              </Button>
            </motion.div>
            <motion.div className="flex flex-wrap gap-4 text-white/70" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              <div>يدعم MagSafe لجميع الهواتف</div>
              <div>تثبيت سريع أقل من دقيقتين</div>
              <div>متوازن مع الإضاءة الخارجية</div>
            </motion.div>
          </div>
          <motion.div
            className="relative w-full flex justify-center md:justify-end md:-mt-8"
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
