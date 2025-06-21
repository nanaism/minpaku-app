import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { jaJP } from "@clerk/localizations"; // 日本語化のためにインポート
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yadori - 民泊アプリ",
  description: "地元の魅力を発見し、個性的な宿泊体験を楽しもう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <main> {children}</main>
          <Toaster richColors />
          <footer className="bg-gray-900 px-4 md:px-6 py-8">
            <p className="text-sm text-slate-300 text-center">
              created by @oga_aiichiro {new Date().getFullYear()}
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
