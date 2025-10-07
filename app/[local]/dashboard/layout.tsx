import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import type React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AppSidebar } from '@/components/common';
import { DashboardHeader } from '@/components/common/dashbord-header';
import { ErrorFallback } from '@/components/common/ErrorFallback';
import { SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'E-Billeterie - Tableau de bord',
  description:
    'Tableau de bord pour gérer vos événements, billets et analyses sur E-Billeterie.'
};

export default async function DashboardLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const session = await auth();

  if (!session) {
    redirect('/fr/login');
  }

  return (
    <html lang={params.lang}>
      <body className="bg-[#F5F6FA]">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <SessionProvider>
            <SidebarProvider>
              <main className="flex min-h-screen  flex-grow">
                <AppSidebar className="fixed hidden xl:block" />
                <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
                  <DashboardHeader />
                  <div className="flex-1 overflow-y-auto bg-gray-100 px-4 @container md:px-8 py-2 lg:px-[50px] lg:py-6 2xl:px-[70px] 3xl:px-16 3xl:py-10">
                    {children}
                  </div>
                </div>
              </main>
            </SidebarProvider>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
