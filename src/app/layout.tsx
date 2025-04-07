import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "chat room",
  description: "This is a chat room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
