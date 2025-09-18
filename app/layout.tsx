import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import type React from 'react';
import { Suspense } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'E-Billeterie - Systeme complet de billetterie en ligne',
  description:
    "E-Billeterie est une plateforme de billetterie en ligne tout-en-un qui permet aux organisateurs d'événements de créer, gérer et promouvoir leurs événements facilement. Vendez des billets, gérez les inscriptions et analysez les performances de vos événements avec notre interface conviviale."
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap'
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${montserrat.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
