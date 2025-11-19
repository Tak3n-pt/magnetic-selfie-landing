import Section from "@/components/Section";

const faqs = [
  {
    q: "هل يشتغل على كل الهواتف؟",
    a: "نعم، متوافق مع أغلب الهواتف التي تدعم MagSafe أو مغناطيس خارجي.",
  },
  {
    q: "هل المغناطيس قوي؟",
    a: "قوي وثابت، مصمم خصيصًا للتصوير.",
  },
  {
    q: "هل يمكن الإرجاع؟",
    a: "نعم، في حالة وجود مشكلة تقنية أو ضرر في المنتج.",
  },
  {
    q: "كيف يتم الدفع؟",
    a: "الدفع عند الاستلام.",
  },
];

export default function FAQ() {
  return (
    <Section>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">الأسئلة الشائعة</h2>
      </div>
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((f, i) => (
          <details key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <summary className="cursor-pointer text-lg font-semibold">{f.q}</summary>
            <div className="pt-2 text-white/80">{f.a}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}

