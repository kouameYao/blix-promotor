import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import type React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { auth } from '@/auth';
import { DashboardHeader } from '@/components/common/dashbord-header';
import { ErrorFallback } from '@/components/common/ErrorFallback';
import { DynamicContentWrapper } from '@/components/navigation/dynamic-content-wrapper';
import { MainSidebar } from '@/components/navigation/main-sidebar';
import { NavigationManager } from '@/components/navigation/navigation-manager';
import { SidebarProvider } from '@/components/ui/sidebar';

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
              <NavigationManager>
                <main className="flex min-h-screen flex-grow">
                  <MainSidebar className="fixed hidden xl:block" />
                  <div className="flex w-full flex-col">
                    <DashboardHeader />
                    <DynamicContentWrapper>
                      <div className="flex-1 overflow-y-auto bg-gray-100 px-4 @container md:px-8 py-2 lg:px-[50px] lg:py-6 2xl:px-[70px] 3xl:px-16 3xl:py-10">
                        {children}
                      </div>
                    </DynamicContentWrapper>
                  </div>
                </main>
              </NavigationManager>
            </SidebarProvider>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
