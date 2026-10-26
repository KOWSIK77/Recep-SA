import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Great_Vibes, Montserrat } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/config';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-great-vibes',
  weight: '400',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#5B1020',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.siteUrl),
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  keywords: [
    'Sasikumar and Adithya',
    'Wedding Reception',
    'Sree Velavar Mandapam',
    'Dharapuram Wedding',
    'South Indian Wedding Reception',
  ],
  authors: [{ name: 'Sasikumar & Adithya' }],
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.meta.siteUrl,
    siteName: 'Sasikumar & Adithya Reception',
    images: [
      {
        url: siteConfig.meta.ogImage,
        width: 1200,
        height: 630,
        alt: 'Sasikumar & Adithya Wedding Reception Invitation',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [siteConfig.meta.ogImage],
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${montserrat.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-secondary text-ink font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
