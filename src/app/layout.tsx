import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HighwayCab - Intercity Travel Made Easy",
  description: "Book reliable intercity cabs with HighwayCab. Safe, comfortable, and affordable travel across cities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} antialiased font-sans bg-white text-navy-blue`}
      >
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
