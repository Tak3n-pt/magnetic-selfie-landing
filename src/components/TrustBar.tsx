import Section from "@/components/Section";

export default function TrustBar() {
  return (
    <Section className="pt-0">
      <div className="grid gap-4 sm:grid-cols-3 text-center">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">أكثر من 2000 تجربة مثبتة في حفلات ومعارض.</div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">متوسط تقييم 4.8/5 لجودة الإضاءة والتثبيت.</div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">توصيل سريع داخل الجزائر خلال 48 ساعة.</div>
      </div>
    </Section>
  );
}
