import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import TrustBar from "@/components/TrustBar";
import Offer from "@/components/Offer";
import Section from "@/components/Section";
import OrderForm from "@/components/OrderForm";
import LenisProvider from "@/components/LenisProvider";
import StickyCTA from "@/components/StickyCTA";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UseCases />
        <TrustBar />
        <Offer />
        <Section>
          <OrderForm />
        </Section>
        <footer className="py-12 text-center text-white/60">
          <div className="container">© {new Date().getFullYear()} Magnetic Selfie Screen Ultra</div>
        </footer>
        <StickyCTA />
      </main>
    </LenisProvider>
  );
}

