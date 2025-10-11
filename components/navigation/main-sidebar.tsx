'use client';

import {
  LayoutPanelLeft,
  Calendar,
  Settings,
  LogOut,
  Grid3X3
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar-store';

const getMainNavItems = (lang: string) => [
  {
    title: 'Tableau de bord',
    url: `/fr/dashboard`,
    icon: LayoutPanelLeft
  },
  {
    title: 'Événements',
    url: `/fr/dashboard/events`,
    icon: Calendar
  },
  {
    title: 'Paramètres',
    url: `/fr/dashboard/settings`,
    icon: Settings
  }
];

export function MainSidebar({ className }: { className?: string }) {
  const lang = 'fr';
  const items = getMainNavItems(lang);
  const pathname = usePathname();

  const { mainSidebarCollapsed } = useSidebarStore();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/fr/login' });
  };

  return (
    <Sidebar
      className={cn(
        'fixed bottom-0 start-0 h-full transition-all duration-300',
        mainSidebarCollapsed ? 'w-[100px]' : 'w-[270px] 2xl:w-72',
        className
      )}
      collapsible="icon"
    >
      <SidebarContent
        className={cn(
          'border-r transition-colors duration-300',
          mainSidebarCollapsed
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        )}
      >
        {/* Header */}
        <SidebarHeader className="p-6">
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                mainSidebarCollapsed ? 'bg-gray-700' : 'bg-black'
              )}
            >
              <Grid3X3 className="w-4 h-4 text-white" />
            </div>
            {!mainSidebarCollapsed && (
              <span className="font-semibold text-gray-900 text-lg">Blix</span>
            )}
          </div>
        </SidebarHeader>

        {/* Navigation principale */}
        <SidebarGroup className="px-3 py-2 flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={mainSidebarCollapsed ? item.title : undefined}
                      className={cn(
                        'rounded-sm mx-2 my-1',
                        isActive
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : mainSidebarCollapsed
                            ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                            : 'hover:bg-gray-50 text-gray-700'
                      )}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center justify-between px-3 py-3"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          {!mainSidebarCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer avec déconnexion */}
        <SidebarFooter className="p-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip={mainSidebarCollapsed ? 'Déconnexion' : undefined}
                className={cn(
                  'rounded-sm mx-2 my-1',
                  mainSidebarCollapsed
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-red-400'
                    : 'hover:bg-red-50 text-red-600 hover:text-red-700'
                )}
              >
                <div className="flex items-center space-x-3 px-3 py-3">
                  <LogOut className="w-5 h-5" />
                  {!mainSidebarCollapsed && (
                    <span className="font-medium">Déconnexion</span>
                  )}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
