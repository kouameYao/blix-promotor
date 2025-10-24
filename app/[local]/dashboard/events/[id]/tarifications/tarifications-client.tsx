'use client';

import { EventTarificationsForm } from '@/features/events/components';
import { TEvent } from '@/types/event';

interface EventTarificationsClientProps {
  event: TEvent;
  user: any;
}

export default function EventTarificationsClient({
  event,
  user
}: EventTarificationsClientProps) {
  return <EventTarificationsForm event={event} />;
}
