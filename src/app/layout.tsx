import type { Metadata } from "next";
import { Geist_Mono, Roboto } from "next/font/google";
import { Header } from "@/components/layouts/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sector Immo",
  description: "Sector Immo",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      // Suppress hydration warning only for the theme provider to work correctly
      // Disable it some times to check other hydration issues
      suppressHydrationWarning
    >
      <body className={`${geistMono.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
