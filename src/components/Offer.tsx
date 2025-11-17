import Image from "next/image";
import Section from "@/components/Section";

export default function Offer() {
  return (
    <Section>
      <div className="glass rounded-3xl p-8 md:p-12 text-center space-y-5">
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            <Image
              src="/images/product-main.png"
              alt="الشاشة المغناطيسية للتصوير السيلفي"
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
        </div>
        <div className="text-sm text-white/70">عرض محدود</div>
        <h3 className="text-4xl md:text-5xl font-extrabold">السعر: 7900 دج</h3>
        <p className="text-white/80">يشمل قاعدة التثبيت المغناطيسي + ناشر الإضاءة + كابل شحن.</p>
      </div>
    </Section>
  );
}
