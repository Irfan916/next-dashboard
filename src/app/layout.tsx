import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import  Sidebar  from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaS Dashboard",
  description: "Built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* The Sidebar will be a separate component now */}
            <Sidebar />
            
            {/* This is where your pages (Dashboard, Analytics, Settings) will render */}
            <main className="flex-1 p-8 overflow-y-auto">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}