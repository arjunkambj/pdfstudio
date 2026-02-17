import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import HeroUIProvider from "@/components/HeroUIProvider";
import { stackServerApp } from "@/stack/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF Studio — AI-Powered Document Builder",
  description:
    "Create, edit, and transform presentations and documents with intelligent AI tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackProvider app={stackServerApp}>
          <HeroUIProvider>
            <StackTheme>
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </StackTheme>
          </HeroUIProvider>
        </StackProvider>
      </body>
    </html>
  );
}
