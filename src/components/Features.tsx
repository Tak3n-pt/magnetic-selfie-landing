import { Camera, Magnet, MonitorUp, Smartphone } from "lucide-react";
import Image from "next/image";
import Section from "@/components/Section";

const features = [
  { icon: Magnet, title: "تثبيت مغناطيسي ثابت", desc: "قاعدة MagSafe مع شريط أمان تحافظ على الهاتف ثابتاً حتى مع اللمس والحركة." },
  { icon: Camera, title: "إضاءة ليد بـ3 درجات", desc: "موزّع إضاءة ناعم بثلاث درجات حرارة لونية لإضاءة متوازنة للوجه." },
  { icon: MonitorUp, title: "دوران وميول مرن", desc: "مفصل كروي للتصوير أفقي أو عمودي وضبط زاوية الإضاءة بسهولة." },
  { icon: Smartphone, title: "متوافق مع كل الهواتف", desc: "يدعم MagSafe مباشرة أو مع لاصق معدني للهواتف غير المدعومة." },
];

const featureShots = [
  { src: "/images/hero/hero-2.jpg", alt: "المغناطيس يثبت الهاتف مع الإضاءة" },
  { src: "/images/hero/hero-5.jpg", alt: "إضاءة ناعمة على الوجه" },
  { src: "/images/hero/hero-6.jpg", alt: "تعديل الزاوية بسرعة" },
];

export default function Features() {
  return (
    <Section id="features">
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold">المزايا الأساسية</h2>
        <p className="text-white/70">Magnetic Selfie Screen Ultra</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {features.map((f, i) => (
          <div key={i} className="glass rounded-2xl p-6 h-full">
            <f.icon className="size-8 text-[color:var(--accent)] mb-3" />
            <h3 className="font-bold text-lg mb-1">{f.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {featureShots.map((shot) => (
          <div key={shot.src} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={520}
              height={320}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/50" />
            <p className="absolute bottom-3 left-3 right-3 text-sm text-white/85">{shot.alt}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
