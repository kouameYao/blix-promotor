'use client';

import {
  LayoutPanelLeft,
  Ticket,
  User,
  TicketCheck,
  Heart,
  Users,
  Bell,
  Lock,
  Settings,
  HelpCircle,
  Grid3X3,
  List
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const getNavItems = (lang: string) => [
  {
    title: 'Tableau de bord',
    url: `/fr/dashboard`,
    icon: LayoutPanelLeft
  }
];

const getEventsItems = (lang: string) => [
  {
    title: 'Liste',
    url: `/fr/dashboard/events`,
    icon: List
  }
];

const getTicketsItems = (lang: string) => [
  {
    title: 'Mes tickets en cours',
    url: `/fr/dashboard/tickets/active`,
    icon: Ticket
  },
  {
    title: 'Historique des tickets',
    url: `/fr/dashboard/tickets/history`,
    icon: TicketCheck
  }
];

const getAccountItems = (lang: string) => [
  {
    title: 'Mes événements favoris',
    url: `/fr/dashboard/account/favorites`,
    icon: Heart
  },
  {
    title: 'Ma communauté',
    url: `/fr/dashboard/account/community`,
    icon: Users
  },
  {
    title: 'Notifications',
    url: `/fr/dashboard/account/notifications`,
    icon: Bell
  },
  {
    title: 'Profil',
    url: `/fr/dashboard/account/profile`,
    icon: User
  },
  {
    title: 'Mot de passe',
    url: `/fr/dashboard/account/password`,
    icon: Lock
  },
  {
    title: 'Paramètres',
    url: `/fr/dashboard/account/settings`,
    icon: Settings
  }
];

const getPlusItems = (lang: string) => [
  {
    title: "Centre d'aide",
    url: `/fr/dashboard/dashboard/aide`,
    icon: HelpCircle
  }
];
export function AppSidebar({ className }: { className?: string }) {
  const lang = 'fr';
  const items = getNavItems(lang);
  const plusItems = getPlusItems(lang);
  const eventsItems = getEventsItems(lang);
  const ticketsItems = getTicketsItems(lang);
  const accountItems = getAccountItems(lang);

  const pathname = usePathname();

  return (
    <Sidebar
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] 2xl:w-72',
        className
      )}
    >
      <SidebarContent className="bg-gray">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Grid3X3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-lg">Blix</span>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-3 py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'rounded-sm mx-2 my-1',
                        isActive
                          ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                          : 'hover:bg-gray-50 text-gray-700'
                      )}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center justify-between px-3 py-3"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Event section */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 text-sm font-medium px-2 mb-2">
              Évenements
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {eventsItems.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          'rounded-sm mx-2 my-1',
                          isActive
                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                            : 'hover:bg-gray-50 text-gray-700'
                        )}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center space-x-3 px-3 py-3"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* ticketsItems section */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 text-sm font-medium px-2 mb-2">
              Tickets
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ticketsItems.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          'rounded-sm mx-2 my-1',
                          isActive
                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                            : 'hover:bg-gray-50 text-gray-700'
                        )}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center space-x-3 px-3 py-3"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        {/* accountItems section */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 text-sm font-medium px-2 mb-2">
              Profil
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          'rounded-sm mx-2 my-1',
                          isActive
                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                            : 'hover:bg-gray-50 text-gray-700'
                        )}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center space-x-3 px-3 py-3"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Plus section */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 text-sm font-medium px-2 mb-2">
              Aide
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {plusItems.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          'rounded-sm mx-2 my-1',
                          isActive
                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                            : 'hover:bg-gray-50 text-gray-700'
                        )}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center space-x-3 px-3 py-3"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
