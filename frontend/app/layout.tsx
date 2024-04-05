import type { Metadata, Viewport } from "next";
import "./globals.css";
import React from "react";

const APP_NAME = "喂养记录小工具";
const APP_DEFAULT_TITLE = APP_NAME;
const APP_DESCRIPTION = APP_NAME;

export const metadata: Metadata = {
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  icons: { icon: "/icon.png", apple: "/icon.png" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
