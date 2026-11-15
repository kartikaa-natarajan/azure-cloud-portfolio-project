import type { Metadata } from "next";
import "../public/css/styles.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import InitScroll from "@/components/scroll/InitScroll";
import Script from "next/script";
import LenisSmoothScroll from "@/components/scroll/LenisSmoothScroll";

export const metadata: Metadata = {
  title: "Vinodkumar Chavan | Embedded Software Engineer",
  description:
    "Professional portfolio of Vinodkumar Chavan, an Embedded Software Engineer with experience at TUCKIT Lockers and knowledge of AWS, Python, Linux, SQL, software development, testing, debugging, and cloud computing.",
};

const setColorSchemeScript = `
  (function() {
    try {
      var scheme = localStorage.getItem('color-scheme') || 'dark';
      document.documentElement.setAttribute('color-scheme', scheme);
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      color-scheme="dark"
      suppressHydrationWarning
      className="no-touch"
    >
      <body>
        <Script id="set-color-scheme" strategy="beforeInteractive">
          {setColorSchemeScript}
        </Script>
        {children}
        <LenisSmoothScroll />
        <InitScroll />
      </body>
    </html>
  );
}
