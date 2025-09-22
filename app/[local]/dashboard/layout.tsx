import type { Metadata } from 'next';
import type React from 'react';

import { AppSidebar } from '@/components/common';
import { DashboardHeader } from '@/components/common/dashbord-header';
import { SidebarProvider } from '@/components/ui/sidebar';
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
    <AuthProvider>
      <SidebarProvider>
        <main className="flex min-h-screen flex-grow">
          <AppSidebar className="fixed hidden xl:block" />
          <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
            <DashboardHeader />
            <div className="flex flex-grow flex-col bg-white px-4 py-6 @container md:px-8 md:py-5 lg:px-[50px] lg:py-10 2xl:px-[70px] 3xl:px-16 3xl:py-14">
              {children}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
