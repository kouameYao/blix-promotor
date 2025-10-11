'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useSidebarStore } from '@/store/sidebar-store';

interface NavigationManagerProps {
  children: React.ReactNode;
}

export function NavigationManager({ children }: NavigationManagerProps) {
  const pathname = usePathname();
  const { enterEventContext, exitEventContext, currentEventId } =
    useSidebarStore();

  useEffect(() => {
    // Détecter si nous sommes dans une page d'événement spécifique
    const eventMatch = pathname.match(
      /^\/fr\/dashboard\/events\/([^\/]+)(?:\/.*)?$/
    );

    if (eventMatch) {
      const eventId = eventMatch[1];

      // Si nous sommes sur une page d'événement et que ce n'est pas le même événement
      if (eventId !== currentEventId) {
        enterEventContext(eventId);
      }
    } else {
      // Si nous ne sommes plus sur une page d'événement, sortir du contexte
      if (currentEventId) {
        exitEventContext();
      }
    }
  }, [pathname, currentEventId, enterEventContext, exitEventContext]);

  return <>{children}</>;
}
