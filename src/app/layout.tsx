import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import SymbolListWrapper from "@/components/SymbolListWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen h-screen font-sans antialiased grainy relative bg-gray-50",
          inter.className
        )}
      >
        <QueryClientProviderWrapper>
          <SymbolListWrapper>
            <Navbar />
            <Toaster />
            {children}
          </SymbolListWrapper>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
