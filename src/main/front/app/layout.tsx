import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "喂养记录小工具",
  description: "喂养记录小工具",
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cn">
      <body>{children}</body>
    </html>
  );
}
