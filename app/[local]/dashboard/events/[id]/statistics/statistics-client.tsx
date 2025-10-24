'use client';

import { EventStatisticsForm } from '@/features/events/components';
import { TEvent } from '@/types/event';

interface EventStatisticsClientProps {
  event: TEvent;
  user: any;
}

export default function EventStatisticsClient({
  event,
  user
}: EventStatisticsClientProps) {
  return <EventStatisticsForm event={event} />;
}
