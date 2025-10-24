'use client';

import { LayoutDashboard, Ticket, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { useGetEvent } from '@/features/events/hooks/use-events';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar-store';

const getEventNavItems = (eventId: string, lang: string) => [
  {
    title: "Vue d'ensemble",
    url: `/fr/dashboard/events/${eventId}`,
    icon: LayoutDashboard
  },
  {
    title: 'Tarifications',
    url: `/fr/dashboard/events/${eventId}/tarifications`,
    icon: Ticket
  },
  {
    title: 'Participants',
    url: `/fr/dashboard/events/${eventId}/participants`,
    icon: Users
  },
  {
    title: 'Statistiques',
    url: `/fr/dashboard/events/${eventId}/statistics`,
    icon: BarChart3
  },
  {
    title: 'Coupons',
    url: `/fr/dashboard/events/${eventId}/coupons`,
    icon: BarChart3
  }
];

export function EventContextSidebar({ className }: { className?: string }) {
  const lang = 'fr';
  const pathname = usePathname();

  const { contextSidebarOpen, currentEventId, mainSidebarCollapsed } =
    useSidebarStore();

  const { data: eventResponse } = useGetEvent({
    eventId: currentEventId || ''
  });

  const eventData = eventResponse?.data;

  if (!contextSidebarOpen || !currentEventId) {
    return null;
  }

  const items = getEventNavItems(currentEventId, lang);

  return (
    <Sidebar
      className={cn(
        'fixed bottom-0 mt-[70px] z-40 h-full w-[240px] transition-all duration-300',
        mainSidebarCollapsed ? 'left-[100px]' : 'left-[270px] 2xl:left-72',
        className
      )}
    >
      <SidebarContent className="bg-gray-50 border-r border-gray-200">
        <SidebarHeader className="p-4 border-b border-gray-200">
          {eventData && (
            <div className="mt-3">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {eventData.description}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Code: {eventData.code}
              </p>
            </div>
          )}
        </SidebarHeader>

        <SidebarGroup className="px-3 py-2">
          <SidebarGroupLabel className="text-gray-500 text-xs font-medium px-2 mb-2">
            Navigation
          </SidebarGroupLabel>
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
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'hover:bg-white text-gray-700'
                      )}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center space-x-3 px-3 py-2"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
