import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { UIProvider } from "@/context/UIContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BHOOMI | National Land Registry & Discovery Hub",
  description: "Official government-grade platform for verified land registry, geospatial discovery, and institutional property management. Experience the sovereign land infrastructure of Digital India.",
  keywords: ["Land Registry", "India", "Verified Land", "Geospatial", "Property Management", "BHOOMI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable}`} style={{ 
        '--font-body': 'var(--font-inter)', 
        '--font-heading': 'var(--font-outfit)' 
      } as any}>
        <AuthProvider>
          <UIProvider>
            {children}
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
