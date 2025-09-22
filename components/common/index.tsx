'use client';

import {
  Home,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  BarChart3,
  Megaphone,
  Star,
  Zap,
  Plus,
  Settings,
  HelpCircle,
  Grid3X3,
  ChevronDown,
  ChevronRight
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
    title: 'Accueil',
    url: `/fr/dashboard`,
    icon: Home,
    isActive: true
  },
  {
    title: 'Ventes',
    url: `/fr/dashboard/ventes`,
    icon: ShoppingCart
  },
  {
    title: 'Produits',
    url: `/fr/dashboard/produits`,
    icon: Package
  },
  {
    title: 'Clients',
    url: `/fr/dashboard/clients`,
    icon: Users
  },
  {
    title: 'Revenus',
    url: `/fr/dashboard/revenus`,
    icon: DollarSign
  },
  {
    title: 'Analytiques',
    url: `/fr/dashboard/analytiques`,
    icon: BarChart3
  },
  {
    title: 'Marketing',
    url: `/fr/dashboard/marketing`,
    icon: Megaphone
  },
  {
    title: 'Avis',
    url: `/fr/dashboard/avis`,
    icon: Star
  },
  {
    title: 'Automatisations',
    url: `/fr/dashboard/automatisations`,
    icon: Zap
  },
  {
    title: 'Plus',
    url: `/fr/dashboard/plus`,
    icon: Plus,
    hasChevron: true
  },
  {
    title: 'Paramètres',
    url: `/fr/dashboard/parametres`,
    icon: Settings
  }
];

const getPlusItems = (lang: string) => [
  {
    title: "Centre d'aide",
    url: `/fr/dashboard/aide`,
    icon: HelpCircle
  }
];
export function AppSidebar({ className }: { className?: string }) {
  const lang = 'fr';
  const items = getNavItems(lang);
  const plusItems = getPlusItems(lang);

  const pathname = usePathname();

  return (
    <Sidebar
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] 2xl:w-72',
        className
      )}
    >
      <SidebarContent className="bg-[#f8f8f8]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-gray-900 text-lg">Blix</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">
              Blix
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Grid3X3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900">Aller</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
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
                        'rounded-lg mx-2 my-1',
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
                        {item.hasChevron && (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Plus section */}
        <div className="mt-8 px-3">
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 text-sm font-medium px-2 mb-2">
              Plus
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
                          'rounded-lg mx-2 my-1',
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
