import { Analytics } from '@vercel/analytics/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import type React from 'react';
import { Suspense } from 'react';

import '../globals.css';

export const metadata: Metadata = {
  title: 'E-Billeterie - Systeme complet de billetterie en ligne',
  description:
    "E-Billeterie est une plateforme de billetterie en ligne tout-en-un qui permet aux organisateurs d'événements de créer, gérer et promouvoir leurs événements facilement. Vendez des billets, gérez les inscriptions et analysez les performances de vos événements avec notre interface conviviale."
};

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap'
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${sora.variable}`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
