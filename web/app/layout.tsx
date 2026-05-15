import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/header";
import { AuthProvider } from "@/utils/store/authStore";
import Footer from "@/components/custom/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CredAxis | Smart Loan Management Platform",
  description: "CredAxis is a modern lending platform that makes loan applications, approvals, and repayments simple, transparent, and fast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Header />
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
