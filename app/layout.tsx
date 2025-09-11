import AuthWrapper from "@/components/auth-wrapper";
import QueryProvider from "@/providers/query-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "360 Data Admin Dashboard",
  description: "Admin dashboard for 360 Data telecommunications platform",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
