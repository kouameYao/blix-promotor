'use client';

import { EventDetailsForm } from '@/features/events/components';
import { TEvent } from '@/types/event';

interface EventDetailsClientProps {
  event: TEvent;
  user: any;
}

export default function EventDetailsClient({
  event,
  user
}: EventDetailsClientProps) {
  return <EventDetailsForm event={event} />;
}
