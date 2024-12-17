import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Inter, Roboto_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Event Manager",
    template: "%s | Event Manager",
  },
  description:
    "This is a scalable and based on lastest technology solution to your event management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} scroll-smooth font-sans antialiased`}
    >
      <body className="font-roboto">
        <div className="bg-gradient-to-r from-violet-500 to-violet-700 text-gray-50 text-center">
          This project is going through some new changes. Please visit{" "}
          <Link
            className="text-blue-950"
            href="https://github.com/Rahul-K-Saini/Event_Management_Solution for more information"
          >
            here
          </Link>{" "}
          for more information.
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
