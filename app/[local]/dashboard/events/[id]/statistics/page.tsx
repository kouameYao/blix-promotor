import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getEvent } from '@/features/events/api/get-event';
import {
  EventDetailErrorState,
  EventDetailNotFoundState
} from '@/features/events/components';

import EventStatisticsClient from './statistics-client';

interface EventStatisticsPageProps {
  params: { id: string };
}

export default async function EventStatisticsPage({
  params
}: EventStatisticsPageProps) {
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

    return <EventStatisticsClient event={eventData} user={session.user} />;
  } catch (error) {
    console.error('Error fetching event statistics:', error);
    return (
      <EventDetailErrorState
        message="Impossible de charger les statistiques de l'événement"
        onRetry={() => window.location.reload()}
      />
    );
  }
}
