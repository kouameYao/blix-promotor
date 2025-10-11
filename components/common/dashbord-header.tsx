'use client';

import { Grid3X3, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar-store';

export function DashboardHeader() {
  const { mainSidebarCollapsed } = useSidebarStore();

  // Calculer les marges en fonction de l'état du sidebar principal uniquement
  const getMarginClasses = () => {
    return mainSidebarCollapsed
      ? 'xl:ms-[100px] xl:w-[calc(100%-100px)]' // 100px pour sidebar plié
      : 'xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]'; // sidebar déplié
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm transition-all duration-300',
        getMarginClasses()
      )}
    >
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="text-gray-700 bg-transparent">
            Aller sur le site
          </Button>
          <Button variant="ghost" size="icon">
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
