import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"]
});

export const metadata: Metadata = {
  title: "Magnetic Selfie Screen Ultra",
  description:
    "شاشة مغناطيسية ذكية تُمكّنك من رؤية نفسك أثناء التصوير بالكاميرا الخلفية بجودة احترافية.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Magnetic Selfie Screen Ultra",
    description:
      "رؤية فورية وواضحة أثناء التصوير بجودة أعلى ×3 باستخدام الكاميرا الخلفية.",
    images: [
      { url: "/images/product-main.png", width: 1200, height: 630, alt: "Magnetic Selfie Screen Ultra" }
    ],
    locale: "ar_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} antialiased`}>
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
