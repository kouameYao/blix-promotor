import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getEvent } from '@/features/events/api/get-event';
import {
  EventDetailErrorState,
  EventDetailNotFoundState
} from '@/features/events/components';

import EventDetailClient from './event-detail-client';

interface EventDetailPageProps {
  params: { id: string };
}

export default async function EventDetailPage({
  params
}: EventDetailPageProps) {
  const session = await auth();

  if (!session || !session.user) {
    return redirect('/fr/login');
  }

  const token = (session.user as any)?.token;

  if (!token) {
    return redirect('/fr/login');
  }

  try {
    const eventResponse = await getEvent({
      eventId: params.id,
      token
    });

    const eventData = eventResponse?.data;

    if (!eventData) {
      return <EventDetailNotFoundState onBack={() => window.history.back()} />;
    }

    return <EventDetailClient event={eventData} user={session.user} />;
  } catch (error) {
    console.error('Error fetching event:', error);
    return <EventDetailErrorState onRetry={() => window.location.reload()} />;
  }
}
