import Image from "next/image";
import Section from "@/components/Section";

const cases = [
  {
    title: "فعاليات ومعارض",
    desc: "تسجيل الزوار والتقاط لحظات فورية في البوث أو جناح العرض.",
    image: "/images/usecases/use-1.jpg",
  },
  {
    title: "النوادي الليلية والحفلات",
    desc: "فيديو ثابت رغم الإضاءة المتغيرة والحركة المستمرة.",
    image: "/images/usecases/use-4.jpg",
  },
  {
    title: "الجيم وصناع المحتوى الرياضي",
    desc: "تصوير تمارين فورم تشيك بدون مساعدة أحد.",
    image: "/images/usecases/use-3.jpg",
  },
  {
    title: "التصوير المنزلي والبث",
    desc: "بثوث ومنتجات على المكتب مع إضاءة ناعمة ومثبتة.",
    image: "/images/usecases/use-6.jpg",
  },
];

export default function UseCases() {
  return (
    <Section>
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold">متى تحتاج الشاشة المغناطيسية؟</h2>
        <p className="text-white/70">جاهزة للحفلات، الجيم، البوثات، والبثوث المنزلية.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cases.map((c, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
            <div className="relative h-44">
              <Image src={c.image} alt={c.title} fill className="object-cover" sizes="(min-width: 1024px) 280px, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
            </div>
            <div className="p-5 space-y-2 flex-1">
              <h3 className="font-bold">{c.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
