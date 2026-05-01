import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Providers } from "@/components/Providers";
import DynamicHead from "@/components/layout/DynamicHead";

const rubik = Rubik({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "نظام قرافتي ERP - برو",
  description: "حلول إدارية متكاملة للشركات السعودية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={rubik.variable}>
      <body className={`${rubik.className} antialiased bg-[#030712]`}>
        <Providers>
          <DynamicHead />
          <div className="flex min-h-screen relative overflow-x-hidden">
            {/* Sidebar is fixed on the right with floating style */}
            <Sidebar />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col mr-80 relative z-10">
              <Header />
              <main className="flex-1 p-12 pr-6">
                {children}
              </main>
            </div>
            
            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
               <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[150px]"></div>
               <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[150px]"></div>
            </div>
          </div>
        </Providers>
      </body>

    </html>
  );
}



