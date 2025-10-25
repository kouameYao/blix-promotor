'use client';

import { EventParticipantsForm } from '@/features/events/components';
import { TEvent } from '@/types/event';

interface EventParticipantsClientProps {
  event: TEvent;
  user: any;
}

export default function EventParticipantsClient({
  event,
  user
}: EventParticipantsClientProps) {
  return <EventParticipantsForm event={event} />;
}
