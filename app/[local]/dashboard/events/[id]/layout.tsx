import type { Metadata } from 'next';

import { EventContentWrapper } from '@/components/navigation/event-content-wrapper';
import { EventContextSidebar } from '@/components/navigation/event-context-sidebar';

export const metadata: Metadata = {
  title: 'Événement - E-Billeterie',
  description: "Gestion des détails de l'événement"
};

export default function EventLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div>
      <EventContextSidebar className="fixed hidden xl:block" />
      <EventContentWrapper>{children}</EventContentWrapper>
    </div>
  );
}
