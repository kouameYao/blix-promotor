import type { Metadata } from 'next';
import type React from 'react';

import AuthProvider from '@/providers/auth-provider';

export const metadata: Metadata = {
  title: 'E-Billeterie - Tableau de bord',
  description:
    'Tableau de bord pour gérer vos événements, billets et analyses sur E-Billeterie.'
};

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
