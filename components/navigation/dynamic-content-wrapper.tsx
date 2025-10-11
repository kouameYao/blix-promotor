'use client';

import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar-store';

interface DynamicContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function DynamicContentWrapper({
  children,
  className
}: DynamicContentWrapperProps) {
  const { mainSidebarCollapsed } = useSidebarStore();

  // Calculer les marges en fonction de l'état du sidebar principal uniquement
  const getMarginClasses = () => {
    return mainSidebarCollapsed
      ? 'xl:ms-[100px] xl:w-[calc(100%-100px)]' // 100px pour sidebar plié
      : 'xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]'; // sidebar déplié
  };

  return (
    <div
      className={cn(
        'flex w-full flex-col transition-all duration-300',
        getMarginClasses(),
        className
      )}
    >
      {children}
    </div>
  );
}
