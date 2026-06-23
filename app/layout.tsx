import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abed Alrahman Abd Albake",
  description: "مطور واجهات ومختص رياضيات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="dark h-full antialiased bg-black overflow-y-auto scroll-smooth snap-y snap-mandatory"
    >
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
