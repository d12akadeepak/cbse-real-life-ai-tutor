import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CBSE Real-Life AI Tutor",
  description: "Dynamic AI tutor for CBSE Class 9 and 10 Maths, Physics, Chemistry and Biology."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
