import type { Metadata } from "next";
import { Montserrat, Open_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-google-display",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-google-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-google-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Luwah Technologies",
    template: "%s | Luwah Technologies",
  },
  description:
    "Custom automation, data insights, and workflow solutions for small businesses. n8n, Python, and AI-powered. Free consultation. Aurora, CO.",
  metadataBase: new URL("https://luwahtechnologies.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Luwah Technologies",
    title: "Luwah Technologies | Small Business Automation",
    description:
      "Eliminate repetitive tasks and streamline your operations with custom business process automation services.",
    images: [
      {
        url: "/images/logo-favicon.png",
        width: 512,
        height: 512,
        alt: "Luwah Technologies",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Luwah Technologies | Small Business Automation",
    description:
      "Custom automation for small businesses. n8n, Python, AI-powered. Free consultation.",
    images: ["/images/logo-favicon.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/logo-favicon.png",
    apple: "/images/logo-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
