import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const siteTitle = 'Ziyad Fouda - Interactive AI Engineer Portfolio';
const siteDescription =
  'AI Engineer based in Mansoura, Egypt. Explore production projects in LangChain, LangGraph, Azure AI Foundry, RAG, and Machine Learning.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ziyadfouda.site'),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    locale: 'en_US',
    siteName: 'Ziyad Fouda Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full bg-[#FFFFFF] ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#FAFAFA] antialiased">{children}</body>
    </html>
  );
}
