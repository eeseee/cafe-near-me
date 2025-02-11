import type { Metadata } from "next";
import { Viewport } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "cafe near me.",
  icons: {
    icon: "/favicon.ico"
  }
};

export const viewport: Viewport = {
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="vsc-initialized">
        {children}
      </body>
    </html>
  );
}
